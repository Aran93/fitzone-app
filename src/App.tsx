import { RoleProvider, useRole } from './context/RoleContext';
import { AppProvider, useApp } from './context/AppContext';
import { useState } from 'react';
import './App.css';

// ===== ICONS =====
const Icons = {
  Calendar: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  Location: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>,
  User: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
  Check: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>,
  Clock: () => <svg style={{width: 20, height: 20}} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
};

// ===== LOGIN SCREEN FÜR MITGLIEDER =====
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
            <button
              key={member.id}
              onClick={() => setCurrentUser(member)}
              style={{display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: '2px solid #e2e8f0', borderRadius: 12, background: 'white', cursor: 'pointer', textAlign: 'left'}}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#4f46e5'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
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

// ===== 1. REZEPTION (Jessi) MIT CHECK-IN STATUS =====
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
    addMember({ id: `m-${Date.now()}`, ...form, status: 'AKTIV', nextPayment: '01.07.2026', altvertrag: false });
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

  const startEdit = (member: any) => {
    setEditMemberId(member.id);
    setEditForm({ ...member });
  };

  const saveEdit = () => {
    updateMember(editMemberId!, editForm);
    setEditMemberId(null);
    alert('✅ Mitglied aktualisiert!');
  };

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

      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
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
                <div key={m.id} className="member-row" style={{
                  background: isCheckedIn ? '#ecfdf5' : isBirthday ? '#fef3c7' : 'white',
                  border: isBirthday ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                  position: 'relative'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: 1}}>
                    <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(m.vorname, m.nachname)}</div>
                    <div>
                      <div className="member-name">
                        {m.vorname} {m.nachname}
                        {isBirthday && <span style={{marginLeft: 8}}>🎂</span>}
                      </div>
                      <div className="member-info">{m.tarif}</div>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                    {isCheckedIn && (
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700
                      }}>✓ Eingecheckt</span>
                    )}
                    <button className="btn-edit-small" onClick={() => startEdit(m)}>Bearbeiten</button>
                    <button 
                      className={isCheckedIn ? 'btn-booked' : 'btn-success'} 
                      onClick={() => handleCheckIn(m)}
                      disabled={isCheckedIn}
                      style={isCheckedIn ? {opacity: 0.6, cursor: 'not-allowed'} : {}}
                    >
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
            <div className="modal-header">
              <h3 className="modal-title">Bearbeiten</h3>
              <button className="btn-close" onClick={() => setEditMemberId(null)}>&times;</button>
            </div>
            <div className="form-group">
              <label className="form-label">Vorname</label>
              <input className="form-input" value={editForm.vorname || ''} onChange={e => setEditForm({...editForm, vorname: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Nachname</label>
              <input className="form-input" value={editForm.nachname || ''} onChange={e => setEditForm({...editForm, nachname: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Tarif</label>
              <select className="form-input" value={editForm.tarif || ''} onChange={e => setEditForm({...editForm, tarif: e.target.value})}>
                <option value="BASIC">Basic</option>
                <option value="PLUS">Plus</option>
                <option value="PREMIUM">Premium</option>
                <option value="ONLINE">Online</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Geburtsdatum</label>
              <input className="form-input" type="date" value={editForm.geburtsdatum || ''} onChange={e => setEditForm({...editForm, geburtsdatum: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Foto-URL</label>
              <input 
                className="form-input" 
                type="text"
                placeholder="https://..."
                value={editForm.foto || ''} 
                onChange={e => setEditForm({...editForm, foto: e.target.value})} 
              />
            </div>
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

// ===== 2. ADMIN (Lisa) MIT ALLEN FEATURES =====
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

  const deleteMember = (id: string, name: string) => {
    if (confirm(`⚠️ "${name}" wirklich löschen? Das kann nicht rückgängig gemacht werden!`)) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const confirmBlock = () => {
    if (!blockModal) return;
    const date = new Date();
    date.setDate(date.getDate() + blockDuration);
    updateMember(blockModal.memberId, {
      status: 'GESPERRT',
      sperr_begruendung: blockReason || 'Manuell gesperrt',
      sperr_bis: date.toLocaleDateString('de-DE')
    });
    setBlockModal(null);
  };

  const handleUnblock = (id: string) => {
    updateMember(id, { status: 'AKTIV', sperr_begruendung: undefined, sperr_bis: undefined });
  };

  const handleScheduleCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    const conflict = courses.find(c => c.room === newCourseForm.room && c.datum === newCourseForm.datum && c.time === newCourseForm.time && c.status !== 'Storniert');
    if (conflict) {
      alert(`⚠️ Mamma Mia Schutz: ${newCourseForm.room} ist am ${formatDate(newCourseForm.datum)} um ${newCourseForm.time} bereits belegt!`);
      return;
    }
    
    if (newCourseForm.room === 'Spinning-Raum' && newCourseForm.typ !== 'Spinning') {
      alert('⚠️ Der Spinning-Raum ist nur für Spinning-Kurse!');
      return;
    }
    
    const trainer = trainers.find(t => t.name === newCourseForm.trainer);
    if (trainer && !trainer.qualifikationen.includes(newCourseForm.typ)) {
      alert(`⚠️ Qualifikationsfehler!\n\n${newCourseForm.trainer} ist NICHT für "${newCourseForm.typ}" qualifiziert.\n\nQualifikationen von ${newCourseForm.trainer}:\n• ${trainer.qualifikationen.join('\n• ')}`);
      return;
    }
    
    addCourse({
      id: `c-${Date.now()}`,
      title: newCourseForm.title,
      typ: newCourseForm.typ,
      datum: newCourseForm.datum,
      time: newCourseForm.time,
      room: newCourseForm.room,
      trainer: newCourseForm.trainer,
      booked: 0,
      max: newCourseForm.typ === 'Yoga' ? 20 : 15,
      status: 'Geplant',
      waitlist: [],
      dauerStunden: newCourseForm.dauer
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

  const birthdayMembers = members
    .filter(m => m.geburtsdatum)
    .map(m => {
      const bday = new Date(m.geburtsdatum);
      const today = new Date();
      const thisYearBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
      if (thisYearBday < today) {
        thisYearBday.setFullYear(today.getFullYear() + 1);
      }
      return { ...m, nextBday: thisYearBday };
    })
    .sort((a, b) => a.nextBday.getTime() - b.nextBday.getTime());

  const getDayOfWeek = (dateStr: string) => {
    const days = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const d = new Date(dateStr);
    return days[d.getDay()];
  };

  const getTrainerCourses = (trainerName: string) => {
    return courses.filter(c => 
      c.trainer === trainerName && 
      c.status !== 'Storniert' &&
      (selectedDay === 'Alle' || getDayOfWeek(c.datum) === selectedDay)
    );
  };

  const getTrainerHours = (trainerName: string) => {
    const trainerCourses = getTrainerCourses(trainerName);
    const hours = trainerCourses.reduce((sum, c) => sum + (Number(c.dauerStunden) || 1), 0);
    return isNaN(hours) ? 0 : hours;
  };

  const getTrainerEarnings = (trainerName: string) => {
    const trainer = trainers.find(t => t.name === trainerName);
    if (!trainer) return 0;
    const stundensatz = Number(trainer.stundensatz) || 0;
    const earnings = getTrainerHours(trainerName) * stundensatz;
    return isNaN(earnings) ? 0 : earnings;
  };

  const openTrainerEdit = (trainer: any) => {
    setEditTrainerId(trainer.id);
    setEditTrainerForm({ ...trainer });
  };

  const saveTrainerEdit = () => {
    updateTrainer(editTrainerId!, editTrainerForm);
    setEditTrainerId(null);
  };

  return (
    <div>
      <h1 className="page-title">Admin-Dashboard 👑</h1>
      <p className="page-subtitle">Willkommen, Lisa!</p>

      <div className="grid-3">
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'AKTIV' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'AKTIV' ? null : 'AKTIV')}>
          <div className="ampel-header"><div className="ampel-dot dot-green"></div><span className="ampel-label">Aktive</span></div>
          <p className="ampel-count text-green">{counts.green}</p>
          <p style={{fontSize: 11, color: '#64748b', marginTop: 4}}>👆 Klicken</p>
        </div>
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'PAUSIERT_ZAHLUNG' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'PAUSIERT_ZAHLUNG' ? null : 'PAUSIERT_ZAHLUNG')}>
          <div className="ampel-header"><div className="ampel-dot dot-amber"></div><span className="ampel-label">Pausiert/Zahlung</span></div>
          <p className="ampel-count text-amber">{counts.yellow}</p>
          <p style={{fontSize: 11, color: '#64748b', marginTop: 4}}>👆 Klicken</p>
        </div>
        <div className={`ampel-card ampel-card-clickable ${selectedStatus === 'GESPERRT_GEKUENDIGT' ? 'ampel-card-selected' : ''}`} onClick={() => setSelectedStatus(selectedStatus === 'GESPERRT_GEKUENDIGT' ? null : 'GESPERRT_GEKUENDIGT')}>
          <div className="ampel-header"><div className="ampel-dot dot-red"></div><span className="ampel-label">Gesperrt/Gekündigt</span></div>
          <p className="ampel-count text-red">{counts.red}</p>
          <p style={{fontSize: 11, color: '#64748b', marginTop: 4}}>👆 Klicken</p>
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
          <div className="admin-section">
            <h2 className="admin-section-title">🎂 Geburtstage</h2>
            {birthdayMembers.length === 0 ? (
              <p style={{color: '#64748b'}}>Keine Geburtstage gespeichert.</p>
            ) : (
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
                  <div key={m.id} className="member-item">
                    <div className="member-item-info">
                      <div className="member-avatar">{m.foto ? <img src={m.foto} alt="" /> : getInitials(`${m.vorname} ${m.nachname}`)}</div>
                      <div>
                        <div className="member-name">{m.vorname} {m.nachname} {m.altvertrag && <span style={{fontSize: 11, color: '#64748b'}}>(Altvertrag)</span>}</div>
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
                      <button className="btn-delete" onClick={() => deleteMember(m.id, `${m.vorname} ${m.nachname}`)}>🗑️</button>
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
              {courses.map(c => (
                <div key={c.id} className="member-item">
                  <div>
                    <div className="member-name">{c.title} <span className="course-type-badge">{c.typ}</span></div>
                    <div className="member-info">📅 {formatDate(c.datum)} {c.time} • 🏢 {c.room} • 👨‍🏫 {c.trainer}</div>
                    <div className="member-info">{c.booked}/{c.max} belegt • ⏱️ {c.dauerStunden || 1}h</div>
                  </div>
                  <div style={{display: 'flex', gap: 8}}>
                    {c.status !== 'Storniert' && (
                      <button className="btn-danger" onClick={() => { if (confirm('Kurs absagen?')) updateCourse(c.id, { status: 'Storniert' }); }}>Absagen</button>
                    )}
                    <button className="btn-delete" onClick={() => { if (confirm(`⚠️ Kurs "${c.title}" WIRKLICH löschen?`)) deleteCourse(c.id); }}>🗑️</button>
                    <span className={`badge ${c.status === 'Storniert' ? 'badge-red' : 'badge-green'}`}>{c.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === 'mitarbeiter' && (
        <div className="admin-section">
          <h2 className="admin-section-title">💼 Mitarbeiter & Finanzen</h2>
          
          <div className="day-filter">
            {days.map(d => (
              <button 
                key={d} 
                className={`day-btn ${selectedDay === d ? 'active' : ''}`} 
                onClick={() => setSelectedDay(d)}
              >
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
                  
                  <div className="finance-row">
                    <span>💰 Stundensatz:</span>
                    <strong>{t.stundensatz} €</strong>
                  </div>
                  <div className="finance-row">
                    <span>🎯 Qualifikationen:</span>
                    <span style={{fontSize: 11}}>{t.qualifikationen.join(', ')}</span>
                  </div>
                  <div className="finance-row">
                    <span>📚 Kurse {selectedDay === 'Alle' ? '(Monat)' : `(${selectedDay})`}:</span>
                    <strong>{trainerCourses.length}</strong>
                  </div>
                  <div className="finance-row">
                    <span>⏰ Stunden {selectedDay === 'Alle' ? '(Monat)' : `(${selectedDay})`}:</span>
                    <strong>{hours} h</strong>
                  </div>
                  
                  {trainerCourses.length > 0 && (
                    <div className="course-assignment">
                      <div style={{fontWeight: 700, marginBottom: 6, fontSize: 12}}>📋 Einsätze:</div>
                      {trainerCourses.map(c => (
                        <div key={c.id} className="course-assignment-item">
                          <span>📅 {formatDate(c.datum)} {c.time}</span>
                          <strong>{c.title}</strong>
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
            <div className="month-summary-label">
              {selectedDay === 'Alle' ? '💼 Gesamte Personalkosten (Monat)' : `💼 Personalkosten (${selectedDay})`}
            </div>
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
          <h2 className="admin-section-title">👨‍🏫 Trainer & Qualifikationen</h2>
          <div className="grid-3">
            {trainers.map(t => (
              <div key={t.id} className="card" style={{padding: 20}}>
                <div style={{fontWeight: 700, fontSize: 16, marginBottom: 8}}>{t.name}</div>
                <div style={{fontSize: 12, color: '#64748b', marginBottom: 8}}>Qualifikationen:</div>
                <div>{t.qualifikationen.map(q => <span key={q} className="qualification-badge">{q}</span>)}</div>
              </div>
            ))}
          </div>
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
            <div className="form-group"><label className="form-label">💰 Nächste Zahlung</label><input className="form-input" value={editForm.nextPayment || ''} onChange={e => setEditForm({...editForm, nextPayment: e.target.value})} /></div>
            <div className="form-group" style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <input type="checkbox" checked={editForm.altvertrag || false} onChange={e => setEditForm({...editForm, altvertrag: e.target.checked})} />
              <label className="form-label" style={{margin: 0}}>Altvertrag (monatlich kündbar)</label>
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
            <div className="modal-header">
              <h3 className="modal-title">⚙️ Mitarbeiter bearbeiten</h3>
              <button className="btn-close" onClick={() => setEditTrainerId(null)}>&times;</button>
            </div>
            
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                className="form-input" 
                value={editTrainerForm.name || ''} 
                onChange={e => setEditTrainerForm({...editTrainerForm, name: e.target.value})} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">💰 Stundensatz (€)</label>
              <input 
                className="form-input" 
                type="number"
                min="0"
                step="0.5"
                value={editTrainerForm.stundensatz || 0} 
                onChange={e => setEditTrainerForm({...editTrainerForm, stundensatz: parseFloat(e.target.value)})} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">🎭 Rolle</label>
              <select 
                className="form-input" 
                value={editTrainerForm.rolle || 'Trainer'} 
                onChange={e => setEditTrainerForm({...editTrainerForm, rolle: e.target.value})}
              >
                <option value="Trainer">Trainer</option>
                <option value="Rezeption">Rezeption</option>
                <option value="Management">Management</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">🎯 Qualifikationen (Komma-getrennt)</label>
              <input 
                className="form-input" 
                value={(editTrainerForm.qualifikationen || []).join(', ')}
                onChange={e => setEditTrainerForm({
                  ...editTrainerForm, 
                  qualifikationen: e.target.value.split(',').map((q: string) => q.trim()).filter((q: string) => q)
                })} 
                placeholder="z.B. Yoga, Pilates, HIIT"
              />
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
  const { courses } = useApp();
  const trainerName = 'Lisa M.';
  const trainerQualis = ['Yoga', 'Pilates', 'Functional'];
  const myCourses = courses.filter(c => c.trainer === trainerName && c.status !== 'Storniert');

  return (
    <div>
      <h1 className="page-title">Trainer-Bereich 💪</h1>
      <p className="page-subtitle">Willkommen, {trainerName}!</p>

      <div className="admin-panel" style={{marginBottom: 24}}>
        <h3 className="admin-panel-title">🎯 Deine Qualifikationen</h3>
        <div>{trainerQualis.map(q => <span key={q} className="qualification-badge">{q}</span>)}</div>
      </div>

      {myCourses.length === 0 ? (
        <div className="empty-state"><div className="empty-state-title">Keine Kurse</div></div>
      ) : (
        myCourses.map(c => (
          <div key={c.id} className="members-table" style={{marginBottom: 20}}>
            <div className="course-header">
              <div>
                <h3 style={{fontSize: 24, marginBottom: 8}}>{c.title} <span className="course-type-badge">{c.typ}</span></h3>
                <div className="course-meta">
                  <span>📅 {c.datum}</span>
                  <span><Icons.Clock /> {c.time}</span>
                  <span><Icons.Location /> {c.room}</span>
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <div style={{fontWeight: 600}}>{c.booked}/{c.max} gebucht</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ===== 4. MITGLIED (Maria) MIT LOGIN =====
// ===== 4. MITGLIED (Maria) MIT LOGIN =====
function MemberDashboard() {
  const { currentUser, setCurrentUser, courses, updateCourse, addBooking, removeBooking, getMemberBookings } = useApp();
  
  if (!currentUser) {
    return <LoginScreen />;
  }

  // NEU: Buchungen aus dem Context laden
  const bookings = getMemberBookings(currentUser.id);
  const currentTarif = currentUser.tarif as 'BASIC' | 'PLUS' | 'PREMIUM' | 'ONLINE';

  const handleBook = (id: string) => {
    if (currentTarif === 'BASIC' && bookings.length >= 2) {
      alert('⚠️ Basic-Limit: Maximal 2 Kurse pro Woche!');
      return;
    }
    // NEU: Buchung im Context speichern
    addBooking(currentUser.id, id);
    updateCourse(id, { booked: (courses.find(c => c.id === id)?.booked || 0) + 1 });
  };

  const handleCancel = (id: string) => {
    // NEU: Buchung aus Context entfernen
    removeBooking(currentUser.id, id);
    updateCourse(id, { booked: Math.max(0, (courses.find(c => c.id === id)?.booked || 0) - 1) });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <div>
          <h1 className="page-title" style={{margin: 0}}>Willkommen, {currentUser.vorname}! 👋</h1>
          <p className="page-subtitle" style={{margin: 0}}>Dein persönliches Dashboard</p>
        </div>
        <button onClick={handleLogout} style={{padding: '8px 16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'}}>🚪 Abmelden</button>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-label">Tarif</div>
          <div className="profile-value" style={{color: currentTarif === 'PREMIUM' ? '#f59e0b' : currentTarif === 'PLUS' ? '#10b981' : '#4f46e5'}}>{currentTarif}</div>
        </div>
        <div className="profile-card">
          <div className="profile-label">Status</div>
          <div className="profile-value">{currentUser.status}</div>
        </div>
        <div className="profile-card">
          <div className="profile-label">Buchungen</div>
          <div className="profile-value">{bookings.length}</div>
        </div>
      </div>

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
      <div className="course-grid">
        {courses.filter(c => c.status !== 'Storniert').map(c => {
          const isBooked = bookings.includes(c.id);
          const isFull = c.booked >= c.max && !isBooked;
          const freeSlots = c.max - c.booked;
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
                 <button className="btn-book" onClick={() => handleBook(c.id)}>Jetzt buchen</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== 5. GAST =====
function GuestDashboard() {
  const { addMember } = useApp();
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '' });
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
      id: `m-${Date.now()}`,
      vorname: form.vorname,
      nachname: form.nachname,
      tarif: 'ONLINE',
      status: 'AKTIV',
      geburtsdatum: '',
      foto: '',
      nextPayment: '01.07.2026',
      altvertrag: false,
    });
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="register-container" style={{textAlign: 'center'}}>
        <div style={{fontSize: 64}}>🎉</div>
        <h2 className="register-title">Willkommen bei FitZone Online!</h2>
        <p className="register-sub">Dein Account wurde erstellt.</p>
        <button className="btn-primary" style={{marginTop: 24}} onClick={() => setSuccess(false)}>Zurück</button>
      </div>
    );
  }

  return (
    <div className="register-container">
      <h2 className="register-title">FitZone Online</h2>
      <p className="register-sub">Registriere dich für unseren Online-Tarif.</p>
      <form onSubmit={handleRegister}>
        <div className="form-group"><label className="form-label">Vorname</label><input className="form-input" required value={form.vorname} onChange={e => setForm({...form, vorname: e.target.value})} /></div>
        <div className="form-group"><label className="form-label">Nachname</label><input className="form-input" required value={form.nachname} onChange={e => setForm({...form, nachname: e.target.value})} /></div>
        <div className="form-group"><label className="form-label">E-Mail</label><input className="form-input" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <button type="submit" className="btn-primary">Registrieren</button>
      </form>
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