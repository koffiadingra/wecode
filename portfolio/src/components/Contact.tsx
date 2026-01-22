import { motion } from "motion/react";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

export function Contact() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/koffiadingra/wecode",
      color: "from-gray-600 to-gray-800",
      hoverColor: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/koffi-jean-emmanuel-martial-adingra-3b7622361/",
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:text-blue-400",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:koffi.adingra@epitech.eu",
      color: "from-cyan-600 to-cyan-800",
      hoverColor: "hover:text-cyan-400",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "koffi.adingra@epitech.eu",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+225 0778909537",
    },
    {
      icon: Phone,
      label: "Téléphone whatsapp",
      value: "+225 0586903607",
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Côte d'Ivoire",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl neon-blue mb-4">
            Contactez-moi
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Vous avez un projet en tête ? Contactez-moi directement par email.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Action */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 holographic"
          >
            <h3 className="text-2xl mb-6 text-cyan-400">
              Envoyer un message
            </h3>

            <p className="text-gray-400 mb-8">
              En cliquant sur le bouton ci-dessous, votre boîte mail s’ouvrira
              automatiquement avec mon adresse déjà renseignée.
            </p>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 glow-blue h-14"
            >
              <a
                href="mailto:koffi.adingra@epitech.eu?cc=koffi.adingra@epitech.eu&subject=Prise%20de%20contact"
              >
                <Mail className="w-5 h-5 mr-2" />
                Envoyer un message
              </a>
            </Button>
          </motion.div>

          {/* Infos + réseaux */}
          <div className="space-y-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 holographic flex items-center space-x-4"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{info.label}</div>
                    <div className="text-cyan-400">{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 holographic"
            >
              <h3 className="text-xl mb-6 text-purple-400">
                Réseaux sociaux
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 glass rounded-xl p-6 flex flex-col items-center space-y-3"
                  >
                    <div
                      className={`p-4 rounded-xl bg-gradient-to-br ${social.color}`}
                    >
                      <social.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* CV – MODIFICATION ICI */}
            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-14"
            >
              <a href="/cv/CV public de Koffi Jean Emmanuel Martial ADINGRA français.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                Télécharger mon CV français
              </a>
            </Button>

            <Button
              asChild
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-14"
            >
              <a href="/cv/CV public de Koffi Jean Emmanuel Martial ADINGRA anglais.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                Télécharger mon CV anglais
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}