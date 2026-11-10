# Topcit

A personal study app for the **TOPCIT** (*Test of Practical Competency in IT*) exam: practice quizzes with explanations, study reviewers, and score tracking.

Maintained by **[katzennjammer](https://github.com/katzennjammer)**. Built on [topcit-reviewer](https://github.com/ire-zepelli/topcit-reviewer) by Benedict Avenido.

---

## Features

- **Dashboard by official module.** Quizzes are grouped under the four TOPCIT modules, and a score map shows how much of the 1,000 points each module is worth next to your best quiz accuracy.
- **Practice quizzes.** 700 multiple-choice questions and 25 descriptive questions, plus a bank of 60 short-answer questions used by the mock exam. Every multiple-choice question explains why the correct answer is correct, whether you got it right or wrong. Questions and choices are shuffled on each attempt, drafts are saved, and you can retry only the questions you missed.
- **Performance lab.** Write and run real Python and SQL in the browser, and work through calculation problems (subnetting, scheduling, paging, RAID, availability, RSA, earned value, critical path, PERT, ROI). Everything is checked automatically, with a time limit that stops infinite loops.
- **Diagram lab.** Draw activity, class, ER, sequence and use case diagrams and flow charts in an embedded diagrams.net editor, then mark your drawing against a checklist, a written model answer and a drawn model diagram.
- **Mock exam.** 65 questions in 150 minutes for 1,000 points, mixed by the official question-type weights (multiple choice 190, short answer 120, descriptive 210, performance 480) and the official module weights (M1 365, M2 265, M3 235, M4 135). Multiple choice, short answer, code and calculations are marked automatically; you mark descriptive answers and diagrams yourself. The result shows your score, competency level and a breakdown by module and question type.
- **Reviewers.** Study notes for each subject, rendered from Markdown in `public/reviewers/`.
- **Light and dark themes**, and a layout that works on phones.

Everything is stored in the browser's `localStorage`. There is no account or server.

---

## Modules

| Module | Points | Question sets |
| :--- | :--- | :--- |
| **M1 Software Development** | 365 | `E1_Software_Development.json`, `Coding_Snippets.json`, Python tasks, UML diagrams |
| **M2 Data Management** | 265 | `E2_Database.json`, `SQL_Queries.json`, SQL tasks, ER diagram |
| **M3 Systems Architecture & Information Security** | 235 | `E3_System_Architecture.json`, `E4_Information_Security.json`, calculation tasks |
| **M4 IT Business** | 135 | `E5_IT_Business_and_Ethics.json`, `E6_Project_Management.json`, calculation tasks |

Content lives in `public/`:

- `public/essences/` and `public/others/`: quiz questions
- `public/practice/coding_challenges.json`: Python and SQL tasks with tests and solutions
- `public/practice/calculation_tasks.json`: calculation problems with worked solutions
- `public/practice/diagram_tasks.json`: diagram tasks with checklists and model answers
- `public/others/Short_Answers.json`: short-answer questions with accepted answers
- `public/reviewers/`: study notes

The module-to-question-set mapping and point values are in `src/data/modules.js`.

### Limits to know about

- Code runs as Python (through Pyodide) and SQL (SQLite). C, C++ and Java are not supported.
- The performance lab and diagram lab load their engines from the internet (cdn.jsdelivr.net and embed.diagrams.net), so they need a connection.

---

## Tech stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm)
- **Code execution**: [Pyodide](https://pyodide.org/) in a Web Worker (Python and SQLite)
- **Diagram editor**: [diagrams.net](https://www.diagrams.net/) embed mode
- **Model diagrams**: [Mermaid](https://mermaid.js.org/), loaded on demand
- **Styling**: Vanilla CSS3 Tokens (Flexbox & CSS Grid, responsive design)

---

## Getting started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your system.

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/katzennjammer/Topcit.git

# 2. Navigate to the project folder
cd Topcit

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## Credits

This project started from [topcit-reviewer](https://github.com/ire-zepelli/topcit-reviewer) by Benedict Avenido ([@ire-zepelli](https://github.com/ire-zepelli)), who built the original quiz engine, question sets and reviewer notes.
