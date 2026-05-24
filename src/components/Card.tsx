// src/components/Card.tsx
// ✅ CORRIGIDO: btn-primary/btn-secondary → button/button-outline
// ✅ .card já usa rounded-lg via index.css — nenhuma mudança de radius aqui
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  onClick?: () => void;
  link?: string;
  variant?: 'primary' | 'secondary';
}

export const Card = React.memo(({ title, description, buttonText, onClick, link, variant = 'primary' }: CardProps) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="card"
  >
    <h2 className="font-serif text-xl text-gold-light mb-2">{title}</h2>
    <p className="text-white/50 text-sm font-light leading-relaxed mb-6">{description}</p>
    {link ? (
      <Link
        to={link}
        /* ✅ button (rounded-lg) ou button-outline — sem btn-primary */
        className={variant === 'primary' ? 'button' : 'button-outline'}
      >
        {buttonText}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className={variant === 'primary' ? 'button' : 'button-outline'}
      >
        {buttonText}
      </button>
    )}
  </motion.div>
));

Card.displayName = 'Card';
