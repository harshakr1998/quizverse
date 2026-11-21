# QuizVerse

QuizVerse is a static interview-practice app for QA engineers and SDETs. Browse Java, Selenium, Python and Playwright topics, take a timed quiz, and review explanations afterward.

## Getting started

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The production build uses the `/quizverse/` base path for GitHub Pages.

```sh
npm run validate:data
npm run lint
npm run build
```

The app uses React 19, TypeScript, Vite, Anime.js and Lucide icons. GitHub Actions builds and deploys `dist` to GitHub Pages.

## Practice sessions

Each attempt draws up to 10 questions from its topic, shuffles the answer order, and has a 10-minute deadline. The current attempt and its deadline are stored in the browser so it can be resumed after a refresh. Storage is local to the device and may be unavailable in some browser configurations. Starting a new attempt replaces the previous one.

## Question content

Question banks live in `src/data/<technology>/<topic>.json` and are registered in `src/data/index.ts`. Each record has an ID, topic, difficulty (`Easy`, `Medium`, or `Hard`), question, four distinct options, a zero-based `correctAnswer`, an explanation, and tags. Run `npm run validate:data` after editing. Validation checks structure, obvious placeholders and normalized duplicate question text across the bank; it cannot detect every paraphrased duplicate or establish technical accuracy, so each addition needs subject-matter review.

The former placeholder generator produced fake answers and has been removed. Do not add procedurally generated filler to the question bank.
