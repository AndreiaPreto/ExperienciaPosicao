// src/pages/CompraDiagnostico.tsx
// ✅ CORRIGIDO: btn-primary → button | card → glass-card | tipografia unificada
import React from 'react';
import { motion } from 'motion/react';
import { useAccess } from '../context/AccessContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, Sparkles } from 'lucide-react';

const CompraDiagnostico = () => {
  const { simulatePurchase } = useAccess();
  const navigate = useNavigate();

  const handlePurchase = () => {
    navigate('/diagnostico?buy=diagnostico');
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
          Diagnóstico de Posição
        </h1>
      </div>

      <p className="text-white/35 text-sm font-light leading-relaxed text-center mb-10 max-w-xs mx-auto">
        Este diagnóstico revela o arquétipo que está influenciando sua base interna hoje.
      </p>

      {/* Card produto — ✅ glass-card, border-radius 16px */}
      <div className="glass-card border-gold-main/20 bg-gold-main/[0.01] p-8 mb-6">

        <div className="flex items-center justify-between border-b border-gold-main/10 pb-6 mb-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-1">
              Diagnóstico completo
            </p>
            <p className="font-serif text-gold-light text-lg leading-tight">
              Diagnóstico de Posição
            </p>
          </div>
          <span className="font-serif text-gold-light text-3xl tracking-tight">R$ 69</span>
        </div>

        <ul className="space-y-4 mb-10">
          {[
            { icon: ShieldCheck, text: "Acesso vitalício ao questionário" },
            { icon: Sparkles,    text: "Análise personalizada via áudio" },
            { icon: CreditCard,  text: "Pagamento seguro via Stripe" },
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

        {/* ✅ usa .button (rounded-lg) */}
        <button onClick={handlePurchase} className="button">
          Liberar acesso agora
        </button>
      </div>

      <p className="text-center text-[10px] text-white/20 font-sans leading-relaxed px-4">
        Ao clicar em liberar, você será redirecionado para o checkout seguro.
      </p>
    </motion.div>
  );
};

export default CompraDiagnostico;
