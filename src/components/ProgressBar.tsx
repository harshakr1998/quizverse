interface ProgressBarProps {
  current: number;  // 1-based
  total: number;
  answered: number;
  accentColor?: string;
}

export function ProgressBar({ current, total, answered, accentColor = '#6366f1' }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const answeredPercent = (answered / total) * 100;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          Question <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{current}</span> of {total}
        </span>
        <span style={{ fontSize: '13px', color: '#94a3b8' }}>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{answered}</span> answered
        </span>
      </div>

      {/* Progress track */}
      <div style={{
        height: '6px',
        borderRadius: '999px',
        background: 'rgba(148,163,184,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Answered bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${answeredPercent}%`,
          background: 'rgba(34,197,94,0.3)',
          transition: 'width 0.4s ease',
          borderRadius: '999px',
        }} />
        {/* Current position bar */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
          transition: 'width 0.3s ease',
          borderRadius: '999px',
          boxShadow: `0 0 8px ${accentColor}60`,
        }} />
      </div>

      {/* Question dots */}
      <div style={{
        display: 'flex', gap: '4px', marginTop: '8px', flexWrap: 'wrap',
      }}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            title={`Q${i + 1}`}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: i === current - 1
                ? accentColor
                : i < current - 1
                ? 'rgba(34,197,94,0.6)'
                : 'rgba(148,163,184,0.2)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}
