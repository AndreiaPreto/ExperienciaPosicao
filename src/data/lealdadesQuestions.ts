export interface LealdadeOption {
  value: number;
  label: string;
}

export interface LealdadesQuestion {
  text: string;
  axes?: { [key: string]: number };
  areas?: { [key: string]: number };
  mechanism?: string;
  consciousness?: boolean;
  readiness?: boolean;
}

export interface AxisDetail {
  label: string;
  fear: string;
  gain: string;
  cost: string;
  mechanism: string;
  archetype: string;
  phrase: string;
  liberation: string;
  practice: string;
}

export const lealdadesQuestions: LealdadesQuestion[] = [
  // ── AXIS: PERTENCIMENTO ──
  {
    text: "Sinto que, para ser aceita, preciso me adaptar ao que esperam de mim.",
    axes: { pertencimento: 3, invisibilidade: 1 },
    areas: { familia: 2, autoestima: 2 },
    mechanism: "adaptação"
  },
  {
    text: "Tenho medo de crescer e acabar me afastando de pessoas importantes.",
    axes: { pertencimento: 3, culpa: 2, poderPessoal: 1 },
    areas: { familia: 2, prosperidade: 2 },
    mechanism: "evitação"
  },
  {
    text: "Às vezes sinto que ser diferente da minha família me torna errada ou ingrata.",
    axes: { pertencimento: 3, culpa: 2 },
    areas: { familia: 3, autoestima: 1 },
    mechanism: "adaptação"
  },
  {
    text: "Tenho dificuldade em fazer escolhas que contrariem expectativas familiares.",
    axes: { pertencimento: 3, poderPessoal: 2 },
    areas: { familia: 3, trabalho: 1 },
    mechanism: "validação externa"
  },
  {
    text: "Sinto que preciso provar que continuo pertencendo, mesmo quando quero seguir outro caminho.",
    axes: { pertencimento: 3, sacrificio: 1 },
    areas: { familia: 2, espiritualidade: 1 },
    mechanism: "adaptação"
  },
  {
    text: "Tenho medo de ser excluída se eu mudar demais.",
    axes: { pertencimento: 3, invisibilidade: 2 },
    areas: { familia: 2, amor: 2 },
    mechanism: "apagamento"
  },
  {
    text: "Muitas vezes repito padrões que não quero, mas que parecem familiares.",
    axes: { pertencimento: 2, compensacao: 2 },
    areas: { familia: 3 },
    mechanism: "repetição"
  },

  // ── AXIS: SACRIFÍCIO ──
  {
    text: "Costumo colocar as necessidades dos outros acima das minhas.",
    axes: { sacrificio: 3, culpa: 1 },
    areas: { amor: 2, familia: 2 },
    mechanism: "resgate"
  },
  {
    text: "Sinto culpa quando descanso enquanto outras pessoas estão sobrecarregadas.",
    axes: { sacrificio: 2, culpa: 3 },
    areas: { trabalho: 2, familia: 2 },
    mechanism: "culpa funcional"
  },
  {
    text: "Tenho dificuldade em dizer não, mesmo quando estou esgotada.",
    axes: { sacrificio: 3, invisibilidade: 2 },
    areas: { amor: 2, autoestima: 2 },
    mechanism: "evitação"
  },
  {
    text: "Sinto que amar alguém significa suportar mais do que eu gostaria.",
    axes: { sacrificio: 3, pertencimento: 1 },
    areas: { amor: 3 },
    mechanism: "resgate"
  },
  {
    text: "Tenho a sensação de que, se eu não resolver tudo, algo ruim pode acontecer.",
    axes: { sacrificio: 2, compensacao: 3 },
    areas: { familia: 2, trabalho: 2 },
    mechanism: "controle"
  },
  {
    text: "Muitas vezes carrego responsabilidades que não eram minhas.",
    axes: { sacrificio: 3, compensacao: 2 },
    areas: { familia: 2, trabalho: 2 },
    mechanism: "resgate"
  },
  {
    text: "Tenho dificuldade de receber ajuda sem sentir que estou incomodando.",
    axes: { sacrificio: 2, culpa: 2, invisibilidade: 1 },
    areas: { autoestima: 3, amor: 1 },
    mechanism: "autossuficiência"
  },

  // ── AXIS: CULPA ──
  {
    text: "Sinto culpa quando minha vida começa a melhorar.",
    axes: { culpa: 3, escassez: 1 },
    areas: { prosperidade: 2, autoestima: 2 },
    mechanism: "autossabotagem"
  },
  {
    text: "Às vezes sinto que não posso ser mais feliz do que pessoas da minha família.",
    axes: { culpa: 3, pertencimento: 2 },
    areas: { familia: 3, amor: 1 },
    mechanism: "autossabotagem"
  },
  {
    text: "Tenho medo de parecer egoísta quando escolho a mim mesma.",
    axes: { culpa: 3, sacrificio: 2 },
    areas: { autoestima: 2, amor: 2 },
    mechanism: "culpa funcional"
  },
  {
    text: "Sinto desconforto quando recebo mais reconhecimento, dinheiro ou atenção.",
    axes: { culpa: 3, invisibilidade: 2, poderPessoal: 1 },
    areas: { prosperidade: 2, trabalho: 2 },
    mechanism: "apagamento"
  },
  {
    text: "Tenho a sensação de que preciso merecer muito antes de receber.",
    axes: { culpa: 2, escassez: 3 },
    areas: { prosperidade: 3 },
    mechanism: "perfeccionismo"
  },
  {
    text: "Quando algo bom acontece, fico esperando algo ruim vir depois.",
    axes: { culpa: 2, escassez: 3 },
    areas: { prosperidade: 2, amor: 1 },
    mechanism: "hipervigilância"
  },
  {
    text: "Tenho medo de que minha expansão machuque ou abandone alguém.",
    axes: { culpa: 3, pertencimento: 2, poderPessoal: 1 },
    areas: { familia: 2, prosperidade: 2 },
    mechanism: "autossabotagem"
  },

  // ── AXIS: COMPENSAÇÃO ──
  {
    text: "Sinto que preciso reparar dores, faltas ou injustiças da minha família.",
    axes: { compensacao: 3, sacrificio: 2 },
    areas: { familia: 3 },
    mechanism: "resgate"
  },
  {
    text: "Às vezes sinto que vivo tentando consertar histórias que começaram antes de mim.",
    axes: { compensacao: 3, pertencimento: 1 },
    areas: { familia: 3, espiritualidade: 1 },
    mechanism: "resgate"
  },
  {
    text: "Tenho dificuldade em separar o que é meu do que pertence aos outros.",
    axes: { compensacao: 3, sacrificio: 2 },
    areas: { familia: 2, amor: 2 },
    mechanism: "fusão emocional"
  },
  {
    text: "Sinto que preciso proteger emocionalmente pessoas adultas.",
    axes: { compensacao: 3, sacrificio: 2 },
    areas: { familia: 2, amor: 2 },
    mechanism: "resgate"
  },
  {
    text: "Tenho a sensação de carregar pesos antigos que não sei explicar.",
    axes: { compensacao: 3, pertencimento: 1 },
    areas: { familia: 2, espiritualidade: 2 },
    mechanism: "hipervigilância"
  },
  {
    text: "Às vezes me sinto responsável por manter a família, o relacionamento ou o grupo em equilíbrio.",
    axes: { compensacao: 3, sacrificio: 2 },
    areas: { familia: 2, amor: 2 },
    mechanism: "controle"
  },
  {
    text: "Sinto que, se eu seguir livre, estarei traindo alguém ou alguma história.",
    axes: { compensacao: 2, culpa: 3, poderPessoal: 1 },
    areas: { familia: 2, espiritualidade: 2 },
    mechanism: "autossabotagem"
  },

  // ── AXIS: ESCASSEZ ──
  {
    text: "Tenho medo constante de faltar dinheiro, tempo, apoio ou segurança.",
    axes: { escassez: 3 },
    areas: { prosperidade: 3, trabalho: 1 },
    mechanism: "hipervigilância"
  },
  {
    text: "Sinto que preciso lutar muito para conseguir qualquer coisa.",
    axes: { escassez: 3, sacrificio: 1 },
    areas: { prosperidade: 2, trabalho: 2 },
    mechanism: "controle"
  },
  {
    text: "Tenho dificuldade de confiar que as coisas podem vir com leveza.",
    axes: { escassez: 3, culpa: 1 },
    areas: { prosperidade: 2, espiritualidade: 1 },
    mechanism: "hipervigilância"
  },
  {
    text: "Quando recebo algo bom, sinto que preciso compensar rapidamente.",
    axes: { escassez: 2, culpa: 2, compensacao: 1 },
    areas: { prosperidade: 2, autoestima: 1 },
    mechanism: "culpa funcional"
  },
  {
    text: "Sinto que estabilidade é sempre temporária.",
    axes: { escassez: 3 },
    areas: { prosperidade: 2, trabalho: 2 },
    mechanism: "hipervigilância"
  },
  {
    text: "Tenho medo de arriscar, mesmo quando desejo crescer.",
    axes: { escassez: 2, poderPessoal: 2 },
    areas: { trabalho: 2, prosperidade: 2 },
    mechanism: "evitação"
  },
  {
    text: "Sinto que prosperar pode me tornar alvo de críticas, inveja ou rejeição.",
    axes: { escassez: 2, invisibilidade: 2, pertencimento: 1 },
    areas: { prosperidade: 3, trabalho: 1 },
    mechanism: "apagamento"
  },

  // ── AXIS: INVISIBILIDADE ──
  {
    text: "Tenho receio de me expor, mesmo quando sei que tenho algo importante a oferecer.",
    axes: { invisibilidade: 3, poderPessoal: 2 },
    areas: { trabalho: 2, autoestima: 2 },
    mechanism: "apagamento"
  },
  {
    text: "Costumo diminuir minhas conquistas para não incomodar ninguém.",
    axes: { invisibilidade: 3, culpa: 2 },
    areas: { autoestima: 2, trabalho: 2 },
    mechanism: "apagamento"
  },
  {
    text: "Tenho medo de ser julgada quando mostro quem realmente sou.",
    axes: { invisibilidade: 3, pertencimento: 2 },
    areas: { autoestima: 2, amor: 1 },
    mechanism: "evitação"
  },
  {
    text: "Às vezes prefiro não me posicionar para evitar conflito.",
    axes: { invisibilidade: 3, pertencimento: 1 },
    areas: { amor: 2, trabalho: 2 },
    mechanism: "evitação"
  },
  {
    text: "Sinto que minha voz não tem tanto valor quanto a dos outros.",
    axes: { invisibilidade: 3, poderPessoal: 2 },
    areas: { autoestima: 3 },
    mechanism: "apagamento"
  },
  {
    text: "Tenho dificuldade em ocupar espaços de liderança, destaque ou autoridade.",
    axes: { invisibilidade: 2, poderPessoal: 3 },
    areas: { trabalho: 3, autoestima: 1 },
    mechanism: "procrastinação"
  },
  {
    text: "Sinto que aparecer pode me colocar em perigo emocional.",
    axes: { invisibilidade: 3, escassez: 1 },
    areas: { autoestima: 2, trabalho: 1 },
    mechanism: "hipervigilância"
  },

  // ── AXIS: PODER PESSOAL ──
  {
    text: "Tenho dificuldade em confiar nas minhas próprias decisões.",
    axes: { poderPessoal: 3 },
    areas: { autoestima: 2, trabalho: 2 },
    mechanism: "validação externa"
  },
  {
    text: "Sinto que preciso de permissão para avançar.",
    axes: { poderPessoal: 3, pertencimento: 1 },
    areas: { trabalho: 2, familia: 1 },
    mechanism: "validação externa"
  },
  {
    text: "Muitas vezes sei o que preciso fazer, mas algo me trava antes da ação.",
    axes: { poderPessoal: 3, escassez: 1 },
    areas: { trabalho: 2, prosperidade: 2 },
    mechanism: "procrastinação"
  },
  {
    text: "Tenho medo da responsabilidade que vem junto com o meu crescimento.",
    axes: { poderPessoal: 3, culpa: 1 },
    areas: { trabalho: 2, prosperidade: 2 },
    mechanism: "evitação"
  },
  {
    text: "Às vezes sinto que meu poder pessoal pode afastar pessoas.",
    axes: { poderPessoal: 3, pertencimento: 2 },
    areas: { amor: 2, familia: 2 },
    mechanism: "autossabotagem"
  },
  {
    text: "Tenho dificuldade em sustentar escolhas que priorizam minha liberdade.",
    axes: { poderPessoal: 3, sacrificio: 1 },
    areas: { autoestima: 2, espiritualidade: 2 },
    mechanism: "evitação"
  },
  {
    text: "Sinto que existe uma versão minha mais forte, mas ainda não autorizada a viver plenamente.",
    axes: { poderPessoal: 3, invisibilidade: 2 },
    areas: { autoestima: 2, espiritualidade: 2 },
    mechanism: "validação externa"
  },

  // ── AXIS: CONSCIOUSNESS ──
  {
    text: "Consigo perceber quando estou repetindo um padrão antigo.",
    consciousness: true
  },
  {
    text: "Tenho facilidade para refletir sobre minhas escolhas antes de agir.",
    consciousness: true
  },
  {
    text: "Reconheço quando estou me abandonando para agradar ou evitar conflito.",
    consciousness: true
  },
  {
    text: "Tenho interesse verdadeiro em compreender meus padrões emocionais.",
    consciousness: true
  },
  {
    text: "Consigo assumir responsabilidade pelas minhas decisões sem me culpar excessivamente.",
    consciousness: true
  },

  // ── AXIS: READINESS ──
  {
    text: "Estou disposta a mudar comportamentos antigos, mesmo que isso gere desconforto no início.",
    readiness: true
  },
  {
    text: "Consigo lidar com desconfortos temporários quando sei que uma mudança é necessária.",
    readiness: true
  },
  {
    text: "Estou aberta a agir de formas novas, mesmo sem ter controle total do resultado.",
    readiness: true
  },
  {
    text: "Sinto que estou em um momento favorável para me reposicionar.",
    readiness: true
  },
  {
    text: "Estou comprometida com meu crescimento de forma realista e gentil.",
    readiness: true
  }
];

