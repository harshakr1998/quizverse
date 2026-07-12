import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Timer, Shuffle, BarChart, Lightbulb, Coffee } from 'lucide-react';
import { TechnologyCard } from '../components/TechnologyCard';
import { TECHNOLOGIES } from '../data';

export function HomePage() {
  const [search, setSearch] = useState('');

  const filtered = TECHNOLOGIES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.topics.some(tp => tp.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', borderRadius: '50%' }}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '20%', right: '-10%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', borderRadius: '50%' }}
        />
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
        
        {/* Hero Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          padding: '100px 0 80px',
          gap: '32px'
        }}>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 24px', borderRadius: '999px',
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 4px 24px -1px rgba(0,0,0,0.2)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 12px #22c55e' }} />
            <span style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: 600, letterSpacing: '0.5px' }}>
              Free · No Login · Fully Static
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-2px', margin: 0,
              maxWidth: '900px'
            }}
          >
            Master <span className="gradient-text">Automation</span>
            <br />
            With Confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
              color: '#94a3b8', maxWidth: '640px',
              margin: '0 auto', lineHeight: 1.7,
            }}
          >
            Level up your QA engineering skills with topic-wise MCQ quizzes.
            Practice Java, Selenium, Python, and Playwright for your next SDET interview.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px'
            }}
          >
             <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff',
                padding: '16px 36px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px -10px rgba(99, 102, 241, 0.5)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(99, 102, 241, 0.6)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(99, 102, 241, 0.5)';
              }}
              onClick={() => {
                document.getElementById('search-topics')?.focus();
              }}
            >
              Start Practicing Now
            </div>
             <a
              href="#technologies"
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                backdropFilter: 'blur(12px)',
                color: '#e2e8f0',
                padding: '16px 36px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.9)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
              }}
            >
              Browse Topics
            </a>
          </motion.div>

          {/* Floating UI Element (SaaS style preview) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              marginTop: '60px',
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              perspective: '1000px'
            }}
          >
            <motion.div 
              className="glass-card" 
              style={{ 
                padding: '32px', 
                textAlign: 'left', 
                position: 'relative', 
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              animate={{ rotateX: [2, -2, 2], rotateY: [-1, 1, -1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #6366f1, #06b6d4, #10b981)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}><Coffee size={24} /></div>
                   <div>
                     <div style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>Java Basics</div>
                     <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Question 4 of 10</div>
                   </div>
                 </div>
                 <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                   <span style={{ animation: 'pulse 2s infinite', display: 'flex' }}><Timer size={14} /></span> 08:42
                 </div>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#f8fafc', marginBottom: '24px', lineHeight: 1.5 }}>
                Which of the following is NOT a core principle of Object-Oriented Programming (OOP)?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Encapsulation', 'Polymorphism', 'Compilation', 'Inheritance'].map((opt, i) => (
                  <div key={opt} style={{
                    padding: '16px 24px',
                    borderRadius: '12px',
                    border: i === 2 ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(148, 163, 184, 0.1)',
                    background: i === 2 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(30, 41, 59, 0.4)',
                    color: i === 2 ? '#4ade80' : '#cbd5e1',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontWeight: i === 2 ? 600 : 400
                  }}>
                    <span>{opt}</span>
                    {i === 2 && <span style={{ fontSize: '18px' }}>✓</span>}
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Decorative blurs behind the card */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', filter: 'blur(120px)', opacity: 0.15, zIndex: -1 }} />
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap', padding: '80px 0', borderTop: '1px solid rgba(148, 163, 184, 0.1)', borderBottom: '1px solid rgba(148, 163, 184, 0.1)', margin: '40px 0' }}>
          {[
            { value: `${TECHNOLOGIES.reduce((sum, t) => sum + t.topics.length, 0)}`, label: 'Topics Covered' },
            { value: `${TECHNOLOGIES.reduce((sum, t) => sum + t.topics.reduce((s, tp) => s + tp.questionCount, 0), 0)}+`, label: 'Practice Questions' },
            { value: `${TECHNOLOGIES.length}`, label: 'Core Technologies' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <div className="gradient-text" style={{ fontSize: '42px', fontWeight: 900, letterSpacing: '-1px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search & Tech Grid */}
        <div id="technologies" style={{ padding: '40px 0', scrollMarginTop: '40px' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto 60px', position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)',
              pointerEvents: 'none', opacity: 0.5, color: '#94a3b8', display: 'flex'
            }}><Search size={22} /></span>
            <input
              id="search-topics"
              type="text"
              placeholder="Search technologies or topics..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '24px 24px 24px 64px',
                borderRadius: '20px',
                border: '1px solid rgba(99,102,241,0.3)',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(12px)',
                color: '#f8fafc',
                fontSize: '18px',
                outline: 'none',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.1), 0 10px 40px -10px rgba(0,0,0,0.5)',
                transition: 'all 0.3s ease'
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.2), 0 20px 50px -10px rgba(99,102,241,0.3)';
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99,102,241,0.1), 0 10px 40px -10px rgba(0,0,0,0.5)';
              }}
              aria-label="Search technologies and topics"
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' }}>
              Explore Technologies
            </h2>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8', background: 'rgba(30,41,59,0.8)', padding: '8px 16px', borderRadius: '999px', border: '1px solid rgba(148,163,184,0.1)' }}>
              Showing {filtered.length} of {TECHNOLOGIES.length}
            </span>
          </div>

          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '100px 20px', color: '#64748b', background: 'rgba(30,41,59,0.3)', borderRadius: '24px', border: '1px dashed rgba(148,163,184,0.2)' }}
            >
              <div style={{ marginBottom: '24px', opacity: 0.5, display: 'flex', justifyContent: 'center', color: '#94a3b8' }}><Search size={64} /></div>
              <p style={{ fontSize: '20px', fontWeight: 500, color: '#94a3b8' }}>No technologies found for "<strong style={{ color: '#e2e8f0' }}>{search}</strong>"</p>
              <button 
                onClick={() => setSearch('')}
                style={{ marginTop: '24px', padding: '10px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: 500, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                Clear Search
              </button>
            </motion.div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {filtered.map((tech, i) => (
                <TechnologyCard key={tech.id} tech={tech} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Feature Bento Box */}
        <div style={{ marginTop: '120px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#f8fafc', marginBottom: '20px', letterSpacing: '-0.5px' }}>Why Practice Here?</h2>
            <p style={{ color: '#94a3b8', fontSize: '18px', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>Designed specifically for QA and SDET interviews, focusing on real-world concepts you'll actually be asked.</p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
          }}>
            {[
              { icon: <Timer size={36} />, title: 'Timed Environments', desc: 'Simulate real interview pressure with our 10-minute countdown timer per quiz.', color: '#ef4444' },
              { icon: <Shuffle size={36} />, title: 'Dynamic Generation', desc: 'Questions and options are randomized every time you play to prevent memorization.', color: '#8b5cf6' },
              { icon: <BarChart size={36} />, title: 'Actionable Insights', desc: 'Get detailed feedback, score percentages, and grades immediately upon submission.', color: '#10b981' },
              { icon: <Lightbulb size={36} />, title: 'In-Depth Explanations', desc: 'Don\'t just know if you were wrong, learn exactly why with comprehensive answer explanations.', color: '#f59e0b' },
            ].map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card"
                style={{
                  padding: '40px 32px',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                  cursor: 'default'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = `rgba(255,255,255,0.15)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = `rgba(255,255,255,0.05)`;
                }}
              >
                <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: `radial-gradient(circle at top right, ${f.color}15, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontSize: '40px', marginBottom: '24px', background: 'rgba(15,23,42,0.8)', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', border: '1px solid rgba(148,163,184,0.1)', boxShadow: `0 8px 20px -8px ${f.color}40` }}>{f.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ fontSize: '15px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}
