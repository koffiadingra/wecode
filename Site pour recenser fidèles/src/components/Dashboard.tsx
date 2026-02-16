import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/config';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, UserCheck, LogOut, Church, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { isDemoMode, disableDemoMode, getDemoUser, type UserRole } from '../utils/demoData';

export function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if demo mode
      if (isDemoMode()) {
        setIsDemo(true);
        const demoUser = getDemoUser();
        if (demoUser) {
          setUserName(demoUser.name);
          setUserRole(demoUser.role);
        } else {
          setUserName('Utilisateur Démo');
          setUserRole('recenseur');
        }
        setLoading(false);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          navigate('/');
          return;
        }

        // Récupérer le nom et le rôle depuis Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || user.email || 'Utilisateur');
            setUserRole(userData.role || 'recenseur');
          } else {
            setUserName(user.email || 'Utilisateur');
            setUserRole('recenseur');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserName(user.email || 'Utilisateur');
          setUserRole('recenseur');
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/');
    }
  };

  const handleLogout = async () => {
    if (isDemo) {
      disableDemoMode();
      toast.success('Mode démo quitté');
      navigate('/');
      return;
    }

    try {
      await signOut(auth);
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const isPasteur = userRole === 'pasteur';

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Church className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Chapelle Pleine de Gloire
              </h1>
            </div>
            <p className="text-gray-600 mt-1">
              Bienvenue, {userName}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={isPasteur ? "default" : "secondary"} className={isPasteur ? "bg-indigo-600" : ""}>
                {isPasteur ? "🔑 Pasteur" : "📋 Recenseur"}
              </Badge>
              {isDemo && (
                <Badge variant="outline">🎭 Mode Démo</Badge>
              )}
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {isPasteur && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-indigo-100" onClick={() => navigate('/fideles')}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-lg">
                    <Users className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Gestion des fidèles
                      <Badge variant="secondary" className="text-xs">Pasteur</Badge>
                    </CardTitle>
                    <CardDescription>
                      Ajouter, modifier et consulter la liste des membres
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Accéder à la liste des fidèles
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-100" onClick={() => navigate('/presences')}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-lg">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Liste de présence
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">Tous</Badge>
                  </CardTitle>
                  <CardDescription>
                    Marquer les présences des fidèles chaque dimanche
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Gérer les présences
              </Button>
            </CardContent>
          </Card>

          {isPasteur && (
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-100" onClick={() => navigate('/statistiques')}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Statistiques
                      <Badge variant="secondary" className="text-xs">Pasteur</Badge>
                    </CardTitle>
                    <CardDescription>
                      Consulter les statistiques de présence et analyses
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Voir les statistiques
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {!isPasteur && (
          <Card className="mt-6 border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <p className="text-sm text-amber-800">
                <strong>ℹ️ Mode Recenseur :</strong> Vous avez accès uniquement à la gestion des présences. Pour accéder à la gestion des fidèles et aux statistiques, contactez le pasteur.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}