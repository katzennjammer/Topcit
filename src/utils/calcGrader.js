const cleanNumber = (value) => Number(String(value).replace(/[,\s%]/g, ''));
const cleanText = (value) => String(value || '').toLowerCase().replace(/[\s\-–>,]/g, '');

export function isFieldCorrect(field, value) {
  if (value === undefined || value === null || String(value).trim() === '') return false;
  if (field.type === 'text') return cleanText(value) === cleanText(field.answer);
  const given = cleanNumber(value);
  if (Number.isNaN(given)) return false;
  const tolerance = field.tolerance ?? 0.001;
  return Math.abs(given - field.answer) <= tolerance;
}

/** Returns { passed, total, marks } for a calculation task. */
export function gradeCalc(task, values = {}) {
  const marks = task.fields.map((field, i) => isFieldCorrect(field, values[i]));
  return { passed: marks.filter(Boolean).length, total: marks.length, marks };
}
