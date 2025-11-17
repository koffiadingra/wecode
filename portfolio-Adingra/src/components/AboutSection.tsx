import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const technologies = [
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Flask', icon: '🔥', category: 'Backend' },
  { name: 'PHP', icon: '🐘', category: 'Backend' },
  { name: 'Laravel', icon: '⚡', category: 'Backend' },
  { name: 'JavaScript', icon: '⚡', category: 'Frontend' },
  { name: 'Vue.js', icon: '💚', category: 'Frontend' },
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'React Native', icon: '📱', category: 'Mobile' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'NestJS', icon: '🦁', category: 'Backend' },
  { name: 'TailwindCSS', icon: '🎨', category: 'Frontend' },
  { name: 'HTML5', icon: '🌐', category: 'Frontend' },
  { name: 'CSS3', icon: '🎭', category: 'Frontend' },
  { name: 'Rust', icon: '🦀', category: 'System' },
];

export function AboutSection() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            À Propos
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Secondary photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl rounded-3xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* Glass card frame */}
              <div className="relative w-80 h-96 rounded-3xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 p-1">
                <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                  {/* Replace with your actual photo */}
                  <ImageWithFallback
                    src="/src/assets/1763398165966.png"
                    alt="ADINGRA Koffi Jean Emmanuel Martial"
                    className="w-full h-full object-cover"
                  />
                  {/* Placeholder when no photo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/80 to-purple-900/80">
                    <svg className="w-40 h-40 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-400/50" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-purple-400/50" />
              </div>

              {/* Floating particles */}
              <motion.div
                className="absolute top-10 -left-10 w-4 h-4 bg-blue-500 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute bottom-10 -right-10 w-4 h-4 bg-purple-500 rounded-full"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />
            </div>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="mb-4 text-blue-400">Développeur Full-Stack</h3>
              <p className="text-gray-300 leading-relaxed">
                Développeur full-stack spécialisé dans la création d'applications modernes, performantes et scalables. 
                Passionné par l'innovation technologique et l'architecture logicielle, je transforme des idées complexes 
                en solutions élégantes et efficaces.
              </p>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <h3 className="mb-4 text-purple-400">Expertise & Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                Fort d'une expertise dans les technologies modernes du web et du mobile, je crée des expériences 
                utilisateur exceptionnelles en combinant design, performance et robustesse technique. Mon approche 
                allie créativité et rigueur pour des résultats qui dépassent les attentes.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Technologies showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-center mb-8 text-gray-300">Technologies Maîtrisées</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  rotateY: 10,
                }}
                className="group relative"
              >
                <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <div className="text-xs text-gray-400">{tech.name}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-blue-500/30">
                    {tech.category}
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 blur-xl rounded-xl transition-all duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
