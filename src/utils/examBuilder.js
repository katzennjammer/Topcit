import { loadQuizData, shuffleArray, shuffleQuestionChoices } from './quizLoader';
import { loadCodingChallenges, loadDiagramTasks, loadCalculationTasks, loadShortAnswers } from './practiceLoader';
import { gradeCalc } from './calcGrader';
import { OFFICIAL_MODULES, moduleForDescriptiveCategory } from '../data/modules';

const QUIZ_FILES = {
  'Applied 1': '/applied/A1_Software_Development.json',
  'Applied 2': '/applied/A2_Data_Management.json',
  'Applied 3': '/applied/A3_Systems_Security.json',
  'Applied 4': '/applied/A4_IT_Business.json',
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
 * Question mix. Points per type follow the official weighting (multiple
 * choice 19%, short answer 12%, descriptive 21%, performance 48%), and the
 * counts per module are chosen so each module's total matches its official
 * share: M1 365, M2 265, M3 235, M4 135.
 */
export const EXAM_SECTIONS = [
  { type: 'mcq', label: 'Multiple choice', pointsEach: 5, perModule: { M1: 15, M2: 11, M3: 7, M4: 5 } },
  { type: 'short', label: 'Short answer', pointsEach: 10, perModule: { M1: 5, M2: 3, M3: 2, M4: 2 } },
  { type: 'desc', label: 'Descriptive', pointsEach: 30, perModule: { M1: 2, M2: 2, M3: 2, M4: 1 } },
  { type: 'perf', label: 'Performance', pointsEach: 60 },
];

export function normalizeShortAnswer(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/^(an?|the)\s+/, '')
    .replace(/[^a-z0-9%]/g, '');
}

/** expected may be one accepted answer or a list of them. */
export function isShortAnswerCorrect(given, expected) {
  const a = normalizeShortAnswer(given);
  if (a.length === 0) return false;
  return [].concat(expected).some((e) => normalizeShortAnswer(e) === a);
}

export async function buildExam() {
  const pools = {};
  await Promise.all(
    Object.entries(QUIZ_FILES).map(async ([id, file]) => {
      pools[id] = await loadQuizData(file);
    })
  );
  const [descRes, challenges, diagrams, calcTasks, shortBank] = await Promise.all([
    fetch('/others/Descriptive_Questions.json').then((r) => {
      if (!r.ok) throw new Error('Could not load the descriptive questions.');
      return r.json();
    }),
    loadCodingChallenges(),
    loadDiagramTasks(),
    loadCalculationTasks(),
    loadShortAnswers(),
  ]);

  const items = [];
  const [mcq, short, desc, perf] = EXAM_SECTIONS;

  for (const mod of OFFICIAL_MODULES) {
    shuffleArray(shortBank.filter((q) => q.module === mod.id))
      .slice(0, short.perModule[mod.id])
      .forEach((q, i) => {
        items.push({
          key: `short-${mod.id}-${i}-${normalizeShortAnswer(q.answers[0])}`,
          type: 'short',
          module: mod.id,
          points: short.pointsEach,
          q: { question: q.question, answer: q.answers[0], answers: q.answers, explanation: q.explanation },
        });
      });
  }

  // Multiple choice: about half scenario questions, the rest recall questions
  for (const mod of OFFICIAL_MODULES) {
    const want = mcq.perModule[mod.id];
    const tagged = (ids) => ids.flatMap((id) => pools[id].map((q) => ({ ...q, uid: `${id}:${q.id}` }))).filter((q) => !q.isDescriptive);
    const applied = shuffleArray(tagged(mod.quizIds.filter((id) => id.startsWith('Applied')))).slice(0, Math.ceil(want / 2));
    const recall = shuffleArray(tagged(mod.quizIds.filter((id) => !id.startsWith('Applied')))).slice(0, want - applied.length);
    shuffleArray([...applied, ...recall]).forEach((q) => {
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

  // Performance tasks: M1 three, M2 two, M3 two, M4 one
  const pick = (list, n) => shuffleArray(list).slice(0, n);
  const addPerf = (type, task) =>
    items.push({ key: `${type}-${task.id}`, type, module: task.module, points: perf.pointsEach, q: task });

  pick(challenges.filter((c) => c.kind === 'python'), 2).forEach((c) => addPerf('code', c));
  pick(challenges.filter((c) => c.kind === 'sql'), 1).forEach((c) => addPerf('code', c));
  pick(diagrams.filter((t) => t.module === 'M1'), 1).forEach((t) => addPerf('diagram', t));
  pick(diagrams.filter((t) => t.module === 'M2'), 1).forEach((t) => addPerf('diagram', t));
  pick(calcTasks.filter((t) => t.module === 'M3'), 2).forEach((t) => addPerf('calc', t));
  pick(calcTasks.filter((t) => t.module === 'M4'), 1).forEach((t) => addPerf('calc', t));

  const order = ['mcq', 'short', 'desc', 'code', 'calc', 'diagram'];
  items.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  return items;
}

export const TYPE_LABELS = {
  mcq: 'Multiple choice',
  short: 'Short answer',
  desc: 'Descriptive',
  code: 'Performance: coding',
  calc: 'Performance: calculation',
  diagram: 'Performance: diagram',
};

export function isAnswered(item, answer) {
  if (answer === undefined || answer === null) return false;
  if (item.type === 'mcq') return true;
  if (item.type === 'diagram') return Boolean(answer.xml);
  if (item.type === 'calc') return Object.values(answer).some((v) => String(v).trim() !== '');
  if (item.type === 'code') return String(answer).trim() !== String(item.q.starter || '').trim() && String(answer).trim() !== '';
  return String(answer).trim() !== '';
}

/**
 * Points earned for one item.
 * grade holds what is known after submission:
 *   mcq/short: nothing extra (short may carry { override: boolean })
 *   desc: { self: 0 | 0.5 | 1 }
 *   code: { passed, total }
 *   calc: nothing extra (checked directly)
 *   diagram: { checked: number[] }
 * Returns null while a self-graded item has not been graded yet.
 */
export function earnedPoints(item, answer, grade) {
  switch (item.type) {
    case 'mcq':
      return answer === item.q.correctIndex ? item.points : 0;
    case 'short': {
      const auto = isShortAnswerCorrect(answer, item.q.answers || item.q.answer);
      const correct = grade && typeof grade.override === 'boolean' ? grade.override : auto;
      return correct ? item.points : 0;
    }
    case 'desc':
      return grade && typeof grade.self === 'number' ? Math.round(item.points * grade.self) : null;
    case 'code':
      return grade && grade.total > 0 ? Math.round((item.points * grade.passed) / grade.total) : 0;
    case 'calc': {
      const graded = gradeCalc(item.q, answer || {});
      return Math.round((item.points * graded.passed) / graded.total);
    }
    case 'diagram':
      if (!answer || !answer.xml) return 0;
      return grade && Array.isArray(grade.checked)
        ? Math.round((item.points * grade.checked.length) / item.q.checklist.length)
        : null;
    default:
      return 0;
  }
}
