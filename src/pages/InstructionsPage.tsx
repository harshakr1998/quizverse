import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTechnology, getTopic, getQuestions } from '../data';
import { EmptyState } from '../components/EmptyState';
import { DifficultyChip } from '../components/DifficultyChip';
import { formatTime } from '../utils/formatTime';

interface InstructionsPageProps {
  onStart: (tech: string, topic: string, questions: ReturnType<typeof getQuestions>) => void;
}

export function InstructionsPage({ onStart }: InstructionsPageProps) {
  const { tech, topic } = useParams<{ tech: string; topic: string }>();
  const navigate = useNavigate();

  const technology = getTechnology(tech ?? '');
  const topicData = getTopic(tech ?? '', topic ?? '');
  const questions = getQuestions(tech ?? '', topic ?? '');

  if (!technology || !topicData) {
    return (
      <EmptyState
        icon="🚫"
        title="Topic not found"
        action={<Link to="/" style={{ color: '#6366f1', fontWeight: 600 }}>← Home</Link>}
      />
    );
  }

  const handleStart = () => {
    onStart(tech!, topic!, questions);
    navigate(`/quiz/${tech}/${topic}`);
  };

  const TIME_LIMIT_SEC = 600;

  const rules = [
    { icon: '❓', text: `${questions.length} multiple choice questions` },
    { icon: '⏱️', text: `${formatTime(TIME_LIMIT_SEC)} time limit (auto-submit on expiry)` },
    { icon: '🔀', text: 'Questions and options are randomized each attempt' },
    { icon: '✅', text: 'One attempt per question; change answer any time before submit' },
    { icon: '🔢', text: 'Score: +1 correct · 0 wrong · 0 unanswered' },
    { icon: '💡', text: 'Every answer has a detailed explanation in Review' },
  ];

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Back link */}
        <Link to={`/technology/${tech}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '32px',
        }}>
          ← Back to {technology.name}
        </Link>

        {/* Header */}
        <div style={{
          borderRadius: '20px',
          border: `1px solid ${technology.accentColor}30`,
          background: `linear-gradient(135deg, ${technology.accentColor}08, transparent)`,
          padding: '32px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '32px' }}>{topicData.icon}</span>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '13px', color: technology.accentColor, fontWeight: 600 }}>
                {technology.name}
              </p>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#e2e8f0', letterSpacing: '-0.5px' }}>
                {topicData.name}
              </h1>
            </div>
          </div>

          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: '0 0 20px' }}>
            {topicData.description}
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#e2e8f0' }}>{questions.length}</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>Questions</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#e2e8f0' }}>10</div>
              <div style={{ fontSize: '12px', color: '#475569' }}>Minutes</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <DifficultyChip difficulty="Easy" size="sm" />
              <DifficultyChip difficulty="Medium" size="sm" />
              <DifficultyChip difficulty="Hard" size="sm" />
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="glass-card" style={{ padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 16px' }}>
            📋 Quiz Rules
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>{rule.icon}</span>
                <span style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{rule.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            background: `linear-gradient(135deg, ${technology.accentColor}, ${technology.accentColor}cc)`,
            color: '#fff',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: `0 8px 30px ${technology.accentColor}40`,
          }}
          aria-label={`Start ${topicData.name} quiz`}
        >
          🚀 Start Quiz — {topicData.name}
        </motion.button>
      </motion.div>
    </div>
  );
}
