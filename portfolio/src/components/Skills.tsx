import { motion } from 'motion/react';
import { Palette, Database, Smartphone, Zap, Server, Cloud } from 'lucide-react';
import {
  FaVuejs,
  FaReact,
  FaPhp,
  FaPython,
  FaJava,
  FaRust,
  FaHtml5,
  FaCss3Alt,
  FaDatabase
} from 'react-icons/fa';
import {
  SiNestjs,
  SiSpringboot,
  SiTailwindcss,
  SiNextdotjs,
  SiC,
  SiReact,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiFirebase,
  SiAppwrite,
  SiCloudinary,
  SiSupabase
} from 'react-icons/si';

export function Skills() {
  const skillsData = [
    {
      category: 'Frontend Development',
      icon: Palette,
      color: 'from-cyan-400 to-blue-600',
      skills: [
        { name: 'Vue.js', level: 98, icon: <FaVuejs className="w-5 h-5 mr-2 text-green-500" /> },
        { name: 'ReactJS & TypeScript', level: 95, icon: <FaReact className="w-5 h-5 mr-2 text-cyan-400" /> },
        { name: 'Next.js', level: 88, icon: <SiNextdotjs className="w-5 h-5 mr-2 text-white" /> },
        { name: 'TailwindCSS', level: 92, icon: <SiTailwindcss className="w-5 h-5 mr-2 text-cyan-300" /> },
        {
          name: 'HTML5 & CSS3',
          level: 95,
          icon: (
            <>
              <FaHtml5 className="w-5 h-5 mr-1 text-orange-500" />
              <FaCss3Alt className="w-5 h-5 mr-2 text-blue-500" />
            </>
          ),
        },
      ],
    },

    {
      category: 'Backend Development',
      icon: Server,
      color: 'from-purple-400 to-pink-600',
      skills: [
        { name: 'Python (Flask)', level: 85, icon: <FaPython className="w-5 h-5 mr-2 text-yellow-400" /> },
        { name: 'PHP (Laravel)', level: 90, icon: <FaPhp className="w-5 h-5 mr-2 text-purple-500" /> },
        { name: 'NestJS', level: 89, icon: <SiNestjs className="w-5 h-5 mr-2 text-red-500" /> },
        { name: 'Java (Spring Boot)', level: 82, icon: <FaJava className="w-5 h-5 mr-2 text-red-600" /> },
        { name: 'Spring Boot', level: 80, icon: <SiSpringboot className="w-5 h-5 mr-2 text-green-600" /> },
      ],
    },

    {
      category: 'Bases de Données',
      icon: Database,
      color: 'from-emerald-400 to-green-600',
      skills: [
        { name: 'MongoDB', level: 88, icon: <SiMongodb className="w-5 h-5 mr-2 text-green-500" /> },
        { name: 'MySQL', level: 85, icon: <SiMysql className="w-5 h-5 mr-2 text-blue-500" /> },
        { name: 'SQLite', level: 75, icon: <SiSqlite className="w-5 h-5 mr-2 text-gray-400" /> },
      ],
    },

    {
      category: 'Mobile Development',
      icon: Smartphone,
      color: 'from-green-400 to-emerald-600',
      skills: [
        { name: 'React Native', level: 93, icon: <SiReact className="w-5 h-5 mr-2 text-blue-400" /> },
      ],
    },

    {
      category: 'System Programming',
      icon: Zap,
      color: 'from-orange-400 to-red-600',
      skills: [
        { name: 'Rust', level: 60, icon: <FaRust className="w-5 h-5 mr-2 text-orange-500" /> },
        { name: 'C', level: 70, icon: <SiC className="w-5 h-5 mr-2 text-blue-500" /> },
      ],
    },

    {
      category: 'Outils & Services',
      icon: Cloud,
      color: 'from-sky-400 to-indigo-600',
      skills: [
        { name: 'Firebase', level: 85, icon: <SiFirebase className="w-5 h-5 mr-2 text-yellow-500" /> },
        { name: 'Appwrite', level: 80, icon: <SiAppwrite className="w-5 h-5 mr-2 text-pink-500" /> },
        { name: 'Cloudinary', level: 78, icon: <SiCloudinary className="w-5 h-5 mr-2 text-blue-400" /> },
        { name: 'Supabase', level: 82, icon: <SiSupabase className="w-5 h-5 mr-2 text-emerald-400" /> },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl neon-blue mb-4">Compétences</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Une maîtrise complète des technologies modernes pour concevoir des solutions performantes et scalables
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-8 holographic hover:scale-105 transition-transform duration-500"
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${category.color}`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl text-cyan-400">{category.category}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 items-center">
                      <span className="text-gray-300 flex items-center">
                        {skill.icon}
                        {skill.name}
                      </span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>

                    <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}