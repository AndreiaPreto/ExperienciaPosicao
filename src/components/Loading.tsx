// src/components/Loading.tsx — corrigido bg-earth-950 → bg-deep-black
import React from 'react';

export const Loading = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-deep-black gap-6">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border-2 border-gold-main/15 rounded-full" />
      <div className="absolute inset-0 border-2 border-gold-main rounded-full border-t-transparent animate-spin" />
    </div>
    <p className="text-[9px] uppercase tracking-[0.4em] text-gold-main/30 font-sans">
      Carregando
    </p>
  </div>
);
