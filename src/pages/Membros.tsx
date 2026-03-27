import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Play, Music, ClipboardCheck, Calendar, ChevronRight } from 'lucide-react';

const Membros = () => (
  <div className="container min-h-screen flex flex-col gap-8">
    <header className="flex justify-between items-start text-left">
      <div>
        <h2 className="serif text-3xl text-gold-light">Olá, Ana</h2>
        <p className="text-gold-main/60 text-sm">Seu espaço de alinhamento.</p>
      </div>
      <Link to="/login" className="p-2 bg-gold-main/10 rounded-full text-gold-main">
        <LogOut size={20} />
      </Link>
    </header>

    <section className="space-y-4 text-left">
      <h3 className="serif text-xl text-gold-light">Meditação da semana</h3>
      <div className="card flex items-center gap-4">
        <div className="w-12 h-12 bg-gold-main rounded-full flex items-center justify-center text-deep-black shrink-0">
          <Play size={20} fill="currentColor" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gold-light">Ocupando seu lugar</h4>
          <p className="text-xs text-text-main/50">12 min • Foco: Base</p>
        </div>
        <button className="text-gold-main font-semibold text-sm">Ouvir</button>
      </div>
    </section>

    <section className="space-y-4 text-left">
      <h3 className="serif text-xl text-gold-light">Biblioteca</h3>
      <div className="grid grid-cols-1 gap-3">
        {[
          "Raiz e segurança",
          "Soltar controle",
          "Estabilizar base"
        ].map((item) => (
          <div key={item} className="p-4 bg-card-bg border border-gold-main/20 rounded-lg flex items-center justify-between group hover:border-gold-main transition-colors">
            <div className="flex items-center gap-3">
              <Music size={18} className="text-gold-main/60" />
              <span className="text-sm text-text-main/80">{item}</span>
            </div>
            <ChevronRight size={16} className="text-gold-main/30 group-hover:text-gold-main" />
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-4 text-left">
      <h3 className="serif text-xl text-gold-light">Sessão POSIÇÃO</h3>
      <div className="card">
        <p className="text-sm text-text-main/70 mb-4">Realinhamento guiado do seu lugar com acompanhamento individual.</p>
        <button className="btn-primary">Agendar</button>
      </div>
    </section>

    <nav className="mt-auto pt-8 flex justify-center">
      <Link to="/" className="text-gold-main/40 text-xs uppercase tracking-widest hover:text-gold-main transition-colors">
        Voltar ao início
      </Link>
    </nav>
  </div>
);

export default Membros;
