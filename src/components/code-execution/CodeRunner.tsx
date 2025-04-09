import React, { useState, useEffect } from 'react';
import HtmlPreview from './HtmlPreview';
import JsExecutor from './JsExecutor';

const CodeRunner = ({ lastExecuted }) => {
  const [activeCode, setActiveCode] = useState({
    html: '',
    css: '',
    js: ''
  });
  
  // Process code blocks when they change
  useEffect(() => {
    if (lastExecuted) {
      const { code, language } = lastExecuted;
      
      // Update the appropriate code section
      if (language === 'html') {
        setActiveCode(prev => ({ ...prev, html: code }));
      } else if (language === 'css') {
        setActiveCode(prev => ({ ...prev, css: code }));
      } else if (language === 'javascript') {
        setActiveCode(prev => ({ ...prev, js: code }));
      }
    }
  }, [lastExecuted]);

  return (
    <div className="code-runner">
      {!lastExecuted ? (
        <div className="text-dark-text-secondary italic">
          Run a code snippet to see its output here
        </div>
      ) : (
        <>
          {(activeCode.html || activeCode.css) && (
            <HtmlPreview 
              htmlContent={activeCode.html}
              cssContent={activeCode.css}
              jsContent={activeCode.js}
            />
          )}
          
          {lastExecuted?.language === 'javascript' && (
            <JsExecutor code={activeCode.js} />
          )}
        </>
      )}
    </div>
  );
};

export default CodeRunner;