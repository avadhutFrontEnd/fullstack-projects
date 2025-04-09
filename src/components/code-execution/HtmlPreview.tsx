import React, { useRef, useEffect, useState } from 'react';

const HtmlPreview = ({ htmlContent, cssContent, jsContent }) => {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState('400px');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!iframeRef.current || !iframeLoaded) return;
    
    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    // Combine HTML, CSS and JS
    const combinedContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssContent || ''}</style>
        </head>
        <body>
          ${htmlContent || ''}
          <script>${jsContent || ''}</script>
        </body>
      </html>
    `;
    
    // Write to the iframe
    iframeDoc.open();
    iframeDoc.write(combinedContent);
    iframeDoc.close();
    
    // Adjust iframe height to content if needed
    if (iframeDoc.body) {
      const contentHeight = iframeDoc.body.scrollHeight;
      if (contentHeight > 100) {
        setHeight(`${contentHeight + 50}px`);
      }
    }
  }, [htmlContent, cssContent, jsContent, iframeLoaded]);

  return (
    <div className="html-preview mt-4">
      <h3 className="text-md text-neon-purple mb-2">HTML Preview</h3>
      <iframe 
        ref={iframeRef}
        className="w-full border-2 border-neon-purple rounded"
        style={{ height, backgroundColor: 'white' }}
        sandbox="allow-scripts"
        onLoad={() => setIframeLoaded(true)}
        title="HTML Preview"
      />
    </div>
  );
};

export default HtmlPreview;