import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Plus, Trash2, UserPlus, LogOut, MessageCircle } from 'lucide-react';
import { auth, db } from '../services/firebase';
import { collection, query, onSnapshot, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const DashboardPosicao = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [diagnosticos, setDiagnosticos] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/');
        return;
      }

      // Check if user is admin
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      // Default admin check
      const isDefaultAdmin = user.email === "andreiapreto@gmail.com";
      
      if (userData?.role === 'admin' || isDefaultAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        navigate('/'); // Only admins can see this
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    const qUsers = query(collection(db, 'users'));
    const unsubscribeUsers = onSnapshot(qUsers, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const qDiags = query(collection(db, 'diagnosticos'));
    const unsubscribeDiags = onSnapshot(qDiags, (snapshot) => {
      setDiagnosticos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeDiags();
    };
  }, [isAdmin]);

  const handleRemoveUser = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await deleteDoc(doc(db, 'users', id));
      } catch (err) {
        console.error("Erro ao remover usuário:", err);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-gold-main">Verificando permissões...</div>;

  return (
    <div className="container max-w-5xl py-12 flex flex-col gap-8">
      <header className="flex justify-between items-center border-b border-gold-main/30 pb-8 text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gold-main rounded-xl flex items-center justify-center text-deep-black">
            <LayoutDashboard size={24} />
          </div>
          <h2 className="serif text-3xl text-gold-light">Painel Administrativo</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gold-main/60 hover:text-gold-main transition-colors text-sm font-semibold">Início</Link>
          <button onClick={handleLogout} className="text-red-500/60 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-semibold">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      {/* User Management Section */}
      <section className="bg-card-bg rounded-xl border border-gold-main/20 overflow-hidden text-left">
        <div className="p-6 border-b border-gold-main/10 bg-gold-main/5 flex justify-between items-center">
          <h3 className="serif text-xl text-gold-light">Usuários Cadastrados</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gold-main/5 text-gold-main/60 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 font-bold text-left">Nome</th>
                <th className="px-6 py-4 font-bold text-left">Email</th>
                <th className="px-6 py-4 font-bold text-left">WhatsApp</th>
                <th className="px-6 py-4 font-bold text-left">Papel</th>
                <th className="px-6 py-4 font-bold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-main/10">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gold-main/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-gold-light">{user.name}</td>
                  <td className="px-6 py-4 text-text-main/70">{user.email}</td>
                  <td className="px-6 py-4 text-text-main/70">
                    <a 
                      href={`https://wa.me/${user.whatsapp?.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gold-main transition-colors"
                    >
                      <MessageCircle size={14} className="text-green-500" />
                      {user.whatsapp}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-text-main/70">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-gold-main text-deep-black' : 'bg-gold-main/10 text-gold-main'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-red-500/60 hover:text-red-500 transition-colors p-2"
                      title="Remover usuário"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Diagnósticos Section */}
      <section className="bg-card-bg rounded-xl border border-gold-main/20 overflow-hidden text-left">
        <div className="p-6 border-b border-gold-main/10 bg-gold-main/5">
          <h3 className="serif text-xl text-gold-light">Diagnósticos Recebidos</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gold-main/5 text-gold-main/60 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 font-bold text-left">Usuário</th>
                <th className="px-6 py-4 font-bold text-left">Arquétipo</th>
                <th className="px-6 py-4 font-bold text-left">Tema</th>
                <th className="px-6 py-4 font-bold text-left">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold-main/10">
              {diagnosticos.map((item) => (
                <tr key={item.id} className="hover:bg-gold-main/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-gold-light">{item.userName}</td>
                  <td className="px-6 py-4 text-text-main/70">{item.archetype}</td>
                  <td className="px-6 py-4 text-text-main/70">{item.theme}</td>
                  <td className="px-6 py-4 text-gold-main/60">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))}
              {diagnosticos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gold-main/40 italic">Nenhum diagnóstico recebido ainda.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardPosicao;
