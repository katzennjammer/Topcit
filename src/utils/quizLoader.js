/**
 * Utility module for dynamically discovering, loading, and parsing quiz data
 * from public/essences and public/others directories.
 */

export const ESSENCE_MODULES = [
  {
    id: 'Essence 1',
    filePath: '/essences/E1_Software_Development.json',
    filename: 'E1_Software_Development.json',
    title: 'Software Development',
    category: 'Software Engineering',
    description: 'Software lifecycle models, design patterns, reuse, modularity, refactoring, testing, and Git/SCM.',
    iconName: 'Code',
    color: '#4F46E5',
    accentLight: '#EEF2FF',
  },
  {
    id: 'Essence 2',
    filePath: '/essences/E2_Database.json',
    filename: 'E2_Database.json',
    title: 'Database Systems',
    category: 'Data Engineering',
    description: 'Data models, relational algebra, SQL optimization, normalization, indexing, and transaction management.',
    iconName: 'Database',
    color: '#0284C7',
    accentLight: '#E0F2FE',
  },
  {
    id: 'Essence 3',
    filePath: '/essences/E3_System_Architecture.json',
    filename: 'E3_System_Architecture.json',
    title: 'System Architecture',
    category: 'Architecture & OS',
    description: 'Hardware architecture, network protocols, cloud infrastructure, OS concepts, and virtualization.',
    iconName: 'Cpu',
    color: '#7C3AED',
    accentLight: '#F3E8FF',
  },
  {
    id: 'Essence 4',
    filePath: '/essences/E4_Information_Security.json',
    filename: 'E4_Information_Security.json',
    title: 'Information Security',
    category: 'Cyber Security',
    description: 'Confidentiality, integrity, availability, cryptography, network defenses, and threat analysis.',
    iconName: 'ShieldCheck',
    color: '#E11D48',
    accentLight: '#FFE4E6',
  },
  {
    id: 'Essence 5',
    filePath: '/essences/E5_IT_Business_and_Ethics.json',
    filename: 'E5_IT_Business_and_Ethics.json',
    title: 'IT Business & Ethics',
    category: 'Business & Ethics',
    description: 'Digital strategy, IT value creation, IP law, open source licensing, and corporate tech ethics.',
    iconName: 'Briefcase',
    color: '#D97706',
    accentLight: '#FEF3C7',
  },
  {
    id: 'Essence 6',
    filePath: '/essences/E6_Project_Management.json',
    filename: 'E6_Project_Management.json',
    title: 'Project Management',
    category: 'Management & Agile',
    description: 'Communication, estimation, Agile/Scrum methods, risk assessment, and quality control.',
    iconName: 'CheckSquare',
    color: '#059669',
    accentLight: '#D1FAE5',
  },
  {
    id: 'Other 1',
    filePath: '/others/Coding_Snippets.json',
    filename: 'Coding_Snippets.json',
    title: 'Coding Snippets & Logic',
    category: 'Programming & Logic',
    description: 'Code tracing, variables, control flow, functions, operators, and memory practice.',
    iconName: 'Code',
    color: '#0284C7',
    accentLight: '#E0F2FE',
  },
  {
    id: 'Other 2',
    filePath: '/others/SQL_Queries.json',
    filename: 'SQL_Queries.json',
    title: 'SQL Queries & Manipulation',
    category: 'Database & SQL',
    description: 'SELECT queries, JOINs, aggregations, GROUP BY, subqueries, and DDL/DML practice.',
    iconName: 'Database',
    color: '#059669',
    accentLight: '#D1FAE5',
  },
];

/**
 * Fisher-Yates array shuffle helper
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Randomizes the order of choices for a single question while keeping correctIndex accurate
 */
