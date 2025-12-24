import React from 'react';

interface NaturalTagProps {
  children: React.ReactNode;
  variant?: 'success' | 'primary' | 'secondary' | 'warning' | 'info';
  size?: 'sm' | 'md';
  className?: string;
  onRemove?: () => void;
}

export function NaturalTag({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onRemove
}: NaturalTagProps) {
  const variants = {
    success: 'bg-[var(--vert-feuille)] text-white',
    primary: 'bg-[var(--terre-brique)] text-white',
    secondary: 'bg-[var(--ocre-doux)] text-[var(--bleu-nuit)]',
    warning: 'bg-orange-400 text-white',
    info: 'bg-blue-500 text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg transition-all duration-200 hover:scale-105 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          type="button"
        >
          ×
        </button>
      )}
    </span>
  );
}
