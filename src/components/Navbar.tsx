import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
const Github = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.39-3.6 4.9 4.9 0 0 0-.12-3.52s-1.13-.36-3.7 1.38a12.08 12.08 0 0 0-6.76 0c-2.57-1.74-3.7-1.38-3.7-1.38a4.9 4.9 0 0 0-.12 3.52 5.2 5.2 0 0 0-1.39 3.6c0 5.21 3 6.4 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
    <path d="M14 19a5 5 0 0 1-4-2" />
  </svg>
);

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
