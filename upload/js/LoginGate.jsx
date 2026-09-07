function LoginGate({ onUnlock }) {
  const { Input, Button } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(window.API_BASE + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.status === 403) {
        setError('Incorrect password. Try the club shared password.');
        return;
      }
      if (!response.ok) {
        setError('Login failed - please try again.');
        return;
      }
      const { token } = await response.json();
      onUnlock(token, password);
    } catch (err) {
      setError('Could not reach the server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--grey-050)' }}>
      <form onSubmit={submit} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 40, width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <img src="static/strand-ac-design-system/assets/logos/strand-ac-logo-horizontal.png" alt="Strand Athletics Club" style={{ height: 32, width: 'auto', alignSelf: 'flex-start', marginBottom: 8 }} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: 'var(--navy-900)', margin: 0 }}>Time Trial Admin</h1>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--grey-600)' }}>Enter the club shared password to manage time trial results.</p>
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div style={{ fontSize: 13, color: 'var(--coral-500)' }}>{error}</div>}
        <Button variant="primary" size="md" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log In'}</Button>
      </form>
    </div>
  );
}
window.LoginGate = LoginGate;
