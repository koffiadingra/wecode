import { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { AdminDashboard } from './AdminDashboard';

interface Admin {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  createdBy: string;
}

export function EspaceAdmin({ onClose }: { onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState('');
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', username: 'admin', password: 'admin123', createdAt: new Date().toISOString(), createdBy: 'system' }
  ]);

  // Load admins from localStorage on mount
  useEffect(() => {
    const storedAdmins = localStorage.getItem('shaida_admins');
    if (storedAdmins) {
      try {
        setAdmins(JSON.parse(storedAdmins));
      } catch (e) {
        console.error('Error loading admins:', e);
      }
    }
  }, []);

  // Save admins to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shaida_admins', JSON.stringify(admins));
  }, [admins]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulation de délai de connexion
      await new Promise(resolve => setTimeout(resolve, 800));

      // Vérifier contre la liste des admins
      const admin = admins.find(
        a => a.username.toLowerCase().trim() === username.toLowerCase().trim() && 
             a.password.trim() === password.trim()
      );

      if (admin) {
        setIsLoggedIn(true);
        setCurrentAdmin(admin.username);
      } else {
        throw new Error('Identifiants incorrects');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setCurrentAdmin('');
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-md w-full p-8 relative shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-3xl mb-2">Espace Administrateur</h2>
            <p className="text-neutral-600">Connectez-vous pour gérer le dojo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-neutral-500 text-sm">Compte de démonstration :</p>
            <div className="mt-2 space-y-1 text-sm">
              <p className="text-neutral-700">Utilisateur : <span className="text-red-600 font-medium">admin</span></p>
              <p className="text-neutral-700">Mot de passe : <span className="text-red-600 font-medium">admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard 
      onClose={onClose} 
      onLogout={handleLogout} 
      currentAdmin={currentAdmin}
      admins={admins}
      setAdmins={setAdmins}
    />
  );
}