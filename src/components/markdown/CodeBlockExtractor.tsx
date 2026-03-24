import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaPlay } from 'react-icons/fa';

const CodeBlockExtractor = ({ language, value, onRunCode }) => {
  // Map language identifiers to standardized ones
  const normalizedLanguage = {
    'js': 'javascript',
    'javascript': 'javascript',
    'html': 'html',
    'css': 'css'
  }[language] || language;
  
  const handleRunCode = () => {
    onRunCode({
      code: value,
      language: normalizedLanguage
    });
  };

  return (
    <div className="code-block my-4 relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleRunCode}
          className="run-button flex items-center gap-1.5"
          title={`Run ${normalizedLanguage.toUpperCase()} code`}
        >
          <FaPlay size={12} />
          <span>Run</span>
        </button>
      </div>
      
      <SyntaxHighlighter
        style={atomDark}
        language={normalizedLanguage}
        PreTag="div"
        className="rounded"
        customStyle={{
          backgroundColor: '#2d2d2d',
          borderRadius: '0.375rem',
          padding: '1rem',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlockExtractor;