import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, User, ClipboardCheck, Lock } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Card } from '../components/Card';

const Home = () => (
  <div className="container">
    <Logo />

    <p className="serif text-gold-main mb-8 italic">
      Alinhe sua base. Sua posição muda.
    </p>

    <main>
      <Card 
        title="Diagnóstico POSIÇÃO"
        description="Revele onde sua base está desalinhada"
        buttonText="Iniciar diagnóstico"
        link="/diagnostico"
        variant="primary"
      />
      <Card 
        title="Sessão POSIÇÃO"
        description="Realinhamento guiado"
        buttonText="Agendar"
        link="/clube"
        variant="secondary"
      />
      <Card 
        title="Clube POSIÇÃO"
        description="Meditações semanais"
        buttonText="Tornar-se membro"
        link="/membros"
        variant="secondary"
      />
    </main>

    <footer className="mt-12 flex flex-col items-center gap-6">
      <Link to="/login" className="text-gold-main/60 text-xs uppercase tracking-widest hover:text-gold-main transition-colors flex items-center gap-2">
        <Lock size={12} /> Área de membros
      </Link>
      <p className="text-text-main/20 text-[10px] tracking-[0.3em] uppercase">
        © POSIÇÃO
      </p>
    </footer>
  </div>
);

export default Home;
