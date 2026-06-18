// triageQuestions.ts - versão 2.0
// Quiz de triagem com 10 perguntas cobrindo dimensões distintas
// Cada pergunta investiga uma dimensão diferente para identificar o produto mais adequado
// Mapeamento de produtos:
//   A -> Diagnostico de Posição (diagnostico_info)
//   B -> Mapeamento de Lealdades (lealdades_intro)
//   C -> Mapa Floral (mapeamento_intro)
//   D -> Reset de Posição (reprogramacao_pessoal_info)
//   E -> Clube Posição (clube_posicao_info)

export const triageQuestions = [
  {
    // Dimensão 1: Onde está o peso principal agora
    q: "Onde você sente que o peso maior está concentrado agora?",
    a: [
      "Na minha cabeça, não consigo parar de pensar e analisar",
      "Nas minhas origens e relações, sinto que carrego algo que não é só meu",
      "No meu corpo e nas minhas emoções, me sinto fisicamente pesada ou bloqueada",
      "Em algo específico que aconteceu, tenho uma ferida emocional recente",
      "No dia a dia, me sinto perdida sem saber o que priorizar",
    ]
  },
  {
    // Dimensão 2: Medo: qual é a cor do seu medo
    q: "Todo mundo carrega algum tipo de medo. Qual destes ressoa mais com o que você sente quando para e presta atenção em si?",
    a: [
      "Um medo vago, sem rosto, sei que está lá, mas não consigo definir de quê",
      "Medos concretos e específicos, de errar, de ser julgada, de não dar conta",
      "Medo de perder o controle, das minhas reações, das situações, de mim mesma",
      "Medo de que algo aconteça com quem eu amo, fico em estado de alerta constante por eles",
      "Não sinto exatamente medo, é mais uma exaustão de tanto ter tentado e não chegado onde queria",
    ]
  },
  {
    // Dimensão 3: Tipo de solução desejada
    q: "O que você mais quer ao final de uma experiência de autoconhecimento?",
    a: [
      "Um relatório claro sobre quem eu sou e por onde devo começar",
      "Entender os vínculos e lealdades invisíveis que estão me travando",
      "Uma fórmula ou recurso prático que eu possa usar no meu dia a dia",
      "Me reorganizar internamente, soltar padrões e começar de novo",
      "Orientação contínua, quero ter suporte e espaço de clareza regularmente",
    ]
  },
  {
    // Dimensão 4: Tentativas anteriores
    q: "Você já tentou resolver o que está vivendo antes. O que aconteceu?",
    a: [
      "Nunca parei para investigar de forma profunda, essa seria a primeira vez",
      "Fiz terapia, constelação ou algo parecido, sinto que há camadas que ainda não resolvi",
      "Tentei mas sinto que preciso de algo mais corporal ou energético",
      "Resolvi parcialmente, mas voltou ou apareceu de forma diferente",
      "Já investi em processos, quero agora manter o que conquistei",
    ]
  },
  {
    // Dimensão 5: Área de vida mais afetada
    q: "Qual área da sua vida está pedindo mais atenção agora?",
    a: [
      "Minha identidade, não sei quem sou ou o que realmente quero",
      "Relacionamentos e família, há tensão, culpa ou padrões repetidos nas minhas relações",
      "Saúde, energia e bem-estar, me sinto física ou emocionalmente esgotada",
      "Autoestima e confiança, me saboto ou me sinto pouco merecedora",
      "Propósito e vida cotidiana, quero clareza sobre meu caminho de forma sustentada",
    ]
  },
  {
    // Dimensão 6: Comportamento predominante sob pressão
    q: "Quando algo te pressiona, qual é a sua resposta mais frequente?",
    a: [
      "Fico na cabeça, analiso, procrastino e não sei por onde começar",
      "Assumo responsabilidades que não são minhas ou me calo para não conflitar",
      "Meu corpo reage, fico tensa, com sono, cansaço ou sintomas físicos",
      "Fico impulsiva ou reativamente emocional, e depois me arrependo",
      "Me cobro muito, e me sinto sozinha no processo de resolver",
    ]
  },
  {
    // Dimensão 7: Relação com herança e família
    q: "Como você descreve a influência da sua família ou origem na sua vida hoje?",
    a: [
      "Pouco relevante agora, minha questão é mais sobre mim mesma e meu presente",
      "Muito relevante, sinto que repito padrões ou cargo algo da minha história",
      "Sinto no corpo, minha herança aparece como tension, bloqueio ou sintoma físico",
      "Causou uma ferida específica, que ainda me afeta mesmo que eu já saiba disso",
      "Já trabalhei isso, agora quero sustentar minha trajetória com apoio regular",
    ]
  },
  {
    // Dimensão 8: Urgência e tempo
    q: "Como você descreveria a urgência do que está vivendo?",
    a: [
      "Não é urgente, mas sinto que preciso de um ponto de partida claro",
      "É crônico, esse padrão está há anos e quero entender a raiz",
      "É imediato, preciso de algo que me ajude agora, de forma rápida e prática",
      "É uma crise recente, algo me desequilibrou e preciso me reorganizar",
      "É uma manutenção, quero suporte constante para não perder o rumo",
    ]
  },
  {
    // Dimensão 9: Relação com o próprio corpo e emoção
    q: "Como você se relaciona com suas emoções e sensações físicas atualmente?",
    a: [
      "Prefiro entender antes de sentir, processo mais pela mente",
      "Sinto muito, mas não sei de onde vem, parece maior do que eu",
      "Tenho sintomas físicos claros, tensão, ansiedade no corpo, falta de energia",
      "Estou em processo de cura, algo me feriu e estou me reorganizando",
      "Alterno bastante, preciso de um espaço seguro e contínuo para isso",
    ]
  },
  {
    // Dimensão 10: Intenção central
    q: "Qual dessas frases descreve melhor a sua intenção agora?",
    a: [
      "\"Quero entender quem eu sou e qual é o meu padrão central\"",
      "\"Quero descobrir o que herdei e o que é realmente meu\"",
      "\"Quero me sentir mais leve, equilibrada e com mais energia\"",
      "\"Quero me reorganizar depois de algo que me desestabilizou\"",
      "\"Quero ter um espaço de orientação e acompanhamento contínuo\"",
    ]
  },
];
