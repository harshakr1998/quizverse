import { motion } from 'framer-motion';
import type { ShuffledQuestion } from '../types';
import { DifficultyChip } from './DifficultyChip';
import { OptionButton } from './OptionButton';

interface QuestionCardProps {
  question: ShuffledQuestion;
  questionNumber: number;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  accentColor?: string;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
  accentColor = '#6366f1',
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id + '-' + questionNumber}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <DifficultyChip difficulty={question.difficulty} />
            {question.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontSize: '11px', color: '#64748b',
                background: 'rgba(100,116,139,0.1)',
                padding: '2px 8px', borderRadius: '4px',
                border: '1px solid rgba(100,116,139,0.2)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          <h2 style={{
            fontSize: '17px', fontWeight: 600,
            color: '#e2e8f0', lineHeight: 1.6, margin: 0,
          }}>
            {question.question}
          </h2>
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.shuffledOptions.map((option, i) => (
          <OptionButton
            key={i}
            option={option}
            index={i}
            selected={selectedAnswer === i}
            onSelect={() => onSelectAnswer(i)}
            accentColor={accentColor}
          />
        ))}
      </div>
    </motion.div>
  );
}
