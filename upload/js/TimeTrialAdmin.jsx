const STATUS_TONE = { draft: 'outline', extracting: 'sun', processing: 'sun', published: 'teal', extraction_failed: 'coral', processing_failed: 'coral' };
const TRANSIENT_STATUSES = ['extracting', 'processing'];

function StatusBadge({ status }) {
  const { Badge } = window.StrandAthleticsClubDesignSystem_f49d47;
  return <Badge tone={STATUS_TONE[status] || 'outline'}>{status.replace(/_/g, ' ')}</Badge>;
}

function timeToSeconds(t) {
  if (!t) return Infinity;
  const parts = t.split(':').map(Number);
  if (parts.some((p) => Number.isNaN(p))) return Infinity;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0];
}

function sortEntries(entries) {
  const genderRank = (g) => (g === 'M' ? 0 : g === 'F' ? 1 : 2);
  return [...entries].sort((a, b) => {
    const d = genderRank(a.gender) - genderRank(b.gender);
    return d !== 0 ? d : timeToSeconds(a.time) - timeToSeconds(b.time);
  });
}

function EntryRow({ entry, onSave, onRemove }) {
  const { Badge, Button } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [draft, setDraft] = React.useState(entry);
  React.useEffect(() => setDraft(entry), [entry]);
  const cellStyle = { padding: '8px 8px', borderTop: '1px solid var(--grey-100)' };
  const inputStyle = { font: 'inherit', fontSize: 14, padding: '6px 8px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--grey-200)', width: '100%', boxSizing: 'border-box' };
  return (
    <tr style={{ background: entry.flag_reason ? '#FFF8E5' : 'transparent' }}>
      <td style={cellStyle}><input style={inputStyle} value={draft.name || ''} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></td>
      <td style={cellStyle}>
        <select style={inputStyle} value={draft.gender || 'M'} onChange={(e) => setDraft({ ...draft, gender: e.target.value })}>
          <option value="M">M</option><option value="F">F</option>
        </select>
      </td>
      <td style={cellStyle}><input style={inputStyle} value={draft.time || ''} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="H:MM:SS" /></td>
      <td style={cellStyle}>
        <select style={inputStyle} value={draft.distance || '5KM'} onChange={(e) => setDraft({ ...draft, distance: e.target.value })}>
          <option value="5KM">5KM</option><option value="10KM">10KM</option>
        </select>
      </td>
      <td style={{ ...cellStyle, color: 'var(--grey-600)' }}>{entry.source}</td>
      <td style={cellStyle}>{entry.flag_reason ? <Badge tone="coral">{entry.flag_reason.replace(/_/g, ' ')}</Badge> : <span style={{ color: 'var(--grey-400)' }}>—</span>}</td>
      <td style={{ ...cellStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
        <Button variant="ghost" size="sm" onClick={() => onSave({ name: draft.name, gender: draft.gender, time: draft.time, distance: draft.distance })}>Save</Button>{' '}
        <Button variant="ghost" size="sm" onClick={() => onRemove()}>Remove</Button>
      </td>
    </tr>
  );
}

function TimeTrialAdmin({ auth, onUnauthorized }) {
  const { Button, Input, Select } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [races, setRaces] = React.useState([]);
  const [activeDate, setActiveDate] = React.useState(null);
  const [active, setActive] = React.useState(null); // full race detail: {race_date, series_name, status, source_notes, entries}
  const [newDate, setNewDate] = React.useState('');
  const [rosterNames, setRosterNames] = React.useState([]);
  const [form, setForm] = React.useState({ name: '', gender: 'M', time: '', distance: '5KM' });
  const [statusMessage, setStatusMessage] = React.useState('');
  const [photoName, setPhotoName] = React.useState(null);
  const pollTimerRef = React.useRef(null);
  // pollUntilSettled's setInterval callback is created once per call and
  // keeps running for minutes - reading activeDate directly would close
  // over whatever value it had at that moment, never seeing later updates
  // (e.g. the setActiveDate a caller does right before starting the poll,
  // which hasn't re-rendered yet). A ref always reads the latest value.
  const activeDateRef = React.useRef(activeDate);
  React.useEffect(() => { activeDateRef.current = activeDate; }, [activeDate]);

  const api = React.useCallback(async (path, options = {}) => {
    const response = await fetch(window.API_BASE + path, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token,
        ...(options.headers || {}),
      },
    });
    if (response.status === 401) {
      onUnauthorized();
      throw new Error('Session expired - please log in again.');
    }
    if (!response.ok && response.status !== 202) {
      const body = await response.json().catch(() => ({}));
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return response.status === 204 ? null : response.json();
  }, [auth.token, onUnauthorized]);

  const loadRaces = React.useCallback(async () => {
    try {
      const { races: list } = await api('/races');
      setRaces(list);
    } catch (err) {
      setStatusMessage(err.message);
    }
  }, [api]);

  const loadRoster = React.useCallback(async () => {
    try {
      const { names } = await api('/roster-names');
      setRosterNames(names);
    } catch (err) {
      setStatusMessage(err.message);
    }
  }, [api]);

  React.useEffect(() => { loadRaces(); loadRoster(); }, [loadRaces, loadRoster]);
  React.useEffect(() => () => { if (pollTimerRef.current) clearInterval(pollTimerRef.current); }, []);

  const openRace = React.useCallback(async (date) => {
    setActiveDate(date);
    setPhotoName(null);
    try {
      const race = await api(`/races/${date}`);
      setActive(race);
    } catch (err) {
      setStatusMessage(err.message);
    }
  }, [api]);

  const pollUntilSettled = React.useCallback((date, { waitForCreation = false } = {}) => {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    let stillWaitingForCreation = waitForCreation;
    pollTimerRef.current = setInterval(async () => {
      try {
        const race = await api(`/races/${date}`);
        stillWaitingForCreation = false;
        loadRaces();
        if (date === activeDateRef.current) setActive(race);
        if (!TRANSIENT_STATUSES.includes(race.status)) {
          clearInterval(pollTimerRef.current);
          setStatusMessage(`${date} is now ${race.status.replace(/_/g, ' ')}.`);
        }
      } catch (err) {
        // A brand-new photo upload for a date with no existing race row
        // yet 404s until the S3-triggered extraction Lambda creates it -
        // that's expected right after upload, not a failure, so keep
        // polling through it instead of giving up on the first 404.
        if (stillWaitingForCreation && err.status === 404) return;
        clearInterval(pollTimerRef.current);
        setStatusMessage(err.message);
      }
    }, 3000);
  }, [api]);

  const createRace = async () => {
    if (!newDate) return;
    setStatusMessage('Creating race…');
    const date = newDate;
    try {
      await api('/races', { method: 'POST', body: JSON.stringify({ race_date: date }) });
      setNewDate('');
      // POST /races invokes extraction asynchronously and returns before the
      // DynamoDB row exists - opening it immediately would 404. Set the
      // active date directly (not via openRace, which would surface that
      // expected 404 as an error) and let the poller wait through it.
      setActiveDate(date);
      setActive(null);
      await loadRaces();
      pollUntilSettled(date, { waitForCreation: true });
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const uploadPhotoForDate = async (raceDate, file, { isNewRace = false } = {}) => {
    setStatusMessage('Requesting upload URL…');
    try {
      const presignResponse = await fetch(window.API_BASE + '/presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: auth.password, filename: file.name, race_date: raceDate }),
      });
      if (presignResponse.status === 403) throw new Error('Wrong password - please log out and back in.');
      if (!presignResponse.ok) throw new Error('Failed to get upload URL.');
      const { upload_url } = await presignResponse.json();

      setStatusMessage('Uploading photo…');
      const putResponse = await fetch(upload_url, { method: 'PUT', body: file });
      if (!putResponse.ok) throw new Error('Upload failed.');

      setStatusMessage('Extracting times from photo…');
      if (isNewRace) {
        setActiveDate(raceDate);
        setActive(null);
      }
      pollUntilSettled(raceDate, { waitForCreation: isNewRace });
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const onNewRacePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!newDate) {
      setStatusMessage('Choose a race date first.');
      return;
    }
    setNewDate('');
    uploadPhotoForDate(newDate, file, { isNewRace: true });
  };

  const onPhoto = (e) => {
    const file = e.target.files[0];
    if (!file || !active) return;
    setPhotoName(file.name);
    uploadPhotoForDate(active.race_date, file);
  };

  const addEntry = async () => {
    if (!form.name || !active) return;
    try {
      await api(`/races/${active.race_date}/entries`, { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', gender: 'M', time: '', distance: '5KM' });
      await openRace(active.race_date);
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const saveEntry = async (entryId, fields) => {
    try {
      await api(`/races/${active.race_date}/entries/${entryId}`, { method: 'PUT', body: JSON.stringify(fields) });
      await openRace(active.race_date);
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const removeEntry = async (entryId) => {
    try {
      await api(`/races/${active.race_date}/entries/${entryId}`, { method: 'DELETE' });
      await openRace(active.race_date);
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const startProcessing = async () => {
    if (!active) return;
    try {
      await api(`/races/${active.race_date}/process`, { method: 'POST' });
      setStatusMessage(`Processing ${active.race_date}…`);
      pollUntilSettled(active.race_date);
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const downloadImage = (url) => {
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.click();
  };

  const entries = active ? active.entries || [] : [];
  const anyFlagged = entries.some((e) => e.flag_reason);
  const processDisabled = !active || entries.length === 0 || anyFlagged || TRANSIENT_STATUSES.includes(active.status);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 64px', display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--navy-900)', margin: '0 0 4px' }}>Review Time Trial Results</h1>
        <p style={{ margin: 0, color: 'var(--grey-600)', fontSize: 14 }}>Upload a finish-line photo, review the Mobii-extracted times, then publish.</p>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: 'var(--navy-900)', marginBottom: 16 }}>Races</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 220 }}><Input label="New race date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} /></div>
          <Button variant="secondary" size="md" onClick={createRace}>Create race (no photo)</Button>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px dashed var(--grey-200)', borderRadius: 'var(--radius-md)', padding: '10px 14px', cursor: 'pointer', background: 'var(--grey-050)' }}>
            <input type="file" accept="image/*" onChange={onNewRacePhoto} style={{ display: 'none' }} />
            <Button variant="secondary" size="md">Or upload a finish-line photo</Button>
            <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>for the date above</span>
          </label>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--grey-600)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)' }}>
              <th style={{ padding: '8px 10px', borderBottom: '2px solid var(--grey-100)' }}>Date</th>
              <th style={{ padding: '8px 10px', borderBottom: '2px solid var(--grey-100)' }}>Series</th>
              <th style={{ padding: '8px 10px', borderBottom: '2px solid var(--grey-100)' }}>Status</th>
              <th style={{ padding: '8px 10px', borderBottom: '2px solid var(--grey-100)' }}></th>
            </tr>
          </thead>
          <tbody>
            {races.map((r) => (
              <tr key={r.race_date} style={{ background: r.race_date === activeDate ? 'var(--grey-050)' : 'transparent', cursor: 'pointer' }} onClick={() => openRace(r.race_date)}>
                <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--grey-100)', color: 'var(--ink-900)' }}>{r.race_date}</td>
                <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--grey-100)', color: 'var(--ink-900)' }}>{r.series_name || '—'}</td>
                <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--grey-100)' }}><StatusBadge status={r.status} /></td>
                <td style={{ padding: '10px 10px', borderBottom: '1px solid var(--grey-100)', textAlign: 'right' }}>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); openRace(r.race_date); }}>Open</Button>
                </td>
              </tr>
            ))}
            {races.length === 0 && (
              <tr><td colSpan="4" style={{ padding: '16px 10px', color: 'var(--grey-600)', textAlign: 'center' }}>No races yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {active && (
        <div style={{ background: '#fff', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--navy-900)', margin: 0 }}>{active.race_date} — {active.series_name || 'Untitled series'}</h2>
            <StatusBadge status={active.status} />
          </div>

          {active.source_notes && active.source_notes.length > 0 && (
            <div style={{ fontSize: 13, color: 'var(--coral-500)' }}>Notes: {active.source_notes.join('; ')}</div>
          )}

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)', marginBottom: 6 }}>Finish-line photo</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px dashed var(--grey-200)', borderRadius: 'var(--radius-md)', padding: 16, cursor: 'pointer', background: 'var(--grey-050)' }}>
              <input type="file" accept="image/*" onChange={onPhoto} style={{ display: 'none' }} />
              <Button variant="secondary" size="sm">Choose photo</Button>
              <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>{photoName || active.photo_key || 'No photo uploaded yet'}</span>
            </label>
            {active.status === 'extracting' && <p style={{ fontSize: 13, color: 'var(--teal-500)', fontWeight: 600, marginTop: 8 }}>Extracting times…</p>}
          </div>

          {entries.length > 0 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)', marginBottom: 8 }}>
                Entries {anyFlagged && <span style={{ color: 'var(--coral-500)', fontWeight: 700 }}>— resolve flags before processing</span>}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--grey-600)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    <th style={{ padding: '6px 8px' }}>Name</th><th style={{ padding: '6px 8px' }}>Gender</th><th style={{ padding: '6px 8px' }}>Time</th><th style={{ padding: '6px 8px' }}>Distance</th><th style={{ padding: '6px 8px' }}>Source</th><th style={{ padding: '6px 8px' }}>Flag</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {sortEntries(entries).map((en) => (
                    <EntryRow key={en.entry_id} entry={en} onSave={(fields) => saveEntry(en.entry_id, fields)} onRemove={() => removeEntry(en.entry_id)} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)', marginBottom: 8 }}>Add entry</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ width: 200 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-body)' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>Name</span>
                  <input list="rosterNames" style={{ font: 'inherit', fontSize: 16, padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--grey-200)' }} placeholder="Runner name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <datalist id="rosterNames">{rosterNames.map((n) => <option key={n} value={n} />)}</datalist>
                </label>
              </div>
              <div style={{ width: 100 }}><Select label="Gender" options={['M', 'F']} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} /></div>
              <div style={{ width: 110 }}><Input label="Time" placeholder="H:MM:SS" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
              <div style={{ width: 120 }}><Select label="Distance" options={['5KM', '10KM']} value={form.distance} onChange={(e) => setForm({ ...form, distance: e.target.value })} /></div>
              <Button variant="secondary" size="md" onClick={addEntry}>Add</Button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', borderTop: '1px solid var(--grey-100)', paddingTop: 20 }}>
            <Button variant="primary" size="md" disabled={processDisabled} onClick={startProcessing}>Start processing</Button>
            {active.status === 'processing' && <span style={{ fontSize: 14, color: 'var(--teal-500)', fontWeight: 600 }}>Processing…</span>}
            {active.status === 'published' && <span style={{ fontSize: 14, color: 'var(--leaf-500)', fontWeight: 600 }}>Published — results are live.</span>}
            {active.status === 'published' && (active.results_image_url || active.points_image_url) && (
              <>
                <Button variant="secondary" size="md" disabled={!active.results_image_url} onClick={() => downloadImage(active.results_image_url)}>Download results image</Button>
                <Button variant="secondary" size="md" disabled={!active.points_image_url} onClick={() => downloadImage(active.points_image_url)}>Download points image</Button>
              </>
            )}
          </div>
        </div>
      )}

      {statusMessage && <div style={{ fontSize: 13, color: 'var(--grey-600)' }}>{statusMessage}</div>}
    </div>
  );
}
window.TimeTrialAdmin = TimeTrialAdmin;
