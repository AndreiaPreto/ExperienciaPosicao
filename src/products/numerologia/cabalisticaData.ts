export interface CabalisticaItem {
  titulo: string;
  expressao: string;
  sombra: string;
  conselho: string;
}

export const diasNatalicios: Record<number, { titulo: string; descricao: string; talento: string }> = {
  1: {
    titulo: "Dia 1 - O Líder Determinado",
    descricao: "Idealizadores natos, pioneiros e dotados de imensa força de vontade. Buscam independência e têm uma aptidão natural para guiar caminhos novos.",
    talento: "Iniciativa pioneira, autonomia intelectual e capacidade de liderança natural."
  },
  2: {
    titulo: "Dia 2 - O Diplomata Colaborador",
    descricao: "Encontram seu poder no equilíbrio de forças, na partilha e na mediação da paz. São altamente intuitivos, sensíveis e ótimos ouvintes.",
    talento: "Diplomacia, empatia profunda, cooperação e pacificação de ambientes."
  },
  3: {
    titulo: "Dia 3 - O Comunicador Criativo",
    descricao: "Expressivos, otimistas e cheios de vitalidade. Têm facilidade para expressar ideias através da arte, escrita ou fala, unindo pessoas ao seu redor.",
    talento: "Comunicação magnética, imaginação fértil, sociabilidade e entusiasmo contagiante."
  },
  4: {
    titulo: "Dia 4 - O Construtor Firme",
    descricao: "Buscadores de segurança, ordem e solidez. Tratam a disciplina e o trabalho rigoroso como pilares de sustentação de sua vida e das pessoas amadas.",
    talento: "Poder de organização, lealdade inabalável, consistência prática e atenção aos detalhes."
  },
  5: {
    titulo: "Dia 5 - O Viajante Livre",
    descricao: "Amantes das mudanças, novidades e liberdade. Sintonizados com viagens, progresso e adaptabilidade, atraem experiências rápidas e enriquecedoras.",
    talento: "Adaptabilidade rápida, magnetismo pessoal, espírito de descoberta e versatilidade profissional."
  },
  6: {
    titulo: "Dia 6 - O Conciliador Familiar",
    descricao: "Portadores de amor profundo à família, ao lar e à justiça social. Sentem um chamado de acolhimento e responsabilidade afetiva constante.",
    talento: "Senso estético aguçado, capacidade de cura emocional, harmonia familiar e aconselhamento."
  },
  7: {
    titulo: "Dia 7 - O Buscador da Verdade",
    descricao: "Mentes analíticas de alta inclinação intuitiva e espiritual. Sentem a necessidade de compreender segredos profundos através do estudo e da introspecção.",
    talento: "Capacidade analítica fora do comum, agudeza espiritual, sabedoria filosófica e precisão mental."
  },
  8: {
    titulo: "Dia 8 - O Gestor Próspero",
    descricao: "Possuem foco em poder, justiça e prosperidade material. Sabem equilibrar as regras terrenas com o merecimento, sendo exímios planejadores e líderes.",
    talento: "Visão executiva, determinação financeira, autoridade natural e sabedoria pragmática."
  },
  9: {
    titulo: "Dia 9 - O Humanitário Generoso",
    descricao: "Idealistas movidos pelo amor universal e compaixão. Possuem uma visão universal ampla e sentem o desejo inato de ajudar a elevar a consciência do planeta.",
    talento: "Generosidade abundante, sabedoria filantrópica, empatia coletiva e magnetismo de cura."
  },
  10: {
    titulo: "Dia 10 - O Realizador Independente",
    descricao: "Um dia de extrema força de vontade e coragem de autogestão. Indicador de novos começos brilhantes com dinamismo intelectual acelerado.",
    talento: "Multiplicabilidade de talentos, ousadia de ação, independência ativa e inovação conceitual."
  },
  11: {
    titulo: "Dia 11 - O Harmonizador Inspirado",
    descricao: "Frequência máster que vibra canalização, intuição superior e sensibilidade requintada. Servem como guias morais e fontes de inspiração.",
    talento: "Visão intuitiva excepcional, inspiração artística, carisma espiritual e inteligência relacional."
  },
  12: {
    titulo: "Dia 12 - O Comunicador Expressivo",
    descricao: "Possuem dons de conciliação artística e comunicação expressiva refinada. Sabem expressar visões ricas com tato e cordialidade.",
    talento: "Pragmatismo criativo, habilidade manual ou oral, magnetismo pessoal e sociabilidade."
  },
  13: {
    titulo: "Dia 13 - O Alquimista Estrutural",
    descricao: "Vigilantes da ordem, reforma interna e resiliência absoluta. Aprendem a desintegrar o supérfluo para reconstruir bases de vida extremamente seguras.",
    talento: "Capacidade de recomeço sistemático, determinação incansável, responsabilidade profissional."
  },
  14: {
    titulo: "Dia 14 - O Alquimista da Liberdade",
    descricao: "Buscadores de transformações com inteligência e flexibilidade. Aprendem a transitar entre extremos de forma equilibrada através do bom senso.",
    talento: "Comunicação magnética, raciocínio lógico rápido, dinamismo comercial e amor ao progresso."
  },
  15: {
    titulo: "Dia 15 - O Magnetista Carismático",
    descricao: "Unem atração física natural com forte sensibilidade artística e generosidade. Dotados de grande inteligência emocional e carisma.",
    talento: "Poder de atração pessoal, vitalidade física estimulante, capacidade de cura e facilidade de bem-estar."
  },
  16: {
    titulo: "Dia 16 - O Intelectual Profundo",
    descricao: "Personalidades que prezam pela ética, verdade científica ou esotérica rigorosa. Desenvolvem uma escuta interna super apurada ao longo da vida.",
    talento: "Diferenciação analítica, independência de pensamento, dedicação investigativa e espiritualidade."
  },
  17: {
    titulo: "Dia 17 - O Prosperador Destinado",
    descricao: "Expressa sabedoria para lidar com grandes heranças, planos corporativos ou liderança. Atraem estabilidade financeira devido ao merecimento espiritual prévio.",
    talento: "Liderança executiva, autoconfiança de mercado, agudeza material e discernimento moral."
  },
  18: {
    titulo: "Dia 18 - O Líder Espiritual",
    descricao: "Personalidades místicas, dotadas de coragem emocional marcante e capacidade de autotransformação. Sabem lidar com a verdade sob pressão.",
    talento: "Coragem moral inabalável, compaixão cósmica, determinação e liderança humanitária."
  },
  19: {
    titulo: "Dia 19 - O Pioneiro Altruísta",
    descricao: "Extremamente fortes de caráter, independentes e focados no avanço moral e material. Carregam a energia do sol e da presença realizadora.",
    talento: "Brilho pessoal autêntico, espírito inventivo autônomo, poder executivo honrado."
  },
  20: {
    titulo: "Dia 20 - O Companheiro Sensível",
    descricao: "Encontram beleza nos detalhes silenciosos da vida. São gentis, cuidadores de parcerias e valorizam profundamente a quietude terapêutica do lar.",
    talento: "Cooperação empática sem cobrança, paciência organizacional, habilidade afetiva e sensibilidade."
  },
  21: {
    titulo: "Dia 21 - O Artista Social",
    descricao: "Irradiam otimismo natural e amor à diversão construtiva. Uma das vibrações mais estimulantes do nascimento para interconexão e sucesso mediático.",
    talento: "Poder de atração comercial, otimismo vocal, expressividade em palco e superação espiritual."
  },
  22: {
    titulo: "Dia 22 - O Grande Construtor",
    descricao: "Frequência máster que une a disciplina organizada do 4 com a intuição globalizadora. Traz ambições visionárias voltadas a criar legados comunitários duradouros.",
    talento: "Idealismo pragmático mundial, maestria na coordenação de grandes sistemas, autoridade benigna."
  },
  23: {
    titulo: "Dia 23 - O Conselheiro Versátil",
    descricao: "Mentes versáteis, amáveis e voltadas ao suporte psicossocial das massas. Absorvem conhecimentos práticos rápidos para curar debilidades alheias.",
    talento: "Aconselhamento empático, adaptabilidade linguística rápida, versatilidade e diplomacia terapêutica."
  },
  24: {
    titulo: "Dia 24 - O Benfeitor Protetor",
    descricao: "Dedicados integralmente ao serviço amoroso do lar e da comunidade. Desenvolvem soluções sólidas focadas na paz, no conforto e no afeto mútuo.",
    talento: "Amparo familiar caloroso, responsabilidade civil proativa, talento culinário ou curativo."
  },
  25: {
    titulo: "Dia 25 - O Racional Intuitivo",
    descricao: "Une raciocínio acadêmico forte com percepções sutis de caráter e alma. Sabem decifrar mistérios através de observações pacientes e reclusão sábia.",
    talento: "Investigação técnica minuciosa, intuição científica, integridade filosófica interna."
  },
  26: {
    titulo: "Dia 26 - O Administrador Equilibrado",
    descricao: "Compreensão prática da vida econômica aliada a profundas responsabilidades familiares. São excelentes e justos nas finanças de cooperação.",
    talento: "Julgamento corporativo equilibrado, capacidade de prover abundância, persistência prática."
  },
  27: {
    titulo: "Dia 27 - O Humanista Intelectual",
    descricao: "Vibração que expressa mente aberta, independência e grande sabedoria humanitária. São literatos naturais, terapeutas e mestres inspiradores.",
    talento: "Versatilidade cultural, empatia espiritual ecumênica, oratória envolvente e desapego material."
  },
  28: {
    titulo: "Dia 28 - O Pioneiro Cooperador",
    descricao: "Vibrante energia pioneira temperada com o amor pela justiça relacional. Conseguem liderar equipes com flexibilidade e espírito inovador.",
    talento: "Liderança de grupo, iniciativa integradora, superação de limites e originalidade."
  },
  29: {
    titulo: "Dia 29 - O Canal Visionário",
    descricao: "Intensa energia divina e canalização ativa. Atuam como pontos focais de inspiração dramática ou orientação espiritual, requerendo equilíbrio emocional.",
    talento: "Magnetismo religioso/filosófico marcante, intuição curativa pura, originalidade conceitual."
  },
  30: {
    titulo: "Dia 30 - O Expressivo Luminoso",
    descricao: "Uma vida voltada para iluminar caminhos com a palavra, a arte ou o ensino. Afastam qualquer sombra de solidão com seu magnetismo de alegria.",
    talento: "Oratória divertida, capacidade de motivar pessoas com otimismo e forte inclinação artística."
  },
  31: {
    titulo: "Dia 31 - O Organizador Autônomo",
    descricao: "União da iniciativa ativa com a necessidade de solidez prática. São indivíduos éticos, que constroem carreiras estáveis através de muito empenho.",
    talento: "Planejamento corporativo prático, retidão cívica, independência intelectual e pragmatismo."
  }
};

