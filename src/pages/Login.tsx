import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-w-md mx-auto px-6 py-12 flex flex-col items-center justify-center gap-12 root-pattern">
      <Logo />
      
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold-500/60 ml-1">E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            className="w-full p-4 bg-earth-900/50 border border-gold-900/30 rounded-2xl text-gold-100 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-gold-500/60 ml-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full p-4 bg-earth-900/50 border border-gold-900/30 rounded-2xl text-gold-100 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>
        <button 
          onClick={() => navigate('/membros')}
          className="w-full py-4 bg-gold-500 text-earth-950 rounded-2xl font-bold text-lg hover:bg-gold-400 transition-colors"
        >
          Entrar
        </button>
        <div className="text-center">
          <Link to="/clube" className="text-gold-500/60 text-sm hover:text-gold-400">Não tem uma conta? Assine o Clube</Link>
        </div>
      </div>

      <Link to="/" className="text-gold-500/40 text-xs uppercase tracking-widest flex items-center gap-2">
        <ArrowLeft size={12} /> Voltar ao início
      </Link>
    </div>
  );
};

export default Login;
