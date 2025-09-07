import React from 'react';

// --- Icon Component ---
export const Icon = ({ name, className = "w-6 h-6" }) => (
  <i data-lucide={name} className={className}></i>
);

// --- Card Component ---
export const Card = ({ children, className = '' }) => (
    <div className={`bg-light-surface dark:bg-dark-surface rounded-lg border border-light-border dark:border-dark-border ${className}`}>
        {children}
    </div>
);

// --- Button Component ---
export const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '' }) => {
    const baseStyle = "px-6 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg";
    const sizeStyles = {
        md: "text-base",
        lg: "text-lg px-8 py-3",
    };
    const variantStyles = {
        primary: "bg-brand-green text-white hover:bg-green-600 focus:ring-green-500",
        secondary: "bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };
    return (
        <button onClick={onClick} className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
            {children}
        </button>
    );
};


// --- Switch Component ---
export const Switch = ({ checked, onCheckedChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 ${
      checked ? 'bg-brand-green' : 'bg-gray-300 dark:bg-dark-border'
    }`}
  >
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
);


// --- Slider Component ---
export const Slider = ({ value, onValueChange, min, max, step, disabled = false }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(parseFloat(event.target.value));
    };

    return (
        <div className="flex items-center gap-2">
            <Icon name="volume-1" className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className="w-full h-2 bg-gray-200 dark:bg-dark-border rounded-lg appearance-none cursor-pointer disabled:opacity-50"
            />
            <Icon name="volume-2" className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
        </div>
    );
};