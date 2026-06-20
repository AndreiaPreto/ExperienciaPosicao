import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebase';

export interface Ciclo {
  id: string;
  titulo: string;
  fase: string;
  emoji: string;
  spiritual: string | null;
  data_iso: string;
  data_exibir: string;
  mes_ano: string;
  descricao: string;
  importancia: string;
  beneficios: string[];
  preco: string;
  ativo: boolean;
  ordem: number;
}

// Fallback rituais de Junho 2026
export const fallbackJunho2026: Ciclo[] = [
  {
    id: "fallback-1",
    titulo:      "Ritual de Transbordo",
    fase:        "Lua Cheia",
    emoji:       "🌕",
    spiritual:   null,
    data_iso:    "2026-06-03",
    data_exibir: "03 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Ritual de reconhecimento e liberação na lua cheia de junho. Honre tudo que floresceu neste ciclo, libere o que já cumpriu seu papel e equilibre as emoções intensas que a lua amplifica.",
    importancia: "A lua cheia amplifica tudo que está ativo em você, como intenções, emoções e padrões. Este ritual transforma essa amplitude em consciência.",
    beneficios:  ["Clareza emocional", "Liberação energética", "Expansão espiritual"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       1,
  },
  {
    id: "fallback-2",
    titulo:      "Ritual de Desapego",
    fase:        "Lua Minguante",
    emoji:       "🌗",
    spiritual:   null,
    data_iso:    "2026-06-10",
    data_exibir: "10 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Limpeza energética profunda: solte padrões, vínculos e crenças que já não cabem em quem você está se tornando. A minguante é o momento certo para esvaziar antes de plantar.",
    importancia: "Desapegar não é perder, mas sim criar espaço para o que está vindo. Sem esse esvaziamento, o novo não encontra lugar.",
    beneficios:  ["Leveza emocional", "Dissolução de bloqueios", "Clareza mental"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       2,
  },
  {
    id: "fallback-3",
    titulo:      "Ritual de Amor Próprio e Vínculos",
    fase:        "Energia Relacional",
    emoji:       "💛",
    spiritual:   null,
    data_iso:    "2026-06-12",
    data_exibir: "12 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Ritual para ressignificar seus vínculos afetivos a partir do amor próprio. Não é um ritual de conquista, mas sim de alinhamento: quando você se posiciona com mais presença, seus relacionamentos mudam junto.",
    importancia: "A forma como você se relaciona com os outros é um espelho de como você se relaciona consigo mesma. Comece por aqui.",
    beneficios:  ["Amor próprio consolidado", "Vínculos mais conscientes", "Libertação de padrões afetivos"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       3,
  },
  {
    id: "fallback-4",
    titulo:      "Ritual de Santo Antônio",
    fase:        "Energia Espiritual",
    emoji:       "🌿",
    spiritual:   "Santo Antônio",
    data_iso:    "2026-06-13",
    data_exibir: "13 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Ritual de conexão, atração e realinhamento afetivo com a energia de Santo Antônio. Trabalha o campo dos vínculos, das buscas do coração e da abertura para o amor genuíno.",
    importancia: "Santo Antônio não é apenas o santo dos namorados, mas sim o patrono dos que buscam com o coração aberto e sincero.",
    beneficios:  ["Atração de vínculos verdadeiros", "Proteção nos relacionamentos", "Abertura do campo afetivo"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       4,
  },
  {
    id: "fallback-5",
    titulo:      "Ritual de Expansão",
    fase:        "Lua Crescente",
    emoji:       "🌒",
    spiritual:   null,
    data_iso:    "2026-06-18",
    data_exibir: "18 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Ação prática para sustentar e expandir as intenções plantadas na lua nova. A crescente pede movimento: é hora de dar os primeiros passos concretos em direção ao que foi intencionado.",
    importancia: "Intenção sem ação é apenas desejo. A lua crescente é o convite para encarnar o que você quer criar.",
    beneficios:  ["Disciplina consciente", "Execução de objetivos", "Autoconfiança"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       5,
  },
  {
    id: "fallback-6",
    titulo:      "Ritual de Semeadura",
    fase:        "Lua Nova",
    emoji:       "🌑",
    spiritual:   null,
    data_iso:    "2026-06-25",
    data_exibir: "25 de Junho",
    mes_ano:     "2026-06",
    descricao:   "Plantio de intenções para o próximo ciclo lunar. A lua nova de junho carrega a energia do solstício de inverno no hemisfério sul, um momento de recolhimento, escuta interna e criação de novas bases.",
    importancia: "Na escuridão da lua nova há potência pura. Toda realidade começa com uma intenção bem plantada no silêncio.",
    beneficios:  ["Clareza de intenção", "Conexão com ciclos naturais", "Ativação da manifestação consciente"],
    preco:       "R$ 9",
    ativo:       true,
    ordem:       6,
  },
];

// Retorna o mes_ano atual no formato "YYYY-MM" dinamicamente
const getMesAnoAtual = (): string => {
  const now = new Date();
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  return `${ano}-${mes}`;
};

// Retorna "Junho 2026" a partir de "2026-06"
export const formatarMesAno = (mesAno: string): string => {
  const [ano, mes] = mesAno.split('-');
  const meses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];
  return `${meses[parseInt(mes) - 1]} ${ano}`;
};

// Calcula quantos dias faltam para a data do ritual
export const diasParaRitual = (dataIso: string): number => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const data = new Date(dataIso + 'T00:00:00');
  return Math.ceil((data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
};

export const useCiclos = (mesAnoOverride?: string) => {
  const [ciclos, setCiclos] = useState<Ciclo[]>([]);
  const [mesAno, setMesAno] = useState(mesAnoOverride || getMesAnoAtual());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscar = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, 'ciclos_posicao'),
          where('mes_ano', '==', mesAno),
          where('ativo', '==', true),
          orderBy('ordem', 'asc')
        );
        const snap = await getDocs(q);
        const fbCiclos = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ciclo));
        
        if (fbCiclos.length === 0) {
          // Fallback para junho 2026 apenas se for o mês correto
          const [ano, mes] = mesAno.split('-');
          if (mesAno === "2026-06") {
            setCiclos(fallbackJunho2026);
          } else {
            setCiclos([]); // Mês sem rituais cadastrados — mostra estado vazio
          }
        } else {
          setCiclos(fbCiclos);
        }
      } catch (err) {
        console.error('Erro ao buscar ciclos:', err);
        if (mesAno === "2026-06") {
          setCiclos(fallbackJunho2026);
        } else {
          setError('Não foi possível carregar os ciclos.');
        }
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [mesAno]);

  return { ciclos, mesAno, setMesAno, loading, error };
};
