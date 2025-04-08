import { useState, useEffect } from 'react';
import ResizablePanel from './ResizablePanel';

function MainContent({ selectedFile }) {
  const [noteContent, setNoteContent] = useState('');
  const [splitPosition, setSplitPosition] = useState(50); // 50% split by default

  // Mock loading note content (will be replaced with actual file loading)
  useEffect(() => {
    if (selectedFile) {
      // For demo purposes, load some sample content
      if (selectedFile.id === 'file1') {
        setNoteContent(`
# JavaScript Basics

## Variables and Data Types

JavaScript is a **loosely typed** language, which means variables can change types.

### Equality Operators

#### Loose Equality vs Strict Equality

- Loose_Equality (==) - Checks only value
- Strict_Equality (===) - Checks value AND type

\`\`\`js
let age = 22;
console.log(age == "22");  // true - only checks value
console.log(age === "22"); // false - checks value AND type
console.log(age != "22");  // false
console.log(age !== "22"); // true
\`\`\`

Try running this code to see the results!
        `);
      } else if (selectedFile.id === 'file3') {
        setNoteContent(`
# Flexbox Layout

Flexbox is a powerful CSS layout model.

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <style>
    .container {
      display: flex;
      justify-content: space-between;
      background-color: #f0f0f0;
      padding: 10px;
    }
    .item {
      width: 100px;
      height: 100px;
      background-color: #3498db;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="item">Item 1</div>
    <div class="item">Item 2</div>
    <div class="item">Item 3</div>
  </div>
</body>
</html>
\`\`\`
        `);
      } else {
        setNoteContent(`# ${selectedFile.name}\n\nSelect a file to see its content.`);
      }
    }
  }, [selectedFile]);

  return (
    <div className="flex-1 overflow-hidden flex">
      <ResizablePanel
        direction="horizontal"
        primarySize={splitPosition}
        setPrimarySize={setSplitPosition}
        primaryMinSize={30}
        secondaryMinSize={30}
      >
        {/* Note Content Area */}
        <div className="h-full overflow-auto p-4">
          {selectedFile ? (
            <>
              <h2 className="text-lg text-neon-cyan mb-4">{selectedFile.name}</h2>
              <div className="markdown-content">
                {/* This will be replaced with a proper markdown renderer */}
                <pre className="whitespace-pre-wrap">{noteContent}</pre>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-dark-text-secondary">
              Select a file from the sidebar to view its content
            </div>
          )}
        </div>
        
        {/* Code Execution Area */}
        <div className="h-full bg-dark-tertiary p-4 overflow-auto">
          <h2 className="text-lg text-neon-green mb-4">Code Output</h2>
          <div className="bg-dark-bg p-4 rounded h-full flex flex-col">
            <div className="text-dark-text-secondary italic">
              Run a code snippet to see its output here
            </div>
          </div>
        </div>
      </ResizablePanel>
    </div>
  );
}

export default MainContent;