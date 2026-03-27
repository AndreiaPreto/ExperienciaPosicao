export interface Option {
  text: string;
  value: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Quando algo sai do controle você:",
    options: [
      { text: "Organiza rapidamente", value: "A" },
      { text: "Assume responsabilidade", value: "B" },
      { text: "Se adapta", value: "C" },
      { text: "Se fecha", value: "D" }
    ]
  },
  {
    id: 2,
    question: "No corpo você sente tensão em:",
    options: [
      { text: "Mandíbula", value: "A" },
      { text: "Ombros", value: "B" },
      { text: "Peito", value: "C" },
      { text: "Pernas", value: "D" }
    ]
  },
  {
    id: 3,
    question: "Quando o dinheiro entra você:",
    options: [
      { text: "Controla", value: "A" },
      { text: "Assume mais", value: "B" },
      { text: "Usa", value: "C" },
      { text: "Guarda", value: "D" }
    ]
  },
  {
    id: 4,
    question: "Quando o dinheiro aperta:",
    options: [
      { text: "Controla mais", value: "A" },
      { text: "Trabalha mais", value: "B" },
      { text: "Evita conflito", value: "C" },
      { text: "Se retrai", value: "D" }
    ]
  }
];
