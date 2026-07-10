import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, HelpCircle, ArrowLeft, Camera, Check, Settings } from 'lucide-react';

const defaultBack = '/assets/tarot_card_back_1782745573805.jpg';
const defaultMulher = '/assets/lenormand_mulher_1782751746615.jpg';
const defaultBuque = '/assets/lenormand_buque_1782751758548.jpg';
const defaultUrso = '/assets/lenormand_urso_1782751772227.jpg';

interface CartaSemanaProps {
  onBack: () => void;
}

const cartasDataStatic = {
  1: {
    id: 1,
    titulo: "Carta 1 | A Mulher",
    nome: "A Mulher",
    texto: "A Mulher convida você a entrar em contato com a sua própria receptividade, intuição e autocuidado. Esta semana, o foco principal está em olhar para si mesma com acolhimento, reconhecendo suas necessidades emocionais e honrando sua essência feminina. É um lembrete para não se deixar em segundo plano diante das demandas externas.",
    reflexao: "Pergunta para a semana: qual espaço eu tenho guardado na minha rotina para ouvir o que meu próprio corpo e sentimentos estão pedindo?"
  },
  2: {
    id: 2,
    titulo: "Carta 2 | O Buquê",
    nome: "O Buquê",
    texto: "O Buquê traz um sopro de leveza, alegria e gratidão para os seus próximos dias. Esta carta indica que pequenos momentos de beleza, gestos gentis ou surpresas agradáveis estão prontos para se manifestar. Permita-se receber as dádivas da vida e celebre as pequenas vitórias cotidianas com o coração aberto.",
    reflexao: "Pergunta para a semana: quais pequenos motivos de contentamento e beleza eu posso celebrar hoje ao meu redor?"
  },
  3: {
    id: 3,
    titulo: "Carta 3 | O Urso",
    nome: "O Urso",
    texto: "O Urso traz a energia do poder pessoal, da autoproteção e da definição de limites saudáveis. Esta semana convida você a se fortalecer internamente, agir com firmeza e proteger o seu território emocional. Lembre-se de usar sua força com sabedoria, sem acumular sobrecargas ou agir com agressividade desnecessária.",
    reflexao: "Pergunta para a semana: onde eu preciso colocar limites claros para preservar minha energia e meu espaço pessoal?"
  }
} as const;

