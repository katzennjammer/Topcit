# 🚀 TOPCIT Reviewer & Practice Platform

A modern, lightweight, and responsive web application designed for comprehensive **TOPCIT** (*Test of Practical Competency in IT*) preparation, self-assessment, and study review.

Made by **[Benedict Avenido](https://github.com/ire-zepelli)**.

---

## 🌟 Key Features

- ⚡ **Interactive Quiz Engine**:
  - Dynamically loads and normalizes question sets from `public/essences/`.
  - Instant visual feedback on every answer (correct vs. incorrect highlighting with explanations).
  - Choice selection locking once an answer is cast.
  - Question map jumper grid to inspect, flag, or skip to any question.
  - Optional count-up timer.
  - Full keyboard shortcuts (`1`-`4` or `A`-`D` to answer, `Arrow keys` or `N`/`P` to navigate, `F` to flag).

- 📖 **Comprehensive Study Reviewers**:
  - Dedicated **Reviewers Tab** loaded dynamically from `public/reviewers/`.
  - Full GitHub-Flavored Markdown (GFM) rendering with rich tables, styled code blocks, callouts, and lists.
  - Built-in search bar to filter concepts and terms across study guides.
  - Direct **"Take Quiz"** action buttons integrated into each reviewer module.

- 💾 **Draft & High Score Persistence**:
  - In-progress quiz drafts are auto-saved to `localStorage` (**"Continue Quiz"** or **"Restart Quiz"** anytime).
  - Tracks high scores, percentage accuracy, and time spent across attempts.

- 🌗 **Modern UI & Dark Mode**:
  - Light & Dark theme toggle with auto-system preference detection.
  - Smooth micro-animations, glassmorphism headers, responsive mobile/desktop design.

---

## 📚 TOPCIT Competency Domains

| ID | Domain | Module Files | Description |
| :--- | :--- | :--- | :--- |
| **01** | **Software Engineering** | `E1_Software_Development.json`<br>`V1_Software Development.md` | Lifecycle models, design patterns, testing, refactoring, reuse, and version control. |
| **02** | **Database Systems** | `E2_Database.json`<br>`V2_Database.md` | Data modeling, relational algebra, SQL optimization, normalization, transactions, and indexing. |
| **03** | **System Architecture** | `E3_System_Architecture.json`<br>`V3_System Architecture.md` | Hardware architectures, network protocols, cloud platforms, OS concepts, and virtualization. |
| **04** | **Information Security** | `E4_Information_Security.json`<br>`V4_Information Security.md` | CIA triad, cryptography, authentication protocols, network security, and threat analysis. |
| **05** | **IT Business & Ethics** | `E5_IT_Business_and_Ethics.json`<br>`V5_IT Business and Ethics.md` | Digital strategy, IT value creation, IP law, open-source licenses, and tech ethics. |
| **06** | **Project Management** | `E6_Project_Management.json`<br>`V6_Project Management.md` | PMBOK framework, Agile/Scrum methods, risk assessment, quality control, and budgeting. |

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
git clone https://github.com/ire-zepelli/topcit-reviewer.git

# 2. Navigate to the project folder
cd topcit-reviewer

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

---

## 👨‍💻 Author

Developed by **Benedict Avenido**
- **GitHub**: [@ire-zepelli](https://github.com/ire-zepelli)
- **Repository**: [topcit-reviewer](https://github.com/ire-zepelli/topcit-reviewer)
