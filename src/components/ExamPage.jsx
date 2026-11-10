import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Flag, Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import { CodeChallenge } from './CodeChallenge';
import { DiagramCanvas } from './DiagramCanvas';
import { Checklist } from './Checklist';
import { CalcTask } from './CalcTask';
import { ModelDiagram } from './ModelDiagram';
import { gradeCalc } from '../utils/calcGrader';
import { buildExam, earnedPoints, isAnswered, isShortAnswerCorrect, TYPE_LABELS } from '../utils/examBuilder';
import { gradeChallenge, warmUpRunner } from '../utils/pyRunner';
import { loadJSON, saveJSON, removeKey, LAB_KEYS } from '../utils/storage';
import { OFFICIAL_MODULES, EXAM_MINUTES, TOTAL_POINTS, levelForScore } from '../data/modules';

const formatClock = (ms) => {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

function ExamIntro({ onStart, onResume, hasDraft, history, starting, error }) {
  return (
    <div className="exam-intro">
      <header className="page-head">
        <h1>Mock exam</h1>
        <p>
          A full-length practice test built like the real one: 65 questions, {EXAM_MINUTES} minutes,
          {' '}{TOTAL_POINTS.toLocaleString()} points.
        </p>
      </header>

      <div className="exam-intro-grid">
        <section className="card exam-brief">
          <h2>What you will get</h2>
          <table className="plain-table">
            <thead>
              <tr><th>Question type</th><th>Questions</th><th>Points</th></tr>
            </thead>
            <tbody>
              <tr><td>Multiple choice</td><td>38</td><td>190</td></tr>
              <tr><td>Short answer</td><td>12</td><td>120</td></tr>
              <tr><td>Descriptive</td><td>7</td><td>210</td></tr>
              <tr><td>Performance (code, SQL, diagrams, calculations)</td><td>8</td><td>480</td></tr>
            </tbody>
          </table>
          <ul className="exam-notes">
            <li>The timer keeps running if you leave the page. Your answers are saved as you go.</li>
            <li>Multiple choice, short answer, code and calculations are marked automatically.</li>
            <li>Each module carries its official share: M1 365, M2 265, M3 235 and M4 135 points.</li>
            <li>You mark your own descriptive answers and diagrams against the model answers afterwards.</li>
            <li>Coding and diagram questions need an internet connection.</li>
          </ul>
          {error && <div className="lab-banner fail">{error}</div>}
          <div className="lab-actions">
            {hasDraft && (
              <button className="btn btn-primary" onClick={onResume}>Resume exam in progress</button>
            )}
            <button className={`btn ${hasDraft ? 'btn-outline' : 'btn-primary'}`} onClick={onStart} disabled={starting}>
              {starting && <Loader2 size={16} className="spin" />}
              {hasDraft ? 'Start a new exam' : 'Start exam'}
            </button>
          </div>
        </section>

        <section className="card exam-history">
          <h2>Past attempts</h2>
          {history.length === 0 ? (
            <p className="lab-muted">No attempts yet. Your scores will appear here.</p>
          ) : (
            <ol>
              {history.slice(0, 6).map((h) => (
                <li key={h.id}>
                  <span className="history-score">{h.score}</span>
                  <span className="history-meta">
                    Level {levelForScore(h.score).level}, {levelForScore(h.score).name}
                    <small>{new Date(h.date).toLocaleDateString()}{h.pending > 0 ? `, ${h.pending} not yet marked` : ''}</small>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}

function QuestionBody({ item, answer, setAnswer, codeResult, setCodeResult, theme }) {
  const q = item.q;
  if (item.type === 'mcq') {
    return (
      <>
        <h2 className="exam-question">{q.question}</h2>
        {q.code && <pre className="lab-schema">{q.code}</pre>}
        <div className="exam-choices" role="radiogroup">
          {q.choices.map((choice, i) => (
            <button
              key={i}
              role="radio"
              aria-checked={answer === i}
              className={`exam-choice ${answer === i ? 'selected' : ''}`}
              onClick={() => setAnswer(i)}
            >
              <span className="exam-choice-letter">{String.fromCharCode(65 + i)}</span>
              <span>{choice}</span>
            </button>
          ))}
        </div>
      </>
    );
  }
  if (item.type === 'short') {
    return (
      <>
        <h2 className="exam-question">{q.question}</h2>
        <label className="editor-label" htmlFor={`a-${item.key}`}>Your answer (a word or short phrase)</label>
        <input
          id={`a-${item.key}`}
          className="short-input"
          type="text"
          value={answer || ''}
          onChange={(e) => setAnswer(e.target.value)}
          autoComplete="off"
        />
      </>
    );
  }
  if (item.type === 'desc') {
    return (
      <>
        <h2 className="exam-question">{q.question}</h2>
        <label className="editor-label" htmlFor={`a-${item.key}`}>Your answer</label>
        <textarea
          id={`a-${item.key}`}
          className="desc-input"
          rows={10}
          value={answer || ''}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <p className="lab-muted">{(answer || '').trim().split(/\s+/).filter(Boolean).length} words. The real test allows up to 450.</p>
      </>
    );
  }
  if (item.type === 'code') {
    return (
      <>
        <h2 className="exam-question">{q.title}</h2>
        <CodeChallenge
          challenge={q}
          code={answer}
          onCodeChange={setAnswer}
          result={codeResult}
          onResult={setCodeResult}
          examMode
        />
      </>
    );
  }
  if (item.type === 'calc') {
    return (
      <>
        <h2 className="exam-question">{q.title}</h2>
        <CalcTask task={q} values={answer || {}} onChange={setAnswer} examMode />
      </>
    );
  }
  return (
    <>
      <h2 className="exam-question">{q.title} ({q.kind.toLowerCase()})</h2>
      <p className="lab-prompt">{q.prompt}</p>
      <DiagramCanvas
        initialXml={answer?.xml}
        dark={theme === 'dark'}
        onChange={(next) => setAnswer((prev) => ({ ...(prev || {}), ...next }))}
      />
    </>
  );
}

function ReviewItem({ item, index, answer, grade, setGrade, theme }) {
  const q = item.q;
  const earned = earnedPoints(item, answer, grade);
  const pending = earned === null;
  const status = pending ? 'pending' : earned === item.points ? 'full' : earned > 0 ? 'partial' : 'none';

  return (
    <li className={`review-row ${status}`}>
      <div className="review-row-head">
        <span className="review-num">Q{index + 1}</span>
        <span className="review-type">{TYPE_LABELS[item.type]}, {item.module}</span>
        <span className="review-points">{pending ? 'Needs marking' : `${earned} / ${item.points}`}</span>
      </div>
      <p className="review-question">{q.question || q.title}</p>

      {item.type === 'mcq' && (
        <>
          <p className="review-line">
            {answer === q.correctIndex ? <CheckCircle2 size={15} className="icon-success" /> : <XCircle size={15} className="icon-danger" />}
            Your answer: {answer === undefined ? 'not answered' : q.choices[answer]}
          </p>
          {answer !== q.correctIndex && <p className="review-line">Correct answer: {q.choices[q.correctIndex]}</p>}
          {q.explanation && <p className="review-explain">{q.explanation}</p>}
        </>
      )}

      {item.type === 'short' && (
        <>
          <p className="review-line">Your answer: {answer ? answer : 'not answered'}</p>
          <p className="review-line">Expected: {q.answer}</p>
          {q.explanation && <p className="review-explain">{q.explanation}</p>}
          {answer && (
            <div className="grade-buttons">
              <span>Marked automatically. Disagree?</span>
              {[[true, 'Count as correct'], [false, 'Count as wrong']].map(([value, label]) => {
                const current = grade && typeof grade.override === 'boolean' ? grade.override : isShortAnswerCorrect(answer, q.answers || q.answer);
                return (
                  <button key={label} className={current === value ? 'active' : ''} onClick={() => setGrade({ override: value })}>
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}

      {item.type === 'desc' && (
        <>
          <div className="review-two">
            <div><span className="io-label">Your answer</span><p>{answer || 'Not answered'}</p></div>
            <div><span className="io-label">Model answer</span><p>{q.answer}</p></div>
          </div>
          <div className="grade-buttons">
            <span>Compare with the model answer and mark yourself:</span>
            {[[1, 'Covers it'], [0.5, 'Partly'], [0, 'Missed it']].map(([value, label]) => (
              <button key={label} className={grade?.self === value ? 'active' : ''} onClick={() => setGrade({ self: value })}>
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {item.type === 'code' && (
        <>
          <p className="review-line">
            {grade && grade.total > 0 ? `${grade.passed} of ${grade.total} checks passed.` : 'Not answered.'}
          </p>
          <div className="review-two">
            <div><span className="io-label">Your answer</span><pre>{answer || '(empty)'}</pre></div>
            <div><span className="io-label">One possible solution</span><pre>{q.solution}</pre></div>
          </div>
          <p className="review-explain">{q.explanation}</p>
        </>
      )}

      {item.type === 'calc' && (
        <>
          <table className="plain-table calc-review">
            <thead><tr><th>Asked for</th><th>Your answer</th><th>Correct answer</th></tr></thead>
            <tbody>
              {q.fields.map((field, i) => {
                const ok = gradeCalc(q, answer || {}).marks[i];
                return (
                  <tr key={i} className={ok ? 'ok' : 'bad'}>
                    <td>{field.label}</td>
                    <td>{answer?.[i] ? answer[i] : 'blank'}</td>
                    <td>{String(field.answer)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="review-explain">{q.explanation}</p>
        </>
      )}

      {item.type === 'diagram' && (
        <>
          {answer?.preview ? (
            <img className="diagram-preview" src={answer.preview} alt="Your diagram" />
          ) : (
            <p className="review-line">{answer?.xml ? 'Your diagram was saved, but no preview is available.' : 'No diagram drawn.'}</p>
          )}
          {answer?.xml && (
            <>
              <p className="review-line">Tick each element your diagram shows:</p>
              <Checklist
                idPrefix={`rev-${item.key}`}
                items={q.checklist}
                checked={grade?.checked || []}
                onChange={(checked) => setGrade({ checked })}
              />
            </>
          )}
          <p className="review-explain">{q.modelAnswer}</p>
          {q.mermaid && (
            <details className="model-details">
              <summary>Show a model diagram</summary>
              <ModelDiagram source={q.mermaid} dark={theme === 'dark'} />
            </details>
          )}
        </>
      )}
    </li>
  );
}

function ExamReview({ exam, onDone, setGrade, theme }) {
  const { items, answers, grades } = exam;
  const rows = items.map((item) => ({ item, earned: earnedPoints(item, answers[item.key], grades[item.key]) }));
  const score = rows.reduce((sum, r) => sum + (r.earned || 0), 0);
  const pending = rows.filter((r) => r.earned === null).length;
  const level = levelForScore(score);

  const byModule = OFFICIAL_MODULES.map((m) => {
    const mine = rows.filter((r) => r.item.module === m.id);
    return {
      ...m,
      earned: mine.reduce((s, r) => s + (r.earned || 0), 0),
      available: mine.reduce((s, r) => s + r.item.points, 0),
    };
  });
  const types = ['mcq', 'short', 'desc', 'code', 'calc', 'diagram'].map((type) => {
    const mine = rows.filter((r) => r.item.type === type);
    return {
      type,
      earned: mine.reduce((s, r) => s + (r.earned || 0), 0),
      available: mine.reduce((s, r) => s + r.item.points, 0),
    };
  });

  return (
    <div className="exam-review">
      <header className="page-head">
        <h1>Exam result</h1>
        <p>
          {pending > 0
            ? `${pending} answers still need your marking below. The score updates as you mark them.`
            : 'Everything is marked. This attempt is saved under past attempts.'}
        </p>
      </header>

      <section className="card score-sheet">
        <div className="score-main">
          <span className="score-number">{score}</span>
          <span className="score-of">out of {TOTAL_POINTS.toLocaleString()}</span>
          <span className="score-level">Level {level.level}, {level.name}</span>
        </div>
        <div className="score-breakdown">
          <h3>By module</h3>
          {byModule.map((m) => (
            <div className="score-row" key={m.id}>
              <span className="score-row-label">{m.id} {m.title}</span>
              <span className="score-track">
                <span className="score-fill" style={{ width: `${m.available ? (m.earned / m.available) * 100 : 0}%`, background: m.color }} />
              </span>
              <span className="score-row-value">{m.earned} / {m.available}</span>
            </div>
          ))}
          <h3>By question type</h3>
          {types.map((t) => (
            <div className="score-row" key={t.type}>
              <span className="score-row-label">{TYPE_LABELS[t.type]}</span>
              <span className="score-track">
                <span className="score-fill" style={{ width: `${t.available ? (t.earned / t.available) * 100 : 0}%` }} />
              </span>
              <span className="score-row-value">{t.earned} / {t.available}</span>
            </div>
          ))}
        </div>
      </section>

      <ol className="review-list">
        {items.map((item, i) => (
          <ReviewItem
            key={item.key}
            item={item}
            index={i}
            answer={answers[item.key]}
            grade={grades[item.key]}
            setGrade={(g) => setGrade(item.key, g)}
            theme={theme}
          />
        ))}
      </ol>

      <div className="lab-actions">
        <button className="btn btn-primary" onClick={onDone}>Finish review</button>
      </div>
    </div>
  );
}

export function ExamPage({ theme }) {
  const [stage, setStage] = useState('intro'); // intro | running | grading | review
  const [exam, setExam] = useState(null); // { id, items, answers, grades, flagged, endsAt, index }
  const [codeResults, setCodeResults] = useState({});
  const [history, setHistory] = useState(() => loadJSON(LAB_KEYS.EXAM_HISTORY, []));
  const [hasDraft, setHasDraft] = useState(() => Boolean(loadJSON(LAB_KEYS.EXAM_DRAFT, null)));
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);
  const submittedRef = useRef(false);

  // Clock tick
  useEffect(() => {
    if (stage !== 'running') return undefined;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [stage]);

  // Save progress while the exam is running or being reviewed
  useEffect(() => {
    if (exam && (stage === 'running' || stage === 'review')) {
      saveJSON(LAB_KEYS.EXAM_DRAFT, { ...exam, stage });
    }
  }, [exam, stage]);

  const saveToHistory = useCallback((finished) => {
    const rows = finished.items.map((item) => earnedPoints(item, finished.answers[item.key], finished.grades[item.key]));
    const entry = {
      id: finished.id,
      date: finished.submittedAt,
      score: rows.reduce((s, v) => s + (v || 0), 0),
      pending: rows.filter((v) => v === null).length,
    };
    setHistory((prev) => {
      const next = [entry, ...prev.filter((h) => h.id !== entry.id)].slice(0, 20);
      saveJSON(LAB_KEYS.EXAM_HISTORY, next);
      return next;
    });
  }, []);

  const submit = useCallback(async () => {
    if (submittedRef.current || !exam) return;
    submittedRef.current = true;
    setConfirming(false);
    setStage('grading');
    const grades = { ...exam.grades };
    for (const item of exam.items) {
      if (item.type !== 'code') continue;
      const answer = exam.answers[item.key];
      if (!isAnswered(item, answer)) {
        grades[item.key] = { passed: 0, total: 0 };
        continue;
      }
      try {
        const res = await gradeChallenge(item.q, answer);
        grades[item.key] = { passed: res.passed, total: res.total };
      } catch {
        grades[item.key] = { passed: 0, total: 0, failed: true };
      }
    }
    const finished = { ...exam, grades, submittedAt: new Date().toISOString() };
    setExam(finished);
    saveToHistory(finished);
    setStage('review');
    window.scrollTo({ top: 0 });
  }, [exam, saveToHistory]);

  const remaining = exam ? exam.endsAt - now : 0;
  useEffect(() => {
    if (stage === 'running' && exam && remaining <= 0) submit();
  }, [stage, exam, remaining, submit]);

  const start = async () => {
    setStarting(true);
    setError(null);
    try {
      const items = await buildExam();
      submittedRef.current = false;
      setCodeResults({});
      setExam({
        id: `exam-${Date.now()}`,
        items,
        answers: {},
        grades: {},
        flagged: {},
        index: 0,
        endsAt: Date.now() + EXAM_MINUTES * 60 * 1000,
      });
      setNow(Date.now());
      setStage('running');
      warmUpRunner();
    } catch (err) {
      setError(err.message || 'Could not build the exam.');
    } finally {
      setStarting(false);
    }
  };

  const resume = () => {
    const draft = loadJSON(LAB_KEYS.EXAM_DRAFT, null);
    if (!draft) return;
    const { stage: savedStage, ...rest } = draft;
    submittedRef.current = savedStage === 'review';
    setExam(rest);
    setNow(Date.now());
    setStage(savedStage === 'review' ? 'review' : 'running');
    if (savedStage !== 'review') warmUpRunner();
  };

  const finishReview = () => {
    removeKey(LAB_KEYS.EXAM_DRAFT);
    setHasDraft(false);
    setExam(null);
    setStage('intro');
    window.scrollTo({ top: 0 });
  };

  const setGrade = (key, grade) => {
    setExam((prev) => {
      const next = { ...prev, grades: { ...prev.grades, [key]: { ...(prev.grades[key] || {}), ...grade } } };
      saveToHistory(next);
      return next;
    });
  };

  const sections = useMemo(() => {
    if (!exam) return [];
    const groups = [];
    exam.items.forEach((item, index) => {
      const label = ['code', 'calc', 'diagram'].includes(item.type) ? 'Performance' : TYPE_LABELS[item.type];
      const last = groups[groups.length - 1];
      if (last && last.label === label) last.entries.push({ item, index });
      else groups.push({ label, entries: [{ item, index }] });
    });
    return groups;
  }, [exam]);

  if (stage === 'intro') {
    return <ExamIntro onStart={start} onResume={resume} hasDraft={hasDraft} history={history} starting={starting} error={error} />;
  }

  if (stage === 'grading') {
    return (
      <div className="card lab-empty">
        <Loader2 size={28} className="spin" />
        <p>Marking your answers and running your code</p>
      </div>
    );
  }

  if (stage === 'review') {
    return <ExamReview exam={exam} onDone={finishReview} setGrade={setGrade} theme={theme} />;
  }

  const item = exam.items[exam.index];
  const answer = exam.answers[item.key];
  const answeredCount = exam.items.filter((it) => isAnswered(it, exam.answers[it.key])).length;
  const goTo = (index) => setExam((prev) => ({ ...prev, index: Math.max(0, Math.min(prev.items.length - 1, index)) }));
  const setAnswer = (value) =>
    setExam((prev) => {
      const current = prev.answers[item.key];
      const next = typeof value === 'function' ? value(current) : value;
      return { ...prev, answers: { ...prev.answers, [item.key]: next } };
    });
  const low = remaining < 10 * 60 * 1000;

  return (
    <div className="exam-running">
      <div className="exam-bar card">
        <div className={`exam-clock ${low ? 'low' : ''}`} role="timer" aria-label="Time remaining">
          <Clock size={18} />
          <span>{formatClock(remaining)}</span>
        </div>
        <span className="exam-progress">{answeredCount} of {exam.items.length} answered</span>
        <button className="btn btn-primary" onClick={() => setConfirming(true)}>
          <Send size={16} /> Submit exam
        </button>
      </div>

      <div className="exam-layout">
        <nav className="exam-nav card" aria-label="Questions">
          {sections.map((group) => (
            <div key={group.label} className="exam-nav-group">
              <span className="exam-nav-label">{group.label}</span>
              <div className="exam-nav-grid">
                {group.entries.map(({ item: it, index }) => (
                  <button
                    key={it.key}
                    className={[
                      'exam-dot',
                      index === exam.index ? 'current' : '',
                      isAnswered(it, exam.answers[it.key]) ? 'answered' : '',
                      exam.flagged[it.key] ? 'flagged' : '',
                    ].join(' ')}
                    onClick={() => goTo(index)}
                    aria-label={`Question ${index + 1}${exam.flagged[it.key] ? ', flagged' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <section className="exam-panel card">
          <div className="exam-panel-head">
            <span className="exam-panel-meta">
              Question {exam.index + 1} of {exam.items.length}. {TYPE_LABELS[item.type]}, {item.points} points, {item.module}
            </span>
            <button
              className={`flag-button ${exam.flagged[item.key] ? 'on' : ''}`}
              onClick={() => setExam((prev) => ({ ...prev, flagged: { ...prev.flagged, [item.key]: !prev.flagged[item.key] } }))}
            >
              <Flag size={15} /> {exam.flagged[item.key] ? 'Flagged' : 'Flag for review'}
            </button>
          </div>

          <QuestionBody
            key={item.key}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            codeResult={codeResults[item.key]}
            setCodeResult={(r) => setCodeResults((prev) => ({ ...prev, [item.key]: r }))}
            theme={theme}
          />

          <div className="exam-panel-foot">
            <button className="btn btn-outline" onClick={() => goTo(exam.index - 1)} disabled={exam.index === 0}>
              <ArrowLeft size={16} /> Previous
            </button>
            <button className="btn btn-outline" onClick={() => goTo(exam.index + 1)} disabled={exam.index === exam.items.length - 1}>
              Next <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </div>

      {confirming && (
        <div className="exam-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="submit-title">
          <div className="exam-modal card">
            <h2 id="submit-title">Submit the exam?</h2>
            <p>
              You have answered {answeredCount} of {exam.items.length} questions with {formatClock(remaining)} left.
              You cannot change answers after submitting.
            </p>
            <div className="lab-actions">
              <button className="btn btn-outline" onClick={() => setConfirming(false)}>Keep working</button>
              <button className="btn btn-primary" onClick={submit}>Submit exam</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
