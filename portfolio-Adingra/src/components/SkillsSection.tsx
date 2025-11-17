import { motion } from 'motion/react';

const skillCategories = [
  {
    category: 'Frontend',
    color: 'blue',
    skills: [
      { name: 'Vue.js', level: 90, icon: '💚' },
      { name: 'React', level: 95, icon: '⚛️' },
      { name: 'React Native', level: 85, icon: '📱' },
      { name: 'Next.js', level: 90, icon: '▲' },
      { name: 'TailwindCSS', level: 95, icon: '🎨' },
      { name: 'HTML/CSS', level: 98, icon: '🌐' },
    ],
  },
  {
    category: 'Backend',
    color: 'purple',
    skills: [
      { name: 'Flask (Python)', level: 88, icon: '🔥' },
      { name: 'Laravel (PHP)', level: 92, icon: '⚡' },
      { name: 'NestJS', level: 87, icon: '🦁' },
    ],
  },
  {
    category: 'Langage Système',
    color: 'orange',
    skills: [
      { name: 'Rust', level: 82, icon: '🦀' },
    ],
  },
];

export function SkillsSection() {
  return (
    <section className="py-20 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Compétences
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Expertise technique dans les technologies modernes du développement web et mobile
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              {/* Category header */}
              <div className="mb-6">
                <h3 className={`text-${category.color}-400 mb-2`}>
                  {category.category}
                </h3>
                <div className={`h-0.5 w-16 bg-gradient-to-r from-${category.color}-500 to-${category.color}-700 rounded-full`} />
              </div>

              {/* Skills grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                    }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-${category.color}-500/0 to-${category.color}-500/0 group-hover:from-${category.color}-500/20 group-hover:to-${category.color}-500/20 blur-xl rounded-2xl transition-all duration-300`} />

                    {/* Card */}
                    <div className="relative backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300">
                      {/* Icon and name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </div>
                        <div>
                          <div className="text-white">{skill.name}</div>
                          <div className="text-sm text-gray-500">{skill.level}%</div>
                        </div>
                      </div>

                      {/* 3D Progress bar */}
                      <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        {/* Background track with grid pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)]" />
                        
                        {/* Progress fill */}
                        <motion.div
                          className={`h-full bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 rounded-full relative overflow-hidden`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        >
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3,
                            }}
                          />
                        </motion.div>

                        {/* Top highlight for 3D effect */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>

                      {/* Orbiting particles for high-level skills */}
                      {skill.level >= 90 && (
                        <>
                          <motion.div
                            className={`absolute top-2 right-2 w-2 h-2 bg-${category.color}-400 rounded-full`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          />
                          <motion.div
                            className={`absolute bottom-2 left-2 w-2 h-2 bg-${category.color}-400 rounded-full`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 1,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Projets Réalisés', value: '50+', icon: '🚀' },
            { label: 'Technologies', value: '14+', icon: '⚡' },
            { label: 'Années d\'Expérience', value: '5+', icon: '📅' },
            { label: 'Clients Satisfaits', value: '30+', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="text-3xl mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
