import React from 'react';

interface NaturalInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
  error?: string;
  name?: string;
}

export function NaturalInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  icon,
  label,
  error,
  name
}: NaturalInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--bleu-nuit)] opacity-50">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          name={name}
          className={`w-full rounded-xl bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] px-4 py-3 ${
            icon ? 'pl-12' : ''
          } text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] placeholder:text-[var(--bleu-nuit)] placeholder:opacity-50 dark:placeholder:text-[var(--ocre-doux)] dark:placeholder:opacity-50 border-2 border-transparent focus:border-[var(--terre-brique)] focus:outline-none transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

interface NaturalTextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  rows?: number;
  name?: string;
}

export function NaturalTextarea({
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  label,
  error,
  rows = 4,
  name
}: NaturalTextareaProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        name={name}
        className="w-full rounded-xl bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] px-4 py-3 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] placeholder:text-[var(--bleu-nuit)] placeholder:opacity-50 dark:placeholder:text-[var(--ocre-doux)] dark:placeholder:opacity-50 border-2 border-transparent focus:border-[var(--terre-brique)] focus:outline-none transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed resize-none"
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}

interface NaturalSelectProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  children: React.ReactNode;
  name?: string;
}

export function NaturalSelect({
  value,
  onChange,
  disabled = false,
  className = '',
  label,
  error,
  children,
  name
}: NaturalSelectProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className="w-full rounded-xl bg-[var(--ocre-doux)] dark:bg-[var(--bleu-nuit-light)] px-4 py-3 text-[var(--bleu-nuit)] dark:text-[var(--ocre-doux)] border-2 border-transparent focus:border-[var(--terre-brique)] focus:outline-none transition-all duration-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer"
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
