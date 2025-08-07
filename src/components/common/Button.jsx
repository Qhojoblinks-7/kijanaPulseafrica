import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ButtonLoader } from './LoadingSpinner';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  onClick,
  type = 'button',
  href,
  target,
  rel,
  icon,
  iconPosition = 'left',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white focus:ring-gamepulse-blue shadow-lg hover:shadow-xl',
    secondary: 'bg-gamepulse-yellow hover:bg-orange-500 text-neutral-black focus:ring-gamepulse-yellow shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gamepulse-blue text-gamepulse-blue hover:bg-gamepulse-blue hover:text-white focus:ring-gamepulse-blue',
    ghost: 'text-gamepulse-blue hover:bg-gamepulse-blue/10 focus:ring-gamepulse-blue',
    danger: 'bg-error-red hover:bg-red-700 text-white focus:ring-error-red shadow-lg hover:shadow-xl',
    success: 'bg-success-green hover:bg-green-600 text-white focus:ring-success-green shadow-lg hover:shadow-xl',
    dark: 'bg-neutral-dark-gray hover:bg-neutral-black text-white focus:ring-neutral-dark-gray shadow-lg hover:shadow-xl',
    light: 'bg-neutral-light-gray hover:bg-neutral-medium-gray text-neutral-dark-gray focus:ring-neutral-medium-gray'
  };
  
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };
  
  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };
  
  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  );
  
  const iconClasses = cn(
    iconSizes[size],
    iconPosition === 'left' ? 'mr-2' : 'ml-2'
  );
  
  const isDisabled = disabled || loading;
  
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  
  const content = (
    <>
      {loading && <ButtonLoader size="sm" variant="white" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className={iconClasses}>{icon}</span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className={iconClasses}>{icon}</span>
      )}
    </>
  );
  
  // If href is provided, render as anchor
  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={buttonClasses}
        onClick={handleClick}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }
  
  // Render as button
  return (
    <motion.button
      ref={ref}
      type={type}
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;