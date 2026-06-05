// src/pages/Obrigado.tsx
// ✅ Tipografia unificada + número WhatsApp correto + nome atualizado
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const Obrigado = () => (
  <div className="min-h-screen bg-deep-black flex flex-col items-center justify-center px-6 py-16">

    {/* Topo — logo */}
    <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans mb-1">
      Experiência Posição
    </p>

    {/* Ícone de confirmação */}
    <div className="w-20 h-20 rounded-full bg-gold-main/8 border border-gold-main/20
                    flex items-center justify-center text-gold-main mt-12 mb-8">
      <CheckCircle2 size={40} strokeWidth={1.5} />
    </div>

    {/* Headline */}
    <h1 className="font-serif text-4xl md:text-5xl text-gold-light text-center
                   leading-tight tracking-tight mb-4">
      Diagnóstico<br />
      <em className="font-light italic text-gold-main/70">Concluído</em>
    </h1>

    <p className="text-white/40 font-light text-sm leading-relaxed text-center
                  max-w-sm mb-10">
      Obrigada por responder com honestidade.<br />
      Sua leitura personalizada está sendo preparada.
    </p>

    {/* Card de prazo */}
    <div className="w-full max-w-sm glass-card border-gold-main/15 bg-gold-main/[0.02]
                    p-6 mb-10 text-center">
      <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-2">
        Próximo passo
      </p>
      <p className="text-white/50 text-sm font-light leading-relaxed">
        Você receberá seu áudio personalizado via WhatsApp
        em até <span className="text-gold-main font-medium">48 horas úteis</span>.
      </p>
    </div>

    {/* CTAs */}
    <div className="w-full max-w-sm flex flex-col gap-3">
      <Link
        to="/membros"
        className="button w-full flex items-center justify-center gap-2"
      >
        Acessar área de membros
      </Link>

      {/* ✅ Número correto de WhatsApp do .env */}
      <a
        href={`https://wa.me/${(import.meta as any).env.VITE_WHATSAPP_NUM || '5548991261832'}?text=Olá!%20Concluí%20meu%20Diagnóstico%20de%20Posição%20e%20aguardo%20minha%20leitura.`}
        target="_blank"
        rel="noopener noreferrer"
        className="button-outline w-full flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} strokeWidth={1.5} />
        Falar no WhatsApp
      </a>

      <Link
        to="/"
        className="text-gold-main/25 text-[10px] uppercase tracking-[0.3em]
                   hover:text-gold-main/60 transition-colors text-center mt-2 font-sans"
      >
        Voltar ao início
      </Link>
    </div>
  </div>
);

export default Obrigado;
