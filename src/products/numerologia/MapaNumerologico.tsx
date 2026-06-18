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
      const a = linha[i];
      const b = inline => linha[i + 1];
      const c = lineno => linha[i + 2];
      const valA = a;
      const valB = b !== undefined ? b : linha[i + 1];
      const valC = c !== undefined ? c : linha[i + 2];
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

  let texto = "";
  texto += `O ciclo atual está sob a regência simbólica de ${arcano.nome}, trazendo o tema de ${arcano.tema}. `;
  texto += `Isso indica um período em que a vida pede consciência sobre ${arcano.potencial.replace(".", "")}, mas também atenção a ${arcano.desafio} `;
  texto += `O seu Número de Expressão ${mapa.expressao.numero} revela uma forma de manifestação voltada para a ${expressaoInfo.expressao}. `;
  if (expressaoInfo.sombra) {
    texto += `Em estado de sombra, isso pode sinalizar tendências como ${expressaoInfo.sombra}. `;
  }
  texto += `O ponto raiz do seu Triângulo Invertido é o número ${mapa.raiz}, que aponta para um aprendizado profundo associado à ${raizInfo.bloqueio}. `;

  if (mapa.sequencias.repetidas.length > 0) {
    const repetidas = mapa.sequencias.repetidas.map((item: any) => item.sequencia).join(", ");
    texto += `As correntes repetidas identificadas (${repetidas}) apontam os nós ou intensidades vibracionais do nome que estão exigindo integração neste momento. `;
  }

  if (mapa.sequencias.karmicas.length > 0) {
    const karmicas = mapa.sequencias.karmicas.map((item: any) => item.numero).join(", ");
    texto += `Os vetores de sabedoria cármica localizados (${karmicas}) trazem importantes pontos de alinhamento moral, reestruturação interna e responsabilidade consciencial. `;
  }

  texto += `A grande lição do Mapa de Posição é reconhecer onde reside o excesso para organizar, o conflito para pacificar, e o vazio para autopossuir. Alinhasse com a clareza interna é seu caminho para o equilíbrio natural.`;

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

  const calculatedCredits = access?.mappingCredits || 0;
  const hasAccess = isAdmin || calculatedCredits > 0;

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

      // Calculate Motivation (Vowels)
      const letrasVogais = letrasArray.filter(l => VOWELS.has(l));
      const somaVogais = letrasVogais.reduce((acc, l) => acc + (tabelaCabalistica[l] || 0), 0);
      const motivacao = {
        soma: somaVogais,
        caminho: obterCaminhoReducao(somaVogais),
        numero: reduzirPara9(somaVogais)
      };

      // Calculate Impression (Consonants)
      const letrasConsoantes = letrasArray.filter(l => !VOWELS.has(l) && l >= 'A' && l <= 'Z');
      const somaConsoantes = letrasConsoantes.reduce((acc, l) => acc + (tabelaCabalistica[l] || 0), 0);
      const impressao = {
        soma: somaConsoantes,
        caminho: obterCaminhoReducao(somaConsoantes),
        numero: reduzirPara9(somaConsoantes)
      };

      const expressao = calcularExpressao(numeros);
      const triangulo = construirTriangulo(numeros);
      const arcano = calcularArcanoAtual(nascimento);
      const raiz = triangulo.camadas[triangulo.camadas.length - 1][0];

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
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold-main/40 font-mono mb-4 block font-bold">✨ Novo Produto</span>
          <h2 id="epn-title" className="serif text-4xl text-gold-light mb-6">Mapa Numerológico de Posição</h2>
          
          <p className="text-white/75 leading-relaxed text-[15px] font-light mb-8">
            Uma leitura simbólica profunda do seu nome de nascimento completo, associado à data atual, identificando o arcano regente do ciclo corrente, seu número de expressão e as sequências numéricas de desequilíbrio e alinhamento no Triângulo Invertido.
          </p>

          <div className="border-t border-b border-white/5 py-6 mb-8 space-y-4">
            <h4 className="serif text-lg text-gold-main font-medium">O que esse estudo revela?</h4>
            <ul className="space-y-3 text-sm text-white/60 font-light">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-gold-main/60 mt-0.5 flex-shrink-0" />
                <span><strong>Arcano Regente:</strong> O grande arquétipo regendo sua fase anual atual e os desafios a enfrentar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-gold-main/60 mt-0.5 flex-shrink-0" />
                <span><strong>Número de Expressão:</strong> Seu modo inato de emitir e organizar suas ações no plano visível.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={15} className="text-gold-main/60 mt-0.5 flex-shrink-0" />
                <span><strong>Análise de Sequências:</strong> Pontos de tensão marcantes no nome (como 111, 222, etc) e possíveis armadilhas cármicas (13, 14, 16, 19).</span>
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
              {!isAdmin && calculatedCredits > 0 && (
                <div className="p-3 border border-emerald-500/30 bg-emerald-500/5 rounded-lg text-xs text-emerald-400 font-bold mb-4 uppercase tracking-widest text-center">
                  ✨ Você possui {calculatedCredits} {calculatedCredits === 1 ? 'crédito' : 'créditos'} de Mapeamento
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
                Gerar meu mapa numerológico
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6 mt-8 font-sans">
              <div className="text-gold-main text-3xl font-serif">
                R$ 9,00
              </div>
              <button 
                type="button"
                onClick={() => handleCheckout('Mapa Numerológico de Posição', 'R$ 9')}
                className="button w-full uppercase tracking-widest font-bold text-xs"
              >
                👉 Adquirir meu diagnóstico numerológico
              </button>
              <p className="text-white/30 text-xs italic font-light">
                Utilize seus créditos de Mapeamento ou adquira uma nova leitura para prosseguir.
              </p>
            </div>
          )}
        </motion.div>
      )}

      {step === 'loading' && (
        <div className="glass-card max-w-lg mx-auto py-16 px-10 text-center mb-12 flex flex-col items-center justify-center space-y-6">
          <RefreshCw size={36} className="text-gold-main animate-spin" />
          <h3 className="serif text-2xl text-gold-light">Calculando Triângulos...</h3>
          <p className="text-white/40 text-sm font-light">
            Analisando cada sílaba, unindo as vibrações das letras cabalísticas e sintonizando com o seu arcano regente.
          </p>
        </div>
      )}

      {step === 'result' && currentMap && (() => {
        const expressaoInfo = interpretacaoNumeros[currentMap.expressao.numero];
        const raizInfo = interpretacaoNumeros[currentMap.raiz];
        const totalAlerts = currentMap.sequencias.repetidas.length + currentMap.sequencias.karmicas.length;

        return (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card max-w-4xl mx-auto p-6 md:p-12 text-left mb-12 space-y-12"
          >
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
              <div>
                <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-400 block font-bold mb-1">✔ Mapa Calculado</span>
                <h3 className="serif text-3xl text-gold-light">Mapa de {currentMap.nome}</h3>
                <p className="text-white/40 text-[11px] font-mono mt-1">Sintonizado em {new Date(currentMap.createdAt).toLocaleDateString('pt-BR')}</p>
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

            {/* Quick KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl text-center">
                <span className="text-white/35 text-[9px] uppercase tracking-wider block font-medium mb-1">Arcano Regente</span>
                <span className="text-3xl text-gold-main font-bold block leading-none font-serif mb-2">{currentMap.arcano.numero}</span>
                <span className="text-white/80 text-[11px] truncate block font-medium">{currentMap.arcano.nome}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl text-center">
                <span className="text-white/35 text-[9px] uppercase tracking-wider block font-medium mb-1">Expressão</span>
                <span className="text-3xl text-gold-main font-bold block leading-none font-serif mb-2">{currentMap.expressao.numero}</span>
                <span className="text-white/80 text-[11px] truncate block font-medium">Forma do agir</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl text-center">
                <span className="text-white/35 text-[9px] uppercase tracking-wider block font-medium mb-1">Raiz Triângulo</span>
                <span className="text-3xl text-gold-main font-bold block leading-none font-serif mb-2">{currentMap.raiz}</span>
                <span className="text-white/80 text-[11px] truncate block font-medium">{raizInfo?.bloqueio || 'Aprendizado'}</span>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl text-center">
                <span className="text-white/35 text-[9px] uppercase tracking-wider block font-medium mb-1">Pontos de Atenção</span>
                <span className="text-3xl text-gold-main font-bold block leading-none font-serif mb-2">{totalAlerts}</span>
                <span className="text-white/80 text-[11px] truncate block font-medium">Bloqueios & Desafios</span>
              </div>
            </div>

            {/* Arcano Section */}
            <div className="space-y-4">
              <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">1. Arcano Regente do Ciclo Atual</h4>
              <p className="text-sm text-white/70 font-light">
                O seu momento atual está sob a regência simbólica da chave arcana de número <strong>{currentMap.arcano.numero} ({currentMap.arcano.nome})</strong>. Esse arquétipo traz o tema do(a) <strong>{currentMap.arcano.tema}</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gold-main/[0.02] border border-gold-main/10 p-5 rounded-xl space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-gold-main font-bold block">✨ Potencial Ativo</span>
                  <p className="text-xs text-white/75 leading-relaxed">{currentMap.arcano.potencial}</p>
                </div>
                <div className="bg-red-500/[0.02] border border-red-500/10 p-5 rounded-xl space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-red-400 font-bold block">⚠️ Ponto de Atenção</span>
                  <p className="text-xs text-white/75 leading-relaxed">{currentMap.arcano.desafio}</p>
                </div>
              </div>
            </div>

            {/* Expressao Section */}
            <div className="space-y-4">
              <span id="ev-label"></span>
              <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">2. Chaves Vibracionais do Nome</h4>
              
              <div className="space-y-4">
                {/* 1. Motivação */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#E5D5C5] font-bold">
                      Soma das Vogais (Motivação)
                    </span>
                    <span className="text-xs font-mono text-gold-main font-bold bg-gold-main/10 px-2.5 py-1 rounded-full">
                      Soma: {currentMap.motivacao?.soma || 0} (Redução: {currentMap.motivacao?.caminho?.join(" → ") || '9'}) → {currentMap.motivacao?.numero || 9}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    <strong>Significado:</strong> Revela seus desejos íntimos, aspirações, estrutura de pensamento e o que move o seu coração.
                  </p>
                  {currentMap.motivacao && (
                    <p className="text-xs text-white/70 font-light mt-1 border-t border-white/5 pt-2 italic">
                      Sua alma clama pela vibração do número {currentMap.motivacao.numero}, que evoca a busca profunda por {interpretacaoNumeros[currentMap.motivacao.numero]?.expressao || 'equilíbrio e harmonia divina'}.
                    </p>
                  )}
                </div>

                {/* 2. Impressão */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#E5D5C5] font-bold">
                      Soma das Consoantes (Impressão)
                    </span>
                    <span className="text-xs font-mono text-gold-main font-bold bg-gold-main/10 px-2.5 py-1 rounded-full">
                      Soma: {currentMap.impressao?.soma || 0} (Redução: {currentMap.impressao?.caminho?.join(" → ") || '9'}) → {currentMap.impressao?.numero || 9}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    <strong>Significado:</strong> Mostra como você age no mundo, a imagem que transmite aos outros e a forma como é percebido.
                  </p>
                  {currentMap.impressao && (
                    <p className="text-xs text-white/70 font-light mt-1 border-t border-white/5 pt-2 italic">
                      Você transmite externamente a frequência do número {currentMap.impressao.numero}, expressando a energia de {interpretacaoNumeros[currentMap.impressao.numero]?.expressao || 'ação e interação construtiva'}.
                    </p>
                  )}
                </div>

                {/* 3. Expressão */}
                <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#E5D5C5] font-bold">
                      Soma de Vogais + Consoantes (Expressão)
                    </span>
                    <span className="text-xs font-mono text-gold-main font-bold bg-gold-main/10 px-2.5 py-1 rounded-full">
                      Soma: {currentMap.expressao.soma} (Redução: {currentMap.expressao.caminhoReducao.join(" → ")}) → {currentMap.expressao.numero}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    <strong>Significado:</strong> Representa o seu potencial, seus talentos natos e a maneira como você se manifesta e interage com o universo.
                  </p>
                  <p className="text-xs text-white/70 font-light mt-1 border-t border-white/5 pt-2 italic">
                    Seu potencial global expressa o número {currentMap.expressao.numero}, indicando talentos em {expressaoInfo?.expressao || 'expressividade e liderança iluminada'}.
                  </p>
                </div>
              </div>
            </div>

            {/* Triangulo Invertido Visual Section */}
            <div className="space-y-4">
              <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">3. Triângulo Invertido de Posição</h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                O triângulo é construído posicionando as vibrações das letras do seu nome na primeira linha. Unindo cada par de números vizinhos, formamos as bases subsequentes reduzidas a números simples, até alcançarmos o número raiz da base.
              </p>

              <div className="bg-[#0c0c0c] border border-white/[0.05] p-6 rounded-2xl flex flex-col items-center justify-center overflow-x-auto my-4 py-8 select-none">
                <div className="flex flex-col gap-4 min-w-max text-center">
                  {currentMap.triangulo.camadas.map((layer: number[], lIndex: number) => (
                    <div key={lIndex} className="flex justify-center gap-1.5 md:gap-2">
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

                        let borderBgClasses = "bg-white/[0.03] border-white/10 text-white/85";
                        if (isArcanoRegenteOnFirstLine) {
                          // Highly polished highlighted gold styling for the Arcano Regente on the first line
                          borderBgClasses = "bg-gold-main/20 border-gold-main text-gold-light shadow-[0_0_12px_rgba(201,160,74,0.4)] ring-2 ring-gold-main/30 scale-105 font-black";
                        } else if (isRepeat) {
                          // "destacar as sequencias que bloqueiam o fluxo"
                          borderBgClasses = "bg-red-500/15 border-red-500/40 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)]";
                        } // Note: "Não destacar vetores carmicos" inside triangle is fulfilled here!

                        return (
                          <div key={cIndex} className="flex flex-col items-center justify-end h-14 w-8 md:w-9 select-none">
                            {isFirstLayer && (
                              <span className="text-[10px] md:text-xs font-mono font-bold text-gold-main/90 h-4 block mb-0.5 animate-pulse">
                                {letra || ' '}
                              </span>
                            )}
                            <div 
                              className={`w-8 h-8 md:w-9 md:h-9 rounded-lg border text-xs md:text-sm flex items-center justify-center font-mono transition-all duration-300 ${borderBgClasses}`}
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

            {/* Raiz Section */}
            <div className="space-y-4">
              <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">4. Base e Alicerce (O Ponto Raiz)</h4>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                A raiz do seu triângulo invertido, localizada na última ponta inferior, é o número <strong>{currentMap.raiz}</strong>. Esse núcleo representa as forças subjacentes mais profundas, seu alicerce evolutivo e o padrão-raiz que precisa de sua atenção em sua jornada terrena.
              </p>
              {raizInfo && (
                <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-[#E5D5C5] font-bold">Resolução de Bloqueio Raiz: {raizInfo.bloqueio}</span>
                    <span className="text-xs font-mono font-bold text-gold-main">Nível {currentMap.raiz}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    <strong>Expressão positiva a buscar:</strong> {raizInfo.expressao}.
                  </p>
                  <p className="text-xs text-white/60 leading-relaxed font-light border-t border-white/5 pt-2">
                    <strong>Armadilhas inconscientes (Sombra):</strong> {raizInfo.sombra}.
                  </p>
                </div>
              )}
            </div>

            {/* Sequencias & Bloqueais Section */}
            <div className="space-y-6">
              <h4 className="serif text-xl text-gold-light border-b border-white/5 pb-2">5. Correntes Vibracionais e Desafios Ativos</h4>
              
              {/* Sequências Repetidas */}
              <div className="space-y-4">
                <h5 className="text-xs uppercase tracking-[0.2em] text-red-400 font-bold">🚫 Bloqueios de Corrente (Sequências Repetidas)</h5>
                
                {currentMap.sequencias.repetidas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentMap.sequencias.repetidas.map((item: any, i: number) => (
                      <div key={i} className="p-5 border border-red-500/10 bg-red-500/[0.01] rounded-xl space-y-3 text-left">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="font-mono text-base font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded leading-none">
                            {item.sequencia}
                          </span>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Linha {item.linha}</span>
                        </div>
                        <h6 className="text-xs font-bold text-white/80">{item.titulo}</h6>
                        <p className="text-[11px] text-white/50 leading-relaxed font-light">
                          <strong>O que limita:</strong> {item.bloqueia}.
                        </p>
                        <p className="text-[11px] text-white/50 leading-relaxed font-light">
                          <strong>Manifestação:</strong> {item.descricao}.
                        </p>
                        <p className="text-[11px] text-gold-light font-light border-t border-white/5 pt-2 italic">
                          <strong>Orientação de Posição:</strong> {item.orientacao}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-emerald-500/10 bg-emerald-500/[0.01] rounded-xl text-xs text-white/50 font-light">
                    Parabéns! Não foram identificadas sequências numéricas repetidas negativas no seu Triângulo Invertido de Posição. Suas correntes basais estão fluindo harmoniosamente.
                  </div>
                )}
              </div>

              {/* Sabedorias Cármicas */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <span id="vsc-label"></span>
                  <h5 className="text-xs uppercase tracking-[0.2em] text-gold-main font-bold">🔮 Vetores de Sabedoria Cármica</h5>
                </div>
                
                {currentMap.sequencias.karmicas.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentMap.sequencias.karmicas.map((item: any, i: number) => (
                      <div key={i} className="p-5 border border-gold-main/10 bg-gold-main/[0.01] rounded-xl space-y-3 text-left">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="font-mono text-base font-bold text-gold-main bg-gold-main/10 px-2.5 py-0.5 rounded leading-none">
                            {item.numero}
                          </span>
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                            {item.origem === 'triangulo' ? `Linha ${item.linha}` : item.origem === 'expressao' ? 'Chave de Expressão' : 'Frequência do Arcano'}
                          </span>
                        </div>
                        <h6 className="text-xs font-bold text-white/80">{item.titulo}</h6>
                        <p className="text-[11px] text-white/50 leading-relaxed font-light">
                          <strong>Desafio evolutivo:</strong> {item.bloqueia}.
                        </p>
                        <p className="text-[11px] text-white/50 leading-relaxed font-light">
                          <strong>Indicadores inconscientes:</strong> {item.descricao}.
                        </p>
                        <p className="text-[11px] text-gold-light font-light border-t border-white/5 pt-2 italic">
                          <strong>Caminho de Integração:</strong> {item.orientacao}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 border border-emerald-500/10 bg-emerald-500/[0.01] rounded-xl text-xs text-white/50 font-light">
                    Não foram detectados vetores cármicos ativos em seu cálculo vibracional atual.
                  </div>
                )}
              </div>
            </div>

            {/* Leitura Integrada (Sintese) */}
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
          </motion.div>
        );
      })()}
    </div>
  );
};
