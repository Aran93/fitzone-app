import { useApp } from '../context/AppContext';

export function LoginScreen() {
  const { members, setCurrentUser } = useApp();

  const handleLogin = (member: any) => {
    setCurrentUser(member);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: 40,
        maxWidth: 500,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div style={{fontSize: 48, marginBottom: 12}}>🏋️‍♀️</div>
          <h1 style={{fontSize: 28, fontWeight: 800, color: '#0f172a', marginBottom: 8}}>
            FitZone Login
          </h1>
          <p style={{color: '#64748b', fontSize: 15}}>
            Wähle dein Mitgliedskonto aus
          </p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {members.filter(m => m.status === 'AKTIV').map(member => (
            <button
              key={member.id}
              onClick={() => handleLogin(member)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: 16,
                border: '2px solid #e2e8f0',
                borderRadius: 12,
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#4f46e5';
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: '#eef2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 700,
                color: '#4f46e5'
              }}>
                {member.foto ? (
                  <img src={member.foto} alt={member.vorname} style={{width: 48, height: 48, borderRadius: '50%', objectFit: 'cover'}} />
                ) : (
                  `${member.vorname.charAt(0)}${member.nachname.charAt(0)}`
                )}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 700, fontSize: 16, color: '#0f172a'}}>
                  {member.vorname} {member.nachname}
                </div>
                <div style={{fontSize: 13, color: '#64748b'}}>
                  {member.tarif} • {member.status}
                </div>
              </div>
              <div style={{fontSize: 20}}>→</div>
            </button>
          ))}
        </div>

        <div style={{
          marginTop: 24,
          padding: 16,
          background: '#f8fafc',
          borderRadius: 8,
          fontSize: 13,
          color: '#64748b',
          textAlign: 'center'
        }}>
          💡 <b>Demo-Modus:</b> Wähle ein Mitglied aus, um sein persönliches Dashboard zu sehen
        </div>
      </div>
    </div>
  );
}