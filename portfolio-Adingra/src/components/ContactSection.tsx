import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Me Contacter
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discutons de votre prochain projet. Je suis toujours ouvert à de nouvelles opportunités et collaborations.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-blue-400 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-all">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Email</div>
                    <a href="mailto:adingra.koffi@example.com" className="text-white hover:text-blue-400 transition-colors">
                      adingra.koffi@example.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30 group-hover:border-purple-500/50 transition-all">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Téléphone</div>
                    <a href="tel:+225000000000" className="text-white hover:text-purple-400 transition-colors">
                      +225 00 00 00 00
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  className="flex items-start gap-4 group"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-500/30 group-hover:border-purple-500/50 transition-all">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Localisation</div>
                    <div className="text-white">Abidjan, Côte d'Ivoire</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social links */}
            <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-purple-400 mb-6">Réseaux Sociaux</h3>
              
              <div className="flex gap-4">
                {[
                  { icon: Github, label: 'GitHub', href: '#', color: 'blue' },
                  { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'blue' },
                  { icon: Mail, label: 'Email', href: 'mailto:adingra.koffi@example.com', color: 'purple' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateZ: 5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-4 bg-gradient-to-r from-${social.color}-500/10 to-${social.color}-600/10 rounded-xl border border-${social.color}-500/30 hover:border-${social.color}-500/50 transition-all`}
                  >
                    <social.icon className={`w-6 h-6 text-${social.color}-400 group-hover:text-${social.color}-300 transition-colors`} />
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-blue-500/30">
                      {social.label}
                    </div>

                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-${social.color}-500/0 to-${social.color}-500/0 group-hover:from-${social.color}-500/20 group-hover:to-${social.color}-500/20 blur-xl rounded-xl transition-all duration-300 -z-10`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-blue-400 mb-6">Envoyez un Message</h3>

              {/* Name input */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-gray-400">
                  Nom complet
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="Votre nom"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 rounded-lg transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                    placeholder="votre@email.com"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 rounded-lg transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Message textarea */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-gray-400">
                  Message
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-white/10 rounded-lg focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500 resize-none"
                    placeholder="Votre message..."
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/5 group-focus-within:to-purple-500/5 rounded-lg transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Envoyer le message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="backdrop-blur-md bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400">
              © 2025 ADINGRA Koffi Jean Emmanuel Martial. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Développé avec passion et innovation ✨
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
