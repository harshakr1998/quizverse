import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Technology } from '../types';
import { BookOpen, HelpCircle } from 'lucide-react';

interface TechnologyCardProps {
  tech: Technology;
  index: number;
}

export function TechnologyCard({ tech, index }: TechnologyCardProps) {
  const totalQuestions = tech.topics.reduce((sum, t) => sum + t.questionCount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <Link
        to={`/technology/${tech.id}`}
        style={{ textDecoration: 'none' }}
        aria-label={`Start ${tech.name} quiz`}
      >
        <div
          className="glass-card"
          style={{
            padding: '28px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${tech.accentColor}30, 0 20px 60px rgba(0,0,0,0.4)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {/* Gradient accent background */}
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '120px', height: '120px',
            background: `radial-gradient(circle at top right, ${tech.accentColor}20, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          {/* Icon */}
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: `linear-gradient(135deg, ${tech.accentColor}30, ${tech.accentColor}10)`,
            border: `1px solid ${tech.accentColor}40`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', marginBottom: '16px',
          }}>
            <tech.icon size={28} />
          </div>

          {/* Name */}
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 8px' }}>
            {tech.name}
          </h3>

          {/* Description */}
          <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: '0 0 20px' }}>
            {tech.description}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#475569', display: 'flex' }}><BookOpen size={14} /></span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
                {tech.topics.length} Topics
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#475569', display: 'flex' }}><HelpCircle size={14} /></span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>
                {totalQuestions} Questions
              </span>
            </div>
          </div>

          {/* Start CTA */}
          <div style={{
            marginTop: '20px',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: tech.accentColor, fontSize: '13px', fontWeight: 600,
          }}>
            Start Practicing →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