export function shuffleQuestionChoices(question) {
  if (!question || !Array.isArray(question.choices) || question.choices.length <= 1) {
    return question;
  }

  const correctAnswerText = question.choices[question.correctIndex] || question.answer;

  const indexedChoices = question.choices.map((choice, idx) => ({
    text: choice,
    isCorrect: idx === question.correctIndex || choice === correctAnswerText,
  }));

  const shuffledChoices = shuffleArray(indexedChoices);
  const newChoices = shuffledChoices.map(c => c.text);
  const newCorrectIndex = shuffledChoices.findIndex(c => c.isCorrect);

  return {
    ...question,
    choices: newChoices,
    correctIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
    answer: newChoices[newCorrectIndex !== -1 ? newCorrectIndex : 0],
  };
}

/**
 * Randomizes both question order and choices for each question
 */
export function randomizeQuiz(questions) {
  if (!Array.isArray(questions)) return [];
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map(q => shuffleQuestionChoices(q));
}

/**
 * Normalizes raw question objects from any variance in key names
 */

export function normalizeQuestion(item, index) {
  if (!item || typeof item !== 'object') return null;

  const questionText = item.question || item.title || item.prompt || item.q || `Question ${index + 1}`;
  
  let choices = item.choices || item.options || item.answers || item.choicesList || [];
  if (!Array.isArray(choices)) {
    choices = [];
  }
  choices = choices.map((c) => String(c).trim());

  let rawAnswer = item.answer !== undefined ? item.answer : (item.correctAnswer !== undefined ? item.correctAnswer : item.correct);
  let correctIndex = -1;

  if (typeof rawAnswer === 'number') {
    if (rawAnswer >= 0 && rawAnswer < choices.length) {
      correctIndex = rawAnswer;
    } else if (rawAnswer >= 1 && rawAnswer <= choices.length) {
      correctIndex = rawAnswer - 1;
    }
  } else if (typeof rawAnswer === 'string') {
    const trimmed = rawAnswer.trim();
    const foundIdx = choices.findIndex(c => c === trimmed || c.toLowerCase() === trimmed.toLowerCase());
    if (foundIdx !== -1) {
      correctIndex = foundIdx;
    } else {
      if (/^[A-D]$/i.test(trimmed)) {
        correctIndex = trimmed.toUpperCase().charCodeAt(0) - 65;
      } else if (!isNaN(parseInt(trimmed, 10))) {
        const num = parseInt(trimmed, 10);
        if (num >= 0 && num < choices.length) correctIndex = num;
        else if (num >= 1 && num <= choices.length) correctIndex = num - 1;
      }
    }
  }

  const answerText = (correctIndex >= 0 && correctIndex < choices.length) 
    ? choices[correctIndex] 
    : String(rawAnswer || '');

  return {
    id: item.id || `q-${index + 1}`,
    question: questionText,
    code: item.code || null,
    choices,
    answer: answerText,
    correctIndex: correctIndex >= 0 ? correctIndex : 0,
    explanation: item.explanation || item.detail || null,
  };
}

/**
 * Loads and parses a single quiz JSON file from public/essences/ or public/others/
 */
export async function loadQuizData(fileIdentifier) {
  try {
    const url = fileIdentifier.startsWith('/') 
      ? fileIdentifier 
      : `/essences/${fileIdentifier}`;
      
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load quiz file: ${fileIdentifier} (Status ${res.status})`);
    }
    const data = await res.json();
    const rawQuestions = Array.isArray(data) ? data : (data.questions || []);
    
    const questions = rawQuestions
      .map((item, idx) => normalizeQuestion(item, idx))
      .filter(Boolean);

    return questions;
  } catch (err) {
    console.error(`Error loading quiz dataset ${fileIdentifier}:`, err);
    throw err;
  }
}

/**
 * Fetches basic info and question count for all essences and other modules
 */
export async function fetchAllQuizSummaries() {
  const summaries = await Promise.all(
    ESSENCE_MODULES.map(async (mod) => {
      try {
        const questions = await loadQuizData(mod.filePath || mod.filename);
        return {
          ...mod,
          questionCount: questions.length,
          available: true,
        };
      } catch {
        return {
          ...mod,
          questionCount: 0,
          available: false,
        };
      }
    })
  );
  return summaries;
}
