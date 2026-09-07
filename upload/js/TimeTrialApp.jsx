function TimeTrialApp() {
  const { Button } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [auth, setAuth] = React.useState(() => {
    const token = sessionStorage.getItem('reviewToken');
    const password = sessionStorage.getItem('reviewPassword');
    return token && password ? { token, password } : null;
  });
  const [page, setPage] = React.useState('admin');

  const unlock = (token, password) => {
    sessionStorage.setItem('reviewToken', token);
    sessionStorage.setItem('reviewPassword', password);
    setAuth({ token, password });
  };

  const logout = () => {
    sessionStorage.removeItem('reviewToken');
    sessionStorage.removeItem('reviewPassword');
    setAuth(null);
  };

  // A 401 from any authenticated call means the token expired or was
  // revoked - drop back to the login gate rather than leaving the app
  // stuck making requests that will keep failing the same way.
  const onUnauthorized = () => logout();

  if (!auth) return <LoginGate onUnlock={unlock} />;

  return (
    <React.Fragment>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid var(--grey-100)' }}>
        <img src="static/strand-ac-design-system/assets/logos/strand-ac-logo-horizontal.png" alt="Strand Athletics Club" style={{ height: 30, width: 'auto' }} />
        <nav style={{ display: 'flex', gap: 6 }}>
          <Button variant={page === 'admin' ? 'primary' : 'ghost'} size="sm" onClick={() => setPage('admin')}>Time Trial Admin</Button>
          <Button variant={page === 'results' ? 'primary' : 'ghost'} size="sm" onClick={() => setPage('results')}>Club Results</Button>
        </nav>
        <Button variant="ghost" size="sm" onClick={logout}>Log Out</Button>
      </header>
      {page === 'admin' ? <TimeTrialAdmin auth={auth} onUnauthorized={onUnauthorized} /> : <ClubResults auth={auth} onUnauthorized={onUnauthorized} />}
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<TimeTrialApp />);
