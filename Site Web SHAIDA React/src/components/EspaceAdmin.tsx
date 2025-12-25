import { useState, useEffect } from 'react';
import { X, Users, Calendar, Award, Plus, Edit, Trash2, LogOut, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { getSupabaseClient } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Practitioner {
  id: string;
  username?: string;
  name: string;
  belt: string;
  degree: number;
  yearStarted: number;
  attendanceRate: number;
  totalSessions: number;
  nextBeltTest?: string;
  photoUrl?: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
}

interface News {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  author: string;
  date: string;
  createdAt: string;
}

interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  level?: string;
}

const belts = ['Blanc', 'Jaune', 'Rouge', 'Vert', 'Bleu', 'Marron', 'Noir'];
const degrees = [1, 2, 3];

const getBeltColor = (belt: string): string => {
  const colors: { [key: string]: string } = {
    'Blanc': 'bg-gray-100 border-gray-300 text-gray-800',
    'Jaune': 'bg-yellow-400 border-yellow-600 text-yellow-900',
    'Rouge': 'bg-red-600 border-red-800 text-white',
    'Vert': 'bg-green-600 border-green-800 text-white',
    'Bleu': 'bg-blue-600 border-blue-800 text-white',
    'Marron': 'bg-amber-800 border-amber-950 text-white',
    'Noir': 'bg-neutral-900 border-neutral-950 text-white'
  };
  return colors[belt] || 'bg-gray-200 border-gray-400 text-gray-800';
};

