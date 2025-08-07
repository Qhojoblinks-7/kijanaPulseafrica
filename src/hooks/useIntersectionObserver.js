import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for intersection observer
 * @param {Object} options - Intersection observer options
 * @param {number} options.threshold - Threshold for triggering (0-1)
 * @param {string} options.rootMargin - Root margin for the observer
 * @param {boolean} options.triggerOnce - Whether to trigger only once
 * @returns {Object} - { ref, isIntersecting, hasIntersected }
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = false,
  root = null
} = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const handleIntersection = useCallback((entries) => {
    const [entry] = entries;
    
    if (entry.isIntersecting) {
      setIsIntersecting(true);
      if (!hasIntersected) {
        setHasIntersected(true);
      }
    } else if (!triggerOnce) {
      setIsIntersecting(false);
    }
  }, [triggerOnce, hasIntersected]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
      root
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [handleIntersection, threshold, rootMargin, root]);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected
  };
};

/**
 * Hook for lazy loading images
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image URL
 * @returns {Object} - { ref, src: currentSrc, isLoading, hasLoaded }
 */
export const useLazyImage = (src, placeholder = '') => {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (isIntersecting && src) {
      setIsLoading(true);
      const img = new Image();
      
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
        setHasLoaded(true);
      };
      
      img.onerror = () => {
        setIsLoading(false);
        // Keep placeholder on error
      };
      
      img.src = src;
    }
  }, [isIntersecting, src]);

  return {
    ref,
    src: currentSrc,
    isLoading,
    hasLoaded
  };
};

/**
 * Hook for infinite scroll
 * @param {Function} loadMore - Function to load more data
 * @param {boolean} hasMore - Whether there's more data to load
 * @param {boolean} isLoading - Whether currently loading
 * @returns {Object} - { ref, isIntersecting }
 */
export const useInfiniteScroll = (loadMore, hasMore, isLoading) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore();
    }
  }, [isIntersecting, hasMore, isLoading, loadMore]);

  return { ref, isIntersecting };
};

/**
 * Hook for scroll-based animations
 * @param {Object} options - Animation options
 * @returns {Object} - { ref, isVisible, progress }
 */
export const useScrollAnimation = (options = {}) => {
  const [progress, setProgress] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin: options.rootMargin || '0px'
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      const visibleHeight = Math.min(
        Math.max(0, windowHeight - rect.top),
        elementHeight
      );
      
      const progress = Math.min(1, visibleHeight / elementHeight);
      setProgress(progress);
    };

    if (isIntersecting) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial calculation
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isIntersecting, ref]);

  return {
    ref,
    isVisible: isIntersecting,
    progress
  };
};