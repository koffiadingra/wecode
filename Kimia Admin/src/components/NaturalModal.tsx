import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { NaturalButton } from './NaturalButton';

interface NaturalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export function NaturalModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true
}: NaturalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--bleu-nuit)] bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl animate-slide-up`}>
        {/* Header */}
        <div className="sticky top-0 bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] px-6 py-4 border-b border-border rounded-t-2xl flex items-center justify-between">
          <h2 className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">{title}</h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] hover:text-[var(--terre-brique)] transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmModalProps) {
  return (
    <NaturalModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <p className="text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <NaturalButton variant="ghost" onClick={onClose}>
            {cancelText}
          </NaturalButton>
          <NaturalButton
            variant={variant === 'danger' ? 'destructive' : 'primary'}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </NaturalButton>
        </div>
      </div>
    </NaturalModal>
  );
}
