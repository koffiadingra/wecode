import { useState } from 'react';
import { X, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { projectId, publicAnonKey } from '../utils/supabase/info';
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
const degrees = [1, 2, 3];

export function EspacePersonnel({ onClose }: { onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [belt, setBelt] = useState('Blanc');
  const [degree, setDegree] = useState(1);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Practitioner login attempt:', { name, belt, degree });

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/practitioner/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ name, belt, degree, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur de connexion' }));
        throw new Error(errorData.error || 'Identifiants incorrects');
      }

      const data = await response.json();
      console.log('Login successful');

      setAccessToken(data.accessToken);
      setIsLoggedIn(true);

      // Load user profile
      await loadUserProfile(data.accessToken);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (token: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/practitioner/info`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data.practitioner);
      }
    } catch (err) {
      console.error('Load profile error:', err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setBelt('Blanc');
    setDegree(1);
    setPassword('');
    setAccessToken('');
    setUserProfile(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-3xl mb-2">Espace Personnel</h2>
            <p className="text-neutral-600">Connectez-vous pour accéder à votre profil</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                type="text"
                placeholder="Jean-Paul Kouassi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="belt">Ceinture</Label>
              <select
                id="belt"
                value={belt}
                onChange={(e) => setBelt(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {belts.map((belt) => (
                  <option key={belt} value={belt}>
                    {belt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="degree">Degré</Label>
              <select
                id="degree"
                value={degree}
                onChange={(e) => setDegree(Number(e.target.value))}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree}° degré
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center text-neutral-600">
            <p>Pas encore de compte ? Contactez votre instructeur.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8">
          <p>Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-neutral-50 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl">Mon Espace Personnel</h1>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-900"
          >
            <X size={24} />
          </button>
        </div>

        <PratiquantDashboard 
          userProfile={userProfile} 
          accessToken={accessToken}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
}
