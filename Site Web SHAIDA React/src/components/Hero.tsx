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
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900/90" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-8 inline-block animate-float">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl group-hover:blur-3xl transition-all opacity-60"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <span className="text-6xl text-white">武</span>
            </div>
          </div>
        </div>
        <h1 className="text-6xl sm:text-7xl lg:text-8xl text-white mb-6 tracking-widest font-light animate-fade-in-up">
          SHAIDA
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-8"></div>
        <p className="text-2xl sm:text-3xl text-neutral-200 mb-6 animate-fade-in-up animation-delay-200">
          L&apos;Art Martial de l&apos;Équilibre et de la Force Intérieure
        </p>
        <p className="text-lg text-neutral-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          Découvrez une discipline ancestrale qui allie technique, discipline et philosophie pour développer votre corps et votre esprit. 
          Un parcours vers l&apos;excellence personnelle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
          <button 
            onClick={scrollToAbout}
            className="group px-10 py-4 bg-red-600 text-white hover:bg-red-700 transition-all rounded-lg shadow-lg hover:shadow-red-600/50 transform hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10">Découvrir SHAIDA</span>
            <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform"></div>
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-10 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-neutral-900 transition-all rounded-lg transform hover:scale-105"
          >
            Nous Contacter
          </button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-red-400 transition-colors"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={40} />
      </button>
    </section>
  );
}