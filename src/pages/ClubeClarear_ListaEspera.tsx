import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User as UserIcon, CheckCircle, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

interface ClubeClarearListaEsperaProps {
  onBack: () => void;
}

export const ClubeClarear_ListaEspera: React.FC<ClubeClarearListaEsperaProps> = ({ onBack }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNome = nome.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedNome || !trimmedEmail) return;

    setIsSubmitting(true);
    setStatus('idle');

    try {
      // 1. Check for duplicate email in waitlist
      const waitlistRef = collection(db, 'clube_clarear_waitlist');
      const q = query(waitlistRef, where('email', '==', trimmedEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatus('duplicate');
        setIsSubmitting(false);
        return;
      }

      // 2. Add to waitlist
      await addDoc(waitlistRef, {
        nome: trimmedNome,
        email: trimmedEmail,
        inscrito_em: new Date().toISOString(),
        notificado: false,
      });

      setStatus('success');
      setNome('');
      setEmail('');
    } catch (err) {
      console.error('Error inserting waitlist record: ', err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-screen text-left max-w-2xl mx-auto">
      {/* Breadcrumb & Navigation */}
      <div className="back font-semibold" onClick={onBack}>
        ← Voltar
      </div>
      <p className="text-[10px] text-white/15 uppercase tracking-widest mb-6 font-bold font-sans">
        Início → Clube Clarear → Lista de Espera
      </p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card border-gold-main/20 bg-gold-main/[0.01]"
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-12 px-4 space-y-6"
            >
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400"
                >
                  <CheckCircle size={40} />
                </motion.div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-3xl text-gold-light leading-tight">Inscrição Confirmada!</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed max-w-md mx-auto">
                  Sua inscrição na lista de espera exclusiva do <strong>Clube Clarear</strong> foi registrada com sucesso.
                </p>
                <p className="text-white/40 font-light text-xs max-w-sm mx-auto">
                  Assim que estivermos prontos para abrir as vagas das práticas semanais de clareza e estabilidade, você será o primeiro a ser notificado por e-mail.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="button-outline font-semibold uppercase tracking-wider text-[11px] px-8 py-3.5"
                >
                  Continuar Explorando
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header Icon & Title */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-gold-main/30 text-[10px] uppercase tracking-[0.4em] block font-bold mb-1">
                    Em Breve
                  </span>
                  <h2 className="serif text-4xl text-gold-light">Clube Clarear</h2>
                </div>
                <div className="w-12 h-12 bg-gold-main/5 border border-gold-main/15 rounded-full flex items-center justify-center text-gold-main">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-white/65 leading-relaxed font-light text-[15px]">
                  O <strong>Clube Clarear</strong> é um espaço inteiramente dedicado a práticas semanais focadas em clareza mental e estabilidade emocional profunda.
                </p>
                <p className="text-white/40 leading-relaxed font-light text-sm">
                  Inscreva-se na nossa lista de espera abaixo para garantir prioridade e receber condições ideais na abertura das primeiras vagas.
                </p>
              </div>

              {/* Status and Warning alerts */}
              {status === 'duplicate' && (
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 text-amber-400 rounded-xl text-xs flex gap-2.5 items-center">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Este e-mail já está inscrito em nossa lista de espera! Fique tranquilo, você já tem sua vaga reservada.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 rounded-xl text-xs flex gap-2.5 items-center">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>Ops! Ocorreu um erro temporário ao processar sua inscrição. Por favor, tente novamente em instantes.</span>
                </div>
              )}

              {/* Form definition */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-[10px] text-white/50 uppercase tracking-widest font-bold font-sans">
                    Nome Completo
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                      <UserIcon size={16} />
                    </span>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Kaelan Carvalho"
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-gold-main/40 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/15 outline-none transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email-input" className="text-[10px] text-white/50 uppercase tracking-widest font-bold font-sans">
                    Seu melhor E-mail
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
                      <Mail size={16} />
                    </span>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@gmail.com"
                      className="w-full bg-white/[0.02] border border-white/[0.08] focus:border-gold-main/40 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/15 outline-none transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-deep-black" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <span>Entrar na Lista de Espera</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="btn-secondary"
                  >
                    Voltar ao Início
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ClubeClarear_ListaEspera;

