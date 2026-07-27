import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    total,
    totalItems,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
    checkoutWhatsApp,
  } = useCart();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border-l border-gold-main/20 h-full flex flex-col z-10 shadow-2xl overflow-hidden"
          >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-main/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Drawer Header */}
            <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between relative z-10 bg-[#0a0a0a]/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-main/10 border border-gold-main/20 flex items-center justify-center text-gold-main">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h2 className="serif text-xl font-serif font-bold text-gold-light leading-tight">
                    Sua Sacola
                  </h2>
                  <p className="text-[11px] text-white/40 font-sans uppercase tracking-wider font-medium">
                    {totalItems} {totalItems === 1 ? 'leitura selecionada' : 'leituras selecionadas'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all cursor-pointer"
                aria-label="Fechar sacola"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 relative z-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-gold-main/5 border border-gold-main/15 flex items-center justify-center text-gold-main/40 mb-4">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="serif text-xl text-gold-light font-serif mb-2 font-medium">
                    Sua sacola está vazia
                  </h3>
                  <p className="text-white/40 text-xs font-sans max-w-xs mb-6 font-light leading-relaxed">
                    Escolha as leituras desejadas no catálogo para ter clareza e orientação na sua jornada.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="button py-2.5 px-6 text-xs uppercase tracking-widest font-bold font-sans"
                  >
                    Ver Leituras
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/[0.02] border border-white/10 hover:border-gold-main/30 rounded-2xl p-4 transition-all duration-200 relative group shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="serif text-base font-serif font-semibold text-gold-light leading-snug">
                          {item.nome}
                        </h4>
                        <span className="text-xs text-gold-main font-semibold font-serif">
                          {formatCurrency(item.preco)} un.
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-white/30 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-black/40 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                          className="px-2.5 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-3 text-xs font-bold text-white font-mono">
                          {item.quantidade}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                          className="px-2.5 py-1 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-sm font-bold font-serif text-white">
                        {formatCurrency(item.preco * item.quantidade)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 md:p-6 border-t border-white/10 bg-[#0c0c0c] relative z-10 space-y-4 shadow-2xl">
                {/* Total Row */}
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-widest text-white/50 font-sans font-medium">
                      Subtotal
                    </span>
                    <span className="font-serif text-lg text-white font-semibold">
                      {formatCurrency(total)}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-sm font-bold uppercase tracking-wider text-gold-light font-sans">
                      Total a Pagar
                    </span>
                    <span className="font-serif text-2xl font-bold text-gold-main tracking-tight">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Info Note */}
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl text-emerald-400 text-[11px] font-sans">
                  <ShieldCheck size={16} className="shrink-0" />
                  <span>Pagamento via PIX • Pedido enviado diretamente ao WhatsApp</span>
                </div>

                {/* Finalizar Pedido Button */}
                <button
                  type="button"
                  onClick={checkoutWhatsApp}
                  className="button w-full py-4 bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)] uppercase tracking-widest text-xs font-bold font-sans transition-all duration-300 flex items-center justify-center gap-2.5 rounded-xl cursor-pointer"
                >
                  <MessageCircle size={18} />
                  <span>Finalizar Pedido no WhatsApp</span>
                  <ArrowRight size={16} />
                </button>

                {/* Clear Cart Option */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-white/30 hover:text-white/60 uppercase tracking-widest transition-colors font-sans font-medium underline"
                  >
                    Esvaziar sacola
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
