// src/pages/Clube.tsx — tipografia unificada + nome Experiência Posição
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Music, Users, Calendar, Sparkles } from 'lucide-react';

const Clube = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deep-black px-6 py-10 flex flex-col max-w-lg mx-auto">

      {/* Back */}
      <Link
        to="/"
        className="back mb-10"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Voltar
      </Link>

      {/* Breadcrumb */}
      <p className="text-[9px] uppercase tracking-[0.4em] text-white/15 font-sans mb-10">
        Início → Clube Posição
      </p>

      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/40 font-sans mb-3">
          Acompanhamento Contínuo
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-gold-light leading-tight tracking-tight mb-4">
          Clube Posição
        </h1>
        <p className="text-white/40 font-light text-sm leading-relaxed max-w-xs mx-auto">
          Uma assinatura para quem busca manter o alinhamento contínuo
          através de práticas guiadas e presença consciente.
        </p>
      </header>

      {/* Card principal */}
      <div className="glass-card border-gold-main/20 bg-gold-main/[0.01] p-8 mb-6">

        {/* Preço */}
        <div className="flex items-baseline justify-between border-b border-gold-main/10 pb-6 mb-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-1">
              Assinatura mensal
            </p>
            <p className="font-serif text-4xl text-gold-light tracking-tight leading-none">
              R$ 47
              <span className="text-sm font-sans font-light text-white/30 ml-1">/mês</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold-main/10 border border-gold-main/20
                          flex items-center justify-center text-gold-main">
            <Sparkles size={18} strokeWidth={1.5} />
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-5 mb-10">
          {[
            { icon: Music, text: "Meditação inédita toda segunda-feira" },
            { icon: Calendar, text: "Acesso à biblioteca completa de práticas" },
            { icon: Users, text: "Comunidade exclusiva de alinhamento" },
            { icon: CheckCircle2, text: "Descontos em sessões individuais" },
          ].map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gold-main/8 border border-gold-main/15
                              flex items-center justify-center text-gold-main flex-shrink-0 mt-0.5">
                <Icon size={14} strokeWidth={1.5} />
              </div>
              <span className="text-white/55 text-sm font-light leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>

        <Link to="/assinatura-clube" className="button w-full flex items-center justify-center">
          Assinar agora
        </Link>
      </div>

      {/* Card Sessão individual */}
      <div className="glass-card p-6">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-2">
          Atendimento único
        </p>
        <h3 className="font-serif text-2xl text-gold-light mb-3 leading-tight">
          Sessão Posição
        </h3>
        <p className="text-white/35 text-sm font-light leading-relaxed mb-5">
          Um encontro individual de 60 minutos para realinhamento
          profundo e diagnóstico personalizado.
        </p>
        <button
          onClick={() => navigate('/')}
          className="button-outline"
        >
          Saber mais
        </button>
      </div>

    </div>
  );
};

export default Clube;
