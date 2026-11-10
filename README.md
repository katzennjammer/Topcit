# Topcit

A personal study app for the **TOPCIT** (*Test of Practical Competency in IT*) exam: practice quizzes with explanations, study reviewers, and score tracking.

Maintained by **[katzennjammer](https://github.com/katzennjammer)**. Built on [topcit-reviewer](https://github.com/ire-zepelli/topcit-reviewer) by Benedict Avenido.

---

## 🌟 Key Features

- ⚡ **Interactive Quiz Engine**:
  - **Randomized Questions & Choices**: Questions and choices (A, B, C, D) are randomly shuffled for every new attempt using the Fisher-Yates algorithm, while keeping correct answer mapping accurate.
  - **Multiple Question Types**:
    - **Multiple-Choice Questions**: Instant visual feedback (green/red active option states), choice selection locking once an answer is cast, and an explanation of why the correct answer is correct, shown whether you answered right or wrong.
    - **Descriptive / Essay Questions**: Multiline text area for written responses, model reference answer reveal, and self-evaluation grading (*Mark as Correct* / *Mark as Incorrect*).
    - **Code Snippets & Tables**: Formatted monospace code blocks and database schema tables embedded directly in questions.
  - **Retry Missed Questions**: After a quiz, start a practice round with only the questions you got wrong. Practice rounds do not affect saved scores.
  - **Question Navigation**: Interactive Question Map jumper grid to inspect, flag, or skip questions.
  - **Optional Timer**: Toggleable count-up timer.
  - **Full Keyboard Shortcuts**: `1`-`4` or `A`-`D` to select choices, `Arrow keys` or `N`/`P` to navigate, `F` to flag.

- 📖 **Comprehensive Study Reviewers**:
  - Dedicated **Reviewers Tab** loaded dynamically from `public/reviewers/`.
  - Full GitHub-Flavored Markdown (GFM) rendering with rich tables, styled code blocks, callouts, and bullet lists.
  - Direct **"Take Quiz"** action buttons integrated into each reviewer module header.

- 💾 **Draft & High Score Persistence**:
  - In-progress quiz drafts auto-saved to `localStorage` (**"Continue Quiz"** or **"Restart Quiz"** anytime).
  - Preserves exact randomized question sequences during ongoing drafts.
  - Tracks high scores, percentage accuracy, and time spent across attempts.

- 🌗 **Modern UI & Dark Mode**:
  - Light & Dark theme toggle with auto-system preference detection.
  - Smooth micro-animations, glassmorphism headers, responsive mobile/desktop design.

---

## 📚 TOPCIT Competency Domains & Modules

| Module ID | Domain / Focus | File Path | Description |
| :--- | :--- | :--- | :--- |
| **Essence 1** | **Software Development** | `public/essences/E1_Software_Development.json`<br>`public/reviewers/V1_Software Development.md` | Lifecycle models, design patterns, testing, refactoring, reuse, and version control. |
| **Essence 2** | **Database Systems** | `public/essences/E2_Database.json`<br>`public/reviewers/V2_Database.md` | Data modeling, relational algebra, SQL optimization, normalization, transactions, and indexing. |
| **Essence 3** | **System Architecture** | `public/essences/E3_System_Architecture.json`<br>`public/reviewers/V3_System Architecture.md` | Hardware architectures, network protocols, cloud platforms, OS concepts, and virtualization. |
| **Essence 4** | **Information Security** | `public/essences/E4_Information_Security.json`<br>`public/reviewers/V4_Information Security.md` | CIA triad, cryptography, authentication protocols, network security, and threat analysis. |
| **Essence 5** | **IT Business & Ethics** | `public/essences/E5_IT_Business_and_Ethics.json`<br>`public/reviewers/V5_IT Business and Ethics.md` | Digital strategy, IT value creation, IP law, open-source licenses, and tech ethics. |
| **Essence 6** | **Project Management** | `public/essences/E6_Project_Management.json`<br>`public/reviewers/V6_Project Management.md` | PMBOK framework, Agile/Scrum methods, risk assessment, quality control, and budgeting. |
| **Other 1** | **Coding Snippets & Logic** | `public/others/Coding_Snippets.json` | Code tracing, variables, control flow, functions, operators, and memory practice. |
| **Other 2** | **SQL Queries & Manipulation** | `public/others/SQL_Queries.json` | SELECT queries, JOINs, aggregations, GROUP BY, subqueries, and DDL/DML practice. |
| **Other 3** | **Descriptive & Conceptual Review** | `public/others/Descriptive_Questions.json` | Self-evaluated open-ended essay questions covering software lifecycle, normal forms, security, and project management. |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown) + [Remark GFM](https://github.com/remarkjs/remark-gfm)
- **Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Styling**: Vanilla CSS3 Tokens (Flexbox & CSS Grid, responsive design)

---

## 🚀 Getting Started

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
