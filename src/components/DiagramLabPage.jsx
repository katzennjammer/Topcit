import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Eye, EyeOff } from 'lucide-react';
import { DiagramCanvas } from './DiagramCanvas';
import { Checklist } from './Checklist';
import { ModelDiagram } from './ModelDiagram';
import { loadDiagramTasks } from '../utils/practiceLoader';
import { loadJSON, saveJSON, LAB_KEYS } from '../utils/storage';

export function DiagramLabPage({ theme }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [saved, setSaved] = useState(() => loadJSON(LAB_KEYS.DIAGRAM, { xml: {}, checked: {} }));
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    let alive = true;
    loadDiagramTasks()
      .then((list) => {
        if (!alive) return;
        setTasks(list);
        setActiveId((id) => id || list[0]?.id || null);
      })
      .catch((err) => alive && setError(err.message));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    saveJSON(LAB_KEYS.DIAGRAM, saved);
  }, [saved]);

  const active = tasks.find((t) => t.id === activeId) || null;
  const isDone = (t) => (saved.checked[t.id] || []).length === t.checklist.length;

  if (error) {
    return <div className="card lab-empty"><p>{error}</p></div>;
  }

  return (
    <div className="lab-page">
      <header className="page-head">
        <h1>Diagram lab</h1>
        <p>
          Draw the diagram the task asks for, then grade it yourself against the checklist.
          The editor is diagrams.net and needs an internet connection.
        </p>
      </header>

      <div className="lab-layout">
        <nav className="lab-list card" aria-label="Diagram tasks">
          <ul>
            {tasks.map((t) => (
              <li key={t.id}>
                <button
                  className={`lab-list-item ${t.id === activeId ? 'active' : ''}`}
                  onClick={() => {
                    setActiveId(t.id);
                    setShowAnswer(false);
                  }}
                >
                  {isDone(t)
                    ? <CheckCircle2 size={16} className="icon-success" />
                    : <Circle size={16} className="icon-idle" />}
                  <span className="lab-list-title">
                    {t.title}
                    <small>{t.kind}</small>
                  </span>
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
                <span className="kind-tag">{active.kind}</span>
              </div>
              <p className="lab-prompt">{active.prompt}</p>

              <DiagramCanvas
                key={active.id}
                initialXml={saved.xml[active.id]}
                dark={theme === 'dark'}
                onChange={({ xml }) => setSaved((s) => ({ ...s, xml: { ...s.xml, [active.id]: xml } }))}
              />

              <div className="lab-grade">
                <h3>Check your diagram</h3>
                <p className="lab-muted">Tick each element your diagram shows.</p>
                <Checklist
                  idPrefix={active.id}
                  items={active.checklist}
                  checked={saved.checked[active.id] || []}
                  onChange={(next) => setSaved((s) => ({ ...s, checked: { ...s.checked, [active.id]: next } }))}
                />
                <p className="lab-score">
                  {(saved.checked[active.id] || []).length} of {active.checklist.length} elements
                </p>
                <button className="btn btn-outline" onClick={() => setShowAnswer((s) => !s)}>
                  {showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}
                  {showAnswer ? 'Hide model answer' : 'Show model answer'}
                </button>
                {showAnswer && (
                  <>
                    <p className="lab-solution-text">{active.modelAnswer}</p>
                    {active.mermaid && <ModelDiagram key={active.id} source={active.mermaid} dark={theme === 'dark'} />}
                    <p className="lab-muted">The model is one valid answer. Yours can be laid out differently and still be correct.</p>
                  </>
                )}
              </div>
            </>
          ) : (
            <p className="lab-muted">Loading tasks</p>
          )}
        </section>
      </div>
    </div>
  );
}
