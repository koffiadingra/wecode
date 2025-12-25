import { Users, Award, LogIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Button } from './ui/button';

interface Practitioner {
  id: number;
  name: string;
  belt: string;
  degree: number;
  image: string;
  yearStarted: number;
}

const practitioners: Practitioner[] = [
  {
    id: 1,
    name: "Kouassi Jean-Paul",
    belt: "Noir",
    degree: 2,
    image: "https://images.unsplash.com/photo-1759353296514-a656159d708a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY2NjA0MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2018
  },
  {
    id: 2,
    name: "N'Guessan Aïcha",
    belt: "Marron",
    degree: 3,
    image: "https://images.unsplash.com/photo-1764616211830-993b5e360d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhdGUlMjBwcmFjdGl0aW9uZXJ8ZW58MXx8fHwxNzY2NjA0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2019
  },
  {
    id: 3,
    name: "Traoré Ibrahim",
    belt: "Bleu",
    degree: 2,
    image: "https://images.unsplash.com/photo-1671210988367-f6d69db50fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMGdyb3VwfGVufDF8fHx8MTc2NjYwNDA0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2020
  },
  {
    id: 4,
    name: "Bamba Fatou",
    belt: "Vert",
    degree: 1,
    image: "https://images.unsplash.com/photo-1759353296514-a656159d708a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMHN0dWRlbnR8ZW58MXx8fHwxNzY2NjA0MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2021
  },
  {
    id: 5,
    name: "Koné Abdoulaye",
    belt: "Rouge",
    degree: 3,
    image: "https://images.unsplash.com/photo-1764616211830-993b5e360d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhdGUlMjBwcmFjdGl0aW9uZXJ8ZW58MXx8fHwxNzY2NjA0MDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2022
  },
  {
    id: 6,
    name: "Diallo Mariama",
    belt: "Jaune",
    degree: 2,
    image: "https://images.unsplash.com/photo-1671210988367-f6d69db50fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMGdyb3VwfGVufDF8fHx8MTc2NjYwNDA0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    yearStarted: 2023
  }
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

export function Pratiquants({ onShowLogin }: { onShowLogin: () => void }) {
  return (
    <section id="pratiquants" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <Users size={20} />
            <span>Notre Communauté</span>
          </div>
          <h2 className="text-4xl mb-4">Nos Pratiquants</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Découvrez les membres de notre dojo qui s'entraînent avec passion et détermination dans l'art du SHAIDA.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl text-center">
            <div className="text-4xl text-red-600 mb-2">{practitioners.length}+</div>
            <div className="text-neutral-700">Pratiquants Actifs</div>
          </div>
          <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 rounded-xl text-center">
            <div className="text-4xl text-neutral-900 mb-2">
              {practitioners.filter(p => p.belt === 'Noir').length}
            </div>
            <div className="text-neutral-700">Ceintures Noires</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl text-center">
            <div className="text-4xl text-amber-700 mb-2">7</div>
            <div className="text-neutral-700">Années d'Expérience</div>
          </div>
        </div>

        {/* Practitioners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {practitioners.map((practitioner) => (
            <div
              key={practitioner.id}
              className="bg-neutral-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={practitioner.image}
                  alt={practitioner.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{practitioner.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-3 py-1 rounded-full border-2 ${getBeltColor(practitioner.belt)}`}>
                    Ceinture {practitioner.belt}
                  </div>
                  <div className="flex items-center gap-1 text-neutral-600">
                    <Award size={16} />
                    <span>{practitioner.degree}° degré</span>
                  </div>
                </div>
                <p className="text-neutral-600">
                  Pratique depuis {new Date().getFullYear() - practitioner.yearStarted} ans
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-neutral-900 to-red-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl mb-4">Vous êtes pratiquant ?</h3>
          <p className="text-neutral-200 mb-6 max-w-2xl mx-auto">
            Accédez à votre espace personnel pour suivre votre progression, consulter vos présences et gérer vos informations.
          </p>
          <Button
            onClick={onShowLogin}
            className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 rounded-lg inline-flex items-center gap-2"
          >
            <LogIn size={20} />
            Accéder à mon espace
          </Button>
        </div>
      </div>
    </section>
  );
}
