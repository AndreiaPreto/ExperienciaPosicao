import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Sparkles, Star, ChevronDown, ChevronUp, Layers, Compass, Eye } from 'lucide-react';
import { produtos, Produto } from '../data/produtos';
import { useCart } from '../context/CartContext';

type CategoriaFilter = 'todas' | 'rapida' | 'amor' | 'geral' | 'premium';

interface CatalogSectionProps {
  initiallyExpanded?: boolean;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({ initiallyExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initiallyExpanded);
  const [selectedCategory, setSelectedCategory] = useState<CategoriaFilter>('todas');
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});
  const { addItem, totalItems, toggleDrawer } = useCart();

  const handleAddToCart = (e: React.MouseEvent, produto: Produto) => {
    e.stopPropagation();
    addItem({ id: produto.id, nome: produto.nome, preco: produto.preco });

    // Show temporary visual feedback
    setAddedIds((prev) => ({ ...prev, [produto.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [produto.id]: false }));
    }, 1500);
  };

  const filteredProdutos = selectedCategory === 'todas'
    ? produtos
    : produtos.filter((p) => p.categoria === selectedCategory);

  const categoriesList: { key: CategoriaFilter; label: string }[] = [
    { key: 'todas', label: 'Todas as Tiragens' },
    { key: 'rapida', label: 'Rápidas (a partir de R$ 18)' },
    { key: 'amor', label: 'Amor & Relacionamentos' },
    { key: 'geral', label: 'Geral, Trabalho & Vida' },
    { key: 'premium', label: 'Consultas Completas & Mandalas' },
  ];

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <section className="my-4 sm:my-10 md:my-16 relative z-10 w-full max-w-full overflow-hidden" id="leituras-taro-cigano">
      <div className="max-w-6xl mx-auto px-1 sm:px-4 md:px-6 w-full max-w-full">
        {/* Main Session Portal Container Card */}
        <div className="glass-card border border-gold-main/30 bg-gradient-to-b from-gold-main/[0.04] via-black/85 to-black/95 rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-12 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-full">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gold-main/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

          {/* Session Intro Header */}
          <div className="text-center max-w-3xl mx-auto relative z-10 w-full max-w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gold-main/15 border border-gold-main/30 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full mb-3 sm:mb-4 shadow-sm max-w-full">
              <Sparkles size={12} className="text-gold-main shrink-0" />
              <span className="text-gold-main font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-[9px] sm:text-xs font-sans">
                SESSÃO DE ORÁCULOS
              </span>
            </div>

            <h2 className="serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-light font-serif font-semibold mb-3 sm:mb-4 leading-snug px-1 break-words max-w-full">
              Leituras de Tarot e Baralho Cigano
            </h2>

            <p className="text-white/70 font-light text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-2xl mx-auto font-sans px-1">
              Consultas objetivas, direcionamentos temáticos e análises profundas utilizando as lâminas do <strong className="text-gold-light font-medium">Tarot</strong> e a sabedoria intuitiva do <strong className="text-gold-light font-medium">Baralho Cigano (Lenormand)</strong>.
            </p>

            {/* Session Highlights / Value Props */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-white/70 font-sans font-light mb-5 sm:mb-8 w-full max-w-full">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl max-w-full">
                <Layers size={12} className="text-gold-main shrink-0" />
                <span className="whitespace-normal">14 Opções de Tiragens</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl max-w-full">
                <Compass size={12} className="text-gold-main shrink-0" />
                <span className="whitespace-normal">Respostas Objetivas & Acolhedoras</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl max-w-full">
                <Eye size={12} className="text-gold-main shrink-0" />
                <span className="whitespace-normal">A partir de R$ 18</span>
              </span>
            </div>

            {/* Expand / Collapse Main Action Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="button py-3 sm:py-4 px-4 sm:px-10 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.08em] sm:tracking-[0.14em] font-sans inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto shadow-[0_4px_25px_rgba(201,160,74,0.25)] hover:shadow-[0_4px_30px_rgba(201,160,74,0.4)] transition-all cursor-pointer whitespace-normal text-center"
            >
              <span>{isExpanded ? 'Ocultar Produtos da Sessão' : 'Ver Todos os Produtos da Sessão'}</span>
              {isExpanded ? <ChevronUp size={16} className="shrink-0" /> : <ChevronDown size={16} className="shrink-0" />}
            </button>
          </div>

          {/* Expanded Session Products Section */}
          {isExpanded && (
            <div className="mt-6 sm:mt-12 pt-5 sm:pt-10 border-t border-white/10 relative z-10 animate-fade-in w-full max-w-full">
              {/* Category Filter Pills - Responsive horizontal scroll on mobile */}
              <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-5 sm:mb-8 no-scrollbar w-full max-w-full">
                {categoriesList.map((cat) => {
                  const isActive = selectedCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`shrink-0 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 font-sans cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-gold-main text-[#0a0a0a] border border-gold-light shadow-[0_2px_15px_rgba(201,160,74,0.3)]'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6 w-full max-w-full">
                {filteredProdutos.map((produto) => {
                  const isAdded = !!addedIds[produto.id];
                  const isPremium = produto.categoria === 'premium';

                  return (
                    <article
                      key={produto.id}
                      className={`glass-card flex flex-col justify-between group transition-all duration-300 relative overflow-hidden h-full rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6 border max-w-full ${
                        produto.badge
                          ? 'border-gold-main/40 bg-gold-main/[0.04] shadow-[0_4px_25px_rgba(201,160,74,0.1)]'
                          : isPremium
                          ? 'border-gold-main/30 bg-gold-main/[0.025]'
                          : 'border-white/10 bg-white/[0.02] hover:border-gold-main/30 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div>
                        {/* Top Metadata Badge */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3.5 gap-2">
                          {produto.badge ? (
                            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold text-gold-main bg-gold-main/15 border border-gold-main/30 px-2 py-0.5 rounded-full font-sans">
                              <Star size={10} className="fill-gold-main text-gold-main" />
                              {produto.badge}
                            </span>
                          ) : (
                            <span className="text-[9px] uppercase tracking-[0.15em] text-gold-main/80 font-bold font-sans">
                              {produto.oraculo || 'Tarot & Baralho Cigano'}
                            </span>
                          )}

                          <span className="text-gold-main/40 text-xs">✦</span>
                        </div>

                        {/* Title */}
                        <h3 className="serif text-base sm:text-xl md:text-2xl font-serif text-gold-light font-semibold mb-2 group-hover:text-gold-main transition-colors leading-snug break-words">
                          {produto.nome}
                        </h3>

                        {/* Description */}
                        {produto.descricao && (
                          <p className="text-white/65 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6 font-sans">
                            {produto.descricao}
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-auto pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2 sm:gap-3">
                        <div className="shrink-0">
                          <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider block font-sans">
                            Valor
                          </span>
                          <span className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gold-main tracking-tight">
                            {formatPrice(produto.preco)}
                          </span>
                        </div>

                        {/* Add Button */}
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, produto)}
                          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 font-sans cursor-pointer shrink-0 min-h-[36px] ${
                            isAdded
                              ? 'bg-emerald-500 text-white border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : 'bg-gold-main/20 hover:bg-gold-main text-gold-light hover:text-[#0a0a0a] border border-gold-main/40 hover:border-gold-main'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={13} className="text-white" />
                              <span>Adicionado</span>
                            </>
                          ) : (
                            <>
                              <Plus size={13} />
                              <span>Adicionar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Bottom Collapse Button */}
              <div className="mt-6 sm:mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-white/50 hover:text-white uppercase tracking-widest inline-flex items-center gap-2 transition-colors font-sans py-2 px-4 cursor-pointer"
                >
                  <span>Recolher lista de produtos</span>
                  <ChevronUp size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Launcher Button */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <button
            type="button"
            onClick={toggleDrawer}
            className="group flex items-center gap-2.5 sm:gap-3 bg-gold-main hover:bg-gold-light text-[#0a0a0a] px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_30px_rgba(201,160,74,0.4)] transition-all duration-300 hover:scale-105 font-sans cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag size={18} className="text-[#0a0a0a]" />
              <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] font-bold font-mono w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-[#0a0a0a]">
                {totalItems}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#0a0a0a]">
              Ver Sacola ({totalItems})
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

