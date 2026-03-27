import React from 'react';

export const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-earth-950">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-gold-900/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent animate-spin" />
    </div>
  </div>
);
