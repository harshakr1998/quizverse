import type { Difficulty } from '../types';

interface DifficultyChipProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md';
}

const DIFFICULTY_CONFIG: Record<Difficulty, { color: string; bg: string; label: string }> = {
  Easy: { color: '#22c55e', bg: 'rgba(34,197,94,0.15)', label: 'Easy' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Medium' },
  Hard: { color: '#ef4444', bg: 'rgba(239,68,68,0.15)', label: 'Hard' },
};

export function DifficultyChip({ difficulty, size = 'md' }: DifficultyChipProps) {
  const config = DIFFICULTY_CONFIG[difficulty];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: size === 'sm' ? '2px 8px' : '3px 10px',
      borderRadius: '999px',
      fontSize: size === 'sm' ? '11px' : '12px',
      fontWeight: 600,
      letterSpacing: '0.02em',
      color: config.color,
      background: config.bg,
      border: `1px solid ${config.color}40`,
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color, display: 'inline-block' }} />
      {config.label}
    </span>
  );
}
