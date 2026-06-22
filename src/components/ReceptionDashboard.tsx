import { useState } from 'react';

interface Member {
  id: string;
  vorname: string;
  nachname: string;
  tarif: 'BASIC' | 'PLUS' | 'PREMIUM' | 'ONLINE';
  geburtsdatum: string; 
}

// Explizites Formular-Interface, damit TypeScript ruhig ist
interface MemberForm {
  vorname: string;
  nachname: string;
  tarif: 'BASIC' | 'PLUS' | 'PREMIUM' | 'ONLINE';
  geburtsdatum: string;
}

export default function ReceptionDashboard() {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', vorname: 'Marie', nachname: 'Müller', tarif: 'PREMIUM', geburtsdatum: '1995-06-02' }, // Heute Geburtstag!
    { id: '2', vorname: 'Anna', nachname: 'Schmidt', tarif: 'BASIC', geburtsdatum: '1990-11-15' },
  ]);
  
  const [showBirthdayPopup, setShowBirthdayPopup] = useState(false);
  const [birthdayName, setBirthdayName] = useState('');

  const [form, setForm] = useState<MemberForm>({ vorname: '', nachname: '', tarif: 'BASIC', geburtsdatum: '' });

  // 1. Mitglied anlegen
  const handleCreateMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMember: Member = {
      id: `member-${Date.now()}`, 
      vorname: form.vorname,
      nachname: form.nachname,
      tarif: form.tarif,
      geburtsdatum: form.geburtsdatum,
    };
    setMembers([...members, newMember]);
    setForm({ vorname: '', nachname: '', tarif: 'BASIC', geburtsdatum: '' });
    alert(`✅ ${newMember.vorname} ${newMember.nachname} wurde angelegt!`);
  };

  // 2. Check-in & Geburtstags-Trigger
  const handleCheckIn = (member: Member) => {
    const today = new Date();
    const bDate = new Date(member.geburtsdatum);
    
    if (!isNaN(bDate.getTime()) && bDate.getDate() === today.getDate() && bDate.getMonth() === today.getMonth()) {
      setBirthdayName(member.vorname);
      setShowBirthdayPopup(true);
      setTimeout(() => setShowBirthdayPopup(false), 4000);
    } else {
      alert(`✅ ${member.vorname} wurde erfolgreich eingecheckt.`);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Linke Spalte: Mitglied anlegen */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4"> Neues Mitglied anlegen</h3>
          <form onSubmit={handleCreateMember} className="space-y-3">
            <input
              type="text"
              placeholder="Vorname"
              required
              value={form.vorname}
              onChange={(e) => setForm({ ...form, vorname: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Nachname"
              required
              value={form.nachname}
              onChange={(e) => setForm({ ...form, nachname: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={form.tarif}
              onChange={(e) => setForm({ ...form, tarif: e.target.value as any })}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="BASIC">Basic</option>
              <option value="PLUS">Plus</option>
              <option value="PREMIUM">Premium</option>
              <option value="ONLINE">Online</option>
            </select>
            <input
              type="date"
              value={form.geburtsdatum}
              onChange={(e) => setForm({ ...form, geburtsdatum: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Mitglied speichern
            </button>
          </form>
        </div>

        {/* Rechte Spalte: Check-in Liste */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4"> Schnell-Check-in</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="font-semibold text-gray-800">{member.vorname} {member.nachname}</p>
                  <p className="text-xs text-gray-500">{member.tarif} | Geb: {member.geburtsdatum}</p>
                </div>
                <button
                  onClick={() => handleCheckIn(member)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
                >
                  Einchecken
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*  Geburtstags-Popup */}
      {showBirthdayPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm mx-4">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Alles Gute!</h2>
            <p className="text-lg text-gray-700">
              Heute hat <span className="font-bold text-gray-900">{birthdayName}</span> Geburtstag!
            </p>
            <p className="text-sm text-gray-500 mt-4">Vergiss nicht zu gratulieren!</p>
          </div>
        </div>
      )}
    </main>
  );
}