export const axisData: { [key: string]: AxisDetail } = {
  pertencimento: {
    label: "Pertencimento",
    fear: "Se eu for diferente, posso perder amor, vínculo ou aceitação.",
    gain: "Inclusão, proteção e sensação de vínculo.",
    cost: "Autoabandono, dificuldade de escolher diferente e medo de desagradar.",
    mechanism: "Adaptação excessiva.",
    archetype: "Guardião do Vínculo",
    phrase: "Eu preciso ser parecida com o meu sistema para continuar pertencendo.",
    liberation: "Eu posso pertencer sem me abandonar.",
    practice: "Durante 7 dias, observe onde você se adapta para não desagradar. Antes de dizer sim, pergunte: isso é uma escolha ou uma tentativa de pertencer?"
  },
  sacrificio: {
    label: "Sacrifício",
    fear: "Se eu parar de carregar, posso deixar de ser necessária ou amada.",
    gain: "Sentir-se útil, importante e indispensável.",
    cost: "Exaustão, ressentimento e dificuldade de receber.",
    mechanism: "Sobrecarga funcional.",
    archetype: "Mártir Amoroso",
    phrase: "Se eu não fizer por todos, talvez ninguém fique.",
    liberation: "Meu amor não precisa custar a minha vida.",
    practice: "Durante 7 dias, escolha uma ação diária que cuide de você antes de tentar sustentar todos ao seu redor."
  },
  culpa: {
    label: "Culpa",
    fear: "Se eu tiver mais, posso ferir, abandonar ou parecer superior a alguém.",
    gain: "Evitar rejeição, julgamento, comparação ou sensação de dívida.",
    cost: "Autossabotagem, medo de receber e dificuldade de prosperar com leveza.",
    mechanism: "Autossabotagem moral.",
    archetype: "Devedor Invisível",
    phrase: "Eu não posso ter mais do que aqueles que amo.",
    liberation: "Minha expansão não diminui ninguém.",
    practice: "Durante 7 dias, perceba onde você reduz sua alegria ou seu crescimento. Repita: eu posso receber sem culpa."
  },
  compensacao: {
    label: "Compensação",
    fear: "Se eu não compensar, algo ficará em aberto e eu serei responsável.",
    gain: "Sensação de missão, controle e pertencimento.",
    cost: "Peso emocional, confusão de identidade e excesso de responsabilidade.",
    mechanism: "Assunção de destino.",
    archetype: "Reparador Sistêmico",
    phrase: "Eu preciso resolver o que ficou quebrado antes de mim.",
    liberation: "Eu honro a história, mas devolvo o destino.",
    practice: "Durante 7 dias, observe onde você tenta resolver dores que não começaram em você. Repita: eu devolvo com amor o que não me pertence."
  },
  escassez: {
    label: "Escassez",
    fear: "Se eu relaxar, algo pode faltar ou desmoronar.",
    gain: "Sensação de controle, preparo e autoproteção.",
    cost: "Ansiedade, tensão e dificuldade de confiar.",
    mechanism: "Hipervigilância de sobrevivência.",
    archetype: "Sobrevivente Estratégico",
    phrase: "Eu preciso estar sempre pronta para perder.",
    liberation: "Eu posso construir segurança sem viver em guerra.",
    practice: "Durante 7 dias, observe pensamentos de falta. Antes de agir por medo, pergunte: existe uma escolha mais segura e menos desesperada?"
  },
  invisibilidade: {
    label: "Invisibilidade",
    fear: "Se eu aparecer, posso ser julgada, atacada ou rejeitada.",
    gain: "Proteção, segurança e menor exposição emocional.",
    cost: "Apagamento, adiamento e dificuldade de se posicionar.",
    mechanism: "Apagamento estratégico.",
    archetype: "Invisível Protegido",
    phrase: "É mais seguro não chamar atenção.",
    liberation: "Eu posso ser vista sem estar em perigo.",
    practice: "Durante 7 dias, escolha uma pequena forma de aparecer com segurança: falar, postar, pedir, se posicionar ou mostrar algo que normalmente esconderia."
  },
  poderPessoal: {
    label: "Poder Pessoal",
    fear: "Se eu assumir minha força, posso perder amor, vínculo ou controle.",
    gain: "Evitar críticas, responsabilidades, conflitos e exposição.",
    cost: "Paralisia, insegurança e dependência de validação.",
    mechanism: "Autorização externa.",
    archetype: "Soberano Adiado",
    phrase: "Eu ainda não tenho permissão para ser tudo o que sou.",
    liberation: "Eu posso ocupar meu lugar com amor e firmeza.",
    practice: "Durante 7 dias, tome uma pequena decisão por dia sem buscar validação externa. Depois diga: eu sustento minha escolha com presença."
  }
};

