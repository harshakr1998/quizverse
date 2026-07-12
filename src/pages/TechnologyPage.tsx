import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTechnology } from '../data';
import { TopicCard } from '../components/TopicCard';
import { EmptyState } from '../components/EmptyState';

export function TechnologyPage() {
  const { tech } = useParams<{ tech: string }>();
  const technology = getTechnology(tech ?? '');

  if (!technology) {
    return (
      <EmptyState
        icon="🚫"
        title="Technology not found"
        description="The technology you're looking for doesn't exist yet."
        action={<Link to="/" style={{ color: '#6366f1', fontWeight: 600 }}>← Back to Home</Link>}
      />
    );
  }

  const totalQuestions = technology.topics.reduce((s, t) => s + t.questionCount, 0);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 80px' }}>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '40px' }}
      >
        {/* Tech icon + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: `linear-gradient(135deg, ${technology.accentColor}30, ${technology.accentColor}10)`,
            border: `1px solid ${technology.accentColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px',
          }}>
            <technology.icon size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#e2e8f0', margin: '0 0 4px', letterSpacing: '-1px' }}>
              {technology.name}
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              {technology.topics.length} Topics · {totalQuestions} Questions
            </p>
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}>
          {technology.description}
        </p>

        {/* Gradient bar accent */}
        <div style={{
          height: '3px', borderRadius: '999px', marginTop: '24px',
          background: `linear-gradient(90deg, ${technology.accentColor}, transparent)`,
        }} />
      </motion.div>

      {/* Topics */}
      <div>
        <h2 style={{ fontWeight: 700, color: '#94a3b8', margin: '0 0 16px', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '13px' }}>
          Select a Topic
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {technology.topics.map((topic, i) => (
            <TopicCard key={topic.id} topic={topic} tech={technology} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
