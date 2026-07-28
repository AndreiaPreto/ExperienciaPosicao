export const formatWhatsAppNumber = (phone: string): string => {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, '');
  if (!cleaned) return '';

  if (cleaned.startsWith('55') && cleaned.length >= 12) {
    cleaned = cleaned.slice(2);
  }

  if (cleaned.length === 11) {
    const ddd = parseInt(cleaned.slice(0, 2), 10);
    const usesNinthDigitInWhatsApp = ddd >= 11 && ddd <= 28;
    if (!usesNinthDigitInWhatsApp) {
      cleaned = cleaned.slice(0, 2) + cleaned.slice(3);
    }
  }

  return `55${cleaned}`;
};

export const WHATSAPP_NUM = (import.meta as any).env.VITE_WHATSAPP_NUM || '5548991261832';
export const WHATSAPP_GROUP_URL = (import.meta as any).env.VITE_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/invite/experienciaposicao';
export const PIX_CHAVE = (import.meta as any).env.VITE_PIX_CHAVE || '48991261832';
export const PIX_TITULAR = (import.meta as any).env.VITE_PIX_TITULAR || 'Andreia Preto';

export const msgPix = (produto: string, preco: string) =>
  encodeURIComponent(
    `Olá! Acabei de fazer o pagamento via PIX do *${produto}* (${preco}) e estou enviando o comprovante. 🌿`
  );

export const msgCartao = (produto: string, preco: string) =>
  encodeURIComponent(
    `Olá! Gostaria de comprar o *${produto}* (${preco}) via cartão de crédito. Pode me enviar o link de pagamento? ✨`
  );
