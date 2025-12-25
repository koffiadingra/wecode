import { Zap, Shield, Wind, Mountain } from 'lucide-react';

export function Techniques() {
  const techniques = [
    {
      icon: Zap,
      name: 'Katas de Puissance',
      description: 'Séquences de mouvements codifiés qui développent la force explosive et la coordination.',
      level: 'Tous niveaux'
    },
    {
      icon: Shield,
      name: 'Défense Tactique',
      description: 'Techniques de blocage et de contre-attaque pour neutraliser efficacement les menaces.',
      level: 'Intermédiaire'
    },
    {
      icon: Wind,
      name: 'Fluidité du Mouvement',
      description: 'Enchaînements fluides qui allient vitesse, précision et économie d&apos;énergie.',
      level: 'Tous niveaux'
    },
    {
      icon: Mountain,
      name: 'Méditation Guerrière',
      description: 'Pratiques méditatives pour renforcer l&apos;esprit, la concentration et le contrôle émotionnel.',
      level: 'Tous niveaux'
    }
  ];

  return (
    <section id="techniques" className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Les Techniques du SHAIDA
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Notre programme d&apos;entraînement couvre quatre piliers fondamentaux qui forment un pratiquant complet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techniques.map((technique, index) => (
            <div key={index} className="bg-neutral-800 p-6 hover:bg-neutral-700 transition-colors">
              <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <technique.icon size={28} />
              </div>
              <h3 className="text-xl mb-3">{technique.name}</h3>
              <p className="text-neutral-300 mb-4">{technique.description}</p>
              <span className="inline-block px-3 py-1 bg-neutral-900 text-sm text-red-400">
                {technique.level}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-neutral-800 p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl mb-4">
                Programme de Progression
              </h3>
              <p className="text-neutral-300 mb-6">
                Notre système de ceintures vous guide à travers plusieurs niveaux de maîtrise, de la ceinture blanche à la ceinture noire, puis les grades DUAN. Chaque niveau représente une étape de votre développement technique et spirituel.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-white"></div>
                  <span>Blanche</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-white border-2 border-neutral-400"></div>
                  <span>Blanche 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-yellow-400"></div>
                  <span>Jaune</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-yellow-400 border-2 border-yellow-600"></div>
                  <span>Jaune 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-red-600"></div>
                  <span>Rouge</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-red-600 border-2 border-red-800"></div>
                  <span>Rouge 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-green-600"></div>
                  <span>Verte</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-green-600 border-2 border-green-800"></div>
                  <span>Verte 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-blue-600"></div>
                  <span>Bleue</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-blue-600 border-2 border-blue-800"></div>
                  <span>Bleue 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-amber-800"></div>
                  <span>Marron</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-amber-800 border-2 border-amber-950"></div>
                  <span>Marron 2ème degré</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-3 bg-neutral-950"></div>
                  <span>Noire</span>
                </div>
                <div className="pt-3 border-t border-neutral-600">
                  <p className="text-sm text-neutral-400 mb-2">Grades DUAN (Ceinture Noire):</p>
                  <p className="text-neutral-300">1er au 10ème DUAN</p>
                </div>
              </div>
            </div>
            <div className="h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1730104196488-da2fb5beb3b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzY1Mjc5MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Méditation SHAIDA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}