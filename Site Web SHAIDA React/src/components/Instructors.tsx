import { Award, Star } from 'lucide-react';

export function Instructors() {
  const instructors = [
    {
      name: 'Grand Maître (Shifou) KOUAME Ahoussi Eugene',
      rank: 'Ceinture Noire 5ème DUAN',
      experience: '25 ans d\'expérience',
      specialties: ['Katas', 'Compétition', 'Autodéfense', 'Enfants', 'Technique', 'Méditation'],
      bio: 'Fondateur et directeur technique du dojo, Grand Maître KOUAME a dédié sa vie à la pratique et à l\'enseignement du SHAIDA. Champion national à plusieurs reprises, il forme aujourd\'hui la nouvelle génération de pratiquants avec passion et rigueur.'
    }
  ];

  return (
    <section id="instructeurs" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Notre Instructeur
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Apprenez auprès d&apos;un maître expérimenté, passionné par la transmission de son savoir.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          {instructors.map((instructor, index) => (
            <div key={index} className="bg-white p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <Award size={40} />
                </div>
                <div>
                  <h3 className="text-2xl mb-1">{instructor.name}</h3>
                  <p className="text-red-600 mb-1">{instructor.rank}</p>
                  <p className="text-neutral-600">{instructor.experience}</p>
                </div>
              </div>

              <p className="text-neutral-700 mb-6">{instructor.bio}</p>

              <div>
                <p className="text-sm uppercase tracking-wide text-neutral-500 mb-3">
                  Spécialités
                </p>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 text-neutral-700"
                    >
                      <Star size={14} className="text-red-600" />
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-neutral-900 text-white p-12 text-center">
          <h3 className="text-3xl mb-4">
            Nos Valeurs Pédagogiques
          </h3>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="text-xl mb-2">Individualisation</h4>
              <p className="text-neutral-300">Chaque élève progresse à son rythme avec un suivi personnalisé</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🤝</div>
              <h4 className="text-xl mb-2">Bienveillance</h4>
              <p className="text-neutral-300">Un environnement positif et encourageant pour tous</p>
            </div>
            <div>
              <div className="text-4xl mb-3">📚</div>
              <h4 className="text-xl mb-2">Tradition</h4>
              <p className="text-neutral-300">Respect des enseignements ancestraux et des valeurs martiales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}