export const CartaSemana: React.FC<CartaSemanaProps> = ({ onBack }) => {
  const [selectedCard, setSelectedCard] = useState<1 | 2 | 3 | null>(null);
  const [flipping, setFlipping] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // States for images with custom gypsy card defaults
  const [imgBack, setImgBack] = useState('/assets/baralho_cigano_verso.jpg');
  const [imgMulher, setImgMulher] = useState('/assets/baralho_cigano_carta1.jpg');
  const [imgBuque, setImgBuque] = useState('/assets/baralho_cigano_carta2.jpg');
  const [imgUrso, setImgUrso] = useState('/assets/baralho_cigano_carta3.jpg');

  // Check if any custom image is successfully loaded (not using the fallback)
  const isCustomBack = imgBack === '/assets/baralho_cigano_verso.jpg';
  const isCustomMulher = imgMulher === '/assets/baralho_cigano_carta1.jpg';
  const isCustomBuque = imgBuque === '/assets/baralho_cigano_carta2.jpg';
  const isCustomUrso = imgUrso === '/assets/baralho_cigano_carta3.jpg';

  const getCardImage = (num: 1 | 2 | 3) => {
    if (num === 1) return imgMulher;
    if (num === 2) return imgBuque;
    return imgUrso;
  };

  const handleSelectCard = (num: 1 | 2 | 3) => {
    if (selectedCard === num) return;
    setFlipping(true);
    setSelectedCard(num);
    // Smooth scroll down to details after transition
    setTimeout(() => {
      setFlipping(false);
      const el = document.getElementById('mensagem-revelada');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 450);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 select-none">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gold-main/60 hover:text-gold-light text-xs uppercase tracking-widest mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Voltar ao início
      </button>

      {/* Header Info */}
      <div className="text-center space-y-4 mb-12">
        <p className="text-[11px] font-mono tracking-[0.4em] text-gold-main uppercase">
          Experiência Posição™
        </p>
        <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-gold-light font-normal tracking-wide">
          Carta da Semana
        </h2>
        <p className="text-white/60 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
          Respire fundo, silencie a mente por alguns segundos e escolha a carta que mais chamou sua atenção.
        </p>
        <p className="text-[11px] tracking-wider text-white/30 font-mono">
          Semana de 29 de Junho de 2026
        </p>
      </div>

      {/* Gypsy Card Customization Helper Panel */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] rounded-xl transition-all">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full px-5 py-4 flex items-center justify-between text-left text-xs uppercase tracking-widest text-gold-main/80 hover:text-gold-light"
          >
            <div className="flex items-center gap-2 font-mono">
              <Settings size={14} className="animate-spin-slow" />
              <span>Como incluir fotos reais do seu Baralho Cigano</span>
            </div>
            <span className="text-white/40">{showInstructions ? '▲ Ocultar' : '▼ Visualizar instruções'}</span>
          </button>
          
          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4 text-xs font-light text-white/70 leading-relaxed">
                  <p>
                    Para usar as fotos reais do seu próprio <strong>Baralho Cigano</strong> no portal, basta fazer o upload dos arquivos de imagem para a pasta <code>/public/assets/</code> com os nomes exatos listados abaixo:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-start gap-2">
                      <Camera size={14} className="text-gold-main mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Verso das Cartas</strong>
                        <code className="text-gold-light font-mono text-[10px] block mt-0.5">baralho_cigano_verso.jpg</code>
                        <span className="text-[10px] text-white/40">Se presente, substitui o verso padrão</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-start gap-2">
                      <Camera size={14} className="text-gold-main mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Carta 1 - O Sol</strong>
                        <code className="text-gold-light font-mono text-[10px] block mt-0.5">baralho_cigano_carta1.jpg</code>
                        <span className="text-[10px] text-white/40">Se presente, substitui a imagem do Sol</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-start gap-2">
                      <Camera size={14} className="text-gold-main mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Carta 2 - A Força</strong>
                        <code className="text-gold-light font-mono text-[10px] block mt-0.5">baralho_cigano_carta2.jpg</code>
                        <span className="text-[10px] text-white/40">Se presente, substitui a imagem da Força</span>
                      </div>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-lg flex items-start gap-2">
                      <Camera size={14} className="text-gold-main mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-white">Carta 3 - A Roda da Fortuna</strong>
                        <code className="text-gold-light font-mono text-[10px] block mt-0.5">baralho_cigano_carta3.jpg</code>
                        <span className="text-[10px] text-white/40">Se presente, substitui a Roda da Fortuna</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/50 border-t border-white/5 pt-3 italic">
                    💡 <strong>Como funciona o sistema inteligente de fallback:</strong> Se você não enviar as imagens ou se algum arquivo estiver faltando, o portal detectará isso automaticamente e continuará exibindo as nossas belas e elegantes cartas artísticas padrão! Você não corre risco de quebrar o visual em momento algum.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid of 3 Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-16">
        {([1, 2, 3] as const).map((num) => {
          const isSelected = selectedCard === num;
          const cardInfo = cartasDataStatic[num];
          const currentCardImage = getCardImage(num);

          return (
            <div key={num} className="perspective-1000">
              <motion.button
                onClick={() => handleSelectCard(num)}
                whileHover={{ y: isSelected ? 0 : -6 }}
                animate={{
                  rotateY: isSelected ? 180 : 0,
                  scale: isSelected ? 1.03 : 1.0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`w-full aspect-[3/4.4] rounded-2xl border cursor-pointer overflow-hidden transition-shadow relative transform-style-3d shadow-xl ${
                  isSelected 
                    ? 'border-gold-main/60 shadow-[0_0_20px_rgba(201,169,97,0.25)]' 
                    : 'border-white/10 hover:border-gold-main/40 hover:shadow-black/50 shadow-black/30'
                }`}
                style={{
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
                }}
              >
                {/* Back of Card (Shown when rotateY < 90) */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-between p-4 bg-[#111111]"
                  style={{ transform: 'rotateY(0deg)' }}
                >
                  <img 
                    src={imgBack} 
                    alt="Verso da Carta" 
                    referrerPolicy="no-referrer"
                    onError={() => setImgBack(defaultBack)}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity hover:opacity-100"
                  />
                  
                  {/* Subtle vector frame overlay */}
                  <div className="absolute inset-2 border border-gold-main/15 rounded-xl pointer-events-none" />
                  
                  {/* Elegant Central ID */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
                    <span className="serif text-3xl md:text-4xl text-gold-main/70 font-serif">
                      {num}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-light">
                      Escolher
                    </span>
                  </div>
                </div>

                {/* Front of Card (Shown when rotateY >= 90) */}
                <div 
                  className="absolute inset-0 w-full h-full backface-hidden bg-[#0c0c0c]"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <img 
                    src={currentCardImage} 
                    alt={cardInfo.nome} 
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (num === 1) setImgMulher(defaultMulher);
                      else if (num === 2) setImgBuque(defaultBuque);
                      else setImgUrso(defaultUrso);
                    }}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle overlay name */}
                  <div className="absolute bottom-3 inset-x-2 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-gold-light/90 font-mono drop-shadow">
                      {cardInfo.nome}
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Revealing Section */}
      <AnimatePresence mode="wait">
        {selectedCard && !flipping && (
          <motion.div
            id="mensagem-revelada"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl mx-auto glass-card p-6 sm:p-10 border border-gold-main/20 bg-gold-main/[0.01] rounded-2xl relative"
          >
            {/* Ambient Background Glow inside detail */}
            <div className="absolute -inset-px bg-gradient-to-r from-gold-main/10 to-transparent opacity-30 rounded-2xl pointer-events-none blur-sm" />

            <div className="relative z-10 space-y-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-4 border-b border-white/5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold-main font-semibold block mb-1">
                    Sua mensagem da semana
                  </span>
                  <h3 className="serif text-2xl sm:text-3xl text-gold-light font-serif">
                    {cartasDataStatic[selectedCard].titulo}
                  </h3>
                </div>
                
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-white/30 hover:text-gold-main transition-colors text-[10px] uppercase tracking-wider border border-white/10 hover:border-gold-main/30 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <RefreshCw size={11} /> Baralhar
                </button>
              </div>

              {/* Real Image Reveal - Centered with original aspect ratio */}
              <div className="flex justify-center py-2">
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-48 sm:w-56 aspect-[3/4] rounded-xl overflow-hidden border border-gold-main/30 shadow-[0_8px_25px_rgba(0,0,0,0.6)] bg-black"
                >
                  <img
                    src={getCardImage(selectedCard)}
                    alt={cartasDataStatic[selectedCard].nome}
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (selectedCard === 1) setImgMulher(defaultMulher);
                      else if (selectedCard === 2) setImgBuque(defaultBuque);
                      else setImgUrso(defaultUrso);
                    }}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <div className="space-y-4">
                <p className="text-white/80 font-light leading-relaxed text-sm sm:text-base">
                  {cartasDataStatic[selectedCard].texto}
                </p>

                {/* Reflection box */}
                <div className="p-5 bg-gold-main/[0.02] border-l border-gold-main/30 rounded-r-xl text-left">
                  <div className="flex items-center gap-2 text-gold-main/70 mb-2">
                    <HelpCircle size={15} />
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">Reflexão Prática</span>
                  </div>
                  <p className="text-xs text-gold-light leading-relaxed font-light">
                    {cartasDataStatic[selectedCard].reflexao}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer disclaimer */}
      <p className="text-center text-white/35 text-[11px] leading-relaxed max-w-md mx-auto mt-12 font-light">
        Esta mensagem é simbólica e reflexiva. Use como um convite para olhar para dentro com mais carinho e clareza.
      </p>
    </div>
  );
};
