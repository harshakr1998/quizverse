import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '../components/ScrollToTop';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { TechnologyPage } from '../pages/TechnologyPage';
import { InstructionsPage } from '../pages/InstructionsPage';
import { QuizPage } from '../pages/QuizPage';
import { ResultPage } from '../pages/ResultPage';
import { ReviewPage } from '../pages/ReviewPage';
import { useQuiz } from '../hooks/useQuiz';
import { getQuestions } from '../data';
import type { Question } from '../types';

export function AppRouter() {
  const quiz = useQuiz();

  const handleStart = (tech: string, topic: string, questions: Question[]) => {
    quiz.startQuiz(tech, topic, questions);
  };

  const handleRetry = () => {
    if (quiz.state) {
      const questions = getQuestions(quiz.state.technology, quiz.state.topic);
      quiz.startQuiz(quiz.state.technology, quiz.state.topic, questions);
    }
  };

  // Review navigation is handled inside ResultPage via Link/useNavigate

  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/technology/:tech" element={<TechnologyPage />} />
          <Route
            path="/quiz/:tech/:topic/instructions"
            element={<InstructionsPage onStart={handleStart} />}
          />
          <Route
            path="/quiz/:tech/:topic"
            element={
              <QuizPage
                quizState={quiz.state}
                onSelectAnswer={quiz.selectAnswer}
                onNext={quiz.nextQuestion}
                onPrev={quiz.prevQuestion}
                onSubmit={quiz.submitQuiz}
                answeredCount={quiz.answeredCount}
              />
            }
          />
          <Route
            path="/result"
            element={
              <ResultPage
                result={quiz.result}
                onRetry={handleRetry}
                onReview={() => {}}
              />
            }
          />
          <Route
            path="/review"
            element={
              <ReviewPage
                reviewItems={quiz.reviewItems}
                result={quiz.result}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
