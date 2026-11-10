import { loadQuizData, shuffleArray, shuffleQuestionChoices } from './quizLoader';
import { loadCodingChallenges, loadDiagramTasks } from './practiceLoader';
import { OFFICIAL_MODULES, moduleForDescriptiveCategory } from '../data/modules';

const QUIZ_FILES = {
  'Essence 1': '/essences/E1_Software_Development.json',
  'Essence 2': '/essences/E2_Database.json',
  'Essence 3': '/essences/E3_System_Architecture.json',
  'Essence 4': '/essences/E4_Information_Security.json',
  'Essence 5': '/essences/E5_IT_Business_and_Ethics.json',
  'Essence 6': '/essences/E6_Project_Management.json',
  'Other 1': '/others/Coding_Snippets.json',
  'Other 2': '/others/SQL_Queries.json',
};

/**
 * Question mix. Points per type follow the official weighting:
 * multiple choice 19%, short answer 12%, descriptive 21%, performance 48%.
 */
export const EXAM_SECTIONS = [
  { type: 'mcq', label: 'Multiple choice', pointsEach: 5, perModule: { M1: 14, M2: 10, M3: 9, M4: 5 } },
  { type: 'short', label: 'Short answer', pointsEach: 10, perModule: { M1: 4, M2: 3, M3: 3, M4: 2 } },
  { type: 'desc', label: 'Descriptive', pointsEach: 30, perModule: { M1: 2, M2: 2, M3: 2, M4: 1 } },
  { type: 'perf', label: 'Performance', pointsEach: 60 },
];
const PERF_MIX = { python: 4, sql: 2, diagram: 2 };

const isShortAnswerCandidate = (q) => {
  const words = q.answer.trim().split(/\s+/).length;
  return (
    !q.code &&
    words <= 3 &&
    q.answer.length <= 30 &&
    !/^which (is|of|statement|set|pair|example|command)\b/i.test(q.question) &&
    !/example|following/i.test(q.question)
  );
};

export function normalizeShortAnswer(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/^(an?|the)\s+/, '')
    .replace(/[^a-z0-9%]/g, '');
}

export function isShortAnswerCorrect(given, expected) {
  const a = normalizeShortAnswer(given);
  return a.length > 0 && a === normalizeShortAnswer(expected);
}

export async function buildExam() {
  const pools = {};
  await Promise.all(
    Object.entries(QUIZ_FILES).map(async ([id, file]) => {
      pools[id] = await loadQuizData(file);
    })
  );
  const [descRes, challenges, diagrams] = await Promise.all([
    fetch('/others/Descriptive_Questions.json').then((r) => {
      if (!r.ok) throw new Error('Could not load the descriptive questions.');
      return r.json();
    }),
    loadCodingChallenges(),
    loadDiagramTasks(),
  ]);

  const items = [];
  const used = new Set();
  const [mcq, short, desc, perf] = EXAM_SECTIONS;

  // Short answers first, so the same question is not reused as multiple choice
  for (const mod of OFFICIAL_MODULES) {
    const pool = shuffleArray(
      mod.quizIds
        .filter((id) => id.startsWith('Essence'))
        .flatMap((id) => pools[id].map((q) => ({ ...q, uid: `${id}:${q.id}` })))
        .filter(isShortAnswerCandidate)
    ).slice(0, short.perModule[mod.id]);
    pool.forEach((q) => {
      used.add(q.uid);
      items.push({
        key: `short-${q.uid}`,
        type: 'short',
        module: mod.id,
        points: short.pointsEach,
        q: { question: q.question, answer: q.answer, explanation: q.explanation },
      });
    });
  }

  for (const mod of OFFICIAL_MODULES) {
    const pool = shuffleArray(
      mod.quizIds
        .flatMap((id) => pools[id].map((q) => ({ ...q, uid: `${id}:${q.id}` })))
        .filter((q) => !q.isDescriptive && !used.has(q.uid))
    ).slice(0, mcq.perModule[mod.id]);
    pool.forEach((q) => {
      const s = shuffleQuestionChoices(q);
      items.push({
        key: `mcq-${q.uid}`,
        type: 'mcq',
        module: mod.id,
        points: mcq.pointsEach,
        q: { question: s.question, code: s.code, choices: s.choices, correctIndex: s.correctIndex, explanation: s.explanation },
      });
    });
  }

  for (const mod of OFFICIAL_MODULES) {
    const pool = shuffleArray(
      descRes.filter((d) => moduleForDescriptiveCategory(d.category).id === mod.id)
    ).slice(0, desc.perModule[mod.id]);
    pool.forEach((d) => {
      items.push({
        key: `desc-${d.id}`,
        type: 'desc',
        module: mod.id,
        points: desc.pointsEach,
        q: { question: d.question, answer: d.answer },
      });
    });
  }

  const pick = (list, n) => shuffleArray(list).slice(0, n);
  [
    ...pick(challenges.filter((c) => c.kind === 'python'), PERF_MIX.python),
    ...pick(challenges.filter((c) => c.kind === 'sql'), PERF_MIX.sql),
  ].forEach((c) => {
    items.push({ key: `code-${c.id}`, type: 'code', module: c.module, points: perf.pointsEach, q: c });
  });
  pick(diagrams, PERF_MIX.diagram).forEach((t) => {
    items.push({ key: `diagram-${t.id}`, type: 'diagram', module: t.module, points: perf.pointsEach, q: t });
  });

  const order = ['mcq', 'short', 'desc', 'code', 'diagram'];
  items.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  return items;
}

export const TYPE_LABELS = {
  mcq: 'Multiple choice',
  short: 'Short answer',
  desc: 'Descriptive',
  code: 'Performance: coding',
  diagram: 'Performance: diagram',
};

export function isAnswered(item, answer) {
  if (answer === undefined || answer === null) return false;
  if (item.type === 'mcq') return true;
  if (item.type === 'diagram') return Boolean(answer.xml);
  if (item.type === 'code') return String(answer).trim() !== String(item.q.starter || '').trim() && String(answer).trim() !== '';
  return String(answer).trim() !== '';
}

/**
 * Points earned for one item.
 * grade holds what is known after submission:
 *   mcq/short: nothing extra (short may carry { override: boolean })
 *   desc: { self: 0 | 0.5 | 1 }
 *   code: { passed, total }
 *   diagram: { checked: number[] }
 * Returns null while a self-graded item has not been graded yet.
 */
export function earnedPoints(item, answer, grade) {
  switch (item.type) {
    case 'mcq':
      return answer === item.q.correctIndex ? item.points : 0;
    case 'short': {
      const auto = isShortAnswerCorrect(answer, item.q.answer);
      const correct = grade && typeof grade.override === 'boolean' ? grade.override : auto;
      return correct ? item.points : 0;
    }
    case 'desc':
      return grade && typeof grade.self === 'number' ? Math.round(item.points * grade.self) : null;
    case 'code':
      return grade && grade.total > 0 ? Math.round((item.points * grade.passed) / grade.total) : 0;
    case 'diagram':
      if (!answer || !answer.xml) return 0;
      return grade && Array.isArray(grade.checked)
        ? Math.round((item.points * grade.checked.length) / item.q.checklist.length)
        : null;
    default:
      return 0;
  }
}
