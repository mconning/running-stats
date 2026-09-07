const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const CSV_TEMPLATE_COLUMNS = ['race_name', 'race_date', 'distance_label', 'distance_km', 'name', 'gender', 'category', 'time'];

function groupByYearAndMonth(races) {
  const byYear = {};
  races.forEach((race) => {
    const [yearStr, monthStr] = (race.race_date || '').split('-');
    const year = yearStr || 'Unknown';
    const month = monthStr ? Number(monthStr) - 1 : -1;
    byYear[year] = byYear[year] || {};
    byYear[year][month] = byYear[year][month] || [];
    byYear[year][month].push(race);
  });

  return Object.keys(byYear)
    .sort((a, b) => b.localeCompare(a))
    .map((year) => ({
      year,
      months: Object.keys(byYear[year])
        .sort((a, b) => Number(b) - Number(a))
        .map((month) => ({
          month: Number(month),
          label: MONTH_NAMES[Number(month)] || 'Unknown',
          races: byYear[year][month].sort((a, b) => (a.race_date < b.race_date ? 1 : -1)),
        })),
    }));
}

function parseCsvLine(line) {
  const cells = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (char === '"') { inQuotes = false; }
      else { current += char; }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function parseResultsCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return { error: 'CSV needs a header row plus at least one result row.' };

  const headers = parseCsvLine(lines[0]);
  const missing = CSV_TEMPLATE_COLUMNS.filter((col) => !headers.includes(col));
  if (missing.length > 0) return { error: `CSV is missing column(s): ${missing.join(', ')}` };

  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line);
    const row = {};
    headers.forEach((header, i) => { row[header] = cells[i]; });
    return row;
  });

  const raceName = rows[0].race_name;
  const raceDate = rows[0].race_date;
  const distanceLabel = rows[0].distance_label;
  const distanceKm = rows[0].distance_km;
  if (!raceName || !raceDate) return { error: 'race_name and race_date are required on every row.' };

  return {
    race_name: raceName,
    race_date: raceDate,
    distance_label: distanceLabel,
    distance_km: distanceKm,
    results: rows.map((row) => ({
      name: row.name,
      gender: row.gender,
      category: row.category,
      time: row.time,
      distance_label: row.distance_label,
      distance_km: row.distance_km,
    })),
  };
}

function distanceSortKey(label) {
  const match = String(label || '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : Infinity;
}

function groupByDistance(results) {
  const byDistance = {};
  (results || []).forEach((r) => {
    const label = r.distance_label || 'Race';
    byDistance[label] = byDistance[label] || [];
    byDistance[label].push(r);
  });
  return Object.keys(byDistance)
    .sort((a, b) => distanceSortKey(a) - distanceSortKey(b))
    .map((label) => ({
      label,
      results: byDistance[label].sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)),
    }));
}

const EMPTY_PARTICIPANT_FORM = { name: '', gender: 'M', category: '', position: '', time: '', distance_label: '' };

function AddParticipantForm({ distanceOptions, defaultDistanceLabel, onSubmit, onCancel }) {
  const { Button, Input, Select } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [form, setForm] = React.useState({ ...EMPTY_PARTICIPANT_FORM, distance_label: defaultDistanceLabel || '' });
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async () => {
    if (!form.name || !form.time || !form.distance_label) return;
    setSubmitting(true);
    try {
      await onSubmit({ ...form, position: form.position ? Number(form.position) : null });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'flex-end', padding: '10px 0', borderTop: '1px dashed var(--grey-200)', marginTop: 8 }}>
      <div style={{ minWidth: 160 }}><Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
      <div style={{ width: 90 }}><Select label="Gender" options={['M', 'F']} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} /></div>
      <div style={{ width: 110 }}><Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
      <div style={{ width: 90 }}><Input label="Position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} /></div>
      <div style={{ width: 110 }}><Input label="Time" placeholder="H:MM:SS" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></div>
      <div style={{ width: 140 }}>
        {distanceOptions.length > 0 ? (
          <Select label="Distance" options={distanceOptions} value={form.distance_label} onChange={(e) => setForm({ ...form, distance_label: e.target.value })} />
        ) : (
          <Input label="Distance" value={form.distance_label} onChange={(e) => setForm({ ...form, distance_label: e.target.value })} />
        )}
      </div>
      <Button variant="primary" size="sm" disabled={submitting} onClick={submit}>{submitting ? 'Adding…' : 'Add'}</Button>
      <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
    </div>
  );
}

