import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Download, X, ArrowRight, Sparkles, Settings, Check, Copy, CreditCard, MessageCircle, Star } from 'lucide-react';

const WHATSAPP_NUM = (import.meta as any).env.VITE_WHATSAPP_NUM || '5548991261832';
const PIX_CHAVE   = (import.meta as any).env.VITE_PIX_CHAVE || '48991261832'; // chave pix
const PIX_TITULAR = (import.meta as any).env.VITE_PIX_TITULAR || 'Andreia Preto';

const msgPix = (produto: string, preco: string) =>
  encodeURIComponent(
    `Olá! Acabei de fazer o pagamento via PIX do E-book *${produto}* (${preco}) e estou enviando o comprovante para receber o PDF. 🌿`
  );

const msgCartao = (produto: string, preco: string) =>
  encodeURIComponent(
    `Olá! Gostaria de comprar o E-book *${produto}* (${preco}) via cartão de crédito. Pode me enviar o link de pagamento? ✨`
  );

interface EBook {
  id: number;
  icon: string;
  cat: string;
  title: string;
  sub: string;
  desc: string;
  pages: string;
  badge: 'new' | 'hot' | 'free' | 'exc' | null;
  tags: string[];
  featured: boolean;
  bg: string;
  link: string;
  coverUrl?: string;
  price: string;
}

