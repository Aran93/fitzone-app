import { RoleProvider, useRole } from './context/RoleContext';
import { AppProvider, useApp } from './context/AppContext';
import { useState } from 'react';
import './App.css';

const Icons = {
  Calendar: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  Location: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>,
  User: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
  Check: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>,
  Clock: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
};

// ===== LOGIN MITGLIEDER =====
function LoginScreen() {
  const { members, setCurrentUser } = useApp();
  return (
    <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <div style={{background: 'white', borderRadius: 16, padding: 40, maxWidth: 500, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div style={{fontSize: 48, marginBottom: 12}}>🏋️‍♀️</div>
          <h1 style={{fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8}}>FitZone Login</h1>
          <p style={{color: '#64748b'}}>Wähle dein Mitgliedskonto</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {members.filter(m => m.status === 'AKTIV').map(member => (
            <button key={member.id} onClick={() => setCurrentUser(member)}
              style={{display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '2px solid #e2e8f0', borderRadius: 12, background: 'white', cursor: 'pointer', textAlign: 'left'}}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#4f46e5'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <div style={{width: 48, height: 48, borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4f46e5', overflow: 'hidden'}}>
                {member.foto ? <img src={member.foto} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : `${member.vorname.charAt(0)}${member.nachname.charAt(0)}`}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 700, fontSize: 16, color: '#0f172a'}}>{member.vorname} {member.nachname}</div>
                <div style={{fontSize: 13, color: '#64748b'}}>{member.tarif} • {member.status}</div>
              </div>
              <div style={{fontSize: 20}}>→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== LOGIN TRAINER =====
function TrainerLoginScreen() {
  const { trainers, setCurrentTrainer } = useApp();
  return (
    <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20}}>
      <div style={{background: 'white', borderRadius: 16, padding: 40, maxWidth: 500, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.1)'}}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div style={{fontSize: 48, marginBottom: 12}}>💪</div>
          <h1 style={{fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8}}>Trainer Login</h1>
          <p style={{color: '#64748b'}}>Wähle dein Trainer-Konto</p>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {trainers.filter(t => t.rolle === 'Trainer').map(trainer => (
            <button key={trainer.id} onClick={() => setCurrentTrainer(trainer)}
              style={{display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '2px solid #e2e8f0', borderRadius: 12, background: 'white', cursor: 'pointer', textAlign: 'left'}}
              onMouseOver={e => { e.currentTarget.style.borderColor = trainer.farbe; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}>
              <div style={{width: 48, height: 48, borderRadius: '50%', background: trainer.farbe + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: trainer.farbe, fontSize: 20}}>💪</div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: 700, fontSize: 16, color: '#0f172a'}}>{trainer.name}</div>
                <div style={{fontSize: 13, color: '#64748b'}}>{trainer.qualifikationen.join(', ')}</div>
              </div>
              <div style={{fontSize: 20}}>→</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== 1. REZEPTION (Jessi) =====
function ReceptionDashboard() {
  const { members, addMember, updateMember } = useApp();
  const [showBirthday, setShowBirthday] = useState(false);
  const [birthdayName, setBirthdayName] = useState('');
  const [form, setForm] = useState({ vorname: '', nachname: '', tarif: 'BASIC' as const, geburtsdatum: '', foto: '' });
  const [editMemberId, setEditMemberId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  
  const [checkedInToday, setCheckedInToday] = useState<string[]>(() => {
    const saved = localStorage.getItem('fitzone_checked_in_today');
    const savedDate = localStorage.getItem('fitzone_checkin_date');
    const today = new Date().toDateString();
    if (savedDate !== today) {
      localStorage.setItem('fitzone_checkin_date', today);
      localStorage.setItem('fitzone_checked_in_today', JSON.stringify([]));
      return [];
    }
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({ id: `m-${Date.now()}`, ...form, status: 'AKTIV', nextPayment: '01.07.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0 });
    setForm({ vorname: '', nachname: '', tarif: 'BASIC', geburtsdatum: '', foto: '' });
    alert('✅ Mitglied angelegt!');
  };

  const handleCheckIn = (member: any) => {
    if (!checkedInToday.includes(member.id)) {
      const newCheckedIn = [...checkedInToday, member.id];
      setCheckedInToday(newCheckedIn);
      localStorage.setItem('fitzone_checked_in_today', JSON.stringify(newCheckedIn));
      localStorage.setItem('fitzone_checkin_date', new Date().toDateString());
    }
    const today = new Date();
    if (member.geburtsdatum) {
      const b = new Date(member.geburtsdatum);
      if (b.getDate() === today.getDate() && b.getMonth() === today.getMonth()) {
        setBirthdayName(member.vorname);
        setShowBirthday(true);
        setTimeout(() => setShowBirthday(false), 5000);
        return;
      }
    }
    alert(`✅ ${member.vorname} ${member.nachname} eingecheckt!`);
  };

  const startEdit = (member: any) => { setEditMemberId(member.id); setEditForm({ ...member }); };
  const saveEdit = () => { updateMember(editMemberId!, editForm); setEditMemberId(null); alert('✅ Mitglied aktualisiert!'); };
  const getInitials = (v: string, n: string) => `${v.charAt(0)}${n.charAt(0)}`.toUpperCase();
  const hasBirthdayToday = (member: any) => {
    if (!member.geburtsdatum) return false;
    const today = new Date();
    const b = new Date(member.geburtsdatum);
    return b.getDate() === today.getDate() && b.getMonth() === today.getMonth();
  };

  return (
    <div>
      <h1 className="page-title">Rezeption 🏋️‍♀️</h1>
      <p className="page-subtitle">Willkommen, Jessi!</p>
      <div style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: 20, borderRadius: 12, marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 14, opacity: 0.9}}>Heute eingecheckt</div>
          <div style={{fontSize: 32, fontWeight: 800}}>{checkedInToday.length} / {members.filter(m => m.status === 'AKTIV').length}</div>
        </div>
        <div style={{fontSize: 48}}>📊</div>
      </div>
      <div className="grid-2">
        <div className="card">
          <h3 className="card-title"><span className="icon-circle icon-indigo"><Icons.User /></span> Neues Mitglied</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" type="text" required value={form.vorname} onChange={e => setForm({...form, vorname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" type="text" required value={form.nachname} onChange={e => setForm({...form, nachname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Foto-URL</label><input className="form-input" type="text" placeholder="https://..." value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Tarif</label>
              <select className="form-input" value={form.tarif} onChange={e => setForm({...form, tarif: e.target.value as any})}>
                <option value="BASIC">Basic</option><option value="PLUS">Plus</option><option value="PREMIUM">Premium</option><option value="ONLINE">Online</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Geburtsdatum</label><input className="form-input" type="date" value={form.geburtsdatum} onChange={e => setForm({...form, geburtsdatum: e.target.value})} /></div>
            <button type="submit" className="btn-primary">Speichern</button>
          </form>
        </div>
        <div className="card">
          <h3 className="card-title"><span className="icon-circle icon-emerald"><Icons.Check /></span> Check-in & Bearbeiten</h3>
          <div className="member-list">
            {members.filter(m => m.status === 'AKTIV').map(m => {
              const isCheckedIn = checkedInToday.includes(m.id);
              const isBirthday = hasBirthdayToday(m);
              return (
                <div key={m.id} className="member-row" style={{background: isCheckedIn ? '#ecfdf5' : isBirthday ? '#fef3c7' : 'white', border: isBirthday ? '2px solid #f59e0b' : '1px solid #e2e8f0'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: 1}}>
                    <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(m.vorname, m.nachname)}</div>
                    <div>
                      <div className="member-name">{m.vorname} {m.nachname}{isBirthday && <span style={{marginLeft: 8}}>🎂</span>}</div>
                      <div className="member-info">{m.tarif}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                    {isCheckedIn && <span style={{background: '#10b981', color: 'white', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 700}}>✓ Eingecheckt</span>}
                    <button className="btn-edit-small" onClick={() => startEdit(m)}>Bearbeiten</button>
                    <button className={isCheckedIn ? 'btn-booked' : 'btn-success'} onClick={() => handleCheckIn(m)} disabled={isCheckedIn} style={isCheckedIn ? {opacity: 0.6, cursor: 'not-allowed'} : {}}>
                      {isCheckedIn ? '✓ Fertig' : 'Check-in'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {editMemberId && (
        <div className="modal-overlay" onClick={() => setEditMemberId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 className="modal-title">Bearbeiten</h3><button className="btn-close" onClick={() => setEditMemberId(null)}>&times;</button></div>
            <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" value={editForm.vorname || ''} onChange={e => setEditForm({...editForm, vorname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" value={editForm.nachname || ''} onChange={e => setEditForm({...editForm, nachname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Tarif</label>
              <select className="form-input" value={editForm.tarif || ''} onChange={e => setEditForm({...editForm, tarif: e.target.value})}>
                <option value="BASIC">Basic</option><option value="PLUS">Plus</option><option value="PREMIUM">Premium</option><option value="ONLINE">Online</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Geburtsdatum</label><input className="form-input" type="date" value={editForm.geburtsdatum || ''} onChange={e => setEditForm({...editForm, geburtsdatum: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Foto-URL</label><input className="form-input" type="text" placeholder="https://..." value={editForm.foto || ''} onChange={e => setEditForm({...editForm, foto: e.target.value})} /></div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
              <button className="btn-secondary" onClick={() => setEditMemberId(null)}>Abbrechen</button>
              <button className="btn-primary" style={{width: 'auto', margin: 0}} onClick={saveEdit}>Speichern</button>
            </div>
          </div>
        </div>
      )}
      {showBirthday && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-emoji">🎂</div>
            <h2 className="popup-title">Alles Gute!</h2>
            <p className="popup-text">Heute hat <b>{birthdayName}</b> Geburtstag!</p>
            <p className="popup-sub">Vergiss nicht zu gratulieren! 🎉</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 2. ADMIN (Lisa) =====
function AdminDashboard() {
  const { members, setMembers, updateMember, courses, addCourse, updateCourse, deleteCourse, trainers, updateTrainer } = useApp();
  const [activeTab, setActiveTab] = useState<'mitglieder' | 'kurse' | 'mitarbeiter' | 'statistik'>('mitglieder');
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [blockModal, setBlockModal] = useState<{show: boolean, memberId: string, memberName: string} | null>(null);
  const [blockDuration, setBlockDuration] = useState(14);
  const [blockReason, setBlockReason] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [newCourseForm, setNewCourseForm] = useState({
    title: '', typ: 'Yoga', datum: new Date().toISOString().split('T')[0],
    time: '09:00', room: 'Großer Kursraum', trainer: 'Lisa M.', dauer: 1
  });
  const [editTrainerId, setEditTrainerId] = useState<string | null>(null);
  const [editTrainerForm, setEditTrainerForm] = useState<any>({});
  const [selectedDay, setSelectedDay] = useState<string>('Alle');
  const days = ['Alle', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  const openEdit = (member: any) => { setEditModalId(member.id); setEditForm({ ...member }); };
  const saveEdit = () => { updateMember(editModalId!, editForm); setEditModalId(null); };
  const deleteMemberFn = (id: string, name: string) => {
    if (confirm(`⚠️ "${name}" wirklich löschen?`)) setMembers(members.filter(m => m.id !== id));
  };
  const confirmBlock = () => {
    if (!blockModal) return;
    const date = new Date();
    date.setDate(date.getDate() + blockDuration);
    updateMember(blockModal.memberId, { status: 'GESPERRT', sperr_begruendung: blockReason || 'Manuell gesperrt', sperr_bis: date.toLocaleDateString('de-DE') });
    setBlockModal(null);
  };
  const handleUnblock = (id: string) => { updateMember(id, { status: 'AKTIV', sperr_begruendung: undefined, sperr_bis: undefined }); };

  const handleScheduleCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const conflict = courses.find(c => c.room === newCourseForm.room && c.datum === newCourseForm.datum && c.time === newCourseForm.time && c.status !== 'Storniert');
    if (conflict) { alert(`⚠️ Mamma Mia Schutz: ${newCourseForm.room} ist am ${formatDate(newCourseForm.datum)} um ${newCourseForm.time} bereits belegt!`); return; }
    if (newCourseForm.room === 'Spinning-Raum' && newCourseForm.typ !== 'Spinning') { alert('⚠️ Der Spinning-Raum ist nur für Spinning-Kurse!'); return; }
    const trainer = trainers.find(t => t.name === newCourseForm.trainer);
    if (trainer && !trainer.qualifikationen.includes(newCourseForm.typ)) {
      alert(`⚠️ Qualifikationsfehler!\n\n${newCourseForm.trainer} ist NICHT für "${newCourseForm.typ}" qualifiziert.`);
      return;
    }
    addCourse({
      id: `c-${Date.now()}`, title: newCourseForm.title, typ: newCourseForm.typ,
      datum: newCourseForm.datum, time: newCourseForm.time, room: newCourseForm.room,
      trainer: newCourseForm.trainer, booked: 0, max: newCourseForm.typ === 'Yoga' ? 20 : 15,
      status: 'Geplant', waitlist: [], dauerStunden: newCourseForm.dauer, attendance: {}
    });
    alert('✅ Kurs geplant!');
    setNewCourseForm({ title: '', typ: 'Yoga', datum: new Date().toISOString().split('T')[0], time: '09:00', room: 'Großer Kursraum', trainer: 'Lisa M.', dauer: 1 });
  };

  const counts = {
    green: members.filter(m => m.status === 'AKTIV').length,
    yellow: members.filter(m => m.status === 'PAUSIERT' || m.status === 'ZAHLUNG_AUSSTEHEND').length,
    red: members.filter(m => m.status === 'GESPERRT' || m.status === 'GEKÜNDIGT').length,
  };
  const getBadge = (s: string) => {
    if (s === 'AKTIV') return { text: 'Aktiv', cls: 'badge-green' };
    if (s === 'PAUSIERT') return { text: 'Pausiert', cls: 'badge-amber' };
    if (s === 'ZAHLUNG_AUSSTEHEND') return { text: 'Zahlung prüfen', cls: 'badge-amber' };
    if (s === 'GEKÜNDIGT') return { text: 'Gekündigt', cls: 'badge-red' };
    return { text: 'Gesperrt', cls: 'badge-red' };
  };
  const birthdayMembers = members.filter(m => m.geburtsdatum).map(m => {
    const bday = new Date(m.geburtsdatum);
    const today = new Date();
    const thisYearBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
    if (thisYearBday < today) thisYearBday.setFullYear(today.getFullYear() + 1);
    return { ...m, nextBday: thisYearBday };
  }).sort((a, b) => a.nextBday.getTime() - b.nextBday.getTime());

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return days[new Date(dateStr).getDay()];
  };
  const getTrainerCourses = (trainerName: string) => courses.filter(c => c.trainer === trainerName && c.status !== 'Storniert' && (selectedDay === 'Alle' || getDayOfWeek(c.datum) === selectedDay));
  const getTrainerHours = (trainerName: string) => {
    const hours = getTrainerCourses(trainerName).reduce((sum, c) => sum + (Number(c.dauerStunden) || 1), 0);
    return isNaN(hours) ? 0 : hours;
  };
  const getTrainerEarnings = (trainerName: string) => {
    const trainer = trainers.find(t => t.name === trainerName);
    if (!trainer) return 0;
    const earnings = getTrainerHours(trainerName) * (Number(trainer.stundensatz) || 0);
    return isNaN(earnings) ? 0 : earnings;
  };
  const openTrainerEdit = (trainer: any) => { setEditTrainerId(trainer.id); setEditTrainerForm({ ...trainer }); };
  const saveTrainerEdit = () => { updateTrainer(editTrainerId!, editTrainerForm); setEditTrainerId(null); };

  const getTrainerMonthlyStats = () => {
    return trainers.filter(t => t.rolle === 'Trainer').map(t => {
      const trainerCourses = courses.filter(c => c.trainer === t.name && c.status !== 'Storniert');
      const totalHours = trainerCourses.reduce((sum, c) => sum + (Number(c.dauerStunden) || 1), 0);
      return { ...t, kurse: trainerCourses.length, stunden: totalHours, verdienst: totalHours * t.stundensatz };
    });
  };

  return (
    <div>
      <h1 className="page-title">Admin-Dashboard 👑</h1>
      <p className="page-subtitle">Willkommen, Lisa!</p>
      <div className="grid-3">
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'AKTIV' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'AKTIV' ? null : 'AKTIV')}>
          <div className="ampel-header"><div className="ampel-dot dot-green"></div><span className="ampel-label">Aktive</span></div>
          <p className="ampel-count text-green">{counts.green}</p>
        </div>
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'PAUSIERT_ZAHLUNG' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'PAUSIERT_ZAHLUNG' ? null : 'PAUSIERT_ZAHLUNG')}>
          <div className="ampel-header"><div className="ampel-dot dot-amber"></div><span className="ampel-label">Pausiert/Zahlung</span></div>
          <p className="ampel-count text-amber">{counts.yellow}</p>
        </div>
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'GESPERRT_GEKUENDIGT' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'GESPERRT_GEKUENDIGT' ? null : 'GESPERRT_GEKUENDIGT')}>
          <div className="ampel-header"><div className="ampel-dot dot-red"></div><span className="ampel-label">Gesperrt/Gekündigt</span></div>
          <p className="ampel-count text-red">{counts.red}</p>
        </div>
      </div>
      {selectedStatus && (
        <div className="member-detail-list">
          <div className="member-detail-title">
            <span>{selectedStatus === 'AKTIV' ? '✅ Aktive' : selectedStatus === 'PAUSIERT_ZAHLUNG' ? '⏸️ Pausiert/Zahlung' : '⛔ Gesperrt/Gekündigt'}</span>
            <button className="btn-close-detail" onClick={() => setSelectedStatus(null)}>✕ Schließen</button>
          </div>
          {members.filter(m => {
            if (selectedStatus === 'AKTIV') return m.status === 'AKTIV';
            if (selectedStatus === 'PAUSIERT_ZAHLUNG') return m.status === 'PAUSIERT' || m.status === 'ZAHLUNG_AUSSTEHEND';
            return m.status === 'GESPERRT' || m.status === 'GEKÜNDIGT';
          }).map(m => (
            <div key={m.id} className="member-detail-item">
              <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(`${m.vorname} ${m.nachname}`)}</div>
                <div>
                  <div style={{fontWeight: 600}}>{m.vorname} {m.nachname}</div>
                  <div style={{fontSize: 13, color: '#64748b'}}>{m.tarif}</div>
                </div>
              </div>
              <span className={`badge ${getBadge(m.status).cls}`}>{getBadge(m.status).text}</span>
            </div>
          ))}
        </div>
      )}
      <div className="tabs-container" style={{marginTop: 24}}>
        <button className={`tab-btn ${activeTab === 'mitglieder' ? 'active' : ''}`} onClick={() => setActiveTab('mitglieder')}>👥 Mitglieder</button>
        <button className={`tab-btn ${activeTab === 'kurse' ? 'active' : ''}`} onClick={() => setActiveTab('kurse')}>📅 Kurse</button>
        <button className={`tab-btn ${activeTab === 'mitarbeiter' ? 'active' : ''}`} onClick={() => setActiveTab('mitarbeiter')}>💼 Mitarbeiter & Finanzen</button>
        <button className={`tab-btn ${activeTab === 'statistik' ? 'active' : ''}`} onClick={() => setActiveTab('statistik')}>📊 Statistik</button>
      </div>

      {activeTab === 'mitglieder' && (
        <>
          {(() => {
            const noShowMembers = members.filter(m => (m.noShowCount || 0) > 0);
            const gebuehrMembers = members.filter(m => (m.offeneGebuehren || 0) > 0);
            if (noShowMembers.length === 0 && gebuehrMembers.length === 0) return null;
            return (
              <div className="admin-section">
                <h2 className="admin-section-title" style={{color: '#dc2626'}}>⚠️ Problemfälle ({noShowMembers.length + gebuehrMembers.length})</h2>
                {noShowMembers.length > 0 && (
                  <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 20, marginBottom: 16}}>
                    <h3 style={{color: '#991b1b', marginBottom: 12, fontSize: 16}}>🚫 Mitglieder mit No-Shows ({noShowMembers.length})</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                      {noShowMembers.map(m => {
                        const count = m.noShowCount || 0;
                        const isGesperrt = m.status === 'GESPERRT' && m.sperr_begruendung?.includes('No-Show');
                        return (
                          <div key={m.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'white', borderRadius: 8, border: '1px solid #fecaca'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                              <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : `${m.vorname.charAt(0)}${m.nachname.charAt(0)}`}</div>
                              <div>
                                <div style={{fontWeight: 700}}>{m.vorname} {m.nachname}</div>
                                <div style={{fontSize: 13, color: '#64748b'}}>
                                  {count}x No-Show {count >= 3 && <span style={{color: '#dc2626', fontWeight: 700}}>⛔ GESPERRT</span>}
                                  {count === 2 && <span style={{color: '#f59e0b', fontWeight: 700}}> ⚠️ 1x noch bis Sperre!</span>}
                                </div>
                              </div>
                            </div>
                            <div style={{display: 'flex', gap: 8}}>
                              <button onClick={() => {
                                if (confirm(`No-Show-Zähler von ${m.vorname} zurücksetzen?\n\n${m.status === 'GESPERRT' ? '⚠️ Das Mitglied wird auch entsperrt!' : ''}`)) {
                                  const updates: any = { noShowCount: 0 };
                                  if (m.status === 'GESPERRT') {
                                    updates.status = 'AKTIV';
                                    updates.sperr_begruendung = undefined;
                                    updates.sperr_bis = undefined;
                                  }
                                  updateMember(m.id, updates);
                                  alert(`✅ ${m.vorname} wurde zurückgesetzt${m.status === 'GESPERRT' ? ' und entsperrt' : ''}!`);
                                }
                              }} style={{padding: '6px 12px', background: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer'}}>🔄 Zurücksetzen</button>
                              {isGesperrt && <button onClick={() => handleUnblock(m.id)} className="btn-unblock">🔓 Entsperren</button>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {gebuehrMembers.length > 0 && (
                  <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20}}>
                    <h3 style={{color: '#92400e', marginBottom: 12, fontSize: 16}}>💰 Offene Gebühren ({gebuehrMembers.length})</h3>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                      {gebuehrMembers.map(m => (
                        <div key={m.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: 'white', borderRadius: 8, border: '1px solid #fde68a'}}>
                          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
                            <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : `${m.vorname.charAt(0)}${m.nachname.charAt(0)}`}</div>
                            <div>
                              <div style={{fontWeight: 700}}>{m.vorname} {m.nachname}</div>
                              <div style={{fontSize: 13, color: '#92400e'}}><strong>{(m.offeneGebuehren || 0).toFixed(2)} €</strong> offen</div>
                            </div>
                          </div>
                          <button onClick={() => {
                            if (confirm(`Gebühr von ${m.vorname} als bezahlt markieren?\n\n${m.status === 'GESPERRT' ? '⚠️ Das Mitglied wird auch entsperrt!' : ''}`)) {
                              const updates: any = { offeneGebuehren: 0 };
                              if (m.status === 'GESPERRT') {
                                updates.status = 'AKTIV';
                                updates.sperr_begruendung = undefined;
                                updates.sperr_bis = undefined;
                              }
                              updateMember(m.id, updates);
                              alert(`✅ Gebühr von ${m.vorname} wurde als bezahlt markiert${m.status === 'GESPERRT' ? ' und Mitglied entsperrt' : ''}!`);
                            }
                          }} style={{padding: '6px 12px', background: '#10b981', color: 'white', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer'}}>✓ Als bezahlt markieren</button>
                        </div>
                      ))}
                    </div>
                    <div style={{marginTop: 16, padding: 12, background: '#fef3c7', borderRadius: 8, textAlign: 'center', fontWeight: 700, color: '#92400e'}}>
                      💵 Gesamt offen: {gebuehrMembers.reduce((sum, m) => sum + (m.offeneGebuehren || 0), 0).toFixed(2)} €
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
          <div className="admin-section">
            <h2 className="admin-section-title">🎂 Geburtstage</h2>
            {birthdayMembers.length === 0 ? <p style={{color: '#64748b'}}>Keine Geburtstage gespeichert.</p> : (
              <div className="birthday-list">
                {birthdayMembers.map(m => {
                  const bday = new Date(m.geburtsdatum);
                  const dayMonth = bday.toLocaleDateString('de-DE', { day: '2-digit', month: 'long' });
                  const isNext = birthdayMembers.indexOf(m) === 0;
                  return (
                    <div key={m.id} className="birthday-card" style={isNext ? {border: '2px solid #f59e0b', background: '#fffbeb'} : {}}>
                      <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(`${m.vorname} ${m.nachname}`)}</div>
                      <div className="birthday-name">{m.vorname} {m.nachname} {isNext && <span style={{fontSize: 11, color: '#f59e0b'}}>⏰ Als nächstes!</span>}</div>
                      <div className="birthday-date">🎂 {dayMonth}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="admin-section">
            <h2 className="admin-section-title">👥 Alle Mitglieder ({members.length})</h2>
            <div className="members-table">
              {members.map(m => {
                const badge = getBadge(m.status);
                return (
                  <div key={m.id} className="member-item" style={{background: (m.noShowCount || 0) >= 2 ? '#fef2f2' : (m.offeneGebuehren || 0) > 0 ? '#fffbeb' : 'white'}}>
                    <div className="member-item-info">
                      <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(`${m.vorname} ${m.nachname}`)}</div>
                      <div>
                        <div className="member-name">
                          {m.vorname} {m.nachname} {m.altvertrag && <span style={{fontSize: 11, color: '#64748b'}}>(Altvertrag)</span>}
                          {(m.noShowCount || 0) > 0 && <span style={{marginLeft: 8, color: '#dc2626', fontSize: 12}}>⚠️ {m.noShowCount}x No-Show</span>}
                          {(m.offeneGebuehren || 0) > 0 && <span style={{marginLeft: 8, color: '#f59e0b', fontSize: 12}}>💰 {m.offeneGebuehren}€</span>}
                        </div>
                        <div className="member-info">
                          {m.tarif} | {m.status === 'PAUSIERT' ? `Pause bis ${formatDate(m.pausen_ende || '')}` : m.status === 'GESPERRT' ? `Gesperrt bis ${m.sperr_bis}` : m.nextPayment}
                          {m.geburtsdatum && ` | 🎂 ${formatDate(m.geburtsdatum)}`}
                        </div>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: 6, flexWrap: 'wrap'}}>
                      <span className={`badge ${badge.cls}`}>{badge.text}</span>
                      <button className="btn-edit" onClick={() => openEdit(m)}>Bearbeiten</button>
                      {m.status === 'AKTIV' && <button className="btn-pause" onClick={() => setBlockModal({show: true, memberId: m.id, memberName: `${m.vorname} ${m.nachname}`})}>Pausieren</button>}
                      {m.status !== 'GESPERRT' && <button className="btn-block" onClick={() => setBlockModal({show: true, memberId: m.id, memberName: `${m.vorname} ${m.nachname}`})}>Sperren</button>}
                      {m.status === 'GESPERRT' && <button className="btn-unblock" onClick={() => handleUnblock(m.id)}>Entsperren</button>}
                      <button className="btn-delete" onClick={() => deleteMemberFn(m.id, `${m.vorname} ${m.nachname}`)}>🗑️</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {activeTab === 'kurse' && (
        <>
          <div className="admin-panel">
            <h3 className="admin-panel-title">➕ Neuen Kurs planen</h3>
            <form onSubmit={handleScheduleCourse}>
              <div className="form-group"><label className="form-label">Kursname</label><input className="form-input" required value={newCourseForm.title} onChange={e => setNewCourseForm({...newCourseForm, title: e.target.value})} /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Typ</label>
                  <select className="form-input" value={newCourseForm.typ} onChange={e => setNewCourseForm({...newCourseForm, typ: e.target.value})}>
                    <option value="Yoga">Yoga</option><option value="Spinning">Spinning</option><option value="HIIT">HIIT</option><option value="Pilates">Pilates</option><option value="Functional">Functional</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">📅 Datum</label><input className="form-input" type="date" required value={newCourseForm.datum} onChange={e => setNewCourseForm({...newCourseForm, datum: e.target.value})} /></div>
                <div className="form-group"><label className="form-label">🕐 Zeit</label>
                  <select className="form-input" value={newCourseForm.time} onChange={e => setNewCourseForm({...newCourseForm, time: e.target.value})}>
                    <option value="09:00">09:00</option><option value="10:00">10:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">🏢 Raum</label>
                  <select className="form-input" value={newCourseForm.room} onChange={e => setNewCourseForm({...newCourseForm, room: e.target.value})}>
                    <option value="Großer Kursraum">Großer Kursraum</option><option value="Spinning-Raum">Spinning-Raum</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label">👨‍🏫 Trainer</label>
                  <select className="form-input" value={newCourseForm.trainer} onChange={e => setNewCourseForm({...newCourseForm, trainer: e.target.value})}>
                    {trainers.filter(t => t.rolle === 'Trainer').map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">⏱️ Dauer (Stunden)</label>
                  <select className="form-input" value={newCourseForm.dauer} onChange={e => setNewCourseForm({...newCourseForm, dauer: parseFloat(e.target.value)})}>
                    <option value="0.5">0.5 h</option><option value="1">1 h</option><option value="1.5">1.5 h</option><option value="2">2 h</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{marginTop: 12}}>Kurs speichern</button>
            </form>
          </div>
          <div className="admin-section">
            <h2 className="admin-section-title">📅 Alle Kurse</h2>
            <div className="members-table">
              {courses.map(c => {
                const auslastung = c.max > 0 ? (c.booked / c.max) * 100 : 0;
                let ampelFarbe = '#10b981';
                let ampelText = 'Gut';
                if (auslastung < 40) { ampelFarbe = '#ef4444'; ampelText = 'Leer'; }
                else if (auslastung < 75) { ampelFarbe = '#f59e0b'; ampelText = 'Mittel'; }
                return (
                  <div key={c.id} className="member-item" style={{background: c.status === 'Storniert' ? '#fef2f2' : 'white', opacity: c.status === 'Storniert' ? 0.7 : 1}}>
                    <div style={{flex: 1}}>
                      <div className="member-name">
                        {c.title} <span className="course-type-badge">{c.typ}</span>
                        {c.status === 'Storniert' && <span style={{marginLeft: 8, color: '#dc2626', fontSize: 12}}>❌ Storniert</span>}
                      </div>
                      <div className="member-info">📅 {formatDate(c.datum)} • 🕐 {c.time} • 🏢 {c.room} • 👨‍🏫 {c.trainer}</div>
                      <div className="member-info" style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 4}}>
                        <span>⏱️ {c.dauerStunden || 1}h</span>
                        <span style={{display: 'inline-flex', alignItems: 'center', gap: 6}}>
                          <span style={{width: 10, height: 10, borderRadius: '50%', background: ampelFarbe, boxShadow: `0 0 0 3px ${ampelFarbe}30`}}></span>
                          <strong style={{color: ampelFarbe}}>{Math.round(auslastung)}% ({ampelText})</strong>
                        </span>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0'}}>
                        <span style={{fontSize: 13, fontWeight: 600, color: '#475569'}}>👥 Teilnehmer:</span>
                        <button onClick={() => c.booked > 0 && updateCourse(c.id, { booked: c.booked - 1 })} disabled={c.booked === 0}
                          style={{width: 28, height: 28, borderRadius: '50%', background: c.booked === 0 ? '#e2e8f0' : '#fef2f2', color: c.booked === 0 ? '#94a3b8' : '#dc2626', border: 'none', fontWeight: 700, fontSize: 16, cursor: c.booked === 0 ? 'not-allowed' : 'pointer'}}>−</button>
                        <span style={{fontSize: 18, fontWeight: 800, color: '#0f172a', minWidth: 60, textAlign: 'center'}}>{c.booked} / {c.max}</span>
                        <button onClick={() => c.booked < c.max && updateCourse(c.id, { booked: c.booked + 1 })} disabled={c.booked >= c.max}
                          style={{width: 28, height: 28, borderRadius: '50%', background: c.booked >= c.max ? '#e2e8f0' : '#ecfdf5', color: c.booked >= c.max ? '#94a3b8' : '#10b981', border: 'none', fontWeight: 700, fontSize: 16, cursor: c.booked >= c.max ? 'not-allowed' : 'pointer'}}>+</button>
                        <button onClick={() => {
                          const neueZahl = prompt(`Neue Teilnehmerzahl für "${c.title}" (max ${c.max}):`, c.booked.toString());
                          if (neueZahl !== null) {
                            const zahl = parseInt(neueZahl);
                            if (!isNaN(zahl) && zahl >= 0 && zahl <= c.max) updateCourse(c.id, { booked: zahl });
                            else alert(`⚠️ Bitte eine Zahl zwischen 0 und ${c.max} eingeben!`);
                          }
                        }} style={{padding: '4px 10px', background: '#eef2ff', color: '#4f46e5', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer'}}>✏️ Setzen</button>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                      {c.status !== 'Storniert' && <button className="btn-danger" onClick={() => { if (confirm('Kurs absagen?')) updateCourse(c.id, { status: 'Storniert' }); }}>Absagen</button>}
                      <button className="btn-delete" onClick={() => { if (confirm(`⚠️ Kurs "${c.title}" WIRKLICH löschen?`)) deleteCourse(c.id); }}>🗑️</button>
                      <span className={`badge ${c.status === 'Storniert' ? 'badge-red' : 'badge-green'}`}>{c.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {activeTab === 'mitarbeiter' && (
        <div className="admin-section">
          <h2 className="admin-section-title">💼 Mitarbeiter & Finanzen</h2>
          <div className="day-filter">
            {days.map(d => (
              <button key={d} className={`day-btn ${selectedDay === d ? 'active' : ''}`} onClick={() => setSelectedDay(d)}>
                {d === 'Alle' ? '📅 Ganzer Monat' : d.substring(0, 2)}
              </button>
            ))}
          </div>
          <div className="finance-grid">
            {trainers.map(t => {
              const hours = getTrainerHours(t.name);
              const earnings = getTrainerEarnings(t.name);
              const trainerCourses = getTrainerCourses(t.name);
              return (
                <div key={t.id} className="finance-card">
                  <div className="finance-card-header">
                    <div>
                      <div className="finance-name">{t.name}</div>
                      <span className="finance-role" style={{background: t.farbe + '20', color: t.farbe}}>{t.rolle}</span>
                    </div>
                    <button className="staff-edit-btn" onClick={() => openTrainerEdit(t)}>⚙️ Bearbeiten</button>
                  </div>
                  <div className="finance-row"><span>💰 Stundensatz:</span><strong>{t.stundensatz} €</strong></div>
                  <div className="finance-row"><span>🎯 Qualifikationen:</span><span style={{fontSize: 11}}>{t.qualifikationen.join(', ')}</span></div>
                  <div className="finance-row"><span>📚 Kurse:</span><strong>{trainerCourses.length}</strong></div>
                  <div className="finance-row"><span>⏰ Stunden:</span><strong>{hours} h</strong></div>
                  {trainerCourses.length > 0 && (
                    <div className="course-assignment">
                      <div style={{fontWeight: 700, marginBottom: 6, fontSize: 12}}>📋 Einsätze:</div>
                      {trainerCourses.map(c => (
                        <div key={c.id} className="course-assignment-item">
                          <span>📅 {formatDate(c.datum)} {c.time}</span><strong>{c.title}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="finance-total">💵 {isNaN(earnings) ? '0.00' : earnings.toFixed(2)} €</div>
                </div>
              );
            })}
          </div>
          <div className="month-summary">
            <div className="month-summary-label">💼 Gesamte Personalkosten (Monat)</div>
            <div className="month-summary-value">
              {(() => {
                const total = trainers.reduce((sum, t) => sum + getTrainerEarnings(t.name), 0);
                return isNaN(total) ? '0.00' : total.toFixed(2);
              })()} €
            </div>
          </div>
        </div>
      )}

      {activeTab === 'statistik' && (
        <div className="admin-section">
          <h2 className="admin-section-title">📊 Trainer-Monatsauswertung</h2>
          <table className="stats-table">
            <thead>
              <tr>
                <th>Trainer</th>
                <th>Qualifikationen</th>
                <th>Kurse</th>
                <th>Stunden</th>
                <th>Stundensatz</th>
                <th>Verdienst</th>
              </tr>
            </thead>
            <tbody>
              {getTrainerMonthlyStats().map(t => (
                <tr key={t.id}>
                  <td style={{fontWeight: 700}}>{t.name}</td>
                  <td>{t.qualifikationen.map(q => <span key={q} className="qualification-badge">{q}</span>)}</td>
                  <td>{t.kurse}</td>
                  <td>{t.stunden} h</td>
                  <td>{t.stundensatz} €</td>
                  <td className="stats-highlight">{t.verdienst.toFixed(2)} €</td>
                </tr>
              ))}
              <tr style={{background: '#eef2ff', fontWeight: 700}}>
                <td colSpan={3}>GESAMT</td>
                <td>{getTrainerMonthlyStats().reduce((s, t) => s + t.stunden, 0)} h</td>
                <td>-</td>
                <td className="stats-highlight">{getTrainerMonthlyStats().reduce((s, t) => s + t.verdienst, 0).toFixed(2)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {editModalId && (
        <div className="modal-overlay" onClick={() => setEditModalId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: 550}}>
            <div className="modal-header"><h3 className="modal-title">Mitglied bearbeiten</h3><button className="btn-close" onClick={() => setEditModalId(null)}>&times;</button></div>
            <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" value={editForm.vorname || ''} onChange={e => setEditForm({...editForm, vorname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" value={editForm.nachname || ''} onChange={e => setEditForm({...editForm, nachname: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">📧 E-Mail</label><input className="form-input" type="email" value={editForm.email || ''} onChange={e => setEditForm({...editForm, email: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">🎂 Geburtsdatum</label><input className="form-input" type="date" value={editForm.geburtsdatum || ''} onChange={e => setEditForm({...editForm, geburtsdatum: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">📸 Foto-URL</label><input className="form-input" type="text" placeholder="https://..." value={editForm.foto || ''} onChange={e => setEditForm({...editForm, foto: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">💳 Tarif</label>
              <select className="form-input" value={editForm.tarif || ''} onChange={e => setEditForm({...editForm, tarif: e.target.value})}>
                <option value="BASIC">Basic</option><option value="PLUS">Plus</option><option value="PREMIUM">Premium</option><option value="ONLINE">Online</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Status</label>
              <select className="form-input" value={editForm.status || ''} onChange={e => setEditForm({...editForm, status: e.target.value})}>
                <option value="AKTIV">Aktiv</option><option value="PAUSIERT">Pausiert</option><option value="GESPERRT">Gesperrt</option><option value="GEKÜNDIGT">Gekündigt</option><option value="ZAHLUNG_AUSSTEHEND">Zahlung ausstehend</option>
              </select>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20}}>
              <button className="btn-secondary" onClick={() => setEditModalId(null)}>Abbrechen</button>
              <button className="btn-primary" style={{width: 'auto', margin: 0}} onClick={saveEdit}>Speichern</button>
            </div>
          </div>
        </div>
      )}
      {blockModal && blockModal.show && (
        <div className="modal-overlay" onClick={() => setBlockModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 className="modal-title">⛔ Sperren</h3><button className="btn-close" onClick={() => setBlockModal(null)}>&times;</button></div>
            <p><b>{blockModal.memberName}</b> sperren.</p>
            <div className="duration-options">
              <button className={`duration-btn ${blockDuration === 7 ? 'active' : ''}`} onClick={() => setBlockDuration(7)}>7 Tage</button>
              <button className={`duration-btn ${blockDuration === 14 ? 'active' : ''}`} onClick={() => setBlockDuration(14)}>14 Tage</button>
              <button className={`duration-btn ${blockDuration === 30 ? 'active' : ''}`} onClick={() => setBlockDuration(30)}>30 Tage</button>
            </div>
            <div className="form-group"><label className="form-label">Grund</label><input className="form-input" value={blockReason} onChange={e => setBlockReason(e.target.value)} /></div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12}}>
              <button className="btn-secondary" onClick={() => setBlockModal(null)}>Abbrechen</button>
              <button className="btn-primary" style={{width: 'auto', margin: 0, background: '#dc2626'}} onClick={confirmBlock}>Sperren</button>
            </div>
          </div>
        </div>
      )}
      {editTrainerId && (
        <div className="modal-overlay" onClick={() => setEditTrainerId(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3 className="modal-title">⚙️ Mitarbeiter bearbeiten</h3><button className="btn-close" onClick={() => setEditTrainerId(null)}>&times;</button></div>
            <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={editTrainerForm.name || ''} onChange={e => setEditTrainerForm({...editTrainerForm, name: e.target.value})} /></div>
            <div className="form-group"><label className="form-label">💰 Stundensatz (€)</label><input className="form-input" type="number" min="0" step="0.5" value={editTrainerForm.stundensatz || 0} onChange={e => setEditTrainerForm({...editTrainerForm, stundensatz: parseFloat(e.target.value)})} /></div>
            <div className="form-group"><label className="form-label">🎭 Rolle</label>
              <select className="form-input" value={editTrainerForm.rolle || 'Trainer'} onChange={e => setEditTrainerForm({...editTrainerForm, rolle: e.target.value})}>
                <option value="Trainer">Trainer</option><option value="Rezeption">Rezeption</option><option value="Management">Management</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">🎯 Qualifikationen (Komma-getrennt)</label>
              <input className="form-input" value={(editTrainerForm.qualifikationen || []).join(', ')}
                onChange={e => setEditTrainerForm({...editTrainerForm, qualifikationen: e.target.value.split(',').map((q: string) => q.trim()).filter((q: string) => q)})}
                placeholder="z.B. Yoga, Pilates, HIIT" />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 20, gap: 12}}>
              <button className="btn-secondary" onClick={() => setEditTrainerId(null)}>Abbrechen</button>
              <button className="btn-primary" style={{width: 'auto', margin: 0}} onClick={saveTrainerEdit}>Speichern</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== 3. TRAINER =====
function TrainerDashboard() {
  const { courses, updateCourse, updateMember, currentTrainer, setCurrentTrainer, members } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  if (!currentTrainer) return <TrainerLoginScreen />;

  const myCourses = courses.filter(c => c.trainer === currentTrainer.name && c.status !== 'Storniert');
  const selectedCourse = selectedCourseId ? courses.find(c => c.id === selectedCourseId) : null;

  const handleLogout = () => setCurrentTrainer(null);

  const markAttendance = (courseId: string, memberId: string, status: 'DA' | 'NO_SHOW') => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const newAttendance = { ...(course.attendance || {}), [memberId]: status };
    updateCourse(courseId, { attendance: newAttendance });

    const member = members.find(m => m.id === memberId);
    if (!member) return;

    if (status === 'NO_SHOW') {
      const newCount = (member.noShowCount || 0) + 1;
      const updates: any = { noShowCount: newCount };
      
      if (newCount >= 3) {
        const sperrBis = new Date();
        sperrBis.setDate(sperrBis.getDate() + 14);
        updates.status = 'GESPERRT';
        updates.sperr_begruendung = '3x No-Show';
        updates.sperr_bis = sperrBis.toLocaleDateString('de-DE');
        alert(`⛔ SPERRE AKTIVIERT!\n\n${member.vorname} ${member.nachname} hat 3x unentschuldigt gefehlt.\n\n→ Account gesperrt bis: ${updates.sperr_bis}\n→ Keine Kursbuchungen möglich\n\n(Laut Spec 4.3: Keine Gebühr bei No-Show)`);
      } else {
        alert(`⚠️ No-Show erfasst\n\nMitglied: ${member.vorname} ${member.nachname}\nKurs: ${course.title}\n\nNo-Show-Zähler: ${newCount}/3\n${3 - newCount}x No-Show noch bis zur Sperre (14 Tage)\n\n(Laut Spec 4.3: Keine Gebühr bei No-Show)`);
      }
      
      updateMember(memberId, updates);
    } else {
      alert(`✅ ${member.vorname} ${member.nachname} als anwesend markiert.`);
    }
  };

  const getAttendanceStats = (course: any) => {
    const attendance = course.attendance || {};
    const total = course.booked;
    const da = Object.values(attendance).filter(s => s === 'DA').length;
    const noShow = Object.values(attendance).filter(s => s === 'NO_SHOW').length;
    const offen = total - da - noShow;
    return { da, noShow, offen, total };
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <div>
          <h1 className="page-title" style={{margin: 0}}>Trainer-Bereich 💪</h1>
          <p className="page-subtitle" style={{margin: 0}}>Willkommen, {currentTrainer.name}!</p>
        </div>
        <button onClick={handleLogout} style={{padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'}}>🚪 Abmelden</button>
      </div>

      <div className="admin-panel" style={{marginBottom: 24}}>
        <h3 className="admin-panel-title">🎯 Deine Qualifikationen</h3>
        <div>{currentTrainer.qualifikationen.map(q => <span key={q} className="qualification-badge">{q}</span>)}</div>
      </div>

      <div style={{background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 13, color: '#1e40af'}}>
        <strong>📋 Spec 4.3 - No-Show-Regelung:</strong><br/>
        • Trainer hakt Anwesenheit live ab<br/>
        • 3x No-Show hintereinander = 14 Tage Sperre<br/>
        • ❌ Keine Gebühr bei No-Show (nur Sperre)<br/>
        • 💰 5€ Gebühr nur bei Stornierung weniger als 2h vor Kurs (Spec 4.4)
      </div>

      {!selectedCourse ? (
        <>
          <h2 className="section-title">📅 Deine Kurse</h2>
          {myCourses.length === 0 ? (
            <div className="empty-state"><div className="empty-state-title">Keine Kurse zugewiesen</div></div>
          ) : (
            <div className="course-grid">
              {myCourses.map(c => {
                const stats = getAttendanceStats(c);
                return (
                  <div key={c.id} className="course-card" style={{cursor: 'pointer'}} onClick={() => setSelectedCourseId(c.id)}>
                    <div className={`course-banner course-banner-${c.typ === 'Yoga' ? 'yoga' : c.typ === 'HIIT' ? 'hiit' : 'fit'}`}>
                      <div className="course-badge">{c.booked}/{c.max}</div>
                    </div>
                    <div className="course-content">
                      <h3 className="course-title">{c.title} <span className="course-type-badge">{c.typ}</span></h3>
                      <div className="course-detail">📅 {c.datum}</div>
                      <div className="course-detail"><Icons.Clock /> {c.time}</div>
                      <div className="course-detail"><Icons.Location /> {c.room}</div>
                      <div style={{marginTop: 12, padding: 10, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0'}}>
                        <div style={{fontSize: 11, fontWeight: 700, color: '#475569', marginBottom: 6, textTransform: 'uppercase'}}>Anwesenheit</div>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 4}}>
                          <span style={{color: '#10b981'}}>✓ {stats.da} Da</span>
                          <span style={{color: '#ef4444'}}>✗ {stats.noShow} No-Show</span>
                          <span style={{color: '#64748b'}}>○ {stats.offen} Offen</span>
                        </div>
                        <div style={{marginTop: 8, height: 4, background: '#e2e8f0', borderRadius: 2, overflow: 'hidden'}}>
                          <div style={{height: '100%', width: `${stats.total > 0 ? (stats.da / stats.total) * 100 : 0}%`, background: '#10b981'}}></div>
                        </div>
                      </div>
                    </div>
                    <div className="course-footer">
                      <button className="btn-book" onClick={(e) => { e.stopPropagation(); setSelectedCourseId(c.id); }}>
                        {stats.offen > 0 ? '📋 Anwesenheit erfassen' : '✓ Alle erfasst'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedCourseId(null)} style={{marginBottom: 20, padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>← Zurück zu meinen Kursen</button>
          <div className="members-table">
            <div className="course-header">
              <div>
                <h3 style={{fontSize: 24, marginBottom: 8}}>{selectedCourse.title} <span className="course-type-badge">{selectedCourse.typ}</span></h3>
                <div className="course-meta">
                  <span>📅 {selectedCourse.datum}</span>
                  <span><Icons.Clock /> {selectedCourse.time}</span>
                  <span><Icons.Location /> {selectedCourse.room}</span>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontWeight: 600}}>{selectedCourse.booked}/{selectedCourse.max} gebucht</div>
                <div style={{fontSize: 12, color: '#64748b', marginTop: 4}}>
                  {(() => {
                    const stats = getAttendanceStats(selectedCourse);
                    return `${stats.da + stats.noShow}/${stats.total} erfasst`;
                  })()}
                </div>
              </div>
            </div>
            <div className="course-body">
              <div className="course-body-title">👥 Teilnehmer-Liste - Anwesenheit erfassen</div>
              {selectedCourse.booked === 0 ? (
                <p style={{color: '#64748b', textAlign: 'center', padding: 20}}>Keine Teilnehmer gebucht.</p>
              ) : (
                <>
                  <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 12, color: '#92400e'}}>
                    💡 <strong>Hinweis:</strong> Hake die Anwesenheit live während des Kurses ab. Nach 3x No-Show wird das Mitglied automatisch für 14 Tage gesperrt (Spec 4.3).
                  </div>
                  {Array.from({length: selectedCourse.booked}).map((_, idx) => {
                    const member = members[idx % members.length];
                    const status = selectedCourse.attendance?.[member.id];
                    return (
                      <div key={idx} className={`attendance-item ${status === 'DA' ? 'attendance-present' : status === 'NO_SHOW' ? 'attendance-noshow' : ''}`}
                        style={status === 'NO_SHOW' ? {background: '#fef2f2', borderColor: '#fecaca'} : {}}>
                        <div className="attendance-left">
                          <div className={`check-box ${status === 'DA' ? 'checked' : ''}`}
                            style={status === 'NO_SHOW' ? {background: '#ef4444', borderColor: '#ef4444'} : {}}>
                            {status === 'DA' && <Icons.Check />}
                            {status === 'NO_SHOW' && <span style={{color: 'white', fontWeight: 700}}>✗</span>}
                          </div>
                          <div>
                            <div style={{fontWeight: 600}}>
                              {member.vorname} {member.nachname}
                              {(member.noShowCount || 0) >= 2 && (
                                <span style={{marginLeft: 8, fontSize: 11, color: '#dc2626', fontWeight: 700}}>⚠️ {member.noShowCount}/3 No-Shows</span>
                              )}
                            </div>
                            <div style={{fontSize: 12, color: '#64748b'}}>
                              {member.tarif}
                              {(member.noShowCount || 0) > 0 && <span style={{marginLeft: 8}}>• No-Shows: {member.noShowCount}/3</span>}
                            </div>
                          </div>
                        </div>
                        <div style={{display: 'flex', gap: 8}}>
                          {!status && (
                            <>
                              <button className="btn-success" onClick={() => markAttendance(selectedCourse.id, member.id, 'DA')}>✓ Da</button>
                              <button className="btn-danger" onClick={() => markAttendance(selectedCourse.id, member.id, 'NO_SHOW')}>✗ No-Show</button>
                            </>
                          )}
                          {status === 'DA' && <span className="status-badge active">✓ Anwesend</span>}
                          {status === 'NO_SHOW' && <span className="status-badge" style={{background: '#fef2f2', color: '#dc2626'}}>✗ No-Show</span>}
                        </div>
                      </div>
                    );
                  })}
                  {(() => {
                    const stats = getAttendanceStats(selectedCourse);
                    if (stats.da + stats.noShow === stats.total) {
                      return (
                        <div style={{marginTop: 20, padding: 16, background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, textAlign: 'center'}}>
                          <div style={{fontSize: 24, marginBottom: 4}}>✅</div>
                          <div style={{fontWeight: 700, color: '#065f46'}}>Anwesenheit vollständig erfasst!</div>
                          <div style={{fontSize: 13, color: '#065f46', marginTop: 4}}>{stats.da} anwesend • {stats.noShow} No-Shows</div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ===== 4. MITGLIED =====
function MemberDashboard() {
  const { currentUser, setCurrentUser, courses, updateCourse, updateMember, addBooking, removeBooking, getMemberBookings, videos } = useApp();
  const [activeTab, setActiveTab] = useState<'kurse' | 'videos' | 'profil'>(
    currentUser?.tarif === 'ONLINE' ? 'videos' : 'kurse'
  );

  if (!currentUser) return <LoginScreen />;

  const bookings = getMemberBookings(currentUser.id);
  const currentTarif = currentUser.tarif as 'BASIC' | 'PLUS' | 'PREMIUM' | 'ONLINE';

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const getBuchungenDieseWoche = () => {
    const jetzt = new Date();
    const aktuelleWoche = getWeekNumber(jetzt);
    const aktuellesJahr = jetzt.getFullYear();
    return bookings.filter(bookingId => {
      const kurs = courses.find(c => c.id === bookingId);
      if (!kurs || !kurs.datum) return false;
      const kursDatum = new Date(kurs.datum);
      const kursWoche = getWeekNumber(kursDatum);
      const kursJahr = kursDatum.getFullYear();
      return kursWoche === aktuelleWoche && kursJahr === aktuellesJahr;
    });
  };

  const handleBook = (id: string) => {
    const kurs = courses.find(c => c.id === id);
    if (!kurs) return;
    if (currentUser.status === 'GESPERRT') {
      alert(`⛔ Du bist bis ${currentUser.sperr_bis} gesperrt.`);
      return;
    }
    if (currentTarif === 'ONLINE') {
      alert(`⚠️ Online-Tarif beinhaltet keine Live-Kurse im Studio!`);
      return;
    }
    if (currentTarif === 'BASIC') {
      const buchungenDieseWoche = getBuchungenDieseWoche();
      const kursDatum = new Date(kurs.datum);
      const aktuelleWoche = getWeekNumber(new Date());
      const aktuellesJahr = new Date().getFullYear();
      const kursWoche = getWeekNumber(kursDatum);
      const kursJahr = kursDatum.getFullYear();
      const istAktuelleWoche = kursWoche === aktuelleWoche && kursJahr === aktuellesJahr;
      if (istAktuelleWoche && buchungenDieseWoche.length >= 2) {
        alert(`⚠️ Basic-Limit erreicht! Maximal 2 Kurse pro Woche.`);
        return;
      }
    }
    addBooking(currentUser.id, id);
    updateCourse(id, { booked: kurs.booked + 1 });
  };

  const handleCancel = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    const kursZeit = new Date(`${course.datum}T${course.time}`);
    const jetzt = new Date();
    const diffStunden = (kursZeit.getTime() - jetzt.getTime()) / (1000 * 60 * 60);
    let gebuehr = 0;
    if (diffStunden < 2 && currentTarif !== 'PREMIUM' && currentTarif !== 'ONLINE') {
      gebuehr = 5;
      if (!confirm(`⚠️ Stornierung weniger als 2 Stunden vor Kursbeginn!\n\n5€ Gebühr anfallen.\n\nFortfahren?`)) return;
      updateMember(currentUser.id, { offeneGebuehren: (currentUser.offeneGebuehren || 0) + 5 });
    }
    removeBooking(currentUser.id, id);
    updateCourse(id, { booked: Math.max(0, course.booked - 1) });
    if (gebuehr > 0) alert(`✅ Kurs storniert. 💰 5€ Stornogebühr belastet.`);
    else alert(`✅ Kurs storniert (kostenlos).`);
  };

  const handleLogout = () => setCurrentUser(null);

  const accessibleVideos = videos.filter(v => {
    if (currentTarif === 'BASIC') return false;
    if (currentTarif === 'ONLINE') return true;
    if (currentTarif === 'PLUS') return v.minTarif === 'PLUS';
    if (currentTarif === 'PREMIUM') return true;
    return false;
  });

  const buchungenDieseWoche = getBuchungenDieseWoche();

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <div>
          <h1 className="page-title" style={{margin: 0}}>Willkommen, {currentUser.vorname}! 👋</h1>
          <p className="page-subtitle" style={{margin: 0}}>Dein persönliches Dashboard</p>
        </div>
        <button onClick={handleLogout} style={{padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'}}>🚪 Abmelden</button>
      </div>

      {currentUser.status === 'GESPERRT' && (
        <div className="blocked-banner">
          <div className="blocked-icon">⛔</div>
          <div>
            <div className="blocked-title">Account gesperrt</div>
            <div className="blocked-text">{currentUser.sperr_begruendung || 'Gesperrt.'} Bis {currentUser.sperr_bis}.</div>
          </div>
        </div>
      )}

      {(currentUser.offeneGebuehren || 0) > 0 && (
        <div style={{background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{fontSize: 24}}>💰</span>
          <div>
            <div style={{fontWeight: 700, color: '#92400e'}}>Offene Gebühren: {currentUser.offeneGebuehren}€</div>
            <div style={{fontSize: 13, color: '#92400e'}}>Bitte an der Rezeption begleichen.</div>
          </div>
        </div>
      )}

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-label">Tarif</div>
          <div className="profile-value" style={{color: currentTarif === 'PREMIUM' ? '#f59e0b' : currentTarif === 'PLUS' ? '#10b981' : currentTarif === 'ONLINE' ? '#8b5cf6' : '#4f46e5'}}>{currentTarif}</div>
        </div>
        <div className="profile-card">
          <div className="profile-label">Status</div>
          <div className="profile-value">{currentUser.status}</div>
        </div>
        <div className="profile-card">
          <div className="profile-label">{currentTarif === 'BASIC' ? 'Buchungen (diese Woche)' : 'Buchungen'}</div>
          <div className="profile-value">
            {currentTarif === 'BASIC' ? <span style={{color: buchungenDieseWoche.length >= 2 ? '#dc2626' : '#0f172a'}}>{buchungenDieseWoche.length}/2</span> : bookings.length}
          </div>
          {currentTarif === 'BASIC' && (
            <div style={{fontSize: 11, color: '#64748b', marginTop: 4}}>
              {buchungenDieseWoche.length < 2 ? `Noch ${2 - buchungenDieseWoche.length} frei` : 'Limit erreicht'}
            </div>
          )}
        </div>
      </div>

      <div className="tabs-container">
        {currentTarif !== 'ONLINE' && (
          <button className={`tab-btn ${activeTab === 'kurse' ? 'active' : ''}`} onClick={() => setActiveTab('kurse')}>📅 Kurse</button>
        )}
        <button className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`} onClick={() => setActiveTab('videos')}>🎬 Videos & Streams</button>
        <button className={`tab-btn ${activeTab === 'profil' ? 'active' : ''}`} onClick={() => setActiveTab('profil')}>👤 Profil</button>
      </div>

      {activeTab === 'kurse' && currentTarif !== 'ONLINE' && (
        <>
          <h2 className="section-title"><Icons.Calendar /> Meine Buchungen</h2>
          {bookings.length === 0 ? (
            <div className="empty-state"><div className="empty-state-title">Noch keine Buchungen</div></div>
          ) : (
            <div className="booking-list" style={{marginBottom: 40}}>
              {bookings.map(id => {
                const c = courses.find(x => x.id === id);
                if (!c) return null;
                return (
                  <div key={id} className="booking-row">
                    <div className="booking-left">
                      <div className="booking-icon"><Icons.Check /></div>
                      <div>
                        <div className="member-name">{c.title}</div>
                        <div className="member-info">📅 {c.datum} • 🕐 {c.time} • 🏢 {c.room}</div>
                      </div>
                    </div>
                    <button className="btn-danger" onClick={() => handleCancel(id)}>Stornieren</button>
                  </div>
                );
              })}
            </div>
          )}

          <h2 className="section-title"><Icons.Location /> Verfügbare Kurse</h2>
          {currentUser.status === 'GESPERRT' ? (
            <div className="empty-state"><div className="empty-state-title">⛔ Du bist gesperrt</div></div>
          ) : (
            <div className="course-grid">
              {courses.filter(c => c.status !== 'Storniert').map(c => {
                const isBooked = bookings.includes(c.id);
                const isFull = c.booked >= c.max && !isBooked;
                const freeSlots = c.max - c.booked;
                let basicLimitErreicht = false;
                if (currentTarif === 'BASIC' && !isBooked) {
                  const kursDatum = new Date(c.datum);
                  const aktuelleWoche = getWeekNumber(new Date());
                  const aktuellesJahr = new Date().getFullYear();
                  const kursWoche = getWeekNumber(kursDatum);
                  const kursJahr = kursDatum.getFullYear();
                  if (kursWoche === aktuelleWoche && kursJahr === aktuellesJahr && buchungenDieseWoche.length >= 2) {
                    basicLimitErreicht = true;
                  }
                }
                return (
                  <div key={c.id} className={`course-card ${freeSlots < 4 && freeSlots > 0 ? 'urgent-card' : ''}`}>
                    <div className={`course-banner course-banner-${c.typ === 'Yoga' ? 'yoga' : c.typ === 'HIIT' ? 'hiit' : 'fit'}`}>
                      <div className={`course-badge ${freeSlots < 4 ? 'urgent-badge' : ''}`}>{freeSlots} / {c.max} frei</div>
                    </div>
                    <div className="course-content">
                      <h3 className="course-title">{c.title} <span className="course-type-badge">{c.typ}</span></h3>
                      <div className="course-detail">📅 {c.datum}</div>
                      <div className="course-detail"><Icons.Clock /> {c.time}</div>
                      <div className="course-detail"><Icons.Location /> {c.room}</div>
                      <div className="course-detail"><Icons.User /> {c.trainer}</div>
                    </div>
                    <div className="course-footer">
                      {isBooked ? <button className="btn-booked" disabled>✓ Gebucht</button> :
                       isFull ? <button className="waitlist-btn">Auf Warteliste</button> :
                       basicLimitErreicht ? <button className="btn-book" disabled style={{background: '#e2e8f0', color: '#94a3b8', cursor: 'not-allowed'}}>🔒 Wochen-Limit</button> :
                       <button className="btn-book" onClick={() => handleBook(c.id)}>Jetzt buchen</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {activeTab === 'videos' && (
        <>
          {currentTarif === 'BASIC' ? (
            <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 24, textAlign: 'center'}}>
              <div style={{fontSize: 48, marginBottom: 12}}>🔒</div>
              <h3 style={{color: '#991b1b', marginBottom: 8}}>Videos & Streams nicht verfügbar</h3>
              <p style={{color: '#b91c1c'}}>Dein Tarif <b>BASIC</b> beinhaltet keinen Zugriff auf Videos.</p>
              <p style={{color: '#64748b', fontSize: 13, marginTop: 12}}>Upgrade auf <b>Plus</b>, <b>Premium</b> oder <b>Online</b>!</p>
            </div>
          ) : (
            <>
              <h2 className="section-title">📺 Live-Streams</h2>
              <div style={{background: 'linear-gradient(135deg, #dc2626, #ef4444)', color: 'white', padding: 24, borderRadius: 16, marginBottom: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{position: 'absolute', top: 16, right: 16, background: 'white', color: '#dc2626', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6}}>
                  <span style={{width: 8, height: 8, background: '#dc2626', borderRadius: '50%', animation: 'pulse-bg 1.5s infinite'}}></span>
                  LIVE
                </div>
                <div style={{fontSize: 48, marginBottom: 8}}>🧘‍♀️</div>
                <h3 style={{fontSize: 22, fontWeight: 800, marginBottom: 4}}>Live Yoga Session</h3>
                <p style={{fontSize: 14, opacity: 0.95, marginBottom: 12}}>mit Lisa M. • Jetzt live aus dem Studio</p>
                <div style={{display: 'flex', gap: 16, fontSize: 13, opacity: 0.9}}>
                  <span>👥 234 Zuschauer</span>
                  <span>⏱️ Seit 25 Min</span>
                </div>
                <button style={{marginTop: 16, padding: '12px 24px', background: 'white', color: '#dc2626', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer'}}>▶️ Jetzt zuschauen</button>
              </div>

              <div className="course-grid" style={{marginBottom: 40}}>
                <div className="course-card">
                  <div style={{height: 100, background: 'linear-gradient(135deg, #f97316, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative'}}>
                    🔥
                    <div style={{position: 'absolute', top: 8, right: 8, background: 'white', color: '#dc2626', padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 800}}>LIVE</div>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">HIIT Full Body</h3>
                    <div className="course-detail">👨‍🏫 Max K.</div>
                    <div className="course-detail">⏱️ Seit 10 Min</div>
                  </div>
                  <div className="course-footer">
                    <button className="btn-book">▶️ Zuschauen</button>
                  </div>
                </div>
                <div className="course-card">
                  <div style={{height: 100, background: 'linear-gradient(135deg, #10b981, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative'}}>
                    🚴‍♀️
                    <div style={{position: 'absolute', top: 8, right: 8, background: '#64748b', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 800}}>18:00</div>
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">Spinning Power</h3>
                    <div className="course-detail">👨‍🏫 Max K.</div>
                    <div className="course-detail">⏰ Startet um 18:00</div>
                  </div>
                  <div className="course-footer">
                    <button className="btn-book" style={{background: '#64748b'}}>🔔 Erinnern</button>
                  </div>
                </div>
              </div>

              <h2 className="section-title">📼 Video-Archiv</h2>
              <p style={{color: '#64748b', marginBottom: 20}}>Als <b>{currentTarif}</b>-Mitglied hast du Zugriff auf {accessibleVideos.length} Videos.</p>
              <div className="course-grid">
                {accessibleVideos.map(v => (
                  <div key={v.id} className="course-card">
                    <div style={{height: 120, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64}}>{v.thumbnail}</div>
                    <div className="course-content">
                      <h3 className="course-title">{v.title}</h3>
                      <div className="course-detail">⏱️ {v.dauer}</div>
                      <div className="course-detail">🎯 {v.typ}</div>
                      <span className={`video-type-badge ${v.title.includes('Live') ? 'video-type-live' : 'video-type-ondemand'}`}>
                        {v.title.includes('Live') ? '🔴 LIVE' : '📼 On-Demand'}
                      </span>
                    </div>
                    <div className="course-footer">
                      <button className="btn-book">▶️ Abspielen</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {activeTab === 'profil' && (
        <>
          <h2 className="section-title">👤 Dein Profil</h2>
          <div className="card">
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Name</div><div style={{fontWeight: 700}}>{currentUser.vorname} {currentUser.nachname}</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Tarif</div><div style={{fontWeight: 700}}>{currentTarif}</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Status</div><div style={{fontWeight: 700}}>{currentUser.status}</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Nächste Zahlung</div><div style={{fontWeight: 700}}>{currentUser.nextPayment}</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>No-Shows</div><div style={{fontWeight: 700, color: (currentUser.noShowCount || 0) >= 2 ? '#dc2626' : '#0f172a'}}>{currentUser.noShowCount || 0} / 3</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Offene Gebühren</div><div style={{fontWeight: 700, color: (currentUser.offeneGebuehren || 0) > 0 ? '#f59e0b' : '#0f172a'}}>{(currentUser.offeneGebuehren || 0).toFixed(2)} €</div></div>
              <div><div style={{fontSize: 13, color: '#64748b'}}>Buchungen (gesamt)</div><div style={{fontWeight: 700}}>{bookings.length}</div></div>
              {currentTarif === 'BASIC' && (
                <div><div style={{fontSize: 13, color: '#64748b'}}>Buchungen diese Woche</div><div style={{fontWeight: 700}}>{buchungenDieseWoche.length}/2</div></div>
              )}
            </div>
            {(currentUser.noShowCount || 0) >= 2 && (
              <div style={{marginTop: 16, padding: 12, background: '#fef2f2', borderRadius: 8, color: '#991b1b', fontSize: 13}}>
                ⚠️ Warnung: Noch {3 - (currentUser.noShowCount || 0)} No-Show(s) bis zur automatischen Sperre (14 Tage)!
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ===== 5. GAST =====
function GuestDashboard() {
  const { addMember } = useApp();
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '', geburtsdatum: '', foto: '' });
  const [success, setSuccess] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const memberName = `${form.vorname} ${form.nachname}`;
    setNewMemberName(memberName);
    addMember({
      id: `m-${Date.now()}`, vorname: form.vorname, nachname: form.nachname, email: form.email,
      tarif: 'ONLINE', status: 'AKTIV', geburtsdatum: form.geburtsdatum, foto: form.foto,
      nextPayment: '01.07.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0,
    });
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20}}>
        <div className="register-container" style={{textAlign: 'center', maxWidth: 600}}>
          <div style={{fontSize: 80, marginBottom: 16}}>🎉</div>
          <h2 className="register-title">Willkommen bei FitZone Online!</h2>
          <p className="register-sub" style={{fontSize: 16}}><b>{newMemberName}</b>, dein Online-Account wurde erstellt.</p>
          <div style={{background: '#ecfdf5', border: '2px solid #a7f3d0', borderRadius: 12, padding: 20, marginTop: 20, textAlign: 'left'}}>
            <div style={{fontWeight: 700, color: '#065f46', marginBottom: 12}}>✅ Deine Daten:</div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14}}>
              <div><strong>Name:</strong> {newMemberName}</div>
              <div><strong>E-Mail:</strong> {form.email}</div>
              <div><strong>Tarif:</strong> <span style={{color: '#8b5cf6', fontWeight: 700}}>ONLINE</span></div>
              <div><strong>Status:</strong> AKTIV</div>
            </div>
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 24}}>
            <button className="btn-primary" style={{flex: 1}} onClick={() => { setSuccess(false); setForm({ vorname: '', nachname: '', email: '', geburtsdatum: '', foto: '' }); }}>📝 Neue Registrierung</button>
            <button className="btn-secondary" style={{flex: 1, margin: 0}} onClick={() => setSuccess(false)}>← Zurück</button>
          </div>
          <p style={{fontSize: 12, color: '#64748b', marginTop: 16}}>💡 Wechsle oben zu <b>"Mitglied"</b> um dich einzuloggen!</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth: 700, margin: '0 auto', padding: '20px 0'}}>
      <div style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: 40, borderRadius: 16, textAlign: 'center', marginBottom: 24}}>
        <div style={{fontSize: 64, marginBottom: 12}}>🏋️‍♀️</div>
        <h1 style={{fontSize: 36, fontWeight: 800, marginBottom: 8}}>FitZone Online</h1>
        <p style={{fontSize: 18, opacity: 0.9}}>Trainiere von überall - mit Video-Archiv & Live-Streams</p>
      </div>
      <div style={{background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', color: 'white', padding: 24, borderRadius: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20}}>
        <div style={{fontSize: 64}}>📺</div>
        <div style={{flex: 1}}>
          <div style={{fontSize: 24, fontWeight: 800, marginBottom: 4}}>Online-Tarif</div>
          <div style={{fontSize: 32, fontWeight: 800}}>19,99€ <span style={{fontSize: 14, opacity: 0.9}}>/Monat</span></div>
          <div style={{fontSize: 13, marginTop: 8, opacity: 0.95}}>✅ Video-Archiv • ✅ Live-Streams • ✅ Trainingspläne</div>
        </div>
      </div>
      <div className="card" style={{padding: 32}}>
        <h2 style={{fontSize: 22, fontWeight: 700, marginBottom: 8}}>📝 Jetzt registrieren</h2>
        <p style={{color: '#64748b', marginBottom: 24, fontSize: 14}}>Erstelle deinen Online-Account und starte sofort!</p>
        <form onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Vorname *</label><input className="form-input" required value={form.vorname} onChange={e => setForm({...form, vorname: e.target.value})} placeholder="z.B. Maria" /></div>
            <div className="form-group"><label className="form-label">Nachname *</label><input className="form-input" required value={form.nachname} onChange={e => setForm({...form, nachname: e.target.value})} placeholder="z.B. Schmidt" /></div>
          </div>
          <div className="form-group"><label className="form-label">📧 E-Mail *</label><input className="form-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="deine.email@beispiel.de" /></div>
          <div className="form-group"><label className="form-label">🎂 Geburtsdatum (optional)</label><input className="form-input" type="date" value={form.geburtsdatum} onChange={e => setForm({...form, geburtsdatum: e.target.value})} /></div>
          <div className="form-group">
            <label className="form-label">📸 Foto-URL (optional)</label>
            <input className="form-input" type="text" value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} placeholder="https://i.pravatar.cc/150?u=deinname" />
            <div style={{fontSize: 11, color: '#64748b', marginTop: 4}}>💡 Tipp: Nutze <a href="https://i.pravatar.cc" target="_blank" style={{color: '#4f46e5'}}>pravatar.cc</a> für Test-Fotos</div>
            {form.foto && (
              <div style={{marginTop: 10, textAlign: 'center'}}>
                <img src={form.foto} alt="Preview" style={{width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #8b5cf6'}} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            )}
          </div>
          <div style={{background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 12, padding: 16, marginTop: 16, marginBottom: 16, fontSize: 13, color: '#92400e'}}>
            💡 <strong>Hinweis:</strong> Für Studio-Tarife (Basic, Plus, Premium) besuche uns bitte persönlich im Studio.
          </div>
          <button type="submit" className="btn-primary" style={{marginTop: 8}}>🚀 Online-Account erstellen</button>
        </form>
      </div>
    </div>
  );
}

// ===== APP & ROUTING =====
const RoleSwitcher = () => {
  const { role, setRole } = useRole();
  return (
    <div className="header">
      <div className="header-title"><span>🏋️‍♀️</span> FitZone</div>
      <div className="header-select-wrapper">
        <span className="header-select-label">Demo-Rolle:</span>
        <select className="header-select" value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="MEMBER">Mitglied</option>
          <option value="ADMIN">Lisa (Admin)</option>
          <option value="RECEPTION">Jessi (Rezeption)</option>
          <option value="TRAINER">Trainer</option>
          <option value="GUEST">Gast</option>
        </select>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { role } = useRole();
  if (role === 'RECEPTION') return <ReceptionDashboard />;
  if (role === 'ADMIN') return <AdminDashboard />;
  if (role === 'TRAINER') return <TrainerDashboard />;
  if (role === 'MEMBER') return <MemberDashboard />;
  if (role === 'GUEST') return <GuestDashboard />;
  return null;
};

export default function App() {
  return (
    <RoleProvider>
      <AppProvider>
        <div className="app-container">
          <RoleSwitcher />
          <main className="main"><Dashboard /></main>
        </div>
      </AppProvider>
    </RoleProvider>
  );
}