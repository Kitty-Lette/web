export function suppressWalletExtensionErrors() {
  if (typeof window === 'undefined') return;

  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  const stringifyError = (obj: any): string => {
    try {
      if (typeof obj === 'string') return obj;
      if (obj && typeof obj === 'object') {
        if (obj.message) return String(obj.message);
        if (obj.toString && typeof obj.toString === 'function') return obj.toString();
        return JSON.stringify(obj);
      }
      return String(obj);
    } catch {
      return '[object Object]';
    }
  };

  const isWalletExtensionError = (obj: any): boolean => {
    const str = stringifyError(obj);
    return str.includes('Cannot set property ethereum') || 
           str.includes('pageProvider.js') ||
           str.includes('hpclkefagolihohboafpheddmmgdffjm') ||
           str.includes('coerceError') ||
           str.includes('onUnhandledRejection') ||
           str.includes('3a972_next_dist_0c51ee39') ||
           str === '[object Object]';
  };

  console.error = (...args) => {
    if (args.some(isWalletExtensionError)) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args) => {
    if (args.some(isWalletExtensionError)) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  const handleError = (event: ErrorEvent) => {
    if (isWalletExtensionError(event.error) || 
        isWalletExtensionError(event.message) ||
        event.filename?.includes('pageProvider.js') ||
        event.filename?.includes('hpclkefagolihohboafpheddmmgdffjm') ||
        event.filename?.includes('3a972_next_dist_0c51ee39')) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  };

  const handleRejection = (event: PromiseRejectionEvent) => {
    if (isWalletExtensionError(event.reason)) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      return false;
    }
  };

  const originalOnError = window.onerror;
  const originalOnUnhandledRejection = window.onunhandledrejection;

  window.onerror = (message, source, lineno, colno, error) => {
    if (isWalletExtensionError(error) || 
        isWalletExtensionError(message) ||
        source?.includes('pageProvider.js') ||
        source?.includes('hpclkefagolihohboafpheddmmgdffjm') ||
        source?.includes('3a972_next_dist_0c51ee39') ||
        String(message).includes('coerceError') ||
        String(message).includes('onUnhandledRejection')) {
      return true;
    }
    return originalOnError ? originalOnError(message, source, lineno, colno, error) : false;
  };

  window.onunhandledrejection = (event) => {
    if (isWalletExtensionError(event.reason)) {
      event.preventDefault();
      return true;
    }
    return originalOnUnhandledRejection ? originalOnUnhandledRejection.call(window, event) : false;
  };

  const originalAddEventListener = window.addEventListener;
  (window as any).addEventListener = function(type: string, listener: any, options?: any) {
    if (type === 'error' || type === 'unhandledrejection') {
      const wrappedListener = (event: any) => {
        const message = event.message || String(event.reason || '');
        if (isWalletExtensionError(message) ||
            isWalletExtensionError(event.error) ||
            isWalletExtensionError(event.reason)) {
          event.preventDefault && event.preventDefault();
          event.stopPropagation && event.stopPropagation();
          event.stopImmediatePropagation && event.stopImmediatePropagation();
          return false;
        }
        return listener(event);
      };
      return originalAddEventListener.call(this, type, wrappedListener, options);
    }
    return originalAddEventListener.call(this, type, listener, options);
  };

  window.addEventListener('error', handleError, true);
  window.addEventListener('unhandledrejection', handleRejection, true);

  return () => {
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    window.onerror = originalOnError;
    window.onunhandledrejection = originalOnUnhandledRejection;
    window.addEventListener = originalAddEventListener;
    window.removeEventListener('error', handleError, true);
    window.removeEventListener('unhandledrejection', handleRejection, true);
  };
}