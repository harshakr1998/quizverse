import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ReviewItem, QuizResult } from '../types';
import { ReviewCard } from '../components/ReviewCard';
import { EmptyState } from '../components/EmptyState';

interface ReviewPageProps {
  reviewItems: ReviewItem[];
  result: QuizResult | null;
}

export function ReviewPage({ reviewItems, result }: ReviewPageProps) {
  const navigate = useNavigate();

  if (reviewItems.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No review available"
        description="Complete a quiz to see your review."
        action={<Link to="/" style={{ color: '#6366f1', fontWeight: 600 }}>← Home</Link>}
      />
    );
  }

  const correct = reviewItems.filter(i => i.isCorrect).length;
  const incorrect = reviewItems.filter(i => !i.isCorrect && i.userAnswer !== null).length;
  const skipped = reviewItems.filter(i => i.userAnswer === null).length;

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '32px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#e2e8f0', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              📋 Answer Review
            </h1>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              {result?.technology} · {result?.topic.charAt(0).toUpperCase()}{result?.topic.slice(1).replace('-', ' ')} · {result?.percentage}% Score
            </p>
          </div>
          <button
            onClick={() => navigate('/result')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '1px solid rgba(99,102,241,0.3)',
              background: 'rgba(99,102,241,0.1)',
              color: '#818cf8',
              cursor: 'pointer',
              fontSize: '14px', fontWeight: 600,
            }}
          >
            ← Results
          </button>
        </div>

        {/* Summary bar */}
        <div style={{
          display: 'flex', gap: '20px', marginTop: '16px',
          padding: '12px 20px', borderRadius: '10px',
          background: 'rgba(30,41,59,0.5)',
          border: '1px solid rgba(148,163,184,0.1)',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: '13px' }}>✅ <strong style={{ color: '#22c55e' }}>{correct}</strong> Correct</span>
          <span style={{ fontSize: '13px' }}>❌ <strong style={{ color: '#ef4444' }}>{incorrect}</strong> Incorrect</span>
          <span style={{ fontSize: '13px' }}>⬜ <strong style={{ color: '#f59e0b' }}>{skipped}</strong> Skipped</span>
          <span style={{ fontSize: '13px' }}>📊 <strong style={{ color: '#6366f1' }}>{result?.percentage}%</strong> Score</span>
        </div>
      </motion.div>

      {/* Review cards */}
      <div>
        {reviewItems.map((item, i) => (
          <ReviewCard key={i} item={item} index={i} />
        ))}
      </div>

      {/* Bottom actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{
          padding: '12px 28px', borderRadius: '10px',
          border: '1px solid rgba(148,163,184,0.15)',
          background: 'rgba(30,41,59,0.6)',
          color: '#94a3b8', fontWeight: 600, fontSize: '14px',
          textDecoration: 'none',
        }}>
          🏠 Home
        </Link>
        <button
          onClick={() => navigate('/result')}
          style={{
            padding: '12px 28px', borderRadius: '10px',
            border: '1px solid rgba(99,102,241,0.3)',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          📊 Back to Results
        </button>
      </div>
    </div>
  );
}
