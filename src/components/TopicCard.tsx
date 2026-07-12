import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Topic, Technology } from '../types';
import { DifficultyChip } from './DifficultyChip';

interface TopicCardProps {
  topic: Topic;
  tech: Technology;
  index: number;
}

export function TopicCard({ topic, tech, index }: TopicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ x: 4 }}
    >
      <Link
        to={`/quiz/${tech.id}/${topic.id}/instructions`}
        style={{ textDecoration: 'none' }}
        aria-label={`Start ${topic.name} quiz`}
      >
        <div
          className="glass-card"
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = `${tech.accentColor}60`;
            (e.currentTarget as HTMLElement).style.background = `rgba(30,41,59,0.8)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.12)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(30,41,59,0.6)';
          }}
        >
          {/* Icon */}
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
            background: `linear-gradient(135deg, ${tech.accentColor}25, ${tech.accentColor}10)`,
            border: `1px solid ${tech.accentColor}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
          }}>
            <topic.icon size={22} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
                {topic.name}
              </h3>
              <DifficultyChip
                difficulty={
                  topic.difficulties.hard > topic.difficulties.easy
                    ? 'Hard'
                    : topic.difficulties.medium > topic.difficulties.easy
                    ? 'Medium'
                    : 'Easy'
                }
                size="sm"
              />
            </div>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 8px', lineHeight: 1.5 }}>
              {topic.description}
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span style={{ fontSize: '12px', color: '#475569' }}>❓ {topic.questionCount} Q's</span>
              <span style={{ fontSize: '12px', color: '#475569' }}>⏱ ~{topic.estimatedMinutes} min</span>
              <span style={{ fontSize: '12px', color: '#22c55e' }}>✅ {topic.difficulties.easy} Easy</span>
              <span style={{ fontSize: '12px', color: '#f59e0b' }}>⚡ {topic.difficulties.medium} Med</span>
              <span style={{ fontSize: '12px', color: '#ef4444' }}>🔥 {topic.difficulties.hard} Hard</span>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: tech.accentColor, fontSize: '20px', flexShrink: 0 }}>›</div>
        </div>
      </Link>
    </motion.div>
  );
}
