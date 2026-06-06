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
  description: string;
  unconsciousPhrase: string;
  repositioningMovement: string;
  reflexiveQuestion: string;
  dayPractice: {
    name: string;
    steps: string[];
  };
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
    practice: "Durante 7 dias, observe onde você se adapta para não desagradar. Antes de dizer sim, pergunte: isso é uma escolha ou uma tentativa de pertencer?",
    description: "A necessidade visceral de ser aceito e fazer parte, muitas vezes manifestada pela anulação de si e pela adaptação de suas próprias vontades para não perder o vínculo com o clã.",
    unconsciousPhrase: "Eu preciso ser parecida com o meu sistema para continuar pertencendo.",
    repositioningMovement: "Eu posso pertencer sem me abandonar. Tomo a força do meu clã e sigo em direção à minha própria vida.",
    reflexiveQuestion: "A quem na minha família estou tentando imitar ou proteger quando decido me anular?",
    dayPractice: {
      name: "Prática dos 7 Dias: Diferenciação Consciente",
      steps: [
        "Observe no cotidiano onde você se adapta e diz 'sim' querendo dizer 'não'.",
        "Conecte-se com seu corpo e sinta a diferença entre escolha livre e submissão.",
        "Exercite um pequeno 'não' consciente para treinar as fronteiras saudáveis do seu espaço.",
        "Visualize seu clã acolhendo seu desenvolvimento e repita: 'Eu pertenço por amor, não pela repetição.'",
        "Liste por escrito seus próprios pontos de vista específicos que se diferenciam dos habituais do clã.",
        "Tome uma pequena escolha individual sobre sua rotina, visual ou hobby que seja inteiramente sua.",
        "Feche os olhos, respire fundo e afirme: 'Eu sou digna de pertencer sendo eu mesma.'"
      ]
    }
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
    practice: "Durante 7 dias, choose uma ação diária que cuide de você antes de tentar sustentar todos ao seu redor.",
    description: "A tendência inconsciente de carregar o peso do mundo e tentar suprir a dor de todos ao redor, medindo o próprio valor pelo esforço e exaustão acumulados.",
    unconsciousPhrase: "Se eu não sofrer e carregar o peso por vocês, eu não mereço ser amada.",
    repositioningMovement: "O meu amor e a minha presença não precisam custar a minha saúde ou a minha própria vida.",
    reflexiveQuestion: "A quem estou tentando salvar na minha história quando escolho me sobrecarregar dessa forma?",
    dayPractice: {
      name: "Prática dos 7 Dias: Autoacolhimento e Carga Leve",
      steps: [
        "Identifique e escreva as tarefas adicionais de outras pessoas que você assumiu para si ultimamente.",
        "Devolva ou delegue de forma consciente pelo menos uma dessas obrigações aos respectivos responsáveis.",
        "Pratique 15 minutos diários de ócio sem culpa ou celular, desacelerando o impulso de arrumar ou resolver algo.",
        "Antes de responder a qualquer pedido, faça uma pausa de 10 segundos e verifique se tem energia real para doar.",
        "Entregue mentalmente o destino de quem você ama aos cuidados da própria jornada deles.",
        "Presenteie-se com uma ação de extremo relaxamento e bem-estar (banho, leitura ou massagem).",
        "Diga a si mesma diante do espelho: 'Eu divido as cargas e sigo em paz. É seguro descansar.'"
      ]
    }
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
    practice: "Durante 7 dias, perceba onde você reduz sua alegria ou seu crescimento. Repita: eu posso receber sem culpa.",
    description: "O bloqueio oculto que sabota o progresso, o brilho pessoal ou a riqueza financeira para não suscitar a sensação de traição ou superioridade em relação aos que vieram antes.",
    unconsciousPhrase: "Eu não me dou permissão de ser plenamente feliz, livre e próspero enquanto os meus sofrem.",
    repositioningMovement: "Eu decido honrar o caminho difícil de vocês fazendo algo positivo, próspero e alegre com a minha existência.",
    reflexiveQuestion: "Quem na minha história familiar eu temo magoar ou trair se eu atingir todo o meu sucesso?",
    dayPractice: {
      name: "Prática do Sete Dias: Autorização Sistêmica de Prosperidade",
      steps: [
        "Acolha a culpa inicial que surge ao vivenciar grandes alegrias, sem recuar ou se punir por ela.",
        "Escreva três conquistas recentes que você adora e permita-se simplesmente saboreá-las com gratidão.",
        "Desenhe simbolicamente um círculo de bênçãos incluindo seus antepassados desejando a sua felicidade.",
        "Diga internamente aos seus pais: 'Por favor, me olhem com simpatia se eu prosperar mais.'",
        "Use ou desfrute plenamente de algo especial que você costuma poupar para o futuro.",
        "Faça um pequeno agrado financeiro ou estético para si com o objetivo puro de celebrar o merecimento.",
        "Afirme com profunda convicção: 'A minha felicidade celebra a história daqueles que me deram a vida.'"
      ]
    }
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
    practice: "Durante 7 dias, observe onde você tenta resolver dores que não começaram em você. Repita: eu devolvo com amor o que não me pertence.",
    description: "A necessidade de assumir posturas reparadoras de injustiças, perdas e dores do passado do clã familiar, ocupando um lugar de salvação do qual não é originariamente responsável.",
    unconsciousPhrase: "Eu me sacrifico ou assumo fardos injustos para pagar a conta sistêmica de pendências do passado.",
    repositioningMovement: "Eu acolho e respeito profundamente as histórias do passado, porém me desvinculo desse encargo de reparação.",
    reflexiveQuestion: "Que ferida ou injustiça ancestral eu me sinto secretamente intimada(o) a consertar hoje?",
    dayPractice: {
      name: "Prática dos 7 Dias: Devolução Sistêmica de Carga",
      steps: [
        "Examine em quais relacionamentos íntimos ou familiares você desempenha papel excessivo de terapeuta/salvador.",
        "Dê um passo atrás em discussões ou crises que não envolvem diretamente o seu bem-estar imediato.",
        "Imagine-se de braços estendidos entregando um fardo de pedras preciosas aos donos passados por direito.",
        "Escreva em um papel: 'O que pertence à minha ascendência fica com ela, com profundo amor e respeito.'",
        "Redirecione as energias poupadas para uma meta profissional ou pessoal que há muito tempo está paralisada.",
        "Respirando pausadamente, repita mentalmente: 'Seu destino é de vocês; o meu espaço é no agora.'",
        "Agradeça a força recebida deles e afirme sua liberdade de escrever um roteiro original para si."
      ]
    }
  },
  escassez: {
    label: "Escassez",
    fear: "Se eu relaxar, algo pode faltar ou desmoronar.",
    gain: "Sensação de controle, preparo e autoproteção.",
    cost: "Ansiedade, tolerância e dificuldade de confiar.",
    mechanism: "Hipervigilância de sobrevivência.",
    archetype: "Sobrevivente Estratégico",
    phrase: "Eu preciso estar sempre pronta para perder.",
    liberation: "Eu posso construir segurança sem viver em guerra.",
    practice: "Durante 7 dias, observe simples pensamentos de falta. Antes de agir por medo, pergunte: existe uma escolha mais segura e menos desesperada?",
    description: "O alerta crônico inconsciente que associa o sucesso e o afeto a recursos terrivelmente escassos que podem desaparecer de forma curta, impedindo o usufruto da estabilidade.",
    unconsciousPhrase: "A abundância é instável e passageira; se eu me descuidar ou relaxar, a ruína chegará.",
    repositioningMovement: "Eu posso suavizar meu estado de vigilância, confiar na fertilidade da vida e receber o fluxo da fartura.",
    reflexiveQuestion: "Qual dor de escassez, perda material ou fome no passado da minha família gerou essa hipervigilância?",
    dayPractice: {
      name: "Prática dos 7 Dias: Reancoramento do Fluxo Abundante",
      steps: [
        "Sempre que o medo de falta assolar seus pensamentos, pare e toque no peito confirmando sua respiração.",
        "Faça anotações de 5 recursos intangíveis e gratuitos abundantes na sua vida hoje (tempo, ar, ideias, abraços, saber).",
        "Faça uma doação, caridade ou de desapego generoso de algo que você guardava em excesso sob pânico crônico.",
        "Substitua na sua fala as palavras ligadas à 'luta' e 'sacrifício extremo' por termos que tragam clareza e rumo.",
        "Agradeça ao pagar suas contas diárias pelo serviço/produto que obteve dali, abençoando o dinheiro.",
        "Receba de braços abertos elogios ou presentes com apenas um sincero 'obrigada', sem justificativas.",
        "Instale a confiança sistêmica afirmando: 'Eu tenho tudo o que necessito para dar meu próximo passo.'"
      ]
    }
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
    practice: "Durante 7 dias, escolha uma pequena forma de aparecer com segurança: falar, postar, pedir, se posicionar ou mostrar algo que normalmente esconderia.",
    description: "A defesa interna de se manter à margem, ofuscando as suas habilidades naturais ou calando as suas ideias como forma de evitar perigos sociais e críticas estressantes.",
    unconsciousPhrase: "Brilhar atrai perigos, inveja e solidão; se eu continuar oculta(o), estarei sempre protegida(o).",
    repositioningMovement: "Eu mereço erguer a minha voz, habitar o meu lugar de destaque e brilhar sem que isso signifique perigo.",
    reflexiveQuestion: "Quem no meu sistema familiar sofreu séria dor, rejeição ou exclusão por chamar muita atenção de outrem?",
    dayPractice: {
      name: "Prática dos 7 Dias: Ocupação do Espaço e Fluidez de Voz",
      steps: [
        "Preste atenção aos momentos em conversas de grupo onde você opta por omitir sua opinião por reserva mental.",
        "Escreva em uma folha de papel suas três principais habilidades ou qualidades singulares e releia em voz alta.",
        "Escolha expor uma crítica justa ou sua perspectiva própria e clara em um ambiente seguro.",
        "Vista uma peça de roupa, acessório ou cor vibrante que normalmente evitaria para experimentar a visibilidade.",
        "Visualize-se erguida na sua verdade íntima e acolhida de forma harmoniosa pelas pessoas ao redor.",
        "Compartilhe uma ideia, texto ou registro autoral com as pessoas, validando seu domínio criativo.",
        "Afirme com profunda aceitação corporal: 'É seguro para mim ser vista, amada e escutada no mundo.'"
      ]
    }
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
    practice: "Durante 7 dias, tome uma pequena decisão por dia sem buscar validação externa. Depois diga: eu sustento minha escolha com presença.",
    description: "A resistência de crescer emocionalmente e se colocar na cadeira de motorista do próprio destino, delegando a aprovação das suas decisões importantes a instâncias de validação externas.",
    unconsciousPhrase: "Eu me mantenho infante e hesitante para não perder a aprovação rítmica e a guarda do meu clã.",
    repositioningMovement: "Eu me auto-autorizo a agir, assumo a rédea do meu destino e sou soberana sobre as minhas direções.",
    reflexiveQuestion: "Qual autorização fantasiada ou bênção mágica eu sinto que deverei obter antes de poder crescer?",
    dayPractice: {
      name: "Prática dos 7 Dias: Soberania e Tomada de Decisão",
      steps: [
        "Selecione uma decisão ou ação relevante que você suspendeu aguardando a opinião de terceiros.",
        "Analise este dilema sozinha e decida o melhor caminho baseando-se no seu conhecimento interno.",
        "Treine responder a consultas sobre suas decisões pessoais dizendo apenas: 'A escolha já está bem definida.'",
        "Mantenha uma postura física firme por um minuto: ombros alinhados, olhar no horizonte e pés descalços.",
        "Assuma o custo pragmático de uma pequena escolha corajosa que favoreça a sua evolução individual.",
        "Substitua a indecisão crônica por ritos de ação imediata que construam momentos práticos de autoconfiança.",
        "Integre a sua maturidade sistêmica e declare internamente: 'Eu sou adulta(o). O leme de minha história agora é meu.'"
      ]
    }
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
    // ── Perfis originais ──
    "pertencimento+sacrificio": {
      name: "Guardião Sobrecarregado",
      description: "Você pode ter aprendido a proteger vínculos assumindo responsabilidades excessivas. Cuidar dos outros tornou-se a forma mais segura de garantir que você continua pertencendo."
    },
    "escassez+invisibilidade": {
      name: "Sobrevivente Vigilante",
      description: "Você pode ter desenvolvido estratégias de proteção baseadas em alerta constante e discrição. Permanecer invisível pareceu, em algum momento, mais seguro do que aparecer e arriscar."
    },
    "compensacao+culpa": {
      name: "Reparador Sistêmico",
      description: "Você pode estar tentando equilibrar histórias, dores ou responsabilidades que não começaram em você. Carregar o peso do clã virou uma forma de se sentir útil e pertencente."
    },
    "invisibilidade+pertencimento": {
      name: "Invisível Estratégico",
      description: "Você pode ter aprendido que a discrição ajuda a manter segurança, aceitação e vínculo. Não aparecer demais tornou-se uma estratégia inconsciente de sobrevivência relacional."
    },
    "culpa+poderPessoal": {
      name: "Soberano Adiado",
      description: "Você reconhece seu potencial, mas pode sentir culpa ou medo ao ocupar plenamente o seu lugar. A autorização para crescer ainda parece depender de algo ou alguém fora de você."
    },
    "escassez+poderPessoal": {
      name: "Construtor Resiliente",
      description: "Você possui força de realização, mas pode agir a partir da sobrevivência mais do que da confiança. Seu power pessoal existe — mas ainda espera por uma segurança que talvez nunca chegue do lado de fora."
    },

    // ── Perfis expandidos — 15 combinações adicionais ──
    "culpa+pertencimento": {
      name: "Devedor do Clã",
      description: "Você pode carregar a crença de que crescer, prosperar ou se diferenciar representa uma traição àqueles que ama. Pertencer parece exigir que você não ultrapasse certos limites invisíveis do seu sistema familiar."
    },
    "compensacao+pertencimento": {
      name: "Guardião Sistêmico",
      description: "Você pode sentir que sua função no sistema é manter o equilíbrio e reparar o que ficou incompleto. Pertencer e compensar estão tão entrelaçados que separar o que é seu do que é herdado pode parecer impossível."
    },
    "escassez+pertencimento": {
      name: "Sobrevivente Vinculado",
      description: "Você pode ter aprendido que recursos — tempo, dinheiro, amor — são escassos e que manter vínculos é a única forma segura de garantir que você não ficará sozinha. O medo de faltar e o medo de ser excluída caminham juntos."
    },
    "pertencimento+poderPessoal": {
      name: "Líder Silenciosa",
      description: "Você possui clareza e força interior, mas pode conter seu poder para não ameaçar os vínculos que importam. Liderar ou se destacar ainda parece carregar o risco de perder o lugar onde você pertence."
    },
    "culpa+sacrificio": {
      name: "Mártir Consciente",
      description: "Você pode se sobrecarregar pelos outros e ao mesmo tempo sentir culpa por querer mais para si. Descansar, receber ou prosperar parece sempre exigir que você pague algum preço antes — como se o merecimento precisasse ser justificado pelo esforço."
    },
    "compensacao+sacrificio": {
      name: "Reparador Sobrecarregado",
      description: "Você pode estar carregando tanto as histórias do passado quanto as necessidades do presente. A sensação de que precisa resolver o que ficou quebrado antes de mim, enquanto ainda sustenta tudo ao redor, cria um peso quase impossível de nomear."
    },
    "invisibilidade+sacrificio": {
      name: "Cuidadora Silenciosa",
      description: "Você pode dedicar-se profundamente aos outros enquanto permanece discreta sobre suas próprias necessidades. Aparecer parece perigoso, mas desaparecer enquanto cuida tornou-se uma forma de existir sem ocupar espaço demais."
    },
    "poderPessoal+sacrificio": {
      name: "Força Contida",
      description: "Você pode possuir grande capacidade de realização, mas subordiná-la às necessidades alheias parece mais seguro do que assumir plenamente o leme da própria vida. Sua força existe — mas ainda aguarda permissão para se manifestar sem custo relacional."
    },
    "culpa+escassez": {
      name: "Merecedora Bloqueada",
      description: "Você pode sentir que a abundância é instável e que receber mais do que os outros é uma forma de trair ou abandonar quem ficou para trás. Prosperar com leveza ainda parece um privilégio que você não se autorizou plenamente."
    },
    "culpa+invisibilidade": {
      name: "Brilho Suspenso",
      description: "Você pode diminuir suas conquistas e conter seu brilho para não provocar inveja, comparação ou rejeição. Aparecer com tudo que você é ainda carrega o peso de uma culpa antiga — como se ocupar espaço de destaque fosse, de alguma forma, errado."
    },
    "compensacao+escassez": {
      name: "Guardião da Falta",
      description: "Você pode carregar tanto histórias de escassez herdadas quanto a missão de reparar faltas do passado. A hipervigilância sobre o que pode faltar e a sensação de responsabilidade pelas carências do clã criam um estado de alerta permanente difícil de soltar."
    },
    "compensacao+invisibilidade": {
      name: "Reparador Discreto",
      description: "Você pode trabalhar silenciosamente para equilibrar dores e injustiças do seu sistema, sem jamais reivindicar reconhecimento por isso. Permanecer invisível enquanto repara parece mais seguro do que ser vista — e talvez cobrada — pelo esforço."
    },
    "compensacao+poderPessoal": {
      name: "Herdeiro Travado",
      description: "Você pode sentir que possui um propósito importante, mas que assumir plenamente sua força significaria deixar para trás algo ou alguém que ainda precisa de você. Crescer parece trair uma missão sistêmica que você nunca escolheu conscientemente, mas carrega com lealdade."
    },
    "invisibilidade+poderPessoal": {
      name: "Soberana Oculta",
      description: "Você pode possuir grande poder interior, mas mantê-lo discreto parece mais seguro do que trazê-lo à luz. Aparecer com autoridade ainda carrega o risco imaginado de ser julgada, atacada ou de perder o vínculo com quem prefere você menor."
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
