// src/components/Logo.tsx — nome atualizado para Experiência Posição
import React from 'react';

export const Logo = React.memo(() => (
  <div className="mb-6 text-center">
    <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans mb-1">
      Alinhamento de Frequência
    </p>
    <h1 className="font-serif text-4xl font-semibold text-gold-light tracking-tight leading-none">
      Experiência Posição
    </h1>
  </div>
));

Logo.displayName = 'Logo';
