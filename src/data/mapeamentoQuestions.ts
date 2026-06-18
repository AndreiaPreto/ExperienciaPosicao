// ═══════════════════════════════════════════════════════════════
//  src/data/mapeamentoQuestions.ts - 15 PERGUNTAS IMERSIVAS
//  Baseado nos 7 grupos do Dr. Edward Bach, cobertura completa
//  dos 38 florais + Rescue Remedy, com Vervain e Vine integrados
//  de forma sutil e natural.
//
//  REGRA ESTRUTURAL:
//  • Cada opção carrega NO MÁXIMO 2 florais
//  • O algoritmo selectFloraisByWeight limita o resultado a 7
//  • Perguntas ordenadas por jornada emocional: do externo ao interno
// ═══════════════════════════════════════════════════════════════

export const mapeamentoQuestions = [

  // 1 - PONTO DE PARTIDA: O QUE ESTÁ PESANDO
  {
    id: 1,
    grupo: "abertura",
    pergunta: "Se você fosse descrever o que está carregando agora, não em palavras racionais, mas como uma sensação no corpo, qual imagem chegaria mais perto?",
    opcoes: [
      {
        texto: "Um peso nos ombros que não para de crescer, responsabilidades demais, tempo de menos",
        emocao: "sobrecarga",
        peso: 3,
        florais: ["Elm", "Oak"]
      },
      {
        texto: "Uma névoa interna, como se eu estivesse aqui, mas não inteiramente presente",
        emocao: "dissociacao",
        peso: 3,
        florais: ["Clematis", "Mustard"]
      },
      {
        texto: "Um nó no peito, algo que não consigo nomear, mas que me aperta por dentro",
        emocao: "angustia_difusa",
        peso: 3,
        florais: ["Agrimony", "Sweet Chestnut"]
      },
      {
        texto: "Uma faísca apagada, já tive mais energia, mais vontade, mais fé no que estou fazendo",
        emocao: "esgotamento_vital",
        peso: 3,
        florais: ["Wild Rose", "Olive"]
      },
      {
        texto: "Um tensionamento constante, como se eu estivesse sempre em alerta, esperando o próximo problema",
        emocao: "hipervigilancia",
        peso: 3,
        florais: ["Aspen", "White Chestnut"]
      }
    ]
  },

  // 2 - MEDO: QUAL É A COR DO SEU MEDO
  {
    id: 2,
    grupo: "medo",
    pergunta: "Todo mundo carrega algum tipo de medo. Qual destes ressoa mais com o que você sente quando para e presta atenção em si?",
    opcoes: [
      {
        texto: "Um medo vago, sem rosto, sei que está lá, mas não consigo definir de quê",
        emocao: "medo_indefinido",
        peso: 3,
        florais: ["Aspen", "Rock Rose"]
      },
      {
        texto: "Medos concretos e específicos, de errar, de ser julgada, de não dar conta",
        emocao: "medo_definido",
        peso: 3,
        florais: ["Mimulus", "Larch"]
      },
      {
        texto: "Medo de perder o controle, das minhas reações, das situações, de mim mesma",
        emocao: "medo_controle",
        peso: 3,
        florais: ["Cherry Plum", "Rock Rose"]
      },
      {
        texto: "Medo de que algo aconteça com quem eu amo, fico em estado de alerta constante por eles",
        emocao: "medo_outros",
        peso: 2,
        florais: ["Red Chestnut", "Chicory"]
      },
      {
        texto: "Não sinto exatamente medo, é mais uma exaustão de tanto ter tentado e não chegado onde queria",
        emocao: "fadiga_tentativas",
        peso: 2,
        florais: ["Gorse", "Sweet Chestnut"]
      }
    ]
  },

  // 3 - MENTE: O QUE ACONTECE LÁ DENTRO
  {
    id: 3,
    grupo: "mente",
    pergunta: "Quando você está quieta, antes de dormir, num momento de pausa, o que sua mente faz?",
    opcoes: [
      {
        texto: "Repete situações, conversas e preocupações em loop. Não consigo desligar",
        emocao: "ruminacao",
        peso: 3,
        florais: ["White Chestnut", "Agrimony"]
      },
      {
        texto: "Vai para longe, sonhos, fantasias, planos que nunca saem do lugar",
        emocao: "fuga_mental",
        peso: 2,
        florais: ["Clematis", "Wild Oat"]
      },
      {
        texto: "Viaja para o passado, memórias que doem ou que me fazem falta",
        emocao: "apego_passado",
        peso: 3,
        florais: ["Honeysuckle", "Star of Bethlehem"]
      },
      {
        texto: "Antecipa o pior, fica criando cenários negativos sobre o que ainda não aconteceu",
        emocao: "antecipacao_negativa",
        peso: 3,
        florais: ["Aspen", "Mimulus"]
      },
      {
        texto: "Fica vazia, uma apatia que me preocupa porque eu sei que não sou assim",
        emocao: "vazio",
        peso: 2,
        florais: ["Mustard", "Wild Rose"]
      }
    ]
  },

  // 4 - CORPO: ONDE A EMOÇÃO MORA
  {
    id: 4,
    grupo: "corpo",
    pergunta: "Seu corpo costuma guardar o que a mente tenta esconder. O que ele tem mostrado ultimamente?",
    opcoes: [
      {
        texto: "Tensão física constante, mandíbula travada, pescoço duro, ombros contraídos",
        emocao: "tensao_cronica",
        peso: 2,
        florais: ["Impatiens", "Rock Water"]
      },
      {
        texto: "Insônia ou sono de baixa qualidade, acordo cansada como se não tivesse dormido",
        emocao: "insonia",
        peso: 3,
        florais: ["White Chestnut", "Agrimony"]
      },
      {
        texto: "Um cansaço que não passa com descanso, como se estivesse drenada por dentro",
        emocao: "exaustao_profunda",
        peso: 3,
        florais: ["Olive", "Hornbeam"]
      },
      {
        texto: "Sinais físicos de ansiedade, coração acelerado, falta de ar, estômago em nó",
        emocao: "ansiedade_somatica",
        peso: 2,
        florais: ["Mimulus", "Cherry Plum"]
      },
      {
        texto: "Uma sensação de repulsa ou vergonha com relação ao meu próprio corpo ou aparência",
        emocao: "autocritica_corporal",
        peso: 2,
        florais: ["Crab Apple", "Pine"]
      }
    ]
  },

  // 5 - DECISÕES: COMO VOCÊ NAVEGA O INCERTO
  {
    id: 5,
    grupo: "incerteza",
    pergunta: "Quando você precisa tomar uma decisão importante, como esse processo acontece em você?",
    opcoes: [
      {
        texto: "Fico oscilando entre opções sem conseguir me decidir, volto ao começo repetidamente",
        emocao: "indecisao",
        peso: 3,
        florais: ["Scleranthus", "Wild Oat"]
      },
      {
        texto: "Preciso perguntar para todo mundo, sozinha não confio no que sinto ser certo para mim",
        emocao: "dependencia_validacao",
        peso: 3,
        florais: ["Cerato", "Centaury"]
      },
      {
        texto: "Decido, mas depois fico questionando se foi a escolha certa",
        emocao: "duvida_pos_decisao",
        peso: 2,
        florais: ["Cerato", "Pine"]
      },
      {
        texto: "Procrastino, sei o que preciso fazer, mas algo me paralisa antes de começar",
        emocao: "paralisia",
        peso: 3,
        florais: ["Hornbeam", "Larch"]
      },
      {
        texto: "Decido com clareza, mas sofro quando a decisão afeta pessoas que dependem de mim",
        emocao: "responsabilidade_afetiva",
        peso: 2,
        florais: ["Elm", "Red Chestnut"]
      }
    ]
  },

  // 6 - ENERGIA: DE ONDE VEM E PARA ONDE VAI
  {
    id: 6,
    grupo: "energia",
    pergunta: "Quando você pensa na sua energia ao longo dos dias, qual imagem se encaixa melhor?",
    opcoes: [
      {
        texto: "Uma vela quase apagada, faço o que precisa, mas com esforço que antes não era necessário",
        emocao: "esgotamento_gradual",
        peso: 3,
        florais: ["Olive", "Oak"]
      },
      {
        texto: "Uma bateria que não carrega mais, descanso, mas acordo sem energia de verdade",
        emocao: "fadiga_cronica",
        peso: 3,
        florais: ["Hornbeam", "Wild Rose"]
      },
      {
        texto: "Uma chama intensa que não tem interruptor, me exijo demais e não sei parar",
        emocao: "hiperatividade",
        peso: 3,
        florais: ["Vervain", "Oak"]
      },
      {
        texto: "Uma corrente que muda de direção o tempo todo, começo projetos e não consigo terminar",
        emocao: "inconstancia",
        peso: 2,
        florais: ["Scleranthus", "Clematis"]
      },
      {
        texto: "Uma fonte represada, sei que tenho capacidade, mas algo bloqueia a minha expressão",
        emocao: "bloqueio_expressao",
        peso: 2,
        florais: ["Larch", "Wild Oat"]
      }
    ]
  },

  // 7 - RELAÇÕES: O QUE VOCÊ SENTE COM OS OUTROS
  {
    id: 7,
    grupo: "relacoes",
    pergunta: "Nas relações mais próximas: família, amizades, parceiro, o que você percebe com mais frequência em si mesma?",
    opcoes: [
      {
        texto: "Dificuldade de pedir ajuda, prefiro resolver tudo sozinha a parecer fraca ou dependente",
        emocao: "autossuficiencia_rigida",
        peso: 3,
        florais: ["Water Violet", "Oak"]
      },
      {
        texto: "Irritação, fico impaciente com o ritmo, as escolhas ou a falta de ação das pessoas",
        emocao: "impaciencia",
        peso: 2,
        florais: ["Impatiens", "Beech"]
      },
      {
        texto: "Necessidade de controlar, sinto um desconforto quando as coisas não saem do jeito que planejei",
        emocao: "controle_relacional",
        peso: 3,
        florais: ["Vine", "Chicory"]
      },
      {
        texto: "Necessidade de ser vista e ouvida, fico mal quando sinto que ninguém percebe o que estou vivendo",
        emocao: "necessidade_validacao",
        peso: 2,
        florais: ["Heather", "Chicory"]
      },
      {
        texto: "Me cobro quando decepciono alguém, priorizo o bem-estar dos outros antes do meu",
        emocao: "auto_anulacao",
        peso: 3,
        florais: ["Centaury", "Pine"]
      }
    ]
  },

  // 8 - EMOÇÕES DIFÍCEIS: O QUE VOCÊ FAZ COM ELAS
  {
    id: 8,
    grupo: "sombra",
    pergunta: "Quando uma emoção difícil aparece, como raiva, tristeza ou frustração, qual é a sua resposta mais honesta?",
    opcoes: [
      {
        texto: "Guardo tudo por dentro, sorrio, funciono, mas carrego um peso que ninguém vê",
        emocao: "mascara",
        peso: 3,
        florais: ["Agrimony", "Water Violet"]
      },
      {
        texto: "Explodo ou reajo de um jeito que depois me arrependo",
        emocao: "impulsividade",
        peso: 3,
        florais: ["Holly", "Cherry Plum"]
      },
      {
        texto: "Sinto raiva ou ressentimento de uma situação ou pessoa, e esse sentimento não passa",
        emocao: "raiva_ressentimento",
        peso: 3,
        florais: ["Holly", "Willow"]
      },
      {
        texto: "Fico na defensiva ou intolerante, me irrito com as falhas e limitações das pessoas",
        emocao: "intolerancia",
        peso: 2,
        florais: ["Beech", "Impatiens"]
      },
      {
        texto: "Me distancio, quando dói, eu recuo e crio uma distância segura de tudo e de todos",
        emocao: "reclusao",
        peso: 2,
        florais: ["Water Violet", "Agrimony"]
      }
    ]
  },

  // 9 - AUTOESTIMA: COMO VOCÊ SE TRATA
  {
    id: 9,
    grupo: "autoestima",
    pergunta: "Quando você se olha, com honestidade, sem filtros, o que aparece mais?",
    opcoes: [
      {
        texto: "Sensação de não ser suficiente, me comparo, me diminuo, me questiono constantemente",
        emocao: "baixa_autoestima",
        peso: 3,
        florais: ["Larch", "Pine"]
      },
      {
        texto: "Culpa, de coisas que fiz, deixei de fazer, ou que não fui o suficiente para alguém",
        emocao: "culpa_cronica",
        peso: 3,
        florais: ["Pine", "Star of Bethlehem"]
      },
      {
        texto: "Uma autocobrança severa, tenho padrões muito altos e raramente me dou permissão de descansar",
        emocao: "perfeccionismo_rigido",
        peso: 3,
        florais: ["Rock Water", "Vervain"]
      },
      {
        texto: "Julgamento sobre o meu corpo, minha aparência ou a forma como me apresento ao mundo",
        emocao: "autocritica_fisica",
        peso: 2,
        florais: ["Crab Apple", "Larch"]
      },
      {
        texto: "Uma amargura silenciosa, sinto que me esforcei muito e recebi pouco em troca",
        emocao: "amargura",
        peso: 3,
        florais: ["Willow", "Gorse"]
      }
    ]
  },

  // 10 - PADRÕES: O QUE SE REPETE
  {
    id: 10,
    grupo: "padrao",
    pergunta: "Se você olhar para os últimos meses com um pouco de distância, qual padrão aparece com mais frequência?",
    opcoes: [
      {
        texto: "Repito os mesmos erros, percebo, me prometo que vai mudar, e caio de novo",
        emocao: "repeticao",
        peso: 3,
        florais: ["Chestnut Bud", "Walnut"]
      },
      {
        texto: "Me saboto perto das conquistas, quando estou próxima de algo bom, algo trava",
        emocao: "autossabotagem",
        peso: 3,
        florais: ["Larch", "Cherry Plum"]
      },
      {
        texto: "Carrego o que é dos outros, assumo problemas, dores e responsabilidades que não são minhas",
        emocao: "hipercuidado",
        peso: 3,
        florais: ["Centaury", "Red Chestnut"]
      },
      {
        texto: "Inicio com energia, mas não consigo sustentar, começo projetos e não termino",
        emocao: "inconclusao",
        peso: 2,
        florais: ["Clematis", "Hornbeam"]
      },
      {
        texto: "Permaneço em situações que sei que precisam mudar, tenho dificuldade de me soltar",
        emocao: "estagnacao",
        peso: 3,
        florais: ["Walnut", "Wild Rose"]
      }
    ]
  },

  // 11 - LIMITES: ONDE VOCÊ CEDE
  {
    id: 11,
    grupo: "limites",
    pergunta: "Quando pensa nos seus limites, com o trabalho, as pessoas ou as situações, o que você percebe?",
    opcoes: [
      {
        texto: "Dificuldade de dizer não, acabo cedendo mesmo quando claramente não quero",
        emocao: "falta_limites",
        peso: 3,
        florais: ["Centaury", "Agrimony"]
      },
      {
        texto: "Absorvo o humor e a energia de quem está ao redor, fico contaminada pelo estado dos outros",
        emocao: "absorcao_energetica",
        peso: 3,
        florais: ["Walnut", "Centaury"]
      },
      {
        texto: "Imponho minha visão com intensidade, acho difícil aceitar quando as coisas não vão como penso ser certo",
        emocao: "imposicao",
        peso: 3,
        florais: ["Vervain", "Vine"]
      },
      {
        texto: "Me perco em transições, mudanças de fase me deixam instável e sem saber quem sou",
        emocao: "instabilidade_transicao",
        peso: 2,
        florais: ["Walnut", "Scleranthus"]
      },
      {
        texto: "Meus limites são rígidos demais, me isolo antes de me expor ao risco de me machucar",
        emocao: "hiperprotecao",
        peso: 2,
        florais: ["Water Violet", "Mimulus"]
      }
    ]
  },

  // 12 - PROPÓSITO: O QUE VOCÊ BUSCA
  {
    id: 12,
    grupo: "proposito",
    pergunta: "Quando você pensa em direção, no que quer construir e para onde está caminhando, o que surge?",
    opcoes: [
      {
        texto: "Uma confusão genuína, sei que quero algo diferente, mas não sei o que é ou por onde começar",
        emocao: "falta_direcao",
        peso: 3,
        florais: ["Wild Oat", "Cerato"]
      },
      {
        texto: "Sei o que quero, mas não acredito que sou capaz de chegar lá",
        emocao: "descrenca_propria",
        peso: 3,
        florais: ["Larch", "Gentian"]
      },
      {
        texto: "Já não tenho muita esperança, tentei, não deu, e algo em mim desistiu de vez",
        emocao: "desesperanca",
        peso: 3,
        florais: ["Gorse", "Sweet Chestnut"]
      },
      {
        texto: "Sei o que quero, mas fico esperando a hora certa, a condição perfeita para agir",
        emocao: "perfeccionismo_acao",
        peso: 2,
        florais: ["Rock Water", "Hornbeam"]
      },
      {
        texto: "Tenho uma visão clara e uma energia intensa para chegar lá, o desafio é não me perder no caminho",
        emocao: "intensidade_proposito",
        peso: 2,
        florais: ["Vervain", "Oak"]
      }
    ]
  },

  // 13 - PERDAS E FERIDAS: O QUE AINDA DÓI
  {
    id: 13,
    grupo: "feridas",
    pergunta: "Existe algo que ainda não foi resolvido em você, uma mágoa, uma perda, um choque que ficou?",
    opcoes: [
      {
        texto: "Sim, algo aconteceu que me marcou fundo e que ainda aparece, mesmo que eu tente não pensar",
        emocao: "trauma_ativo",
        peso: 3,
        florais: ["Star of Bethlehem", "Honeysuckle"]
      },
      {
        texto: "Um ressentimento que não passa, sinto que fui injustiçada e isso ainda pesa",
        emocao: "ressentimento",
        peso: 3,
        florais: ["Willow", "Holly"]
      },
      {
        texto: "Uma saudade que me prende, de uma fase, de uma pessoa, de uma versão de mim que ficou no passado",
        emocao: "saudade_paralisante",
        peso: 3,
        florais: ["Honeysuckle", "Clematis"]
      },
      {
        texto: "Uma culpa antiga, de algo que fiz ou deixei de fazer que ainda me cobra por dentro",
        emocao: "culpa_passado",
        peso: 3,
        florais: ["Pine", "Star of Bethlehem"]
      },
      {
        texto: "Não tenho feridas abertas, o que sinto é mais um cansaço do presente do que uma dor do passado",
        emocao: "cansaco_presente",
        peso: 1,
        florais: ["Olive", "Elm"]
      }
    ]
  },

  // 14 - CRENÇA CENTRAL: A VOZ INTERNA
  {
    id: 14,
    grupo: "crenca",
    pergunta: "Se a parte mais crítica de você ganhasse voz, aquela que aparece nas horas mais difíceis, o que ela diria?",
    opcoes: [
      {
        texto: "\"Você nunca é suficiente. Por mais que faça, sempre falta algo.\"",
        emocao: "insuficiencia",
        peso: 3,
        florais: ["Pine", "Larch"]
      },
      {
        texto: "\"Você não pode errar. A perfeição é o mínimo esperado de você.\"",
        emocao: "perfeccionismo_interno",
        peso: 3,
        florais: ["Rock Water", "Pine"]
      },
      {
        texto: "\"Você precisa dar conta de tudo. Se parar, tudo desmorona.\"",
        emocao: "hiperresponsabilidade",
        peso: 3,
        florais: ["Oak", "Elm"]
      },
      {
        texto: "\"Não confie em si mesma. Ouça os outros, eles sabem mais do que você.\"",
        emocao: "auto_desconfianca",
        peso: 3,
        florais: ["Cerato", "Mimulus"]
      },
      {
        texto: "\"Para que tentar? As coisas nunca mudam de verdade para você.\"",
        emocao: "resignacao",
        peso: 3,
        florais: ["Gorse", "Wild Rose"]
      }
    ]
  },

  // 15 - FECHO: O QUE VOCÊ MAIS PRECISA AGORA
  {
    id: 15,
    grupo: "urgencia",
    pergunta: "Se você pudesse receber uma coisa agora, não um conselho, mas um estado interno, o que seu coração pediria?",
    opcoes: [
      {
        texto: "Paz, que os pensamentos parem, que a mente descanse, que o silêncio interno volte",
        emocao: "paz",
        peso: 2,
        florais: ["White Chestnut", "Agrimony"]
      },
      {
        texto: "Leveza, parar de me cobrar tanto, me tratar com a gentileza que ofereço aos outros",
        emocao: "autocompaixao",
        peso: 2,
        florais: ["Pine", "Rock Water"]
      },
      {
        texto: "Coragem, sair do lugar onde estou e dar o passo que sei que preciso dar",
        emocao: "coragem",
        peso: 2,
        florais: ["Larch", "Mimulus"]
      },
      {
        texto: "Esperança, voltar a acreditar que as coisas podem mudar, que ainda vale tentar",
        emocao: "esperanca",
        peso: 2,
        florais: ["Gorse", "Gentian"]
      },
      {
        texto: "Clareza, saber exatamente quem sou e o que quero, sem depender da opinião de ninguém",
        emocao: "clareza_identidade",
        peso: 2,
        florais: ["Wild Oat", "Cerato"]
      }
    ]
  }

];

// ═══════════════════════════════════════════════════════════════
//  ALGORITMO DE SELEÇÃO - selectFloraisByWeight
//  Prioriza florais por: frequência de aparição × peso da resposta
//  Retorna no máximo maxFlorais (padrão 7), nunca mais que isso
// ═══════════════════════════════════════════════════════════════
export function selectFloraisByWeight(
  finalAnswers: any[],
  maxFlorais: number = 7
): string {
  const scores: Record<string, number> = {};

  for (const answer of finalAnswers) {
    const florais: string[] = answer.florais || [];
    const peso: number = answer.peso || 1;
    for (const floral of florais) {
      const name = floral.trim();
      if (!name) continue;
      scores[name] = (scores[name] || 0) + peso;
    }
  }

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxFlorais)
    .map(([name]) => name);

  return sorted.join(", ");
}
