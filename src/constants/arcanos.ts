export interface ArcanoData {
  arcano: string;
  numero: number;
  simbolo: string;
  sombra: string[];
  dom: string;
  ferida: string;
  direcao: string;
  evolucao: string[];
  mensagem: string;         // texto exibido no resultado do diagnóstico
  florais: string[];        // florais de Bach sugeridos
  reprogramacao: string;    // foco sugerido para a Reprogramação Pessoal
}

export const ARCANOS_MATRIZ: ArcanoData[] = [
  {
    arcano: "Louco",
    numero: 0,
    simbolo: "🌀",
    sombra: ["dispersao", "fuga", "falta_de_direcao", "irresponsabilidade"],
    dom: "Leveza, abertura ao novo, coragem de começar",
    ferida: "Medo de se comprometer e perder a liberdade",
    direcao: "Criar raízes sem perder as asas — direção com leveza",
    evolucao: ["Mago", "Imperador"],
    mensagem: "Você está num momento de transição — cheio de potencial mas sem ancoramento. Sua alma pede movimento, mas seu sistema ainda não sabe para onde. O trabalho agora é criar direção sem perder a espontaneidade que é seu maior dom.",
    florais: ["Wild Oat", "Cerato", "Scleranthus"],
    reprogramacao: "Ancoramento e clareza de propósito sem perda de liberdade"
  },
  {
    arcano: "Mago",
    numero: 1,
    simbolo: "✦",
    sombra: ["controle", "manipulacao", "inseguranca", "uso_do_poder"],
    dom: "Criatividade, capacidade de manifestar, conexão entre mundos",
    ferida: "Usa o poder externo para compensar insegurança interna",
    direcao: "Alinhar ação com clareza interna — agir a partir do ser, não do medo",
    evolucao: ["Sacerdotisa", "Temperanca"],
    mensagem: "Você tem talento e ferramentas — mas algo impede você de usá-los com plena confiança. Sua energia está direcionada para fora enquanto a resposta está dentro. Quando você para de manipular o ambiente para se sentir segura, sua magia real emerge.",
    florais: ["Cerato", "Larch", "Rock Water"],
    reprogramacao: "Confiança na própria capacidade de manifestar sem precisar controlar"
  },
  {
    arcano: "Sacerdotisa",
    numero: 2,
    simbolo: "🌙",
    sombra: ["bloqueio", "passividade", "isolamento", "guarda_demais"],
    dom: "Intuição profunda, sabedoria interior, capacidade de perceber o não dito",
    ferida: "Guarda tanto que ninguém a conhece de verdade",
    direcao: "Expressar o que sente e confiar na própria voz interior",
    evolucao: ["Imperatriz", "Estrela"],
    mensagem: "Você sente muito mais do que demonstra. Sua intuição é precisa — mas o medo de não ser compreendida faz você guardar seus insights para si. O caminho agora é aprender a confiar na sua percepção e expressá-la sem pedir permissão.",
    florais: ["Water Violet", "Agrimony", "Mimulus"],
    reprogramacao: "Abertura para expressão da voz interior sem medo de julgamento"
  },
  {
    arcano: "Imperatriz",
    numero: 3,
    simbolo: "🌸",
    sombra: ["dependencia_emocional", "excesso_emocional", "apego", "ciume"],
    dom: "Amor, criatividade, abundância, conexão com a natureza e o próprio corpo",
    ferida: "Confunde cuidar com controlar; precisa de amor externo para se sentir inteira",
    direcao: "Cultivar o amor próprio como fonte — dar a partir da plenitude, não da carência",
    evolucao: ["Imperador", "Forca"],
    mensagem: "Você tem uma capacidade enorme de cuidar e nutrir os outros — mas esquece de incluir a si mesma nesse cuidado. Sua plenitude não depende de ser amada; ela vem de dentro. Quando você se torna sua própria fonte de amor, tudo ao redor floresce.",
    florais: ["Chicory", "Red Chestnut", "Heather"],
    reprogramacao: "Amor próprio como fonte primária — cuidar sem se perder"
  },
  {
    arcano: "Imperador",
    numero: 4,
    simbolo: "⚔️",
    sombra: ["rigidez", "controle_excessivo", "dominancia", "medo_de_perder_poder"],
    dom: "Estrutura, liderança, proteção, capacidade de criar ordem",
    ferida: "Usa o controle para disfarçar o medo de ser vulnerável",
    direcao: "Soltar o controle e descobrir que a verdadeira força está na confiança",
    evolucao: ["Sacerdotisa", "Temperanca"],
    mensagem: "Você construiu uma armadura eficiente — organização, controle, autoridade. Mas por dentro há uma exaustão de nunca poder descansar, nunca poder errar. Sua força real não está na rigidez: está na capacidade de confiar sem precisar controlar tudo.",
    florais: ["Vervain", "Rock Water", "Oak"],
    reprogramacao: "Flexibilidade interna — confiar no processo sem precisar controlar o resultado"
  },
  {
    arcano: "Hierofante",
    numero: 5,
    simbolo: "📜",
    sombra: ["crencas_limitantes", "dogma", "obediencia_excessiva", "culpa_religiosa"],
    dom: "Sabedoria, tradição, capacidade de transmitir conhecimento",
    ferida: "Vive segundo regras que nunca questionou — família, religião, sociedade",
    direcao: "Questionar as verdades herdadas e criar suas próprias crenças com consciência",
    evolucao: ["Enamorados", "Mago"],
    mensagem: "Você carrega crenças que não são suas — são da sua família, da sua religião, da sociedade. Essas crenças criaram uma gaiola que parece segurança. O trabalho agora é questionar: isso é o que eu acredito ou o que me ensinaram a acreditar?",
    florais: ["Rock Water", "Pine", "Centaury"],
    reprogramacao: "Desconstrução de crenças herdadas e construção de verdades próprias"
  },
  {
    arcano: "Enamorados",
    numero: 6,
    simbolo: "💛",
    sombra: ["indecisao", "dependencia_emocional", "fuga_de_escolha", "amor_condicional"],
    dom: "Conexão, amor, capacidade de integrar opostos",
    ferida: "Tem medo de fazer escolhas porque isso implica perder outras possibilidades",
    direcao: "Assumir escolha consciente — decidir é um ato de amor próprio",
    evolucao: ["Imperador", "Justica"],
    mensagem: "Você vive num estado de quase-escolha — está sempre entre dois caminhos, duas pessoas, duas versões de si mesma. Essa indecisão não é falta de inteligência: é medo de se comprometer com quem você é. Escolher é o maior ato de amor que você pode fazer por si mesma.",
    florais: ["Scleranthus", "Cerato", "Wild Oat"],
    reprogramacao: "Confiança na própria escolha — decidir como ato de amor próprio"
  },
  {
    arcano: "Carro",
    numero: 7,
    simbolo: "🚀",
    sombra: ["impulsividade", "forca_excessiva", "controle_via_acao", "nao_para"],
    dom: "Foco, vontade, capacidade de conquistar objectives",
    ferida: "Usa a ação como fuga do que não quer sentir",
    direcao: "Equilibrar movimento com consciência — onde estou indo e por quê?",
    evolucao: ["Temperanca", "Forca"],
    mensagem: "Você age — e isso é um dom. Mas sua energia está tão voltada para fora que você perdeu contato com o que está dentro. A velocidade que você usa para avançar é la mesma que usa para não sentir. Quando você para e olha para dentro, a direção fica clara.",
    florais: ["Vervain", "Impatiens", "Cherry Plum"],
    reprogramacao: "Ação com consciência — mover-se a partir da clareza, não da fuga"
  },
  {
    arcano: "Forca",
    numero: 8,
    simbolo: "🦁",
    sombra: ["repressao_emocional", "controle_interno_excessivo", "auto_punicao"],
    dom: "Paciência, domínio interior, coragem de sentir sem ser destruída",
    ferida: "Reprime emoções por acreditar que senti-las é perigoso ou fraco",
    direcao: "Sentir sem reprimir — a emoção não te destrói, ela te informa",
    evolucao: ["Temperanca", "Imperatriz"],
    mensagem: "Você tem uma força enorme — mas gasta boa parte dela contendo o que sente. A cena que seu arcano mostra é alguém domando uma fera — mas essa fera é você mesma, e ela não precisa ser domada, precisa ser compreendida. Sua força real é a de sentir tudo sem ser varrida.",
    florais: ["Agrimony", "Cherry Plum", "Pine"],
    reprogramacao: "Permissão para sentir — integrar a emoção sem repressão ou explosão"
  },
  {
    arcano: "Eremita",
    numero: 9,
    simbolo: "🕯️",
    sombra: ["isolamento", "afastamento_como_defesa", "solidao_cronica"],
    dom: "Introspecção, sabedoria, capacidade de encontrar respostas dentro",
    ferida: "Usa o isolamento para se proteger de decepções",
    direcao: "Se abrir sem perder a essência — conexão sem dissolução",
    evolucao: ["Estrela", "Imperatriz"],
    mensagem: "Você encontrou segurança na solidão — e isso tem um valor real. Mas existe uma diferença entre escolher a introspecção e precisar do isolamento para se sentir segura. O desafio agora é se abrir para conexão sem abrir mão do que você é.",
    florais: ["Water Violet", "Agrimony", "Star of Bethlehem"],
    reprogramacao: "Abertura para conexão autêntica sem perda de identidade"
  },
  {
    arcano: "Roda da Fortuna",
    numero: 10,
    simbolo: "🎡",
    sombra: ["instabilidade", "falta_de_ancoramento", "vitima_das_circunstancias"],
    dom: "Adaptabilidade, compreensão dos ciclos, capacidade de mudança",
    ferida: "Sente que a vida acontece para ela, não por ela",
    direcao: "Ancorar-se internamente para não ser varrida pelos ciclos externos",
    evolucao: ["Justica", "Temperanca"],
    mensagem: "Sua vida tem uma qualidade de montanha-russa — momentos altos e baixos que parecem fora do seu controle. Isso não é azar: é um padrão de desancoramento interno. Quando você encontra sua base, os ciclos externos deixam de te varrer.",
    florais: ["Scleranthus", "Walnut", "Elm"],
    reprogramacao: "Ancoramento interno — estabilidade que independe das circunstâncias"
  },
  {
    arcano: "Justica",
    numero: 11,
    simbolo: "⚖️",
    sombra: ["autojulgamento", "rigidez_moral", "autocritica_excessiva", "sobrecarga_de_dever"],
    dom: "Integridade, clareza, capacidade de discernimento",
    ferida: "Julga a si mesma com uma dureza que jamais aplicaria aos outros",
    direcao: "Trocar o julgamento pela compreensão — consigo mesma primeiro",
    evolucao: ["Temperanca", "Sacerdotisa"],
    mensagem: "Você tem um senso de justiça muito desenvolvido — mas ele está mais voltado para dentro do que para fora. Você se cobra de uma forma que jamais cobraria uma pessoa que ama. O trabalho agora é aplicar a mesma compaixão que você dá aos outros a si mesma.",
    florais: ["Pine", "Rock Water", "Elm"],
    reprogramacao: "Autocompaixão — trocar a cobrança pela compreensão de si mesma"
  },
  {
    arcano: "Enforcado",
    numero: 12,
    simbolo: "🌀",
    sombra: ["paralisia", "vitimizacao", "sacrificio_passivo", "nao_age"],
    dom: "Rendição, mudança de perspectiva, sabedoria que vem da espera",
    ferida: "Espera ser salva ou que as coisas mudem por si sós",
    direcao: "Soltar o que não serve mais para transformar — a rendição ativa",
    evolucao: ["Morte", "Carro"],
    mensagem: "Você está suspensa — entre o que era e o que poderia ser. Parece que está esperando que algo mude sem tomar a decisão que sabe que precisa tomar. A posição do Enforcado é desconfortável por design: ela força uma mudança de perspectiva que libera o que está preso.",
    florais: ["Wild Rose", "Hornbeam", "Cerato"],
    reprogramacao: "Passagem da espera passiva para a rendição ativa que transforma"
  },
  {
    arcano: "Morte",
    numero: 13,
    simbolo: "🌑",
    sombra: ["resistencia_a_mudanca", "apego_ao_que_ja_morreu", "medo_do_fim"],
    dom: "Transformação, capacidade de encerrar ciclos e renascer",
    ferida: "Se apega ao que já se foi porque teme o que pode vir",
    direcao: "Permitir encerramentos genuínos — o que termina cria espaço para o novo",
    evolucao: ["Temperanca", "Estrela"],
    mensagem: "Há algo na sua vida que já acabou — mas você ainda não fechou. Pode ser um relacionamento, uma versão de si mesma, uma crença. Esse arcano não fala de morte literal: fala de transformação radical. O que precisa ser enterrado para que algo novo possa nascer?",
    florais: ["Walnut", "Honeysuckle", "Wild Rose"],
    reprogramacao: "Fechamento de ciclos — permissão para deixar ir o que já cumpriu seu papel"
  },
  {
    arcano: "Temperanca",
    numero: 14,
    simbolo: "✨",
    sombra: ["desequilibrio", "oscilacao_emocional", "extremos"],
    dom: "Integração, equilíbrio, paciência com o próprio processo",
    ferida: "Vai de extremo a extremo sem encontrar o meio",
    direcao: "Integrar as partes internas em vez de escolher entre elas",
    evolucao: ["Sol", "Mundo"],
    mensagem: "Você vive em extremos — muito ou nada, tudo ou ausência. A Temperança mostra duas taças sendo mescladas: não é sobre escolher uma ou outra. É sobre integrar. Seu trabalho agora é encontrar o espaço do meio onde as suas partes opostas coexistem em paz.",
    florais: ["Scleranthus", "Impatiens", "Water Violet"],
    reprogramacao: "Integração de polaridades internas — equilíbrio sem supressão"
  },
  {
    arcano: "Diabo",
    numero: 15,
    simbolo: "⛓️",
    sombra: ["dependencia", "vicios", "apego_toxico", "sombra_nao_reconhecida"],
    dom: "Poder, instinto, energia vital quando direcionada conscientemente",
    ferida: "Está presa a algo ou alguém que sabe que não faz bem, mas não consegue soltar",
    direcao: "Reconhecer e assumir responsabilidade pela própria sombra",
    evolucao: ["Torre", "Forca"],
    mensagem: "Há uma corrente que você mesma pode soltar — mas ainda não quer. O Diabo não é uma força externa: é la parte de você que prefere o conhecido doloroso ao desconhecido libertador. Reconhecer que a corrente está solta é o primeiro passo para escolher tirá-la.",
    florais: ["Agrimony", "Centaury", "Crab Apple"],
    reprogramacao: "Reconhecimento e integração da sombra — liberdade através da responsabilidade"
  },
  {
    arcano: "Torre",
    numero: 16,
    simbolo: "⚡",
    sombra: ["colapso_repentino", "destruicao_do_construido", "crise_sem_integracao"],
    dom: "Revelação, colapso do que é falso, clareza que vem da ruptura",
    ferida: "Passa por rupturas repetidas sem integrar a mensagem",
    direcao: "Reconstruir com consciência — o colapso é uma limpeza, não uma punição",
    evolucao: ["Estrela", "Mundo"],
    mensagem: "Algo está prestes a cair — ou já caiu. A Torre representa aquilo que foi construído sobre base frágil. Sua queda não é punição: é o sistema te mostrando o que precisava ser liberado. A pergunta não é por que isso aconteceu, mas o que você pode construir agora, sobre uma base real.",
    florais: ["Star of Bethlehem", "Rock Rose", "Walnut"],
    reprogramacao: "Reestruturação após ruptura — reconstruir com alicerces verdadeiros"
  },
  {
    arcano: "Estrela",
    numero: 17,
    simbolo: "⭐",
    sombra: ["fragilidade_emocional", "inseguranca", "hipersensibilidade"],
    dom: "Esperança, cura, sensibilidade como força",
    ferida: "Teme que sua sensibilidade seja uma fraqueza",
    direcao: "Confiar e se expressar — sua vulnerabilidade é sua maior força",
    evolucao: ["Sol", "Imperatriz"],
    mensagem: "Você tem uma sensibilidade rara — e às vezes isso parece um fardo. A Estrela aparece depois da Torre: ela é a esperança que surge quando o pior já passou. Você ainda está se recuperando, mas há uma luz genuína que começa a aparecer. Sua ferida é exatamente o lugar onde sua cura acontece.",
    florais: ["Larch", "Mimulus", "Star of Bethlehem"],
    reprogramacao: "Transformar sensibilidade em força — autoconfiança após a ruptura"
  },
  {
    arcano: "Lua",
    numero: 18,
    simbolo: "🌕",
    sombra: ["medo", "ilusao", "confusao", "ansiedade_do_inconsciente"],
    dom: "Intuição profunda, acesso ao inconsciente, percepção do que está oculto",
    ferida: "Vive assombrada por medos que não consegue nomear",
    direcao: "Trazer luz ao inconsciente — nomear os medos para dissolvê-los",
    evolucao: ["Sol", "Sacerdotisa"],
    mensagem: "Você está num momento de névoa — onde as coisas não são o que parecem e o medo toma formas que não têm nome. A Lua é o arcano do inconsciente à flor da pele. Seu trabalho não é eliminar a confusão, mas aprender a caminhar com ela até que a clareza chegue naturalmente.",
    florais: ["Aspen", "Mimulus", "Red Chestnut"],
    reprogramacao: "Iluminação do inconsciente — nomear e dissolver os medos sem nome"
  },
  {
    arcano: "Sol",
    numero: 19,
    simbolo: "☀️",
    sombra: ["necessidade_de_validacao", "brilho_condicionado", "medo_de_desapontar"],
    dom: "Alegria, vitalidade, capacidade de inspirar",
    ferida: "Condiciona seu brilho à aprovação dos outros",
    direcao: "Brilhar com autenticidade — a luz que você é não precisa de permissão",
    evolucao: ["Mundo", "Imperador"],
    mensagem: "Você tem um brilho real — mas ainda está esperando que alguém o valide para acreditar nele. O Sol não precisa de permissão para brilhar. Seu trabalho agora é descobrir como você brilha quando ninguém está olhando — e perceber que essa é a versão mais real de você.",
    florais: ["Larch", "Centaury", "Cerato"],
    reprogramacao: "Brilho autêntico — expressão de si mesmo independente da validação externa"
  },
  {
    arcano: "Julgamento",
    numero: 20,
    simbolo: "🔔",
    sombra: ["culpa_cronica", "autocritica_severa", "dificuldade_de_perdoar"],
    dom: "Renovação, despertar, capacidade de se reinventar",
    ferida: "Vive em julgamento perpétuo de si mesma",
    direcao: "Se perdoar e renascer — o passado não define o que você pode ser",
    evolucao: ["Mundo", "Sol"],
    mensagem: "Você carrega um tribunal interno que não para. Juíza e ré ao mesmo tempo, você se condena por erros do passado que já não podem ser mudados. O Julgamento, em sua vibração positiva, é o chamado para o despertar — mas exige que você se absolva primeiro.",
    florais: ["Pine", "Willow", "Honeysuckle"],
    reprogramacao: "Autoperdão e renovação — libertar-se do tribunal interno"
  },
  {
    arcano: "Mundo",
    numero: 21,
    simbolo: "🌍",
    sombra: ["medo_de_encerrar_ciclos", "perfeccionismo", "nao_se_permite_completar"],
    dom: "Integração, completude, celebração do que foi conquistado",
    ferida: "Teme encerrar porque não sabe o que vem depois",
    direcao: "Iniciar novo ciclo com consciência — celebrar antes de começar de novo",
    evolucao: ["Louco"],
    mensagem: "Você está no limiar da completude — mas ainda não se permitiu celebrar o quanto já construiu. O Mundo é o arcano da integração: quando todas as partes se unem. Seu desafio não é conquistar mais, mas reconhecer que você já chegou em algum lugar e que este ciclo pode, finalmente, ser celebrado e encerrado.",
    florais: ["Wild Oat", "Walnut", "Honeysuckle"],
    reprogramacao: "Celebração e encerramento de ciclos — permissão para completar e recomeçar"
  },
];
