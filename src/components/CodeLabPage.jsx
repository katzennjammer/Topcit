import { useEffect, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { CodeChallenge } from './CodeChallenge';
import { loadCodingChallenges, loadCalculationTasks } from '../utils/practiceLoader';
import { CalcTask } from './CalcTask';
import { gradeCalc } from '../utils/calcGrader';
import { warmUpRunner } from '../utils/pyRunner';
import { loadJSON, saveJSON, LAB_KEYS } from '../utils/storage';

export function CodeLabPage() {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [saved, setSaved] = useState(() => ({ code: {}, solved: {}, calc: {}, ...loadJSON(LAB_KEYS.CODE, {}) }));
  const [results, setResults] = useState({});

  useEffect(() => {
    let alive = true;
    Promise.all([loadCodingChallenges(), loadCalculationTasks()])
      .then(([code, calc]) => {
        const list = [...code, ...calc];
        if (!alive) return;
        setChallenges(list);
        setActiveId((id) => id || list[0]?.id || null);
      })
      .catch((err) => alive && setError(err.message));
    warmUpRunner();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    saveJSON(LAB_KEYS.CODE, saved);
  }, [saved]);

  const visible = challenges.filter((c) => filter === 'all' || c.kind === filter);
  const active = challenges.find((c) => c.id === activeId) || null;
  const solvedCount = challenges.filter((c) => saved.solved[c.id]).length;

  if (error) {
    return <div className="card lab-empty"><p>{error}</p></div>;
  }

  return (
    <div className="lab-page">
      <header className="page-head">
        <h1>Performance lab</h1>
        <p>
          Write and run Python and SQL, and work through calculation problems, all checked
          automatically. Performance tasks like these carry about 48% of the TOPCIT score.
        </p>
        <p className="page-head-meta">{solvedCount} of {challenges.length} solved</p>
      </header>

      <div className="lab-layout">
        <nav className="lab-list card" aria-label="Challenges">
          <div className="segmented" role="tablist">
            {[['all', 'All'], ['python', 'Python'], ['sql', 'SQL'], ['calc', 'Calc']].map(([key, label]) => (
              <button
                key={key}
                role="tab"
                aria-selected={filter === key}
                className={filter === key ? 'active' : ''}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <ul>
            {visible.map((c) => (
              <li key={c.id}>
                <button
                  className={`lab-list-item ${c.id === activeId ? 'active' : ''}`}
                  onClick={() => setActiveId(c.id)}
                >
                  {saved.solved[c.id]
                    ? <CheckCircle2 size={16} className="icon-success" />
                    : <Circle size={16} className="icon-idle" />}
                  <span className="lab-list-title">{c.title}</span>
                  <span className={`difficulty ${c.difficulty}`}>{c.difficulty}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="lab-main card">
          {active ? (
            <>
              <div className="lab-main-head">
                <h2>{active.title}</h2>
                <span className="kind-tag">{{ sql: 'SQL', python: 'Python', calc: 'Calculation' }[active.kind]}, {active.module}</span>
              </div>
              {active.kind === 'calc' ? (
                <CalcTask
                  key={active.id}
                  task={active}
                  values={saved.calc[active.id] || {}}
                  onChange={(values) => {
                    const graded = gradeCalc(active, values);
                    setSaved((s) => ({
                      ...s,
                      calc: { ...s.calc, [active.id]: values },
                      solved: graded.passed === graded.total ? { ...s.solved, [active.id]: true } : s.solved,
                    }));
                  }}
                />
              ) : (
                <CodeChallenge
                  key={active.id}
                  challenge={active}
                  code={saved.code[active.id]}
                  onCodeChange={(code) => setSaved((s) => ({ ...s, code: { ...s.code, [active.id]: code } }))}
                  result={results[active.id]}
                  onResult={(result) => {
                    setResults((r) => ({ ...r, [active.id]: result }));
                    if (result.total > 0 && result.passed === result.total) {
                      setSaved((s) => ({ ...s, solved: { ...s.solved, [active.id]: true } }));
                    }
                  }}
                />
              )}
            </>
          ) : (
            <p className="lab-muted">Loading challenges</p>
          )}
        </section>
      </div>
    </div>
  );
}
