/**
 * Creates a proxy object that captures console methods
 * @param {Function} onLog - Callback function for captured logs
 * @returns {Object} - The proxied console object
 */
export const createConsoleCapture = (onLog) => {
    // Original console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      clear: console.clear
    };
    
    // Create a proxy to intercept console calls
    const consoleProxy = {
      log: (...args) => {
        onLog('log', args);
        originalConsole.log(...args);
      },
      error: (...args) => {
        onLog('error', args);
        originalConsole.error(...args);
      },
      warn: (...args) => {
        onLog('warn', args);
        originalConsole.warn(...args);
      },
      info: (...args) => {
        onLog('info', args);
        originalConsole.info(...args);
      },
      debug: (...args) => {
        onLog('debug', args);
        originalConsole.debug(...args);
      },
      clear: () => {
        onLog('clear');
        originalConsole.clear();
      }
    };
    
    return {
      proxy: consoleProxy,
      restore: () => {
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.info = originalConsole.info;
        console.debug = originalConsole.debug;
        console.clear = originalConsole.clear;
      },
      apply: () => {
        console.log = consoleProxy.log;
        console.error = consoleProxy.error;
        console.warn = consoleProxy.warn;
        console.info = consoleProxy.info;
        console.debug = consoleProxy.debug;
        console.clear = consoleProxy.clear;
      }
    };
  };