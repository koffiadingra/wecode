import { useState } from 'react';
import { X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PratiquantDashboard } from './PratiquantDashboard';

interface UserProfile {
  id: string;
  name: string;
  username?: string;
  belt: string;
  degree: number;
  yearStarted: number;
  nextBeltTest?: string;
  attendanceRate: number;
  totalSessions: number;
  photoUrl?: string;
}

const belts = ['Blanc', 'Jaune', 'Rouge', 'Vert', 'Bleu', 'Marron', 'Noir'];
const degrees = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Données de démonstration
const mockUsers: { [key: string]: UserProfile } = {
  'Jean Kouassi_Jaune_1': {
    id: '1',
    name: 'Jean Kouassi',
    username: 'jkouassi',
    belt: 'Jaune',
    degree: 1,
    yearStarted: 2023,
    nextBeltTest: '2025-03-15',
    attendanceRate: 85,
    totalSessions: 42,
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
  },
  'Marie Koné_Vert_2': {
    id: '2',
    name: 'Marie Koné',
    username: 'mkone',
    belt: 'Vert',
    degree: 2,
    yearStarted: 2021,
    nextBeltTest: '2025-06-20',
    attendanceRate: 92,
    totalSessions: 156,
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
  },
  'Yao Bamba_Noir_3': {
    id: '3',
    name: 'Yao Bamba',
    username: 'ybamba',
    belt: 'Noir',
    degree: 3,
    yearStarted: 2018,
    nextBeltTest: undefined,
    attendanceRate: 96,
    totalSessions: 320,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop'
  }
};

export function EspacePersonnel({ onClose }: { onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [belt, setBelt] = useState('Blanc');
  const [degree, setDegree] = useState(1);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulation de délai de connexion
      await new Promise(resolve => setTimeout(resolve, 800));

      // Vérifier le mot de passe demo
      if (password !== 'demo123') {
        throw new Error('Mot de passe incorrect. Utilisez: demo123');
      }

      const userKey = `${name}_${belt}_${degree}`;
      let user = mockUsers[userKey];

      // Si l'utilisateur n'existe pas dans mockUsers, créer un profil par défaut
      if (!user) {
        user = {
          id: String(Object.keys(mockUsers).length + 1),
          name: name,
          username: name.toLowerCase().replace(' ', ''),
          belt: belt,
          degree: degree,
          yearStarted: new Date().getFullYear() - 1,
          nextBeltTest: '2025-06-15',
          attendanceRate: 80,
          totalSessions: 20,
          photoUrl: undefined
        };
      }

      setUserProfile(user);
      setIsLoggedIn(true);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    setName('');
    setPassword('');
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-sm w-full p-6 relative shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-white" />
            </div>
            <h2 className="text-2xl mb-1">Espace Personnel</h2>
            <p className="text-neutral-500 text-sm">Connectez-vous à votre profil</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm">Nom complet</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean Kouassi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="belt" className="text-sm">Ceinture</Label>
                <select
                  id="belt"
                  value={belt}
                  onChange={(e) => setBelt(e.target.value)}
                  className="mt-1 block w-full h-10 px-3 py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {belts.map((belt) => (
                    <option key={belt} value={belt}>
                      {belt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="degree" className="text-sm">Degré</Label>
                <select
                  id="degree"
                  value={degree}
                  onChange={(e) => setDegree(Number(e.target.value))}
                  className="mt-1 block w-full h-10 px-3 py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}°
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 h-10"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white h-10 mt-2"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          {error && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-xs text-center">{error}</p>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-neutral-500 text-xs">Comptes de démonstration disponibles :</p>
            <div className="mt-2 space-y-1 text-xs text-neutral-600">
              <p>• Jean Kouassi - Jaune 1°</p>
              <p>• Marie Koné - Vert 2°</p>
              <p>• Yao Bamba - Noir 3°</p>
              <p className="mt-2 text-red-600">Mot de passe : demo123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userProfile) {
    return (
      <PratiquantDashboard
        userProfile={userProfile}
        onClose={onClose}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}