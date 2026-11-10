import { useState } from 'react';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { gradeCalc } from '../utils/calcGrader';

/**
 * A worked problem with several answer boxes that are checked automatically.
 * In exam mode nothing is revealed until the exam is submitted.
 */
export function CalcTask({ task, values = {}, onChange, examMode = false }) {
  const [checked, setChecked] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const graded = gradeCalc(task, values);

  return (
    <div className="calc-task">
      <p className="lab-prompt">{task.prompt}</p>
      <div className="calc-fields">
        {task.fields.map((field, i) => {
          const state = checked && !examMode ? (graded.marks[i] ? 'ok' : 'bad') : '';
          return (
            <div className={`calc-field ${state}`} key={i}>
              <label htmlFor={`${task.id}-f${i}`}>{field.label}</label>
              <div className="calc-input-row">
                <input
                  id={`${task.id}-f${i}`}
                  type="text"
                  inputMode={field.type === 'text' ? 'text' : 'decimal'}
                  autoComplete="off"
                  value={values[i] ?? ''}
                  onChange={(e) => {
                    setChecked(false);
                    onChange({ ...values, [i]: e.target.value });
                  }}
                />
                {state === 'ok' && <CheckCircle2 size={18} className="icon-success" aria-label="Correct" />}
                {state === 'bad' && <XCircle size={18} className="icon-danger" aria-label="Incorrect" />}
              </div>
            </div>
          );
        })}
      </div>

      {!examMode && (
        <div className="lab-actions">
          <button className="btn btn-primary" onClick={() => setChecked(true)}>Check answers</button>
          <button className="btn btn-outline" onClick={() => setShowSolution((s) => !s)}>
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Hide worked solution' : 'Show worked solution'}
          </button>
        </div>
      )}

      {checked && !examMode && (
        <div className={`lab-banner ${graded.passed === graded.total ? 'pass' : 'fail'}`} role="status">
          {graded.passed} of {graded.total} answers correct.
        </div>
      )}

      {showSolution && !examMode && (
        <div className="lab-solution">
          <span className="io-label">Worked solution</span>
          <p>{task.explanation}</p>
        </div>
      )}
    </div>
  );
}
