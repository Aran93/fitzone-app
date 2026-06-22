import { useState } from 'react';

// Schöne, leichte SVG-Icons (keine Installation nötig)
const Icons = {
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  Location: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
};

export default function MemberDashboard() {
  const courses = [
    { id: 'c1', title: 'Morning Yoga Flow', time: 'Mo, 09:00 - 10:00', room: 'Großer Kursraum', trainer: 'Lisa M.', free: 12, total: 15, gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
    { id: 'c2', title: 'HIIT & Core Power', time: 'Mo, 18:00 - 19:00', room: 'Spinning Raum', trainer: 'Max K.', free: 3, total: 10, gradient: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 'c3', title: 'Rückenfit & Mobility', time: 'Di, 17:00 - 18:00', room: 'Freihantelbereich', trainer: 'Sarah W.', free: 8, total: 8, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  ];

  const [bookings, setBookings] = useState<string[]>([]);

  const handleBook = (courseId: string) => {
    setBookings([...bookings, courseId]);
  };

  const handleCancel = (courseId: string) => {
    setBookings(bookings.filter(id => id !== courseId));
  };

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-10 bg-slate-50 min-h-screen">
      {/* Header Bereich */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Willkommen zurück, Maria! 👋</h1>
        <p className="text-slate-500 text-lg">Hier ist dein persönlicher Überblick über deine Kurse und das aktuelle Angebot.</p>
      </div>

      {/* Meine Buchungen */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Icons.Calendar /></span>
          Meine gebuchten Kurse
        </h2>
        
        {bookings.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center">
            <p className="text-slate-500 text-lg font-medium">Du hast noch keine Kurse gebucht.</p>
            <p className="text-slate-400 text-sm mt-1">Entdecke unten unsere aktuellen Angebote!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((bookingId) => {
              const course = courses.find(c => c.id === bookingId);
              if (!course) return null;
              return (
                <div key={bookingId} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <Icons.Check />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{course.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5"><Icons.Calendar /> {course.time}</span>
                        <span className="flex items-center gap-1.5"><Icons.Location /> {course.room}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCancel(course.id)}
                    className="shrink-0 px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
                  >
                    Stornieren
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Verfügbare Kurse */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <span className="p-2 bg-emerald-100 text-emerald-600 rounded-xl"><Icons.User /></span>
          Verfügbare Kurse buchen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isBooked = bookings.includes(course.id);
            const isFull = course.free === 0 && !isBooked;

            return (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
                {/* Farbiger Header der Karte */}
                <div className={`h-24 ${course.gradient} relative`}>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {course.free} / {course.total} frei
                  </div>
                </div>
                
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{course.title}</h3>
                  <div className="space-y-2.5 text-sm text-slate-600 mb-6">
                    <p className="flex items-center gap-2.5"><Icons.Calendar /> {course.time}</p>
                    <p className="flex items-center gap-2.5"><Icons.Location /> {course.room}</p>
                    <p className="flex items-center gap-2.5"><Icons.User /> Trainer: {course.trainer}</p>
                  </div>
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  {isBooked ? (
                    <button disabled className="w-full py-3 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center justify-center gap-2 cursor-default">
                      <Icons.Check /> Gebucht
                    </button>
                  ) : isFull ? (
                    <button disabled className="w-full py-3 rounded-xl font-bold text-slate-400 bg-slate-100 cursor-not-allowed">
                      Ausgebucht
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBook(course.id)}
                      className="w-full py-3 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                    >
                      Jetzt Platz sichern
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}