export const destinosInterp: Record<number, CabalisticaItem> = {
  1: {
    titulo: "Destino 1 - O Caminho do Pioneirismo e Liderança",
    expressao: "O aprendizado central de sua vida é desenvolver a autoconfiança, a força de vontade criadora e a autonomia individual para iniciar novos rumos, sem necessitar da validação das massas.",
    sombra: "Egocentrismo desmedido, autoritarismo focado no controle obsessivo de tudo, ou medo latente de assumir decisões, gerando paralisia e dependência.",
    conselho: "Cultive a audácia do autogoverno moral com respeito à liberdade alheia. Comece pequenos projetos de forma autônoma."
  },
  2: {
    titulo: "Destino 2 - O Caminho da Parceria e Pacificação",
    expressao: "Sua jornada exige aprender a ouvir, acolher contrários e mediar tensões. Você realiza seu potencial máximo ao atuar em cooperação mútua, agindo como ponte de reconciliação de ambientes e pessoas.",
    sombra: "Hipersensibilidade afetiva que gera submissão, dependência doentia de aprovação e anulação de si para evitar conflitos.",
    conselho: "Aprenda a dizer 'não' com afeto. Entenda que a cooperação verdadeira necessita de duas identidades inteiras, e não fundidas."
  },
  3: {
    titulo: "Destino 3 - O Caminho da Autoexpressão e Criatividade",
    expressao: "Sua trajetória exige irradiar criatividade, otimismo e entusiasmo em todas as frentes de manifestação humana. Você é o canal para espalhar alegria, arte e ideias iluminadas.",
    sombra: "Dispersão crônica de talentos, supérfluo, vaidade midiática agressiva ou depressão e isolamento quando os dons orais são trancados.",
    conselho: "Canalize seu excesso de ideias em uma via expressiva focada (arte, escrita, fala). Não disperse seu brilho em dezenas de frentes inacabadas."
  },
  4: {
    titulo: "Destino 4 - O Caminho da Segurança, Ordem e Trabalho",
    expressao: "O seu aprendizado terrenal está focado em criar estruturas sólidas através de disciplina férrea, rotina organizada e esforço leal. Você traz estabilidade ao mundo.",
    sombra: "Rigidez obstinada, medo irracional de mudanças financeiras, preconceito estrutural, e transformação de deveres em fardos de martírio.",
    conselho: "Aprenda a flexibilizar rotinas e delegar responsabilidades. Nem tudo precisa repousar sobre seus ombros de forma tão carregada."
  },
  5: {
    titulo: "Destino 5 - O Caminho do Progresso, Liberdade e Mudança",
    expressao: "Seu percurso é focado em explorar a inteligência multifacetada, abraçar a mudança contínua e ensinar o desapego saudável ao mundo através da adaptabilidade física e mental.",
    sombra: "Instabilidade nociva, compulsões e vícios, fuga sistêmica de responsabilidades afetivas sob a desculpa de preservar a liberdade.",
    conselho: "Procure focar suas experiências no crescimento qualitativo. A verdadeira liberdade provém da autossuficiência moral, não da eterna fuga urbana."
  },
  6: {
    titulo: "Destino 6 - O Caminho da Responsabilidade Afetiva e do Lar",
    expressao: "Sua jornada evoca o ideal do serviço familiar generoso, a cura de tensões relacionais, o amparo a necessitados e o estabelecimento da harmonia estética de ambientes.",
    sombra: "Controle emocional disfarçado de cuidado, excesso de cobrança de perfeição dos familiares, e retenção de rancor quando não há retribuição.",
    conselho: "Doe-se sem criar contratos inconscientes de possessividade. Permita que seus protegidos façam as próprias escolhas evolutivas."
  },
  7: {
    titulo: "Destino 7 - O Caminho do Estudo, Sabedoria e Introspecção",
    expressao: "Sua trajetória pede a busca minuciosa da verdade espiritual, científica ou interior. Requer desenvolvimento analítico e amadurecimento solitário que sirva de farol.",
    sombra: "Ceticismo gélido, sarcasmo intelectual condescendente, fuga misantrópica pura do cotidiano e medo excessivo de partilhar sentimentos.",
    conselho: "Confie na sua intuição sensível e conecte-se com as pessoas de forma honesta. A mente necessita da sabedoria do coração para florescer inteira."
  },
  8: {
    titulo: "Destino 8 - O Caminho do Poder Pessoal e Arbitragem Material",
    expressao: "Seu caminho pede a maestria executiva das leis terrenas e a geração de prosperidade justa. Exige aprender a governar de forma equânime, sem sucumbir ao abuso de autoridade.",
    sombra: "Ganância destrutiva, manipulação calculista de contratos e relacionamentos por interesse material, ou vitimismo financeiro crônico.",
    conselho: "Assuma de cabeça erguida sua força de comando material. Administre com moralidade cabalística de causa e efeito divino."
  },
  9: {
    titulo: "Destino 9 - O Caminho do Amor Universal e Desapego",
    expressao: "Sua trajetória exige o autodesenvolvimento do amor altruísta, da benevolência incondicional e o fechamento maduro de ciclos, libertando-se inteiramente de rancores do passado.",
    sombra: "Manipulação sentimental de cura (síndrome do salvador), apego obsessivo a glórias passadas e dificuldade profunda em dar adeus a dinâmicas falidas.",
    conselho: "Seja generoso com o planeta, mas não esqueça de amparar a si mesma. Solte o passado com respeito para deixar o novo ciclo ingressar."
  },
  11: {
    titulo: "Destino 11 - O Caminho da Inspiração, Visão Cósmica e Luz",
    expressao: "Número máster cabalístico. Sua jornada pede a atuação como canal inspiracional divino. Você traz ideias inovadoras que provocam despertares mentais e morais profundos.",
    sombra: "Fanatismo dogmático, confusão mental entre intuição pura e distorções do ego, depressão clínica devido ao atrito com a vibração densa do planeta.",
    conselho: "Ancore suas ideias abstratas no mundo real. Cuide meticulosamente de sua saúde do sistema nervoso através do silêncio contemplativo."
  },
  22: {
    titulo: "Destino 22 - O Caminho da Construção Universal e Solidariedade",
    expressao: "Número máster cabalístico. Sua missão estrutural exige conceber e edificar projetos de amplitude social que beneficiem milhares de almas de forma materialmente firme.",
    sombra: "Desperdício megalomaníaco de recursos comuns, egolatria em cargos de filantropia, e uso de poder idealístico para frentes mesquinhas.",
    conselho: "Pense grande, crie planos estruturados detalhados e una a ética da caridade ativa com a excelência absoluta da arquitetura material."
  }
};

