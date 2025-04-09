import React, { useState, useEffect, useRef } from 'react';
import { createConsoleCapture } from '../../utils/consoleCapture';

const JsExecutor = ({ code }) => {
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [error, setError] = useState(null);
  const consoleEndRef = useRef(null);
  
  useEffect(() => {
    // Auto scroll to the bottom when console output changes
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleOutput]);

  const executeJs = () => {
    setConsoleOutput([]);
    setError(null);
    
    // Capture console output
    const handleLog = (type, args) => {
      if (type === 'clear') {
        setConsoleOutput([]);
        return;
      }
      
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      }).join(' ');
      
      setConsoleOutput(prev => [...prev, { type, content: formattedArgs }]);
    };
    
    const consoleCapture = createConsoleCapture(handleLog);
    
    try {
      // Apply console proxy
      consoleCapture.apply();
      
      // Execute the code in a try-catch block
      new Function(code)();
    } catch (err) {
      setError(err.toString());
      setConsoleOutput(prev => [...prev, { 
        type: 'error', 
        content: `${err.name}: ${err.message}` 
      }]);
    } finally {
      // Restore original console
      consoleCapture.restore();
    }
  };

  useEffect(() => {
    if (code) {
      executeJs();
    }
  }, [code]);

  return (
    <div className="js-executor mt-4">
      <h3 className="text-md text-neon-blue mb-2">Console Output</h3>
      <div className="console-output h-64 overflow-y-auto">
        {consoleOutput.length > 0 ? (
          consoleOutput.map((entry, index) => (
            <div 
              key={index} 
              className={`console-entry mb-1 ${
                entry.type === 'error' ? 'console-error' : 
                entry.type === 'warn' ? 'console-warning' : 
                entry.type === 'info' ? 'console-info' : ''
              }`}
            >
              <span className="opacity-70">&gt; </span>
              <pre className="inline font-mono whitespace-pre-wrap">{entry.content}</pre>
            </div>
          ))
        ) : (
          <div className="text-dark-text-secondary italic">
            No console output yet
          </div>
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  );
};

export default JsExecutor;