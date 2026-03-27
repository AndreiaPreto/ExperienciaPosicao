import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

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
    <h2 className="serif text-xl font-medium text-gold-light mb-2">{title}</h2>
    <p className="text-text-main/80 text-sm mb-4">{description}</p>
    {link ? (
      <Link 
        to={link}
        className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
      >
        {buttonText}
      </Link>
    ) : (
      <button 
        onClick={onClick}
        className={variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
      >
        {buttonText}
      </button>
    )}
  </motion.div>
));

Card.displayName = 'Card';
