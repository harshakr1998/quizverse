import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(10, 15, 30, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="/quizverse/android-chrome-192x192.png" 
            alt="QuizVerse Logo" 
            style={{ width: '36px', height: '36px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} 
          />
          <span style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.5px' }} className="gradient-text">
            QuizVerse
          </span>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {!isHome && (
            <Link to="/" style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
              border: '1px solid rgba(148,163,184,0.15)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.35)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(148,163,184,0.15)';
              }}
            >
              ← Home
            </Link>
          )}
          <a
            href="https://github.com/harshakr1998/quizverse"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
