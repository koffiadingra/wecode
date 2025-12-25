import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('a-propos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1725813961320-151288b4c4db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJ0aWFsJTIwYXJ0cyUyMHRyYWluaW5nfGVufDF8fHx8MTc2NTI3OTAwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900/80" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-6 inline-block">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-white">武</span>
          </div>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6 tracking-wider">
          SHAIDA
        </h1>
        <p className="text-xl sm:text-2xl text-neutral-200 mb-8">
          L&apos;Art Martial de l&apos;Équilibre et de la Force Intérieure
        </p>
        <p className="text-lg text-neutral-300 mb-12 max-w-2xl mx-auto">
          Découvrez une discipline ancestrale qui allie technique, discipline et philosophie pour développer votre corps et votre esprit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToAbout}
            className="px-8 py-4 bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Découvrir SHAIDA
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-neutral-900 transition-colors"
          >
            Nous Contacter
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}
