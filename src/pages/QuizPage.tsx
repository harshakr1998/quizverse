import { useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getTechnology } from '../data';
import { useTimer } from '../hooks/useTimer';
import { Timer } from '../components/Timer';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { EmptyState } from '../components/EmptyState';
import type { QuizState } from '../types';

interface QuizPageProps {
  quizState: QuizState | null;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  answeredCount: number;
}

export function QuizPage({ quizState, onSelectAnswer, onNext, onPrev, onSubmit, answeredCount }: QuizPageProps) {
  const { tech } = useParams<{ tech: string }>();
  const navigate = useNavigate();
  const technology = getTechnology(tech ?? '');

  const handleExpire = useCallback(() => {
    onSubmit();
    navigate('/result');
  }, [onSubmit, navigate]);

  const timer = useTimer(quizState?.timeLimit ?? 600, handleExpire);

  useEffect(() => {
    if (quizState?.status === 'active') {
      timer.start();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizState?.status]);

  // Redirect if no quiz
  if (!quizState || quizState.status === 'idle') {
    return (
      <EmptyState
        icon="⚠️"
        title="No quiz in progress"
        description="Please select a topic and start a quiz."
        action={<Link to="/" style={{ color: '#6366f1', fontWeight: 600 }}>← Home</Link>}
      />
    );
  }

  if (quizState.status === 'submitted') {
    navigate('/result');
    return null;
  }

  const { questions, currentIndex, answers } = quizState;
  const question = questions[currentIndex];
  const selectedAnswer = answers[currentIndex]?.selectedOption ?? null;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const accentColor = technology?.accentColor ?? '#6366f1';

  const handleSubmit = () => {
    if (window.confirm(`Submit quiz? You've answered ${answeredCount} of ${questions.length} questions.`)) {
      onSubmit();
      navigate('/result');
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '32px 24px 80px' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '24px', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>{technology?.icon}</span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#94a3b8' }}>
            {technology?.name} · {quizState.topic}
          </span>
        </div>
        <Timer
          secondsLeft={timer.secondsLeft}
          percentLeft={timer.percentLeft}
          isLow={timer.isLow}
          isCritical={timer.isCritical}
        />
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '32px' }}>
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          answered={answeredCount}
          accentColor={accentColor}
        />
      </div>

      {/* Question card */}
      <div
        className="glass-card"
        style={{ padding: '28px 28px 24px', marginBottom: '20px' }}
      >
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentIndex}
            question={question}
            questionNumber={currentIndex + 1}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={onSelectAnswer}
            accentColor={accentColor}
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        {/* Previous */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous question"
          style={{
            padding: '11px 22px',
            borderRadius: '10px',
            border: '1px solid rgba(148,163,184,0.2)',
            background: 'rgba(30,41,59,0.6)',
            color: isFirst ? '#334155' : '#94a3b8',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            fontSize: '14px', fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          ← Previous
        </button>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          aria-label="Submit quiz"
          style={{
            padding: '11px 22px',
            borderRadius: '10px',
            background: 'rgba(239,68,68,0.15)',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: '14px', fontWeight: 600,
            border: '1px solid rgba(239,68,68,0.3)',
            transition: 'all 0.2s',
          }}
        >
          Submit Quiz
        </button>

        {/* Next */}
        <button
          onClick={onNext}
          disabled={isLast}
          aria-label="Next question"
          style={{
            padding: '11px 22px',
            borderRadius: '10px',
            border: 'none',
            background: isLast ? 'rgba(99,102,241,0.1)' : `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
            color: isLast ? '#334155' : '#fff',
            cursor: isLast ? 'not-allowed' : 'pointer',
            fontSize: '14px', fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          Next →
        </button>
      </div>

      {/* Keyboard hint */}
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#334155', marginTop: '16px' }}>
        Tip: Choose an answer, then use ← → to navigate
      </p>
    </div>
  );
}
