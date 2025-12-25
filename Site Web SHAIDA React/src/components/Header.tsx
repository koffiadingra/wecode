import { Menu, X, User, Shield } from 'lucide-react';
import { useState } from 'react';

export function Header({ 
  onShowAdmin, 
  onShowPractitioner 
}: { 
  onShowAdmin?: () => void;
  onShowPractitioner?: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'a-propos', label: 'À Propos' },
    { id: 'techniques', label: 'Techniques' },
    { id: 'actualites', label: 'Actualités' },
    { id: 'horaires', label: 'Horaires' },
    { id: 'instructeurs', label: 'Instructeur' },
    { id: 'pratiquants', label: 'Pratiquants' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white z-50 shadow-2xl border-b border-red-600/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600 rounded-full blur-md group-hover:blur-lg transition-all opacity-50"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform cursor-pointer">
                <span className="text-2xl">武</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl tracking-widest font-light">SHAIDA</span>
              <span className="text-xs text-red-400 tracking-wide">Art Martial Traditionnel</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 hover:text-red-400 transition-all hover:bg-white/5 rounded-lg relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onShowPractitioner}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm border border-white/10 hover:border-red-500/50"
              title="Espace Personnel"
            >
              <User size={18} />
              <span className="text-sm">Espace Personnel</span>
            </button>
            <button
              onClick={onShowAdmin}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-lg hover:shadow-red-600/50"
              title="Espace Admin"
            >
              <Shield size={18} />
              <span className="text-sm">Admin</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 animate-fadeIn">
            <nav className="flex flex-col gap-2 mb-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left px-4 py-3 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-2 px-4">
              <button
                onClick={() => {
                  onShowPractitioner?.();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all border border-white/10"
              >
                <User size={18} />
                <span>Espace Personnel</span>
              </button>
              <button
                onClick={() => {
                  onShowAdmin?.();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-all shadow-lg"
              >
                <Shield size={18} />
                <span>Espace Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
