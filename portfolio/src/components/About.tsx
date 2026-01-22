import { motion } from "motion/react";
import { Database, Layout, Smartphone, Server, Cpu, Cloud } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

export function About() {
  const techStack = [
    // Backend / Frontend
    { name: "Python (Flask)", icon: "🐍", color: "from-yellow-500 to-blue-500" },
    { name: "PHP (Laravel)", icon: "🐘", color: "from-red-500 to-orange-500" },
    { name: "Vue.js", icon: "💚", color: "from-green-400 to-emerald-600" },
    { name: "NestJS", icon: "🔺", color: "from-red-600 to-pink-500" },
    { name: "ReactJS et TS", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
    { name: "React Native", icon: "📱", color: "from-blue-400 to-purple-500" },
    { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600" },
    { name: "TailwindCSS", icon: "💨", color: "from-cyan-300 to-blue-400" },
    { name: "HTML5 & CSS3", icon: "🎨", color: "from-orange-500 to-red-500" },

    // Systèmes
    { name: "Rust", icon: "🦀", color: "from-orange-600 to-red-700" },
    { name: "Java (Spring Boot)", icon: "☕", color: "from-red-500 to-yellow-500" },
    { name: "C", icon: "💻", color: "from-blue-400 to-blue-700" },

    // Bases de données (AJOUT)
    { name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-400" },
    { name: "MySQL", icon: "🗄️", color: "from-blue-600 to-cyan-500" },
    { name: "SQLite", icon: "📦", color: "from-gray-500 to-gray-400" },

    // Outils & BaaS (AJOUT)
    { name: "Firebase", icon: "🔥", color: "from-yellow-400 to-orange-500" },
    { name: "Appwrite", icon: "🧩", color: "from-pink-500 to-purple-600" },
    { name: "Cloudinary", icon: "☁️", color: "from-sky-400 to-blue-600" },
    { name: "Supabase", icon: "⚡", color: "from-emerald-500 to-green-600" },
  ];

  const categories = [
    {
      title: "Frontend",
      icon: Layout,
      skills: ["Vue.js", "ReactJS et TS", "Next.js", "TailwindCSS", "HTML5 & CSS3"],
    },
    {
      title: "Backend",
      icon: Server,
      skills: [
        "Python (Flask)",
        "PHP (Laravel)",
        "Next.js",
        "NestJS",
        "Java (Spring Boot)",
      ],
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["React Native"],
    },
    {
      title: "Systèmes",
      icon: Cpu,
      skills: ["Rust", "C"],
    },
    {
      title: "Bases de Données",
      icon: Database,
      skills: ["MongoDB", "MySQL", "SQLite"],
    },
    {
      title: "Outils & Cloud",
      icon: Cloud,
      skills: ["Firebase", "Appwrite", "Cloudinary", "Supabase"],
    },
  ];

  return (
    <section id="about" className="min-h-screen py-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl neon-purple mb-4">
            À Propos de Moi
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl text-center mb-12 text-cyan-400">
            Stack Technologique
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-6 text-center holographic cursor-pointer"
              >
                <div className="text-4xl md:text-5xl mb-3">{tech.icon}</div>
                <div
                  className={`text-sm bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}
                >
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Catégories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 holographic"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl text-cyan-400">{category.title}</h4>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li key={skill} className="text-gray-300 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}