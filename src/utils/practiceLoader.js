let challengesPromise = null;
let diagramsPromise = null;

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load ${url} (status ${res.status})`);
  return res.json();
}

export function loadCodingChallenges() {
  if (!challengesPromise) {
    challengesPromise = fetchJson('/practice/coding_challenges.json').catch((err) => {
      challengesPromise = null;
      throw err;
    });
  }
  return challengesPromise;
}

export function loadDiagramTasks() {
  if (!diagramsPromise) {
    diagramsPromise = fetchJson('/practice/diagram_tasks.json').catch((err) => {
      diagramsPromise = null;
      throw err;
    });
  }
  return diagramsPromise;
}