export const missoesInterp: Record<number, CabalisticaItem> = {
  1: {
    titulo: "Missão 1 - Manifestar Iniciativa e Força Pioneira",
    expressao: "Você veio para ativar ideias novas de forma rápida e decisiva. Sua energia deve quebrar padrões de dependência e acomodação nas pessoas ao seu redor.",
    sombra: "Insegurança incapacitante que impede de dar o primeiro passo, ou agressividade descontrolada que impõe vontades egoístas por simples orgulho.",
    conselho: "Inicie movimentos mesmo sem aprovação. Lembre-se de que a verdadeira inovação assusta o senso comum em um primeiro momento."
  },
  2: {
    titulo: "Missão 2 - Conciliar Contrarios e Unir Corações",
    expressao: "Sua missão é atuar como amálgama amoroso de reuniões familiares, empresariais ou diplomáticas. Você aprende a curar conflitos pela escuta atenta.",
    sombra: "Isolamento assustado para evitar divergências de opinião, ou concordância forçada interna geradora de ressentimento silencioso.",
    conselho: "Valorize sua extrema intuição sensível. Seu papel é dar voz à paz moral sem que ninguém perca sua dignidade essencial."
  },
  3: {
    titulo: "Missão 3 - Comunicar, Expressar e Iluminar",
    expressao: "Vieram para emitir alegria, beleza e ideias fluidas de forma pública. Devem usar a fala, canções, artes corporais ou negócios criativos para elevar o ânimo coletivo.",
    sombra: "Uso nocivo da fala (fofoca, intrigas), cinismo que destrói a esperança de jovens e dispersão que não conclui nenhuma meta séria.",
    conselho: "Escreva, fale, exponha seus pontos de vista profundos. Coloque sua arte em circulação para alimentar fomes morais e estéticas da alma."
  },
  4: {
    titulo: "Missão 4 - Edificar Bases Sólidas, Seguras e Dignas",
    expressao: "Sua missão é dar base e segurança material e estrutural à sociedade. Você ensina o respeito às regras, à lealdade, à meticulosidade técnica.",
    sombra: "Estagnação pura em rotinas burocráticas sem alma, ou julgamento severo das flutuações e espontaneidades mais soltas dos outros.",
    conselho: "Pratique a paciência benevolente com o ritmo mais livre alheio. Compreenda que a base firme que você ergue destina-se a dar sustentação e não aprisionamento."
  },
  5: {
    titulo: "Missão 5 - Ser Vetor de Mudança, Progresso e Evolução",
    expressao: "Sua missão é quebrar rigidezes sociais antigas, mostrando novas formas de expandir experiências, promover reformas internas constantes e comercializar ideias rápidas de libertação.",
    sombra: "Medo crônico de assumir rumos fixos com foco de longo prazo, gerando perdas cíclicas de recursos por ânsia de infindáveis novidades.",
    conselho: "Entenda que a disciplina inteligente sintonizada liberta muito mais do que a desordem sem rumo. Seja flexível de mente, firme de propósito."
  },
  6: {
    titulo: "Missão 6 - Conselheiro da União, Harmonia e Responsabilidade",
    expressao: "Você veio para harmonizar o lar, acolher as fragilidades humanas e espalhar compaixão no núcleo social. Atua como o curador natural de discórdias domésticas.",
    sombra: "Chantagem afetiva mascarada de amor infinito, cobrança asfixiante de dedicação extrema e centralização egoísta da vida de parentes próximos.",
    conselho: "Ajude sem anular os méritos do outro. Ensine os vulneráveis a buscarem o autossustento moral antes de carregar todos nas costas."
  },
  7: {
    titulo: "Missão 7 - Desvelar Mistérios e Elevar a Inteligência Moral",
    expressao: "Sua missão de alma é elevar os padrões intelectuais e intuitivos de sua comunidade. Deve buscar as respostas internas e compartilhá-las de modo límpido, agindo como mentor.",
    sombra: "Arrogância teórica, distanciamento frio que despreza os dramas simples do cotidiano, ou uso de sabedoria oculta para impressionar mentes ingênuas.",
    conselho: "Abra-se ao amor cotidiano mais modesto. A sabedoria espiritual completa reside na união íntima do conhecimento empírico com a empatia pura."
  },
  8: {
    titulo: "Missão 8 - Realizar com Retidão, Justeza e Empreendedorismo",
    expressao: "Sua missão exige administrar fortunas de forma justa, chefiar corporações de apoio civil, incentivar projetos e atuar com idoneidade legal implacável.",
    sombra: "Ambição feroz sem freios humanitários, abuso despótico e violento de cargos de governança e humilhação moral de subalternos.",
    conselho: "Trace seus rumos financeiros de modo a gerar emprego, riqueza comum e educação social. Sua colheita abundante será protegida por forças superiores."
  },
  9: {
    titulo: "Missão 9 - Elevar o Amor Universal, Fechar Ciclos e Inspirar",
    expressao: "Você veio para inspirar a caridade de alma, desapegar-se do transitório terrestre, encerrar antigas dinâmicas kármicas e guiar a transição espiritual humana.",
    sombra: "Amargura de perdas anteriores que impede o perdão total aos ofensores, salvacionismo egocêntrico ou apatia diante das injustiças reais.",
    conselho: "Aprenda a deixar ir o que já faleceu em termos de relação, padrão de conduta ou espaço físico. Faça do fechamento de portas um rito belo de luz."
  },
  11: {
    titulo: "Missão 11 - Sintonizar a Luz Divina e Despertar Almas",
    expressao: "Sua missão máster espiritual exige atuar como um difusor de mensagens canalizadas elevantes. É o chamado de inspirar pelo exemplo virtuoso de vida e coragem mental.",
    sombra: "Autoilusão profética messiânica, hipocondria extrema decorrente do cansaço vibracional psíquico, ego elevado por liderança intuitiva.",
    conselho: "Mantenha o corpo aterrado na disciplina física básica (exercícios, dieta, natureza). Sua mente precisa de bases calmas para filtrar verdades límpidas."
  },
  22: {
    titulo: "Missão 22 - Erguer Legados Coletivos de Transformação Social",
    expressao: "Sua missão grandiosa é traduzir as filosofias humanitárias sublimes em estruturas físicas duradouras de acolhimento (fundações, cooperativas, hospitais, escolas globais).",
    sombra: "Desespero material por achar que os recursos terrestres não são suficientes, centralização corrupta de finanças benfazejas, megalomania vazia.",
    conselho: "Alavanque apoios políticos e civis honestos. Utilize sua imensa força executiva para materializar o que antes existia apenas no campo dos sonhos espirituais."
  }
};

