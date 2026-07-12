interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '80px 24px',
    }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 8px' }}>{title}</h3>
      {description && <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '320px', lineHeight: 1.6 }}>{description}</p>}
      {action && <div style={{ marginTop: '24px' }}>{action}</div>}
    </div>
  );
}
