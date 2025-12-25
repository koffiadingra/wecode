import { useState, useEffect } from 'react';
import { Newspaper, Calendar, User } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

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

const defaultNews: News[] = [
  {
    id: '1',
    title: 'Compétition Nationale SHAIDA 2025',
    content: 'Le dojo SHAIDA participera à la compétition nationale qui se tiendra à Yamoussoukro le 15 mars 2025. Nos pratiquants se préparent intensément pour représenter dignement notre école. Inscription avant le 1er mars.',
    category: 'Compétition',
    imageUrl: 'https://images.unsplash.com/photo-1591978638709-bd73f437243d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2NjYwNTAwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Grand Maître KOUAME',
    date: '2024-12-20',
    createdAt: '2024-12-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Stage de perfectionnement en janvier',
    content: 'Un stage intensif de perfectionnement technique sera organisé du 11 au 13 janvier 2025. Au programme : révision des techniques avancées, travail des katas et préparation aux passages de grades. Ouvert à tous les niveaux à partir de la ceinture jaune.',
    category: 'Stage',
    imageUrl: 'https://images.unsplash.com/photo-1765438858380-7cd73d0dca60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2pvJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY2NjA1MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Grand Maître KOUAME',
    date: '2024-12-18',
    createdAt: '2024-12-18T14:00:00Z'
  },
  {
    id: '3',
    title: 'Nouveaux horaires pour les débutants',
    content: 'À partir de janvier 2025, une session dédiée aux débutants sera mise en place tous les vendredis de 17h à 18h30. Cette session permettra aux nouveaux pratiquants de progresser à leur rythme avec un encadrement adapté.',
    category: 'Information',
    imageUrl: 'https://images.unsplash.com/photo-1550759807-50dc0b381a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMG5ld3N8ZW58MXx8fHwxNzY2NjA1MDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Grand Maître KOUAME',
    date: '2024-12-15',
    createdAt: '2024-12-15T09:00:00Z'
  },
  {
    id: '4',
    title: 'Passage de grade de décembre - Résultats',
    content: 'Félicitations à tous les pratiquants qui ont réussi leur passage de grade le 7 décembre ! 12 pratiquants ont obtenu leur nouvelle ceinture après avoir démontré leur maîtrise technique et leur esprit martial. Bravo à tous !',
    category: 'Résultats',
    imageUrl: 'https://images.unsplash.com/photo-1591978638709-bd73f437243d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2NjYwNTAwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Grand Maître KOUAME',
    date: '2024-12-08',
    createdAt: '2024-12-08T16:00:00Z'
  }
];

const categoryColors: { [key: string]: string } = {
  'Compétition': 'bg-red-100 text-red-800',
  'Stage': 'bg-blue-100 text-blue-800',
  'Information': 'bg-green-100 text-green-800',
  'Résultats': 'bg-amber-100 text-amber-800',
  'Annonce': 'bg-purple-100 text-purple-800',
  'Autre': 'bg-gray-100 text-gray-800'
};

export function Actualites() {
  const [news, setNews] = useState<News[]>(defaultNews);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  useEffect(() => {
    loadNews();
  }, []);

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

      if (response.ok) {
        const data = await response.json();
        if (data.news && data.news.length > 0) {
          setNews(data.news.sort((a: News, b: News) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ));
        }
      }
    } catch (err) {
      console.error('Load news error:', err);
      // Keep default news if loading fails
    }
  };

  const categories = ['Tous', ...new Set(news.map(n => n.category))];
  const filteredNews = selectedCategory === 'Tous' 
    ? news 
    : news.filter(n => n.category === selectedCategory);

  return (
    <section id="actualites" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <Newspaper size={20} />
            <span>Actualités</span>
          </div>
          <h2 className="text-4xl mb-4">Fil d'Actualité</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Restez informés des dernières nouvelles, événements et résultats de notre dojo.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredNews.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {item.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={categoryColors[item.category] || categoryColors['Autre']}>
                    {item.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-neutral-500">
                    <Calendar size={14} />
                    <span>
                      {new Date(item.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl mb-3">{item.title}</h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">{item.content}</p>

                <div className="flex items-center gap-2 text-sm text-neutral-500 pt-4 border-t border-neutral-200">
                  <User size={14} />
                  <span>{item.author}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper size={48} className="mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500 text-lg">
              Aucune actualité dans cette catégorie
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
