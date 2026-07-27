export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: 'rapida' | 'amor' | 'geral' | 'premium';
  badge?: string;
  descricao?: string;
  oraculo?: string;
}

export const produtos: Produto[] = [
  {
    id: 'energia-semana',
    nome: 'Energia da Semana',
    preco: 18,
    categoria: 'rapida',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Orientação objetiva com o Tarô e Baralho Cigano para os desafios e oportunidades dos seus próximos 7 dias.',
  },
  {
    id: 'energia-mes',
    nome: 'Energia do Mês',
    preco: 33,
    categoria: 'rapida',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Panorama vibracional completo com tendências e conselhos oraculares para os próximos 30 dias.',
  },
  {
    id: 'raio-x-situacao',
    nome: 'Raio-X da Situação',
    preco: 33,
    categoria: 'geral',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Investigação profunda das causas, bloqueios ocultos e melhor caminho de ação segundo os oráculos.',
  },
  {
    id: 'ele-volta',
    nome: 'Ele Volta?',
    preco: 33,
    categoria: 'amor',
    badge: 'Mais Pedida',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Sondagem objetiva no Tarô e Baralho Cigano sobre intenções, sentimentos atuais e possibilidades de retorno.',
  },
  {
    id: 'contato-zero',
    nome: 'Contato Zero',
    preco: 33,
    categoria: 'amor',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Revelação do que se passa no silêncio da outra pessoa: pensamentos, mágoas e próximos passos.',
  },
  {
    id: 'novo-amor',
    nome: 'Novo Amor',
    preco: 39,
    categoria: 'amor',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Abertura para novos relacionamentos: momentos favoráveis e conselhos das lâminas ciganas e do Tarô.',
  },
  {
    id: 'encruzilhada',
    nome: 'Encruzilhada',
    preco: 39,
    categoria: 'geral',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Análise imparcial de dois caminhos ou escolhas difíceis para clareza e firmeza decisória.',
  },
  {
    id: 'trabalho-dinheiro',
    nome: 'Trabalho & Dinheiro',
    preco: 39,
    categoria: 'geral',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Energias profissionais, vida financeira, oportunidades e bloqueios a superar segundo as cartas.',
  },
  {
    id: 'caminhos-maternidade',
    nome: 'Caminhos da Maternidade',
    preco: 39,
    categoria: 'geral',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Acolhimento e orientação do oráculo para momentos de gestação, tentantes e maternidade.',
  },
  {
    id: 'metodo-do-ex',
    nome: 'Método do Ex',
    preco: 51,
    categoria: 'amor',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Diagnóstico detalhado sobre os laços remanescentes, sentimentos e chances reais de reconstrução.',
  },
  {
    id: 'entre-nos-dois',
    nome: 'Entre Nós Dois',
    preco: 51,
    categoria: 'amor',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Mapeamento das duas mentes na relação: sentimentos, desejos e influências externas no amor.',
  },
  {
    id: 'triangulo-amoroso',
    nome: 'Triângulo Amoroso',
    preco: 51,
    categoria: 'amor',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Análise cuidadosa das partes envolvidas, intenções ocultas e tendências de desfecho.',
  },
  {
    id: 'consulta-amorosa-completa',
    nome: 'Consulta Amorosa Completa',
    preco: 69,
    categoria: 'premium',
    badge: 'Mais Completa',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Visão geral profunda da relação com Tarô e Baralho Cigano: motivos, sentimentos e caminhos.',
  },
  {
    id: 'mandala-trimestral',
    nome: 'Mandala Trimestral',
    preco: 129,
    categoria: 'premium',
    badge: 'A Mais Completa',
    oraculo: 'Tarot & Baralho Cigano',
    descricao: 'Mesa real aberta para os próximos 90 dias, cobrindo todas as áreas da vida com pergunta inclusa.',
  },
];
