import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Calendar, 
  User as UserIcon, 
  Lock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle, 
  RefreshCw,
  Heart,
  HelpCircle,
  Gem
} from 'lucide-react';
import { diasNatalicios, destinosInterp, missoesInterp, anosPessoaisInterp } from './cabalisticaData';

// Tables and Dictionaries
const tabelaCabalistica: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

const arcanos: Record<number, { nome: string, tema: string, potencial: string, desafio: string }> = {
  1: {
    nome: "O Mago",
    tema: "início, ação e manifestação",
    potencial: "clareza para iniciar movimentos com autonomia.",
    desafio: "impulsividade, ansiedade por resultado ou necessidade de controlar tudo antes de começar."
  },
  2: {
    nome: "A Sacerdotisa",
    tema: "intuição, escuta e silêncio interno",
    potencial: "aprofundamento intuitivo e percepção sutil.",
    desafio: "paralisação, excesso de espera ou medo de confiar na própria percepção."
  },
  3: {
    nome: "A Imperatriz",
    tema: "criação, fertilidade e expressão",
    potencial: "dar forma a ideias, relações e projetos.",
    desafio: "dispersão, excesso de prazer ou dificuldade de sustentar direção."
  },
  4: {
    nome: "O Imperador",
    tema: "estrutura, autoridade e construção",
    potencial: "organizar bases, limites e decisões.",
    desafio: "rigidez, autocobrança ou necessidade excessiva de controle."
  },
  5: {
    nome: "O Hierofante",
    tema: "valores, aprendizado e tradição",
    potencial: "reconectar-se com princípios, sabedoria e coerência.",
    desafio: "obedecer regras antigas sem questionar se ainda fazem sentido."
  },
  6: {
    nome: "Os Enamorados",
    tema: "escolhas, vínculos e alinhamento",
    potencial: "decidir com mais coerência entre desejo, valor e direção.",
    desafio: "dependência de validação, dúvida ou medo de desagradar."
  },
  7: {
    nome: "O Carro",
    tema: "direção, movimento e vitória",
    potencial: "avançar com foco, autonomia e decisão.",
    desafio: "pressa, disputa ou fuga pela ação."
  },
  8: {
    nome: "A Justiça",
    tema: "equilíbrio, verdade e consequência",
    potencial: "reorganizar escolhas com lucidez e responsabilidade.",
    desafio: "julgamento, culpa ou cobrança desproporcional."
  },
  9: {
    nome: "O Eremita",
    tema: "sabedoria, recolhimento e maturidade",
    potencial: "escutar a própria verdade com profundidade.",
    desafio: "isolamento, demora excessiva ou medo de exposição."
  },
  10: {
    nome: "A Roda da Fortuna",
    tema: "mudança, ciclos e virada",
    potencial: "aproveitar movimentos de renovação e abertura.",
    desafio: "resistir ao fluxo ou repetir ciclos por inconsciência."
  },
  11: {
    nome: "A Força",
    tema: "coragem, domínio interno e vitalidade",
    potencial: "conduzir impulsos com presença e firmeza.",
    desafio: "tentar vencer tudo pela força ou reprimir emoções."
  },
  12: {
    nome: "O Enforcado",
    tema: "pausa, entrega e nova perspectiva",
    potencial: "enxergar por outro ângulo o que antes parecia bloqueado.",
    desafio: "vitimização, sacrifício ou espera sem decisão."
  },
  13: {
    nome: "A Morte",
    tema: "fim de ciclo, corte e transformação",
    potencial: "encerrar padrões que já cumpriram sua função.",
    desafio: "apego ao conhecido, medo de perder identidade ou resistência à mudança."
  },
  14: {
    nome: "A Temperança",
    tema: "cura, integração e equilíbrio",
    potencial: "harmonizar extremos e reconstruir fluidez.",
    desafio: "oscilar entre excesso e falta sem encontrar medida."
  },
  15: {
    nome: "O Diabo",
    tema: "desejo, apego e poder pessoal",
    potencial: "reconhecer desejos negados e recuperar energia vital.",
    desafio: "dependências, compulsões ou vínculos de aprisionamento."
  },
  16: {
    nome: "A Torre",
    tema: "ruptura, verdade e libertação",
    potencial: "quebrar estruturas falsas e abrir espaço para o real.",
    desafio: "medo de queda, orgulho ferido ou resistência ao inevitável."
  },
  17: {
    nome: "A Estrela",
    tema: "esperança, inspiração e reconexão",
    potencial: "voltar a confiar no próprio caminho.",
    desafio: "idealização, fuga para o sonho ou espera passiva."
  },
  18: {
    nome: "A Lua",
    tema: "inconsciente, emoção e sombra",
    potencial: "escutar sinais internos e refinar a intuição.",
    desafio: "confusão emocional, medo, fantasia ou projeção."
  },
  19: {
    nome: "O Sol",
    tema: "vitalidade, exposição e clareza",
    potencial: "assumir presença, brilho e alegria de existir.",
    desafio: "medo de aparecer, orgulho ou necessidade de aprovação."
  },
  20: {
    nome: "O Julgamento",
    tema: "chamado, despertar e revisão",
    potencial: "responder a uma nova etapa de consciência.",
    desafio: "culpa, autocobrança ou dificuldade de se perdoar."
  },
  21: {
    nome: "O Mundo",
    tema: "conclusão, expansão e integração",
    potencial: "fechar ciclos com maturidade e ampliar horizontes.",
    desafio: "não finalizar por achar que ainda falta algo."
  },
  22: {
    nome: "O Louco",
    tema: "liberdade, reinício e confiança",
    potencial: "abrir um novo caminho com leveza e coragem.",
    desafio: "dispersão, fuga de compromisso ou salto sem chão."
  }
};

const interpretacaoNumeros: Record<number, { expressao: string, sombra: string, bloqueio: string }> = {
  1: {
    expressao: "liderança, iniciativa, identidade e autonomia",
    sombra: "medo de se afirmar, insegurança para começar ou excesso de individualismo",
    bloqueio: "autoafirmação"
  },
  2: {
    expressao: "sensibilidade, vínculo, parceria e cooperação",
    sombra: "dependência emocional, medo de conflito ou necessidade de aprovação",
    bloqueio: "validação externa"
  },
  3: {
    expressao: "comunicação, criatividade, sociabilidade e expressão",
    sombra: "dispersão, fala reprimida, excesso de ideias ou medo de se expor",
    bloqueio: "expressão autêntica"
  },
  4: {
    expressao: "estrutura, disciplina, constância e realização concreta",
    sombra: "rigidez, peso, autocobrança ou medo de errar",
    bloqueio: "segurança e sustentação"
  },
  5: {
    expressao: "liberdade, movimento, flexibilidade e mudança",
    sombra: "instabilidade, fuga, inquietação ou dificuldade de sustentar escolher",
    bloqueio: "constância"
  },
  6: {
    expressao: "amor, responsabilidade, família, beleza e harmonia",
    sombra: "culpa, controle afetivo, excesso de cuidado ou dificuldade de se priorizar",
    bloqueio: "escolhas e vínculos"
  },
  7: {
    expressao: "introspecção, espiritualidade, análise e sabedoria",
    sombra: "isolamento, desconfiança, excesso mental ou fuga para o silêncio",
    bloqueio: "confiança"
  },
  8: {
    expressao: "poder, prosperidade, gestão, autoridade e realização material",
    sombra: "medo de assumir valor, tensão com dinheiro ou controle excessivo",
    bloqueio: "merecimento e autoridade"
  },
  9: {
    expressao: "humanitarismo, fechamento de ciclos, compaixão e sabedoria",
    sombra: "apego ao passado, salvamento, dificuldade de concluir ou soltar",
    bloqueio: "desapego"
  }
};

const sequenciasRepetidasNegativas: Record<string, { titulo: string, bloqueia: string, descricao: string, orientacao: string }> = {
  "111": {
    titulo: "Bloqueio de identidade e iniciativa",
    bloqueia: "posicionamento, coragem de começar, autonomia e liderança",
    descricao: "Pode indicar dificuldade de assumir o próprio lugar, medo de iniciar algo sozinha ou necessidade de validação antes de agir.",
    orientacao: "Fortalecer identidade, decisão e ação mínima sem esperar autorização externa."
  },
  "222": {
    titulo: "Bloqueio emocional e relacional",
    bloqueia: "vínculos, parceria, segurança emocional e decisões afetivas",
    descricao: "Pode apontar dependência emocional, medo de rejeição, excesso de adaptação ou dificuldade de se separar do campo do outro.",
    orientacao: "Diferenciar amor de fusão, escuta de submissão e vínculo de dependência."
  },
  "333": {
    titulo: "Bloqueio de expressão e criatividade",
    bloqueia: "comunicação, criatividade, visibilidade e expansão",
    descricao: "Pode indicar fala reprimida, medo de se expor, excesso de ideias sem forma ou dificuldade de transformar criatividade em entrega.",
    orientacao: "Expressar antes de lapidar demais e permitir que a criação ganhe forma no mundo."
  },
  "444": {
    titulo: "Bloqueio de estrutura e sustentação",
    bloqueia: "organização, trabalho, constância e estabilidade",
    descricao: "Pode apontar rigidez, peso, autocobrança, medo de errar ou sensação de que tudo precisa ser difícil para ter valor.",
    orientacao: "Trocar esforço excessivo por estrutura simples, repetível e sustentável."
  },
  "555": {
    titulo: "Bloqueio de liberdade e movimento",
    bloqueia: "mudanças, prazer, flexibilidade e expansão de experiências",
    descricao: "Pode indicar instabilidade, fuga, medo de compromisso ou dificuldade de sustentar liberdade com responsabilidade.",
    orientacao: "Criar movimento com direção, sem transformar liberdade em dispersão."
  },
  "666": {
    titulo: "Bloqueio afetivo e familiar",
    bloqueia: "amor, família, escolhas do coração, autocuidado e responsabilidade afetiva",
    descricao: "Pode apontar culpa, controle, excesso de responsabilidade pelos outros ou dificuldade de se priorizar sem sentir egoísmo.",
    orientacao: "Escolher com amor sem abandonar a si mesma para manter vínculos."
  },
  "777": {
    titulo: "Bloqueio espiritual e intuitivo",
    bloqueia: "fé, confiança, intuição, introspecção e clareza interna",
    descricao: "Pode indicar isolamento, desconfiança, excesso mental ou dificuldade de confiar na própria percepção espiritual.",
    orientacao: "Transformar análise em sabedoria e silêncio em escuta, não em fuga."
  },
  "888": {
    titulo: "Bloqueio de prosperidade e poder pessoal",
    bloqueia: "dinheiro, autoridade, merecimento, gestão e realização material",
    descricao: "Pode apontar tensão com dinheiro, medo de assumir poder, autossabotagem financeira ou conflito com reconhecimento.",
    orientacao: "Sustentar valor, autoridade e prosperidade sem culpa."
  },
  "999": {
    titulo: "Bloqueio de encerramento e desapego",
    bloqueia: "finalização, perdão, encerramento de ciclos e liberação do passado",
    descricao: "Pode indicar apego emocional, dificuldade de concluir processos, tendência ao salvamento ou medo de deixar algo para trás.",
    orientacao: "Permitir que ciclos terminem sem transformar encerramento em abandono."
  }
};

