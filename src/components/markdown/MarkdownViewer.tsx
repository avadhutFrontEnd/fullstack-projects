import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeBlockExtractor from './CodeBlockExtractor';

const MarkdownViewer = ({ content, onRunCode }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (inline) {
              return (
                <code className="bg-dark-tertiary px-1 py-0.5 rounded text-neon-cyan" {...props}>
                  {children}
                </code>
              );
            }

            // For HTML, JS, or CSS blocks, use our custom extractor component
            if (['html', 'js', 'javascript', 'css'].includes(language)) {
              return (
                <CodeBlockExtractor
                  language={language}
                  value={String(children).replace(/\n$/, '')}
                  onRunCode={onRunCode}
                />
              );
            }
            
            // For other languages, use the regular syntax highlighter
            return (
              <div className="code-block my-4">
                <SyntaxHighlighter
                  style={atomDark}
                  language={language}
                  PreTag="div"
                  className="rounded"
                  customStyle={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;