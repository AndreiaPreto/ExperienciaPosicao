import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Play, Music, ClipboardCheck, Calendar, ChevronRight } from 'lucide-react';

const Membros = () => (
  <div className="min-h-screen bg-deep-black px-6 py-10 flex flex-col max-w-lg mx-auto">
    
    {/* Navigation */}
    <div className="flex justify-between items-start text-left mb-8">
      <div>
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans mb-1">
          Área de Membros
        </p>
        <h2 className="serif text-3xl text-gold-light mt-1">Olá, Ana</h2>
        <p className="text-white/40 font-light text-xs leading-relaxed mt-1">Seu espaço de alinhamento.</p>
      </div>
      <Link to="/login" className="p-3 bg-gold-main/5 border border-gold-main/15 rounded-full text-gold-main hover:bg-gold-main/10 transition-colors">
        <LogOut size={16} strokeWidth={1.5} />
      </Link>
    </div>

    {/* Meditação da semana */}
    <section className="space-y-4 text-left mb-8">
      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans">
        Prática em destaque
      </p>
      <div className="glass-card flex items-center gap-4 p-5">
        <div className="w-12 h-12 bg-gold-main rounded-full flex items-center justify-center text-deep-black shrink-0 shadow-[0_4px_12px_rgba(201,160,74,0.2)]">
          <Play size={18} fill="currentColor" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif text-lg text-gold-light">Ocupando seu lugar</h4>
          <p className="text-xs text-white/40 font-light mt-0.5">12 min • Foco: Base</p>
        </div>
        <button className="text-gold-light hover:text-gold-main text-xs uppercase tracking-wider font-semibold transition-colors">
          Ouvir
        </button>
      </div>
    </section>

    {/* Biblioteca */}
    <section className="space-y-4 text-left mb-8">
      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans">
        Sua biblioteca de práticas
      </p>
      <div className="grid grid-cols-1 gap-3">
        {[
          "Raiz e segurança",
          "Soltar controle",
          "Estabilizar base"
        ].map((item) => (
          <div key={item} className="p-4 bg-bg3 border border-gold-main/10 hover:border-gold-main/35 rounded-xl flex items-center justify-between group transition-colors">
            <div className="flex items-center gap-3">
              <Music size={16} className="text-gold-main/50" />
              <span className="text-sm text-white/70 font-light">{item}</span>
            </div>
            <ChevronRight size={16} className="text-gold-main/35 group-hover:text-gold-main transition-transform group-hover:translate-x-0.5" />
          </div>
        ))}
      </div>
    </section>

    {/* Sessão POSIÇÃO */}
    <section className="space-y-4 text-left mb-10">
      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans">
        Atendimento exclusivo
      </p>
      <div className="glass-card p-6">
        <h3 className="font-serif text-2xl text-gold-light mb-3 leading-tight">
          Sessão Posição
        </h3>
        <p className="text-white/40 font-light text-sm leading-relaxed mb-6">
          Realinhamento guiado do seu lugar com acompanhamento individual de 60 minutos.
        </p>
        <button className="button w-full">Agendar</button>
      </div>
    </section>

    <nav className="mt-auto pt-6 flex justify-center">
      <Link to="/" className="text-gold-main/25 text-[10px] uppercase tracking-[0.3em] hover:text-gold-main/60 transition-colors font-sans">
        Voltar ao início
      </Link>
    </nav>
  </div>
);

export default Membros;
