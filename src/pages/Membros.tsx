// src/pages/Membros.tsx — ✅ bg-bg3 → glass-card | botões unificados
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Play, Music, ChevronRight, Sparkles } from 'lucide-react';

const Membros = () => (
  <div className="min-h-screen bg-deep-black px-6 py-10 flex flex-col max-w-lg mx-auto">

    {/* Header */}
    <header className="flex justify-between items-start mb-12">
      <div>
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans mb-1">
          Experiência Posição
        </p>
        <h1 className="font-serif text-3xl text-gold-light tracking-tight leading-tight">
          Olá, Ana
        </h1>
        <p className="text-white/30 text-sm font-light mt-1">Seu espaço de alinhamento.</p>
      </div>
      <Link
        to="/login"
        className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06]
                   flex items-center justify-center text-gold-main/40
                   hover:text-gold-main hover:border-gold-main/20 transition-all"
        title="Sair"
      >
        <LogOut size={15} strokeWidth={1.5} />
      </Link>
    </header>

    {/* Meditação da semana */}
    <section className="mb-10">
      <p className="text-[9px] uppercase tracking-[0.35em] text-gold-main/40 font-sans mb-4">
        Prática em destaque
      </p>
      {/* ✅ glass-card substituiu bg-bg3 + border manual */}
      <div className="glass-card flex items-center gap-5 p-5">
        <button className="w-12 h-12 rounded-full bg-gold-main flex items-center justify-center
                           text-deep-black flex-shrink-0 hover:bg-gold-light transition-colors
                           shadow-[0_4px_12px_rgba(201,160,74,0.2)]">
          <Play size={18} fill="currentColor" strokeWidth={0} />
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg text-gold-light leading-tight truncate">
            Ocupando seu lugar
          </h3>
          <p className="text-[10px] text-white/30 font-sans uppercase tracking-widest mt-0.5">
            12 min · Foco: Base
          </p>
        </div>
        {/* ✅ sem rounded-full no botão de texto */}
        <button className="text-[9px] uppercase tracking-[0.2em] text-gold-main/60
                           hover:text-gold-main transition-colors font-sans flex-shrink-0">
          Ouvir
        </button>
      </div>
    </section>

    {/* Biblioteca */}
    <section className="mb-10">
      <p className="text-[9px] uppercase tracking-[0.35em] text-gold-main/40 font-sans mb-4">
        Sua biblioteca de práticas
      </p>
      <div className="space-y-2">
        {[
          { titulo: "Raiz e segurança",   duracao: "10 min" },
          { titulo: "Soltar o controle",  duracao: "15 min" },
          { titulo: "Estabilizar a base", duracao: "18 min" },
        ].map(({ titulo, duracao }) => (
          <button
            key={titulo}
            /* ✅ glass-card com rounded-lg — sem rounded-xl manual */
            className="w-full glass-card p-4 flex items-center gap-4
                       hover:border-gold-main/20 transition-all group text-left"
          >
            <div className="w-8 h-8 rounded-full bg-gold-main/8 border border-gold-main/15
                            flex items-center justify-center text-gold-main/50
                            group-hover:text-gold-main transition-colors flex-shrink-0">
              <Music size={13} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/60 text-sm font-light group-hover:text-white/80
                            transition-colors truncate">
                {titulo}
              </p>
              <p className="text-[9px] text-white/20 font-sans uppercase tracking-widest mt-0.5">
                {duracao}
              </p>
            </div>
            <ChevronRight size={14} className="text-gold-main/20 group-hover:text-gold-main/50
                                               transition-colors flex-shrink-0" strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </section>

    {/* Sessão individual */}
    <section className="mb-10">
      <div className="glass-card border-gold-main/15 bg-gold-main/[0.01] p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-gold-main/40" strokeWidth={1.5} />
          <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans">
            Atendimento único
          </p>
        </div>
        <h3 className="font-serif text-2xl text-gold-light leading-tight mb-3">
          Sessão Posição
        </h3>
        <p className="text-white/35 text-sm font-light leading-relaxed mb-5">
          Realinhamento guiado do seu lugar com acompanhamento individual.
        </p>
        {/* ✅ .button = rounded-lg */}
        <button className="button">Agendar</button>
      </div>
    </section>

    <nav className="mt-auto pt-4 flex justify-center">
      <Link
        to="/"
        className="text-white/15 text-[9px] uppercase tracking-[0.3em] font-sans
                   hover:text-gold-main/40 transition-colors"
      >
        Voltar ao início
      </Link>
    </nav>
  </div>
);

export default Membros;
