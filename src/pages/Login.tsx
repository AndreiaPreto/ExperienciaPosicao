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
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold-main/60 ml-1">E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            className="input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold-main/60 ml-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="input"
          />
        </div>
        <button 
          onClick={() => navigate('/membros')}
          className="button w-full"
        >
          Entrar
        </button>
        <div className="text-center">
          <Link to="/clube" className="text-gold-main/60 text-xs tracking-wider uppercase hover:text-gold-light transition-colors">Não tem uma conta? Assine o Clube</Link>
        </div>
      </div>

      <Link to="/" className="text-gold-main/40 hover:text-gold-main transition-colors text-xs uppercase tracking-widest flex items-center gap-2">
        <ArrowLeft size={12} /> Voltar ao início
      </Link>
    </div>
  );
};

export default Login;
