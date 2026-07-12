# QuizVerse 🎯

> **Automation Interview Preparation Platform** — A fully static, zero-backend MCQ quiz app for QA Engineers, SDETs, and Automation Engineers.

[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://harshakr1998.github.io/quizverse/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-cyan?logo=tailwindcss)](https://tailwindcss.com)

---

## 🚀 Live Demo

**[https://harshakr1998.github.io/quizverse/](https://harshakr1998.github.io/quizverse/)**

---

## ✨ Features

- **4 Technologies** — Java, Selenium, Python, Playwright
- **18+ Topics** with 10 curated questions each
- **Randomized questions & options** every attempt
- **10-minute countdown timer** with auto-submit
- **Instant results** — score, grade, correct/incorrect/skipped
- **Detailed review** — explanations for every answer
- **Confetti 🎊** for 90%+ scores
- **Zero backend** — runs entirely in the browser from JSON files
- **Dark, premium UI** — glassmorphism, animations, responsive

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v6 (HashRouter) |
| Deployment | GitHub Actions → GitHub Pages |
| Data | Static JSON files |

---

## 📁 Project Structure

```
src/
  components/    # Reusable UI components
  data/          # JSON question banks
    java/        # basics, oop, collections, exceptions, streams
    selenium/    # locators, xpath, waits, pom, testng
    python/      # basics, oop, collections, exceptions
    playwright/  # locators, assertions, fixtures, api-testing
  hooks/         # useQuiz, useTimer
  layouts/       # MainLayout
  pages/         # HomePage, TechnologyPage, InstructionsPage, QuizPage, ResultPage, ReviewPage
  router/        # HashRouter setup
  types/         # TypeScript interfaces
  utils/         # shuffle, scoring, formatTime
```

---

## 🚀 Running Locally

```bash
git clone https://github.com/harshakr1998/quizverse.git
cd quizverse
npm install
npm run dev
```

Open [http://localhost:5173/quizverse/](http://localhost:5173/quizverse/)

---

## ➕ Adding New Questions

1. Find or create a JSON file in `src/data/<technology>/`
2. Follow the schema:

```json
{
  "id": 11,
  "topic": "Basics",
  "difficulty": "Medium",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation of why A is correct.",
  "tags": ["Java", "Basics"]
}
```

3. Register the import in `src/data/index.ts`
4. Questions and options are automatically shuffled in every quiz!

---

## 🤝 Contributing

Pull requests are welcome! Please:
- Follow the JSON schema above
- Write clear, accurate explanations
- Tag questions appropriately

---

## 📄 License

MIT © [Harsha K R](https://github.com/harshakr1998)
