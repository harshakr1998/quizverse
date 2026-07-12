import { motion } from 'framer-motion';

interface OptionButtonProps {
  option: string;
  index: number;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  accentColor?: string;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export function OptionButton({ option, index, selected, onSelect, disabled = false, accentColor = '#6366f1' }: OptionButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { x: 4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Option ${OPTION_LABELS[index]}: ${option}`}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 18px',
        borderRadius: '12px',
        border: `1.5px solid ${selected ? accentColor : 'rgba(148,163,184,0.15)'}`,
        background: selected
          ? `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`
          : 'rgba(30,41,59,0.5)',
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s',
        boxShadow: selected ? `0 0 20px ${accentColor}25` : 'none',
      }}
    >
      {/* Label badge */}
      <span style={{
        width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '12px', fontWeight: 700,
        background: selected ? accentColor : 'rgba(148,163,184,0.12)',
        color: selected ? '#fff' : '#94a3b8',
        transition: 'all 0.2s',
      }}>
        {OPTION_LABELS[index]}
      </span>

      {/* Option text */}
      <span style={{
        fontSize: '14px', lineHeight: 1.6,
        color: selected ? '#e2e8f0' : '#94a3b8',
        fontWeight: selected ? 500 : 400,
        paddingTop: '3px',
        flex: 1,
        transition: 'color 0.2s',
      }}>
        {option}
      </span>
    </motion.button>
  );
}
