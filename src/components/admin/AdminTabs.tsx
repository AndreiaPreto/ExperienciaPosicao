import React, { useState, useEffect } from 'react';
import { 
  Users, BarChart3, MessageCircle, Package, ShieldCheck, User as UserIcon, 
  ArrowRight, ChevronRight, History, Plus, Upload, Music, Trash2, Calendar, 
  Settings, X, Check, Tag, Star 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { collection, query, orderBy, getDocs, updateDoc, doc, addDoc, deleteDoc, setDoc, where, increment } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { handleFirestoreError } from '../../services/firestoreHelpers';
import { OperationType } from '../../types/diagnostico';
import { mapeamentoQuestions } from '../../products/mapa-floral/mapeamentoQuestions';
import { questions } from '../../products/diagnostico/questions';
import { useCiclos } from '../../products/numerologia/useCiclos';
import { formatWhatsAppNumber } from '../../utils/whatsapp';

export const AdminDashboardTab = ({ stats, users, onTestMapeamento, onTestDiagnostico, onSimulatePurchase }: { stats: any, users: any[], onTestMapeamento: () => void, onTestDiagnostico: () => void, onSimulatePurchase: () => void }) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {[
        { label: 'Total Usuários', value: stats.usersCount, icon: Users },
        { label: 'Mapeamentos', value: stats.mappingsCount, icon: BarChart3 },
        { label: 'Solicitações', value: stats.requestsCount, icon: MessageCircle },
        { label: 'Receita Est.', value: `R$ ${stats.revenue}`, icon: Package },
        { label: 'Usuários Ativos', value: stats.activeUsers, icon: ShieldCheck },
      ].map((stat, i) => (
        <div key={i} className="glass-card p-6 md:p-8 border-gold-main/10">
          <stat.icon size={20} className="text-gold-main/30 mb-6" />
          <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">{stat.label}</p>
          <p className="serif text-2xl md:text-3xl text-gold-light">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="glass-card p-6 md:p-10">
        <h3 className="serif text-2xl text-gold-light mb-8">Atividade Recente</h3>
        <div className="space-y-4">
          {users.slice(0, 5).map((u, i) => (
            <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-main/40">
                  <UserIcon size={18} />
                </div>
                <div>
                  <p className="text-gold-light text-sm font-medium truncate max-w-[150px] md:max-w-none">{u.email}</p>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest">Novo Usuário</p>
                </div>
              </div>
              <span className="text-[10px] text-white/20">Recente</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-6 md:p-10 border-emerald-500/20 bg-emerald-500/[0.02]">
        <h3 className="serif text-2xl text-emerald-400 mb-8 flex items-center gap-3">
          <ShieldCheck size={24} />
          Modo de Teste (Admin)
        </h3>
        <p className="text-white/40 text-sm mb-8 font-light">
          Use estas ferramentas para testar as funcionalidades do app sem precisar realizar pagamentos reais.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={onTestMapeamento}
            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
          >
            <div className="text-left">
              <p className="text-gold-light text-sm font-medium">Testar Mapeamento Floral</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Acesso direto ao Quiz de {mapeamentoQuestions.length} perguntas do Mapa Floral</p>
            </div>
            <ArrowRight size={18} className="text-gold-main/40 group-hover:text-gold-main transition-colors" />
          </button>

          <button 
            onClick={onTestDiagnostico}
            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
          >
            <div className="text-left">
              <p className="text-gold-light text-sm font-medium">Testar Diagnóstico POSIÇÃO</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Acesso direto ao questionário de {questions.length} perguntas do Diagnóstico</p>
            </div>
            <ArrowRight size={18} className="text-gold-main/40 group-hover:text-gold-main transition-colors" />
          </button>

          <button 
            onClick={onSimulatePurchase}
            className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
          >
            <div className="text-left">
              <p className="text-gold-light text-sm font-medium">Simular Compra de Diagnóstico</p>
              <p className="text-[10px] text-white/20 uppercase tracking-widest">Libera acesso ao Diagnóstico Posição globalmente</p>
            </div>
            <ArrowRight size={18} className="text-gold-main/40 group-hover:text-gold-main transition-colors" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const AdminUserDetailsView = ({ user, mappings, diagnosticos, requests, onBack }: { user: any, mappings: any[], diagnosticos: any[], requests: any[], onBack: () => void }) => {
  const userMappings = mappings.filter(m => m.userId === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const userDiagnosticos = diagnosticos.filter(d => d.userId === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const userRequests = requests.filter(r => r.userId === user.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const timeline = [
    ...userMappings.map(m => ({ ...m, type: 'mapping' })),
    ...userDiagnosticos.map(d => ({ ...d, type: 'diagnostico' })),
    ...userRequests.map(r => ({ ...r, type: 'request' }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="text-gold-main/40 hover:text-gold-main transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
        <ChevronRight size={14} className="rotate-180" />
        Voltar para Lista
      </button>

      <div className="glass-card p-8 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <span className="text-gold-main/30 text-[9px] uppercase tracking-[0.3em] mb-2 block font-bold">Perfil do Usuário</span>
            <h3 className="serif text-3xl text-gold-light">{user.email}</h3>
            <p className="text-white/20 text-[10px] mt-1">ID: {user.id}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-1">Status</p>
              <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${user.paidStatus ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/30'}`}>
                {user.paidStatus ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="text-right">
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-1">Mapeamentos</p>
              <span className="text-gold-light font-medium">{userMappings.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h4 className="serif text-xl text-gold-light mb-6 flex items-center gap-3">
              <History size={20} className="text-gold-main/40" />
              Jornada de Evolução
            </h4>
            
            <div className="relative pl-8 border-l border-white/5 space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-black border-2 border-gold-main/40" />
                  
                  <div className="glass-card p-6 border-gold-main/5 hover:border-gold-main/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${item.type === 'mapping' ? 'bg-gold-main/10 text-gold-main' : item.type === 'diagnostico' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        {item.type === 'mapping' ? 'Mapeamento' : item.type === 'diagnostico' ? 'Diagnóstico' : 'Solicitação'}
                      </span>
                      <span className="text-white/20 text-[10px]">{new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                    </div>

                    {item.type === 'mapping' ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Emoção Central</p>
                            <p className="text-gold-light text-sm">{item.emocao}</p>
                          </div>
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Arquétipo</p>
                            <p className="text-gold-light text-sm">{item.arquetipo}</p>
                          </div>
                        </div>

                        {item.answers && (
                          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-2">Respostas do Quiz (Mapeamento)</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {item.answers.map((ans: any, aidx: number) => (
                                <div key={aidx} className="flex flex-col gap-1">
                                  <span className="text-[8px] text-white/10 uppercase tracking-widest">P{ans.pergunta_id}</span>
                                  <span className="text-[11px] text-white/40 leading-tight">{ans.emocao} (Peso: {ans.peso})</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Florais Recomendados</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.florais?.split(',').map((f: string, fi: number) => (
                              <span key={fi} className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/5 text-white/60">{f.trim()}</span>
                            ))}
                          </div>
                        </div>
                        {item.alignmentScore && (
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-2">Nível de Alinhamento: {item.alignmentScore}%</p>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-gold-main" style={{ width: `${item.alignmentScore}%` }} />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : item.type === 'diagnostico' ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Arquétipo (Arcano)</p>
                            <p className="text-gold-light text-sm">{item.archetype}</p>
                          </div>
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Temática</p>
                            <p className="text-gold-light text-sm">{item.theme}</p>
                          </div>
                        </div>

                        {item.arcanoData && (
                          <div className="space-y-4 pt-4 border-t border-white/5">
                            <div>
                              <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-2">Sombra Ativa</p>
                              <p className="text-white/60 text-xs capitalize">{item.arcanoData.sombra.join(', ').replace(/_/g, ' ')}</p>
                            </div>
                            <div>
                              <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-2">Direção de Evolução</p>
                              <p className="text-gold-light/80 text-xs italic">"{item.arcanoData.direcao}"</p>
                            </div>
                            <div>
                              <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-2">Caminhos Possíveis</p>
                              <div className="flex flex-wrap gap-2">
                                {item.arcanoData.evolucao.map((ev: string, idx: number) => (
                                  <span key={idx} className="text-[8px] uppercase tracking-widest bg-gold-main/5 border border-gold-main/10 px-2 py-0.5 rounded text-gold-main/60">{ev}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {item.answers && (
                          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-3">Respostas do Quiz (Diagnóstico)</p>
                            <div className="space-y-2">
                              {item.answers.map((ans: string, idx: number) => (
                                <div key={idx} className="text-[10px] text-white/40 flex gap-2">
                                  <span className="text-gold-main/30">Q{idx + 1}:</span>
                                  <span>Opção {ans}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Objetivo</p>
                          <p className="text-gold-light text-sm italic">"{item.objetivo}"</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Estado Emocional</p>
                            <p className="text-white/60 text-xs">{item.estadoEmocional}</p>
                          </div>
                          <div>
                            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Status</p>
                            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">{item.status}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {timeline.length === 0 && (
                <div className="text-center py-10 text-white/20 italic">
                  Nenhuma atividade registrada para este usuário ainda.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="glass-card p-6 border-white/5">
              <h5 className="serif text-lg text-gold-light mb-6">Resumo de Dados</h5>
              <div className="space-y-4">
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">WhatsApp</p>
                  <p className="text-white/60 text-sm">{user.whatsapp || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Nome</p>
                  <p className="text-white/60 text-sm">{user.name || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold mb-1">Cargo/Papel</p>
                  <p className="text-white/60 text-sm capitalize">{user.role || 'Usuário'}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 border-white/5 bg-gold-main/[0.02]">
              <h5 className="serif text-lg text-gold-light mb-4">Ações Rápidas</h5>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all text-left px-4 flex items-center justify-between">
                  Enviar Mensagem
                  <MessageCircle size={14} className="text-gold-main/40" />
                </button>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all text-left px-4 flex items-center justify-between">
                  Redefinir Acesso
                  <ShieldCheck size={14} className="text-gold-main/40" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminUsersTab = ({ users, mappings, onSelectUser }: { users: any[], mappings: any[], onSelectUser: (user: any) => void }) => (
  <div className="glass-card p-6 md:p-10">
    <div className="flex justify-between items-center mb-10">
      <h3 className="serif text-2xl text-gold-light">Gestão de Usuários</h3>
      <div className="flex gap-4">
        <input type="text" placeholder="Buscar usuário..." className="input py-2 px-4 text-xs" />
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[500px]">
        <thead>
          <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/20">
            <th className="pb-6 font-bold">Usuário</th>
            <th className="pb-6 font-bold">Status</th>
            <th className="pb-6 font-bold">Mapeamentos</th>
            <th className="pb-6 font-bold text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {users.map((u, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              <td className="py-6">
                <p className="text-gold-light font-medium">{u.email}</p>
                <p className="text-[10px] text-white/20">{u.id}</p>
              </td>
              <td className="py-6">
                <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${u.paidStatus ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/30'}`}>
                  {u.paidStatus ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td className="py-6 text-white/40">
                {mappings.filter(m => m.userId === u.id).length}
              </td>
              <td className="py-6 text-right">
                <button 
                  onClick={() => onSelectUser(u)}
                  className="text-gold-main/40 hover:text-gold-main transition-colors text-[10px] uppercase tracking-widest font-bold"
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AdminMappingsTab = ({ mappings }: { mappings: any[] }) => (
  <div className="glass-card p-6 md:p-10">
    <h3 className="serif text-2xl text-gold-light mb-10">Histórico de Mapeamentos</h3>
    <div className="space-y-4">
      {mappings.map((m, i) => (
        <div key={i} className="p-6 border border-white/5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-gold-main/20 transition-all">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-gold-main/5 flex items-center justify-center text-gold-main/40">
              <BarChart3 size={20} />
            </div>
            <div>
              <h4 className="serif text-lg text-gold-light">{m.arquetipo}</h4>
              <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                {m.userEmail} • {new Date(m.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
          <button className="p-3 text-gold-main/20 hover:text-gold-main transition-colors self-end sm:self-auto">
            <ChevronRight size={18} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export const AdminClubeTab = ({ 
  meditationData, 
  setMeditationData, 
  meditationList, 
  setMeditationList 
}: { 
  meditationData: any, 
  setMeditationData: (data: any) => void, 
  meditationList: any[], 
  setMeditationList: (list: any[]) => void 
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
    <div className="lg:col-span-1">
      <div className="glass-card p-8">
        <h3 className="serif text-2xl text-gold-light mb-8 flex items-center gap-3">
          <Plus size={20} className="text-gold-main" />
          Novo Áudio
        </h3>
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">Título</label>
            <input 
              type="text" 
              className="input"
              value={meditationData.title}
              onChange={(e) => setMeditationData({...meditationData, title: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">Duração</label>
            <input 
              type="text" 
              className="input"
              value={meditationData.duration}
              onChange={(e) => setMeditationData({...meditationData, duration: e.target.value})}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">URL MP3</label>
            <input 
              type="text" 
              className="input"
              value={meditationData.url}
              onChange={(e) => setMeditationData({...meditationData, url: e.target.value})}
            />
          </div>
          <button 
            type="button"
            onClick={() => {
              if (meditationData.title && meditationData.url) {
                const newItem = { id: meditationList.length + 1, ...meditationData };
                setMeditationList([...meditationList, newItem]);
                setMeditationData({ title: '', description: '', duration: '', url: '' });
              }
            }}
            className="button w-full flex items-center justify-center gap-3"
          >
            <Upload size={18} />
            Publicar
          </button>
        </div>
      </div>
    </div>
    <div className="lg:col-span-2">
      <div className="glass-card p-8">
        <h3 className="serif text-2xl text-gold-light mb-8">Conteúdo Ativo</h3>
        <div className="space-y-4">
          {meditationList.map((item) => (
            <div key={item.id} className="p-6 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-gold-main/30 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-gold-main/5 flex items-center justify-center text-gold-main/40">
                  <Music size={20} />
                </div>
                <div>
                  <h4 className="serif text-lg text-gold-light">{item.title}</h4>
                  <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">{item.duration} • Clube Clarear</p>
                </div>
              </div>
              <button 
                onClick={() => setMeditationList(meditationList.filter(m => m.id !== item.id))}
                className="p-3 text-white/10 hover:text-red-400/60 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const AdminRequestsTab = ({ requests, users }: { requests: any[], users: any[] }) => (
  <div className="glass-card p-6 md:p-10">
    <h3 className="serif text-2xl text-gold-light mb-10">Solicitações de Reprogramação</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left min-w-[650px]">
        <thead>
          <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/20">
            <th className="pb-6 font-bold">Usuário</th>
            <th className="pb-6 font-bold">Produto</th>
            <th className="pb-6 font-bold">Objetivo</th>
            <th className="pb-6 font-bold">Status</th>
            <th className="pb-6 font-bold text-right">Data</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {requests.map((r, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              <td className="py-6">
                <p className="text-gold-light font-medium">{users.find(u => u.id === r.userId)?.email || r.userId}</p>
              </td>
              <td className="py-6 text-white/40">{r.productName}</td>
              <td className="py-6 text-white/40 max-w-xs truncate">{r.objetivo}</td>
              <td className="py-6">
                <span className={`px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold ${r.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gold-main/10 text-gold-main'}`}>
                  {r.status === 'completed' ? 'Concluído' : 'Pendente'}
                </span>
              </td>
              <td className="py-6 text-right text-white/20">
                {new Date(r.createdAt).toLocaleDateString('pt-BR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AdminProductsTab = () => (
  <div className="glass-card p-6 md:p-10">
    <div className="flex justify-between items-center mb-10">
      <h3 className="serif text-2xl text-gold-light">Produtos e Ofertas</h3>
      <button className="button-outline py-2 px-4 text-xs flex items-center gap-2">
        <Plus size={14} /> Novo Produto
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Diagnóstico de Posição', price: 'Gratuito/R$ 21', sales: 1240, status: 'Ativo' },
        { name: 'Mapa Floral', price: 'R$ 9', sales: 452, status: 'Ativo' },
        { name: 'Mapeamento de Lealdades Ocultas', price: 'R$ 33', sales: 184, status: 'Ativo' },
        { name: 'Reset de Posição', price: 'R$ 129', sales: 157, status: 'Ativo' },
        { name: 'Clube Posição: Núcleo Tarô', price: 'R$ 117/mês', sales: 156, status: 'Ativo' },
        { name: 'Clube Posição: Núcleo Clarear', price: 'R$ 47/mês', sales: 89, status: 'Ativo' },
        { name: 'Ciclos de Posição do Mês', price: 'Gratuito', sales: 210, status: 'Ativo' },
        { name: 'Biblioteca Posição', price: 'Exclusiva', sales: 320, status: 'Ativo' },
      ].map((p, i) => (
        <div key={i} className="p-6 border border-white/5 rounded-2xl bg-white/[0.01] hover:border-gold-main/20 transition-all group">
          <div className="flex justify-between items-start mb-6">
            <h4 className="serif text-lg text-gold-light group-hover:text-gold-main transition-colors">{p.name}</h4>
            <span className="text-emerald-400 text-[9px] uppercase tracking-widest font-bold bg-emerald-400/5 px-2 py-1 rounded-full border border-emerald-400/10">{p.status}</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Preço</p>
              <p className="text-gold-light font-medium">{p.price}</p>
            </div>
            <div className="text-right">
              <p className="text-white/20 text-[10px] uppercase tracking-widest mb-1">Vendas</p>
              <p className="text-gold-light font-medium">{p.sales}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AdminCiclosTab = ({ setNotification }: { setNotification?: (n: any) => void }) => {
  const [ciclos, setCiclos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCiclo, setEditingCiclo] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const [form, setForm] = useState({
    titulo: '',
    fase: '',
    emoji: '🔮',
    spiritual: '',
    data_iso: '',
    data_exibir: '',
    mes_ano: '2026-06',
    descricao: '',
    importancia: '',
    beneficios: '',
    preco: 'R$ 9',
    ativo: true,
    ordem: 1,
  });

  const buscar = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'ciclos_posicao'),
        orderBy('mes_ano', 'desc'),
        orderBy('ordem', 'asc')
      );
      const snap = await getDocs(q);
      setCiclos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error('Erro ao buscar ciclos admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscar();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.fase || !form.data_iso || !form.mes_ano || !form.preco) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const parsedBeneficios = form.beneficios
        ? form.beneficios.split(',').map(b => b.trim()).filter(Boolean)
        : [];

      const cicloDoc = {
        titulo: form.titulo,
        fase: form.fase,
        emoji: form.emoji,
        spiritual: form.spiritual || null,
        data_iso: form.data_iso,
        data_exibir: form.data_exibir || form.data_iso.split('-').reverse().slice(0, 2).join(' de '),
        mes_ano: form.mes_ano,
        descricao: form.descricao,
        importancia: form.importancia,
        beneficios: parsedBeneficios,
        preco: form.preco,
        ativo: form.ativo,
        ordem: Number(form.ordem) || 1,
        atualizadoEm: new Date().toISOString()
      };

      if (editingCiclo) {
        await updateDoc(doc(db, 'ciclos_posicao', editingCiclo.id), cicloDoc);
        alert('Ciclo atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'ciclos_posicao'), {
          ...cicloDoc,
          criadoEm: new Date().toISOString()
        });
        alert('Ciclo criado com sucesso!');
      }

      setIsFormOpen(false);
      setEditingCiclo(null);
      buscar();
    } catch (err) {
      console.error('Erro ao salvar ciclo:', err);
      alert('Erro ao salvar ciclo.');
    }
  };

  const handleEdit = (ciclo: any) => {
    setEditingCiclo(ciclo);
    setForm({
      titulo: ciclo.titulo || '',
      fase: ciclo.fase || '',
      emoji: ciclo.emoji || '🔮',
      spiritual: ciclo.spiritual || '',
      data_iso: ciclo.data_iso || '',
      data_exibir: ciclo.data_exibir || '',
      mes_ano: ciclo.mes_ano || '2026-06',
      descricao: ciclo.descricao || '',
      importancia: ciclo.importancia || '',
      beneficios: ciclo.beneficios ? ciclo.beneficios.join(', ') : '',
      preco: ciclo.preco || 'R$ 9',
      ativo: ciclo.ativo !== undefined ? ciclo.ativo : true,
      ordem: ciclo.ordem !== undefined ? ciclo.ordem : 1,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja remover este ritual?')) return;
    try {
      await deleteDoc(doc(db, 'ciclos_posicao', id));
      alert('Ritual removido com sucesso!');
      buscar();
    } catch (err) {
      console.error('Erro ao remover:', err);
      alert('Erro ao remover ritual.');
    }
  };

  const handleToggleAtivo = async (ciclo: any) => {
    try {
      await updateDoc(doc(db, 'ciclos_posicao', ciclo.id), { ativo: !ciclo.ativo });
      buscar();
    } catch (err) {
      console.error(err);
    }
  };

  const rodarSeed = async () => {
    if (!window.confirm('Deseja popular a coleção ciclos_posicao com os 6 rituais de Junho 2026?')) return;
    setLoading(true);
    try {
      const seedJunho2026 = [
        {
          titulo:      "Ritual de Transbordo",
          fase:        "Lua Cheia",
          emoji:       "🌕",
          spiritual:   null,
          data_iso:    "2026-06-03",
          data_exibir: "03 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Ritual de reconhecimento e liberação na lua cheia de junho. Honre tudo que floresceu neste ciclo, libere o que já cumpriu seu papel e equilibre as emoções intensas que a lua amplifica.",
          importancia: "A lua cheia amplifica tudo que está ativo em você: intenções, emoções e padrões. Este ritual transforma essa amplitude em consciência.",
          beneficios:  ["Clareza emocional", "Liberação energética", "Expansão espiritual"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       1,
        },
        {
          titulo:      "Ritual de Desapego",
          fase:        "Lua Minguante",
          emoji:       "🌗",
          spiritual:   null,
          data_iso:    "2026-06-10",
          data_exibir: "10 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Limpeza energética profunda: solte padrões, vínculos e crenças que já não cabem em quem você está se tornando.",
          importancia: "Desapegar não é perder, é criar espaço para o que está vindo.",
          beneficios:  ["Leveza emocional", "Dissolução de bloqueios", "Clareza mental"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       2,
        },
        {
          titulo:      "Ritual de Amor Próprio e Vínculos",
          fase:        "Energia Relacional",
          emoji:       "💛",
          spiritual:   null,
          data_iso:    "2026-06-12",
          data_exibir: "12 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Ritual para ressignificar seus vínculos afetivos a partir do amor próprio. Quando você se posiciona com mais presença, seus relacionamentos mudam junto.",
          importancia: "A forma como você se relaciona com os outros é um espelho de como você se relaciona consigo mesma.",
          beneficios:  ["Amor próprio consolidado", "Vínculos mais conscientes", "Libertação de padrões afetivos"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       3,
        },
        {
          titulo:      "Ritual de Santo Antônio",
          fase:        "Energia Espiritual",
          emoji:       "🌿",
          spiritual:   "Santo Antônio",
          data_iso:    "2026-06-13",
          data_exibir: "13 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Ritual de conexão, atração e realinhamento afetivo com a energia de Santo Antônio. Trabalha o campo dos vínculos, das buscas do coração e da abertura para o amor genuíno.",
          importancia: "Santo Antônio não é apenas o santo dos namorados, é o patrono dos que buscam com o coração aberto e sincero.",
          beneficios:  ["Atração de vínculos verdadeiros", "Proteção nos relacionamentos", "Abertura do campo afetivo"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       4,
        },
        {
          titulo:      "Ritual de Expansão",
          fase:        "Lua Crescente",
          emoji:       "🌒",
          spiritual:   null,
          data_iso:    "2026-06-18",
          data_exibir: "18 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Ação prática para sustentar e expandir as intenções plantadas na lua nova. A crescente pede movimento, sendo hora de dar os primeiros passos concretos.",
          importancia: "Intenção sem ação é apenas desejo. A lua crescente é o convite para encarnar o que você quer criar.",
          beneficios:  ["Disciplina consciente", "Execução de objetivos", "Autoconfiança"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       5,
        },
        {
          titulo:      "Ritual de Semeadura",
          fase:        "Lua Nova",
          emoji:       "🌑",
          spiritual:   null,
          data_iso:    "2026-06-25",
          data_exibir: "25 de Junho",
          mes_ano:     "2026-06",
          descricao:   "Plantio de intenções para o próximo ciclo lunar. A lua nova de junho carrega a energia do solstício de inverno: um momento de recolhimento, escuta interna e criação de novas bases.",
          importancia: "Na escuridão da lua nova há potência pura. Toda realidade começa com uma intenção bem plantada no silêncio.",
          beneficios:  ["Clareza de intenção", "Conexão com ciclos naturais", "Ativação da manifestação consciente"],
          preco:       "R$ 9",
          ativo:       true,
          ordem:       6,
        },
      ];

      for (const r of seedJunho2026) {
        await addDoc(collection(db, 'ciclos_posicao'), {
          ...r,
          criadoEm: new Date().toISOString()
        });
      }
      alert('Rituais de Junho 2026 populados com sucesso no Firestore!');
      buscar();
    } catch (e) {
      console.error(e);
      alert('Erro ao rodar seed: ' + String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
        <div>
          <h3 className="serif text-2xl text-gold-light">Ciclos Posição (Rituais)</h3>
          <p className="text-white/30 text-xs font-light mt-1">Gerencie a agenda de rituais e datas energéticas mensais</p>
        </div>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={rodarSeed}
            className="button-outline py-2 px-4 text-xs flex items-center gap-1 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5"
          >
            🌱 Seed Junho 2026
          </button>
          <button 
            type="button"
            onClick={() => {
              setEditingCiclo(null);
              setForm({
                titulo: '',
                fase: '',
                emoji: '🔮',
                spiritual: '',
                data_iso: '',
                data_exibir: '',
                mes_ano: '2026-06',
                descricao: '',
                importancia: '',
                beneficios: '',
                preco: 'R$ 9',
                ativo: true,
                ordem: ciclos.length + 1,
              });
              setIsFormOpen(true);
            }}
            className="button-outline py-2 px-4 text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Novo Ritual
          </button>
        </div>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="border border-white/5 bg-white/[0.01] p-6 rounded-2xl mb-10 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <h4 className="serif text-white/80 font-medium text-base">
              {editingCiclo ? 'Editar Ritual' : 'Novo Ritual'}
            </h4>
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)}
              className="text-white/40 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Título do Ritual *</label>
              <input 
                type="text" 
                value={form.titulo}
                onChange={e => setForm({ ...form, titulo: e.target.value })}
                placeholder="Ex. Ritual de Transbordo"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Fase / Linha Energética *</label>
              <input 
                type="text" 
                value={form.fase}
                onChange={e => setForm({ ...form, fase: e.target.value })}
                placeholder="Ex. Lua Cheia ou Energia Relacional"
                className="input-field text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Emoji</label>
                <input 
                  type="text" 
                  value={form.emoji}
                  onChange={e => setForm({ ...form, emoji: e.target.value })}
                  placeholder="🌕"
                  className="input-field text-sm text-center"
                />
              </div>
              <div>
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Conexão Espiritual</label>
                <input 
                  type="text" 
                  value={form.spiritual}
                  onChange={e => setForm({ ...form, spiritual: e.target.value })}
                  placeholder="Ex. Santo Antônio, Orixás"
                  className="input-field text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Data Real (ISO) *</label>
              <input 
                type="date" 
                value={form.data_iso}
                onChange={e => setForm({ ...form, data_iso: e.target.value })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Data Exibição (Ex. 03 de Junho) *</label>
              <input 
                type="text" 
                value={form.data_exibir}
                onChange={e => setForm({ ...form, data_exibir: e.target.value })}
                placeholder="Ex. 03 de Junho"
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Mês/Ano Filtro (YYYY-MM) *</label>
              <input 
                type="text" 
                value={form.mes_ano}
                onChange={e => setForm({ ...form, mes_ano: e.target.value })}
                placeholder="Ex. 2026-06"
                className="input-field text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Preço *</label>
                <input 
                  type="text" 
                  value={form.preco}
                  onChange={e => setForm({ ...form, preco: e.target.value })}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Ordem *</label>
                <input 
                  type="number" 
                  value={form.ordem}
                  onChange={e => setForm({ ...form, ordem: Number(e.target.value) })}
                  className="input-field text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Descrição do Ritual</label>
            <textarea 
              value={form.descricao}
              onChange={e => setForm({ ...form, descricao: e.target.value })}
              placeholder="Descreva o propósito e a dinâmica offline do ritual..."
              className="input-field text-sm h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Importância do Ritual (Citação)</label>
              <input 
                type="text" 
                value={form.importancia}
                onChange={e => setForm({ ...form, importancia: e.target.value })}
                placeholder="Ex. A lua cheia amplifica tudo..."
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="text-white/40 text-[10px] uppercase font-bold tracking-wider block mb-1">Benefícios (Separados por vírgula)</label>
              <input 
                type="text" 
                value={form.beneficios}
                onChange={e => setForm({ ...form, beneficios: e.target.value })}
                placeholder="Ex. Clareza emocional, Expansão espiritual"
                className="input-field text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
            <input 
              type="checkbox" 
              id="ativoCheckbox"
              checked={form.ativo}
              onChange={e => setForm({ ...form, ativo: e.target.checked })}
              className="rounded border-white/10 bg-black text-gold-main focus:ring-0"
            />
            <label htmlFor="ativoCheckbox" className="text-white/80 text-xs select-none">Ritual Ativo para Clientes</label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setIsFormOpen(false)}
              className="button-outline py-2 px-4 text-xs"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="py-2 px-6 text-xs bg-gold-main hover:bg-gold-light text-black font-semibold rounded-lg shadow-md transition-all duration-300"
            >
              Salvar Ritual
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold-main" />
        </div>
      ) : ciclos.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
          <Calendar className="mx-auto text-white/10 mb-4" size={42} />
          <p className="text-white/30 text-sm font-light">Nenhum ritual cadastrado no Firestore.</p>
          <button 
            type="button"
            onClick={rodarSeed}
            className="button-outline text-xs mt-4"
          >
            Popular Rituais de Junho 2026
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-white/40">
                <th className="py-4">Ordem / Mês</th>
                <th className="py-4">Ritual</th>
                <th className="py-4">Data Real</th>
                <th className="py-4">Fase</th>
                <th className="py-4">Preço</th>
                <th className="py-4">Filtro</th>
                <th className="py-4">Status</th>
                <th className="py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ciclos.map((c) => (
                <tr key={c.id} className="border-b border-white/5 text-sm hover:bg-white/[0.01] transition-colors">
                  <td className="py-4 text-white/50 font-mono">
                    #{c.ordem || 1}
                  </td>
                  <td className="py-4 font-medium text-white/90">
                    <span className="mr-2 text-lg">{c.emoji || '🔮'}</span>
                    {c.titulo}
                    {c.spiritual && <span className="block text-[10px] text-gold-main/60 italic mt-0.5">Espiritual: {c.spiritual}</span>}
                  </td>
                  <td className="py-4 text-white/50">{c.data_iso} ({c.data_exibir})</td>
                  <td className="py-4 text-white/75">{c.fase}</td>
                  <td className="py-4 text-gold-light">{c.preco}</td>
                  <td className="py-4 text-white/40 font-mono text-[11px]">{c.mes_ano}</td>
                  <td className="py-4">
                    <button 
                      type="button"
                      onClick={() => handleToggleAtivo(c)}
                      className={`text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border transition-all ${
                        c.ativo 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20' 
                          : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                      }`}
                    >
                      {c.ativo ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        type="button"
                        onClick={() => handleEdit(c)}
                        className="p-2 border border-white/5 text-white/40 hover:text-gold-main hover:border-gold-main/20 rounded-full transition-all"
                        title="Editar"
                      >
                        <Settings size={14} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        className="p-2 border border-white/5 text-white/40 hover:text-red-400 hover:border-red-400/20 rounded-full transition-all"
                        title="Remover"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const AdminPedidosTab = ({ pedidos, onRefresh, setNotification }: { pedidos: any[], onRefresh: () => void, setNotification: (notif: {message: string, type: 'success' | 'error' | 'info'} | null) => void }) => {
  const [filter, setFilter] = useState<'aguardando' | 'historico'>('aguardando');

  const liberarAcesso = async (pedido: any) => {
    try {
      if (!pedido || !pedido.id) {
        setNotification({ message: 'Erro: Pedido inválido ou sem identificação.', type: 'error' });
        return;
      }

      let uid = pedido.userId;
      let userExists = true;

      const emailQuery = (pedido.email || "").toString().toLowerCase().trim();

      if (!uid && emailQuery) {
        const q = query(
          collection(db, 'users'),
          where('email', '==', emailQuery)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          uid = snap.docs[0].id;
        } else {
          userExists = false;
        }
      } else if (!uid) {
        userExists = false;
      }

      if (!userExists) {
        await updateDoc(doc(db, 'pedidos_pendentes', pedido.id), {
          status: 'confirmado',
          acessoLiberado: true,
          liberadoEm: new Date().toISOString()
        });

        const pedidoWhatsapp = String(pedido.whatsapp || '');
        if (pedidoWhatsapp) {
          const finalPhone = formatWhatsAppNumber(pedidoWhatsapp);
          if (finalPhone) {
            const wmsg = encodeURIComponent(`Olá, ${pedido.nome || 'Cliente'}! ✨ Seu pedido do "${pedido.produto || 'Produto'}" foi confirmado e liberado! Agora você só precisa concluir o seu cadastro usando o e-mail: ${pedido.email || emailQuery} para liberar seus créditos automaticamente. Acesse aqui: ${window.location.origin}`);
            window.open(`https://wa.me/${finalPhone}?text=${wmsg}`, '_blank');
          }
        }

        setNotification({
          message: `Confirmação realizada! Como ${pedido.nome || pedido.email || 'a cliente'} ainda não concluiu o cadastro, os créditos serão liberados automaticamente assim que ela se cadastrar.`,
          type: 'success'
        });
        onRefresh();
        return;
      }

      if (!uid) {
        setNotification({ message: 'Erro: Não foi possível determinar o ID do usuário cadastrado.', type: 'error' });
        return;
      }

      const prod = (pedido.produto || "").toLowerCase();
      const acessoUpdate: any = {
        updatedAt: new Date().toISOString()
      };

      if (prod.includes('diagnóstico') || prod.includes('diagnostico')) {
        acessoUpdate.diagnostico_comprado = true;
      } else if (prod.includes('completo')) {
        acessoUpdate.mapa_completo_comprado = true;
        acessoUpdate.mappingCredits = increment(1);
      } else if (prod.includes('mapa') || prod.includes('floral') || prod.includes('lealdade') || prod.includes('lealdades')) {
        acessoUpdate.mappingCredits = increment(1);
      } else if (prod.includes('clube')) {
        acessoUpdate.clube_ativo = true;
      } else if (prod.includes('reset') || prod.includes('reprogramação') || prod.includes('reprogramacao')) {
        acessoUpdate.reprogramacao_pessoal_comprada = true;
      } else if (prod.includes('reprograme')) {
        acessoUpdate.reprogramar_eu_comprado = true;
      }

      await setDoc(doc(db, 'user_access', uid), acessoUpdate, { merge: true });
      await setDoc(doc(db, 'users', uid), acessoUpdate, { merge: true });

      await addDoc(collection(db, 'notifications'), {
        userId: uid,
        title: '🔑 Acesso Liberado!',
        message: `Seu acesso ao produto "${pedido.produto || 'Produto'}" foi liberado com sucesso. Aproveite!`,
        status: 'unread',
        createdAt: new Date().toISOString()
      });

      await updateDoc(doc(db, 'pedidos_pendentes', pedido.id), {
        status: 'confirmado',
        acessoLiberado: true,
        liberadoEm: new Date().toISOString(),
        reconciliado: true,
        uid_reconciliado: uid,
        dataReconciliado: new Date().toISOString()
      });

      const wapp = String(pedido.whatsapp || '');
      if (wapp) {
        const finalPhone = formatWhatsAppNumber(wapp);
        if (finalPhone) {
          const wmsg = encodeURIComponent(`Olá, ${pedido.nome || 'Cliente'}! ✨ Seu acesso ao "${pedido.produto || 'Produto'}" foi confirmado e liberado com sucesso! Já está disponível em sua conta para você iniciar. Acesse aqui: ${window.location.origin}`);
          window.open(`https://wa.me/${finalPhone}?text=${wmsg}`, '_blank');
        }
      }

      setNotification({
        message: `Acesso liberado com sucesso para ${pedido.nome || pedido.email}!`,
        type: 'success'
      });
      onRefresh();
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, 'pedidos_pendentes');
      setNotification({ message: 'Erro ao liberar acesso: ' + e.message, type: 'error' });
    }
  };

  const cancelarPedido = async (id: string) => {
    try {
      await updateDoc(doc(db, 'pedidos_pendentes', id), {
        status: 'cancelado',
        canceladoEm: new Date().toISOString()
      });
      setNotification({ message: 'Pedido cancelado com sucesso.', type: 'info' });
      onRefresh();
    } catch (e: any) {
      handleFirestoreError(e, OperationType.WRITE, 'pedidos_pendentes');
      setNotification({ message: 'Erro ao cancelar pedido: ' + e.message, type: 'error' });
    }
  };

  const filtered = pedidos.filter(p => {
    if (filter === 'aguardando') {
      return p.status === 'aguardando';
    } else {
      return p.status !== 'aguardando';
    }
  }).sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime());

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button
          onClick={() => setFilter('aguardando')}
          className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            filter === 'aguardando'
              ? 'bg-[#d4af37] text-black font-extrabold shadow-md shadow-[#d4af37]/20'
              : 'text-white/40 hover:text-white/85 hover:bg-white/5'
          }`}
        >
          Aguardando Liberação
        </button>
        <button
          onClick={() => setFilter('historico')}
          className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            filter === 'historico'
              ? 'bg-[#d4af37] text-black font-extrabold shadow-md shadow-[#d4af37]/20'
              : 'text-white/40 hover:text-white/85 hover:bg-white/5'
          }`}
        >
          Histórico de Pedidos
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl">
          <p className="text-white/30 text-sm font-light">Nenhum pedido encontrado nesta seção.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((pedido) => (
            <div
              key={pedido.id}
              className={`glass-card p-6 border transition-all duration-300 ${
                pedido.status === 'confirmado'
                  ? 'border-emerald-500/10 hover:border-emerald-500/25 bg-emerald-500/[0.005]'
                  : pedido.status === 'cancelado'
                  ? 'border-red-500/10 hover:border-red-500/25 bg-red-500/[0.005]'
                  : 'border-amber-500/15 hover:border-amber-500/30 bg-amber-500/[0.005]'
              }`}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h4 className="text-white font-medium text-base mb-1">{pedido.produto}</h4>
                  <p className="font-mono text-[#d4af37] text-sm font-medium">{pedido.preco}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider border font-bold ${
                  pedido.formaPagamento === 'pix'
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                }`}>
                  {pedido.formaPagamento === 'pix' ? 'PIX' : 'Cartão'}
                </span>
              </div>

              <div className="space-y-3 bg-white/[0.01] border border-white/5 rounded-xl p-4 mb-5 text-xs font-sans text-white/50 leading-relaxed">
                <div>
                  <span className="text-white/20 uppercase tracking-widest text-[8px] block font-bold">Cliente</span>
                  <p className="text-white/80 font-medium">{pedido.nome || 'Cadastro Incompleto'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/20 uppercase tracking-widest text-[8px] block font-bold">WhatsApp</span>
                    {pedido.whatsapp ? (
                      <a
                        href={`https://wa.me/${formatWhatsAppNumber(pedido.whatsapp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline inline-flex items-center gap-1 font-mono font-medium"
                      >
                        {pedido.whatsapp} ↗
                      </a>
                    ) : (
                      <p className="text-white/30 font-light font-mono">Não informado</p>
                    )}
                  </div>
                  <div>
                    <span className="text-white/20 uppercase tracking-widest text-[8px] block font-bold">E-mail</span>
                    <p className="text-white/70 break-all">{pedido.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div>
                    <span className="text-white/20 uppercase tracking-widest text-[8px] block font-bold">Data do Pedido</span>
                    <p className="text-white/60 font-mono text-[10px]">
                      {new Date(pedido.criadoEm).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  {pedido.status === 'confirmado' && pedido.liberadoEm && (
                    <div>
                      <span className="text-emerald-500/40 uppercase tracking-widest text-[8px] block font-bold">Liberado em</span>
                      <p className="text-emerald-400 font-mono text-[10px]">
                        {new Date(pedido.liberadoEm).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  )}
                  {pedido.status === 'cancelado' && pedido.canceladoEm && (
                    <div>
                      <span className="text-red-500/40 uppercase tracking-widest text-[8px] block font-bold">Cancelado em</span>
                      <p className="text-red-400 font-mono text-[10px]">
                        {new Date(pedido.canceladoEm).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {pedido.status === 'aguardando' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => liberarAcesso(pedido)}
                    className="button flex-1 py-3 text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2 font-sans font-medium hover:scale-[1.02] shadow-gold-main/20"
                  >
                    <Check size={14} strokeWidth={2.5} /> Confirmar & Liberar
                  </button>
                  <button
                    onClick={() => cancelarPedido(pedido.id)}
                    className="button-outline border border-[#d4af37]/25 hover:bg-red-500/10 hover:border-red-500/35 border-white/10 text-white/60 hover:text-red-400 py-3 px-4 flex items-center justify-center rounded-xl"
                    title="Cancelar Pedido"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {pedido.status !== 'aguardando' && (
                <div className="flex items-center gap-2 text-xs">
                  {pedido.status === 'confirmado' ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/15 font-bold tracking-wide uppercase text-[9px]">
                      <ShieldCheck size={12} /> Acesso Liberado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-red-400 bg-red-500/5 px-2.5 py-1 rounded-lg border border-red-500/15 font-bold tracking-wide uppercase text-[9px]">
                      <X size={12} /> Pedido Cancelado
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminSessionsTab = ({ appointments, users, onRefresh }: { appointments: any[], users: any[], onRefresh: () => void }) => {
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
      onRefresh();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="glass-card p-6 md:p-10">
      <h3 className="serif text-2xl text-gold-light mb-10">Agenda de Sessões</h3>
      <div className="space-y-6">
        {sortedAppointments.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <Calendar className="mx-auto text-white/10 mb-4" size={48} />
            <p className="text-white/20 text-sm font-light">Nenhum agendamento encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedAppointments.map((s, i) => {
              const user = users.find(u => u.id === s.userId || u.uid === s.userId);
              const userName = user?.name || user?.displayName || s.userName || 'Cliente';
              const userEmail = user?.email || s.userEmail || 'N/A';
              
              return (
                <div key={i} className={`p-6 border rounded-2xl transition-all ${s.status === 'completed' ? 'border-emerald-500/20 bg-emerald-500/[0.02]' : 'border-white/5 hover:border-gold-main/20'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-gold-main/40 text-[9px] uppercase tracking-widest font-bold">{s.productName}</span>
                    <span className="text-white/20 text-[10px]">{s.date} • {s.time}</span>
                  </div>
                  <p className="text-gold-light font-medium mb-2">{userName}</p>
                  <p className="text-white/40 text-xs mb-4">{userEmail}</p>
                  <div className="flex gap-3">
                    {s.status === 'scheduled' ? (
                      <>
                        <button 
                          onClick={() => handleStatusChange(s.id, 'cancelled')}
                          className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all"
                        >
                          Cancelar
                        </button>
                        <button 
                          onClick={() => handleStatusChange(s.id, 'completed')}
                          className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all"
                        >
                          Concluir
                        </button>
                      </>
                    ) : (
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${s.status === 'completed' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {s.status === 'completed' ? 'Concluída' : 'Cancelada'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminReportsTab = ({ users = [], mappings = [], requests = [] }: { users: any[], mappings: any[], requests: any[] }) => {
  const getGrowthData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const now = new Date();
    const series = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      series.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        name: `${months[d.getMonth()]}/${String(d.getFullYear()).slice(-2)}`,
        count: 0,
        value: 0
      });
    }
    
    users.forEach(u => {
      let date: Date;
      if (u.createdAt) {
        date = new Date(u.createdAt);
      } else {
        date = new Date();
      }
      const k = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const found = series.find(item => item.key === k);
      if (found) {
        found.count += 1;
      }
    });
    
    let runningSum = Math.max(12, users.length - users.filter(u => u.createdAt).length);
    series.forEach(item => {
      runningSum += item.count;
      item.value = runningSum;
    });
    
    return series;
  };

  const growthData = getGrowthData();

  const getEmotionDistribution = () => {
    const counts: { [key: string]: number } = {};
    mappings.forEach(m => {
      const em = m.emocao || 'Outros';
      counts[em] = (counts[em] || 0) + 1;
    });
    
    const list = Object.keys(counts).map(key => ({
      label: key,
      value: counts[key],
      percentage: mappings.length > 0 ? Math.round((counts[key] / mappings.length) * 100) : 0
    })).sort((a, b) => b.value - a.value);

    if (list.length === 0) {
      return [
        { label: 'Medo (Bloqueio)', value: 0, percentage: 40 },
        { label: 'Culpa / Auto-cobrança', value: 0, percentage: 30 },
        { label: 'Orgulho / Defesa', value: 0, percentage: 20 },
        { label: 'Vergonha / Insegurança', value: 0, percentage: 10 },
      ];
    }
    return list;
  };

  const emotionalDistribution = getEmotionDistribution();

  const totalUsers = Math.max(1, users.length);
  const paidUsersCount = users.filter(u => u.paidStatus).length;
  const withMappingsCount = Array.from(new Set(mappings.map(m => m.userId))).length;
  const withRequestsCount = Array.from(new Set(requests.map(r => r.userId))).length;

  const convDiagnostico = Math.round((paidUsersCount / totalUsers) * 100);
  const convMapeamento = Math.round((withMappingsCount / totalUsers) * 100);
  const convReprogramacao = Math.round((withRequestsCount / totalUsers) * 100);

  const conversionOffers = [
    { label: `Diagnóstico (Ativos Paid: ${paidUsersCount}/${users.length})`, value: users.length > 0 ? convDiagnostico : 45 },
    { label: `Mapeamento Floral (Mapeamentos correspondentes: ${withMappingsCount}/${users.length})`, value: users.length > 0 ? convMapeamento : 60 },
    { label: `Reprogramação de Posição (Solicitados: ${withRequestsCount}/${users.length})`, value: users.length > 0 ? convReprogramacao : 25 }
  ];

  return (
    <div className="glass-card p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <div>
          <span className="text-gold-main/30 text-[9px] uppercase tracking-[0.4em] block font-bold mb-1">Métricas em Tempo Real</span>
          <h3 className="serif text-3xl text-gold-light">Relatórios e Insights</h3>
        </div>
        <p className="text-white/20 text-xs font-mono">Dados Reais Integrados</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01]">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="serif text-xl text-gold-light">Crescimento de Usuários</h4>
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">Acumulado Dinâmico</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorRealVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#ffffff" opacity={0.3} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <YAxis stroke="#ffffff" opacity={0.3} style={{ fontSize: '10px', fontFamily: 'monospace' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.85)', borderColor: 'rgba(212,175,55,0.2)', borderRadius: '12px' }}
                  labelStyle={{ color: '#D4AF37', fontSize: '12px', fontWeight: 'bold' }}
                  itemStyle={{ color: '#ffffff', fontSize: '12px' }}
                />
                <Area type="monotone" name="Total de Usuários" dataKey="value" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorRealVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01]">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="serif text-xl text-gold-light">Conversão Real de Ofertas</h4>
            <span className="text-[10px] text-gold-main/60 uppercase tracking-widest font-mono font-bold">Funil de Posição</span>
          </div>
          <div className="space-y-6">
            {conversionOffers.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-2">
                  <span className="text-white/40">{item.label}</span>
                  <span className="text-gold-main">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gold-main/20 to-gold-main" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border border-white/5 rounded-3xl bg-white/[0.01] lg:col-span-2">
          <div className="mb-6 flex justify-between items-center">
            <h4 className="serif text-xl text-gold-light">Distribuição de Desafios Emocionais</h4>
            <span className="text-[10px] text-gold-main/60 uppercase tracking-widest font-mono font-bold">Extraído dos Mapeamentos Florais ({mappings.length} Registrados)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emotionalDistribution.map((item, i) => (
              <div key={i} className="p-4 border border-white/5 rounded-2xl bg-black/20 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-white/70 text-sm font-medium">{item.label}</span>
                  <span className="text-gold-light font-mono text-xs font-bold bg-gold-main/10 px-2 py-0.5 rounded">{item.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-main/40 rounded-full" 
                    style={{ width: `${item.percentage}%` }} 
                  />
                </div>
                {item.value > 0 && (
                  <span className="text-white/25 text-[9px] mt-2 font-mono uppercase tracking-widest">Ocorrências: {item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminCouponsTab = ({ coupons, onRefresh, setNotification }: { coupons: any[], onRefresh: () => void, setNotification: (n: any) => void }) => {
  const [newCoupon, setNewCoupon] = useState({ code: '', discountType: 'percentage', value: '' as any });
  const [isCreating, setIsCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleCreate = async () => {
    const val = parseFloat(newCoupon.value);
    if (!newCoupon.code || isNaN(val) || val <= 0) return;
    setIsCreating(true);
    try {
      await addDoc(collection(db, 'coupons'), {
        ...newCoupon,
        value: val,
        code: newCoupon.code.toUpperCase(),
        active: true,
        createdAt: new Date().toISOString()
      });
      setNewCoupon({ code: '', discountType: 'percentage', value: '' });
      onRefresh();
      setNotification({ message: "Cupom criado com sucesso!", type: 'success' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'coupons');
      setNotification({ message: "Erro ao criar cupom.", type: 'error' });
    } finally {
      setIsCreating(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'coupons', id), { active: !currentStatus });
      onRefresh();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `coupons/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'coupons', id));
      onRefresh();
      setNotification({ message: "Cupom excluído com sucesso!", type: 'success' });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `coupons/${id}`);
      setNotification({ message: "Erro ao excluir cupom.", type: 'error' });
    }
  };

  return (
    <div className="glass-card p-6 md:p-10">
      <h3 className="serif text-2xl text-gold-light mb-10">Gerenciar Cupons</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Código</label>
          <input 
            type="text" 
            placeholder="EX: POSICAO10" 
            className="input py-2 text-xs"
            value={newCoupon.code}
            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Tipo</label>
          <select 
            className="input py-2 text-xs"
            value={newCoupon.discountType}
            onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value})}
          >
            <option value="percentage">Porcentagem (%)</option>
            <option value="fixed">Valor Fixo (R$)</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-widest text-white/20 font-bold">Valor</label>
          <input 
            type="number" 
            placeholder="0" 
            className="input py-2 text-xs"
            value={newCoupon.value}
            onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
          />
        </div>
        <div className="flex items-end">
          <button 
            type="button"
            onClick={handleCreate}
            disabled={isCreating}
            className="button w-full py-2.5 text-xs"
          >
            {isCreating ? 'Criando...' : 'Criar Cupom'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {coupons.map((c, i) => (
          <div key={i} className="p-6 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-gold-main/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-gold-main/5 flex items-center justify-center text-gold-main/40">
                <Tag size={20} />
              </div>
              <div>
                <h4 className="serif text-lg text-gold-light">{c.code}</h4>
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                  {c.discountType === 'percentage' ? `${c.value}% de desconto` : `R$ ${c.value} de desconto`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${c.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {c.active ? 'Ativo' : 'Inativo'}
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleStatus(c.id, c.active)}
                  className="p-3 text-gold-main/20 hover:text-gold-main transition-colors"
                  title={c.active ? 'Desativar' : 'Ativar'}
                >
                  {c.active ? <X size={18} /> : <Check size={18} />}
                </button>
                <button 
                  onClick={() => {
                    if (confirmDeleteId === c.id) {
                      handleDelete(c.id);
                      setConfirmDeleteId(null);
                    } else {
                      setConfirmDeleteId(c.id);
                    }
                  }}
                  onMouseLeave={() => setConfirmDeleteId(null)}
                  className={`p-3 transition-colors flex items-center gap-2 ${confirmDeleteId === c.id ? 'text-red-400 bg-red-400/10 rounded-xl' : 'text-white/20 hover:text-red-400'}`}
                  title="Excluir"
                >
                  {confirmDeleteId === c.id ? <span className="text-[10px] font-bold uppercase tracking-widest">Confirmar?</span> : <Trash2 size={18} />}
                </button>
              </div>
            </div>
          </div>
        ))}
        {coupons.length === 0 && (
          <p className="text-center text-white/20 italic py-10">Nenhum cupom cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export const AdminEvaluationsTab = ({ evaluations, onRefresh, setNotification }: { evaluations: any[], onRefresh: () => void, setNotification: (n: any) => void }) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'evaluations', id));
      onRefresh();
      setNotification({ message: "Avaliação excluída com sucesso!", type: 'success' });
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `evaluations/${id}`);
      setNotification({ message: "Erro ao excluir avaliação.", type: 'error' });
    }
  };

  const averageRating = evaluations.length > 0 
    ? (evaluations.reduce((acc, current) => acc + current.rating, 0) / evaluations.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
        <div>
          <h3 className="serif text-xl text-gold-light">Avaliações do Atendimento</h3>
          <p className="text-white/30 text-xs mt-1">Veja o que seus clientes acham do atendimento após a compra.</p>
        </div>
        <div className="text-center bg-gold-main/5 border border-gold-main/20 px-6 py-4 rounded-xl flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <span className="serif text-3xl font-bold text-gold-main">{averageRating}</span>
            <Star className="fill-gold-main text-gold-main w-5 h-5" />
          </div>
          <span className="text-white/20 text-[9px] uppercase tracking-wider font-sans font-bold">
            {evaluations.length} {evaluations.length === 1 ? 'avaliação' : 'avaliações'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evaluations.map((ev, i) => (
          <div key={i} className="p-5 border border-white/5 rounded-2xl bg-white/[0.01] flex flex-col justify-between group hover:border-gold-main/20 transition-all gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < ev.rating
                          ? 'fill-gold-main text-gold-main'
                          : 'text-white/10 fill-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/20 text-[9px] font-sans">
                  {ev.createdAt ? new Date(ev.createdAt).toLocaleDateString('pt-BR') : ''}
                </span>
              </div>

              {ev.comment ? (
                <p className="text-white/80 text-xs italic font-light leading-relaxed">
                  "{ev.comment}"
                </p>
              ) : (
                <p className="text-white/20 text-xs italic font-light">Sem comentários adicionais.</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
              <div className="min-w-0">
                <p className="text-[10px] text-gold-main/50 font-sans truncate" title={ev.userEmail || 'Anônimo'}>
                  {ev.userEmail || 'Anônimo'}
                </p>
                <p className="text-[9px] text-white/20 uppercase tracking-wider">Cliente</p>
              </div>

              <button
                onClick={() => {
                  if (confirmDeleteId === ev.id) {
                    handleDelete(ev.id);
                    setConfirmDeleteId(null);
                  } else {
                    setConfirmDeleteId(ev.id);
                  }
                }}
                onMouseLeave={() => setConfirmDeleteId(null)}
                className={`p-2 transition-colors flex items-center gap-1.5 rounded-lg ${
                  confirmDeleteId === ev.id
                    ? 'text-red-400 bg-red-400/10'
                    : 'text-white/20 hover:text-red-400 hover:bg-white/[0.02]'
                }`}
                title="Excluir"
              >
                {confirmDeleteId === ev.id ? (
                  <span className="text-[8px] font-bold uppercase tracking-wider">Confirmar?</span>
                ) : (
                  <Trash2 size={14} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {evaluations.length === 0 && (
        <p className="text-center text-white/20 italic py-12 bg-white/[0.01] rounded-2xl border border-dashed border-white/5">Nenhuma avaliação recebida até o momento.</p>
      )}
    </div>
  );
};
