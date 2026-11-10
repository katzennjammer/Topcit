import { Code2, PenTool, Timer, ChevronRight } from 'lucide-react';
import { QuizCard } from './QuizCard';
import { getQuizScores, loadJSON, LAB_KEYS } from '../utils/storage';
import { OFFICIAL_MODULES, TOTAL_POINTS, levelForScore } from '../data/modules';

export function HomePage({ quizList, onSelectQuiz, onRestartQuiz, onNavigate }) {
  const scores = getQuizScores();
  const examHistory = loadJSON(LAB_KEYS.EXAM_HISTORY, []);
  const codeLab = loadJSON(LAB_KEYS.CODE, { solved: {} });
  const lastExam = examHistory[0];

  // Best quiz accuracy per module, used to shade the score map
  const modules = OFFICIAL_MODULES.map((mod) => {
    const quizzes = quizList.filter((q) => mod.quizIds.includes(q.id));
    const attempted = quizzes.filter((q) => scores[q.id]?.attempts > 0);
    const accuracy = attempted.length
      ? Math.round(attempted.reduce((sum, q) => sum + (scores[q.id].bestPercentage || 0), 0) / quizzes.length)
      : 0;
    return { ...mod, quizzes, accuracy, started: attempted.length > 0 };
  });
  const mixed = quizList.filter((q) => !OFFICIAL_MODULES.some((m) => m.quizIds.includes(q.id)));
  const anyStarted = modules.some((m) => m.started);

  const withModuleColor = (quiz, color) => ({ ...quiz, color, accentLight: 'var(--surface-hover)' });

  return (
    <div className="home-page">
      <section className="score-map">
        <h1>Where the {TOTAL_POINTS.toLocaleString()} points are</h1>
        <p className="score-map-lede">
          TOPCIT scores four modules, and they are not worth the same. Each block below is as wide
          as its share of the score. The shaded part is your best quiz accuracy in that module.
        </p>

        <div className="score-map-bar" role="img" aria-label="Share of the total score per module">
          {modules.map((m) => (
            <div key={m.id} className="score-map-seg" style={{ flex: m.points, '--seg': m.color }}>
              <span className="score-map-fill" style={{ height: `${m.accuracy}%` }} />
              <span className="score-map-id">{m.id}</span>
              <span className="score-map-points">{m.points}</span>
            </div>
          ))}
        </div>

        <ul className="score-map-legend">
          {modules.map((m) => (
            <li key={m.id}>
              <span className="legend-swatch" style={{ background: m.color }} />
              <span className="legend-title">{m.id} {m.title}</span>
              <span className="legend-value">
                {m.points} points, {m.started ? `${m.accuracy}% quiz accuracy` : 'not started'}
              </span>
            </li>
          ))}
        </ul>
        {!anyStarted && (
          <p className="score-map-hint">Finish a quiz below and its module starts to fill in.</p>
        )}
      </section>

      <section className="type-links" aria-label="Practice beyond multiple choice">
        <h2>Most of the score is not multiple choice</h2>
        <p className="section-lede">
          Multiple choice is 19% of the test. Coding, diagrams and written answers make up the rest.
        </p>
        <div className="type-link-row">
          <button className="type-link" onClick={() => onNavigate('code')}>
            <Code2 size={22} />
            <span className="type-link-text">
              <strong>Code lab</strong>
              <small>Run Python and SQL. {Object.keys(codeLab.solved || {}).length} solved so far.</small>
            </span>
            <ChevronRight size={18} />
          </button>
          <button className="type-link" onClick={() => onNavigate('diagram')}>
            <PenTool size={22} />
            <span className="type-link-text">
              <strong>Diagram lab</strong>
              <small>Draw UML, ER diagrams and flow charts.</small>
            </span>
            <ChevronRight size={18} />
          </button>
          <button className="type-link" onClick={() => onNavigate('exam')}>
            <Timer size={22} />
            <span className="type-link-text">
              <strong>Mock exam</strong>
              <small>
                {lastExam
                  ? `Last score ${lastExam.score}, level ${levelForScore(lastExam.score).level}.`
                  : '65 questions in 150 minutes.'}
              </small>
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {modules.map((m) => (
        <section key={m.id} className="module-section" style={{ '--seg': m.color }}>
          <header className="module-head">
            <span className="module-id">{m.id}</span>
            <div>
              <h2>{m.title}</h2>
              <p>{m.summary}</p>
            </div>
            <span className="module-points">{m.points} points</span>
          </header>
          <div className="quiz-grid">
            {m.quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={withModuleColor(quiz, m.color)}
                onSelectQuiz={onSelectQuiz}
                onRestartQuiz={onRestartQuiz}
              />
            ))}
          </div>
        </section>
      ))}

      {mixed.length > 0 && (
        <section className="module-section" style={{ '--seg': 'var(--text-muted)' }}>
          <header className="module-head">
            <span className="module-id">All</span>
            <div>
              <h2>Written answers across modules</h2>
              <p>Descriptive questions you mark yourself against a model answer.</p>
            </div>
          </header>
          <div className="quiz-grid">
            {mixed.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={withModuleColor(quiz, 'var(--text-muted)')}
                onSelectQuiz={onSelectQuiz}
                onRestartQuiz={onRestartQuiz}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
