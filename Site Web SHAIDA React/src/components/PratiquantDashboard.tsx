import { useState } from 'react';
import { X, User, Award, Calendar, TrendingUp, Target, CheckCircle, LogOut, Upload, Lock, Download, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

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

const mockBulletin: Bulletin = {
  technicalScore: 17,
  disciplineScore: 18,
  physicalScore: 16,
  averageScore: 17,
  comments: "Excellent travail. Continue à perfectionner tes techniques de frappe.",
  createdAt: "2024-12-01"
};

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
  onClose,
  onLogout 
}: { 
  userProfile: UserProfile;
  onClose: () => void;
  onLogout: () => void;
}) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>(userProfile.photoUrl || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState<UserProfile>(userProfile);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Simulation de délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile({ ...profile, photoUrl: photoPreview });
      setMessage('Photo de profil mise à jour avec succès !');
      setTimeout(() => {
        setShowPhotoModal(false);
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage('Erreur lors de la mise à jour de la photo.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Simulation de délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Mot de passe modifié avec succès !');
      setTimeout(() => {
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage('Erreur lors du changement de mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBulletin = () => {
    // Créer un bulletin PDF fictif
    const bulletinContent = `
BULLETIN DE PRATIQUANT - DOJO SHAIDA
=====================================

Nom: ${profile.name}
Ceinture: ${profile.belt} ${profile.degree}° DUAN
Date d'inscription: ${profile.yearStarted}

ÉVALUATION TECHNIQUE
-------------------
Note technique: ${mockBulletin.technicalScore}/20
Note discipline: ${mockBulletin.disciplineScore}/20
Note physique: ${mockBulletin.physicalScore}/20

MOYENNE GÉNÉRALE: ${mockBulletin.averageScore}/20

Commentaires: ${mockBulletin.comments}

Taux de présence: ${profile.attendanceRate}%
Nombre total de sessions: ${profile.totalSessions}

---
Grand Maître KOUAME Ahoussi Eugene
Dojo SHAIDA - Port-Bouët, Abidjan
    `.trim();

    const blob = new Blob([bulletinContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulletin_${profile.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="bg-white rounded-2xl max-w-6xl mx-auto shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white p-8 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-6">
              <div className="relative group">
                {profile.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg">
                    <User size={48} className="text-white" />
                  </div>
                )}
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="absolute bottom-0 right-0 bg-white text-red-600 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                  title="Changer la photo"
                >
                  <Camera size={16} />
                </button>
              </div>

              <div className="flex-1">
                <h2 className="text-3xl mb-2">{profile.name}</h2>
                <div className="flex items-center gap-4">
                  <Badge className={`${getBeltColor(profile.belt)} border-2 px-3 py-1`}>
                    Ceinture {profile.belt} - {profile.degree}° DUAN
                  </Badge>
                  <span className="text-white/90">Depuis {profile.yearStarted}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPasswordModal(true)}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Lock size={16} className="mr-2" />
                  Changer le mot de passe
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <LogOut size={16} className="mr-2" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Target size={24} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Taux de présence</p>
                    <p className="text-2xl">{profile.attendanceRate}%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Sessions totales</p>
                    <p className="text-2xl">{profile.totalSessions}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Prochain passage</p>
                    <p className="text-lg">
                      {profile.nextBeltTest 
                        ? new Date(profile.nextBeltTest).toLocaleDateString('fr-FR')
                        : 'Non défini'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Progression */}
              <Card className="p-6">
                <h3 className="text-xl mb-6 flex items-center gap-2">
                  <Award className="text-red-600" />
                  Progression des ceintures
                </h3>
                <div className="space-y-4">
                  {beltProgression.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-16 h-10 rounded border-2 ${getBeltColor(item.belt)} flex items-center justify-center text-sm`}>
                        {item.degree}°
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{item.belt} - Degré {item.degree}</p>
                        <p className="text-xs text-neutral-500">{item.date}</p>
                      </div>
                      {item.achieved ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-neutral-300" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Présences récentes */}
              <Card className="p-6">
                <h3 className="text-xl mb-6 flex items-center gap-2">
                  <Calendar className="text-red-600" />
                  Présences récentes
                </h3>
                <div className="space-y-3">
                  {recentAttendance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                      <div>
                        <p className="text-sm">{item.session}</p>
                        <p className="text-xs text-neutral-500">
                          {new Date(item.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      {item.present ? (
                        <Badge className="bg-green-100 text-green-800">Présent</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Absent</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Bulletin */}
            <Card className="p-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl flex items-center gap-2">
                  <Award className="text-red-600" />
                  Mon bulletin
                </h3>
                <Button
                  onClick={handleDownloadBulletin}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Download size={16} className="mr-2" />
                  Télécharger mon bulletin
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-600 mb-1">Technique</p>
                  <p className="text-3xl text-blue-600">{mockBulletin.technicalScore}/20</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-600 mb-1">Discipline</p>
                  <p className="text-3xl text-green-600">{mockBulletin.disciplineScore}/20</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-600 mb-1">Physique</p>
                  <p className="text-3xl text-amber-600">{mockBulletin.physicalScore}/20</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-neutral-600 mb-1">Moyenne</p>
                  <p className="text-3xl text-red-600">{mockBulletin.averageScore}/20</p>
                </div>
              </div>

              {mockBulletin.comments && (
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <p className="text-sm text-neutral-600 mb-1">Commentaires de l'instructeur</p>
                  <p className="text-neutral-800">{mockBulletin.comments}</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Changer la photo de profil</h3>
              <button onClick={() => setShowPhotoModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-neutral-200 flex items-center justify-center">
                    <User size={48} className="text-neutral-400" />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="photo">Sélectionner une photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="mt-1"
                />
              </div>

              {message && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm text-center">{message}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPhotoModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handlePhotoUpload}
                  disabled={!photoPreview || loading}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Upload...' : 'Enregistrer'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl">Changer le mot de passe</h3>
              <button onClick={() => setShowPasswordModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              {message && (
                <div className={`p-3 ${message.includes('succès') ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg`}>
                  <p className={`${message.includes('succès') ? 'text-green-600' : 'text-red-600'} text-sm text-center`}>{message}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPasswordModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handlePasswordChange}
                  disabled={!newPassword || !confirmPassword || loading}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Changement...' : 'Changer'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
