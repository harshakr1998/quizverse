import { motion, AnimatePresence } from 'framer-motion';
import { formatTime } from '../utils/formatTime';

interface TimerProps {
  secondsLeft: number;
  percentLeft: number;
  isLow: boolean;
  isCritical: boolean;
}

export function Timer({ secondsLeft, percentLeft, isLow, isCritical }: TimerProps) {
  const color = isCritical ? '#ef4444' : isLow ? '#f59e0b' : '#6366f1';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Circular timer */}
      <div style={{ position: 'relative', width: '44px', height: '44px' }}>
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="3" />
          <circle
            cx="22" cy="22" r="18" fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 18}`}
            strokeDashoffset={`${2 * Math.PI * 18 * (1 - percentLeft / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px',
        }}>
          ⏱
        </div>
      </div>

      {/* Time text */}
      <AnimatePresence mode="wait">
        <motion.span
          key={isCritical ? 'critical' : isLow ? 'low' : 'normal'}
          initial={{ scale: 1 }}
          animate={isCritical ? { scale: [1, 1.08, 1] } : {}}
          transition={{ repeat: isCritical ? Infinity : 0, duration: 0.8 }}
          style={{
            fontSize: '18px', fontWeight: 700, fontVariantNumeric: 'tabular-nums',
            color, letterSpacing: '1px',
            fontFamily: 'monospace',
          }}
        >
          {formatTime(secondsLeft)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
