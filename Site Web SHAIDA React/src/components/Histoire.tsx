import { BookOpen, Target, Heart, Users, Award, Shield, Flame, Globe } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function Histoire() {
  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Respect',
      description: 'Le respect de soi, des autres et de l\'art martial est le fondement de notre pratique. Nous honorons nos maîtres, nos partenaires et notre héritage.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Discipline',
      description: 'La discipline personnelle forge le caractère. Par la répétition et la persévérance, nous atteignons l\'excellence dans notre art.'
    },
    {
      icon: <Target size={32} />,
      title: 'Dépassement de soi',
      description: 'Chaque entraînement est une opportunité de repousser nos limites et de devenir une meilleure version de nous-mêmes.'
    },
    {
      icon: <Users size={32} />,
      title: 'Fraternité',
      description: 'Le dojo est une famille. Nous nous soutenons mutuellement dans notre progression et célébrons ensemble nos réussites.'
    },
    {
      icon: <Flame size={32} />,
      title: 'Courage',
      description: 'Le courage de faire face aux défis, d\'accepter l\'échec comme une leçon et de continuer à avancer avec détermination.'
    },
    {
      icon: <Award size={32} />,
      title: 'Honneur',
      description: 'L\'honneur guide nos actions. Nous pratiquons avec intégrité, humilité et un engagement total envers nos principes.'
    }
  ];

  const entities = [
    {
      name: 'Fédération Internationale SHAIDA',
      role: 'Autorité suprême',
      description: 'Régit les standards techniques, organise les compétitions internationales et coordonne le développement mondial de la discipline.'
    },
    {
      name: 'Conseil des Grands Maîtres',
      role: 'Guidance technique',
      description: 'Composé des 10 Grands Maîtres les plus gradés, ils préservent l\'authenticité de l\'enseignement et valident les évolutions techniques.'
    },
    {
      name: 'Dojos Affiliés',
      role: 'Centres d\'enseignement',
      description: 'Écoles certifiées dispensant l\'enseignement selon les standards établis. Chaque dojo contribue à la communauté mondiale SHAIDA.'
    },
    {
      name: 'Commission d\'Examen',
      role: 'Évaluation et certification',
      description: 'Responsable des passages de grades et de la certification des instructeurs selon les critères stricts de la discipline.'
    }
  ];

  const objectives = [
    {
      title: 'Développement personnel',
      description: 'Cultiver l\'équilibre entre le corps, l\'esprit et l\'âme à travers une pratique martiale complète.'
    },
    {
      title: 'Maîtrise technique',
      description: 'Acquérir une expertise dans les techniques de combat, la self-défense et les formes traditionnelles (katas).'
    },
    {
      title: 'Préservation culturelle',
      description: 'Maintenir vivante la tradition martiale africaine et transmettre cet héritage aux générations futures.'
    },
    {
      title: 'Formation du caractère',
      description: 'Forger des individus équilibrés, confiants et respectueux, capables de contribuer positivement à la société.'
    }
  ];

  return (
    <section id="histoire" className="py-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <BookOpen size={20} />
            <span>Histoire & Enseignement</span>
          </div>
          <h2 className="text-4xl mb-4">La Discipline SHAIDA</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Découvrez l'histoire, les valeurs et la philosophie qui font de SHAIDA 
            bien plus qu'un art martial, mais un véritable chemin de vie.
          </p>
        </div>

        {/* Origine */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Globe size={28} className="text-red-600" />
            <h3 className="text-3xl">Origine de la Discipline</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Card className="p-8 bg-gradient-to-br from-red-50 to-white border-red-100">
                <h4 className="text-2xl mb-4 text-red-800">Naissance du SHAIDA</h4>
                <div className="space-y-4 text-neutral-700">
                  <p>
                    Le <strong>SHAIDA</strong> (Système Harmonieux d'Arts Intégrés pour la Défense et l'Accomplissement) 
                    est né en Côte d'Ivoire au début des années 1990, fruit de la vision du Grand Maître 
                    <strong> KOUAME Ahoussi Eugene</strong>.
                  </p>
                  <p>
                    Inspiré par les arts martiaux traditionnels africains et enrichi par des techniques 
                    modernes de combat, le SHAIDA représente une synthèse unique entre tradition et innovation.
                  </p>
                  <p>
                    Cette discipline martiale ivoirienne s'est développée avec l'objectif de créer un système 
                    de défense complet, accessible à tous, tout en préservant les valeurs culturelles et 
                    spirituelles de nos ancêtres.
                  </p>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-8 bg-gradient-to-br from-amber-50 to-white border-amber-100">
                <h4 className="text-2xl mb-4 text-amber-800">Évolution et Rayonnement</h4>
                <div className="space-y-4 text-neutral-700">
                  <p>
                    Depuis sa création, le SHAIDA a connu une croissance remarquable, s'étendant 
                    à travers la Côte d'Ivoire et au-delà des frontières africaines.
                  </p>
                  <p>
                    Aujourd'hui, la discipline compte des milliers de pratiquants répartis dans 
                    de nombreux dojos affiliés, formant une communauté soudée et engagée.
                  </p>
                  <p>
                    Le système de progression par ceintures colorées et degrés DUAN (1 à 10) 
                    offre un parcours structuré permettant à chaque pratiquant d'évoluer à son rythme 
                    vers l'excellence martiale.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Heart size={28} className="text-red-600" />
            <h3 className="text-3xl">Les Valeurs Fondamentales</h3>
          </div>
          
          <p className="text-neutral-600 mb-8 text-center max-w-3xl mx-auto">
            Le SHAIDA s'appuie sur six valeurs essentielles qui guident chaque pratiquant 
            dans son parcours martial et personnel.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-red-600">
                <div className="text-red-600 mb-4">{value.icon}</div>
                <h4 className="text-xl mb-3">{value.title}</h4>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* But et Objectifs */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Target size={28} className="text-red-600" />
            <h3 className="text-3xl">But et Objectifs</h3>
          </div>
          
          <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-blue-100 mb-8">
            <h4 className="text-2xl mb-4 text-blue-800">Mission Principale</h4>
            <p className="text-neutral-700 text-lg leading-relaxed">
              Le SHAIDA vise à <strong>former des individus équilibrés, confiants et respectueux</strong>, 
              capables de se défendre efficacement tout en contribuant positivement à la société. 
              Au-delà de la simple technique de combat, notre discipline aspire à développer 
              l'excellence humaine dans toutes ses dimensions.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-3">
                  <Badge className="bg-red-600 text-white mt-1">{index + 1}</Badge>
                  <div>
                    <h4 className="text-xl mb-2">{objective.title}</h4>
                    <p className="text-neutral-600">{objective.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Entités */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Users size={28} className="text-red-600" />
            <h3 className="text-3xl">Structure et Entités</h3>
          </div>
          
          <p className="text-neutral-600 mb-8 text-center max-w-3xl mx-auto">
            La discipline SHAIDA s'organise autour d'entités structurées qui garantissent 
            la qualité de l'enseignement et le développement harmonieux de la communauté.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {entities.map((entity, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-xl mb-2">{entity.name}</h4>
                    <Badge className="bg-blue-100 text-blue-800 mb-3">{entity.role}</Badge>
                    <p className="text-neutral-600">{entity.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-8 p-6 bg-gradient-to-r from-red-600 to-red-800 text-white">
            <div className="flex items-center gap-4">
              <Award size={40} className="flex-shrink-0" />
              <div>
                <h4 className="text-xl mb-2">Notre Dojo - Port-Bouët</h4>
                <p className="text-red-100">
                  Notre dojo, situé au carrefour marché d'Adjouffou à Port-Bouët, est un dojo affilié 
                  officiel sous la direction du Grand Maître KOUAME Ahoussi Eugene. Nous perpétuons 
                  l'enseignement authentique du SHAIDA tout en contribuant au rayonnement de la discipline 
                  en Côte d'Ivoire.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Citation inspirante */}
        <div className="mt-16 text-center">
          <Card className="p-8 max-w-4xl mx-auto bg-gradient-to-br from-neutral-800 to-neutral-900 text-white border-none">
            <div className="text-6xl text-red-400 mb-4">"</div>
            <p className="text-2xl italic mb-4">
              Le SHAIDA n'est pas seulement un art de combat, c'est un art de vivre. 
              À travers la pratique, nous forgeons notre corps, aiguisons notre esprit 
              et élevons notre âme.
            </p>
            <p className="text-red-400">— Grand Maître KOUAME Ahoussi Eugene</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
