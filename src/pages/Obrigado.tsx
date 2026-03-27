import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';

const Obrigado = () => (
  <div className="container min-h-screen flex flex-col items-center justify-center py-12">
    <div className="w-24 h-24 bg-gold-main/10 rounded-full flex items-center justify-center text-gold-main mb-8">
      <CheckCircle2 size={56} />
    </div>
    
    <div className="space-y-6 mb-12">
      <h2 className="serif text-3xl text-gold-light">Diagnóstico Concluído</h2>
      <p className="text-text-main/80 leading-relaxed">
        Obrigada por responder com honestidade. Sua leitura personalizada está sendo preparada.
      </p>
      <div className="p-4 bg-gold-main/5 border border-gold-main/20 rounded-lg">
        <p className="text-sm text-gold-main/80">
          Você receberá seu áudio personalizado via WhatsApp em até 48h.
        </p>
      </div>
    </div>

    <div className="w-full flex flex-col gap-4">
      <Link to="/membros" className="btn-primary flex items-center justify-center gap-2">
        Acessar Meditações
      </Link>
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noopener noreferrer"
        className="btn-secondary flex items-center justify-center gap-2"
      >
        <MessageCircle size={18} /> Falar no WhatsApp
      </a>
      <Link to="/" className="text-gold-main/40 text-xs uppercase tracking-widest mt-6 hover:text-gold-main transition-colors">
        Voltar ao início
      </Link>
    </div>
  </div>
);

export default Obrigado;
