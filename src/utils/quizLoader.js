/**
 * Utility module for dynamically discovering, loading, and parsing quiz data
 * from public/essences directory.
 */

export const ESSENCE_MODULES = [
  {
    id: 'E1',
    filename: 'E1_Software_Development.json',
    title: 'Software Development',
    category: 'Software Engineering',
    description: 'Software lifecycle models, design patterns, reuse, modularity, refactoring, testing, and Git/SCM.',
    iconName: 'Code',
    color: '#4F46E5',
    accentLight: '#EEF2FF',
  },
  {
    id: 'E2',
    filename: 'E2_Database.json',
    title: 'Database Systems',
    category: 'Data Engineering',
    description: 'Data models, relational algebra, SQL optimization, normalization, indexing, and transaction management.',
    iconName: 'Database',
    color: '#0284C7',
    accentLight: '#E0F2FE',
  },
  {
    id: 'E3',
    filename: 'E3_System_Architecture.json',
    title: 'System Architecture',
    category: 'Architecture & OS',
    description: 'Hardware architecture, network protocols, cloud infrastructure, OS concepts, and virtualization.',
    iconName: 'Cpu',
    color: '#7C3AED',
    accentLight: '#F3E8FF',
  },
  {
    id: 'E4',
    filename: 'E4_Information_Security.json',
    title: 'Information Security',
    category: 'Cyber Security',
    description: 'Confidentiality, integrity, availability, cryptography, network defenses, and threat analysis.',
    iconName: 'ShieldCheck',
    color: '#E11D48',
    accentLight: '#FFE4E6',
  },
  {
    id: 'E5',
    filename: 'E5_IT_Business_and_Ethics.json',
    title: 'IT Business & Ethics',
    category: 'Business & Ethics',
    description: 'Digital strategy, IT value creation, IP law, open source licensing, and corporate tech ethics.',
    iconName: 'Briefcase',
    color: '#D97706',
    accentLight: '#FEF3C7',
  },
  {
    id: 'E6',
    filename: 'E6_Project_Management.json',
    title: 'Project Management',
    category: 'Management & Agile',
    description: 'Communication, estimation, Agile/Scrum methods, risk assessment, and quality control.',
    iconName: 'CheckSquare',
    color: '#059669',
    accentLight: '#D1FAE5',
  },
];

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
    // 0-indexed or 1-indexed number check
    if (rawAnswer >= 0 && rawAnswer < choices.length) {
      correctIndex = rawAnswer;
    } else if (rawAnswer >= 1 && rawAnswer <= choices.length) {
      correctIndex = rawAnswer - 1;
    }
  } else if (typeof rawAnswer === 'string') {
    const trimmed = rawAnswer.trim();
    // Check if trimmed matches exact choice string
    const foundIdx = choices.findIndex(c => c === trimmed || c.toLowerCase() === trimmed.toLowerCase());
    if (foundIdx !== -1) {
      correctIndex = foundIdx;
    } else {
      // Check if rawAnswer is letter like "A", "B", "C", "D" or "1", "2"
      if (/^[A-D]$/i.test(trimmed)) {
        correctIndex = trimmed.toUpperCase().charCodeAt(0) - 65;
      } else if (!isNaN(parseInt(trimmed, 10))) {
        const num = parseInt(trimmed, 10);
        if (num >= 0 && num < choices.length) correctIndex = num;
        else if (num >= 1 && num <= choices.length) correctIndex = num - 1;
      }
    }
  }

  // Fallback if answer string couldn't be matched by index but rawAnswer exists
  const answerText = (correctIndex >= 0 && correctIndex < choices.length) 
    ? choices[correctIndex] 
    : String(rawAnswer || '');

  return {
    id: item.id || `q-${index + 1}`,
    question: questionText,
    choices,
    answer: answerText,
    correctIndex: correctIndex >= 0 ? correctIndex : 0,
    explanation: item.explanation || item.detail || null,
  };
}

/**
 * Loads and parses a single quiz JSON file from public/essences/
 */
export async function loadQuizData(filename) {
  try {
    const res = await fetch(`/essences/${filename}`);
    if (!res.ok) {
      throw new Error(`Failed to load quiz file: ${filename} (Status ${res.status})`);
    }
    const data = await res.json();
    const rawQuestions = Array.isArray(data) ? data : (data.questions || []);
    
    const questions = rawQuestions
      .map((item, idx) => normalizeQuestion(item, idx))
      .filter(Boolean);

    return questions;
  } catch (err) {
    console.error(`Error loading quiz dataset ${filename}:`, err);
    throw err;
  }
}

/**
 * Fetches basic info and question count for all essences
 */
export async function fetchAllQuizSummaries() {
  const summaries = await Promise.all(
    ESSENCE_MODULES.map(async (mod) => {
      try {
        const questions = await loadQuizData(mod.filename);
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
