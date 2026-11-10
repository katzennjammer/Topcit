import { useState } from 'react';
import { Play, CheckCircle2, XCircle, Loader2, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { gradeChallenge } from '../utils/pyRunner';

function ResultTable({ data }) {
  if (!data || data.columns.length === 0) return <p className="lab-muted">No rows returned.</p>;
  return (
    <div className="result-table-wrap">
      <table className="result-table">
        <thead>
          <tr>{data.columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {data.rows.map((row, r) => (
            <tr key={r}>{row.map((v, i) => <td key={i}>{v === null ? 'NULL' : String(v)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * A coding or SQL task with an editor and automatic checking.
 * In exam mode the solution stays hidden.
 */
export function CodeChallenge({ challenge, code, onCodeChange, result, onResult, examMode = false }) {
  const [running, setRunning] = useState(false);
  const [runError, setRunError] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const isSql = challenge.kind === 'sql';
  const value = code ?? challenge.starter ?? '';

  const handleRun = async () => {
    setRunning(true);
    setRunError(null);
    try {
      const graded = await gradeChallenge(challenge, value);
      onResult(graded);
    } catch (err) {
      setRunError(err.message || 'Could not run the code.');
    } finally {
      setRunning(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const { selectionStart, selectionEnd } = el;
      const next = value.slice(0, selectionStart) + '    ' + value.slice(selectionEnd);
      onCodeChange(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 4;
      });
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleRun();
    }
  };

  const allPassed = result && result.total > 0 && result.passed === result.total;

  return (
    <div className="code-challenge">
      <p className="lab-prompt">{challenge.prompt}</p>

      {isSql ? (
        <pre className="lab-schema" aria-label="Table schema">{challenge.schema}</pre>
      ) : (
        <div className="io-example">
          <div>
            <span className="io-label">Example input</span>
            <pre>{challenge.example_in}</pre>
          </div>
          <div>
            <span className="io-label">Expected output</span>
            <pre>{challenge.example_out}</pre>
          </div>
        </div>
      )}

      <label className="editor-label" htmlFor={`editor-${challenge.id}`}>
        {isSql ? 'Your SQL query' : 'Your Python code'}
      </label>
      <textarea
        id={`editor-${challenge.id}`}
        className="code-editor"
        value={value}
        onChange={(e) => onCodeChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        rows={isSql ? 6 : 12}
      />

      <div className="lab-actions">
        <button className="btn btn-primary" onClick={handleRun} disabled={running}>
          {running ? <Loader2 size={16} className="spin" /> : <Play size={16} />}
          {running ? 'Running' : isSql ? 'Run query' : 'Run tests'}
        </button>
        <button className="btn btn-outline" onClick={() => onCodeChange(challenge.starter || '')} disabled={running}>
          <RotateCcw size={16} /> Reset
        </button>
        {!examMode && (
          <button className="btn btn-outline" onClick={() => setShowSolution((s) => !s)}>
            {showSolution ? <EyeOff size={16} /> : <Eye size={16} />}
            {showSolution ? 'Hide solution' : 'Show solution'}
          </button>
        )}
        <span className="lab-muted lab-hint">Ctrl + Enter runs. The first run downloads the Python runtime (about 10 MB).</span>
      </div>

      {runError && <div className="lab-banner fail">{runError}</div>}

      {result && !runError && (
        <div className={`lab-banner ${allPassed ? 'pass' : 'fail'}`} role="status">
          {allPassed ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span>
            {isSql
              ? allPassed
                ? 'Your query returns the expected rows.'
                : result.error
                  ? `SQL error: ${result.error}`
                  : 'Your query runs, but the rows differ from the expected result.'
              : result.tests.length === 0
                ? result.error
                : `${result.passed} of ${result.total} tests passed.`}
          </span>
        </div>
      )}

      {result && isSql && result.tests[0] && !result.error && (
        <div className="sql-compare">
          <div>
            <span className="io-label">Your result</span>
            <ResultTable data={result.tests[0].actual} />
          </div>
          {!examMode && !allPassed && (
            <div>
              <span className="io-label">Expected result</span>
              <ResultTable data={result.tests[0].expected} />
            </div>
          )}
        </div>
      )}

      {result && !isSql && result.tests.length > 0 && (
        <ol className="test-list">
          {result.tests.map((t, i) => (
            <li key={i} className={t.ok ? 'ok' : 'bad'}>
              <div className="test-head">
                {t.ok ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                <span>Test {i + 1}</span>
              </div>
              {!t.ok && (
                <div className="test-detail">
                  <div><span className="io-label">Input</span><pre>{t.stdin || '(empty line)'}</pre></div>
                  <div><span className="io-label">Expected</span><pre>{t.expected || '(empty)'}</pre></div>
                  <div><span className="io-label">Your output</span><pre>{t.error || t.actual || '(nothing printed)'}</pre></div>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}

      {showSolution && !examMode && (
        <div className="lab-solution">
          <span className="io-label">One possible solution</span>
          <pre>{challenge.solution}</pre>
          <p>{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}
