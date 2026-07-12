import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { QuizResult } from '../types';
import { GRADE_COLORS, GRADE_MESSAGES } from '../utils/scoring';
import { formatDuration } from '../utils/formatTime';
import { getTechnology } from '../data';

interface ResultPageProps {
  result: QuizResult | null;
  onRetry: () => void;
  onReview: () => void;
}


export function ResultPage({ result, onRetry, onReview }: ResultPageProps) {
  const navigate = useNavigate();
  const confettiFired = useRef(false);

  useEffect(() => {
    if (!result) { navigate('/'); return; }
    if (result.percentage >= 90 && !confettiFired.current) {
      confettiFired.current = true;
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
      setTimeout(() => confetti({ particleCount: 100, spread: 120, origin: { y: 0.4 }, colors: ['#6366f1', '#8b5cf6', '#06b6d4'] }), 600);
    }
  }, [result]);

  if (!result) return null;

  const technology = getTechnology(result.technology);
  const gradeColor = GRADE_COLORS[result.grade];

  // Circular score ring
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (result.percentage / 100) * circumference;

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>

      {/* Grade message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          style={{ fontSize: '48px', marginBottom: '12px' }}
        >
          {result.percentage >= 90 ? '🏆' : result.percentage >= 75 ? '🎯' : result.percentage >= 60 ? '👍' : '💪'}
        </motion.div>
        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#e2e8f0', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          {GRADE_MESSAGES[result.grade]}
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px' }}>
          {technology?.name} · {result.topic.charAt(0).toUpperCase() + result.topic.slice(1).replace('-', ' ')}
        </p>
      </motion.div>

      {/* Score ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}
      >
        <div style={{ position: 'relative', width: '180px', height: '180px' }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={radius}
              fill="none"
              stroke={gradeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeOffset }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              strokeLinecap="round"
              transform="rotate(-90 90 90)"
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontSize: '42px', fontWeight: 900, color: gradeColor, letterSpacing: '-2px' }}
            >
              {result.percentage}%
            </motion.span>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{result.grade}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          marginBottom: '32px',
        }}
      >
        {[
          { label: 'Total', value: result.totalQuestions, color: '#94a3b8', icon: '❓' },
          { label: 'Correct', value: result.correct, color: '#22c55e', icon: '✅' },
          { label: 'Incorrect', value: result.incorrect, color: '#ef4444', icon: '❌' },
          { label: 'Skipped', value: result.unanswered, color: '#f59e0b', icon: '⬜' },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '16px 12px',
            borderRadius: '12px',
            background: 'rgba(30,41,59,0.6)',
            border: `1px solid ${stat.color}30`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Time taken */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        style={{
          textAlign: 'center', padding: '16px',
          borderRadius: '12px', background: 'rgba(30,41,59,0.4)',
          border: '1px solid rgba(148,163,184,0.1)',
          marginBottom: '32px',
          fontSize: '14px', color: '#64748b',
        }}
      >
        ⏱ Time taken: <strong style={{ color: '#94a3b8' }}>{formatDuration(result.timeTaken)}</strong>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <button
          onClick={() => navigate('/review')}
          style={{
            flex: 1, minWidth: '160px',
            padding: '14px 24px',
            borderRadius: '12px',
            border: '1px solid rgba(99,102,241,0.4)',
            background: 'rgba(99,102,241,0.15)',
            color: '#818cf8',
            fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          }}
          aria-label="Review answers"
        >
          💡 Review Answers
        </button>

        <button
          onClick={() => {
            onRetry();
            navigate(`/quiz/${result.technology}/${result.topic}`);
          }}
          style={{
            flex: 1, minWidth: '160px',
            padding: '14px 24px',
            borderRadius: '12px',
            border: 'none',
            background: `linear-gradient(135deg, ${technology?.accentColor ?? '#6366f1'}, ${technology?.accentColor ?? '#6366f1'}cc)`,
            color: '#fff',
            fontSize: '15px', fontWeight: 700, cursor: 'pointer',
          }}
          aria-label="Retry quiz"
        >
          🔄 Retry
        </button>

        <Link to="/" style={{
          flex: 1, minWidth: '160px',
          padding: '14px 24px',
          borderRadius: '12px',
          border: '1px solid rgba(148,163,184,0.15)',
          background: 'rgba(30,41,59,0.6)',
          color: '#64748b',
          fontSize: '15px', fontWeight: 700,
          textDecoration: 'none', textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          🏠 Home
        </Link>
      </motion.div>
    </div>
  );
}
