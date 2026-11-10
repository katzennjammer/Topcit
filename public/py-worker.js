/* Web Worker that runs Python and SQL in the browser using Pyodide. */
/* global importScripts, loadPyodide */
const PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
importScripts(PYODIDE_BASE + 'pyodide.js');

const HELPERS = `
import sys, io, json, traceback

def __run_python(code, stdin_text):
    old = (sys.stdin, sys.stdout, sys.stderr)
    out = io.StringIO()
    sys.stdin, sys.stdout, sys.stderr = io.StringIO(stdin_text), out, out
    error = None
    try:
        exec(compile(code, 'main.py', 'exec'), {'__name__': '__main__'})
    except SystemExit:
        pass
    except BaseException as exc:
        tb = exc.__traceback__
        if tb is not None and tb.tb_next is not None:
            tb = tb.tb_next
        error = ''.join(traceback.format_exception(type(exc), exc, tb))
    finally:
        sys.stdin, sys.stdout, sys.stderr = old
    return json.dumps({'stdout': out.getvalue(), 'error': error})

def __run_sql(setup, query):
    import sqlite3
    conn = sqlite3.connect(':memory:')
    try:
        conn.executescript(setup)
        cur = conn.execute(query)
        columns = [d[0] for d in cur.description] if cur.description else []
        rows = [list(r) for r in cur.fetchall()]
        return json.dumps({'columns': columns, 'rows': rows, 'error': None})
    except Exception as exc:
        return json.dumps({'columns': [], 'rows': [], 'error': str(exc)})
    finally:
        conn.close()
`;

const ready = (async () => {
  const pyodide = await loadPyodide({ indexURL: PYODIDE_BASE });
  await pyodide.loadPackage('sqlite3');
  pyodide.runPython(HELPERS);
  return pyodide;
})();

ready.then(
  () => self.postMessage({ type: 'ready' }),
  (err) => self.postMessage({ type: 'load-error', error: String(err) })
);

self.onmessage = async (event) => {
  const { id, kind, code, stdin, setup, query } = event.data;
  try {
    const pyodide = await ready;
    let json;
    if (kind === 'sql') {
      json = pyodide.globals.get('__run_sql')(setup, query);
    } else {
      json = pyodide.globals.get('__run_python')(code, stdin || '');
    }
    self.postMessage({ type: 'result', id, result: JSON.parse(json) });
  } catch (err) {
    self.postMessage({ type: 'result', id, result: { error: String(err), stdout: '', columns: [], rows: [] } });
  }
};
