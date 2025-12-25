import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-lg">武</span>
              </div>
              <span className="text-xl tracking-wider">SHAIDA</span>
            </div>
            <p className="text-neutral-400">
              L&apos;art martial de l&apos;équilibre et de la force intérieure.
            </p>
          </div>

          <div>
            <h4 className="text-lg mb-4">Navigation</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('accueil');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('a-propos');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  À Propos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('techniques');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Techniques
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('horaires');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  Horaires
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>Carrefour Marché d&apos;Adjouffou</li>
              <li>Port-Bouët, Abidjan</li>
              <li>Côte d&apos;Ivoire</li>
              <li>contact@shaida-dojo.ci</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg mb-4">Suivez-Nous</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-400">
          <p>&copy; 2025 SHAIDA Dojo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}