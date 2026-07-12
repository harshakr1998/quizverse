# QuizVerse PRD (Product Requirements Document)

> Version: 1.0

## 1. Executive Summary

QuizVerse is a fully static interview preparation platform hosted on
GitHub Pages. Its primary audience is QA Engineers, SDETs, Automation
Engineers, and software developers preparing for interviews.

### Goals

-   Zero backend
-   Zero database
-   Zero authentication
-   Runs entirely in the browser
-   Easy to contribute question packs through JSON

------------------------------------------------------------------------

# 2. Target Audience

-   Freshers
-   QA Engineers
-   SDETs
-   Automation Engineers
-   Developers learning Java, Python and Playwright

------------------------------------------------------------------------

# 3. Technology Stack

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   Framer Motion
-   React Router (HashRouter)
-   GitHub Actions
-   GitHub Pages

------------------------------------------------------------------------

# 4. Information Architecture

Home - Technologies - About - Contribute

Technology - Topics

Topic - Quiz Instructions

Quiz - Questions - Timer - Progress

Result - Score - Review - Retry

------------------------------------------------------------------------

# 5. Pages

## Home

Purpose: - Introduce the platform - Display technology cards

Components: - Hero - Navbar - Search - Technology Grid - Footer

## Technology Page

Displays: - Topic cards - Question count - Estimated duration -
Difficulty mix

## Quiz Instructions

Displays: - Number of questions - Time limit - Scoring rules - Start
button

## Quiz Page

Contains: - Timer - Progress bar - Question card - Options - Previous -
Next - Submit

## Results

Shows: - Percentage - Correct - Incorrect - Unanswered - Time taken

Buttons: - Retry - Review Answers - Back Home

## Review

For every question show: - Question - User answer - Correct answer -
Explanation - Difficulty - Tags

------------------------------------------------------------------------

# 6. Components

-   Navbar
-   Footer
-   TechnologyCard
-   TopicCard
-   QuestionCard
-   OptionButton
-   ProgressBar
-   Timer
-   ResultCard
-   ReviewCard
-   Badge
-   DifficultyChip
-   EmptyState
-   LoadingSkeleton

------------------------------------------------------------------------

# 7. Folder Structure

``` text
src/
  assets/
  components/
  data/
    java/
    selenium/
    python/
    playwright/
  hooks/
  layouts/
  pages/
  router/
  types/
  utils/
```

------------------------------------------------------------------------

# 8. JSON Schema

``` json
{
  "id":1,
  "topic":"Collections",
  "difficulty":"Medium",
  "question":"Which collection maintains insertion order?",
  "options":["HashMap","HashSet","LinkedHashMap","TreeMap"],
  "correctAnswer":2,
  "explanation":"LinkedHashMap preserves insertion order.",
  "tags":["Collections","Map","Java"]
}
```

------------------------------------------------------------------------

# 9. Quiz Engine Rules

-   Load JSON
-   Shuffle questions
-   Shuffle options
-   Maintain answer mapping
-   One answer per question
-   Allow navigation
-   Auto submit on timer expiry
-   Calculate percentage
-   Show review

------------------------------------------------------------------------

# 10. Scoring

correct = +1

wrong = 0

percentage = (correct / total) \* 100

Grades: - 90--100 Excellent - 75--89 Great - 60--74 Good - Below 60
Needs Practice

------------------------------------------------------------------------

# 11. Topics

## Java

-   Basics
-   OOP
-   Collections
-   Exceptions
-   Streams
-   Threads
-   JVM
-   Memory
-   Generics
-   Design Patterns

## Selenium

-   Locators
-   XPath
-   CSS
-   Waits
-   Grid
-   Alerts
-   Frames
-   Windows
-   POM
-   TestNG

## Python

-   Basics
-   Functions
-   OOP
-   Modules
-   Exceptions
-   File Handling
-   Collections

## Playwright

-   Installation
-   Locators
-   Fixtures
-   Assertions
-   API Testing
-   Parallel Execution
-   Reporting

------------------------------------------------------------------------

# 12. UI Guidelines

Style: - Clean - Modern - Minimal - Responsive

Animations: - Page transitions - Card hover - Progress animation - Score
reveal - Confetti for 90%+

------------------------------------------------------------------------

# 13. Accessibility

-   Keyboard navigation
-   Focus states
-   ARIA labels
-   High contrast
-   Responsive typography

------------------------------------------------------------------------

# 14. GitHub Pages

Use: - HashRouter - Vite base path - GitHub Actions deployment

------------------------------------------------------------------------

# 15. Future Roadmap

Phase 2 - PWA - Offline cache - Import/export packs - Bookmark
questions - Dark mode

Phase 3 - AI generated quizzes - AI explanations - Resume interview
mode - Daily challenge - Community question packs

------------------------------------------------------------------------

# 16. Nice-to-have Ideas

-   Achievement badges
-   Streak counter (browser localStorage)
-   Weak-topic recommendations
-   Printable score report
-   Keyboard-only quiz mode
-   JSON validator for contributors

------------------------------------------------------------------------

# 17. Definition of Done

-   Fully responsive
-   Lighthouse score \>95
-   No backend
-   Deploys automatically to GitHub Pages
-   Easy to add new technologies by dropping JSON files
-   Clean TypeScript architecture
-   Reusable components
-   Well documented README

------------------------------------------------------------------------

# 18. Prompt for Codex

Build QuizVerse as a production-quality React + TypeScript application
using Vite, Tailwind CSS, Framer Motion and HashRouter. Keep the
architecture modular and component-driven. The application must be fully
static and compatible with GitHub Pages. Questions should be loaded from
JSON files, support randomization, timers, review mode, explanations,
and responsive UI. Follow clean coding principles, strict TypeScript,
reusable hooks, and accessible components.
