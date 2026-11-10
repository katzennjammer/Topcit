/**
 * Storage utility for saving high scores, user progress, theme preference, and quiz drafts
 */

const STORAGE_KEYS = {
  SCORES: 'topcit_quiz_scores_v1',
  THEME: 'topcit_quiz_theme_v1',
  DRAFTS: 'topcit_quiz_drafts_v1',
};

export function getThemePreference() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
}

export function setThemePreference(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Failed to save theme in localStorage', e);
  }
}

export function getQuizScores() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SCORES);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveQuizResult(quizId, result) {
  try {
    const allScores = getQuizScores();
    const existing = allScores[quizId] || { bestScore: 0, bestPercentage: 0, attempts: 0, history: [] };

    const score = result.score;
    const total = result.total;
    const percentage = Math.round((score / total) * 100);

    const newHistory = [
      {
        date: new Date().toISOString(),
        score,
        total,
        percentage,
        timeSeconds: result.timeSeconds || 0,
      },
      ...(existing.history || []),
    ].slice(0, 10); // keep last 10 attempts

    const updated = {
      ...existing,
      attempts: (existing.attempts || 0) + 1,
      bestScore: Math.max(existing.bestScore || 0, score),
      bestPercentage: Math.max(existing.bestPercentage || 0, percentage),
      lastAttempt: new Date().toISOString(),
      history: newHistory,
    };

    allScores[quizId] = updated;
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(allScores));
    return updated;
  } catch (e) {
    console.error('Failed to save quiz result', e);
    return null;
  }
}

export function saveQuizDraft(quizId, draft) {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '{}');
    drafts[quizId] = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to save draft', e);
  }
}

export function getQuizDraft(quizId) {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '{}');
    return drafts[quizId] || null;
  } catch {
    return null;
  }
}

export function clearQuizDraft(quizId) {
  try {
    const drafts = JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAFTS) || '{}');
    delete drafts[quizId];
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
  } catch (e) {
    console.error('Failed to clear draft', e);
  }
}

export function getAllStats() {
  const scores = getQuizScores();
  let totalQuizzesAttempted = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;

  Object.values(scores).forEach((item) => {
    if (item.attempts > 0) {
      totalQuizzesAttempted += 1;
      if (item.history && item.history.length > 0) {
        const latest = item.history[0];
        totalQuestionsAnswered += latest.total;
        totalCorrect += latest.score;
      }
    }
  });

  const overallAccuracy = totalQuestionsAnswered > 0
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
    : 0;

  return {
    totalQuizzesAttempted,
    totalQuestionsAnswered,
    totalCorrect,
    overallAccuracy,
  };
}

export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.SCORES);
    localStorage.removeItem(STORAGE_KEYS.DRAFTS);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

/** Generic JSON helpers used by the practice labs and the mock exam. */
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save', key, e);
  }
}

export function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove', key, e);
  }
}

export const LAB_KEYS = {
  CODE: 'topcit_code_lab',
  DIAGRAM: 'topcit_diagram_lab',
  EXAM_DRAFT: 'topcit_exam_draft',
  EXAM_HISTORY: 'topcit_exam_history',
};
