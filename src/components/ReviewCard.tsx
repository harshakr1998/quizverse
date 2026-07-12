import { motion } from 'framer-motion';
import type { ReviewItem } from '../types';
import { DifficultyChip } from './DifficultyChip';

interface ReviewCardProps {
  item: ReviewItem;
  index: number;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function ReviewCard({ item, index }: ReviewCardProps) {
  const { question, userAnswer, isCorrect } = item;
  const isSkipped = userAnswer === null;

  const borderColor = isSkipped ? 'rgba(148,163,184,0.2)' : isCorrect ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)';
  const bgColor = isSkipped ? 'rgba(30,41,59,0.5)' : isCorrect ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.5) }}
      style={{
        borderRadius: '16px',
        border: `1px solid ${borderColor}`,
        background: bgColor,
        padding: '20px 24px',
        marginBottom: '12px',
      }}
    >
      {/* Status header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: isSkipped ? 'rgba(148,163,184,0.2)' : isCorrect ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)',
            color: isSkipped ? '#94a3b8' : isCorrect ? '#22c55e' : '#ef4444',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700,
          }}>
            {index + 1}
          </span>
          <span style={{
            fontSize: '13px', fontWeight: 600,
            color: isSkipped ? '#64748b' : isCorrect ? '#22c55e' : '#ef4444',
          }}>
            {isSkipped ? '⬜ Skipped' : isCorrect ? '✅ Correct' : '❌ Incorrect'}
          </span>
        </div>
        <DifficultyChip difficulty={question.difficulty} size="sm" />
      </div>

      {/* Question */}
      <p style={{ fontSize: '15px', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.6, margin: '0 0 16px' }}>
        {question.question}
      </p>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
        {question.shuffledOptions.map((opt, i) => {
          const isCorrectAnswer = i === question.correctShuffledIndex;
          const isUserAnswer = i === userAnswer;
          let bgOpt = 'transparent';
          let colorOpt = '#64748b';
          let borderOpt = 'transparent';
          if (isCorrectAnswer) { bgOpt = 'rgba(34,197,94,0.15)'; colorOpt = '#22c55e'; borderOpt = 'rgba(34,197,94,0.3)'; }
          if (isUserAnswer && !isCorrectAnswer) { bgOpt = 'rgba(239,68,68,0.15)'; colorOpt = '#ef4444'; borderOpt = 'rgba(239,68,68,0.3)'; }

          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 12px', borderRadius: '8px',
              background: bgOpt, border: `1px solid ${borderOpt}`,
            }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '6px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700,
                background: isCorrectAnswer ? 'rgba(34,197,94,0.3)' : isUserAnswer ? 'rgba(239,68,68,0.3)' : 'rgba(148,163,184,0.1)',
                color: colorOpt,
              }}>
                {OPTION_LABELS[i]}
              </span>
              <span style={{ fontSize: '13px', color: colorOpt, flex: 1 }}>{opt}</span>
              {isCorrectAnswer && <span style={{ fontSize: '12px', color: '#22c55e' }}>✓ Correct</span>}
              {isUserAnswer && !isCorrectAnswer && <span style={{ fontSize: '12px', color: '#ef4444' }}>✗ Your answer</span>}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1', margin: '0 0 4px', letterSpacing: '0.05em' }}>
          💡 EXPLANATION
        </p>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>
          {question.explanation}
        </p>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
        {question.tags.map(tag => (
          <span key={tag} style={{
            fontSize: '11px', color: '#475569',
            background: 'rgba(71,85,105,0.15)',
            padding: '2px 8px', borderRadius: '4px',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
