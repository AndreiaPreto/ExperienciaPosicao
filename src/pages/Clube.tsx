import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Music, Users, Calendar } from 'lucide-react';

const Clube = () => {
  const navigate = useNavigate();

  return (
    <div className="container min-h-screen flex flex-col gap-12 py-12">
      <Link to="/" className="text-gold-main/60 flex items-center gap-2 hover:text-gold-main transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Voltar
      </Link>

      <header className="space-y-4 text-center">
        <h2 className="serif text-4xl text-gold-light">Clube POSIÇÃO</h2>
        <p className="text-text-main/80 leading-relaxed max-w-xs mx-auto">
          Uma assinatura para quem busca manter o alinhamento constante através de práticas guiadas.
        </p>
      </header>

      <div className="space-y-6">
        <div className="card space-y-8">
          <div className="flex justify-between items-center border-b border-gold-main/20 pb-6">
            <span className="text-gold-main uppercase tracking-widest text-xs font-bold">Assinatura Mensal</span>
            <div className="flex items-baseline gap-1">
              <span className="serif text-3xl text-gold-light">R$ 47</span>
              <span className="text-xs opacity-40">/mês</span>
            </div>
          </div>
          
          <ul className="space-y-4">
            {[
              { icon: Music, text: "Meditação inédita toda segunda-feira" },
              { icon: Calendar, text: "Acesso à biblioteca completa de práticas" },
              { icon: Users, text: "Comunidade exclusiva no WhatsApp" },
              { icon: CheckCircle2, text: "Descontos em sessões individuais" }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-text-main/70 text-sm">
                <item.icon size={18} className="text-gold-main shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>

          <Link to="/assinatura-clube" className="btn-primary text-lg">
            Assinar agora
          </Link>
        </div>

        <div className="p-6 border border-gold-main/10 rounded-xl bg-gold-main/5 text-left">
          <h3 className="serif text-xl text-gold-light mb-2">Sessão POSIÇÃO</h3>
          <p className="text-text-main/50 text-sm mb-4">
            Um encontro individual de 60 minutos para realinhamento profundo e diagnóstico personalizado.
          </p>
          <button className="text-gold-main font-semibold flex items-center gap-2 hover:text-gold-light transition-colors text-sm">
            Saber mais <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clube;
