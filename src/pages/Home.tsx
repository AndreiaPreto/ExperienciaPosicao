import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Logo } from '../components/Logo';
import { Card } from '../components/Card';

const Home = () => (
  <div className="container max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    {/* Header with Brand Logo */}
    <div className="flex flex-col items-center mb-8">
      <Logo />
    </div>

    {/* Hero Section with Photo and Headline */}
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card border border-gold-main/30 bg-gradient-to-b from-gold-main/[0.06] via-black/80 to-black/95 rounded-3xl p-6 sm:p-8 mb-10 text-center relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-gold-main/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-50 h-50 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      {/* Andreia's Main Image Container */}
      <div className="relative mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6 rounded-2xl overflow-hidden border-2 border-gold-main/40 shadow-[0_8px_30px_rgba(201,160,74,0.2)] group">
        <img 
          src="/assets/Foto Andreia.png" 
          alt="Andréia - Experiência Posição" 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-gold-main/15 border border-gold-main/30 px-3.5 py-1 rounded-full mb-4">
        <Sparkles size={13} className="text-gold-main" />
        <span className="text-gold-main font-bold uppercase tracking-[0.2em] text-[10px] font-sans">
          Jornada de Transformação
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="serif text-3xl sm:text-4xl text-gold-light font-semibold mb-3 leading-tight">
        Alinhe sua base. Sua posição muda.
      </h1>

      <p className="text-white/75 font-light text-sm sm:text-base leading-relaxed max-w-lg mx-auto font-sans mb-2">
        Sua vida ganha clareza, força e direção quando você descobre e alinha a sua verdadeira posição interna.
      </p>
    </motion.section>

    {/* Main Options / Cards */}
    <main className="space-y-4">
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

    {/* Footer */}
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

