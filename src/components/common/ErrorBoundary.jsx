import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    resetErrorBoundary();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gamepulse-dark to-gamepulse-blue-dark p-4">
      <div className="max-w-md w-full bg-white dark:bg-neutral-dark-gray rounded-xl shadow-2xl p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-error-red/10 rounded-full flex items-center justify-center mb-4">
            <FaExclamationTriangle className="text-error-red text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-black dark:text-white mb-2">
            Oops! Something went wrong
          </h1>
          <p className="text-neutral-medium-gray dark:text-neutral-light-gray">
            We're sorry, but something unexpected happened. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-neutral-dark-gray dark:text-neutral-light-gray mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs bg-neutral-light-gray dark:bg-neutral-black p-3 rounded overflow-auto max-h-32">
              {error.message}
            </pre>
          </details>
        )}

        <div className="space-y-3">
          <button
            onClick={resetErrorBoundary}
            className="w-full bg-gamepulse-blue hover:bg-gamepulse-blue-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaRedo className="text-sm" />
            Try Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-neutral-light-gray hover:bg-neutral-medium-gray dark:bg-neutral-black dark:hover:bg-neutral-dark-gray text-neutral-dark-gray dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaHome className="text-sm" />
            Go to Homepage
          </button>
          
          <button
            onClick={handleRefresh}
            className="w-full border border-neutral-medium-gray hover:bg-neutral-light-gray dark:border-neutral-medium-gray dark:hover:bg-neutral-black text-neutral-dark-gray dark:text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-light-gray dark:border-neutral-medium-gray">
          <p className="text-xs text-neutral-medium-gray dark:text-neutral-light-gray">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}

function ErrorBoundary({ children }) {
  const handleError = (error, errorInfo) => {
    // Log error to your error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can send this to your error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;