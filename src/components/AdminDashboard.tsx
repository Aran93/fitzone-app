import { useState } from 'react';

type MemberStatusType = 'AKTIV' | 'ZAHLUNG_AUSSTEHEND' | 'GESPERRT';

interface MemberStatus {
  id: string;
  name: string;
  tarif: string;
  status: MemberStatusType;
  nextPayment: string;
}

export default function AdminDashboard() {
  const [members] = useState<MemberStatus[]>([
    { id: '1', name: 'Marie Müller', tarif: 'PREMIUM', status: 'AKTIV', nextPayment: '01.07.2026' },
    { id: '2', name: 'Tom Schmidt', tarif: 'BASIC', status: 'ZAHLUNG_AUSSTEHEND', nextPayment: '15.06.2026' },
    { id: '3', name: 'Sarah Weber', tarif: 'PLUS', status: 'GESPERRT', nextPayment: '01.05.2026' },
    { id: '4', name: 'Max Mustermann', tarif: 'PREMIUM', status: 'AKTIV', nextPayment: '01.08.2026' },
    { id: '5', name: 'Julia Becker', tarif: 'ONLINE', status: 'AKTIV', nextPayment: '01.07.2026' },
  ]);

  const getStatusColor = (status: MemberStatusType): string => {
    if (status === 'AKTIV') return 'bg-green-500';
    if (status === 'ZAHLUNG_AUSSTEHEND') return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusText = (status: MemberStatusType): string => {
    if (status === 'AKTIV') return 'Alles gut';
    if (status === 'ZAHLUNG_AUSSTEHEND') return 'Zahlung prüfen';
    return 'Gesperrt';
  };

  const counts = {
    green: members.filter((m) => m.status === 'AKTIV').length,
    yellow: members.filter((m) => m.status === 'ZAHLUNG_AUSSTEHEND').length,
    red: members.filter((m) => m.status === 'GESPERRT').length,
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin-Dashboard (Lisa)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Aktive Mitglieder</p>
          <p className="text-3xl font-bold text-green-600">{counts.green}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Zahlung ausstehend</p>
          <p className="text-3xl font-bold text-yellow-600">{counts.yellow}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border-l-4 border-red-500">
          <p className="text-gray-500 text-sm">Gesperrt</p>
          <p className="text-3xl font-bold text-red-600">{counts.red}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b bg-gray-50">
          <h3 className="font-bold text-gray-800">Mitglieder-Status</h3>
        </div>
        <div className="divide-y">
          {members.map((member: MemberStatus) => (
            <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)} shadow-sm`}></div>
                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.tarif} | Nächste Zahlung: {member.nextPayment}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {getStatusText(member.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}