import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, setDoc, doc, query, where } from 'firebase/firestore';
import { auth, db } from '../utils/firebase/config';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Check, X, FileDown, Church } from 'lucide-react';
import jsPDF from 'jspdf';

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

export function Presences() {
  const navigate = useNavigate();
  const [fideles, setFideles] = useState<Fidele[]>([]);
  const [presences, setPresences] = useState<Record<string, Presence>>({});
  const [selectedDate, setSelectedDate] = useState(getNextSunday());
  const [loading, setLoading] = useState(true);
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    checkAuth();
    loadFideles();
    loadAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadPresences(selectedDate);
    }
  }, [selectedDate]);

  function getNextSunday(): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday.toISOString().split('T')[0];
  }

  const checkAuth = async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/');
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

  const loadAvailableDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'presences'));
      const dates = new Set<string>();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.date) {
          dates.add(data.date);
        }
      });
      setAvailableDates(Array.from(dates).sort().reverse());
    } catch (error) {
      console.error('Error loading dates:', error);
    }
  };

  const loadPresences = async (date: string) => {
    try {
      const q = query(collection(db, 'presences'), where('date', '==', date));
      const querySnapshot = await getDocs(q);
      const presencesMap: Record<string, Presence> = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Presence;
        presencesMap[data.fideleId] = data;
      });
      setPresences(presencesMap);
    } catch (error) {
      console.error('Error loading presences:', error);
    }
  };

  const markPresence = async (fideleId: string, present: boolean) => {
    try {
      const presence = {
        fideleId,
        date: selectedDate,
        present,
        markedAt: new Date().toISOString(),
      };

      const presenceId = `${selectedDate}_${fideleId}`;
      await setDoc(doc(db, 'presences', presenceId), presence);

      setPresences({
        ...presences,
        [fideleId]: presence,
      });
      
      toast.success('Présence enregistrée');
      
      if (!availableDates.includes(selectedDate)) {
        loadAvailableDates();
      }
    } catch (error) {
      console.error('Error marking presence:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const getPresenceStats = () => {
    const total = fideles.length;
    const present = Object.values(presences).filter(p => p.present).length;
    const absent = Object.values(presences).filter(p => !p.present).length;
    const notMarked = total - present - absent;
    
    return { total, present, absent, notMarked };
  };

  const stats = getPresenceStats();

  const downloadPresenceReportPDF = async () => {
    toast.info('Génération du PDF en cours...');
    
    const dateFormatted = new Date(selectedDate).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    const checkPageBreak = (neededSpace: number) => {
      if (yPosition + neededSpace > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };

    const getBase64Image = (url: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = reject;
        img.src = url;
      });
    };

    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Chapelle Pleine de Gloire', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Liste de Présence', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;

    pdf.setFontSize(12);
    pdf.text(dateFormatted, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    const statsText = `Total: ${stats.total}  |  Présents: ${stats.present}  |  Absents: ${stats.absent}  |  Non marqués: ${stats.notMarked}`;
    pdf.text(statsText, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, yPosition, pageWidth - 10, yPosition);
    yPosition += 10;

    for (const fidele of fideles) {
      checkPageBreak(35);

      const presence = presences[fidele.id];
      const presenceStatus = presence ? (presence.present ? 'PRÉSENT' : 'ABSENT') : 'NON MARQUÉ';
      const presenceColor = presence ? (presence.present ? [34, 197, 94] : [239, 68, 68]) : [156, 163, 175];

      const photoSize = 25;
      const photoX = 15;
      const photoY = yPosition;

      try {
        if (fidele.photo) {
          const imgData = await getBase64Image(fidele.photo);
          pdf.addImage(imgData, 'JPEG', photoX, photoY, photoSize, photoSize);
        } else {
          pdf.setFillColor(99, 102, 241);
          pdf.rect(photoX, photoY, photoSize, photoSize, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(12);
          pdf.text(
            `${fidele.prenom[0]}${fidele.nom[0]}`,
            photoX + photoSize / 2,
            photoY + photoSize / 2 + 4,
            { align: 'center' }
          );
        }
      } catch (error) {
        console.error('Error loading image:', error);
        pdf.setFillColor(99, 102, 241);
        pdf.rect(photoX, photoY, photoSize, photoSize, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.text(
          `${fidele.prenom[0]}${fidele.nom[0]}`,
          photoX + photoSize / 2,
          photoY + photoSize / 2 + 4,
          { align: 'center' }
        );
      }

      pdf.setTextColor(0, 0, 0);
      const infoX = photoX + photoSize + 10;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${fidele.prenom} ${fidele.nom}`, infoX, photoY + 6);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      
      let infoY = photoY + 12;
      if (fidele.fonction) {
        pdf.text(`Fonction: ${fidele.fonction}`, infoX, infoY);
        infoY += 5;
      }
      if (fidele.service) {
        pdf.text(`Service: ${fidele.service}`, infoX, infoY);
        infoY += 5;
      }
      if (fidele.telephone) {
        pdf.text(`Tél: ${fidele.telephone}`, infoX + 70, photoY + 12);
      }
      if (fidele.lieuResidence) {
        pdf.text(`Résidence: ${fidele.lieuResidence}`, infoX + 70, photoY + 17);
      }

      const statusX = pageWidth - 45;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(presenceColor[0], presenceColor[1], presenceColor[2]);
      pdf.text(presenceStatus, statusX, photoY + photoSize / 2 + 3);

      yPosition += photoSize + 5;
      pdf.setDrawColor(230, 230, 230);
      pdf.line(10, yPosition, pageWidth - 10, yPosition);
      yPosition += 5;
    }

    checkPageBreak(40);
    yPosition += 10;
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, yPosition, pageWidth - 10, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Statistiques récapitulatives', 15, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Total des fidèles: ${stats.total}`, 15, yPosition);
    yPosition += 6;
    pdf.setTextColor(34, 197, 94);
    pdf.text(`Présents: ${stats.present} (${((stats.present / stats.total) * 100).toFixed(1)}%)`, 15, yPosition);
    yPosition += 6;
    pdf.setTextColor(239, 68, 68);
    pdf.text(`Absents: ${stats.absent} (${((stats.absent / stats.total) * 100).toFixed(1)}%)`, 15, yPosition);
    yPosition += 6;
    pdf.setTextColor(156, 163, 175);
    pdf.text(`Non marqués: ${stats.notMarked}`, 15, yPosition);

    pdf.save(`presence_${selectedDate}.pdf`);
    toast.success('PDF téléchargé avec succès !');
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
        </div>

        <div className="mb-6 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Liste de présence</CardTitle>
                  <CardDescription>
                    Marquez les présences pour chaque dimanche
                  </CardDescription>
                </div>
                <Button 
                  variant="default"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={downloadPresenceReportPDF}
                  disabled={fideles.length === 0}
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Télécharger PDF avec photos
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 space-y-2 w-full">
                  <label className="text-sm font-medium">Date du culte</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                {availableDates.length > 0 && (
                  <div className="flex-1 space-y-2 w-full">
                    <label className="text-sm font-medium">Ou choisir une date existante</label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une date" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {new Date(date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{stats.total} Total</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {stats.present} Présents
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                    {stats.absent} Absents
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{stats.notMarked} Non marqués</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {fideles.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-gray-500">
              <p>Aucun fidèle enregistré</p>
              <Button
                variant="link"
                onClick={() => navigate('/fideles')}
                className="mt-2"
              >
                Ajouter des fidèles
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {fideles.map((fidele) => {
              const presence = presences[fidele.id];
              const isPresent = presence?.present === true;
              const isAbsent = presence?.present === false;

              return (
                <Card key={fidele.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={fidele.photo || undefined} alt={`${fidele.prenom} ${fidele.nom}`} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-700">
                          {fidele.prenom[0]}{fidele.nom[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {fidele.prenom} {fidele.nom}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Membre depuis {new Date(fidele.dateAdhesion).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="lg"
                          variant={isPresent ? "default" : "outline"}
                          className={isPresent ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => markPresence(fidele.id, true)}
                        >
                          <Check className="w-5 h-5 mr-2" />
                          Présent
                        </Button>
                        <Button
                          size="lg"
                          variant={isAbsent ? "destructive" : "outline"}
                          onClick={() => markPresence(fidele.id, false)}
                        >
                          <X className="w-5 h-5 mr-2" />
                          Absent
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
