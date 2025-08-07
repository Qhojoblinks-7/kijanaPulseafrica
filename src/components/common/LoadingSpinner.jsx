import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'primary', 
  className,
  text = 'Loading...',
  showText = false 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'border-gamepulse-blue',
    secondary: 'border-gamepulse-yellow',
    white: 'border-white',
    dark: 'border-neutral-dark-gray'
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <motion.div
        className={cn(
          "border-2 border-transparent rounded-full",
          sizeClasses[size],
          variantClasses[variant],
          "border-t-current"
        )}
        variants={spinnerVariants}
        animate="animate"
      />
      {showText && text && (
        <motion.p
          className="mt-3 text-sm text-neutral-medium-gray dark:text-neutral-light-gray font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Page loading component
export const PageLoader = ({ message = "Loading page..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gamepulse-dark to-gamepulse-blue-dark">
    <div className="text-center">
      <LoadingSpinner size="xl" variant="white" showText text={message} />
    </div>
  </div>
);

// Inline loading component
export const InlineLoader = ({ size = 'sm', variant = 'primary' }) => (
  <LoadingSpinner size={size} variant={variant} />
);

// Button loading component
export const ButtonLoader = ({ size = 'sm', variant = 'white' }) => (
  <LoadingSpinner size={size} variant={variant} />
);

// Skeleton loading component
export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      "animate-pulse bg-neutral-light-gray dark:bg-neutral-medium-gray rounded",
      className
    )}
    {...props}
  />
);

// Card skeleton
export const CardSkeleton = () => (
  <div className="bg-white dark:bg-neutral-dark-gray rounded-lg shadow-md p-6">
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);

// List skeleton
export const ListSkeleton = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
);

export default LoadingSpinner;