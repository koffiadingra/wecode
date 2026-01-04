import { useState, useEffect } from 'react';
import { X, Users, Calendar, Newspaper, Award, LogOut, Plus, Edit, Trash2, FileText, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface Practitioner {
  id: string;
  name: string;
  username?: string;
  belt: string;
  degree: number;
  yearStarted: number;
  attendanceRate: number;
  password?: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  description?: string;
  imageUrl?: string;
}

interface BulletinEntry {
  id: string;
  practitionerName: string;
  belt: string;
  degree: number;
  technicalScore: number;
  disciplineScore: number;
  physicalScore: number;
  averageScore: number;
  comments: string;
}

interface Admin {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  createdBy: string;
}

interface AttendanceRecord {
  id: string;
  practitionerId: string;
  date: string;
  present: boolean;
  sessionType: 'mercredi' | 'samedi' | 'dimanche';
}

const mockPractitioners: Practitioner[] = [
  { id: '1', name: 'Jean Kouassi', belt: 'Jaune', degree: 1, yearStarted: 2023, attendanceRate: 85 },
  { id: '2', name: 'Marie Koné', belt: 'Vert', degree: 2, yearStarted: 2021, attendanceRate: 92 },
  { id: '3', name: 'Yao Bamba', belt: 'Noir', degree: 3, yearStarted: 2018, attendanceRate: 96 },
  { id: '4', name: 'Aya Touré', belt: 'Bleu', degree: 2, yearStarted: 2020, attendanceRate: 88 },
  { id: '5', name: 'Koffi Mensah', belt: 'Marron', degree: 3, yearStarted: 2019, attendanceRate: 94 },
];

const mockNews: NewsItem[] = [
  { id: '1', title: 'Compétition Nationale SHAIDA 2025', category: 'Compétition', date: '2024-12-20', author: 'Grand Maître KOUAME', content: '' },
  { id: '2', title: 'Stage de perfectionnement en janvier', category: 'Stage', date: '2024-12-18', author: 'Grand Maître KOUAME', content: '' },
  { id: '3', title: 'Nouveaux horaires pour les débutants', category: 'Information', date: '2024-12-15', author: 'Grand Maître KOUAME', content: '' },
  { id: '4', title: 'Passage de grade de décembre - Résultats', category: 'Résultats', date: '2024-12-08', author: 'Grand Maître KOUAME', content: '' },
];

const mockBulletins: BulletinEntry[] = [
  { id: '1', practitionerName: 'Jean Kouassi', belt: 'Jaune', degree: 1, technicalScore: 15, disciplineScore: 16, physicalScore: 14, averageScore: 15, comments: '' },
  { id: '2', practitionerName: 'Marie Koné', belt: 'Vert', degree: 2, technicalScore: 17, disciplineScore: 18, physicalScore: 16, averageScore: 17, comments: '' },
  { id: '3', practitionerName: 'Yao Bamba', belt: 'Noir', degree: 3, technicalScore: 19, disciplineScore: 19, physicalScore: 18, averageScore: 19, comments: '' },
];

const getBeltColor = (belt: string): string => {
  const colors: { [key: string]: string } = {
    'Blanc': 'bg-gray-100 text-gray-800',
    'Jaune': 'bg-yellow-400 text-yellow-900',
    'Rouge': 'bg-red-600 text-white',
    'Vert': 'bg-green-600 text-white',
    'Bleu': 'bg-blue-600 text-white',
    'Marron': 'bg-amber-800 text-white',
    'Noir': 'bg-neutral-900 text-white'
  };
  return colors[belt] || 'bg-gray-200 text-gray-800';
};

export function AdminDashboard({ 
  onClose,
  onLogout,
  currentAdmin = 'admin',
  admins: externalAdmins,
  setAdmins: externalSetAdmins
}: { 
  onClose: () => void;
  onLogout: () => void;
  currentAdmin?: string;
  admins?: Admin[];
  setAdmins?: React.Dispatch<React.SetStateAction<Admin[]>>;
}) {
  const [activeTab, setActiveTab] = useState<'practitioners' | 'news' | 'bulletins' | 'admins' | 'attendance'>('practitioners');
  const [practitioners, setPractitioners] = useState<Practitioner[]>(mockPractitioners);
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [bulletins, setBulletins] = useState<BulletinEntry[]>(mockBulletins);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  
  // Use external admins if provided, otherwise use local state
  const admins = externalAdmins || [
    { id: '1', username: 'admin', password: 'admin123', createdAt: new Date().toISOString(), createdBy: 'system' }
  ];
  const setAdmins = externalSetAdmins || (() => {});
  
  // Modal states for Practitioners
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPractitioner, setSelectedPractitioner] = useState<Practitioner | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    username: '',
    belt: 'Blanc',
    degree: 1,
    yearStarted: new Date().getFullYear(),
    attendanceRate: 0,
    password: ''
  });

  // Modal states for News
  const [showEditNewsModal, setShowEditNewsModal] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Information',
    date: new Date().toISOString().split('T')[0],
    author: 'Grand Maître KOUAME',
    content: '',
    description: '',
    imageUrl: ''
  });

  // Modal states for Bulletins
  const [showEditBulletinModal, setShowEditBulletinModal] = useState(false);
  const [showAddBulletinModal, setShowAddBulletinModal] = useState(false);
  const [selectedBulletin, setSelectedBulletin] = useState<BulletinEntry | null>(null);
  const [bulletinForm, setBulletinForm] = useState({
    practitionerName: '',
    belt: 'Blanc',
    degree: 1,
    technicalScore: 0,
    disciplineScore: 0,
    physicalScore: 0,
    comments: ''
  });

  // Modal states for Belt Test
  const [showBeltTestModal, setShowBeltTestModal] = useState(false);
  const [beltTestMode, setBeltTestMode] = useState<'all' | 'individual'>('individual');
  const [selectedPractitionerForTest, setSelectedPractitionerForTest] = useState<Practitioner | null>(null);
  const [beltTestDate, setBeltTestDate] = useState('');

  // Modal states for Admins
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminForm, setAdminForm] = useState({
    username: '',
    password: ''
  });

  // Modal states for Attendance
  const [selectedAttendanceDate, setSelectedAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceForDate, setAttendanceForDate] = useState<{[key: string]: boolean}>({});

  // Load attendance when switching to attendance tab
  useEffect(() => {
    if (activeTab === 'attendance') {
      const records = attendanceRecords.filter(r => r.date === selectedAttendanceDate);
      const attendanceMap: {[key: string]: boolean} = {};
      records.forEach(r => {
        attendanceMap[r.practitionerId] = r.present;
      });
      setAttendanceForDate(attendanceMap);
    }
  }, [activeTab]);

  // Practitioners handlers
  const handleEditClick = (practitioner: Practitioner) => {
    setSelectedPractitioner(practitioner);
    setEditForm({
      name: practitioner.name,
      username: practitioner.username || '',
      belt: practitioner.belt,
      degree: practitioner.degree,
      yearStarted: practitioner.yearStarted,
      attendanceRate: practitioner.attendanceRate,
      password: practitioner.password || ''
    });
    setShowEditModal(true);
  };

  const handleAddClick = () => {
    setEditForm({
      name: '',
      username: '',
      belt: 'Blanc',
      degree: 1,
      yearStarted: new Date().getFullYear(),
      attendanceRate: 0,
      password: ''
    });
    setShowAddModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedPractitioner) {
      setPractitioners(practitioners.map(p => 
        p.id === selectedPractitioner.id 
          ? { ...p, ...editForm }
          : p
      ));
      setShowEditModal(false);
      setSelectedPractitioner(null);
    }
  };

  const handleAddPractitioner = () => {
    const newPractitioner: Practitioner = {
      id: String(practitioners.length + 1),
      ...editForm
    };
    setPractitioners([...practitioners, newPractitioner]);
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pratiquant ?')) {
      setPractitioners(practitioners.filter(p => p.id !== id));
    }
  };

  // News handlers
  const handleEditNewsClick = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setNewsForm({
      title: newsItem.title,
      category: newsItem.category,
      date: newsItem.date,
      author: newsItem.author,
      content: '',
      description: newsItem.description || '',
      imageUrl: newsItem.imageUrl || ''
    });
    setShowEditNewsModal(true);
  };

  const handleAddNewsClick = () => {
    setNewsForm({
      title: '',
      category: 'Information',
      date: new Date().toISOString().split('T')[0],
      author: 'Grand Maître KOUAME',
      content: '',
      description: '',
      imageUrl: ''
    });
    setShowAddNewsModal(true);
  };

  const handleSaveNewsEdit = () => {
    if (selectedNews) {
      setNews(news.map(n => 
        n.id === selectedNews.id 
          ? { ...n, ...newsForm }
          : n
      ));
      setShowEditNewsModal(false);
      setSelectedNews(null);
    }
  };

  const handleAddNews = () => {
    const newNews: NewsItem = {
      id: String(news.length + 1),
      ...newsForm
    };
    setNews([...news, newNews]);
    setShowAddNewsModal(false);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  // Bulletins handlers
  const handleEditBulletinClick = (bulletin: BulletinEntry) => {
    setSelectedBulletin(bulletin);
    setBulletinForm({
      practitionerName: bulletin.practitionerName,
      belt: bulletin.belt,
      degree: bulletin.degree,
      technicalScore: bulletin.technicalScore,
      disciplineScore: bulletin.disciplineScore,
      physicalScore: bulletin.physicalScore,
      comments: ''
    });
    setShowEditBulletinModal(true);
  };

  const handleAddBulletinClick = () => {
    setBulletinForm({
      practitionerName: '',
      belt: 'Blanc',
      degree: 1,
      technicalScore: 0,
      disciplineScore: 0,
      physicalScore: 0,
      comments: ''
    });
    setShowAddBulletinModal(true);
  };

  const handleSaveBulletinEdit = () => {
    if (selectedBulletin) {
      const average = Math.round((bulletinForm.technicalScore + bulletinForm.disciplineScore + bulletinForm.physicalScore) / 3);
      setBulletins(bulletins.map(b => 
        b.id === selectedBulletin.id 
          ? { ...b, ...bulletinForm, averageScore: average }
          : b
      ));
      setShowEditBulletinModal(false);
      setSelectedBulletin(null);
    }
  };

  const handleAddBulletin = () => {
    const average = Math.round((bulletinForm.technicalScore + bulletinForm.disciplineScore + bulletinForm.physicalScore) / 3);
    const newBulletin: BulletinEntry = {
      id: String(bulletins.length + 1),
      ...bulletinForm,
      averageScore: average
    };
    setBulletins([...bulletins, newBulletin]);
    setShowAddBulletinModal(false);
  };

  const handleDeleteBulletin = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bulletin ?')) {
      setBulletins(bulletins.filter(b => b.id !== id));
    }
  };

  // Belt Test handlers
  const handleOpenBeltTestForAll = () => {
    setBeltTestMode('all');
    setBeltTestDate('');
    setShowBeltTestModal(true);
  };

  const handleOpenBeltTestForIndividual = (practitioner: Practitioner) => {
    setBeltTestMode('individual');
    setSelectedPractitionerForTest(practitioner);
    setBeltTestDate('');
    setShowBeltTestModal(true);
  };

  const handleSaveBeltTest = () => {
    if (!beltTestDate) {
      alert('Veuillez sélectionner une date');
      return;
    }

    if (beltTestMode === 'all') {
      // Appliquer la date à tous les pratiquants
      alert(`Date de passage de ceinture définie pour tous les pratiquants: ${new Date(beltTestDate).toLocaleDateString('fr-FR')}`);
    } else if (selectedPractitionerForTest) {
      // Appliquer la date à un pratiquant spécifique
      alert(`Date de passage de ceinture définie pour ${selectedPractitionerForTest.name}: ${new Date(beltTestDate).toLocaleDateString('fr-FR')}`);
    }

    setShowBeltTestModal(false);
    setSelectedPractitionerForTest(null);
    setBeltTestDate('');
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image est trop grande. La taille maximale est de 5 Mo.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsForm({ ...newsForm, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Admin handlers
  const handleAddAdmin = () => {
    if (!adminForm.username || !adminForm.password) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (admins.some(a => a.username === adminForm.username)) {
      alert('Cet identifiant existe déjà');
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      username: adminForm.username,
      password: adminForm.password,
      createdAt: new Date().toISOString(),
      createdBy: currentAdmin
    };

    setAdmins([...admins, newAdmin]);
    setShowAddAdminModal(false);
    setAdminForm({ username: '', password: '' });
  };

  const handleDeleteAdmin = (id: string) => {
    if (admins.find(a => a.id === id)?.username === 'admin') {
      alert('Impossible de supprimer le compte administrateur principal');
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) {
      setAdmins(admins.filter(a => a.id !== id));
    }
  };

  // Attendance handlers
  const getSessionType = (date: string): 'mercredi' | 'samedi' | 'dimanche' | null => {
    const dayOfWeek = new Date(date).getDay();
    if (dayOfWeek === 3) return 'mercredi';
    if (dayOfWeek === 6) return 'samedi';
    if (dayOfWeek === 0) return 'dimanche';
    return null;
  };

  const loadAttendanceForDate = (date: string) => {
    setSelectedAttendanceDate(date);
    const records = attendanceRecords.filter(r => r.date === date);
    const attendanceMap: {[key: string]: boolean} = {};
    records.forEach(r => {
      attendanceMap[r.practitionerId] = r.present;
    });
    setAttendanceForDate(attendanceMap);
  };

  const toggleAttendance = (practitionerId: string) => {
    setAttendanceForDate({
      ...attendanceForDate,
      [practitionerId]: !attendanceForDate[practitionerId]
    });
  };

  const saveAttendance = () => {
    const sessionType = getSessionType(selectedAttendanceDate);
    if (!sessionType) {
      alert('Cette date ne correspond pas à un jour d\'entraînement (mercredi, samedi ou dimanche)');
      return;
    }

    // Remove existing records for this date
    const filteredRecords = attendanceRecords.filter(r => r.date !== selectedAttendanceDate);
    
    // Add new records
    const newRecords: AttendanceRecord[] = practitioners.map(p => ({
      id: `${p.id}-${selectedAttendanceDate}`,
      practitionerId: p.id,
      date: selectedAttendanceDate,
      present: attendanceForDate[p.id] || false,
      sessionType
    }));

    const updatedRecords = [...filteredRecords, ...newRecords];
    setAttendanceRecords(updatedRecords);

    // Update attendance rates
    const updatedPractitioners = practitioners.map(p => {
      const practitionerRecords = updatedRecords.filter(r => r.practitionerId === p.id);
      const totalSessions = practitionerRecords.length;
      const presentSessions = practitionerRecords.filter(r => r.present).length;
      const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;
      
      return { ...p, attendanceRate };
    });

    setPractitioners(updatedPractitioners);
    alert('Présences enregistrées avec succès !');
  };

  const calculateAttendanceRate = (practitionerId: string): number => {
    const records = attendanceRecords.filter(r => r.practitionerId === practitionerId);
    if (records.length === 0) return 0;
    const present = records.filter(r => r.present).length;
    return Math.round((present / records.length) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="bg-white rounded-2xl max-w-7xl mx-auto shadow-2xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white p-8 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl mb-2 flex items-center gap-3">
                  <Shield size={32} />
                  Tableau de bord administrateur
                </h2>
                <p className="text-white/90">Gestion complète du dojo SHAIDA</p>
              </div>

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

          {/* Stats Overview */}
          <div className="p-8 bg-neutral-50 border-b">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Pratiquants</p>
                    <p className="text-2xl">{practitioners.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Newspaper size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Actualités</p>
                    <p className="text-2xl">{news.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <Award size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Bulletins</p>
                    <p className="text-2xl">{bulletins.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Calendar size={24} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Taux présence moyen</p>
                    <p className="text-2xl">91%</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex gap-4 p-6">
              <button
                onClick={() => setActiveTab('practitioners')}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'practitioners'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Users size={18} />
                Pratiquants
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'news'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Newspaper size={18} />
                Actualités
              </button>
              <button
                onClick={() => setActiveTab('bulletins')}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'bulletins'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <FileText size={18} />
                Bulletins
              </button>
              <button
                onClick={() => setActiveTab('admins')}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'admins'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Shield size={18} />
                Administrateurs
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'attendance'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Calendar size={18} />
                Présences
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'practitioners' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Gestion des pratiquants</h3>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={handleOpenBeltTestForAll}
                    >
                      <Calendar size={18} className="mr-2" />
                      Passage pour tous
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddClick}>
                      <Plus size={18} className="mr-2" />
                      Ajouter un pratiquant
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left p-4">Nom</th>
                        <th className="text-left p-4">Ceinture</th>
                        <th className="text-left p-4">Degré</th>
                        <th className="text-left p-4">Année début</th>
                        <th className="text-left p-4">Présence</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {practitioners.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-neutral-50">
                          <td className="p-4">{p.name}</td>
                          <td className="p-4">
                            <Badge className={getBeltColor(p.belt)}>
                              {p.belt}
                            </Badge>
                          </td>
                          <td className="p-4">{p.degree}°</td>
                          <td className="p-4">{p.yearStarted}</td>
                          <td className="p-4">{p.attendanceRate}%</td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-blue-600 hover:text-blue-700"
                                onClick={() => handleOpenBeltTestForIndividual(p)}
                                title="Définir date de passage"
                              >
                                <Calendar size={14} />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEditClick(p)}>
                                <Edit size={14} />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(p.id)}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Mode démonstration :</strong> Les données affichées sont fictives. 
                    En production, ces données seraient stockées dans une base de données.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Gestion des actualités</h3>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddNewsClick}>
                    <Plus size={18} className="mr-2" />
                    Ajouter une actualité
                  </Button>
                </div>

                <div className="grid gap-4">
                  {news.map((item) => (
                    <Card key={item.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-blue-100 text-blue-800">{item.category}</Badge>
                            <span className="text-sm text-neutral-500">
                              {new Date(item.date).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <h4 className="text-lg mb-1">{item.title}</h4>
                          <p className="text-sm text-neutral-600">Par {item.author}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditNewsClick(item)}>
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteNews(item.id)}>
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Mode démonstration :</strong> Les actualités affichées sont fictives. 
                    En production, vous pourriez créer, modifier et supprimer des actualités.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'bulletins' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Gestion des bulletins</h3>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddBulletinClick}>
                    <Plus size={18} className="mr-2" />
                    Créer un bulletin
                  </Button>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left p-4">Pratiquant</th>
                        <th className="text-left p-4">Ceinture</th>
                        <th className="text-left p-4">Technique</th>
                        <th className="text-left p-4">Discipline</th>
                        <th className="text-left p-4">Physique</th>
                        <th className="text-left p-4">Moyenne</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulletins.map((b) => (
                        <tr key={b.id} className="border-t hover:bg-neutral-50">
                          <td className="p-4">{b.practitionerName}</td>
                          <td className="p-4">
                            <Badge className={getBeltColor(b.belt)}>
                              {b.belt} {b.degree}°
                            </Badge>
                          </td>
                          <td className="p-4">{b.technicalScore}/20</td>
                          <td className="p-4">{b.disciplineScore}/20</td>
                          <td className="p-4">{b.physicalScore}/20</td>
                          <td className="p-4">
                            <span className="font-medium text-red-600">{b.averageScore}/20</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEditBulletinClick(b)}>
                                <Edit size={14} />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700" onClick={() => handleDeleteBulletin(b.id)}>
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Mode démonstration :</strong> Les bulletins affichés sont fictifs. 
                    En production, vous pourriez créer et modifier les notes des pratiquants.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'admins' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Gestion des administrateurs</h3>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => setShowAddAdminModal(true)}>
                    <Plus size={18} className="mr-2" />
                    Ajouter un administrateur
                  </Button>
                </div>

                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left p-4">Nom d'utilisateur</th>
                        <th className="text-left p-4">Date de création</th>
                        <th className="text-left p-4">Créé par</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin) => (
                        <tr key={admin.id} className="border-t hover:bg-neutral-50">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Shield size={16} className="text-red-600" />
                              {admin.username}
                              {admin.username === 'admin' && (
                                <Badge className="bg-amber-100 text-amber-800">Principal</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">{new Date(admin.createdAt).toLocaleDateString('fr-FR')}</td>
                          <td className="p-4">{admin.createdBy}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              {admin.username !== 'admin' && (
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="text-red-600 hover:text-red-700" 
                                  onClick={() => handleDeleteAdmin(admin.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Note :</strong> Les administrateurs peuvent gérer l'ensemble du dojo, 
                    y compris les pratiquants, actualités, bulletins et autres administrateurs. 
                    Le compte "admin" principal ne peut pas être supprimé.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">Gestion des présences</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="attendance-date">Date de la séance :</Label>
                      <Input
                        id="attendance-date"
                        type="date"
                        value={selectedAttendanceDate}
                        onChange={(e) => loadAttendanceForDate(e.target.value)}
                        className="w-auto"
                      />
                    </div>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={saveAttendance}
                    >
                      Enregistrer les présences
                    </Button>
                  </div>
                </div>

                {/* Info sur le jour */}
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    {getSessionType(selectedAttendanceDate) ? (
                      <>
                        <strong>Jour d'entraînement :</strong> {
                          getSessionType(selectedAttendanceDate) === 'mercredi' ? 'Mercredi 16h-18h30' :
                          getSessionType(selectedAttendanceDate) === 'samedi' ? 'Samedi 16h-18h30' :
                          'Dimanche 15h30-18h'
                        }
                      </>
                    ) : (
                      <strong>⚠️ Cette date ne correspond pas à un jour d'entraînement.</strong>
                    )}
                  </p>
                </div>

                {/* Liste des pratiquants */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left p-4">Pratiquant</th>
                        <th className="text-left p-4">Ceinture</th>
                        <th className="text-center p-4">Taux de présence actuel</th>
                        <th className="text-center p-4">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {practitioners.map((practitioner) => {
                        const isPresent = attendanceForDate[practitioner.id] || false;
                        return (
                          <tr key={practitioner.id} className="border-t hover:bg-neutral-50">
                            <td className="p-4">{practitioner.name}</td>
                            <td className="p-4">
                              <Badge className={getBeltColor(practitioner.belt)}>
                                {practitioner.belt} {practitioner.degree}°
                              </Badge>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`font-medium ${
                                practitioner.attendanceRate >= 80 ? 'text-green-600' :
                                practitioner.attendanceRate >= 50 ? 'text-amber-600' :
                                'text-red-600'
                              }`}>
                                {practitioner.attendanceRate}%
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => toggleAttendance(practitioner.id)}
                                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    isPresent
                                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                                  }`}
                                >
                                  {isPresent ? (
                                    <>
                                      <CheckCircle size={18} />
                                      Présent
                                    </>
                                  ) : (
                                    <>
                                      <XCircle size={18} />
                                      Absent
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Note :</strong> Les jours d'entraînement sont les mercredis et samedis (16h-18h30) 
                    et les dimanches (15h30-18h). Le taux de présence est calculé automatiquement après l'enregistrement.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Practitioner Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Modifier le pratiquant</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nom complet</Label>
                <Input
                  id="edit-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Nom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-username">Surnom (optionnel)</Label>
                <Input
                  id="edit-username"
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  placeholder="Surnom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-password">Mot de passe</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={editForm.password}
                  onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                  placeholder="Nouveau mot de passe"
                  className="mt-1"
                />
                <p className="text-xs text-neutral-500 mt-1">Laissez vide pour ne pas modifier</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-belt">Ceinture</Label>
                  <select
                    id="edit-belt"
                    value={editForm.belt}
                    onChange={(e) => setEditForm({ ...editForm, belt: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Blanc">Blanc</option>
                    <option value="Jaune">Jaune</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Vert">Vert</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Marron">Marron</option>
                    <option value="Noir">Noir</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit-degree">Degré</Label>
                  <select
                    id="edit-degree"
                    value={editForm.degree}
                    onChange={(e) => setEditForm({ ...editForm, degree: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1°</option>
                    <option value={2}>2°</option>
                    <option value={3}>3°</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-year">Année de début</Label>
                  <Input
                    id="edit-year"
                    type="number"
                    value={editForm.yearStarted}
                    onChange={(e) => setEditForm({ ...editForm, yearStarted: Number(e.target.value) })}
                    min="2000"
                    max={new Date().getFullYear()}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-attendance">Taux de présence (%)</Label>
                  <Input
                    id="edit-attendance"
                    type="number"
                    value={editForm.attendanceRate}
                    onChange={(e) => setEditForm({ ...editForm, attendanceRate: Number(e.target.value) })}
                    min="0"
                    max="100"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowEditModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Practitioner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Ajouter un pratiquant</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="add-name">Nom complet</Label>
                <Input
                  id="add-name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Nom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="add-username">Surnom (optionnel)</Label>
                <Input
                  id="add-username"
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  placeholder="Surnom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="add-password">Mot de passe</Label>
                <Input
                  id="add-password"
                  type="password"
                  value={editForm.password}
                  onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                  placeholder="Nouveau mot de passe"
                  className="mt-1"
                />
                <p className="text-xs text-neutral-500 mt-1">Laissez vide pour ne pas modifier</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-belt">Ceinture</Label>
                  <select
                    id="add-belt"
                    value={editForm.belt}
                    onChange={(e) => setEditForm({ ...editForm, belt: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Blanc">Blanc</option>
                    <option value="Jaune">Jaune</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Vert">Vert</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Marron">Marron</option>
                    <option value="Noir">Noir</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="add-degree">Degré</Label>
                  <select
                    id="add-degree"
                    value={editForm.degree}
                    onChange={(e) => setEditForm({ ...editForm, degree: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1°</option>
                    <option value={2}>2°</option>
                    <option value={3}>3°</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-year">Année de début</Label>
                  <Input
                    id="add-year"
                    type="number"
                    value={editForm.yearStarted}
                    onChange={(e) => setEditForm({ ...editForm, yearStarted: Number(e.target.value) })}
                    min="2000"
                    max={new Date().getFullYear()}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="add-attendance">Taux de présence (%)</Label>
                  <Input
                    id="add-attendance"
                    type="number"
                    value={editForm.attendanceRate}
                    onChange={(e) => setEditForm({ ...editForm, attendanceRate: Number(e.target.value) })}
                    min="0"
                    max="100"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddPractitioner}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={!editForm.name}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit News Modal */}
      {showEditNewsModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Modifier l'actualité</h3>
              <button onClick={() => setShowEditNewsModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-news-title">Titre</Label>
                <Input
                  id="edit-news-title"
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Titre de l'actualité"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-news-category">Catégorie</Label>
                  <select
                    id="edit-news-category"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Information">Information</option>
                    <option value="Compétition">Compétition</option>
                    <option value="Stage">Stage</option>
                    <option value="Résultats">Résultats</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit-news-date">Date</Label>
                  <Input
                    id="edit-news-date"
                    type="date"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-news-author">Auteur</Label>
                <Input
                  id="edit-news-author"
                  type="text"
                  value={newsForm.author}
                  onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                  placeholder="Auteur de l'actualité"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="edit-news-description">Description (optionnelle)</Label>
                <textarea
                  id="edit-news-description"
                  value={newsForm.description}
                  onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                  placeholder="Description de l'actualité"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-news-imageUrl">Image (optionnelle)</Label>
                <Input
                  id="edit-news-imageUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                {newsForm.imageUrl && (
                  <div className="mt-2">
                    <img src={newsForm.imageUrl} alt="Aperçu" className="h-32 w-auto rounded-lg border" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNewsForm({ ...newsForm, imageUrl: '' })}
                      className="mt-2 text-red-600"
                    >
                      Supprimer l'image
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowEditNewsModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSaveNewsEdit}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add News Modal */}
      {showAddNewsModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Ajouter une actualité</h3>
              <button onClick={() => setShowAddNewsModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="add-news-title">Titre</Label>
                <Input
                  id="add-news-title"
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Titre de l'actualité"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-news-category">Catégorie</Label>
                  <select
                    id="add-news-category"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Information">Information</option>
                    <option value="Compétition">Compétition</option>
                    <option value="Stage">Stage</option>
                    <option value="Résultats">Résultats</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="add-news-date">Date</Label>
                  <Input
                    id="add-news-date"
                    type="date"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="add-news-author">Auteur</Label>
                <Input
                  id="add-news-author"
                  type="text"
                  value={newsForm.author}
                  onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                  placeholder="Auteur de l'actualité"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="add-news-description">Description (optionnelle)</Label>
                <textarea
                  id="add-news-description"
                  value={newsForm.description}
                  onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                  placeholder="Description de l'actualité"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="add-news-imageUrl">Image (optionnelle)</Label>
                <Input
                  id="add-news-imageUrl"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                {newsForm.imageUrl && (
                  <div className="mt-2">
                    <img src={newsForm.imageUrl} alt="Aperçu" className="h-32 w-auto rounded-lg border" />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNewsForm({ ...newsForm, imageUrl: '' })}
                      className="mt-2 text-red-600"
                    >
                      Supprimer l'image
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowAddNewsModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddNews}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={!newsForm.title}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Bulletin Modal */}
      {showEditBulletinModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Modifier le bulletin</h3>
              <button onClick={() => setShowEditBulletinModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-bulletin-name">Nom du pratiquant</Label>
                <Input
                  id="edit-bulletin-name"
                  type="text"
                  value={bulletinForm.practitionerName}
                  onChange={(e) => setBulletinForm({ ...bulletinForm, practitionerName: e.target.value })}
                  placeholder="Nom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-bulletin-belt">Ceinture</Label>
                  <select
                    id="edit-bulletin-belt"
                    value={bulletinForm.belt}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, belt: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Blanc">Blanc</option>
                    <option value="Jaune">Jaune</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Vert">Vert</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Marron">Marron</option>
                    <option value="Noir">Noir</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="edit-bulletin-degree">Degré</Label>
                  <select
                    id="edit-bulletin-degree"
                    value={bulletinForm.degree}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, degree: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1°</option>
                    <option value={2}>2°</option>
                    <option value={3}>3°</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-bulletin-technical">Score technique</Label>
                  <Input
                    id="edit-bulletin-technical"
                    type="number"
                    value={bulletinForm.technicalScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, technicalScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-bulletin-discipline">Score discipline</Label>
                  <Input
                    id="edit-bulletin-discipline"
                    type="number"
                    value={bulletinForm.disciplineScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, disciplineScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-bulletin-physical">Score physique</Label>
                  <Input
                    id="edit-bulletin-physical"
                    type="number"
                    value={bulletinForm.physicalScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, physicalScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowEditBulletinModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSaveBulletinEdit}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Bulletin Modal */}
      {showAddBulletinModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Ajouter un bulletin</h3>
              <button onClick={() => setShowAddBulletinModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="add-bulletin-name">Nom du pratiquant</Label>
                <Input
                  id="add-bulletin-name"
                  type="text"
                  value={bulletinForm.practitionerName}
                  onChange={(e) => setBulletinForm({ ...bulletinForm, practitionerName: e.target.value })}
                  placeholder="Nom du pratiquant"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-bulletin-belt">Ceinture</Label>
                  <select
                    id="add-bulletin-belt"
                    value={bulletinForm.belt}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, belt: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="Blanc">Blanc</option>
                    <option value="Jaune">Jaune</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Vert">Vert</option>
                    <option value="Bleu">Bleu</option>
                    <option value="Marron">Marron</option>
                    <option value="Noir">Noir</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="add-bulletin-degree">Degré</Label>
                  <select
                    id="add-bulletin-degree"
                    value={bulletinForm.degree}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, degree: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value={1}>1°</option>
                    <option value={2}>2°</option>
                    <option value={3}>3°</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-bulletin-technical">Score technique</Label>
                  <Input
                    id="add-bulletin-technical"
                    type="number"
                    value={bulletinForm.technicalScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, technicalScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="add-bulletin-discipline">Score discipline</Label>
                  <Input
                    id="add-bulletin-discipline"
                    type="number"
                    value={bulletinForm.disciplineScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, disciplineScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="add-bulletin-physical">Score physique</Label>
                  <Input
                    id="add-bulletin-physical"
                    type="number"
                    value={bulletinForm.physicalScore}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, physicalScore: Number(e.target.value) })}
                    min="0"
                    max="20"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowAddBulletinModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddBulletin}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={!bulletinForm.practitionerName}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Belt Test Modal */}
      {showBeltTestModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Passage de ceinture</h3>
              <button onClick={() => setShowBeltTestModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              {beltTestMode === 'individual' && (
                <div>
                  <Label htmlFor="belt-test-practitioner">Pratiquant</Label>
                  <Input
                    id="belt-test-practitioner"
                    type="text"
                    value={selectedPractitionerForTest?.name || ''}
                    readOnly
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="belt-test-date">Date du passage de ceinture</Label>
                <Input
                  id="belt-test-date"
                  type="date"
                  value={beltTestDate}
                  onChange={(e) => setBeltTestDate(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowBeltTestModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSaveBeltTest}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {showAddAdminModal && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Ajouter un administrateur</h3>
              <button onClick={() => setShowAddAdminModal(false)}>
                <X size={24} className="text-neutral-400 hover:text-neutral-900" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-username">Nom d'utilisateur</Label>
                <Input
                  id="admin-username"
                  type="text"
                  value={adminForm.username}
                  onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                  placeholder="Nom d'utilisateur"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="admin-password">Mot de passe</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  placeholder="Mot de passe"
                  className="mt-1"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  Cet administrateur aura accès à toutes les fonctionnalités de gestion du dojo.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setShowAddAdminModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleAddAdmin}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  disabled={!adminForm.username || !adminForm.password}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}