const EBOOKS_DATA: EBook[] = [
  {
    id: 1, icon: '📜', cat: 'Leis Herméticas',
    title: 'Descomplicando as Leis Herméticas',
    sub: 'Guia visual para compreender, memorizar e aplicar os 7 princípios universais',
    desc: 'Um guia visual completo para compreender, memorizar e aplicar os 7 princípios universais na sua vida: Mentalismo, Correspondência, Vibração, Polaridade, Ritmo, Causa e Efeito, e Gênero. Alinhe sua frequência com as leis que regem o universo e entenda o funcionamento invisível do todo.',
    pages: '120 págs', badge: 'new',
    tags: ['Leis Herméticas', '7 Princípios', 'Mentalismo', 'Ritmo', 'Visual'],
    featured: true,
    bg: 'linear-gradient(135deg,#201a15,#140f0c)', // Warm golden/cream premium dark background
    link: '#',
    coverUrl: '/assets/leis_hermeticas_cover.png',
    price: 'R$ 47,00'
  },
  {
    id: 2, icon: '🌿', cat: 'Florais',
    title: 'Descomplicando os Florais de Bach',
    sub: 'Aprenda a escolher e combinar florais para o seu equilíbrio emocional',
    desc: 'Um guia prático para entender os 38 Florais de Bach de forma simples. Descubra como cada essência atua nas suas emoções, como preparar sua fórmula personalizada e como integrá-los na sua rotina diária de autocuidado.',
    pages: '80 págs', badge: 'new',
    tags: ['Florais de Bach', 'Cura Vibracional', 'Prático', 'Autocuidado'],
    featured: false,
    bg: 'linear-gradient(135deg,#0f1a0a,#1a2e10)',
    link: '#',
    price: 'R$ 37,00'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Todos' },
  { id: 'Leis Herméticas', label: 'Leis Herméticas' },
  { id: 'Florais', label: 'Florais de Bach' }
];

export default function Biblioteca() {
  React.useEffect(() => {
    document.title = "Biblioteca POSIÇÃO · Conteúdos para alinhamento interno";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Sua biblioteca de práticas e e-books da POSIÇÃO para alinhamento pessoal e conexão intuitiva profunda.');
    }
  }, []);

  const [activeNav, setActiveNav] = useState<'todos' | 'destaques' | 'novidades'>('todos');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<EBook | null>(null);
  const [copied, setCopied] = useState(false);

  // Overrides mapping for live user upload links
  const [linksMap, setLinksMap] = useState<Record<number, string>>(() => {
    const saved: Record<number, string> = {};
    const ids = [1, 2];
    ids.forEach(id => {
      const stored = localStorage.getItem(`pdf_link_${id}`);
      if (stored) {
        saved[id] = stored;
      }
    });
    return saved;
  });

  const [isEditingLink, setIsEditingLink] = useState(false);
  const [editingUrl, setEditingUrl] = useState('');

  const handleSelectBook = (book: EBook | null) => {
    setSelectedBook(book);
    setIsEditingLink(false);
    setEditingUrl('');
  };

  // Filter ebooks
  const filteredEBooks = useMemo(() => {
    return EBOOKS_DATA.filter((e) => {
      // Nav Tabs Filter
      if (activeNav === 'destaques' && !e.featured) return false;
      if (activeNav === 'novidades' && e.badge !== 'new') return false;

      // Category filter
      if (activeCategory !== 'all' && e.cat !== activeCategory) return false;

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = e.title.toLowerCase().includes(query);
        const matchesCat = e.cat.toLowerCase().includes(query);
        const matchesSub = e.sub.toLowerCase().includes(query);
        const matchesTags = e.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesCat || matchesSub || matchesTags;
      }

      return true;
    });
  }, [activeNav, activeCategory, searchQuery]);

  const getBadgeLabel = (badge: EBook['badge']) => {
    switch (badge) {
      case 'new': return 'Novo';
      case 'hot': return '🔥 Hot';
      case 'free': return 'Grátis';
      case 'exc': return 'Exclusivo';
      default: return '';
    }
  };

  const getBadgeClass = (badge: EBook['badge']) => {
    switch (badge) {
      case 'new': return 'bg-gold-main text-deep-black';
      case 'hot': return 'bg-rose-600 text-white';
      case 'free': return 'bg-emerald-600 text-white';
      case 'exc': return 'bg-purple-600 text-white';
      default: return '';
    }
  };

  return (
    <div className="relative min-h-screen bg-deep-black text-text-main font-sans overflow-x-hidden pb-12">
      <div className="atmosphere"></div>

      {/* STICKY NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-deep-black/92 border-b border-gold-main/10 backdrop-blur-md gap-4">
        <Link to="/" className="logo text-lg md:text-xl font-serif font-bold tracking-[0.2em] uppercase text-gold-main">
          Minha <span className="italic font-light text-white/70">Biblioteca</span>
        </Link>

        {/* Navigation Pills */}
        <div className="flex bg-white/[0.03] border border-white/[0.05] p-1 rounded-full text-xs">
          {(['todos', 'destaques', 'novidades'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveNav(tab)}
              className={`px-4 py-1.5 rounded-full transition-all uppercase tracking-wider text-[10px] md:text-xs font-sans ${
                activeNav === tab
                  ? 'bg-gold-main text-deep-black font-semibold shadow-md shadow-gold-main/10'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              {tab === 'todos' ? 'Todos' : tab === 'destaques' ? 'Destaques' : 'Novidades'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-36 sm:w-48 md:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar e-book..."
            className="w-full bg-[#181818] border border-white/[0.06] focus:border-gold-main/40 text-white rounded-full pl-9 pr-4 py-1.5 text-xs outline-none transition-all placeholder:text-white/20"
          />
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative px-6 py-20 md:px-12 text-left border-b border-white/[0.03] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_90%_at_85%_50%,rgba(201,160,74,0.07)_0%,transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_10%_80%,rgba(201,160,74,0.04)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 opacity-[0.015] bg-[repeating-linear-gradient(0deg,#C9A04A_0,#C9A04A_1px,transparent_0,transparent_60px),repeating-linear-gradient(90deg,#C9A04A_0,#C9A04A_1px,transparent_0,transparent_60px)]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 text-gold-main uppercase tracking-[0.2em] text-[10px] md:text-xs">
              <span className="w-6 h-[1px] bg-gold-main/50"></span>
              Conteúdo Exclusivo
              <span className="w-6 h-[1px] bg-gold-main/50"></span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold leading-none mb-6">
              Conhecimento que<br /><span className="italic text-gold-light">descomplicam</span> o que<br />você sente.
            </h1>
            <p className="text-white/50 text-sm md:text-base font-light leading-relaxed max-w-xl mb-4">
              Cada e-book aqui foi criado por mim para <strong className="font-medium text-white/80">transformar assuntos complexos do universo emocional e terapêutico</strong> em algo prático, acessível e aplicável no seu dia a dia.
            </p>
            <p className="text-white/30 text-xs leading-relaxed max-w-md mb-8 pl-3 border-l border-gold-main/25">
              Não é uma livraria. É a minha biblioteca — materiais que uso, ensino e acredito, reunidos num só lugar para facilitar o seu caminho de autoconhecimento.
            </p>
            <a href="#biblioteca_anchor" className="button inline-flex items-center gap-2 w-auto">
              Explorar materiais →
            </a>
          </div>

          <div className="hidden lg:block text-right">
            <span className="font-serif text-[10rem] font-bold text-gold-main/5 select-none leading-none tracking-tight">
              {String(EBOOKS_DATA.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* CATEGORY FILTERS */}
      <section className="relative border-b border-white/[0.03] px-6 py-6 md:px-12">
        <div className="max-w-5xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold whitespace-nowrap mr-2">
            Tema:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap font-sans font-medium ${
                activeCategory === cat.id
                  ? 'border border-gold-main/40 text-gold-main bg-gold-main/8'
                  : 'border border-white/5 text-white/50 hover:text-white hover:border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN LIB GRID */}
      <main id="biblioteca_anchor" className="max-w-5xl mx-auto px-6 py-12 md:px-10">
        <div className="flex items-center justify-between mb-8 border-b border-white/[0.04] pb-6">
          <h2 className="font-serif text-2xl font-semibold text-white">
            Meus <b className="text-gold-main">E-books</b>
          </h2>
          <span className="text-xs text-white/40 bg-white/[0.02] border border-white/[0.06] px-3 py-1.5 rounded-full">
            {filteredEBooks.length} {filteredEBooks.length === 1 ? 'material' : 'materiais'}
          </span>
        </div>

        {filteredEBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4 opacity-40">📚</span>
            <h3 className="text-lg font-medium text-white/70 mb-1">Nenhum e-book encontrado</h3>
            <p className="text-xs text-white/40 max-w-xs">
              Tente redefinir a busca ou selecione outra categoria ou aba de destaques.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEBooks.map((book) => {
              if (book.featured) {
                return (
                  <div
                    key={book.id}
                    onClick={() => handleSelectBook(book)}
                    className="md:col-span-2 bg-[#101010] border border-gold-main/15 rounded-lg overflow-hidden cursor-pointer hover:border-gold-main/40 hover:-translate-y-1 transition-all duration-500 shadow-2xl flex flex-col sm:flex-row group"
                  >
                    {/* Cover Area */}
                    <div className="sm:w-52 h-44 sm:h-auto relative overflow-hidden flex items-center justify-center bg-black/40 shrink-0">
                      {book.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={book.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 opacity-60 group-hover:scale-105 transition-transform duration-500"
                          style={{ background: book.bg }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                      {!book.coverUrl && (
                        <span className="relative z-10 text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                          {book.icon}
                        </span>
                      )}
                      {book.badge && (
                        <div className={`absolute top-4 right-4 z-20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(book.badge)}`}>
                          {getBadgeLabel(book.badge)}
                        </div>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-gold-main bg-gold-main/8 border border-gold-main/15 px-2 py-1 rounded">
                          {book.cat} · Destaque
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-white mt-4 group-hover:text-gold-main transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-xs text-white/40 font-light mt-2 line-clamp-3 leading-relaxed">
                          {book.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.04]">
                        <div className="flex gap-1.5 flex-wrap">
                          {book.tags.map((t) => (
                            <span key={t} className="bg-white/[0.04] border border-white/[0.07] px-2 py-1 rounded text-[10px] text-white/50">
                              {t}
                            </span>
                          ))}
                        </div>
                        <span className="text-gold-main uppercase tracking-widest text-[10px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                          Adquirir <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className="bg-[#101010] border border-white/[0.04] rounded-lg overflow-hidden cursor-pointer hover:border-gold-main/20 hover:-translate-y-1.5 transition-all duration-500 shadow-lg flex flex-col justify-between group"
                >
                  {/* Standard Card Cover */}
                  <div className="h-44 relative overflow-hidden flex items-center justify-center bg-black/40">
                    {book.coverUrl ? (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-500"
                        style={{ background: book.bg }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {!book.coverUrl && (
                      <span className="relative z-10 text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                        {book.icon}
                      </span>
                    )}
                    {book.badge && (
                      <div className={`absolute top-4 right-4 z-20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(book.badge)}`}>
                        {getBadgeLabel(book.badge)}
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold-main">
                        {book.cat}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-2 group-hover:text-gold-main transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-white/40 mt-1 font-light line-clamp-2 leading-relaxed">
                        {book.sub}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                      <span className="text-[10px] text-white/30">{book.pages}</span>
                      <span className="text-gold-main uppercase tracking-widest text-[9px] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-all">
                        Adquirir <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-6 pt-12 border-t border-white/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30 mt-16">
        <div>© 2026 POSIÇÃO · Alinhamento Interno. Todos os direitos reservados</div>
        <div className="text-gold-main flex items-center gap-1.5 font-medium uppercase tracking-widest text-[9px]">
          <Sparkles size={12} fill="currentColor" /> Conteúdo Autoral
        </div>
      </footer>

      {/* OVERLAY DETAIL MODAL */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => handleSelectBook(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#101010] border border-gold-main/20 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl text-left"
            >
              {/* Cover Header */}
              <div className="h-52 relative flex items-center justify-center overflow-hidden">
                {selectedBook.coverUrl ? (
                  <img
                    src={selectedBook.coverUrl}
                    alt={selectedBook.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-50" style={{ background: selectedBook.bg }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-transparent"></div>
                {!selectedBook.coverUrl && (
                  <span className="relative z-10 text-6xl drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
                    {selectedBook.icon}
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => handleSelectBook(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/50 border border-white/10 hover:border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all scale-100 hover:scale-105"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Detail Contents */}
              <div className="p-6 md:p-8">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-main block mb-2 font-bold">
                  {selectedBook.cat}
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-4 leading-none">
                  {selectedBook.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                  {selectedBook.desc}
                </p>

                {/* Sub-tags list */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedBook.tags.map((t) => (
                    <span key={t} className="bg-gold-main/8 border border-gold-main/15 text-gold-main px-3 py-1 rounded-full text-xs">
                      {t}
                    </span>
                  ))}
                  <span className="bg-white/[0.03] border border-white/[0.06] text-white/40 px-3 py-1 rounded-full text-xs">
                    {selectedBook.pages}
                  </span>
                </div>

                {/* Modal actions / Payment Checkout Information */}
                <div className="space-y-6">
                  {/* RESUMO DO PEDIDO */}
                  <div className="bg-gold-main/[0.02] border border-gold-main/20 p-5 rounded-xl">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold-main/50 mb-1 font-semibold">
                      Seu Pedido
                    </p>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-serif text-xl font-bold text-gold-light leading-snug">
                        {selectedBook.title}
                      </p>
                      <p className="font-serif text-2xl font-bold text-gold-main tracking-tight shrink-0">
                        {selectedBook.price}
                      </p>
                    </div>
                  </div>

                  {/* OPÇÃO DE PAGAMENTO — PIX */}
                  <div className="bg-[#141414] border border-white/[0.05] p-5 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 text-xs font-semibold">
                        ◈
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-white/90">Pagar com PIX</p>
                        <p className="text-[10px] text-white/40">Melhor opção · Liberação imediata</p>
                      </div>
                      <span className="ml-auto text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                        Recomendado
                      </span>
                    </div>

                    {/* Chave PIX */}
                    <div className="bg-black/40 border border-white/[0.04] p-4 rounded-xl mb-4 text-left">
                      <p className="text-[9px] uppercase tracking-wider text-white/30 font-semibold mb-1.5">
                        Chave PIX
                      </p>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-white/70 text-xs font-mono select-all break-all leading-none">
                          {PIX_CHAVE}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(PIX_CHAVE);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2500);
                          }}
                          className="flex-shrink-0 text-[10px] uppercase tracking-wider text-gold-main border border-gold-main/20 hover:border-gold-main hover:bg-gold-main/5 font-semibold px-2.5 py-1 rounded transition-all"
                        >
                          {copied ? '✓ Copiado' : 'Copiar'}
                        </button>
                      </div>
                      <p className="text-[10px] text-white/30 font-sans mt-2">
                        Titular: <span className="text-white/50">{PIX_TITULAR}</span>
                      </p>
                    </div>

                    {/* Instruções de Pagamento e Entrega */}
                    <div className="space-y-2.5 mb-5 text-left border-t border-white/[0.04] pt-4">
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-gold-main/40 text-xs leading-none mt-1">01</span>
                        <p className="text-white/40 text-xs font-light">Abra seu aplicativo de banco e acesse o menu PIX.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-gold-main/40 text-xs leading-none mt-1">02</span>
                        <p className="text-white/40 text-xs font-light">Cole a chave acima e transfira o valor de <b className="text-white/60 font-semibold">{selectedBook.price}</b>.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-gold-main/40 text-xs leading-none mt-1">03</span>
                        <span className="bg-gold-main/10 text-gold-main text-[10px] px-2 py-0.5 rounded border border-gold-main/20 font-semibold inline-block uppercase tracking-wider">Aviso de Entrega</span>
                      </div>
                      <p className="text-gold-light/90 text-xs font-serif leading-relaxed italic pl-7">
                        Após a confirmação do pagamento, o e-book em formato PDF será enviado diretamente para seu WhatsApp.
                      </p>
                    </div>

                    {/* Botão Enviar Comprovante */}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUM}?text=${msgPix(selectedBook.title, selectedBook.price)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button w-full inline-flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} className="fill-current" />
                      Enviar comprovante pelo WhatsApp
                    </a>
                  </div>

                  {/* CARTÃO DE CRÉDITO */}
                  <div className="bg-[#141414]/65 border border-white/[0.03] p-4 rounded-xl flex items-center justify-between text-left gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={14} className="text-white/60" />
                        <h4 className="text-xs font-semibold text-white/80">Pagar com Cartão</h4>
                      </div>
                      <p className="text-[10px] text-white/30 font-light">Solicite o link de pagamento parcelado.</p>
                    </div>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUM}?text=${msgCartao(selectedBook.title, selectedBook.price)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-gold-main hover:text-gold-light uppercase tracking-wider font-semibold border border-gold-main/10 hover:border-gold-main/40 px-3 py-1.5 rounded bg-white/[0.02] flex items-center gap-1.5 transition-all"
                    >
                      Solicitar Link
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