function RaceRow({ race, auth, onUnauthorized, expanded, onToggle, detail, onLoadDetail, onAddParticipant }) {
  const { Badge, Button } = window.StrandAthleticsClubDesignSystem_f49d47;
  const [downloading, setDownloading] = React.useState(false);
  const [addingParticipant, setAddingParticipant] = React.useState(false);

  React.useEffect(() => {
    if (expanded && !detail) onLoadDetail(race.race_id);
  }, [expanded]);

  const downloadImage = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const response = await fetch(`${window.API_BASE}/club-results/${race.race_id}/image`, {
        headers: { Authorization: 'Bearer ' + auth.token },
      });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${response.status})`);
      }
      const { image_base64 } = await response.json();
      const binary = atob(image_base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blobUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${race.race_name.replace(/[^a-z0-9]+/gi, '-')}-${race.race_date}.jpeg`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      window.alert(err.message);
    } finally {
      setDownloading(false);
    }
  };

  const distanceGroups = React.useMemo(() => groupByDistance(detail && detail.results), [detail]);

  return (
    <div style={{ borderBottom: '1px solid var(--grey-100)' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', cursor: 'pointer' }}
        onClick={() => onToggle(race.race_id)}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{race.race_name}</span>
          <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>{race.race_date}</span>
          {race.distance_label && <Badge tone="teal">{race.distance_label}</Badge>}
          {race.source === 'manual' && <Badge tone="outline">manual</Badge>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>{race.participant_count || 0} Strand finisher(s)</span>
          <Button variant="ghost" size="sm" disabled={downloading} onClick={downloadImage}>
            {downloading ? 'Rendering…' : 'Download results image'}
          </Button>
        </div>
      </div>
      {expanded && (
        <div style={{ padding: '0 12px 14px 12px' }}>
          {!detail && <p style={{ fontSize: 13, color: 'var(--grey-600)' }}>Loading…</p>}
          {detail && (
            <div onClick={(e) => e.stopPropagation()}>
              {!addingParticipant && (
                <Button variant="ghost" size="sm" onClick={() => setAddingParticipant(true)}>+ Add participant</Button>
              )}
              {addingParticipant && (
                <AddParticipantForm
                  distanceOptions={distanceGroups.map((g) => g.label)}
                  defaultDistanceLabel={race.distance_label}
                  onCancel={() => setAddingParticipant(false)}
                  onSubmit={async (form) => {
                    await onAddParticipant(race.race_id, form);
                    setAddingParticipant(false);
                  }}
                />
              )}
            </div>
          )}
          {detail && distanceGroups.map(({ label, results }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--grey-600)', textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)', margin: '8px 0 4px' }}>{label}</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--grey-600)', fontSize: 12, textTransform: 'uppercase' }}>
                    <th style={{ padding: '6px 8px' }}>Pos</th>
                    <th style={{ padding: '6px 8px' }}>Name</th>
                    <th style={{ padding: '6px 8px' }}>Gender</th>
                    <th style={{ padding: '6px 8px' }}>Category</th>
                    <th style={{ padding: '6px 8px' }}>Time</th>
                    <th style={{ padding: '6px 8px' }}>Cat. Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.item_id}>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)' }}>{r.position ?? '—'}</td>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)' }}>{r.name}</td>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)' }}>{r.gender}</td>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)' }}>{r.category}</td>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{r.time}</td>
                      <td style={{ padding: '6px 8px', borderTop: '1px solid var(--grey-100)' }}>
                        {r.category_winner ? <Badge tone="sun">🏆 Category winner</Badge> : (r.category_position ?? '—')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ClubResults({ auth, onUnauthorized }) {
  const { Button } = window.StrandAthleticsClubDesignSystem_f49d47;
  const currentYear = String(new Date().getFullYear());

  const [races, setRaces] = React.useState([]);
  const [expandedYears, setExpandedYears] = React.useState(new Set([currentYear]));
  const [expandedRaceIds, setExpandedRaceIds] = React.useState(new Set());
  const [raceDetails, setRaceDetails] = React.useState({});
  const [statusMessage, setStatusMessage] = React.useState('');

  const api = React.useCallback(async (path, options = {}) => {
    const response = await fetch(window.API_BASE + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token, ...(options.headers || {}) },
    });
    if (response.status === 401) {
      onUnauthorized();
      throw new Error('Session expired - please log in again.');
    }
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || `Request failed (${response.status})`);
    }
    return response.status === 204 ? null : response.json();
  }, [auth.token, onUnauthorized]);

  const loadRaces = React.useCallback(async () => {
    try {
      const { races: list } = await api('/club-results');
      setRaces(list);
    } catch (err) {
      setStatusMessage(err.message);
    }
  }, [api]);

  React.useEffect(() => { loadRaces(); }, [loadRaces]);

  const grouped = React.useMemo(() => groupByYearAndMonth(races), [races]);

  const toggleYear = (year) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  const toggleRace = (raceId) => {
    setExpandedRaceIds((prev) => {
      const next = new Set(prev);
      next.has(raceId) ? next.delete(raceId) : next.add(raceId);
      return next;
    });
  };

  const loadRaceDetail = async (raceId) => {
    try {
      const detail = await api(`/club-results/${raceId}`);
      setRaceDetails((prev) => ({ ...prev, [raceId]: detail }));
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const onAddParticipant = async (raceId, form) => {
    try {
      await api(`/club-results/${raceId}/participants`, { method: 'POST', body: JSON.stringify(form) });
      setStatusMessage(`Added ${form.name} to the race.`);
      await loadRaceDetail(raceId);
      await loadRaces();
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const onCsvUpload = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const text = await file.text();
    const parsed = parseResultsCsv(text);
    if (parsed.error) {
      setStatusMessage(parsed.error);
      return;
    }
    setStatusMessage('Uploading race results…');
    try {
      await api('/club-results', { method: 'POST', body: JSON.stringify(parsed) });
      setStatusMessage(`Added ${parsed.race_name} (${parsed.results.length} result(s)).`);
      await loadRaces();
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 24px 64px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--navy-900)', margin: '0 0 4px' }}>Club Race Results</h1>
        <p style={{ margin: 0, color: 'var(--grey-600)', fontSize: 14 }}>Races Strand Athletic Club members ran in, scraped weekly from finishlineinsights.com plus manually-added races it doesn't cover.</p>
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="club-race-results-template.csv" download>
          <Button variant="secondary" size="md">Download CSV template</Button>
        </a>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1.5px dashed var(--grey-200)', borderRadius: 'var(--radius-md)', padding: '10px 14px', cursor: 'pointer', background: 'var(--grey-050)' }}>
          <input type="file" accept=".csv" onChange={onCsvUpload} style={{ display: 'none' }} />
          <Button variant="secondary" size="md">Upload race results (CSV)</Button>
          <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>for races not on finishlineinsights.com</span>
        </label>
      </div>

      {statusMessage && <div style={{ fontSize: 13, color: 'var(--grey-600)' }}>{statusMessage}</div>}

      {grouped.map(({ year, months }) => (
        <div key={year} style={{ background: '#fff', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer', background: 'var(--grey-050)' }}
            onClick={() => toggleYear(year)}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: 'var(--navy-900)' }}>{year}</span>
            <span style={{ fontSize: 13, color: 'var(--grey-600)' }}>{expandedYears.has(year) ? 'Hide' : 'Show'}</span>
          </div>
          {expandedYears.has(year) && months.map(({ month, label, races: monthRaces }) => (
            <div key={month}>
              <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'var(--grey-600)', textTransform: 'uppercase', letterSpacing: 'var(--ls-eyebrow)' }}>{label}</div>
              {monthRaces.map((race) => (
                <RaceRow
                  key={race.race_id}
                  race={race}
                  auth={auth}
                  onUnauthorized={onUnauthorized}
                  expanded={expandedRaceIds.has(race.race_id)}
                  onToggle={toggleRace}
                  detail={raceDetails[race.race_id]}
                  onLoadDetail={loadRaceDetail}
                  onAddParticipant={onAddParticipant}
                />
              ))}
            </div>
          ))}
        </div>
      ))}

      {races.length === 0 && !statusMessage && <p style={{ color: 'var(--grey-600)', fontSize: 14 }}>No races found yet.</p>}
    </div>
  );
}
window.ClubResults = ClubResults;
