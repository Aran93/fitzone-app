import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
  noShowCount?: number;
  offeneGebuehren?: number;
}

export interface WaitlistEntry {
  memberId: string;
  timestamp: number;
  status: 'waiting' | 'nachgerueckt' | 'bestaetigt' | 'abgelehnt' | 'abgelaufen';
  nachrueckZeit?: number;
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
  status: 'Geplant' | 'Storniert' | 'Abgeschlossen';
  waitlist: WaitlistEntry[];
  dauerStunden?: number;
  attendance?: {[memberId: string]: 'DA' | 'NO_SHOW' | 'OFFEN'};
}

export interface Trainer {
  id: string;
  name: string;
  qualifikationen: string[];
  stundensatz: number;
  rolle: 'Trainer' | 'Rezeption' | 'Management';
  farbe: string;
}

export interface Video {
  id: string;
  title: string;
  typ: 'Yoga' | 'HIIT' | 'Pilates' | 'Spinning' | 'Functional';
  dauer: string;
  thumbnail: string;
  minTarif: 'PLUS' | 'PREMIUM';
}

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
  videos: Video[];
  currentUser: Member | null;
  setCurrentUser: (member: Member | null) => void;
  currentTrainer: Trainer | null;
  setCurrentTrainer: (trainer: Trainer | null) => void;
  bookings: {[memberId: string]: string[]};
  addBooking: (memberId: string, courseId: string) => void;
  removeBooking: (memberId: string, courseId: string) => void;
  getMemberBookings: (memberId: string) => string[];
  joinWaitlist: (memberId: string, courseId: string) => {success: boolean, position?: number, message: string};
  leaveWaitlist: (memberId: string, courseId: string) => void;
  getWaitlistPosition: (memberId: string, courseId: string) => number;
  promoteFromWaitlist: (courseId: string) => {success: boolean, member?: Member, message: string};
  confirmNachrueck: (memberId: string, courseId: string) => void;
  declineNachrueck: (memberId: string, courseId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultMembers: Member[] = [
  { id: '1', vorname: 'Marie', nachname: 'Müller', tarif: 'PREMIUM', status: 'AKTIV', geburtsdatum: '1995-06-16', foto: 'https://i.pravatar.cc/150?u=marie', nextPayment: '01.07.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0 },
  { id: '2', vorname: 'Tom', nachname: 'Schmidt', tarif: 'BASIC', status: 'AKTIV', geburtsdatum: '1990-06-24', foto: '', nextPayment: '15.06.2026', altvertrag: true, noShowCount: 2, offeneGebuehren: 0 },
  { id: '3', vorname: 'Sarah', nachname: 'Weber', tarif: 'PLUS', status: 'PAUSIERT', geburtsdatum: '1992-07-05', foto: 'https://i.pravatar.cc/150?u=sarah', nextPayment: '01.05.2026', altvertrag: false, pausen_ende: '2026-08-01', noShowCount: 0, offeneGebuehren: 0 },
  { id: '4', vorname: 'Julia', nachname: 'Becker', tarif: 'BASIC', status: 'AKTIV', geburtsdatum: '1998-06-20', foto: '', nextPayment: '01.08.2026', altvertrag: false, noShowCount: 1, offeneGebuehren: 5 },
  { id: '5', vorname: 'Max', nachname: 'Mustermann', tarif: 'PREMIUM', status: 'AKTIV', geburtsdatum: '1985-06-18', foto: '', nextPayment: '01.09.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0 },
  { id: '6', vorname: 'Anna', nachname: 'Fischer', tarif: 'PLUS', status: 'AKTIV', geburtsdatum: '1993-08-12', foto: 'https://i.pravatar.cc/150?u=anna', nextPayment: '01.07.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0 },
  { id: '7', vorname: 'Laura', nachname: 'Schneider', tarif: 'BASIC', status: 'AKTIV', geburtsdatum: '1997-04-22', foto: '', nextPayment: '01.07.2026', altvertrag: false, noShowCount: 0, offeneGebuehren: 0 },
];

const defaultCourses: Course[] = [
  { id: 'c1', title: 'Morning Yoga', typ: 'Yoga', datum: '2026-06-24', time: '09:00', room: 'Großer Kursraum', trainer: 'Lisa M.', booked: 15, max: 15, status: 'Geplant', waitlist: [], dauerStunden: 1, attendance: {} },
  { id: 'c2', title: 'HIIT & Core', typ: 'HIIT', datum: '2026-06-24', time: '18:00', room: 'Großer Kursraum', trainer: 'Max K.', booked: 8, max: 10, status: 'Geplant', waitlist: [], dauerStunden: 1, attendance: {} },
  { id: 'c3', title: 'Spinning Power', typ: 'Spinning', datum: '2026-06-25', time: '18:00', room: 'Spinning-Raum', trainer: 'Max K.', booked: 5, max: 10, status: 'Geplant', waitlist: [], dauerStunden: 1, attendance: {} },
  { id: 'c4', title: 'Pilates Flow', typ: 'Pilates', datum: '2026-06-26', time: '10:00', room: 'Großer Kursraum', trainer: 'Lisa M.', booked: 12, max: 20, status: 'Geplant', waitlist: [], dauerStunden: 1.5, attendance: {} },
  { id: 'c5', title: 'Rückenfit', typ: 'Functional', datum: '2026-06-27', time: '17:00', room: 'Großer Kursraum', trainer: 'Sarah W.', booked: 6, max: 15, status: 'Geplant', waitlist: [], dauerStunden: 1, attendance: {} },
];

const defaultTrainers: Trainer[] = [
  { id: 't1', name: 'Lisa M.', qualifikationen: ['Yoga', 'Pilates', 'Functional'], stundensatz: 45, rolle: 'Trainer', farbe: '#4f46e5' },
  { id: 't2', name: 'Max K.', qualifikationen: ['Spinning', 'HIIT'], stundensatz: 40, rolle: 'Trainer', farbe: '#10b981' },
  { id: 't3', name: 'Sarah W.', qualifikationen: ['Yoga', 'Pilates', 'Rückenfit'], stundensatz: 40, rolle: 'Trainer', farbe: '#f59e0b' },
  { id: 't4', name: 'Jessi', qualifikationen: ['Rezeption', 'Mitgliederverwaltung'], stundensatz: 15, rolle: 'Rezeption', farbe: '#ec4899' },
];

const defaultVideos: Video[] = [
  { id: 'v1', title: 'Morning Yoga Flow', typ: 'Yoga', dauer: '45 Min', thumbnail: '🧘‍♀️', minTarif: 'PLUS' },
  { id: 'v2', title: 'HIIT Full Body', typ: 'HIIT', dauer: '30 Min', thumbnail: '🔥', minTarif: 'PLUS' },
  { id: 'v3', title: 'Pilates Basics', typ: 'Pilates', dauer: '40 Min', thumbnail: '💪', minTarif: 'PLUS' },
  { id: 'v4', title: 'Spinning Challenge', typ: 'Spinning', dauer: '50 Min', thumbnail: '🚴‍♀️', minTarif: 'PREMIUM' },
  { id: 'v5', title: 'Functional Training', typ: 'Functional', dauer: '35 Min', thumbnail: '🏋️‍♀️', minTarif: 'PLUS' },
  { id: 'v6', title: 'Live Yoga Session', typ: 'Yoga', dauer: '60 Min', thumbnail: '📺', minTarif: 'PLUS' },
];

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

  const [bookings, setBookingsState] = useState<{[memberId: string]: string[]}>(() => {
    const saved = localStorage.getItem('fitzone_bookings');
    return saved ? JSON.parse(saved) : {};
  });

  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const [currentTrainer, setCurrentTrainer] = useState<Trainer | null>(null);

  useEffect(() => { localStorage.setItem('fitzone_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('fitzone_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('fitzone_trainers', JSON.stringify(trainers)); }, [trainers]);
  useEffect(() => { localStorage.setItem('fitzone_bookings', JSON.stringify(bookings)); }, [bookings]);

  const setMembers = (newMembers: Member[]) => setMembersState(newMembers);
  const addMember = (member: Member) => setMembersState(prev => [...prev, member]);
  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembersState(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
  };
  const deleteMember = (id: string) => setMembersState(prev => prev.filter(m => m.id !== id));

  const setCourses = (newCourses: Course[]) => setCoursesState(newCourses);
  const addCourse = (course: Course) => setCoursesState(prev => [...prev, course]);
  const updateCourse = (id: string, updates: Partial<Course>) => {
    setCoursesState(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  const deleteCourse = (id: string) => setCoursesState(prev => prev.filter(c => c.id !== id));

  const setTrainers = (newTrainers: Trainer[]) => setTrainersState(newTrainers);
  const updateTrainer = (id: string, updates: Partial<Trainer>) => {
    setTrainersState(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const addBooking = (memberId: string, courseId: string) => {
    setBookingsState(prev => {
      const memberBookings = prev[memberId] || [];
      if (memberBookings.includes(courseId)) return prev;
      return { ...prev, [memberId]: [...memberBookings, courseId] };
    });
  };

  const removeBooking = (memberId: string, courseId: string) => {
    setBookingsState(prev => {
      const memberBookings = prev[memberId] || [];
      return { ...prev, [memberId]: memberBookings.filter(id => id !== courseId) };
    });
  };

  const getMemberBookings = (memberId: string) => bookings[memberId] || [];

  // ===== WARTESLISTE FUNKTIONEN (Spec 4.2) =====
  const joinWaitlist = (memberId: string, courseId: string): {success: boolean, position?: number, message: string} => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return {success: false, message: 'Kurs nicht gefunden'};
    
    const alreadyOnList = course.waitlist.find(w => w.memberId === memberId && (w.status === 'waiting' || w.status === 'nachgerueckt'));
    if (alreadyOnList) return {success: false, message: 'Du bist bereits auf der Warteliste'};
    
    const activeWaitlist = course.waitlist.filter(w => w.status === 'waiting' || w.status === 'nachgerueckt');
    if (activeWaitlist.length >= 5) {
      return {success: false, message: 'Warteliste ist voll (max. 5 Plätze)'};
    }
    
    const newEntry: WaitlistEntry = {
      memberId,
      timestamp: Date.now(),
      status: 'waiting'
    };
    
    const newWaitlist = [...course.waitlist, newEntry];
    updateCourse(courseId, { waitlist: newWaitlist });
    
    const position = activeWaitlist.length + 1;
    return {success: true, position, message: `Du bist auf Position ${position} der Warteliste`};
  };

  const leaveWaitlist = (memberId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const newWaitlist = course.waitlist.filter(w => !(w.memberId === memberId && (w.status === 'waiting' || w.status === 'nachgerueckt')));
    updateCourse(courseId, { waitlist: newWaitlist });
  };

  const getWaitlistPosition = (memberId: string, courseId: string): number => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    const activeWaitlist = course.waitlist.filter(w => w.status === 'waiting' || w.status === 'nachgerueckt');
    const index = activeWaitlist.findIndex(w => w.memberId === memberId);
    return index === -1 ? 0 : index + 1;
  };

  const promoteFromWaitlist = (courseId: string): {success: boolean, member?: Member, message: string} => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return {success: false, message: 'Kurs nicht gefunden'};
    
    const nextEntry = course.waitlist.find(w => w.status === 'waiting');
    if (!nextEntry) return {success: false, message: 'Warteliste ist leer'};
    
    const member = members.find(m => m.id === nextEntry.memberId);
    if (!member) return {success: false, message: 'Mitglied nicht gefunden'};
    
    const newWaitlist = course.waitlist.map(w => 
      w.memberId === nextEntry.memberId 
        ? {...w, status: 'nachgerueckt' as const, nachrueckZeit: Date.now()}
        : w
    );
    
    updateCourse(courseId, { waitlist: newWaitlist });
    
    return {
      success: true, 
      member, 
      message: `${member.vorname} ${member.nachname} wurde benachrichtigt (1h Frist)`
    };
  };

  const confirmNachrueck = (memberId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const newWaitlist = course.waitlist.map(w => 
      w.memberId === memberId ? {...w, status: 'bestaetigt' as const} : w
    );
    
    updateCourse(courseId, { waitlist: newWaitlist, booked: course.booked + 1 });
    addBooking(memberId, courseId);
  };

  const declineNachrueck = (memberId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    const newWaitlist = course.waitlist.map(w => 
      w.memberId === memberId ? {...w, status: 'abgelehnt' as const} : w
    );
    
    updateCourse(courseId, { waitlist: newWaitlist });
  };

  return (
    <AppContext.Provider value={{
      members, setMembers, addMember, updateMember, deleteMember,
      courses, setCourses, addCourse, updateCourse, deleteCourse,
      trainers, setTrainers, updateTrainer,
      videos: defaultVideos,
      currentUser, setCurrentUser,
      currentTrainer, setCurrentTrainer,
      bookings, addBooking, removeBooking, getMemberBookings,
      joinWaitlist, leaveWaitlist, getWaitlistPosition, promoteFromWaitlist, confirmNachrueck, declineNachrueck
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