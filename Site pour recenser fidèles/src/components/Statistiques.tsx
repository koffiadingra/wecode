import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/config';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { ArrowLeft, Church, TrendingUp, Users, Calendar, Award } from 'lucide-react';

interface Fidele {
  id: string;
  nom: string;
  prenom: string;
  photo: string | null;
  dateAdhesion: string;
  fonction?: string;
  service?: string;
  telephone?: string;
  lieuResidence?: string;
}

interface Presence {
  fideleId: string;
  date: string;
  present: boolean;
  markedAt: string;
}

interface Stats {
  totalFideles: number;
  nouveauxCeMois: number;
  tauxPresenceMoyen: number;
  dernierePresence: string | null;
  presencesParDate: Record<string, { present: number; absent: number; total: number }>;
  presencesParFonction: Record<string, number>;
  presencesParService: Record<string, number>;
}

export function Statistiques() {
  const navigate = useNavigate();
  const [fideles, setFideles] = useState<Fidele[]>([]);
  const [presences, setPresences] = useState<Presence[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalFideles: 0,
    nouveauxCeMois: 0,
    tauxPresenceMoyen: 0,
    dernierePresence: null,
    presencesParDate: {},
    presencesParFonction: {},
    presencesParService: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/');
        return;
      }

      // Vérifier le rôle de l'utilisateur
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== 'pasteur') {
            toast.error('Accès refusé : seuls les pasteurs peuvent voir les statistiques');
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    });
  };

  const loadData = async () => {
    try {
      // Charger les fidèles
      const fidelesSnapshot = await getDocs(collection(db, 'fideles'));
      const fidelesData: Fidele[] = [];
      fidelesSnapshot.forEach((doc) => {
        fidelesData.push({ id: doc.id, ...doc.data() } as Fidele);
      });

      // Charger les présences
      const presencesSnapshot = await getDocs(collection(db, 'presences'));
      const presencesData: Presence[] = [];
      presencesSnapshot.forEach((doc) => {
        presencesData.push(doc.data() as Presence);
      });

      setFideles(fidelesData);
      setPresences(presencesData);
      calculateStats(fidelesData, presencesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (fidelesData: Fidele[], presencesData: Presence[]) => {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total fidèles
    const totalFideles = fidelesData.length;

    // Nouveaux ce mois
    const nouveauxCeMois = fidelesData.filter(f => {
      const dateAdhesion = new Date(f.dateAdhesion);
      return dateAdhesion >= firstDayOfMonth;
    }).length;

    // Présences par date
    const presencesParDate: Record<string, { present: number; absent: number; total: number }> = {};
    presencesData.forEach(p => {
      if (!presencesParDate[p.date]) {
        presencesParDate[p.date] = { present: 0, absent: 0, total: 0 };
      }
      if (p.present) {
        presencesParDate[p.date].present++;
      } else {
        presencesParDate[p.date].absent++;
      }
      presencesParDate[p.date].total++;
    });

    // Taux de présence moyen
    const dates = Object.keys(presencesParDate);
    let totalPresenceRate = 0;
    dates.forEach(date => {
      const stat = presencesParDate[date];
      const rate = (stat.present / totalFideles) * 100;
      totalPresenceRate += rate;
    });
    const tauxPresenceMoyen = dates.length > 0 ? totalPresenceRate / dates.length : 0;

    // Dernière présence
    const sortedDates = dates.sort().reverse();
    const dernierePresence = sortedDates.length > 0 ? sortedDates[0] : null;

    // Présences par fonction
    const presencesParFonction: Record<string, number> = {};
    fidelesData.forEach(f => {
      const fonction = f.fonction || 'Non défini';
      const fidelePresences = presencesData.filter(p => p.fideleId === f.id && p.present);
      presencesParFonction[fonction] = (presencesParFonction[fonction] || 0) + fidelePresences.length;
    });

    // Présences par service
    const presencesParService: Record<string, number> = {};
    fidelesData.forEach(f => {
      const service = f.service || 'Non défini';
      const fidelePresences = presencesData.filter(p => p.fideleId === f.id && p.present);
      presencesParService[service] = (presencesParService[service] || 0) + fidelePresences.length;
    });

    setStats({
      totalFideles,
      nouveauxCeMois,
      tauxPresenceMoyen,
      dernierePresence,
      presencesParDate,
      presencesParFonction,
      presencesParService,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  const dernierCulteStats = stats.dernierePresence
    ? stats.presencesParDate[stats.dernierePresence]
    : null;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec le nom de l'église */}
        <div className="flex items-center gap-3 mb-6">
          <Church className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Chapelle Pleine de Gloire
          </h1>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
          <Badge variant="default" className="bg-purple-600">
            📊 Statistiques
          </Badge>
        </div>

        {/* Cartes de statistiques principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-2 border-indigo-100">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Fidèles
              </CardDescription>
              <CardTitle className="text-3xl">{stats.totalFideles}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                Membres enregistrés
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Nouveaux ce mois
              </CardDescription>
              <CardTitle className="text-3xl">{stats.nouveauxCeMois}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                Nouveaux membres
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Taux de présence
              </CardDescription>
              <CardTitle className="text-3xl">{stats.tauxPresenceMoyen.toFixed(0)}%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                Moyenne générale
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-100">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dernier culte
              </CardDescription>
              <CardTitle className="text-3xl">
                {dernierCulteStats ? dernierCulteStats.present : 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500">
                {stats.dernierePresence
                  ? new Date(stats.dernierePresence).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
                  : 'Aucune donnée'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Présences par date */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Historique des présences</CardTitle>
            <CardDescription>Évolution des présences par dimanche</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(stats.presencesParDate).length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Aucune donnée de présence disponible
              </p>
            ) : (
              <div className="space-y-4">
                {Object.keys(stats.presencesParDate)
                  .sort()
                  .reverse()
                  .slice(0, 10)
                  .map((date) => {
                    const stat = stats.presencesParDate[date];
                    const tauxPresence = ((stat.present / stats.totalFideles) * 100).toFixed(0);
                    
                    return (
                      <div key={date} className="flex items-center gap-4">
                        <div className="w-32 text-sm font-medium">
                          {new Date(date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-end pr-2"
                                style={{ width: `${tauxPresence}%` }}
                              >
                                {Number(tauxPresence) > 15 && (
                                  <span className="text-xs font-medium text-white">
                                    {tauxPresence}%
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-sm font-medium w-16 text-right">
                              {stat.present}/{stats.totalFideles}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Présences par fonction et service */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Présences par fonction</CardTitle>
              <CardDescription>Répartition des présences selon les fonctions</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(stats.presencesParFonction).length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune donnée</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(stats.presencesParFonction)
                    .sort(([, a], [, b]) => b - a)
                    .map(([fonction, count]) => (
                      <div key={fonction} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{fonction}</span>
                        <Badge variant="secondary">{count} présences</Badge>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Présences par service</CardTitle>
              <CardDescription>Répartition des présences selon les services</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(stats.presencesParService).length === 0 ? (
                <p className="text-center text-gray-500 py-8">Aucune donnée</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(stats.presencesParService)
                    .sort(([, a], [, b]) => b - a)
                    .map(([service, count]) => (
                      <div key={service} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{service}</span>
                        <Badge variant="secondary">{count} présences</Badge>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}