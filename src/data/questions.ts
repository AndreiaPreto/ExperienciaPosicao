export interface Option {
  text: string;
  arcanos: { nome: string; peso: number }[]; // cada resposta pesa em múltiplos arcanos
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

// MAPA COMPLETO: 22 arcanos × dimensões emocionais
// 0-Louco, 1-Mago, 2-Sacerdotisa, 3-Imperatriz, 4-Imperador,
// 5-Hierofante, 6-Enamorados, 7-Carro, 8-Forca, 9-Eremita,
// 10-Roda, 11-Justica, 12-Enforcado, 13-Morte, 14-Temperanca,
// 15-Diabo, 16-Torre, 17-Estrela, 18-Lua, 19-Sol, 20-Julgamento, 21-Mundo

export const questions: Question[] = [
  {
    id: 1,
    question: "Quando algo foge do seu controle, o que acontece dentro de você?",
    options: [
      { text: "Entro em colapso e preciso agir imediatamente para consertar",
        arcanos: [{ nome: "Imperador", peso: 3 }, { nome: "Torre", peso: 2 }] },
      { text: "Me sinto paralisada e não consigo tomar nenhuma decisão",
        arcanos: [{ nome: "Enforcado", peso: 3 }, { nome: "Lua", peso: 2 }] },
      { text: "Aceito o que vem e me adapto, mesmo que por dentro esteja mal",
        arcanos: [{ nome: "Roda da Fortuna", peso: 3 }, { nome: "Temperanca", peso: 1 }] },
      { text: "Me afasto de tudo e de todos até processar sozinha",
        arcanos: [{ nome: "Eremita", peso: 3 }, { nome: "Sacerdotisa", peso: 2 }] },
    ]
  },
  {
    id: 2,
    question: "Qual frase mais descreve como você se relaciona com suas responsabilidades?",
    options: [
      { text: "Assumo tudo porque sinto que só eu faço direito",
        arcanos: [{ nome: "Imperador", peso: 2 }, { nome: "Justica", peso: 3 }] },
      { text: "Aceito mais do que posso carregar porque não sei dizer não",
        arcanos: [{ nome: "Hierofante", peso: 2 }, { nome: "Estrela", peso: 1 }, { nome: "Enforcado", peso: 2 }] },
      { text: "Evito compromissos com medo de decepcionar ou falhar",
        arcanos: [{ nome: "Louco", peso: 2 }, { nome: "Lua", peso: 2 }, { nome: "Julgamento", peso: 2 }] },
      { text: "Cumpro tudo com perfeição mas fico exausta e ressentiva",
        arcanos: [{ nome: "Justica", peso: 2 }, { nome: "Forca", peso: 2 }, { nome: "Mundo", peso: 1 }] },
    ]
  },
  {
    id: 3,
    question: "Como você lida com seus sentimentos mais intensos?",
    options: [
      { text: "Reprimo e finjo que está tudo bem até não aguentar mais",
        arcanos: [{ nome: "Forca", peso: 3 }, { nome: "Diabo", peso: 2 }] },
      { text: "Expresso tudo imediatamente e depois me arrependo",
        arcanos: [{ nome: "Carro", peso: 3 }, { nome: "Torre", peso: 2 }] },
      { text: "Fico ruminando sem conseguir processar",
        arcanos: [{ nome: "Lua", peso: 3 }, { nome: "Eremita", peso: 1 }] },
      { text: "Busco compreender a origem antes de reagir",
        arcanos: [{ nome: "Temperanca", peso: 3 }, { nome: "Sacerdotisa", peso: 2 }] },
    ]
  },
  {
    id: 4,
    question: "O que mais se repete nos seus relacionamentos?",
    options: [
      { text: "As pessoas me abandonam ou eu as afasto sem querer",
        arcanos: [{ nome: "Eremita", peso: 2 }, { nome: "Lua", peso: 2 }, { nome: "Estrela", peso: 2 }] },
      { text: "Me apego demais e sufoco quem está perto",
        arcanos: [{ nome: "Diabo", peso: 3 }, { nome: "Imperatriz", peso: 2 }] },
      { text: "Fico em dúvida se a pessoa me ama de verdade",
        arcanos: [{ nome: "Enamorados", peso: 3 }, { nome: "Julgamento", peso: 1 }] },
      { text: "Cuido de todos mas ninguém cuida de mim",
        arcanos: [{ nome: "Imperatriz", peso: 2 }, { nome: "Enforcado", peso: 2 }, { nome: "Justica", peso: 1 }] },
    ]
  },
  {
    id: 5,
    question: "Qual é a sua relação com o passado?",
    options: [
      { text: "Carrego situações que não consigo perdoar ou soltar",
        arcanos: [{ nome: "Julgamento", peso: 3 }, { nome: "Diabo", peso: 2 }] },
      { text: "Sinto saudade intensa de períodos que ficaram para trás",
        arcanos: [{ nome: "Morte", peso: 2 }, { nome: "Eremita", peso: 2 }] },
      { text: "Tenho vergonha de erros que cometi e isso ainda me paralisa",
        arcanos: [{ nome: "Julgamento", peso: 3 }, { nome: "Torre", peso: 1 }, { nome: "Lua", peso: 1 }] },
      { text: "Prefiro não olhar para trás e me foco apenas no que vem",
        arcanos: [{ nome: "Louco", peso: 2 }, { nome: "Carro", peso: 2 }] },
    ]
  },
  {
    id: 6,
    question: "Como você toma decisões importantes?",
    options: [
      { text: "Preciso de validação de outras pessoas antes de decidir",
        arcanos: [{ nome: "Hierofante", peso: 3 }, { nome: "Enamorados", peso: 2 }] },
      { text: "Decido rápido por impulso e depois me arrependo",
        arcanos: [{ nome: "Carro", peso: 3 }, { nome: "Louco", peso: 2 }] },
      { text: "Fico tanto tempo em dúvida que acabo não decidindo nada",
        arcanos: [{ nome: "Enamorados", peso: 3 }, { nome: "Roda da Fortuna", peso: 1 }, { nome: "Lua", peso: 1 }] },
      { text: "Analiso tudo exaustivamente e ainda assim fico insegura",
        arcanos: [{ nome: "Justica", peso: 2 }, { nome: "Sacerdotisa", peso: 2 }, { nome: "Mago", peso: 1 }] },
    ]
  },
  {
    id: 7,
    question: "Onde você sente maior tensão no seu corpo?",
    options: [
      { text: "Mandíbula, pescoço e ombros — carrego a tensão de controlar",
        arcanos: [{ nome: "Imperador", peso: 3 }, { nome: "Forca", peso: 1 }] },
      { text: "Peito e coração — como se houvesse um peso emocional",
        arcanos: [{ nome: "Imperatriz", peso: 2 }, { nome: "Estrela", peso: 2 }, { nome: "Enforcado", peso: 1 }] },
      { text: "Estômago e intestino — a ansiedade se manifesta assim",
        arcanos: [{ nome: "Lua", peso: 3 }, { nome: "Eremita", peso: 1 }] },
      { text: "Pernas e base — sinto que não tenho chão, como se flutuasse",
        arcanos: [{ nome: "Louco", peso: 2 }, { nome: "Roda da Fortuna", peso: 2 }, { nome: "Torre", peso: 1 }] },
    ]
  },
  {
    id: 8,
    question: "Como você lida com o dinheiro e a abundância?",
    options: [
      { text: "Trabalho muito mas sinto que nunca é suficiente",
        arcanos: [{ nome: "Mundo", peso: 2 }, { nome: "Carro", peso: 2 }, { nome: "Justica", peso: 1 }] },
      { text: "Gasto impulsivamente como forma de preencher um vazio",
        arcanos: [{ nome: "Diabo", peso: 3 }, { nome: "Imperatriz", peso: 1 }] },
      { text: "Guardo com medo de perder — a escassez me paralisa",
        arcanos: [{ nome: "Eremita", peso: 2 }, { nome: "Imperador", peso: 2 }] },
      { text: "Saboto quando começa a dar certo — não me sinto merecedora",
        arcanos: [{ nome: "Julgamento", peso: 2 }, { nome: "Lua", peso: 2 }, { nome: "Torre", peso: 1 }] },
    ]
  },
  {
    id: 9,
    question: "Qual é a sua maior crença limitante neste momento?",
    options: [
      { text: "Preciso ser forte e nunca demonstrar fraqueza",
        arcanos: [{ nome: "Imperador", peso: 3 }, { nome: "Forca", peso: 2 }] },
      { text: "Não sou suficiente — preciso provar meu valor constantemente",
        arcanos: [{ nome: "Sol", peso: 2 }, { nome: "Julgamento", peso: 2 }, { nome: "Estrela", peso: 1 }] },
      { text: "O mundo é perigoso e é melhor não confiar nas pessoas",
        arcanos: [{ nome: "Lua", peso: 3 }, { nome: "Eremita", peso: 2 }] },
      { text: "Se eu me soltar algo ruim vai acontecer",
        arcanos: [{ nome: "Hierofante", peso: 2 }, { nome: "Diabo", peso: 2 }, { nome: "Torre", peso: 1 }] },
    ]
  },
  {
    id: 10,
    question: "Como você se comporta quando alcança algo que queria?",
    options: [
      { text: "Já estou pensando no próximo objetivo antes de comemorar",
        arcanos: [{ nome: "Carro", peso: 3 }, { nome: "Mundo", peso: 1 }] },
      { text: "Sinto que não merecia e espero algo ruim acontecer",
        arcanos: [{ nome: "Julgamento", peso: 3 }, { nome: "Lua", peso: 1 }] },
      { text: "Fico feliz mas tenho medo de perder o que conquistei",
        arcanos: [{ nome: "Diabo", peso: 2 }, { nome: "Imperador", peso: 2 }] },
      { text: "Me permito celebrar e integrar — o ciclo se completou",
        arcanos: [{ nome: "Mundo", peso: 3 }, { nome: "Sol", peso: 2 }] },
    ]
  },
  {
    id: 11,
    question: "O que mais bloqueia seu crescimento pessoal?",
    options: [
      { text: "Crenças herdadas da família ou religião que ainda me limitam",
        arcanos: [{ nome: "Hierofante", peso: 3 }, { nome: "Morte", peso: 1 }] },
      { text: "Padrões que reconheço mas não consigo mudar",
        arcanos: [{ nome: "Diabo", peso: 3 }, { nome: "Roda da Fortuna", peso: 1 }] },
      { text: "Medo de mudar e perder o que já tenho",
        arcanos: [{ nome: "Morte", peso: 3 }, { nome: "Enforcado", peso: 2 }] },
      { text: "Falta de clareza sobre quem eu sou de verdade",
        arcanos: [{ nome: "Sacerdotisa", peso: 3 }, { nome: "Mago", peso: 2 }] },
    ]
  },
  {
    id: 12,
    question: "Como é a sua relação com o prazer e o autocuidado?",
    options: [
      { text: "Me sinto culpada quando faço algo só por mim",
        arcanos: [{ nome: "Julgamento", peso: 3 }, { nome: "Hierofante", peso: 1 }] },
      { text: "Uso prazeres externos para não sentir o que está por baixo",
        arcanos: [{ nome: "Diabo", peso: 3 }, { nome: "Imperatriz", peso: 1 }] },
      { text: "Deixo para depois — quando tiver tempo, quando merecer",
        arcanos: [{ nome: "Enforcado", peso: 2 }, { nome: "Mundo", peso: 2 }] },
      { text: "Me nutro com prazer genuíno e sem culpa",
        arcanos: [{ nome: "Imperatriz", peso: 3 }, { nome: "Sol", peso: 2 }] },
    ]
  },
  {
    id: 13,
    question: "Qual é a sua relação com mudanças e transformações?",
    options: [
      { text: "Resisto com força — prefiro o conhecido mesmo que doa",
        arcanos: [{ nome: "Morte", peso: 3 }, { nome: "Diabo", peso: 1 }] },
      { text: "Aceito as mudanças mas o processo me assusta muito",
        arcanos: [{ nome: "Torre", peso: 2 }, { nome: "Lua", peso: 2 }] },
      { text: "Provoco mudanças impulsivamente para fugir do que sinto",
        arcanos: [{ nome: "Louco", peso: 2 }, { nome: "Carro", peso: 2 }, { nome: "Torre", peso: 1 }] },
      { text: "Me abro para transformações quando sinto que chegou a hora",
        arcanos: [{ nome: "Temperanca", peso: 3 }, { nome: "Morte", peso: 1 }] },
    ]
  },
  {
    id: 14,
    question: "O que você mais precisa escutar de outra pessoa?",
    options: [
      { text: "Você é suficiente exatamente como você é",
        arcanos: [{ nome: "Sol", peso: 3 }, { nome: "Julgamento", peso: 2 }] },
      { text: "Pode confiar — você não está sozinha nisso",
        arcanos: [{ nome: "Estrela", peso: 3 }, { nome: "Eremita", peso: 1 }] },
      { text: "Você pode parar — não precisa carregar tudo",
        arcanos: [{ nome: "Justica", peso: 2 }, { nome: "Enforcado", peso: 2 }, { nome: "Imperador", peso: 1 }] },
      { text: "Você tem o direito de ser feliz agora, não depois",
        arcanos: [{ nome: "Mundo", peso: 2 }, { nome: "Sol", peso: 2 }, { nome: "Louco", peso: 1 }] },
    ]
  },
  {
    id: 15,
    question: "Como você se sente em relação ao futuro?",
    options: [
      { text: "Ansiosa — o futuro me parece ameaçador e incerto",
        arcanos: [{ nome: "Lua", peso: 3 }, { nome: "Torre", peso: 1 }] },
      { text: "Entusiasmada mas sem direção clara para onde ir",
        arcanos: [{ nome: "Louco", peso: 3 }, { nome: "Mago", peso: 1 }] },
      { text: "Estagnada — sinto que nada vai mudar de verdade",
        arcanos: [{ nome: "Enforcado", peso: 2 }, { nome: "Roda da Fortuna", peso: 2 }] },
      { text: "Confiante — estou plantando intenções e aguardando o florescer",
        arcanos: [{ nome: "Estrela", peso: 3 }, { nome: "Temperanca", peso: 2 }] },
    ]
  },
];
