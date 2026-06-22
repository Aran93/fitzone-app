import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// ===== DATEN-TYPEN =====
export interface Member {
  id: string;
  vorname: string;
  nachname: string;
  tarif: 'BASIC' | 'PLUS' | 'PREMIUM' | 'ONLINE';
  status: 'AKTIV' | 'PAUSIERT' | 'GESPERRT' | 'GEKÜNDIGT' | 'ZAHLUNG_AUSSTEHEND';
  geburtsdatum: string;
  foto: string;
  nextPayment: string;
  altvertrag: boolean;
  email?: string;
  pausen_ende?: string;
  sperr_begruendung?: string;
  sperr_bis?: string;
}

export interface Course {
  id: string;
  title: string;
  typ: string;
  datum: string;
  time: string;
  room: string;
  trainer: string;
  booked: number;
  max: number;
  status: 'Geplant' | 'Storniert';
  waitlist: string[];
  dauerStunden?: number;
}

export interface Trainer {
  id: string;
  name: string;
  qualifikationen: string[];
  stundensatz: number;
  rolle: 'Trainer' | 'Rezeption' | 'Management';
  farbe: string;
}

// ===== CONTEXT TYPE =====
interface AppContextType {
  members: Member[];
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  
  trainers: Trainer[];
  setTrainers: (trainers: Trainer[]) => void;
  updateTrainer: (id: string, updates: Partial<Trainer>) => void;
  
  currentUser: Member | null;
  setCurrentUser: (member: Member | null) => void;
  
  currentTrainer: Trainer | null;
  setCurrentTrainer: (trainer: Trainer | null) => void;
  
