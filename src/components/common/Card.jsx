import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({
  children,
  className,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = false,
  interactive = false,
  onClick,
  ...props
}, ref) => {
  const baseClasses = 'bg-white dark:bg-neutral-dark-gray rounded-lg border border-neutral-light-gray dark:border-neutral-medium-gray transition-all duration-200';
  
  const variants = {
    default: 'bg-white dark:bg-neutral-dark-gray',
    elevated: 'bg-white dark:bg-neutral-dark-gray shadow-lg',
    outlined: 'bg-transparent border-2 border-gamepulse-blue/20',
    gradient: 'bg-gradient-to-br from-gamepulse-blue/5 to-gamepulse-yellow/5 border-gamepulse-blue/20'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const cardClasses = cn(
    baseClasses,
    variants[variant],
    paddingClasses[padding],
    shadowClasses[shadow],
    hover && 'hover:shadow-lg hover:-translate-y-1',
    interactive && 'cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-95',
    className
  );
  
  const Component = interactive || onClick ? motion.div : 'div';
  
  return (
    <Component
      ref={ref}
      className={cardClasses}
      onClick={onClick}
      whileHover={interactive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

const CardHeader = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between mb-4', className)}
    {...props}
  >
    {children}
  </div>
));

const CardTitle = React.forwardRef(({
  children,
  className,
  as: Component = 'h3',
  ...props
}, ref) => (
  <Component
    ref={ref}
    className={cn('text-lg font-semibold text-neutral-black dark:text-white', className)}
    {...props}
  >
    {children}
  </Component>
));

const CardSubtitle = React.forwardRef(({
  children,
  className,
  as: Component = 'p',
  ...props
}, ref) => (
  <Component
    ref={ref}
    className={cn('text-sm text-neutral-medium-gray dark:text-neutral-light-gray', className)}
    {...props}
  >
    {children}
  </Component>
));

const CardContent = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('space-y-4', className)}
    {...props}
  >
    {children}
  </div>
));

const CardFooter = React.forwardRef(({
  children,
  className,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between pt-4 border-t border-neutral-light-gray dark:border-neutral-medium-gray', className)}
    {...props}
  >
    {children}
  </div>
));

const CardImage = React.forwardRef(({
  src,
  alt,
  className,
  ...props
}, ref) => (
  <img
    ref={ref}
    src={src}
    alt={alt}
    className={cn('w-full h-48 object-cover rounded-t-lg', className)}
    {...props}
  />
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardSubtitle.displayName = 'CardSubtitle';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardContent,
  CardFooter,
  CardImage
};