export const anosPessoaisInterp: Record<number, CabalisticaItem> = {
  1: {
    titulo: "Ano Pessoal 1 - Começo de Ciclo e Iniciativas Próprias",
    expressao: "Um período de novos e brilhantes começos morais e profissionais. É a hora exata para plantar as sementes de independência de rumo de toda a década vindoura.",
    sombra: "Insegurança paralisante de dar passos sem as mãos alheias, ou agressividade cega ao tentar forçar resultados prematuros.",
    conselho: "Inicie novos hábitos benfazejos, lance projetos autorais e confie no seu pioneirismo interno. Mantenha os olhos voltados para frente."
  },
  2: {
    titulo: "Ano Pessoal 2 - Cooperação, Gestação e Germinação Silenciosa",
    expressao: "Um ciclo focado no cuidado silencioso, na diplomacia no lar e nos negócios e no cultivo paciente das relações. As plantações do ano anterior agora ganham raízes profundas sob a terra.",
    sombra: "Oscilações de humor crônicas por absorver discórdia alheia, dependência excessiva e falta de iniciativa sob o medo crônico de desavenças.",
    conselho: "Pratique a escuta sagrada, organize acordos benfazejos e exercite a paciência. Nem tudo precisa ocorrer no seu tempo mental cronometrado."
  },
  3: {
    titulo: "Ano Pessoal 3 - Expansão de Contatos, Alegria e Expressividade",
    expressao: "As sementes começam a brotar em plantas vistosas. É uma fase maravilhosa para as artes orais, o marketing pessoal criativo, viagens divertidas e celebração relacional.",
    sombra: "Esbanjamento inconsequente de fundos financeiros, fofocas e intrigas por excesso de palavras fúteis.",
    conselho: "Escreva, fale, expanda seus canais digitais de divulgação! Use sua energia lúdica divina de modo focado em embelezar seu trabalho e relações."
  },
  4: {
    titulo: "Ano Pessoal 4 - Organização Prática, Bases Firmezas e Emprego",
    expressao: "Um ano de dedicação disciplinada focado em estruturar metas sólidas. Excelente período para aquisição de imóveis, reformas físicas estruturais e estabelecimento de contratos permanentes.",
    sombra: "Rigidez corporal e mental incapacitante, exaustão por ignorar repousos justos e sensação constante de escassez imaginária.",
    conselho: "Crie rotinas limpas e produtivas. Entenda que o trabalho bem sintonizado não cansa o ser, mas sim ampara o seu direito de reinar na terra."
  },
  5: {
    titulo: "Ano Pessoal 5 - Liberdade, Transição Rápida e Progressos",
    expressao: "Um período dinâmico repleto de surpresas estimulantes, viagens rápidas, mudanças de perspectivas ou de localidade física. Excelente fase para o comércio exterior.",
    sombra: "Instabilidade impulsiva prejudicial, abandono de deveres construtivos por tédio pueril e riscos inconsequentes à própria saúde física.",
    conselho: "Siga o fluxo das oportunidades flexíveis que surgirem do exterior com discernimento. Mude o supérfluo, preserve o caráter honrado."
  },
  6: {
    titulo: "Ano Pessoal 6 - Harmonia Doméstica, Família e Cura do Coração",
    expressao: "Atenção focada nas relações sentimentais e obrigações afetivas. O ano convida ao embelezamento do lar, ao cuidado com a alimentação pura, casamentos e acordos amorosos justos.",
    sombra: "Autoanulação extrema por interferir em pendências e caprichos alheios familiares, egoísmo disfarçado de zêlo imenso.",
    conselho: "Ofereça ombro amigo e hospitalidade, mas respeite a privacidade e a independência sagrada de crescimento moral das pessoas queridas."
  },
  7: {
    titulo: "Ano Pessoal 7 - Estudo de Si, Espiritualidade e Contemplação",
    expressao: "Um ciclo sagrado de recolhimento espiritual interno. Excelente período para realizar exames de saúde detalhados, iniciar mestrados, estudar sabedorias esotéricas e reorganizar crenças íntimas.",
    sombra: "Melancolia misantrópica profunda, ceticismo amargo crônico e isolamento assustado de relações cotidianas de serviço moral.",
    conselho: "Permita-se pausas reflexivas de silêncio na natureza. Estude com empenho mas sintonize-se com a caridade prática do coração."
  },
  8: {
    titulo: "Ano Pessoal 8 - Realização Financeira, Poder de Ação e Equanimidade",
    expressao: "Fase de grande colheita de esforços passados materiais e profissionais. Um ciclo excelente para solicitar aumentos de cargos, gerir empreendimentos e assinar alianças mercantis sábias.",
    sombra: "Ganância, obsessão pelo prestígio social mesquinho de vaidade terrena e rispidez executiva violenta.",
    conselho: "Gerencie com inteligência, pragmatismo e equilíbrio divino as riquezas temporárias que fluem por suas mãos morais na terra."
  },
  9: {
    titulo: "Ano Pessoal 9 - Conclusão de Ciclo, Faxina Mental e do Lar",
    expressao: "Ano para limpar o supérfluo, encerrar amarguras, doar pertences que pesam no lar e liberar pessoas doentias de modo pacífico. Prepara o terreno para o novo plantio no ano de número 1.",
    sombra: "Melancolia persistente por desapegos inevitáveis morais, rebeldia irritada ao resistir à queda natural de antigas dinâmicas.",
    conselho: "Perdoe quem errou na sua jornada evolutiva, desfaça-se de entulhos acumulados e abençoe a vida. Soltar é a chave moral da libertação caritativa."
  },
  11: {
    titulo: "Ano Pessoal 11 - Intuição canalística superior e Revelações da Alma",
    expressao: "Fase de fortíssima percepção intuitiva, com potenciais aparições de insights canalizados brilhantes que reorientam toda sua filosofia terrenal de existir.",
    sombra: "Tensão nervosa generalizada devido ao atrito corporal de altas correntes bioenergéticas divinas.",
    conselho: "Medite com constância diária, anote sonhos que guiam seus passos espirituais e aja como fonte inspiradora suave ao coletivo vulnerável."
  },
  22: {
    titulo: "Ano Pessoal 22 - Execução de Projetos Universais Grandiosos",
    expressao: "Ciclo máster de colheita e concretização onde seus maiores sonhos sociais ganham o amparo de instituições de suporte moral e material. Trabalho de escopo universal.",
    sombra: "Extrema autocobrança por achar que seu legado ainda é insuficiente para salvar os necessitados terrestres.",
    conselho: "Trabalhe de forma alinhada unindo ética comunitária firme, parcerias fidedignas e planejamento meticuloso. Seus passos estão guiados espiritualmente."
  }
};
