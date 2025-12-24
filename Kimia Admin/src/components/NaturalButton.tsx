import React from 'react';

interface NaturalButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function NaturalButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon
}: NaturalButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 button-text disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-[var(--terre-brique)] text-white hover:bg-[var(--terre-brique-hover)] hover:shadow-lg hover:scale-105 active:scale-100 shadow-md',
    secondary: 'bg-[var(--ocre-doux)] text-[var(--bleu-nuit)] hover:bg-[var(--ocre-doux-dark)] hover:shadow-md hover:scale-105 active:scale-100',
    success: 'bg-[var(--vert-feuille)] text-white hover:bg-[var(--vert-feuille-light)] hover:shadow-lg hover:scale-105 active:scale-100 shadow-md',
    ghost: 'bg-transparent text-[var(--bleu-nuit)] hover:bg-[var(--ocre-doux)] hover:scale-105 active:scale-100',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90 hover:shadow-lg hover:scale-105 active:scale-100 shadow-md'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick && !disabled) {
      // Ripple effect
      const button = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = 'absolute rounded-full bg-white opacity-30 pointer-events-none';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      onClick();
    }
  };
  
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
