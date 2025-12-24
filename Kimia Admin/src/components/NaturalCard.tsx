import React from 'react';

interface NaturalCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function NaturalCard({
  children,
  className = '',
  onClick,
  hoverable = false
}: NaturalCardProps) {
  const hoverStyles = hoverable || onClick
    ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
    : '';
  
  return (
    <div
      onClick={onClick}
      className={`bg-card rounded-2xl p-6 shadow-md transition-all duration-300 ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  );
}

interface NaturalCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function NaturalCardHeader({ children, className = '' }: NaturalCardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface NaturalCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function NaturalCardTitle({ children, className = '' }: NaturalCardTitleProps) {
  return (
    <h3 className={`text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] ${className}`}>
      {children}
    </h3>
  );
}

interface NaturalCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function NaturalCardContent({ children, className = '' }: NaturalCardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface NaturalCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function NaturalCardFooter({ children, className = '' }: NaturalCardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-border ${className}`}>
      {children}
    </div>
  );
}
