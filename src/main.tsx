import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Silencing Vite WebSocket errors in development environment
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && event.reason.message.includes('WebSocket')) {
      event.preventDefault();
    }
  });

  // Dynamically configure the fixed WhatsApp button from index.html using the env variable
  setTimeout(() => {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
      const num = (import.meta as any).env.VITE_WHATSAPP_NUM || '5548991261832';
      whatsappBtn.setAttribute('href', `https://wa.me/${num}?text=Olá!%20Vim%20pelo%20site%20Experiência%20Posição%20e%20gostaria%20de%20saber%20mais.`);
    }
  }, 100);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