const sequenciasKarmicas: Record<number, { titulo: string, bloqueia: string, descricao: string, orientacao: string }> = {
  13: {
    titulo: "Transformação pela disciplina",
    bloqueia: "continuidade, organização, realização concreta e conclusão",
    descricao: "Pode indicar resistência à disciplina, adiamento de responsabilidades ou dificuldade de transformar esforço em construção.",
    orientacao: "Criar uma estrutura mínima e finalizar etapas antes de buscar novas possibilidades."
  },
  14: {
    titulo: "Liberdade com responsabilidade",
    bloqueia: "equilíbrio, constância, escolhas maduras e estabilidade emocional",
    descricao: "Pode apontar oscilação entre excesso e falta, dispersão, impulsos ou dificuldade de sustentar acordos.",
    orientacao: "Unir liberdade com medida, prazer com presença e movimento com compromisso."
  },
  16: {
    titulo: "Queda de estruturas falsas",
    bloqueia: "humildade, entrega, confiança e reconstrução verdadeira",
    descricao: "Pode sinalizar orgulho ferido, rupturas necessárias ou resistência em abandonar uma estrutura que já não sustenta a via real.",
    orientacao: "Reconhecer o que precisa cair sem transformar mudança em fracasso."
  },
  19: {
    titulo: "Brilho, autonomia e reconhecimento",
    bloqueia: "visibilidade, autoestima, liderança e merecimento de aparecer",
    descricao: "Pode indicar medo de exposição, orgulho defensivo, necessidade de aprovação ou dificuldade de assumir o próprio valor.",
    orientacao: "Assumir presença com simplicidade, sem se esconder e sem endurecer."
  }
};

// Computational helper functions
const limparNome = (nome: string): string => {
  return nome
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Ç/g, "C")
    .replace(/ç/g, "C")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
};

const reduzirPara9 = (numero: number): number => {
  let n = Number(numero);
  while (n > 9) {
    n = String(n).split("").reduce((acc, digit) => acc + Number(digit), 0);
  }
  return n;
};

const reduzirPara22 = (numero: number): number => {
  let n = Number(numero);
  while (n > 22) {
    n = String(n).split("").reduce((acc, digit) => acc + Number(digit), 0);
  }
  return n === 0 ? 22 : n;
};

const reduzirCabalistica = (numero: number): number => {
  let n = Number(numero);
  while (n > 9 && n !== 11 && n !== 22) {
    n = String(n).split("").reduce((acc, digit) => acc + Number(digit), 0);
  }
  return n;
};

const calcularAnoPessoal = (dataNascimento: string) => {
  const partes = dataNascimento.split("-");
  if (partes.length !== 3) return { numero: 1, intervalo: "", diaRed: 1, mesRed: 1, anoRed: 1, soma: 3 };
  
  const anoNasc = Number(partes[0]);
  const mesNasc = Number(partes[1]);
  const diaNasc = Number(partes[2]);
  
  const hoje = new Date();
  const anoAtual = hoje.getFullYear();
  // Month is 0-indexed in JS, so add 1
  const mesAtual = hoje.getMonth() + 1;
  const diaAtual = hoje.getDate();
  
  let anoUltimoAniversario = anoAtual;
  if (mesAtual < mesNasc || (mesAtual === mesNasc && diaAtual < diaNasc)) {
    anoUltimoAniversario = anoAtual - 1;
  }
  
  const diaRed = reduzirCabalistica(diaNasc);
  const mesRed = reduzirCabalistica(mesNasc);
  const anoRed = reduzirCabalistica(anoUltimoAniversario);
  
  const soma = diaRed + mesRed + anoRed;
  const numero = reduzirCabalistica(soma);
  
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dataInicio = `${pad(diaNasc)}/${pad(mesNasc)}/${anoUltimoAniversario}`;
  const dataFim = `${pad(diaNasc)}/${pad(mesNasc)}/${anoUltimoAniversario + 1}`;
  const intervalo = `de ${dataInicio} até ${dataFim}`;
  
  return {
    diaRed,
    mesRed,
    anoRed,
    soma,
    numero,
    intervalo,
    anoUltimoAniversario
  };
};

const somaDigitosTexto = (texto: string): number => {
  return String(texto)
    .replace(/\D/g, "")
    .split("")
    .reduce((acc, digit) => acc + Number(digit), 0);
};

const obterCaminhoReducao = (numero: number): number[] => {
  const caminho = [Number(numero)];
  let atual = Number(numero);
  while (atual > 9) {
    atual = String(atual).split("").reduce((acc, digit) => acc + Number(digit), 0);
    caminho.push(atual);
  }
  return caminho;
};

const nomeParaNumeros = (nome: string): number[] => {
  const limpo = limparNome(nome);
  return limpo
    .split("")
    .map(letra => tabelaCabalistica[letra])
    .filter(Boolean);
};

const calcularExpressao = (numeros: number[]) => {
  const soma = numeros.reduce((acc, n) => acc + n, 0);
  const caminhoReducao = obterCaminhoReducao(soma);
  return {
    soma,
    caminhoReducao,
    numero: reduzirPara9(soma)
  };
};

const construirTriangulo = (numeros: number[]) => {
  const camadas = [numeros];
  const operacoes: any[] = [];
  let atual = numeros.slice();
  let linhaDestino = 1;

  while (atual.length > 1) {
    const proxima: number[] = [];
    for (let i = 0; i < atual.length - 1; i++) {
      const somaOriginal = atual[i] + atual[i + 1];
      const reduzido = reduzirPara9(somaOriginal);
      proxima.push(reduzido);

      operacoes.push({
        linhaOrigem: linhaDestino,
        linhaDestino: linhaDestino + 1,
        posicaoOrigemA: i + 1,
        posicaoOrigemB: i + 2,
        posicaoDestino: i + 1,
        somaOriginal,
        reduzido
      });
    }
    camadas.push(proxima);
    atual = proxima;
    linhaDestino++;
  }

  return {
    camadas,
    operacoes
  };
};

const calcularArcanoAtual = (dataNascimento: string) => {
  const partes = dataNascimento.split("-");
  const anoAtual = new Date().getFullYear();

  if (partes.length !== 3) {
    throw new Error("Informe uma data de nascimento válida.");
  }

  const mes = partes[1];
  const dia = partes[2];
  const base = `${dia}${mes}${anoAtual}`;
  const soma = somaDigitosTexto(base);
  const numero = reduzirPara22(soma);
  const vibracaoAno = reduzirPara9(soma);

  return {
    soma,
    anoAtual,
    numero,
    vibracaoAno,
    ...arcanos[numero]
  };
};

const detectarSequenciasRepetidas = (camadas: number[][]) => {
  const repetidas: any[] = [];
  const marcacoes: Record<string, { tipo: string, sequencia: string }> = {};

  camadas.forEach((linha, linhaIndex) => {
    for (let i = 0; i <= linha.length - 3; i++) {
      const d = linha[i];
      const e = linha[i + 1];
      const f = linha[i + 2];
      const valA = d;
      const valB = e;
      const valC = f;
      const sequencia = `${valA}${valB}${valC}`;

      if (valA === valB && valB === valC && sequenciasRepetidasNegativas[sequencia]) {
        repetidas.push({
          tipo: "repetida",
          sequencia,
          linha: linhaIndex + 1,
          posicaoInicial: i + 1,
          ...sequenciasRepetidasNegativas[sequencia]
        });

        for (let j = i; j <= i + 2; j++) {
          marcacoes[`${linhaIndex}-${j}`] = {
            tipo: "repetida",
            sequencia
          };
        }
      }
    }
  });

  return {
    repetidas,
    marcacoes
  };
};

const detectarSequenciasKarmicas = (operacoes: any[], expressao: any, arcano: any) => {
  const karmicas: any[] = [];
  const marcacoes: Record<string, { tipo: string, numero: number }> = {};

  operacoes.forEach(op => {
    if (sequenciasKarmicas[op.somaOriginal]) {
      karmicas.push({
        tipo: "karmica",
        origem: "triangulo",
        numero: op.somaOriginal,
        linha: op.linhaDestino,
        posicao: op.posicaoDestino,
        ...sequenciasKarmicas[op.somaOriginal]
      });

      marcacoes[`${op.linhaDestino - 1}-${op.posicaoDestino - 1}`] = {
        tipo: "karmica",
        numero: op.somaOriginal
      };
    }
  });

  expressao.caminhoReducao.forEach((valor: number) => {
    if (sequenciasKarmicas[valor]) {
      karmicas.push({
        tipo: "karmica",
        origem: "expressao",
        numero: valor,
        linha: null,
        posicao: null,
        ...sequenciasKarmicas[valor]
      });
    }
  });

  if (sequenciasKarmicas[arcano.soma]) {
    karmicas.push({
      tipo: "karmica",
      origem: "arcano",
      numero: arcano.soma,
      linha: null,
      posicao: null,
      ...sequenciasKarmicas[arcano.soma]
    });
  }

  return {
    karmicas,
    marcacoes
  };
};

