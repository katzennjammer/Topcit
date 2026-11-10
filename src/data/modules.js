/**
 * The four official TOPCIT modules and how this app's question sets map onto them.
 * Point values follow the official test structure (1,000 points in total).
 */
export const OFFICIAL_MODULES = [
  {
    id: 'M1',
    title: 'Software Development',
    points: 365,
    color: 'var(--m1)',
    summary: 'Life cycle models, design, testing, data structures and programming.',
    quizIds: ['Essence 1', 'Other 1'],
    descriptiveCategories: ['software_development'],
  },
  {
    id: 'M2',
    title: 'Data Management',
    points: 265,
    color: 'var(--m2)',
    summary: 'Data modelling, normalization, SQL, transactions and analytics.',
    quizIds: ['Essence 2', 'Other 2'],
    descriptiveCategories: ['database'],
  },
  {
    id: 'M3',
    title: 'Systems Architecture & Information Security',
    points: 235,
    color: 'var(--m3)',
    summary: 'Operating systems, networks, cloud, cryptography and threats.',
    quizIds: ['Essence 3', 'Essence 4'],
    descriptiveCategories: ['system_architecture', 'information_security'],
  },
  {
    id: 'M4',
    title: 'IT Business',
    points: 135,
    color: 'var(--m4)',
    summary: 'IT strategy, ethics, communication and project management.',
    quizIds: ['Essence 5', 'Essence 6'],
    descriptiveCategories: ['project_management'],
  },
];

export const TOTAL_POINTS = 1000;
export const EXAM_MINUTES = 150;

export function moduleForQuiz(quizId) {
  return OFFICIAL_MODULES.find((m) => m.quizIds.includes(quizId)) || null;
}

export function moduleForDescriptiveCategory(category) {
  return OFFICIAL_MODULES.find((m) => m.descriptiveCategories.includes(category)) || OFFICIAL_MODULES[0];
}

/** Competency levels by total score. */
export const LEVELS = [
  { level: 5, name: 'Expert', min: 900 },
  { level: 4, name: 'Proficient', min: 700 },
  { level: 3, name: 'Competent', min: 400 },
  { level: 2, name: 'Advanced beginner', min: 100 },
  { level: 1, name: 'Novice', min: 0 },
];

export function levelForScore(score) {
  return LEVELS.find((l) => score >= l.min) || LEVELS[LEVELS.length - 1];
}