export function EspaceAdmin({ onClose }: { onClose: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInitialSetup, setShowInitialSetup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [schedules] = useState<Schedule[]>([
    { id: '1', day: 'Mercredi', startTime: '16:00', endTime: '18:30' },
    { id: '2', day: 'Samedi', startTime: '16:00', endTime: '18:30' },
    { id: '3', day: 'Dimanche', startTime: '15:30', endTime: '18:00' }
  ]);
  const [showAddPractitioner, setShowAddPractitioner] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddNews, setShowAddNews] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showAddBulletin, setShowAddBulletin] = useState(false);
  const [selectedPractitionerForBulletin, setSelectedPractitionerForBulletin] = useState<string | null>(null);
  const [editingPractitioner, setEditingPractitioner] = useState<Practitioner | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const supabase = getSupabaseClient();

  useEffect(() => {
    checkAdminExists();
  }, []);

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      loadPractitioners();
      loadEvents();
      loadNews();
    }
  }, [isLoggedIn, accessToken]);

  const checkAdminExists = async () => {
    try {
      console.log('Checking if admin exists...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/exists`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      console.log('Admin exists check response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Admin exists:', data.exists);
        if (!data.exists) {
          setShowInitialSetup(true);
        }
      } else {
        console.error('Admin exists check failed:', response.status, response.statusText);
        // If server is not ready, assume no admin exists and show setup
        setShowInitialSetup(true);
      }
    } catch (err) {
      console.error('Check admin exists error:', err);
      // On network error, assume first-time setup and show the form
      setShowInitialSetup(true);
    }
  };

  const handleInitialSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Creating admin account...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name: adminName,
          }),
        }
      );

      console.log('Admin signup response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Server error' }));
        console.error('Admin signup error:', errorData);
        throw new Error(errorData.error || 'Échec de la création du compte administrateur');
      }

      console.log('Admin account created, logging in...');

      // Now login with the new account
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      if (data.session) {
        console.log('Login successful');
        setAccessToken(data.session.access_token);
        setIsLoggedIn(true);
        setShowInitialSetup(false);
      }
    } catch (err: any) {
      console.error('Initial setup error:', err);
      setError(err.message || 'Erreur lors de la création du compte administrateur. Le serveur backend est peut-être en cours de démarrage. Veuillez réessayer dans quelques secondes.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login for:', email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      if (data.session) {
        console.log('Login successful, token:', data.session.access_token.substring(0, 20) + '...');
        setAccessToken(data.session.access_token);
        setIsLoggedIn(true);
      } else {
        throw new Error('Aucune session créée');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Erreur de connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setAccessToken('');
    setEmail('');
    setPassword('');
    setPractitioners([]);
  };

  const loadPractitioners = async () => {
    if (!accessToken) {
      console.log('No access token available, skipping load practitioners');
      return;
    }

    try {
      console.log('Loading practitioners with token:', accessToken.substring(0, 20) + '...');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/practitioners`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Load practitioners error response:', errorData);
        throw new Error(errorData.error || 'Failed to load practitioners');
      }

      const data = await response.json();
      console.log('Practitioners loaded:', data.practitioners?.length || 0);
      setPractitioners(data.practitioners || []);
    } catch (err: any) {
      console.error('Load practitioners error:', err);
      // Don't set error state, just log it - practitioners list will remain empty
    }
  };

  const loadEvents = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/events`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Load events error response:', errorData);
        throw new Error(errorData.error || 'Failed to load events');
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (err: any) {
      console.error('Load events error:', err);
      // Don't set error state, just log it
    }
  };

  const loadNews = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/news`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Load news error response:', errorData);
        throw new Error(errorData.error || 'Failed to load news');
      }

      const data = await response.json();
      setNews(data.news || []);
    } catch (err: any) {
      console.error('Load news error:', err);
      // Don't set error state, just log it
    }
  };

  const handleCreatePractitioner = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      console.log('Creating practitioner with data:', formData);
      console.log('Using access token:', accessToken.substring(0, 20) + '...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/create-practitioner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Create practitioner error response:', errorData);
        throw new Error(errorData.error || 'Failed to create practitioner');
      }

      const result = await response.json();
      console.log('Practitioner created successfully:', result);
      
      await loadPractitioners();
      setShowAddPractitioner(false);
    } catch (err: any) {
      console.error('Create practitioner error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePractitioner = async (id: string, updates: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/practitioner/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updates),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update practitioner');
      }

      await loadPractitioners();
      setEditingPractitioner(null);
    } catch (err: any) {
      console.error('Update practitioner error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePractitioner = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce pratiquant ?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/practitioner/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete practitioner');
      }

      await loadPractitioners();
    } catch (err: any) {
      console.error('Delete practitioner error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      await loadEvents();
      setShowAddEvent(false);
    } catch (err: any) {
      console.error('Create event error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/event/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      await loadEvents();
    } catch (err: any) {
      console.error('Delete event error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAwardCertification = async (practitionerId: string, belt: string, degree: number, date: string) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/certification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ practitionerId, belt, degree, date }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to award certification');
      }

      await loadPractitioners();
    } catch (err: any) {
      console.error('Award certification error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/news/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete news');
      }

      await loadNews();
    } catch (err: any) {
      console.error('Delete news error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNews = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/news`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      await loadNews();
      setShowAddNews(false);
    } catch (err: any) {
      console.error('Create news error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/create-admin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create admin');
      }

      setShowAddAdmin(false);
      alert('Administrateur créé avec succès');
    } catch (err: any) {
      console.error('Create admin error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBulletin = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/admin/bulletin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create bulletin');
      }

      setShowAddBulletin(false);
      setSelectedPractitionerForBulletin(null);
      alert('Bulletin créé avec succès');
    } catch (err: any) {
      console.error('Create bulletin error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
              <Shield size={32} className="text-white" />
            </div>
            <h2 className="text-3xl mb-2">Espace Administrateur</h2>
            <p className="text-neutral-600">Connectez-vous pour gérer le dojo</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {showInitialSetup ? (
            <form onSubmit={handleInitialSetup} className="space-y-6">
              <div>
                <Label htmlFor="admin-name">Nom de l'administrateur</Label>
                <Input
                  id="admin-name"
                  type="text"
                  placeholder="Nom de l'administrateur"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="admin-email">Email administrateur</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@shaida.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="admin-password">Mot de passe</Label>
                <Input
                  id="admin-password"
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
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                disabled={loading}
              >
                {loading ? 'Création...' : 'Créer le compte'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="admin-email">Email administrateur</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@shaida.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="admin-password">Mot de passe</Label>
                <Input
                  id="admin-password"
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
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-neutral-50 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl">Espace Administrateur</h1>
            <p className="text-neutral-600">Gestion du dojo SHAIDA</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Déconnexion
            </Button>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-900"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Tabs defaultValue="practitioners" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="practitioners">Pratiquants</TabsTrigger>
            <TabsTrigger value="bulletin">Bulletin</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="news">Actualités</TabsTrigger>
            <TabsTrigger value="schedules">Horaires</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          {/* Practitioners Tab */}
          <TabsContent value="practitioners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Gestion des Pratiquants</h2>
              <Button
                onClick={() => setShowAddPractitioner(true)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Ajouter un pratiquant
              </Button>
            </div>

            <div className="grid gap-4">
              {practitioners.map((practitioner) => (
                <Card key={practitioner.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{practitioner.name}</h3>
                      {practitioner.username && (
                        <p className="text-neutral-600 mb-3">@{practitioner.username}</p>
                      )}
                      <div className="flex gap-3 flex-wrap">
                        <div className={`px-3 py-1 rounded-full border-2 ${getBeltColor(practitioner.belt)}`}>
                          Ceinture {practitioner.belt} - {practitioner.degree}° degré
                        </div>
                        <Badge variant="secondary">
                          Depuis {practitioner.yearStarted}
                        </Badge>
                        <Badge variant="outline">
                          {practitioner.totalSessions} séances
                        </Badge>
                        <Badge variant="outline">
                          {practitioner.attendanceRate}% présence
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPractitioner(practitioner)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePractitioner(practitioner.id)}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {practitioners.length === 0 && (
                <Card className="p-12 text-center text-neutral-500">
                  Aucun pratiquant enregistré
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Bulletin Tab */}
          <TabsContent value="bulletin" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Gestion des Bulletins</h2>
            </div>

            <div className="grid gap-4">
              {practitioners.map((practitioner) => (
                <Card key={practitioner.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{practitioner.name}</h3>
                      <div className={`px-3 py-1 rounded-full border-2 ${getBeltColor(practitioner.belt)} inline-block`}>
                        Ceinture {practitioner.belt} - {practitioner.degree}° degré
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedPractitionerForBulletin(practitioner.id);
                        setShowAddBulletin(true);
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Ajouter une note
                    </Button>
                  </div>
                </Card>
              ))}

              {practitioners.length === 0 && (
                <Card className="p-12 text-center text-neutral-500">
                  Aucun pratiquant enregistré
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Admins Tab */}
          <TabsContent value="admins" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Gestion des Administrateurs</h2>
              <Button
                onClick={() => setShowAddAdmin(true)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Ajouter un administrateur
              </Button>
            </div>

            <Card className="p-6">
              <p className="text-neutral-600">
                Les administrateurs ont accès à toutes les fonctionnalités de gestion du dojo.
                Créez des comptes administrateur pour d'autres instructeurs ou responsables.
              </p>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Gestion des Actualités</h2>
              <Button
                onClick={() => setShowAddNews(true)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Ajouter une actualité
              </Button>
            </div>

            <div className="grid gap-4">
              {news.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-neutral-600 mb-3 line-clamp-2">{item.content}</p>
                      <div className="flex gap-3 flex-wrap">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">
                          {new Date(item.date).toLocaleDateString('fr-FR')}
                        </Badge>
                        <Badge variant="outline">{item.author}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteNews(item.id)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </Card>
              ))}

              {news.length === 0 && (
                <Card className="p-12 text-center text-neutral-500">
                  Aucune actualité publiée
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules" className="space-y-6">
            <h2 className="text-2xl">Gestion des Horaires</h2>
            
            <div className="grid gap-4">
              {schedules.map((schedule) => (
                <Card key={schedule.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl mb-2">{schedule.day}</h3>
                      <p className="text-neutral-600">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      {schedule.level && (
                        <Badge variant="secondary" className="mt-2">
                          {schedule.level}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Gestion des Événements</h2>
              <Button
                onClick={() => setShowAddEvent(true)}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Plus size={18} />
                Ajouter un événement
              </Button>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <Card key={event.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{event.title}</h3>
                      <p className="text-neutral-600 mb-3">{event.description}</p>
                      <div className="flex gap-3">
                        <Badge variant="secondary">
                          {new Date(event.date).toLocaleDateString('fr-FR')}
                        </Badge>
                        <Badge variant="outline">{event.time}</Badge>
                        <Badge>{event.type}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </Card>
              ))}

              {events.length === 0 && (
                <Card className="p-12 text-center text-neutral-500">
                  Aucun événement programmé
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <h2 className="text-2xl">Attribution de Certifications</h2>

            <div className="grid gap-4">
              {practitioners.map((practitioner) => (
                <Card key={practitioner.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl mb-2">{practitioner.name}</h3>
                      <div className={`px-3 py-1 rounded-full border-2 ${getBeltColor(practitioner.belt)} inline-block`}>
                        Ceinture {practitioner.belt} - {practitioner.degree}° degré
                      </div>
                    </div>
                    <CertificationForm
                      practitionerId={practitioner.id}
                      currentBelt={practitioner.belt}
                      currentDegree={practitioner.degree}
                      onSubmit={handleAwardCertification}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Practitioner Modal */}
        {showAddPractitioner && (
          <AddPractitionerModal
            onClose={() => setShowAddPractitioner(false)}
            onSubmit={handleCreatePractitioner}
            loading={loading}
          />
        )}

        {/* Edit Practitioner Modal */}
        {editingPractitioner && (
          <EditPractitionerModal
            practitioner={editingPractitioner}
            onClose={() => setEditingPractitioner(null)}
            onSubmit={(updates) => handleUpdatePractitioner(editingPractitioner.id, updates)}
            loading={loading}
          />
        )}

        {/* Add Event Modal */}
        {showAddEvent && (
          <AddEventModal
            onClose={() => setShowAddEvent(false)}
            onSubmit={handleCreateEvent}
            loading={loading}
          />
        )}

        {/* Add News Modal */}
        {showAddNews && (
          <AddNewsModal
            onClose={() => setShowAddNews(false)}
            onSubmit={handleCreateNews}
            loading={loading}
          />
        )}

        {/* Add Admin Modal */}
        {showAddAdmin && (
          <AddAdminModal
            onClose={() => setShowAddAdmin(false)}
            onSubmit={handleCreateAdmin}
            loading={loading}
          />
        )}

        {/* Add Bulletin Modal */}
        {showAddBulletin && selectedPractitionerForBulletin && (
          <AddBulletinModal
            practitionerId={selectedPractitionerForBulletin}
            onClose={() => {
              setShowAddBulletin(false);
              setSelectedPractitionerForBulletin(null);
            }}
            onSubmit={handleCreateBulletin}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

// Add Practitioner Modal Component
function AddPractitionerModal({ onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    belt: 'Blanc',
    degree: 1,
    yearStarted: new Date().getFullYear(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Nouveau Pratiquant</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom et Prénoms</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: KOUAME Ahoussi Eugene"
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Mot de passe du pratiquant"
              required
              className="mt-2"
            />
            <p className="text-sm text-neutral-500 mt-1">Le pratiquant utilisera son nom et ce mot de passe pour se connecter</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="belt">Ceinture</Label>
              <select
                id="belt"
                value={formData.belt}
                onChange={(e) => setFormData({ ...formData, belt: e.target.value })}
                className="w-full mt-2 p-2 border rounded-md"
              >
                {belts.map((belt) => (
                  <option key={belt} value={belt}>{belt}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="degree">Degré</Label>
              <select
                id="degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: Number(e.target.value) })}
                className="w-full mt-2 p-2 border rounded-md"
              >
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="yearStarted">Année de début</Label>
            <Input
              id="yearStarted"
              type="number"
              value={formData.yearStarted}
              onChange={(e) => setFormData({ ...formData, yearStarted: Number(e.target.value) })}
              required
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer le compte'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Edit Practitioner Modal Component
function EditPractitionerModal({ practitioner, onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    name: practitioner.name,
    belt: practitioner.belt,
    degree: practitioner.degree,
    yearStarted: practitioner.yearStarted,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Modifier Pratiquant</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-name">Nom complet</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-belt">Ceinture</Label>
              <select
                id="edit-belt"
                value={formData.belt}
                onChange={(e) => setFormData({ ...formData, belt: e.target.value })}
                className="w-full mt-2 p-2 border rounded-md"
              >
                {belts.map((belt) => (
                  <option key={belt} value={belt}>{belt}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="edit-degree">Degré</Label>
              <select
                id="edit-degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: Number(e.target.value) })}
                className="w-full mt-2 p-2 border rounded-md"
              >
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="edit-yearStarted">Année de début</Label>
            <Input
              id="edit-yearStarted"
              type="number"
              value={formData.yearStarted}
              onChange={(e) => setFormData({ ...formData, yearStarted: Number(e.target.value) })}
              required
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Mise à jour...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Add Event Modal Component
function AddEventModal({ onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    type: 'Compétition',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Nouvel Événement</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="event-title">Titre</Label>
            <Input
              id="event-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="event-description">Description</Label>
            <textarea
              id="event-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full mt-2 p-2 border rounded-md min-h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-date">Date</Label>
              <Input
                id="event-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="event-time">Heure</Label>
              <Input
                id="event-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="event-type">Type</Label>
            <select
              id="event-type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full mt-2 p-2 border rounded-md"
            >
              <option>Compétition</option>
              <option>Stage</option>
              <option>Démonstration</option>
              <option>Passage de grade</option>
              <option>Autre</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer l\'événement'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Certification Form Component
function CertificationForm({ practitionerId, currentBelt, currentDegree, onSubmit }: any) {
  const [belt, setBelt] = useState(currentBelt);
  const [degree, setDegree] = useState(currentDegree);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(practitionerId, belt, degree, date);
    setShowForm(false);
  };

  if (!showForm) {
    return (
      <Button
        onClick={() => setShowForm(true)}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Award size={16} />
        Attribuer grade
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div>
        <select
          value={belt}
          onChange={(e) => setBelt(e.target.value)}
          className="p-2 border rounded-md"
        >
          {belts.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={degree}
          onChange={(e) => setDegree(Number(e.target.value))}
          className="p-2 border rounded-md"
        >
          {degrees.map((d) => (
            <option key={d} value={d}>{d}°</option>
          ))}
        </select>
      </div>
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2"
        />
      </div>
      <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
        Valider
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => setShowForm(false)}
      >
        Annuler
      </Button>
    </form>
  );
}

// Add News Modal Component
function AddNewsModal({ onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Actualité',
    imageUrl: '',
    author: 'Admin',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Nouvelle Actualité</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="news-title">Titre</Label>
            <Input
              id="news-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="news-content">Contenu</Label>
            <textarea
              id="news-content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              className="w-full mt-2 p-2 border rounded-md min-h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="news-date">Date</Label>
              <Input
                id="news-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="news-category">Catégorie</Label>
              <select
                id="news-category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full mt-2 p-2 border rounded-md"
              >
                <option>Actualité</option>
                <option>Événement</option>
                <option>Formation</option>
                <option>Autre</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="news-author">Auteur</Label>
            <Input
              id="news-author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="news-imageUrl">URL de l'image</Label>
            <Input
              id="news-imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer l\'actualité'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Add Admin Modal Component
function AddAdminModal({ onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Nouvel Administrateur</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="admin-name">Nom de l'administrateur</Label>
            <Input
              id="admin-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="admin-email">Email administrateur</Label>
            <Input
              id="admin-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="admin-password">Mot de passe</Label>
            <Input
              id="admin-password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer le compte'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

// Add Bulletin Modal Component
function AddBulletinModal({ practitionerId, onClose, onSubmit, loading }: any) {
  const [formData, setFormData] = useState({
    practitionerId: practitionerId,
    technique: 0,
    discipline: 0,
    physical: 0,
    average: 0,
    comments: '',
    period: '',
  });

  // Calculate average automatically
  const calculateAverage = (tech: number, disc: number, phys: number) => {
    return ((tech + disc + phys) / 3).toFixed(2);
  };

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    
    if (field === 'technique' || field === 'discipline' || field === 'physical') {
      updated.average = Number(calculateAverage(
        field === 'technique' ? value : formData.technique,
        field === 'discipline' ? value : formData.discipline,
        field === 'physical' ? value : formData.physical
      ));
    }
    
    setFormData(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl">Nouveau Bulletin</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="period">Période</Label>
            <Input
              id="period"
              value={formData.period}
              onChange={(e) => handleChange('period', e.target.value)}
              placeholder="Ex: Trimestre 1 2024"
              required
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="technique">Note Technique (/20)</Label>
              <Input
                id="technique"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.technique}
                onChange={(e) => handleChange('technique', Number(e.target.value))}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="discipline">Note Discipline (/20)</Label>
              <Input
                id="discipline"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.discipline}
                onChange={(e) => handleChange('discipline', Number(e.target.value))}
                required
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="physical">Note Physique (/20)</Label>
              <Input
                id="physical"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={formData.physical}
                onChange={(e) => handleChange('physical', Number(e.target.value))}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="average">Moyenne</Label>
              <Input
                id="average"
                type="number"
                value={formData.average}
                readOnly
                className="mt-2 bg-gray-100"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="comments">Commentaires</Label>
            <textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleChange('comments', e.target.value)}
              className="w-full mt-2 p-2 border rounded-md min-h-24"
              placeholder="Observations et recommandations..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Création...' : 'Créer le bulletin'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}