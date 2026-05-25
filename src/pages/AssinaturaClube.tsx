// src/pages/AssinaturaClube.tsx
// ✅ CORRIGIDO: btn-primary → button | card/rounded → glass-card/rounded-lg
// ✅ rounded-full no badge removido | tipografia unificada
import React from 'react';
import { motion } from 'motion/react';
import { useAccess } from '../context/AccessContext';
import { useNavigate } from 'react-router-dom';
import { Music, Users, Calendar, Sparkles } from 'lucide-react';

const AssinaturaClube = () => {
  const { simulatePurchase } = useAccess();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate('/diagnostico?buy=clube');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8, ease: [0.16,1,0.3,1] }}
      className="min-h-screen bg-deep-black px-6 py-12 flex flex-col max-w-lg mx-auto"
    >
      {/* Logo */}
      <div className="flex flex-col items-center text-center mb-10">
        <img 
          src="/assets/logo-experiencia-posicao.png" 
          alt="Experiência Posição" 
          className="h-32 sm:h-40 w-auto mb-6 object-contain"
          referrerPolicy="no-referrer"
        />
        <h1 className="font-serif text-2xl text-gold-light tracking-tight">
          Clube Posição
        </h1>
      </div>

      {/* Intro */}
      <p className="text-white/35 text-sm font-light leading-relaxed text-center mb-10 max-w-xs mx-auto">
        Seu acesso às práticas está pausado. Renove sua assinatura para continuar
        seu alinhamento semanal.
      </p>

      {/* Card plano */}
      {/* ✅ glass-card + border-radius 16px — sem rounded-3xl */}
      <div className="glass-card border-gold-main/20 bg-gold-main/[0.01] p-8 mb-6 relative overflow-hidden">

        {/* Badge recomendado — ✅ sem rotate nem rounded-full */}
        <div className="absolute top-0 right-0 bg-gold-main text-deep-black
                        text-[8px] font-bold uppercase tracking-widest
                        px-4 py-1.5 rounded-bl-lg">
          Recomendado
        </div>

        {/* Preço */}
        <div className="mb-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-2">
            Plano mensal
          </p>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-4xl text-gold-light tracking-tight leading-none">
              R$ 47
            </span>
            <span className="text-white/25 text-sm font-sans font-light">/mês</span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-10">
          {[
            { icon: Music,    text: "Meditações semanais exclusivas" },
            { icon: Calendar, text: "Biblioteca completa de práticas" },
            { icon: Users,    text: "Comunidade de alinhamento" },
            { icon: Sparkles, text: "Acesso aos Ciclos de Posição do Mês" },
          ].map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-gold-main/8 border border-gold-main/15
                              flex items-center justify-center text-gold-main flex-shrink-0 mt-0.5">
                <Icon size={13} strokeWidth={1.5} />
              </div>
              <span className="text-white/50 text-sm font-light leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>

        {/* ✅ usa .button (rounded-lg, não rounded-full) */}
        <button onClick={handleSubscribe} className="button">
          Renovar assinatura
        </button>
      </div>

      {/* Rodapé */}
      <div className="flex flex-col items-center gap-4 mt-2">
        <p className="text-white/15 text-[10px] font-sans text-center">
          Cancele a qualquer momento sem taxas.
        </p>
        <button
          onClick={() => navigate('/')}
          className="text-white/15 text-[9px] uppercase tracking-[0.3em] font-sans
                     hover:text-gold-main/40 transition-colors"
        >
          Voltar ao início
        </button>
      </div>
    </motion.div>
  );
};

export default AssinaturaClube;
