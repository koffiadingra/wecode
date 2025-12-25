import { Target, Heart, Users, Award } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Discipline',
      description: 'Développez votre concentration et votre maîtrise de soi à travers des exercices rigoureux.'
    },
    {
      icon: Heart,
      title: 'Respect',
      description: 'Apprenez les valeurs du respect envers soi-même, les autres et la tradition.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Rejoignez une famille de pratiquants passionnés et soutenants.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Poursuivez constamment l&apos;amélioration et la perfection de votre pratique.'
    }
  ];

  return (
    <section id="a-propos" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl mb-6">
              Qu&apos;est-ce que le SHAIDA ?
            </h2>
            <div className="space-y-4 text-neutral-700">
              <p>
                Le SHAIDA est une discipline martiale moderne qui puise ses racines dans les traditions ancestrales des arts martiaux asiatiques. Elle combine des techniques de frappe, de défense et de méditation pour créer un système complet de développement personnel.
              </p>
              <p>
                Fondé sur les principes d&apos;équilibre, de fluidité et de puissance contrôlée, le SHAIDA enseigne non seulement l&apos;autodéfense, mais aussi la confiance en soi, la discipline mentale et le bien-être physique.
              </p>
              <p>
                Que vous soyez débutant ou pratiquant expérimenté, le SHAIDA offre un parcours d&apos;apprentissage adapté à tous les niveaux, tous les âges et toutes les capacités physiques.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1550759807-50dc0b381a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhdGUlMjBkb2pvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1Mjc5MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dojo SHAIDA"
              className="w-full h-full object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6 bg-neutral-50 hover:bg-neutral-100 transition-colors">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon size={32} />
              </div>
              <h3 className="text-xl mb-3">{value.title}</h3>
              <p className="text-neutral-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
