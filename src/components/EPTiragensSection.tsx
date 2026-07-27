import React from 'react';

interface EPTiragensSectionProps {
  onSelectTiragem?: (product: string, price: string) => void;
}

interface TiragemCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  priceLabel: string;
  priceNum: string;
  priceFormatted: string;
  isFeatured?: boolean;
  isPremium?: boolean;
}

const tiragensData: TiragemCard[] = [
  {
    id: 'energia-semana',
    tag: '7 DIAS',
    title: 'Energia da Semana',
    description: 'Entenda a energia dos próximos 7 dias, oportunidades, pontos de atenção e a direção que merece sua atenção.',
    priceLabel: 'A partir de',
    priceNum: '18',
    priceFormatted: 'R$ 18',
  },
  {
    id: 'ele-volta',
    tag: 'RELACIONAMENTOS',
    title: 'Ele Volta?',
    description: 'Existe intenção de aproximação? Entenda o que impede esse retorno e qual é a tendência entre vocês no período analisado.',
    priceLabel: 'Tiragem',
    priceNum: '33',
    priceFormatted: 'R$ 33',
    isFeatured: true,
  },
  {
    id: 'contato-zero',
    tag: 'RELACIONAMENTOS',
    title: 'Contato Zero',
    description: 'Procuro ou mantenho o silêncio? Veja o que o afastamento está movimentando e as tendências de cada caminho.',
    priceLabel: 'Tiragem',
    priceNum: '33',
    priceFormatted: 'R$ 33',
  },
  {
    id: 'novo-amor',
    tag: 'NOVOS CAMINHOS',
    title: 'Novo Amor',
    description: 'Descubra como está sua energia amorosa e quais movimentos favorecem a chegada de uma nova conexão.',
    priceLabel: 'Tiragem',
    priceNum: '39',
    priceFormatted: 'R$ 39',
  },
  {
    id: 'metodo-ex',
    tag: 'LEITURA PROFUNDA',
    title: 'Método do Ex',
    description: 'Uma leitura profunda sobre sentimentos, pensamentos, vínculo, intenções e a tendência entre vocês.',
    priceLabel: 'Tiragem completa',
    priceNum: '51',
    priceFormatted: 'R$ 51',
    isPremium: true,
  },
  {
    id: 'entre-nos-dois',
    tag: 'LEITURA PROFUNDA',
    title: 'Entre Nós Dois',
    description: 'Compare sentimentos, desejos e intenções dos dois lados e compreenda a dinâmica real da relação.',
    priceLabel: 'Tiragem completa',
    priceNum: '51',
    priceFormatted: 'R$ 51',
    isPremium: true,
  },
];

export const EPTiragensSection: React.FC<EPTiragensSectionProps> = ({ onSelectTiragem }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, product: string, price: string) => {
    e.preventDefault();
    if (onSelectTiragem) {
      onSelectTiragem(product, price);
    }
  };

  return (
    <section className="my-8 md:my-16 relative z-10 w-full" id="tiragens">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <span className="text-gold-main/60 uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold mb-3 block font-sans">
            EXPERIÊNCIA POSIÇÃO
          </span>
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-gold-light mb-4 font-serif font-semibold leading-tight">
            Escolha a clareza que você precisa hoje
          </h2>
          <p className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans">
            Tiragens objetivas para compreender o momento, enxergar tendências
            e tomar decisões com mais clareza.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tiragensData.map((card) => {
            return (
              <article
                key={card.id}
                className={`glass-card flex flex-col justify-between group transition-all duration-300 relative overflow-hidden h-full border ${
                  card.isFeatured
                    ? 'border-gold-main/35 bg-gold-main/[0.025] shadow-[0_4px_25px_rgba(201,160,74,0.08)]'
                    : card.isPremium
                    ? 'border-gold-main/25 bg-gold-main/[0.015]'
                    : 'border-white/5 bg-white/[0.01] hover:border-gold-main/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold-main/80 font-sans font-bold">
                      {card.tag}
                    </span>
                    <span className="text-gold-main/50 text-sm">✦</span>
                  </div>

                  <h3 className="serif text-xl md:text-2xl font-serif text-gold-light font-semibold mb-3 group-hover:text-gold-main transition-colors leading-snug">
                    {card.title}
                  </h3>

                  <p className="text-white/50 text-sm font-light leading-relaxed mb-6 font-sans">
                    {card.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-white/40 text-xs font-sans font-light">
                      {card.priceLabel}
                    </span>
                    <span className="font-serif text-2xl md:text-3xl font-bold text-gold-main tracking-tight">
                      {card.priceFormatted}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleClick(e, card.title, card.priceNum)}
                    className="button py-3.5 px-6 text-[11px] font-bold uppercase tracking-[0.16em] font-sans"
                  >
                    Quero esta tiragem
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer CTA Box */}
        <div className="glass-card border-gold-main/20 bg-gold-main/[0.015] p-8 md:p-12 text-center max-w-2xl mx-auto mt-12 md:mt-16 relative overflow-hidden">
          <span className="text-gold-main/50 text-lg block mb-3 font-serif">✦</span>

          <h3 className="serif text-2xl md:text-3xl text-gold-light mb-3 font-serif font-semibold">
            Não encontrou sua situação?
          </h3>

          <p className="text-white/50 text-sm font-light leading-relaxed mb-8 max-w-md mx-auto font-sans">
            Explore tiragens para amor, decisões, trabalho, dinheiro,
            maternidade e outros momentos da sua vida.
          </p>

          <button
            type="button"
            onClick={(e) => handleClick(e, 'Tiragem Personalizada / Consulta', '33')}
            className="button-outline inline-flex items-center justify-center min-w-[220px] px-8 py-3.5 text-[11px] uppercase tracking-[0.16em] font-bold font-sans cursor-pointer"
          >
            Ver todas as tiragens
          </button>
        </div>
      </div>
    </section>
  );
};

