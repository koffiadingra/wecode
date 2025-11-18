import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Plateforme e-commerce moderne avec panier intelligent, système de paiement intégré et gestion des stocks en temps réel.',
      image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NjMzMTQ4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['React', 'Next.js', 'TailwindCSS', 'Laravel', 'MySQL'],
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Dashboard Analytics',
      description: 'Tableau de bord analytique avec visualisation de données en temps réel, graphiques interactifs et rapports personnalisés.',
      image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYzMzcwOTU4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['Vue.js', 'Flask', 'PostgreSQL', 'Chart.js'],
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Mobile Banking App',
      description: 'Application bancaire mobile sécurisée avec authentification biométrique, transferts instantanés et gestion de budget.',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYzMzg1MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['React Native', 'NestJS', 'MongoDB', 'Redis'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Web Application Portal',
      description: 'Portail web entreprise avec gestion des utilisateurs, workflow automatisé et intégration multi-services.',
      image: 'https://images.unsplash.com/photo-1762330915249-cd1155571a67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NjMzNTYzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['Next.js', 'Laravel', 'TailwindCSS', 'MySQL'],
      color: 'from-orange-500 to-red-600',
    },
    {
      title: 'API Microservices',
      description: 'Architecture microservices scalable avec API REST/GraphQL, authentification JWT et documentation interactive.',
      image: 'https://images.unsplash.com/photo-1623820866259-3ae2f2c3bb87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGklMjBzeXN0ZW0lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYzMzk3NDA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['NestJS', 'PostgreSQL', 'Docker', 'Redis'],
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Social Media Platform',
      description: 'Réseau social moderne avec fil d\'actualité en temps réel, messagerie instantanée et partage multimédia.',
      image: 'https://images.unsplash.com/photo-1762330915249-cd1155571a67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbnxlbnwxfHx8fDE3NjMzNTYzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      technologies: ['React', 'Flask', 'WebSocket', 'MongoDB'],
      color: 'from-pink-500 to-rose-600',
    },
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl neon-purple mb-4">Mes Projets</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Une sélection de projets démontrant mon expertise technique et ma créativité
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={`${currentPage}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, rotateY: 5 }}
                  className="glass rounded-2xl overflow-hidden holographic group cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${project.color} rounded-xl opacity-80 blur-xl`}></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl mb-3 text-cyan-400 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className={`flex-1 bg-gradient-to-r ${project.color} hover:opacity-80`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/50 hover:bg-purple-500/10"
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={prevPage}
            variant="outline"
            size="icon"
            className="glass border-cyan-500/50 hover:bg-cyan-500/10 glow-blue"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextPage}
            variant="outline"
            size="icon"
            className="glass border-purple-500/50 hover:bg-purple-500/10 glow-purple"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Project Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-gray-400"
        >
          Page {currentPage + 1} sur {totalPages} • {projects.length} projets au total
        </motion.div>
      </div>
    </section>
  );
}