export const areaLabels: { [key: string]: string } = {
  amor: "Amor",
  prosperidade: "Prosperidade",
  trabalho: "Trabalho",
  familia: "Família",
  autoestima: "Autoestima",
  espiritualidade: "Espiritualidade"
};

export const getProfile = (dominant: string, secondary: string) => {
  const pair = [dominant, secondary].sort().join("+");

  const profiles: { [key: string]: { name: string; description: string } } = {
    "pertencimento+sacrificio": {
      name: "Guardião Sobrecarregado",
      description: "Você pode ter aprendido a proteger vínculos assumindo responsabilidades excessivas."
    },
    "escassez+invisibilidade": {
      name: "Sobrevivente Vigilante",
      description: "Você pode ter desenvolvido estratégias de proteção baseadas em alerta, cauteloso e discrição."
    },
    "compensacao+culpa": {
      name: "Reparador Sistêmico",
      description: "Você pode estar tentando equilibrar histórias, dores ou responsabilidades que não começaram em você."
    },
    "invisibilidade+pertencimento": {
      name: "Invisível Estratégico",
      description: "Você pode ter aprendido que a discrição ajuda a manter segurança, aceitação e vínculo."
    },
    "culpa+poderPessoal": {
      name: "Soberano Adiado",
      description: "Você reconhece seu potencial, mas pode sentir culpa ou medo ao ocupar plenamente o seu lugar."
    },
    "escassez+poderPessoal": {
      name: "Construtor Resiliente",
      description: "Você possui força de realização, mas pode agir a partir da sobrevivência mais do que da confiança."
    }
  };

  return profiles[pair] || {
    name: "Caminhante em Reposicionamento",
    description: "Seu resultado sugere uma combinação própria de padrões, indicando um momento importante de consciência e reorganização interna."
  };
};

export function getConsciousnessLevel(percent: number): string {
  if (percent <= 30) return "Consciência Inicial";
  if (percent <= 60) return "Consciência Emergente";
  if (percent <= 80) return "Consciência Integrativa";
  return "Consciência Transformadora";
}

export function getReadinessLevel(percent: number): string {
  if (percent <= 30) return "Prontidão Baixa";
  if (percent <= 60) return "Prontidão Moderada";
  if (percent <= 80) return "Prontidão Alta";
  return "Prontidão Muito Alta";
}
