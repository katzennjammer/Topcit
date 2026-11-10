/**
 * Runs Python and SQL in a background worker (Pyodide), with a time limit so
 * an infinite loop cannot freeze the page.
 */
const TIME_LIMIT_MS = 10000;
const LOAD_LIMIT_MS = 90000;

let worker = null;
let readyPromise = null;
let nextId = 1;
const pending = new Map();

function resetWorker(reason) {
  if (worker) worker.terminate();
  worker = null;
  readyPromise = null;
  pending.forEach(({ reject }) => reject(new Error(reason)));
  pending.clear();
}

function ensureWorker() {
  if (readyPromise) return readyPromise;
  worker = new Worker('/py-worker.js');
  readyPromise = new Promise((resolve, reject) => {
    const loadTimer = setTimeout(() => {
      reject(new Error('The Python runtime took too long to load. Check your internet connection and try again.'));
      resetWorker('Runtime failed to load');
    }, LOAD_LIMIT_MS);

    worker.onmessage = (event) => {
      const msg = event.data;
      if (msg.type === 'ready') {
        clearTimeout(loadTimer);
        resolve();
      } else if (msg.type === 'load-error') {
        clearTimeout(loadTimer);
        reject(new Error('Could not load the Python runtime. Check your internet connection and try again.'));
        resetWorker('Runtime failed to load');
      } else if (msg.type === 'result') {
        const entry = pending.get(msg.id);
        if (entry) {
          pending.delete(msg.id);
          clearTimeout(entry.timer);
          entry.resolve(msg.result);
        }
      }
    };
    worker.onerror = () => {
      clearTimeout(loadTimer);
      reject(new Error('Could not start the Python runtime.'));
      resetWorker('Runtime crashed');
    };
  });
  // A rejected load should not poison later attempts
  readyPromise.catch(() => {});
  return readyPromise;
}

async function send(payload) {
  await ensureWorker();
  return new Promise((resolve, reject) => {
    const id = nextId++;
    const timer = setTimeout(() => {
      pending.delete(id);
      resetWorker('Stopped');
      resolve({
        stdout: '',
        columns: [],
        rows: [],
        error: `Time limit exceeded (${TIME_LIMIT_MS / 1000}s). Check for an infinite loop.`,
      });
    }, TIME_LIMIT_MS);
    pending.set(id, { resolve, reject, timer });
    worker.postMessage({ id, ...payload });
  });
}

/** Start loading the runtime early so the first run is faster. */
export function warmUpRunner() {
  return ensureWorker().catch(() => {});
}

export function runPython(code, stdin = '') {
  return send({ kind: 'python', code, stdin });
}

export function runSql(setup, query) {
  return send({ kind: 'sql', setup, query });
}

const normalizeOutput = (text) =>
  String(text || '')
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();

const normalizeRows = (rows, ordered) => {
  const mapped = rows.map((r) => JSON.stringify(r.map((v) => (typeof v === 'number' ? Math.round(v * 1000) / 1000 : v))));
  return ordered ? mapped : [...mapped].sort();
};

/**
 * Runs every test of a challenge and returns { passed, total, tests, error }.
 */
export async function gradeChallenge(challenge, code) {
  if (!code || !code.trim()) {
    return { passed: 0, total: challenge.kind === 'sql' ? 1 : challenge.tests.length, tests: [], error: 'No answer written yet.' };
  }

  if (challenge.kind === 'sql') {
    const query = code.trim().replace(/;\s*$/, '');
    const [actual, expected] = [await runSql(challenge.setup, query), await runSql(challenge.setup, challenge.solution)];
    const sameShape = !actual.error && actual.columns.length === expected.columns.length;
    const ok =
      sameShape &&
      JSON.stringify(normalizeRows(actual.rows, challenge.ordered)) ===
        JSON.stringify(normalizeRows(expected.rows, challenge.ordered));
    return { passed: ok ? 1 : 0, total: 1, tests: [{ ok, actual, expected }], error: actual.error };
  }

  const tests = [];
  let timedOut = false;
  for (const test of challenge.tests) {
    // After one timeout, skip the rest: each would wait the full limit again
    const res = timedOut
      ? { stdout: '', error: 'Skipped because an earlier test ran out of time.' }
      : await runPython(code, test.stdin);
    if (res.error && res.error.startsWith('Time limit exceeded')) timedOut = true;
    const ok = !res.error && normalizeOutput(res.stdout) === normalizeOutput(test.expected);
    tests.push({ ok, stdin: test.stdin, expected: test.expected, actual: res.stdout, error: res.error });
  }
  return { passed: tests.filter((t) => t.ok).length, total: tests.length, tests, error: null };
}
