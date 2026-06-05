// src/pages/Obrigado.tsx
// ✅ Tipografia unificada + número WhatsApp correto + nome atualizado + Avaliação de Atendimento interativa
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Star, Send, Loader2 } from 'lucide-react';
import { db, auth } from '../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const Obrigado = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserEmail(user.email);
      } else {
        setUserId(null);
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSendFeedback = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'evaluations'), {
        rating,
        comment: comment.trim(),
        userId,
        userEmail,
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Error saving feedback:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
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
                      p-6 mb-8 text-center">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gold-main/40 font-sans mb-2">
          Próximo passo
        </p>
        <p className="text-white/50 text-sm font-light leading-relaxed">
          Você receberá seu áudio personalizado via WhatsApp
          em até <span className="text-gold-main font-medium">48 horas úteis</span>.
        </p>
      </div>

      {/* Bloco de Avaliação pós-compra do Atendimento */}
      <div className="w-full max-w-sm glass-card border-gold-main/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 mb-8 text-center animate-fade-in">
        <h3 className="font-serif text-lg text-gold-light mb-1">avalie o atendimento</h3>
        <p className="text-white/30 text-xs font-light mb-4 leading-relaxed">
          Sua opinião é vital para mantermos a excelência do Método Posição.
        </p>

        {!submitted ? (
          <div className="space-y-4">
            {/* Estrelas interativas */}
            <div className="flex justify-center items-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    className={`transition-all duration-200 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-gold-main text-gold-main scale-105'
                        : 'text-white/10 fill-transparent'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Campo de Depoimento descritivo, se estrela foi selecionada */}
            {rating > 0 && (
              <div className="space-y-3 text-left">
                <textarea
                  placeholder="Conte um pouco como foi sua experiência (opcional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={1000}
                  className="input w-full min-h-[80px] p-3 text-xs bg-black/40 border border-white/5 text-white/85 placeholder:text-white/20 rounded-xl focus:border-gold-main/40 transition-all resize-none font-sans"
                />
                
                <button
                  onClick={handleSendFeedback}
                  disabled={loading}
                  className="button w-full text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-gold-main to-gold-light text-black py-2.5 font-bold tracking-widest uppercase rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      Enviar avaliação
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-gold-main/[0.04] border border-gold-main/20 rounded-xl text-center space-y-2">
            <span className="text-xl block">✨</span>
            <p className="text-gold-light text-xs font-semibold uppercase tracking-wider">Agradecemos sua avaliação!</p>
            <p className="text-white/40 text-[11px] font-light leading-relaxed">Sua resposta foi registrada com sucesso.</p>
          </div>
        )}
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
};

export default Obrigado;
