// src/components/Logo.tsx — nome atualizado para Experiência Posição com imagem e fallback
import React, { useState } from 'react';

export const Logo = React.memo(() => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="mb-6 flex flex-col items-center text-center">
      {!hasError ? (
        <img 
          src="/assets/logo-experiencia-posicao.png" 
          alt="Experiência Posição" 
          className="h-44 sm:h-52 md:h-64 lg:h-72 w-auto mb-6 object-contain max-w-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <>
          <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans mb-1">
            Alinhamento de Frequência
          </p>
          <h1 className="font-serif text-4xl font-semibold text-gold-light tracking-tight leading-none">
            Experiência Posição
          </h1>
        </>
      )}
    </div>
  );
});

Logo.displayName = 'Logo';
