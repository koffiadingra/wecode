import { Hero } from './components/Hero';
import { About } from './components/About';
import { Techniques } from './components/Techniques';
import { Schedule } from './components/Schedule';
import { Instructors } from './components/Instructors';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Pratiquants } from './components/Pratiquants';
import { EspacePersonnel } from './components/EspacePersonnel';
import { EspaceAdmin } from './components/EspaceAdmin';
import { Actualites } from './components/Actualites';
import { Histoire } from './components/Histoire';
import { useState } from 'react';
import { Info } from 'lucide-react';

export default function App() {
  const [showEspacePersonnel, setShowEspacePersonnel] = useState(false);
  const [showEspaceAdmin, setShowEspaceAdmin] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Demo Banner */}
      {showDemoBanner && (
        <div className="fixed top-20 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white z-40 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info size={20} />
              {/* <p className="text-sm">
                <strong>Mode Démonstration</strong> - Toutes les données sont fictives et stockées localement pour présentation.
              </p> */}
            </div>
            <button
              onClick={() => setShowDemoBanner(false)}
              className="text-white/80 hover:text-white text-sm underline"
            >
              Masquer
            </button>
          </div>
        </div>
      )}
      
      <Header 
        onShowAdmin={() => setShowEspaceAdmin(true)}
        onShowPractitioner={() => setShowEspacePersonnel(true)}
      />
      <main>
        <Hero />
        <About />
        <Histoire />
        <Techniques />
        <Actualites />
        <Schedule />
        <Instructors />
        <Pratiquants onShowLogin={() => setShowEspacePersonnel(true)} />
        <Contact />
      </main>
      <Footer />
      
      {showEspacePersonnel && (
        <EspacePersonnel onClose={() => setShowEspacePersonnel(false)} />
      )}
      
      {showEspaceAdmin && (
        <EspaceAdmin onClose={() => setShowEspaceAdmin(false)} />
      )}
    </div>
  );
}