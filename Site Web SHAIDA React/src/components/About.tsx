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
    <section id="a-propos" className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <div className="inline-block">
              <div className="w-12 h-1 bg-red-600 mb-4"></div>
              <h2 className="text-4xl sm:text-5xl mb-6">
                Qu&apos;est-ce que le SHAIDA ?
              </h2>
            </div>
            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p className="text-lg">
                Le SHAIDA est une discipline martiale moderne qui puise ses racines dans les traditions ancestrales des arts martiaux asiatiques. Elle combine des techniques de frappe, de défense et de méditation pour créer un système complet de développement personnel.
              </p>
              <p>
                Fondé sur les principes d&apos;équilibre, de fluidité et de puissance contrôlée, le SHAIDA enseigne non seulement l&apos;autodéfense, mais aussi la confiance en soi, la discipline mentale et le bien-être physique.
              </p>
              <p>
                Que vous soyez débutant ou pratiquant expérimenté, le SHAIDA offre un parcours d&apos;apprentissage adapté à tous les niveaux, tous les âges et toutes les capacités physiques.
              </p>
            </div>
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-4xl text-red-600 mb-2">10+</div>
                <div className="text-sm text-neutral-600">Années d&apos;expérience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-red-600 mb-2">100+</div>
                <div className="text-sm text-neutral-600">Pratiquants actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-red-600 mb-2">50+</div>
                <div className="text-sm text-neutral-600">Ceintures noires</div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[550px] group">
            <div className="absolute inset-0 bg-red-600 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
            <img
              src="https://images.unsplash.com/photo-1550759807-50dc0b381a1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJhdGUlMjBkb2pvJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1Mjc5MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Dojo SHAIDA"
              className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="group text-center p-8 bg-white rounded-xl hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:border-red-100 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-red-600/50">
                <value.icon size={28} />
              </div>
              <h3 className="text-xl mb-3 group-hover:text-red-600 transition-colors">{value.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}