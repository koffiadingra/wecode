// Demo mode detection
export const isDemoMode = () => {
  return localStorage.getItem('demoMode') === 'true';
};

export const enableDemoMode = () => {
  localStorage.setItem('demoMode', 'true');
};

export const disableDemoMode = () => {
  localStorage.removeItem('demoMode');
  localStorage.removeItem('demoFideles');
  localStorage.removeItem('demoPresences');
  localStorage.removeItem('demoUser');
};

// User role management
export type UserRole = 'pasteur' | 'recenseur';

interface DemoUser {
  email: string;
  role: UserRole;
  name: string;
}

export const setDemoUser = (email: string, role: UserRole, name: string) => {
  const user: DemoUser = { email, role, name };
  localStorage.setItem('demoUser', JSON.stringify(user));
};

export const getDemoUser = (): DemoUser | null => {
  const userStr = localStorage.getItem('demoUser');
  if (!userStr) return null;
  return JSON.parse(userStr);
};

export const getDemoUserRole = (): UserRole | null => {
  const user = getDemoUser();
  return user?.role || null;
};

// Predefined demo users
export const DEMO_USERS = [
  { email: 'pasteur@chapelle.com', password: 'pasteur123', role: 'pasteur' as UserRole, name: 'Pasteur Jean Martin' },
  { email: 'recenseur@chapelle.com', password: 'recenseur123', role: 'recenseur' as UserRole, name: 'Marie Dubois' },
];

// Demo data for testing
export const demoFideles = [
  {
    id: 'demo-1',
    nom: 'Martin',
    prenom: 'Jean',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    dateAdhesion: '2020-01-15',
    fonction: 'Pasteur',
    service: 'Direction',
    telephone: '+33 6 12 34 56 78',
    lieuResidence: 'Paris 15ème',
  },
  {
    id: 'demo-2',
    nom: 'Dubois',
    prenom: 'Marie',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    dateAdhesion: '2019-06-20',
    fonction: 'Diacre',
    service: 'Accueil',
    telephone: '+33 6 23 45 67 89',
    lieuResidence: 'Versailles',
  },
  {
    id: 'demo-3',
    nom: 'Bernard',
    prenom: 'Pierre',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    dateAdhesion: '2021-03-10',
    fonction: 'Chantre',
    service: 'Louange',
    telephone: '+33 6 34 56 78 90',
    lieuResidence: 'Boulogne-Billancourt',
  },
  {
    id: 'demo-4',
    nom: 'Thomas',
    prenom: 'Sophie',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    dateAdhesion: '2020-09-05',
    fonction: 'Membre',
    service: 'Intercession',
    telephone: '+33 6 45 67 89 01',
    lieuResidence: 'Neuilly-sur-Seine',
  },
  {
    id: 'demo-5',
    nom: 'Robert',
    prenom: 'Luc',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    dateAdhesion: '2018-11-12',
    fonction: 'Ancien',
    service: 'Enseignement',
    telephone: '+33 6 56 78 90 12',
    lieuResidence: 'Saint-Cloud',
  },
  {
    id: 'demo-6',
    nom: 'Petit',
    prenom: 'Julie',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    dateAdhesion: '2022-02-28',
    fonction: 'Membre',
    service: 'Jeunesse',
    telephone: '+33 6 67 89 01 23',
    lieuResidence: 'Issy-les-Moulineaux',
  },
  {
    id: 'demo-7',
    nom: 'Richard',
    prenom: 'David',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    dateAdhesion: '2019-12-01',
    fonction: 'Trésorier',
    service: 'Administration',
    telephone: '+33 6 78 90 12 34',
    lieuResidence: 'Meudon',
  },
  {
    id: 'demo-8',
    nom: 'Durand',
    prenom: 'Emma',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    dateAdhesion: '2021-08-15',
    fonction: 'Membre',
    service: 'Évangélisation',
    telephone: '+33 6 89 01 23 45',
    lieuResidence: 'Clamart',
  },
];

export const demoPresences: Record<string, any> = {
  '2025-02-09': {
    'demo-1': { fideleId: 'demo-1', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:00:00' },
    'demo-2': { fideleId: 'demo-2', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:01:00' },
    'demo-3': { fideleId: 'demo-3', date: '2025-02-09', present: false, markedAt: '2025-02-09T10:02:00' },
    'demo-4': { fideleId: 'demo-4', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:03:00' },
    'demo-5': { fideleId: 'demo-5', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:04:00' },
    'demo-6': { fideleId: 'demo-6', date: '2025-02-09', present: false, markedAt: '2025-02-09T10:05:00' },
    'demo-7': { fideleId: 'demo-7', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:06:00' },
    'demo-8': { fideleId: 'demo-8', date: '2025-02-09', present: true, markedAt: '2025-02-09T10:07:00' },
  },
  '2025-02-02': {
    'demo-1': { fideleId: 'demo-1', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:00:00' },
    'demo-2': { fideleId: 'demo-2', date: '2025-02-02', present: false, markedAt: '2025-02-02T10:01:00' },
    'demo-3': { fideleId: 'demo-3', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:02:00' },
    'demo-4': { fideleId: 'demo-4', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:03:00' },
    'demo-5': { fideleId: 'demo-5', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:04:00' },
    'demo-6': { fideleId: 'demo-6', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:05:00' },
    'demo-7': { fideleId: 'demo-7', date: '2025-02-02', present: false, markedAt: '2025-02-02T10:06:00' },
    'demo-8': { fideleId: 'demo-8', date: '2025-02-02', present: true, markedAt: '2025-02-02T10:07:00' },
  },
};

// Get demo fideles from localStorage or use default
export function getDemoFideles() {
  const stored = localStorage.getItem('demoFideles');
  if (stored) {
    return JSON.parse(stored);
  }
  return demoFideles;
}

// Save demo fideles to localStorage
export function saveDemoFideles(fideles: any[]) {
  localStorage.setItem('demoFideles', JSON.stringify(fideles));
}

// Get demo presences from localStorage or use default
export function getDemoPresences(date?: string) {
  const stored = localStorage.getItem('demoPresences');
  const presences = stored ? JSON.parse(stored) : demoPresences;
  
  if (date) {
    return presences[date] || {};
  }
  return presences;
}

// Save demo presences to localStorage
export function saveDemoPresences(presences: any) {
  localStorage.setItem('demoPresences', JSON.stringify(presences));
}

// Get all dates with presences
export function getDemoPresenceDates() {
  const presences = getDemoPresences();
  return Object.keys(presences).sort().reverse();
}