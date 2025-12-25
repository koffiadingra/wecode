import { MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl mb-6">
            Contactez-Nous
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Une question ? Envie de commencer votre parcours dans le SHAIDA ? N&apos;hésitez pas à nous contacter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl mb-6">Informations Pratiques</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg mb-1">Adresse</h4>
                  <p className="text-neutral-600">
                    Carrefour Marché d&apos;Adjouffou<br />
                    Commune de Port-Bouët<br />
                    Abidjan, Côte d&apos;Ivoire
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg mb-1">Téléphone</h4>
                  <p className="text-neutral-600">+225 XX XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg mb-1">Email</h4>
                  <p className="text-neutral-600">contact@shaida-dojo.ci</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-100 p-6">
              <h4 className="text-lg mb-3">Accès</h4>
              <p className="text-neutral-600 mb-2">
                <strong>Quartier:</strong> Port-Bouët
              </p>
              <p className="text-neutral-600 mb-2">
                <strong>Repère:</strong> Marché d&apos;Adjouffou
              </p>
              <p className="text-neutral-600">
                <strong>Transport:</strong> Accessible en taxi et bus
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-6">Envoyez-nous un Message</h3>
            
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-500 text-green-800 p-8 text-center">
                <p className="text-xl mb-2">✓ Message envoyé avec succès !</p>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-neutral-700">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-neutral-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-neutral-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-neutral-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Envoyer le Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
