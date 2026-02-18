import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../utils/firebase/config';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Pencil, Trash2, Upload, X, Filter, Church } from 'lucide-react';
import { fileToBase64 } from '../utils/firebase/storage';

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

// Listes prédéfinies de fonctions et services
const FONCTIONS = [
  'Pasteur',
  'Ancien',
  'Diacre',
  'Évangéliste',
  'Chantre',
  'Trésorier',
  'Secrétaire',
  'Membre',
  'Autre',
];

const SERVICES = [
  'Direction',
  'Accueil',
  'Louange',
  'Intercession',
  'Enseignement',
  'Jeunesse',
  'Enfants',
  'Évangélisation',
  'Administration',
  'Média',
  'Technique',
  'Social',
  'Autre',
];

export function FidelesList() {
  const navigate = useNavigate();
  const [fideles, setFideles] = useState<Fidele[]>([]);
  const [filteredFideles, setFilteredFideles] = useState<Fidele[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFidele, setEditingFidele] = useState<Fidele | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [filterFonction, setFilterFonction] = useState<string>('all');
  const [filterService, setFilterService] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    photo: '',
    dateAdhesion: new Date().toISOString().split('T')[0],
    fonction: '',
    service: '',
    telephone: '',
    lieuResidence: '',
  });

  useEffect(() => {
    checkAuth();
    loadFideles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [fideles, filterFonction, filterService, searchQuery]);

  const applyFilters = () => {
    let filtered = [...fideles];

    // Filtre par fonction
    if (filterFonction !== 'all') {
      filtered = filtered.filter(f => f.fonction === filterFonction);
    }

    // Filtre par service
    if (filterService !== 'all') {
      filtered = filtered.filter(f => f.service === filterService);
    }

    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.nom.toLowerCase().includes(query) ||
        f.prenom.toLowerCase().includes(query) ||
        f.fonction?.toLowerCase().includes(query) ||
        f.service?.toLowerCase().includes(query)
      );
    }

    setFilteredFideles(filtered);
  };

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
            toast.error('Accès refusé : seuls les pasteurs peuvent gérer les fidèles');
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error checking user role:', error);
      }
    });
  };

  const loadFideles = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'fideles'));
      const fidelesData: Fidele[] = [];
      querySnapshot.forEach((doc) => {
        fidelesData.push({ id: doc.id, ...doc.data() } as Fidele);
      });
      setFideles(fidelesData);
    } catch (error) {
      console.error('Error loading fidèles:', error);
      toast.error('Erreur lors du chargement des fidèles');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner une image');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'image ne doit pas dépasser 5 Mo');
        return;
      }

      setSelectedFile(file);
      
      // Créer une URL de prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadPhoto = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `fideles/${filename}`);
    
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let photoUrl = formData.photo;

      // Upload photo si un fichier a été sélectionné
      if (selectedFile) {
        // Mode réel: uploader vers Firebase Storage
        photoUrl = await uploadPhoto(selectedFile);
      }

      // Mode Firebase
      if (editingFidele) {
        const fideleRef = doc(db, 'fideles', editingFidele.id);
        await updateDoc(fideleRef, {
          nom: formData.nom,
          prenom: formData.prenom,
          photo: photoUrl,
          dateAdhesion: formData.dateAdhesion,
          fonction: formData.fonction,
          service: formData.service,
          telephone: formData.telephone,
          lieuResidence: formData.lieuResidence,
        });
        toast.success('Fidèle modifié avec succès');
      } else {
        await addDoc(collection(db, 'fideles'), {
          nom: formData.nom,
          prenom: formData.prenom,
          photo: photoUrl,
          dateAdhesion: formData.dateAdhesion,
          createdAt: new Date().toISOString(),
          fonction: formData.fonction,
          service: formData.service,
          telephone: formData.telephone,
          lieuResidence: formData.lieuResidence,
        });
        toast.success('Fidèle ajouté avec succès');
      }

      setDialogOpen(false);
      resetForm();
      loadFideles();
    } catch (error) {
      console.error('Error saving fidèle:', error);
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, photoUrl: string | null) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fidèle ?')) {
      return;
    }

    try {
      // Supprimer la photo de Storage si elle existe
      if (photoUrl && photoUrl.includes('firebase')) {
        try {
          const photoRef = ref(storage, photoUrl);
          await deleteObject(photoRef);
        } catch (error) {
          console.error('Error deleting photo:', error);
        }
      }

      // Supprimer le document de Firestore
      await deleteDoc(doc(db, 'fideles', id));
      toast.success('Fidèle supprimé');
      loadFideles();
    } catch (error) {
      console.error('Error deleting fidèle:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const openEditDialog = (fidele: Fidele) => {
    setEditingFidele(fidele);
    setFormData({
      nom: fidele.nom,
      prenom: fidele.prenom,
      photo: fidele.photo || '',
      dateAdhesion: fidele.dateAdhesion.split('T')[0],
      fonction: fidele.fonction || '',
      service: fidele.service || '',
      telephone: fidele.telephone || '',
      lieuResidence: fidele.lieuResidence || '',
    });
    setPreviewUrl(fidele.photo || '');
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingFidele(null);
    setFormData({
      nom: '',
      prenom: '',
      photo: '',
      dateAdhesion: new Date().toISOString().split('T')[0],
      fonction: '',
      service: '',
      telephone: '',
      lieuResidence: '',
    });
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const removePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setFormData({ ...formData, photo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

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
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un fidèle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingFidele ? 'Modifier le fidèle' : 'Ajouter un fidèle'}
                </DialogTitle>
                <DialogDescription>
                  Remplissez les informations du membre de l'église
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom</Label>
                  <Input
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom</Label>
                  <Input
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo</Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </div>
                    {previewUrl && (
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                        <img
                          src={previewUrl}
                          alt="Prévisualisation"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Sélectionnez une photo depuis vos fichiers (max 5 Mo)
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateAdhesion">Date d'adhésion</Label>
                  <Input
                    id="dateAdhesion"
                    type="date"
                    value={formData.dateAdhesion}
                    onChange={(e) => setFormData({ ...formData, dateAdhesion: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fonction">Fonction</Label>
                  <Select
                    id="fonction"
                    value={formData.fonction}
                    onValueChange={(value: any) => setFormData({ ...formData, fonction: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une fonction">
                        {formData.fonction}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les fonctions</SelectItem>
                      {FONCTIONS.map(fonction => (
                        <SelectItem key={fonction} value={fonction}>
                          {fonction}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select
                    id="service"
                    value={formData.service}
                    onValueChange={(value: any) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un service">
                        {formData.service}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les services</SelectItem>
                      {SERVICES.map(service => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lieuResidence">Lieu de résidence</Label>
                  <Input
                    id="lieuResidence"
                    value={formData.lieuResidence}
                    onChange={(e) => setFormData({ ...formData, lieuResidence: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={uploading}>
                  {uploading ? 'Enregistrement...' : editingFidele ? 'Modifier' : 'Ajouter'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des fidèles</CardTitle>
            <CardDescription>
              {filteredFideles.length} sur {fideles.length} membre{fideles.length > 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filtres */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm mb-2 block">
                  <Filter className="w-4 h-4 inline mr-1" />
                  Rechercher
                </Label>
                <Input
                  id="search"
                  placeholder="Nom, prénom, fonction, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="filterFonction" className="text-sm mb-2 block">Fonction</Label>
                <Select value={filterFonction} onValueChange={setFilterFonction}>
                  <SelectTrigger id="filterFonction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les fonctions</SelectItem>
                    {FONCTIONS.map(fonction => (
                      <SelectItem key={fonction} value={fonction}>
                        {fonction}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="filterService" className="text-sm mb-2 block">Service</Label>
                <Select value={filterService} onValueChange={setFilterService}>
                  <SelectTrigger id="filterService">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les services</SelectItem>
                    {SERVICES.map(service => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Liste des fidèles */}
            {fideles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun fidèle enregistré</p>
                <p className="text-sm mt-2">Cliquez sur "Ajouter un fidèle" pour commencer</p>
              </div>
            ) : filteredFideles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Aucun résultat pour cette recherche</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterFonction('all');
                    setFilterService('all');
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredFideles.map((fidele) => (
                  <Card key={fidele.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-16 h-16 flex-shrink-0">
                            <AvatarImage src={fidele.photo || undefined} alt={`${fidele.prenom} ${fidele.nom}`} />
                            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-lg">
                              {fidele.prenom[0]}{fidele.nom[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">
                              {fidele.prenom} {fidele.nom}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Depuis {new Date(fidele.dateAdhesion).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        {/* Badges pour fonction et service */}
                        <div className="flex flex-wrap gap-2">
                          {fidele.fonction && (
                            <Badge variant="secondary" className="text-xs">
                              {fidele.fonction}
                            </Badge>
                          )}
                          {fidele.service && (
                            <Badge variant="outline" className="text-xs">
                              {fidele.service}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => openEditDialog(fidele)}
                          >
                            <Pencil className="w-3 h-3 mr-1" />
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(fidele.id, fidele.photo)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}