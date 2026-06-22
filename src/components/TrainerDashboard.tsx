import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  present: boolean;
}

interface Course {
  id: string;
  time: string;
  title: string;
  room: string;
  members: Member[];
}

const TrainerDashboard = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'c1',
      time: '09:00 - 10:00',
      title: 'Morning Yoga',
      room: 'Großer Kursraum',
      members: [
        { id: 'm1', name: 'Marie Müller', present: false },
        { id: 'm2', name: 'Anna Schmidt', present: false },
        { id: 'm3', name: 'Max Mustermann', present: true },
      ],
    },
    {
      id: 'c2',
      time: '18:00 - 19:00',
      title: 'HIIT & Core',
      room: 'Spinning Raum',
      members: [
        { id: 'm4', name: 'Tom Schmidt', present: false },
        { id: 'm5', name: 'Julia Becker', present: false },
      ],
    },
  ]);

  const toggleAttendance = (courseId: string, memberId: string) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          return {
            ...course,
            members: course.members.map(member =>
              member.id === memberId ? { ...member, present: !member.present } : member
            ),
          };
        }
        return course;
      })
    );
  };

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trainer-Bereich (Wochenplan & Anwesenheit)</h2>
      
      <div className="space-y-6">
        {courses.map((course) => {
          const presentCount = course.members.filter(m => m.present).length;
          const total = course.members.length;
          const percentage = total > 0 ? (presentCount / total) * 100 : 0;

          return (
            <div key={course.id} className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.time} | {course.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">{presentCount} / {total} anwesend</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Teilnehmerliste (Klick zum Abhaken)</h4>
                <div className="space-y-2">
                  {course.members.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => toggleAttendance(course.id, member.id)}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition ${
                        member.present 
                          ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          member.present ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'
                        }`}>
                          {member.present && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium ${member.present ? 'text-emerald-800' : 'text-gray-700'}`}>
                          {member.name}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        member.present ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {member.present ? 'Anwesend' : 'Fehlt'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

// WICHTIG: Der Export steht ganz am Ende!
export default TrainerDashboard;