  // NEU: Buchungen pro Mitglied
  bookings: {[memberId: string]: string[]};
  addBooking: (memberId: string, courseId: string) => void;
  removeBooking: (memberId: string, courseId: string) => void;
  getMemberBookings: (memberId: string) => string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ===== DEFAULT DATEN =====
const defaultMembers: Member[] = [
  { id: '1', vorname: 'Marie', nachname: 'Müller', tarif: 'PREMIUM', status: 'AKTIV', geburtsdatum: '1995-06-16', foto: 'https://i.pravatar.cc/150?u=marie', nextPayment: '01.07.2026', altvertrag: false },
  { id: '2', vorname: 'Tom', nachname: 'Schmidt', tarif: 'BASIC', status: 'GESPERRT', geburtsdatum: '1990-06-24', foto: '', nextPayment: '15.06.2026', altvertrag: true, sperr_begruendung: '3x No-Show', sperr_bis: '30.06.2026' },
  { id: '3', vorname: 'Sarah', nachname: 'Weber', tarif: 'PLUS', status: 'PAUSIERT', geburtsdatum: '1992-07-05', foto: 'https://i.pravatar.cc/150?u=sarah', nextPayment: '01.05.2026', altvertrag: false, pausen_ende: '2026-08-01' },
  { id: '4', vorname: 'Julia', nachname: 'Becker', tarif: 'BASIC', status: 'AKTIV', geburtsdatum: '1998-06-20', foto: '', nextPayment: '01.08.2026', altvertrag: false },
  { id: '5', vorname: 'Max', nachname: 'Mustermann', tarif: 'PREMIUM', status: 'AKTIV', geburtsdatum: '1985-06-18', foto: '', nextPayment: '01.09.2026', altvertrag: false },
];

const defaultCourses: Course[] = [
  { id: 'c1', title: 'Morning Yoga', typ: 'Yoga', datum: '2026-06-17', time: '09:00', room: 'Großer Kursraum', trainer: 'Lisa M.', booked: 14, max: 15, status: 'Geplant', waitlist: [], dauerStunden: 1 },
  { id: 'c2', title: 'HIIT & Core', typ: 'HIIT', datum: '2026-06-17', time: '18:00', room: 'Großer Kursraum', trainer: 'Max K.', booked: 8, max: 10, status: 'Geplant', waitlist: [], dauerStunden: 1 },
  { id: 'c3', title: 'Spinning Power', typ: 'Spinning', datum: '2026-06-18', time: '18:00', room: 'Spinning-Raum', trainer: 'Max K.', booked: 5, max: 10, status: 'Geplant', waitlist: [], dauerStunden: 1 },
  { id: 'c4', title: 'Pilates Flow', typ: 'Pilates', datum: '2026-06-19', time: '10:00', room: 'Großer Kursraum', trainer: 'Lisa M.', booked: 12, max: 20, status: 'Geplant', waitlist: [], dauerStunden: 1.5 },
  { id: 'c5', title: 'Rückenfit', typ: 'Functional', datum: '2026-06-20', time: '17:00', room: 'Großer Kursraum', trainer: 'Sarah W.', booked: 6, max: 15, status: 'Geplant', waitlist: [], dauerStunden: 1 },
];

const defaultTrainers: Trainer[] = [
  { id: 't1', name: 'Lisa M.', qualifikationen: ['Yoga', 'Pilates', 'Functional'], stundensatz: 45, rolle: 'Trainer', farbe: '#4f46e5' },
  { id: 't2', name: 'Max K.', qualifikationen: ['Spinning', 'HIIT'], stundensatz: 40, rolle: 'Trainer', farbe: '#10b981' },
  { id: 't3', name: 'Sarah W.', qualifikationen: ['Yoga', 'Pilates', 'Rückenfit'], stundensatz: 40, rolle: 'Trainer', farbe: '#f59e0b' },
  { id: 't4', name: 'Jessi', qualifikationen: ['Rezeption', 'Mitgliederverwaltung'], stundensatz: 15, rolle: 'Rezeption', farbe: '#ec4899' },
];

// ===== PROVIDER =====
export function AppProvider({ children }: { children: ReactNode }) {
  const [members, setMembersState] = useState<Member[]>(() => {
    const saved = localStorage.getItem('fitzone_members');
    return saved ? JSON.parse(saved) : defaultMembers;
  });

  const [courses, setCoursesState] = useState<Course[]>(() => {
    const saved = localStorage.getItem('fitzone_courses');
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  const [trainers, setTrainersState] = useState<Trainer[]>(() => {
    const saved = localStorage.getItem('fitzone_trainers');
    return saved ? JSON.parse(saved) : defaultTrainers;
  });

  // NEU: Buchungen pro Mitglied
  const [bookings, setBookingsState] = useState<{[memberId: string]: string[]}>(() => {
    const saved = localStorage.getItem('fitzone_bookings');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>(null);

  // Speichern in localStorage
  useEffect(() => { localStorage.setItem('fitzone_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('fitzone_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('fitzone_trainers', JSON.stringify(trainers)); }, [trainers]);
  useEffect(() => { localStorage.setItem('fitzone_bookings', JSON.stringify(bookings)); }, [bookings]);

  // Member-Funktionen
  const setMembers = (newMembers: Member[]) => setMembersState(newMembers);
  const addMember = (member: Member) => setMembersState(prev => [...prev, member]);
  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembersState(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };
  const deleteMember = (id: string) => setMembersState(prev => prev.filter(m => m.id !== id));

  // Course-Funktionen
  const setCourses = (newCourses: Course[]) => setCoursesState(newCourses);
  const addCourse = (course: Course) => setCoursesState(prev => [...prev, course]);
  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCoursesState(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  const deleteCourse = (id: string) => setCoursesState(prev => prev.filter(c => c.id !== id));

  // Trainer-Funktionen
  const setTrainers = (newTrainers: Trainer[]) => setTrainersState(newTrainers);
  const updateTrainer = (id: string, updates: Partial<Trainer>) => {
    setTrainersState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  // NEU: Booking-Funktionen
  const addBooking = (memberId: string, courseId: string) => {
    setBookingsState(prev => {
      const memberBookings = prev[memberId] || [];
      if (memberBookings.includes(courseId)) return prev; // Schon gebucht
      return { ...prev, [memberId]: [...memberBookings, courseId] };
    });
  };

  const removeBooking = (memberId: string, courseId: string) => {
    setBookingsState(prev => {
      const memberBookings = prev[memberId] || [];
      return { ...prev, [memberId]: memberBookings.filter(id => id !== courseId) };
    });
  };

  const getMemberBookings = (memberId: string) => {
    return bookings[memberId] || [];
  };

  return (
    <AppContext.Provider value={{
      members, setMembers, addMember, updateMember, deleteMember,
      courses, setCourses, addCourse, updateCourse, deleteCourse,
      trainers, setTrainers, updateTrainer,
      currentUser, setCurrentUser,
      currentTrainer, setCurrentTrainer,
      bookings, addBooking, removeBooking, getMemberBookings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