const removerDuplicatasSequencias = (lista: any[]) => {
  const vistos = new Set();
  return lista.filter(item => {
    const chave = `${item.tipo}-${item.numero || item.sequencia}-${item.origem || item.linha}-${item.posicao || item.posicaoInicial}`;
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
};

const gerarLeituraIntegrada = (mapa: any): string => {
  const arcano = mapa.arcano;
  const expressaoInfo = interpretacaoNumeros[mapa.expressao.numero];
  const raizInfo = interpretacaoNumeros[mapa.raiz];
  const destinoInfo = destinosInterp[mapa.destino.numero];
  const missaoInfo = missoesInterp[mapa.missao.numero];
  const diaNatalicioInfo = diasNatalicios[mapa.diaNatalicio.dia];

  let texto = "";
  texto += `A sua jornada de vida é norteada pelo ${destinoInfo?.titulo || `Destino ${mapa.destino.numero}`}, revelando que ${destinoInfo?.expressao?.toLowerCase()?.replace(/\.$/, "") || "seu caminho é de crescimento"}. `;
  texto += `Para sustentar essa evolução, a sua alma se compromete com a ${missaoInfo?.titulo || `Missão ${mapa.missao.numero}`}, impulsionando-a a ${missaoInfo?.expressao?.toLowerCase()?.replace(/\.$/, "") || "concretizar talentos"}. `;
  if (diaNatalicioInfo) {
    texto += `Você traz consigo a forte assinatura do seu ${diaNatalicioInfo.titulo}, manifestando como diferencial o dom de ${diaNatalicioInfo.talento.toLowerCase().replace(/\.$/, "")}. `;
  }
  texto += `No plano concreto, o seu Número de Expressão ${mapa.expressao.numero} sinaliza talentos focados em ${expressaoInfo?.expressao || "criatividade e liderança moral"}. `;
  if (expressaoInfo?.sombra) {
    texto += `Sob o atrito de sombras temporárias, fique atenta a tendências de ${expressaoInfo.sombra}. `;
  }
  if (mapa.anoPessoal) {
    texto += `O seu momento atual, ${mapa.anoPessoal.intervalo}, é regido pelo ${mapa.anoPessoal.titulo}, trazendo influências concentradas em ${mapa.anoPessoal.expressao.toLowerCase().replace(/\.$/, "")}. `;
  }
  texto += `Isso se desenha em paralelo com o Arcano ${arcano.numero} (${arcano.nome}), que atua como regente sutil pedindo atenção a ${arcano.desafio} `;
  texto += `No alicerce do seu Triângulo Invertido de Posição, a raiz ${mapa.raiz} indica que a superação de padrões de ${raizInfo?.sombra || "desafios"} é o seu maior porto seguro para reinar com maturidade. `;

  if (mapa.sequencias.repetidas.length > 0) {
    const repetidas = mapa.sequencias.repetidas.map((item: any) => item.sequencia).join(", ");
    texto += `As correntes repetidas detectadas (${repetidas}) descrevem tensões energéticas no seu nome que bloqueiam o livre fluxo de suas iniciativas. `;
  }

  if (mapa.sequencias.karmicas.length > 0) {
    const karmicas = mapa.sequencias.karmicas.map((item: any) => item.numero).join(", ");
    texto += `Os vetores de sabedoria cármica mapeados (${karmicas}) são portais de reestruturação do caráter e moralidade prática que pedem profunda integridade. `;
  }

  texto += `Lembre-se sempre de que no alinhamento lúcido de sua Missão e seu Destino reside o seu maior poder de manifestação iluminada.`;

  return texto;
};

// Main Exported Component
interface MapaNumerologicoProps {
  isAdmin: boolean;
  access: any;
  handleCheckout: (productName: string, price: string) => void;
  onSaveResult: (data: any) => Promise<void>;
  onGoBack: () => void;
}

export const MapaNumerologico: React.FC<MapaNumerologicoProps> = ({
  isAdmin,
  access,
  handleCheckout,
  onSaveResult,
  onGoBack
}) => {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [currentMap, setCurrentMap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [adminOverridePremium, setAdminOverridePremium] = useState<boolean>(true);

  const calculatedCredits = access?.mappingCredits || 0;
  const isFullStudyBought = access?.mapa_completo_comprado || false;
  const isPremiumUnlocked = isFullStudyBought || (isAdmin && adminOverridePremium);
  // If user bought full map or has credits, they can submit
  const hasAccess = isAdmin || calculatedCredits > 0 || isFullStudyBought;

  // Responsive Triangle auto-scaling values
  const triangleContainerRef = React.useRef<HTMLDivElement>(null);
  const [triangleScale, setTriangleScale] = useState<number>(1);

  // Monitor screen size and scale the Triangle dynamically to prevent mobile overflow
  React.useEffect(() => {
    if (step !== 'result' || !currentMap || !triangleContainerRef.current) return;
    const updateScale = () => {
      const containerWidth = triangleContainerRef.current?.getBoundingClientRect().width || 0;
      if (containerWidth === 0) return;
      const characterCount = currentMap.nomeLetras?.length || 1;
      const triangleMinWidth = characterCount * 36; // 32px box width + Spacing safety
      if (containerWidth < triangleMinWidth) {
        setTriangleScale(Math.max(0.32, containerWidth / (triangleMinWidth + 16)));
      } else {
        setTriangleScale(1);
      }
    };

    const timeoutId = setTimeout(updateScale, 150);
    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateScale);
    };
  }, [step, currentMap, isPremiumUnlocked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nomeFormatado = nome.trim();
    if (nomeFormatado.length < 3) {
      setError("Informe o nome completo de nascimento para formar o triângulo numerológico.");
      return;
    }

    if (!nascimento) {
      setError("Informe uma data de nascimento válida.");
      return;
    }

    setStep('loading');

    try {
      const numeros = nomeParaNumeros(nomeFormatado);
      if (numeros.length < 3) {
        throw new Error("Informe o nome completo de nascimento.");
      }

      const limpo = limparNome(nomeFormatado);
      const letrasArray = limpo.split("");

      // Calculate Motivation (Vowels) - Audited Cabalistic
      const letrasVogais = letrasArray.filter(l => VOWELS.has(l));
      const somaVogais = letrasVogais.reduce((acc, l) => acc + (tabelaCabalistica[l] || 0), 0);
      const motivacao = {
        soma: somaVogais,
        caminho: obterCaminhoReducao(somaVogais),
        numero: reduzirCabalistica(somaVogais)
      };

      // Calculate Impression (Consonants) - Audited Cabalistic
      const letrasConsoantes = letrasArray.filter(l => !VOWELS.has(l) && l >= 'A' && l <= 'Z');
      const somaConsoantes = letrasConsoantes.reduce((acc, l) => acc + (tabelaCabalistica[l] || 0), 0);
      const impressao = {
        soma: somaConsoantes,
        caminho: obterCaminhoReducao(somaConsoantes),
        numero: reduzirCabalistica(somaConsoantes)
      };

      // Calculate Expression - Audited Cabalistic
      const expressaoSoma = numeros.reduce((acc, n) => acc + n, 0);
      const expressao = {
        soma: expressaoSoma,
        caminhoReducao: obterCaminhoReducao(expressaoSoma),
        numero: reduzirCabalistica(expressaoSoma)
      };

      const triangulo = construirTriangulo(numeros);
      const arcano = calcularArcanoAtual(nascimento);
      const raiz = triangulo.camadas[triangulo.camadas.length - 1][0];

      // Parse Birthdate
      const partesNasc = nascimento.split("-");
      const anoNasc = Number(partesNasc[0]);
      const mesNasc = Number(partesNasc[1]);
      const diaNasc = Number(partesNasc[2]);

      // Calculate Day of Birth (Dia Natalício)
      const diaNatalicio = {
        dia: diaNasc,
        ...(diasNatalicios[diaNasc] || {
          titulo: `Dia ${diaNasc}`,
          descricao: "Um dia sintonizado com dons singulares.",
          talento: "Expressividade existencial"
        })
      };

      // Calculate Destiny (Destino) - Audited Cabalistic
      const diaRedDest = reduzirCabalistica(diaNasc);
      const mesRedDest = reduzirCabalistica(mesNasc);
      const anoRedDest = reduzirCabalistica(anoNasc);
      const somaDestinoRaw = diaRedDest + mesRedDest + anoRedDest;
      const destinoNum = reduzirCabalistica(somaDestinoRaw);
      const destino = {
        diaRed: diaRedDest,
        mesRed: mesRedDest,
        anoRed: anoRedDest,
        soma: somaDestinoRaw,
        numero: destinoNum
      };

      // Calculate Mission (Missão) - Audited Cabalistic
      const somaMissaoRaw = destinoNum + expressao.numero;
      const missaoNum = reduzirCabalistica(somaMissaoRaw);
      const missao = {
        soma: somaMissaoRaw,
        numero: missaoNum
      };

      // Calculate Personal Year (Ano Pessoal)
      const anoPessoalCalculado = calcularAnoPessoal(nascimento);
      const anoPessoalInfo = anosPessoaisInterp[anoPessoalCalculado.numero];
      const anoPessoal = {
        ...anoPessoalCalculado,
        titulo: anoPessoalInfo?.titulo || `Ano Pessoal ${anoPessoalCalculado.numero}`,
        expressao: anoPessoalInfo?.expressao || "",
        sombra: anoPessoalInfo?.sombra || "",
        conselho: anoPessoalInfo?.conselho || ""
      };

      const repetidas = detectarSequenciasRepetidas(triangulo.camadas);
      const karmicas = detectarSequenciasKarmicas(triangulo.operacoes, expressao, arcano);

      const marcacoes: Record<string, any[]> = {};
      Object.keys(repetidas.marcacoes).forEach(key => {
        marcacoes[key] = marcacoes[key] || [];
        marcacoes[key].push(repetidas.marcacoes[key]);
      });
      Object.keys(karmicas.marcacoes).forEach(key => {
        marcacoes[key] = marcacoes[key] || [];
        marcacoes[key].push(karmicas.marcacoes[key]);
      });

      const removerDuplicatasPorCampo = (lista: any[], campo: string) => {
        const vistos = new Set();
        return lista.filter(item => {
          const val = item[campo];
          if (vistos.has(val)) return false;
          vistos.add(val);
          return true;
        });
      };

      const mapObj = {
        nome: nomeFormatado,
        nascimento,
        numeros,
        nomeLetras: letrasArray,
        motivacao,
        impressao,
        expressao,
        diaNatalicio,
        destino,
        missao,
        anoPessoal,
        triangulo,
        raiz,
        arcano,
        sequencias: {
          repetidas: removerDuplicatasPorCampo(removerDuplicatasSequencias(repetidas.repetidas), 'sequencia'),
          karmicas: removerDuplicatasPorCampo(removerDuplicatasSequencias(karmicas.karmicas), 'numero')
        },
        marcacoes,
        createdAt: new Date().toISOString()
      };

      const leituraIntegrada = gerarLeituraIntegrada(mapObj);
      const fullMap = { ...mapObj, leituraIntegrada };

      setCurrentMap(fullMap);

      // Save to firebase
      await onSaveResult({
        type: 'mapa_numerologico_posicao',
        nome: nomeFormatado,
        nascimento,
        expressao: expressao.numero,
        diaNatalicio: diaNatalicio.dia,
        destino: destino.numero,
        missao: missao.numero,
        anoPessoal: anoPessoal.numero,
        raiz,
        arcano: arcano.numero,
        arcanoNome: arcano.nome,
        sequenciasRepetidas: fullMap.sequencias.repetidas.map(s => s.sequencia),
        sequenciasKarmicas: fullMap.sequencias.karmicas.map(k => k.numero),
        leituraIntegrada,
        createdAt: new Date().toISOString()
      });

      setStep('result');
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao calcular o mapa.");
      setStep('form');
    }
  };

  return (
    <div className="w-full">
      <div className="back text-center" onClick={onGoBack}>← Voltar</div>
      
      <p className="text-[9px] text-white/15 uppercase tracking-widest mb-6 font-medium text-center">
        Início → Mapa Numerológico
      </p>

      {step === 'form' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-2xl mx-auto p-6 md:p-10 text-left mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-main/40 font-mono mb-4 block font-bold">✨ Estudo Numerológico Cabalístico</span>
          <h2 id="epn-title" className="serif text-3xl md:text-4xl text-gold-light mb-6">Mapeamento Clínico Analítico</h2>
          
          <p className="text-white/75 leading-relaxed text-[15px] font-light mb-8">
            Uma leitura vibracional profunda do seu nome de nascimento completo unindo as equações da Cabala para identificar bloqueios basais, tendências de fardos, forças de destino e as chaves de harmonização.
          </p>

          <div className="border-t border-b border-white/5 py-6 mb-8 space-y-4">
            <h4 className="serif text-lg text-gold-main font-medium">Dois Níveis Disponíveis</h4>
            <ul className="space-y-4 text-sm text-white/60 font-light">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-red-400 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white/80">Estudo de Bloqueios (R$ 9,00):</strong> Revela as correntes repetidas e obstruções ativas no seu Triângulo Invertido de Posição de forma puramente objetiva.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-gold-main mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white/80 font-medium">Mapa Cabalístico Completo (R$ 129,00):</strong> Uma expansão monumental de 8 seções cobrindo sua Nova Assinatura Próspera, ciclos de destino, previsões anuais e mensais, lições espirituais, cores e cristais de harmonização na terra.
                </span>
              </li>
            </ul>
          </div>

          {hasAccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {isAdmin && (
                <div className="p-3 border border-dashed border-gold-main/30 bg-gold-main/5 rounded-lg text-xs text-gold-light font-bold mb-4 uppercase tracking-widest text-center">
                  👑 Administrador Conectado — Acesso Liberado
                </div>
              )}
              {!isAdmin && isFullStudyBought && (
                <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 rounded-lg text-xs text-emerald-400 font-bold mb-4 uppercase tracking-widest text-center">
                  💎 Você adquiriu o Mapa Completo! Acesso Ilimitado Disponível.
                </div>
              )}
              {!isAdmin && !isFullStudyBought && calculatedCredits > 0 && (
                <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 rounded-lg text-xs text-emerald-400 font-bold mb-4 uppercase tracking-widest text-center">
                  ✨ Você possui {calculatedCredits} {calculatedCredits === 1 ? 'crédito de leitura' : 'créditos de leitura'}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl flex items-center gap-3">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nomeCompleto" className="text-[10px] uppercase tracking-wider text-gold-main font-bold">
                    Nome completo de nascimento (sem abreviações)
                  </label>
                  <input 
                    id="nomeCompleto"
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Maria Aparecida da Silva"
                    required
                    className="w-full bg-[#101010] border border-white/10 focus:border-gold-main/50 text-white rounded-lg p-3.5 text-sm outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="dataNascimento" className="text-[10px] uppercase tracking-wider text-gold-main font-bold">
                    Data de nascimento
                  </label>
                  <input 
                    id="dataNascimento"
                    type="date" 
                    value={nascimento}
                    onChange={(e) => setNascimento(e.target.value)}
                    required
                    className="w-full bg-[#101010] border border-white/10 focus:border-gold-main/50 text-white rounded-lg p-3.5 text-sm outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="button w-full shadow-[0_0_15px_rgba(201,160,74,0.15)] uppercase tracking-widest font-bold py-4 text-xs mt-4"
              >
                Analisar Dados Vibracionais
              </button>
            </form>
          ) : (
            <div className="space-y-8 mt-8 font-sans border-t border-white/5 pt-8">
              <h4 className="serif text-xl text-gold-light text-center">Inicie seu Mapeamento</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Opção 1: Bloqueios */}
                <div className="flex flex-col justify-between items-center bg-white/[0.01] border border-white/5 p-6 rounded-2xl text-center hover:border-white/10 transition-all">
                  <div className="w-full">
                    <h5 className="serif text-lg text-white/80 mb-2">Identificação de Bloqueios</h5>
                    <p className="text-white/50 text-xs font-light mb-4 leading-relaxed">
                      Diagnostica as frequências travando as áreas financeira, amorosa ou profissional no seu triângulo de posição.
                    </p>
                  </div>
                  <div className="w-full mt-4 space-y-3">
                    <div className="text-white text-2xl font-serif">R$ 9,00</div>
                    <button 
                      type="button"
                      onClick={() => handleCheckout('Identifique se seu nome bloqueia alguma área da sua vida', 'R$ 9')}
                      className="button w-full uppercase tracking-widest font-bold text-[10px] py-3.5"
                    >
                      Adquirir Bloqueios (R$ 9)
                    </button>
                  </div>
                </div>

                {/* Opção 2: Mapa Completo */}
                <div className="flex flex-col justify-between items-center bg-gold-main/[0.02] border border-gold-main/20 p-6 rounded-2xl text-center shadow-[inset_0_0_15px_rgba(201,160,74,0.05)] hover:border-gold-main/45 transition-all relative">
                  <div className="relative w-full">
                    <span className="absolute top-[-26px] left-1/2 -translate-x-1/2 bg-gold-main text-[#0a0a0a] text-[8px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full shadow-lg">Mais Completo</span>
                    <h5 className="serif text-lg text-gold-light mb-2 mt-2">Mapa Cabalístico Completo</h5>
                    <p className="text-white/50 text-xs font-light mb-4 leading-relaxed">
                      Tudo do estudo de Bloqueios + 8 seções completas de evolução, nova assinatura, lições cármicas e cristais.
                    </p>
                  </div>
                  <div className="w-full mt-4 space-y-3">
                    <div className="text-gold-main text-2xl font-serif font-bold">R$ 129,00</div>
                    <button 
                      type="button"
                      onClick={() => handleCheckout('Mapa Numerológico Cabalístico Completo', 'R$ 129')}
                      className="button w-full shadow-[0_0_15px_rgba(201,160,74,0.15)] uppercase tracking-widest font-bold text-[10px] py-3.5"
                    >
                      Adquirir Mapa Completo (R$ 129)
                    </button>
                  </div>
                </div>

              </div>
              <p className="text-white/30 text-xs italic font-light text-center">
                Insira ou compre créditos para auditar correntes e liberar acessos ou adquira o mapa completo diretamente.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {step === 'loading' && (
        <div className="glass-card max-w-lg mx-auto py-16 px-10 text-center mb-12 flex flex-col items-center justify-center space-y-6">
          <RefreshCw size={36} className="text-gold-main animate-spin" />
          <h3 className="serif text-2xl text-gold-light">Mapeando Frequências...</h3>
          <p className="text-white/40 text-sm font-light">
            Analisando cada sílaba, transliterando correspondências cabalísticas hebraicas e calculando as equações de alicerce do seu Triângulo.
          </p>
        </div>
      )}

      {step === 'result' && currentMap && (() => {
        const expressaoInfo = interpretacaoNumeros[currentMap.expressao.numero];
        const raizInfo = interpretacaoNumeros[currentMap.raiz];
        const totalAlerts = currentMap.sequencias.repetidas.length + currentMap.sequencias.karmicas.length;
        
        // Check which visual template should render (R$ 9 view vs. R$ 129 view)
        const isPremiumUnlocked = isFullStudyBought || (isAdmin && adminOverridePremium);

        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card max-w-4xl mx-auto p-6 md:p-12 text-left mb-12 space-y-12"
          >
            {/* Admin Live Dashboard Override Controls */}
            {isAdmin && (
              <div className="p-4 bg-gold-main/5 border border-gold-main/15 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 select-none mb-4">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono font-bold text-gold-main tracking-widest block">ADMIN DEMO AUDIT PANEL</span>
                  <p className="text-white/50 text-[11px] font-light">Mude a visualização do cliente para testar exatamente os dois tipos de produtos ofertados.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAdminOverridePremium(false)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${!adminOverridePremium ? 'bg-red-500/25 border border-red-500/40 text-red-300' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                  >
                    Estudo de Bloqueios (R$ 9)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminOverridePremium(true)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${adminOverridePremium ? 'bg-gold-main/25 border border-gold-main/40 text-gold-light' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                  >
                    Mapa Completo (R$ 129)
                  </button>
                </div>
              </div>
            )}

            {/* Common Header metadata */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-400 block font-bold mb-1">✔ Cálculos Auditados com Sucesso</span>
                <h3 className="serif text-3xl text-gold-light">Análise Vibracional de {currentMap.nome}</h3>
                <p className="text-white/40 text-[11px] font-mono mt-1">Sintonia Estabelecida em {new Date(currentMap.createdAt).toLocaleDateString('pt-BR')} · Nasc.: {new Date(currentMap.nascimento + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
              </div>
              <button 
                onClick={() => {
                  setStep('form');
                  setNome('');
                  setNascimento('');
                }}
                className="button-outline text-xs px-6 py-2.5 rounded-full"
              >
                Nova consulta
              </button>
            </div>

            {/* PRODUCT TIER 1: R$ 9,00 BLOQUEIOS STUDY VIEW */}
            {!isPremiumUnlocked && (
              <div className="space-y-12">
                <div className="bg-red-500/[0.02] border border-red-500/10 p-5 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">⚠️ Produto Adquirido: Auditoria Vital de Bloqueios</span>
                  <p className="text-xs text-white/70 leading-relaxed font-light">
                    Este diagnóstico foca exclusivamente nas forças obstrutivas em seu nome de batismo. Analisamos detalhadamente o seu <strong>Triângulo Invertido de Posição</strong> para detectar frequências repetitivas negativas (como 111, 222, etc.) que estão drenando ou travando suas escolhas e realizações cotidianas nas grandes áreas da vida.
                  </p>
                </div>

                {/* Highly Responsive Auto-scaled Triangle */}
                <div className="space-y-4">
                  <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">Triângulo Invertido de Bloqueios</h4>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    O Triângulo Cabalístico é erguido reduzindo as letras do seu nome completo a números de 1 a 9 na primeira linha, somando as vizinhanças consecutivamente até atingir o seu número de alicerce (raiz). As correntes de restrição ativas no seu fluxo estão <strong className="text-red-400">destacadas em vermelho</strong> abaixo:
                  </p>

                  <div className="bg-[#080808] border border-white/[0.05] p-6 rounded-2xl flex flex-col items-center justify-center overflow-hidden my-4 py-8 select-none relative min-h-[220px]">
                    <div 
                      ref={triangleContainerRef}
                      className="w-full flex justify-center overflow-hidden"
                    >
                      <div 
                        style={{
                          transform: `scale(${triangleScale})`,
                          transformOrigin: 'top center',
                          height: `calc(${currentMap.triangulo.camadas.length * 56}px * ${triangleScale})`
                        }}
                        className="flex flex-col gap-3.5 text-center transition-all duration-300"
                      >
                        {currentMap.triangulo.camadas.map((layer: number[], lIndex: number) => (
                          <div key={lIndex} className="flex justify-center gap-1.5">
                            {layer.map((cell: number, cIndex: number) => {
                              const cellKey = `${lIndex}-${cIndex}`;
                              const marks = currentMap.marcacoes[cellKey] || [];
                              const isRepeat = marks.some((m: any) => m.tipo === 'repetida');

                              const isFirstLayer = lIndex === 0;
                              const letra = isFirstLayer && currentMap.nomeLetras ? currentMap.nomeLetras[cIndex] : '';

                              let borderBgClasses = "bg-white/[0.02] border-white/5 text-white/70";
                              if (isRepeat) {
                                borderBgClasses = "bg-red-600/20 border-red-500 text-red-200 ring-2 ring-red-500/50 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 font-bold";
                              }

                              return (
                                <div key={cIndex} className="flex flex-col items-center justify-end h-14 w-8 select-none">
                                  {isFirstLayer && (
                                    <span className="text-[10px] font-mono font-bold text-gold-main/80 h-4 block mb-0.5">
                                      {letra || ' '}
                                    </span>
                                  )}
                                  <div 
                                    className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center font-mono ${borderBgClasses}`}
                                  >
                                    {cell}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brief explanations of blocked areas for repeating sequences */}
                <div className="space-y-6">
                  <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">Diagnóstico Detalhado das Áreas Bloqueadas</h4>
                  
                  {currentMap.sequencias.repetidas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentMap.sequencias.repetidas.map((item: any, i: number) => (
                        <div key={i} className="p-5 border border-red-500/10 bg-red-500/[0.01] rounded-xl space-y-3 text-left">
                          <div className="flex justify-between items-center border-b border-white/5 pb-2">
                            <span className="font-mono text-sm font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded leading-none">
                              {item.sequencia}
                            </span>
                            <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Linha de Tensão {item.linha}</span>
                          </div>
                          <h6 className="text-xs font-bold text-white/90">{item.titulo}</h6>
                          <p className="text-[11px] text-white/60 leading-relaxed font-light">
                            <strong>Área Afetada:</strong> {item.bloqueia}.
                          </p>
                          <p className="text-[11px] text-white/50 leading-relaxed font-light">
                            <strong>Como esse bloqueio surge no dia a dia:</strong> {item.descricao}
                          </p>
                          <p className="text-[11px] text-gold-light font-light border-t border-white/5 pt-2 italic">
                            <strong>Recomendação de desobstrução imediata:</strong> {item.orientacao}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 border border-emerald-500/10 bg-emerald-500/[0.01] rounded-xl text-center">
                      <p className="text-sm text-emerald-400 font-bold mb-1">✓ Sem sequências de restrição em seu nome!</p>
                      <p className="text-xs text-white/50 font-light leading-relaxed">
                        Incrível! Não foram encontradas sequências de travas repetidas em seu triângulo primário de batismo. Nenhuma área da sua vida está diretamente sofrendo cortes por desequilíbrio nominal.
                      </p>
                    </div>
                  )}
                </div>

                {/* Upgrade Campaign Box to Full Map - R$ 129,00 */}
                <div className="glass-card border-gold-main/30 bg-gold-main/[0.03] p-8 rounded-2xl text-center space-y-6 max-w-2xl mx-auto my-12 shadow-[0_0_30px_rgba(201,160,74,0.1)]">
                  <div className="inline-flex w-12 h-12 rounded-full bg-gold-main/10 border border-gold-main/20 items-center justify-center text-gold-main animate-pulse mb-2">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="serif text-2xl text-gold-light md:text-3xl leading-snug">
                    Eleve Seus Caminhos com o Seu Mapa Completo
                  </h3>
                  <p className="text-white/70 text-sm max-w-lg mx-auto leading-relaxed font-light">
                    O diagnóstico de bloqueios identificou as amarras do seu nome. No entanto, para curá-las e prosperar de forma plena, é vital conhecer o plano completo! O seu <strong className="text-gold-light font-semibold">Mapa Cabalístico Completo (R$ 129,00)</strong> revela 8 seções fundamentais guiando você até sua Nova Assinatura de Sucesso, números de poder para transações diárias, sabedoria de ciclos pessoais, lições espirituais de reabilitação e transmutação cármica prática.
                  </p>
                  
                  <div className="py-4 border-t border-b border-gold-main/15 max-w-sm mx-auto my-4 flex justify-between items-center px-6">
                    <span className="text-xs text-white/45 uppercase tracking-wider font-mono">Valor do Upgrade</span>
                    <span className="text-2xl text-gold-light font-bold font-serif">R$ 129,00</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCheckout('Mapa Numerológico Cabalístico Completo', 'R$ 129')}
                    className="button bg-gold-main hover:bg-gold-light text-black font-bold uppercase tracking-wider py-4 px-8 rounded-xl shadow-lg shadow-gold-main/10 w-full"
                  >
                    👉 Adquirir Meu Mapa Completo (R$ 129,00)
                  </button>
                  
                  <p className="text-[11px] text-white/35 italic">
                    Acesso imediato e vitalício à sua jornada harmonizada.
                  </p>
                </div>
              </div>
            )}

            {/* PRODUCT TIER 2: R$ 129,00 PREMIUM COMPLETE MAP VIEW */}
            {isPremiumUnlocked && (() => {
              // Mathematical computations for the complete layout
              const cleanNameText = limparNome(currentMap.nome);
              const totalLetrasDoNome = currentMap.numeros || [];
              
              // Calculate Lições Cármicas: missing numbers from 1 to 9 in the name
              const setNumerosEncontrados = new Set(totalLetrasDoNome);
              const licoesEncontradas: number[] = [];
              for (let d = 1; d <= 9; d++) {
                if (!setNumerosEncontrados.has(d)) {
                  licoesEncontradas.push(d);
                }
              }

              // Parse original birthdate parameters for Cycle transition years
              const partesNasc = currentMap.nascimento.split("-");
              const diaReducaoCalculada = reduzirCabalistica(Number(partesNasc[2]));
              const mesReducaoCalculada = reduzirCabalistica(Number(partesNasc[1]));
              const anoReducaoCalculada = reduzirCabalistica(Number(partesNasc[0]));
              const dNum = currentMap.destino.numero === 11 ? 2 : (currentMap.destino.numero === 22 ? 4 : currentMap.destino.numero);
              
              const transitionAge1 = 36 - dNum;
              const transitionAge2 = transitionAge1 + 27;

              // Compute Desafio Principal and Desafios Secundários
              const dNatal = Number(partesNasc[2]);
              const mNatal = Number(partesNasc[1]);
              const aNatal = Number(partesNasc[0]);
              const defNatalRed = reduzirCabalistica(dNatal);
              const defMesRed = reduzirCabalistica(mNatal);
              const defAnoRed = reduzirCabalistica(aNatal);

              const desafioS1 = Math.abs(defNatalRed - defMesRed);
              const desafioS2 = Math.abs(defNatalRed - defAnoRed);
              const desafioPrincipalFinal = Math.abs(desafioS1 - desafioS2);

              // 4 Momentos Decisivos (Conquistas)
              const conquista1 = reduzirCabalistica(defNatalRed + defMesRed);
              const conquista2 = reduzirCabalistica(defNatalRed + defAnoRed);
              const conquista3 = reduzirCabalistica(conquista1 + conquista2);
              const conquista4 = reduzirCabalistica(defMesRed + defAnoRed);

              // Calculate current Month Pessoal
              const currentMonthIndex = new Date().getMonth() + 1; // 1-12
              const mesPessoalNum = reduzirCabalistica(currentMap.anoPessoal.numero + currentMonthIndex);

              // Recommend signature based on current expression
              const recommendedExpressions: Record<number, string> = {
                1: "Assinatura que favorece a individualidade vigorosa, liderança executiva e independência total. Excelente para gerenciar frentes novas.",
                2: "Parcerias leais, diplomacia de alta complexidade, empatia refinada e mediação pacífica.",
                3: "Comunicação magnética comercial, artes orais de largo alcance, carisma exuberante e sociabilidade ativa.",
                4: "Organização estrutural exímia, consistência prática de detalhes, solidez e trabalho persistente.",
                5: "Mudança progressista rápida, viagens, amor à libertação mental e transição constante inovadora.",
                6: "Acolhimento comunitário de amparo social, harmonia estética, família e mediação terapêutica.",
                7: "Estudo científico rigoroso de alta complexidade, introspecção mística intelectual e sabedoria refinada.",
                8: "Prosperidade material executiva justa, gestão corporativa vigorosa de frentes econômicas e merecimento constante.",
                9: "Humanitarismo de grande escopo altruísta, compaixão cósmica universal e fechamento de ciclos falidos."
              };

              // Map Auspicious elements by Destino
              const powerColors: Record<number, string> = {
                1: "Dourado, Amarelo e Laranja Solar",
                2: "Branco, Prata, Creme e Tons Pastéis",
                3: "Amarelo Vibrante, Azul Celeste e Laranja",
                4: "Tons de Terra, Marrom e Verde Musgo",
                5: "Azul Elétrico, Turquesa e Cinza Claro",
                6: "Verde Esmeralda, Rosa Suave e Azul Sereno",
                7: "Violeta, Púrpura e Azul Escuro Índigo",
                8: "Preto, Cinza Chumbo, Azul Escuro e Vermelho Fechado",
                9: "Vermelho Coral, Branco e Violeta Translúcido"
              };

              const crystalsPower: Record<number, string> = {
                1: "Pirita (Prosperidade) e Olho de Tigre",
                2: "Silenita (Paz) e Pedra da Lua",
                3: "Citrino (Magnetismo e Visibilidade) e Cristal de Quartzo",
                4: "Turmalina Negra (Proteção Física) e Quartzo Verde",
                5: "Água-Marinha (Adaptabilidade) e Sodalita",
                6: "Quartzo Rosa (Amor Harmônico) e Esmeralda",
                7: "Ametista (Sabedoria Espiritual) e Lápis-Lazúli",
                8: "Hematita (Aterramento Material) e Turmalina Negra",
                9: "Quartzo Verde (Cura Vital) e Jaspe Vermelho"
              };

              const dMatch = currentMap.destino.numero === 11 ? 2 : (currentMap.destino.numero === 22 ? 4 : currentMap.destino.numero);

              return (
                <div className="space-y-12">
                  
                  {/* SEÇÃO 1: INTRODUÇÃO E BASE DE CÁLCULO */}
                  <div className="space-y-4 border-l-2 border-gold-main pl-5 py-2">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono leading-none">Seção Primária</p>
                    <h4 className="serif text-2xl text-gold-light">1. Introdução e Base de Cálculo</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      O seu nome de batismo não é uma mera etiqueta social: ele representa uma sinergia de frequências matemáticas que operam diretamente na tessitura cósmica do seu ser. Na antiga ciência da Guematria Cabalística, cada letra é convertida ao seu valor arquetípico, traçando as coordenadas estruturais da sua alma. 
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      Este estudo foi desenvolvido sob regras exatas para identificar o seu <strong>Tikun</strong> (o conceito sagrado de retificação de alma). O Tikun mapeia as arestas emocionais e espirituais que você se comprometeu a polir e harmonizar nesta jornada terrena, transcendendo desafios materiais acumulados e ativando seu propósito real de abundância.
                    </p>
                  </div>

                  {/* SEÇÃO 2: A TRÍADE DA ESSÊNCIA */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">2. A Tríade da Essência</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      A Tríade da Essência desvela a engrenagem interior do seu caráter consciencial. É formada pela divisão do seu nome completo em vogais e consoantes, expondo as ambições mais silenciosas do seu ego e a forma como o plano exterior reage a você.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      {/* 1. Motivação */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 text-[50px] font-bold text-white/[0.01] font-mono select-none pointer-events-none">V</div>
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">Motivação (Alma)</span>
                        <h5 className="text-3xl text-gold-main font-serif font-bold">{currentMap.motivacao.numero}</h5>
                        <p className="text-[11px] text-white/45 uppercase tracking-wider font-mono">Soma das Vogais · Vaso Sutil</p>
                        <p className="text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-3">
                          Representa o motor íntimo invisível. É aquilo que você almeja em silêncio absoluto. Com a frequência {currentMap.motivacao.numero}, a sua alma busca constantemente amadurecimento focado em {interpretacaoNumeros[currentMap.motivacao.numero]?.bloqueio || 'paz e elevação moral'}.
                        </p>
                      </div>

                      {/* 2. Impressão */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 text-[50px] font-bold text-white/[0.01] font-mono select-none pointer-events-none">C</div>
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">Impressão (Ambiente)</span>
                        <h5 className="text-3xl text-gold-main font-serif font-bold">{currentMap.impressao.numero}</h5>
                        <p className="text-[11px] text-white/45 uppercase tracking-wider font-mono">Soma das Consoantes · Máscara</p>
                        <p className="text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-3">
                          Descreve o canal social externo. É a primeira imagem que as pessoas captam de você em reuniões práticas e eventos coletivos. A frequência {currentMap.impressao.numero} projeta aos olhos alheios uma aura de {interpretacaoNumeros[currentMap.impressao.numero]?.expressao || 'autoridade cooperadora e tato elegante'}.
                        </p>
                      </div>

                      {/* 3. Expressão */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="absolute right-0 top-0 text-[50px] font-bold text-white/[0.01] font-mono select-none pointer-events-none">E</div>
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">Expressão (Ação Real)</span>
                        <h5 className="text-3xl text-gold-main font-serif font-bold">{currentMap.expressao.numero}</h5>
                        <p className="text-[11px] text-white/45 uppercase tracking-wider font-mono font-bold text-emerald-400">Vogais + Consoantes · Concreto</p>
                        <p className="text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-3">
                          Indica o grande somador geral de talentos natos que dita como você organiza seu destino objetivo na Terra. Com o número {currentMap.expressao.numero}, você possui vocação magnética voltada a {expressaoInfo?.expressao || 'planejamento comercial ativo, ética e autoridade moral'}.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 3: AS VIBRAÇÕES DO NASCIMENTO */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">3. As Vibrações do Nascimento</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      Enquanto o nome representa a força vibracional que se movimenta e se transforma através dos seus atos, as coordenadas temporais de nascimento representam as balizas fixas, a geolocalização e o próprio chão evolutivo onde você desembarcou.
                    </p>

                    <div className="space-y-4">
                      {/* Dia Natalicio */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#E5D5C5] tracking-wider">Dia do Nascimento (Seu Dom Supremo)</span>
                          <span className="text-xs font-mono font-bold text-gold-main bg-gold-main/10 px-2.5 py-1 rounded-full">Dia Fixo: {currentMap.diaNatalicio.dia}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          O dia exato da sua chegada na matéria registra o seu dom inato fundamental. É a ferramenta mais pura que você já domina espiritualmente. O seu <strong>{currentMap.diaNatalicio.titulo}</strong> indica que você possui dons singulares assinalados por {currentMap.diaNatalicio.descricao.toLowerCase()}
                        </p>
                        <p className="text-xs text-gold-light/90 italic font-mono font-light border-t border-white/5 pt-2">
                          💡 <strong>Seu Dom Operacional:</strong> {currentMap.diaNatalicio.talento}
                        </p>
                      </div>

                      {/* Destiny (Destino) */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#E5D5C5] tracking-wider">Caminho de Destino (Sua Trilha de Evolução)</span>
                          <span className="text-xs font-mono font-bold text-gold-main bg-gold-main/10 px-2.5 py-1 rounded-full">Soma da Data → {currentMap.destino.numero}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          O Destino é a grande rodovia asfáltica por onde você transita para expandir sua maturidade evolutiva nesta vida. O seu <strong>{destinosInterp[currentMap.destino.numero]?.titulo || `Destino ${currentMap.destino.numero}`}</strong> indica que o seu aprendizado exige {destinosInterp[currentMap.destino.numero]?.expressao?.toLowerCase()}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-2 mt-2">
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            <strong className="text-red-400 block mb-0.5 uppercase text-[9px] tracking-wider">⚠️ Desvio de Sombra:</strong> {destinosInterp[currentMap.destino.numero]?.sombra}
                          </p>
                          <p className="text-[11px] text-white/50 leading-relaxed">
                            <strong className="text-gold-main block mb-0.5 uppercase text-[9px] tracking-wider">💡 Conselhos de Luz:</strong> {destinosInterp[currentMap.destino.numero]?.conselho}
                          </p>
                        </div>
                      </div>

                      {/* Missão */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#E5D5C5] tracking-wider">Missão de Vida (A Realização da Alma)</span>
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">Expressão + Destino → {currentMap.missao.numero}</span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          A Missão é o trabalho globalizador que o seu Eu Superior veio prestar à humanidade na matéria. Ela une a força do seu nome (Expressão) com o seu solo (Destino). Sob a regência da <strong>{missoesInterp[currentMap.missao.numero]?.titulo || `Missão ${currentMap.missao.numero}`}</strong>, você realiza sua plenitude existencial quando {missoesInterp[currentMap.missao.numero]?.expressao?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 4: O TRIÂNGULO CABALÍSTICO E ARCANOS */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">4. O Triângulo Cabalístico e os Arcanos</h4>
                    
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      O seu triângulo invertido representa o mapa geométrico primário da sua manifestação nominal. Ao transcrever e reduzir o valor de cada letra de seu batismo na primeira linha em regime de frentes matemáticas, construímos as pirâmides que descem progressivamente até assolar a Raiz. 
                    </p>

                    {/* Auto-scaling responsive Inverted Triangle */}
                    <div className="bg-[#080808] border border-white/[0.05] p-6 rounded-2xl flex flex-col items-center justify-center overflow-hidden my-4 py-8 select-none relative min-h-[220px]">
                      <div 
                        ref={triangleContainerRef}
                        className="w-full flex justify-center overflow-hidden"
                      >
                        <div 
                          style={{
                            transform: `scale(${triangleScale})`,
                            transformOrigin: 'top center',
                            height: `calc(${currentMap.triangulo.camadas.length * 56}px * ${triangleScale})`
                          }}
                          className="flex flex-col gap-3.5 text-center transition-all duration-300"
                        >
                          {currentMap.triangulo.camadas.map((layer: number[], lIndex: number) => (
                            <div key={lIndex} className="flex justify-center gap-1.5">
                              {layer.map((cell: number, cIndex: number) => {
                                const cellKey = `${lIndex}-${cIndex}`;
                                const marks = currentMap.marcacoes[cellKey] || [];
                                const isRepeat = marks.some((m: any) => m.tipo === 'repetida');

                                const isFirstLayer = lIndex === 0;
                                const letra = isFirstLayer && currentMap.nomeLetras ? currentMap.nomeLetras[cIndex] : '';

                                // "destacar o arcano regente na primeira linha numérica"
                                const isArcanoRegenteOnFirstLine = isFirstLayer && (
                                  cell === currentMap.arcano.numero || 
                                  cell === currentMap.arcano.vibracaoAno
                                );

                                let borderBgClasses = "bg-white/[0.02] border-white/5 text-white/70";
                                if (isArcanoRegenteOnFirstLine) {
                                  borderBgClasses = "bg-gold-main/20 border-gold-main text-gold-light shadow-[0_0_12px_rgba(201,160,74,0.4)] ring-2 ring-gold-main/30 scale-105 font-black";
                                } else if (isRepeat) {
                                  borderBgClasses = "bg-red-600/20 border-red-500 text-red-200 ring-2 ring-red-500/50 scale-105 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all duration-300 font-bold";
                                }

                                return (
                                  <div key={cIndex} className="flex flex-col items-center justify-end h-14 w-8 select-none">
                                    {isFirstLayer && (
                                      <span className="text-[10px] font-mono font-bold text-gold-main/80 h-4 block mb-0.5">
                                        {letra || ' '}
                                      </span>
                                    )}
                                    <div 
                                      className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center font-mono ${borderBgClasses}`}
                                    >
                                      {cell}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arcano Regente e Ponto Raiz */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      
                      {/* Arcano Regente do Ciclo */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-2 text-left">
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">Arcano Regente de Ciclo Ativo</span>
                        <h5 className="text-lg font-bold text-gold-light">Nº {currentMap.arcano.numero} — {currentMap.arcano.nome}</h5>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          Indica a força propulsora sutil reinando sobre suas escolhas atuais. Sob a regência do tema <strong>{currentMap.arcano.tema}</strong>, você possui potencial ativo para {currentMap.arcano.potencial.toLowerCase()} mas precisa evitar o desvio de {currentMap.arcano.desafio.toLowerCase()}
                        </p>
                      </div>

                      {/* Alicerce e Raiz */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-2 text-left">
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">Base do Triângulo (Alicerce e Ponto Raiz)</span>
                        <h5 className="text-lg font-bold text-gold-light">Frequência Central: {currentMap.raiz}</h5>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          Localizada na última camada de seu triângulo, a raiz <strong>{currentMap.raiz}</strong> representa o porto seguro de seus aprendizados basilares. Para equilibrá-la, você deve expressar padrões focados em <strong>{raizInfo?.expressao || 'retidão e foco prático'}</strong> para transpolar armadilhas de <strong>{raizInfo?.sombra || 'desvios e sombras'}</strong>.
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* SEÇÃO 5: DÍVIDAS E LIÇÕES CÁRMICAS */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">5. Dívidas e Lições Cármicas</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      Na Cabala, entendemos as ocorrências kármicas não como um fardo punitivo eterno, mas como atribuições éticas que nosso Espírito precisa integrar e transmutar de forma prática para herdar a prosperidade terrena.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Lições Cármicas (Missing characters) */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-3 relative text-left">
                        <span className="text-[9px] uppercase tracking-widest text-gold-main font-bold block mb-1">🔮 Suas Lições Cármicas</span>
                        {licoesEncontradas.length > 0 ? (
                          <>
                            <p className="text-xs text-white/70 font-light leading-relaxed">
                              As Lições Cármicas são representadas por números ausentes no seu nome de batismo completo. Indica virtudes vibracionais que você tem o nobre compromisso de desenvolver de forma consciente durante a vida cotidiana:
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {licoesEncontradas.map(d => (
                                <div key={d} className="bg-gold-main/10 border border-gold-main/20 rounded-xl p-3 flex-1 min-w-[90px] text-center space-y-1">
                                  <span className="text-base font-bold text-gold-main block">{d}</span>
                                  <span className="text-[9px] text-white/50 block font-light leading-snug">
                                    {d === 1 ? "Iniciativa" : d === 2 ? "Diplomacia" : d === 3 ? "Autoexpressão" : d === 4 ? "Organização" : d === 5 ? "Flexibilidade" : d === 6 ? "Afetividade" : d === 7 ? "Análise" : d === 8 ? "Autoridade" : "Desapego"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className="text-xs text-emerald-400 font-bold border border-emerald-500/20 bg-emerald-500/[0.01] p-4 rounded-xl">
                            ✓ Você não possui nenhuma Lição Cármica pendente em seu nome! Suas ferramentas de ação possuem todos os arquétipos basais equilibrados.
                          </p>
                        )}
                      </div>

                      {/* Dívidas Cármicas (13, 14, 16, 19) */}
                      <div className="bg-white/[0.01] border border-[#ff0000]/15 p-5 rounded-2xl space-y-3 relative text-left">
                        <span className="text-[9px] uppercase tracking-widest text-[#ff3333] font-bold block mb-1">🚫 Suas Dívidas Cármicas</span>
                        {currentMap.sequencias.karmicas.length > 0 ? (
                          <>
                            <p className="text-xs text-white/70 font-light leading-relaxed">
                              Dívidas Cármicas (13, 14, 16, 19) surgem de desvios éticos em existências pregressas (abusos de livre-arbítrio, posses materiais ou negligências graves). Abaixo está o seu diagnóstico ativo:
                            </p>
                            <div className="space-y-4 pt-2">
                              {currentMap.sequencias.karmicas.map((item: any, idx: number) => (
                                <div key={idx} className="p-4 bg-red-500/[0.01] border border-red-500/10 rounded-xl space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-mono font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded">Frequência {item.numero} — {item.titulo}</span>
                                    <span className="text-[9px] text-white/30 uppercase font-bold">{item.origem === 'triangulo' ? "Linha Triângulo" : "Chave Expressiva"}</span>
                                  </div>
                                  <p className="text-[11px] text-white/60 font-light leading-relaxed">
                                    <strong>O que emperra:</strong> {item.bloqueia}.
                                  </p>
                                  <p className="text-[11px] text-gold-light italic font-light border-t border-white/5 pt-2">
                                    <strong>Transmutação Prática:</strong> {item.orientacao}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className="text-xs text-emerald-400 font-bold border border-emerald-500/20 bg-emerald-500/[0.01] p-4 rounded-xl">
                            ✓ Excelente! Não foram detectadas Dívidas Cármicas estruturais (como 13, 14, 16, 19) em seu cálculo de encarnação atual. Seu fluxo de merecimento está livre de fardos acumulados.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 6: CRONOLOGIA DO DESTINO E DESAFIOS */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">6. Cronologia do Destino e Desafios</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      O seu percurso de existência terrestre divide-se em marcos de amadurecimento específicos de tempo, organizando os desafios temporários e as grandes conquistas estruturais a herdar.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Os 3 Grandes Ciclos de Vida */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-4 text-left">
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">⏳ Os 3 Grandes Ciclos de Vida</span>
                        <div className="space-y-3">
                          <div className="border-l-2 border-gold-main/30 pl-4 py-1">
                            <h6 className="text-xs font-bold text-gold-light">Ciclo da Juventude (0 a {transitionAge1} Anos)</h6>
                            <p className="text-[11px] text-white/60 leading-relaxed font-light">
                              Uma fase propensa a autodescobertas e desenvolvimento básico das relações, vibrando sob o número do mês de nascimento reduzido: <strong>{mesReducaoCalculada}</strong> ({interpretacaoNumeros[mesReducaoCalculada]?.expressao || "foco relacional"}).
                            </p>
                          </div>
                          
                          <div className="border-l-2 border-gold-main/60 pl-4 py-1">
                            <h6 className="text-xs font-bold text-gold-light">Ciclo de Ouro e Maturidade ({transitionAge1} a {transitionAge2} Anos)</h6>
                            <p className="text-[11px] text-white/60 leading-relaxed font-light">
                              O ápice da sua jornada de construção e expression material na terra, sintonizado com o seu dia natalício reduzido: <strong>{diaReducaoCalculada}</strong> ({interpretacaoNumeros[diaReducaoCalculada]?.expressao || "foco realizador"}).
                            </p>
                          </div>

                          <div className="border-l-2 border-gold-main pl-4 py-1">
                            <h6 className="text-xs font-bold text-gold-light">Ciclo Espiritual de Sabedoria (Acima de {transitionAge2} Anos)</h6>
                            <p className="text-[11px] text-white/60 leading-relaxed font-light">
                              O período onde seu legado consolida-se e a sua sabedoria passa a ser guia e farol, sintonizado com o ano natalício reduzido: <strong>{anoReducaoCalculada}</strong> ({interpretacaoNumeros[anoReducaoCalculada]?.expressao || "sabedoria acumulada"}).
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desafios e 4 Momentos Decisivos */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-4 text-left">
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">🎯 Desafios Ativos e Momentos Decisivos</span>
                        <div className="space-y-3 text-xs leading-relaxed font-light">
                          <div className="p-3 bg-red-500/[0.02] border border-red-500/10 rounded-xl space-y-1">
                            <span className="text-[9px] uppercase font-bold text-red-400">⚠️ Desafio Principal de Vida: Frequência {desafioPrincipalFinal}</span>
                            <p className="text-[11px] text-white/60 font-light">
                              Indica o atrito subjacente que você tem o dever moral de pacificar para consolidar o sucesso. Exige desenvolvimento estrutural de <strong>{interpretacaoNumeros[desafioPrincipalFinal]?.bloqueio || "segurança e foco autônomo"}</strong>.
                            </p>
                          </div>

                          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl space-y-2">
                            <span className="text-[9px] uppercase font-bold text-gold-main block">💎 Os 4 Momentos Decisivos (Conquistas Temporais)</span>
                            <ul className="space-y-1.5 text-[11px] text-white/65 font-light">
                              <li>• <strong>1º Marco (0 a {transitionAge1} anos):</strong> Vibração {conquista1} (Potencial de {interpretacaoNumeros[conquista1]?.expressao || "evolução"}).</li>
                              <li>• <strong>2º Marco ({transitionAge1} a {transitionAge1+9} anos):</strong> Vibração {conquista2} (Foco em construção e autonomia).</li>
                              <li>• <strong>3º Marco ({transitionAge1+9} a {transitionAge1+18} anos):</strong> Vibração {conquista3} (Expansão de expressão livre).</li>
                              <li>• <strong>4º Marco (Mais de {transitionAge2} anos):</strong> Vibração {conquista4} (Sua grande coroação de herança de vida).</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 7: TENDÊNCIAS ATUAIS E PREVISÕES */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">7. Tendências Atuais e Previsões</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light font-sans">
                      A Numerologia Cabalística analisa as flutuações temporais do seu ser conectando seu aniversário com o ano calendário presente, gerando ricas estratégias de planejamento anual e mensal com base nas virtudes dos arquétipos.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ano Pessoal */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-2 text-left relative">
                        <span className="text-[9px] uppercase tracking-widest text-gold-main font-bold block mb-1">⚡ Seu Ano Pessoal Corrente</span>
                        <h5 className="text-lg font-bold text-gold-light leading-snug">{currentMap.anoPessoal.titulo}</h5>
                        <p className="text-[10px] text-emerald-400 font-mono block tracking-wide uppercase">Ciclo Ativo: {currentMap.anoPessoal.intervalo}</p>
                        <p className="text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3 mt-2">
                          <strong>Vibração Geral:</strong> {currentMap.anoPessoal.expressao}
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed font-light border-t border-white/5 pt-2">
                          <strong>💡 Conselho Prático:</strong> {currentMap.anoPessoal.conselho}
                        </p>
                      </div>

                      {/* Mês Pessoal */}
                      <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-2xl space-y-2 text-left relative">
                        <span className="text-[9px] uppercase tracking-widest text-[#E5D5C5] font-bold block mb-1">📅 Mês Pessoal em Curso</span>
                        <h5 className="text-lg font-bold text-gold-light leading-snug">Mês Pessoal Atual: Frequência {mesPessoalNum}</h5>
                        <p className="text-xs text-white/70 leading-relaxed font-light border-t border-white/5 pt-3">
                          O seu Mês Pessoal corrente (Ano Pessoal {currentMap.anoPessoal.numero} + Mês Calendário Ativo) vibra sob a frequência do arquétipo <strong>Nº {mesPessoalNum}</strong>. 
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-2">
                          <strong>Estratégia do Mês:</strong> Excelente período para alinhar com {interpretacaoNumeros[mesPessoalNum]?.expressao || "foco e cooperação"}. Evite agir sob a pressa desatenta ou reclusões desproporcionais de sombra.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEÇÃO 8: HARMONIZAÇÃO E ELEMENTOS EXTRA (MANDATÓRIO) */}
                  <div className="space-y-6">
                    <h4 className="serif text-2xl text-gold-light border-b border-white/5 pb-2">8. Harmonização e Elementos Extra</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                      O passo final e definitivo do seu mapa completo! Na numerologia cabalística clássica de transmutação, usamos os cálculos de expressão sob regras de Guematria próspera para recomendar uma sintonização ativa geral no plano diário.
                    </p>

                    <div className="space-y-4">
                      
                      {/* Nova Assinatura Prospera */}
                      <div className="bg-gold-main/[0.02] border border-gold-main/15 p-5 rounded-xl space-y-2 text-left">
                        <span className="text-[10px] uppercase font-bold text-gold-main tracking-wider block">🔑 Proposta de Nova Assinatura Próspera</span>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          Sua assinatura atual expressa a vibração total de {currentMap.expressao.numero}. Caso queira acelerar e dinamizar caminhos financeiros, comerciais ou de visibilidade pública, recomendamos assinar documentos oficiais e logos profissionais sob o arquétipo <strong>Nº 8 (Prosperidade Pragmática)</strong> ou <strong>Nº 1 (Independência Pioneira)</strong>.
                        </p>
                        <p className="text-xs text-white/50 leading-relaxed font-light border-t border-gold-main/10 pt-2 italic">
                          <strong>Orientação de sintonização:</strong> {recommendedExpressions[currentMap.expressao.numero === 4 || currentMap.expressao.numero === 7 ? 8 : currentMap.expressao.numero]}
                        </p>
                      </div>

                      {/* Outros Elementos Práticos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Negocios & Senhas */}
                        <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-2 text-left flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#E5D5C5] tracking-wider block mb-1">🔢 Números e Senhas de Sucesso</span>
                            <p className="text-xs text-white/60 leading-relaxed font-light">
                              • <strong>Números de Negócios:</strong> Suas melhores constantes vibracionais diárias são os dias e valores correspondentes a <strong>1, 3, 5, e 8</strong> para assinatura de contratos ou novos investimentos.
                            </p>
                            <p className="text-xs text-white/60 leading-relaxed font-light mt-2">
                              • <strong>Senhas Seguras Prósperas:</strong> Crie chaves eletrônicas e assinaturas bancárias cuja soma reduzida de dígitos resulte exclusivamente no número <strong>8 (Prosperidade)</strong> ou <strong>9 (Conclusão e Alta Proteção)</strong>.
                            </p>
                          </div>
                        </div>

                        {/* Veiculos & Telefones */}
                        <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-2 text-left flex flex-col justify-between">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#E5D5C5] tracking-wider block mb-1">🚗 Veículos e Linhas Telefônicas</span>
                            <p className="text-xs text-white/60 leading-relaxed font-light">
                              • <strong>Placas de Carro:</strong> Some os dígitos de placas. Favoreça placas com soma final <strong>3 (Movimento Fluido)</strong> ou <strong>4 (Segurança e Estabilidade mecânica)</strong>.
                            </p>
                            <p className="text-xs text-white/60 leading-relaxed font-light mt-2">
                              • <strong>Linhas Telefônicas:</strong> Dê preferência a números cujo final de dígitos sumulado corresponda às energias de <strong>5 (Comunicação Comercial Ágil)</strong> ou <strong>6 (Vínculos Familiares Sólidos)</strong>.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cores e Cristais */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/[0.01] border border-white/[0.05] p-4 rounded-xl text-left">
                          <span className="text-[9px] uppercase font-bold text-gold-main tracking-wider block mb-1">🎨 Suas Cores de Poder</span>
                          <p className="text-xs text-white/70 leading-relaxed font-light">
                            {powerColors[dMatch] || "Dourado, Amarelo e Tons de Off-White"} — Use-as em roupas de eventos cruciais de negociação comercial ou decorações de cabeceira de cama.
                          </p>
                        </div>
                        <div className="bg-white/[0.01] border border-white/[0.05] p-4 rounded-xl text-left">
                          <span className="text-[9px] uppercase font-bold text-gold-main tracking-wider block mb-1">💎 Cristais de Ressonância</span>
                          <p className="text-xs text-white/70 leading-relaxed font-light">
                            {crystalsPower[dMatch] || "Pirita para atração financeira ativa e Citrino para brilho social iluminado."} — Mantenha na bolsa ou gaveta do ambiente de trabalho.
                          </p>
                        </div>
                      </div>

                      {/* TABELA SINTÉTICA DE FÁCIL LEITURA */}
                      <div className="space-y-3 pt-4">
                        <span className="text-[10px] uppercase font-bold text-gold-main tracking-widest block text-center">📊 Tabela Sintética Relacional Cabalística</span>
                        
                        <div className="overflow-x-auto border border-white/5 rounded-xl">
                          <table className="w-full text-center text-xs font-light text-white/80 border-collapse select-all">
                            <thead>
                              <tr className="bg-white/[0.02] border-b border-white/5 text-[9px] uppercase tracking-wider text-gold-light">
                                <th className="p-3 border-r border-white/5 font-bold">Vetor Cabalístico</th>
                                <th className="p-3 border-r border-white/5 font-bold">Frequência</th>
                                <th className="p-3 font-bold">Foco no Plano Real</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">A. Motivação (Soul)</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.motivacao.numero}</td>
                                <td className="p-3 text-white/60 font-light truncate">{interpretacaoNumeros[currentMap.motivacao.numero]?.bloqueio || "Vontades internas e sintonias"}</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">B. Impressão (Esterior)</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.impressao.numero}</td>
                                <td className="p-3 text-white/60 font-light truncate">Filtro de interações e percepção alheia</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-light font-bold text-emerald-400">C. Expressão (Talentos)</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold text-emerald-400">{currentMap.expressao.numero}</td>
                                <td className="p-3 text-emerald-400/80 font-light truncate">Como você organiza suas ações reais na matéria</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">D. Caminho de Destino</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.destino.numero}</td>
                                <td className="p-3 text-white/60 font-light truncate">{destinosInterp[currentMap.destino.numero]?.titulo || "Estrada evolutiva"}</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">E. Dia Natalício (Dom Fixo)</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.diaNatalicio.dia}</td>
                                <td className="p-3 text-white/60 font-light truncate">{currentMap.diaNatalicio.titulo}</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">F. Missão de Alma</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.missao.numero}</td>
                                <td className="p-3 text-white/60 font-light truncate">Seu trabalho sagrado de doação altruísta</td>
                              </tr>
                              <tr className="border-b border-white/5">
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">G. Ano Pessoal Corrente</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{currentMap.anoPessoal.numero}</td>
                                <td className="p-3 text-white/60 font-light truncate">{currentMap.anoPessoal.titulo}</td>
                              </tr>
                              <tr>
                                <td className="p-3 border-r border-white/5 font-bold text-gold-main">H. Mês Pessoal Corrente</td>
                                <td className="p-3 border-r border-white/5 font-mono font-bold">{mesPessoalNum}</td>
                                <td className="p-3 text-white/60 font-light truncate">Planejamento e virtudes do ciclo menor</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Standard footer details: Síntese Integrada do Mapa */}
            {isPremiumUnlocked && (
              <div className="space-y-4 pt-4 border-t border-white/5">
                <h4 className="serif text-xl text-gold-light flex items-center gap-2.5">
                  <Sparkles size={18} className="text-gold-main/40" />
                  Síntese Integrada do Mapa
                </h4>
                <div className="relative p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <p id="lint-desc" className="text-white/80 font-light text-[13.5px] leading-relaxed italic pr-6 first-letter:text-3xl first-letter:font-serif first-letter:float-left first-letter:mr-2">
                    {currentMap.leituraIntegrada}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        );
      })()}
    </div>
  );
};
