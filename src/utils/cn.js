import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names with Tailwind CSS conflict resolution
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility function to conditionally apply classes
 * @param {Object} conditions - Object with boolean conditions as keys and class strings as values
 * @returns {string} Conditional class names
 */
export function conditionalClasses(conditions) {
  const classes = Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .map(([className, _]) => className);
  
  return classes.join(' ');
}

/**
 * Utility function to create responsive classes
 * @param {Object} breakpoints - Object with breakpoint keys and class values
 * @returns {string} Responsive class names
 */
export function responsiveClasses(breakpoints) {
  return Object.entries(breakpoints)
    .map(([breakpoint, classes]) => {
      if (breakpoint === 'default') return classes;
      return `${breakpoint}:${classes}`;
    })
    .join(' ');
}