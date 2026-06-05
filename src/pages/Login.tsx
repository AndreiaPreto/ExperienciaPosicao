import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Logo } from '../components/Logo';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const sanitizedEmail = email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, sanitizedEmail, password);
      // Success: Redirect to members area
      navigate('/membros');
    } catch (err: any) {
      console.error('Login error:', err);
      // Map common firebase authentication errors to Portuguese user-friendly messages
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-login-credentials' || err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha incorretos. Por favor, tente novamente.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Por favor, forneça um endereço de e-mail válido.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Muitas tentativas malsucedidas de login. Tente novamente mais tarde.');
      } else {
        setError('Ocorreu um erro ao realizar o login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-6 py-12 flex flex-col items-center justify-center gap-12 root-pattern">
      <Logo />
      
      <form onSubmit={handleLogin} className="w-full space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2 leading-relaxed animate-fade-in">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold-main/60 ml-1">E-mail</label>
          <input 
            type="email" 
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="input w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold-main/60 ml-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="input w-full"
            required
          />
        </div>
        <button 
          type="submit"
          disabled={loading}
          className="button w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
        <div className="text-center">
          <Link to="/clube" className="text-gold-main/60 text-xs tracking-wider uppercase hover:text-gold-light transition-colors">Não tem uma conta? Assine o Clube</Link>
        </div>
      </form>

      <Link to="/" className="text-gold-main/40 hover:text-gold-main transition-colors text-xs uppercase tracking-widest flex items-center gap-2">
        <ArrowLeft size={12} /> Voltar ao início
      </Link>
    </div>
  );
};

export default Login;
