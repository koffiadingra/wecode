import { useState } from 'react';
import { X, User, Award, Calendar, TrendingUp, Target, CheckCircle, LogOut, Upload, Lock, Download, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { projectId, publicAnonKey } from '../utils/supabase/info';

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

interface Bulletin {
  technicalScore: number;
  disciplineScore: number;
  physicalScore: number;
  averageScore: number;
  comments?: string;
  createdAt: string;
}

const mockUser: UserProfile = {
  id: "1",
  name: "Kouassi Jean-Paul",
  username: "jeanpaulkouassi",
  belt: "Noir",
  degree: 2,
  yearStarted: 2018,
  nextBeltTest: "2026-03-15",
  attendanceRate: 85,
  totalSessions: 142,
};

const recentAttendance = [
  { date: "2024-12-21", session: "Samedi 16h-18h30", present: true },
  { date: "2024-12-18", session: "Mercredi 16h-18h30", present: true },
  { date: "2024-12-15", session: "Dimanche 15h30-18h", present: false },
  { date: "2024-12-14", session: "Samedi 16h-18h30", present: true },
  { date: "2024-12-11", session: "Mercredi 16h-18h30", present: true },
];

const beltProgression = [
  { belt: "Blanc", degree: 1, date: "2018-01", achieved: true },
  { belt: "Jaune", degree: 3, date: "2019-06", achieved: true },
  { belt: "Rouge", degree: 3, date: "2020-09", achieved: true },
  { belt: "Vert", degree: 2, date: "2021-11", achieved: true },
  { belt: "Bleu", degree: 3, date: "2022-12", achieved: true },
  { belt: "Marron", degree: 3, date: "2023-11", achieved: true },
  { belt: "Noir", degree: 2, date: "2024-09", achieved: true },
  { belt: "Noir", degree: 3, date: "2026-03", achieved: false },
];

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

export function PratiquantDashboard({ 
  userProfile,
  accessToken, 
  onLogout 
}: { 
  userProfile: UserProfile;
  accessToken: string;
  onLogout: () => void;
}) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [bulletin, setBulletin] = useState<Bulletin | null>(null);
  const [profile, setProfile] = useState<UserProfile>(userProfile);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    if (!photoFile || !photoPreview) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/practitioner/upload-photo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            photoData: photoPreview,
            fileName: `profile-${Date.now()}.jpg`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Échec de l\'upload de la photo');
      }

      const data = await response.json();
      setProfile({ ...profile, photoUrl: data.photoUrl });
      setMessage('Photo de profil mise à jour avec succès !');
      setTimeout(() => {
        setShowPhotoModal(false);
        setMessage('');
      }, 2000);
    } catch (err: any) {
      setMessage(err.message || 'Erreur lors de l\'upload');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/practitioner/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error('Échec du changement de mot de passe');
      }

      setMessage('Mot de passe modifié avec succès !');
      setTimeout(() => {
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
      }, 2000);
    } catch (err: any) {
      setMessage(err.message || 'Erreur lors du changement');
    } finally {
      setLoading(false);
    }
  };

  const loadBulletin = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-08451ed6/practitioner/bulletin`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBulletin(data.bulletin);
      }
    } catch (err) {
      console.error('Load bulletin error:', err);
    }
  };

  const generateBulletinPDF = async () => {
    // Dynamically import jspdf
    const { default: jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(220, 38, 38);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('SHAIDA', 105, 15, { align: 'center' });
    doc.setFontSize(14);
    doc.text('Bulletin de Progression', 105, 28, { align: 'center' });
    
    // Practitioner info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Nom: ${profile.name}`, 20, 60);
    doc.text(`Ceinture: ${profile.belt} - ${profile.degree}° degré`, 20, 70);
    doc.text(`Membre depuis: ${profile.yearStarted}`, 20, 80);
    
    // Scores (if bulletin exists)
    if (bulletin) {
      doc.setFontSize(14);
      doc.text('Notes', 20, 100);
      
      doc.setFontSize(12);
      doc.text(`Technique: ${bulletin.technicalScore}/20`, 20, 115);
      doc.text(`Discipline: ${bulletin.disciplineScore}/20`, 20, 125);
      doc.text(`Physique: ${bulletin.physicalScore}/20`, 20, 135);
      doc.setFontSize(14);
      doc.text(`Moyenne générale: ${bulletin.averageScore}/20`, 20, 150);
      
      if (bulletin.comments) {
        doc.setFontSize(12);
        doc.text('Commentaires:', 20, 170);
        const lines = doc.splitTextToSize(bulletin.comments, 170);
        doc.text(lines, 20, 180);
      }
    }
    
    // Stats
    doc.setFontSize(14);
    doc.text('Statistiques', 20, bulletin ? 220 : 100);
    doc.setFontSize(12);
    doc.text(`Séances totales: ${profile.totalSessions}`, 20, bulletin ? 235 : 115);
    doc.text(`Taux de présence: ${profile.attendanceRate}%`, 20, bulletin ? 245 : 125);
    doc.text(`Années de pratique: ${new Date().getFullYear() - profile.yearStarted}`, 20, bulletin ? 255 : 135);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Dojo SHAIDA - Carrefour marché d\'Adjouffou, Port-Bouët, Abidjan', 105, 280, { align: 'center' });
    doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')}`, 105, 287, { align: 'center' });
    
    // Save
    doc.save(`bulletin-${profile.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  const handleDownloadBulletin = async () => {
    setLoading(true);
    await loadBulletin();
    await generateBulletinPDF();
    setLoading(false);
  };

  return (
    <>
      {/* Profile Header */}
      <Card className="p-8 mb-8 bg-gradient-to-r from-neutral-900 to-red-900 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative">
            {profile.photoUrl ? (
              <img 
                src={profile.photoUrl} 
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                {profile.name.charAt(0)}
              </div>
            )}
            <button
              onClick={() => setShowPhotoModal(true)}
              className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full hover:bg-red-700 transition-colors"
            >
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl mb-2">{profile.name}</h2>
            <p className="text-neutral-200 mb-4">@{profile.username}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className={`px-4 py-2 rounded-full border-2 ${getBeltColor(profile.belt)}`}>
                Ceinture {profile.belt} - {profile.degree}° degré
              </div>
              <Badge variant="secondary" className="px-4 py-2">
                Membre depuis {profile.yearStarted}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-red-600" size={24} />
                <div className="text-2xl">{profile.totalSessions}</div>
              </div>
              <p className="text-neutral-600">Séances totales</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-green-600" size={24} />
                <div className="text-2xl">{profile.attendanceRate}%</div>
              </div>
              <p className="text-neutral-600">Taux de présence</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-amber-600" size={24} />
                <div className="text-2xl">{new Date().getFullYear() - profile.yearStarted}</div>
              </div>
              <p className="text-neutral-600">Années de pratique</p>
            </Card>
          </div>

          {/* Recent Attendance */}
          <Card className="p-6">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Calendar size={24} className="text-red-600" />
              Présences récentes
            </h3>
            <div className="space-y-3">
              {recentAttendance.map((attendance, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      {new Date(attendance.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-neutral-600">{attendance.session}</div>
                  </div>
                  <div>
                    {attendance.present ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle size={16} className="mr-1" />
                        Présent
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Absent</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Belt Progression */}
          <Card className="p-6">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Award size={24} className="text-red-600" />
              Progression des ceintures
            </h3>
            <div className="space-y-4">
              {beltProgression.map((progression, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    progression.achieved ? 'bg-green-50' : 'bg-neutral-50'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      progression.achieved ? 'bg-green-500' : 'bg-neutral-300'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full border-2 ${getBeltColor(progression.belt)}`}>
                        {progression.belt}
                      </span>
                      <span className="text-neutral-600">{progression.degree}° degré</span>
                    </div>
                    <div className="text-neutral-600 mt-1">
                      {progression.achieved ? 'Obtenu le' : 'Passage prévu le'}{' '}
                      {new Date(progression.date).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                  {progression.achieved && (
                    <CheckCircle className="text-green-500" size={24} />
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Next Belt Test */}
          {profile.nextBeltTest && (
            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Target size={24} className="text-red-600" />
                Prochain objectif
              </h3>
              <div className={`px-4 py-2 rounded-full border-2 ${getBeltColor('Noir')} mb-4 inline-block`}>
                Ceinture Noir - 3° degré
              </div>
              <p className="text-neutral-700 mb-4">
                Passage de grade prévu le{' '}
                {new Date(profile.nextBeltTest).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-xl mb-4">Actions rapides</h3>
            <div className="space-y-3">
              <Button 
                onClick={() => setShowPasswordModal(true)}
                variant="outline" 
                className="w-full justify-start"
              >
                <Lock className="mr-2" size={18} />
                Changer mon mot de passe
              </Button>
              <Button 
                onClick={handleDownloadBulletin}
                variant="outline" 
                className="w-full justify-start"
                disabled={loading}
              >
                <Download className="mr-2" size={18} />
                {loading ? 'Génération...' : 'Télécharger mon bulletin'}
              </Button>
              <Button 
                onClick={onLogout}
                variant="outline" 
                className="w-full justify-start text-red-600 hover:text-red-700"
              >
                <LogOut className="mr-2" size={18} />
                Déconnexion
              </Button>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6">
            <h3 className="text-xl mb-4">Distinctions</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center text-xl">
                  🏆
                </div>
                <div>
                  <div>Meilleure assiduité 2024</div>
                  <div className="text-neutral-600">{profile.attendanceRate}% de présence</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-xl">
                  ⭐
                </div>
                <div>
                  <div>{new Date().getFullYear() - profile.yearStarted} ans de pratique</div>
                  <div className="text-neutral-600">Depuis {profile.yearStarted}</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl mb-6">Changer ma photo de profil</h2>

            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Preview" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-neutral-200"
                  />
                ) : (
                  <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center">
                    <Camera size={48} className="text-neutral-400" />
                  </div>
                )}

                <Label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Choisir une photo
                  </div>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </Label>
              </div>

              {message && (
                <div className={`text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}

              {photoFile && (
                <Button
                  onClick={handlePhotoUpload}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Envoi en cours...' : 'Enregistrer la photo'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl mb-6">Changer mon mot de passe</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2"
                />
              </div>

              {message && (
                <div className={`text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}

              <Button
                onClick={handlePasswordChange}
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? 'Modification en cours...' : 'Changer le mot de passe'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
