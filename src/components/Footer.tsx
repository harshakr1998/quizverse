export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(148, 163, 184, 0.1)',
      padding: '32px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
          Built with ❤️ for QA Engineers & SDETs · {' '}
          <a
            href="https://github.com/harshakr1998/quizverse"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 500 }}
          >
            Contribute on GitHub
          </a>
        </p>
        <p style={{ color: '#334155', fontSize: '12px', margin: '8px 0 0' }}>
          © {new Date().getFullYear()} QuizVerse · Open Source · MIT License
        </p>
      </div>
    </footer>
  );
}
