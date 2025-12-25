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
import { useState } from 'react';

export default function App() {
  const [showEspacePersonnel, setShowEspacePersonnel] = useState(false);
  const [showEspaceAdmin, setShowEspaceAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header 
        onShowAdmin={() => setShowEspaceAdmin(true)}
        onShowPractitioner={() => setShowEspacePersonnel(true)}
      />
      <main>
        <Hero />
        <About />
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