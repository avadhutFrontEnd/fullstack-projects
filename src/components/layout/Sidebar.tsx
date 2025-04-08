import { useState } from 'react';
import { FaFolder, FaFolderOpen, FaMarkdown } from 'react-icons/fa';

function Sidebar({ width, setWidth, onFileSelect }) {
  // Sample folder structure (will be replaced with actual file system data)
  const [folders, setFolders] = useState([
    {
      name: 'JavaScript Notes',
      isOpen: true,
      files: [
        { name: 'basic-concepts.md', id: 'file1' },
        { name: 'functions.md', id: 'file2' }
      ]
    },
    {
      name: 'CSS Examples',
      isOpen: false,
      files: [
        { name: 'flexbox.md', id: 'file3' },
        { name: 'grid.md', id: 'file4' }
      ]
    }
  ]);

  // Toggle folder open/closed
  const toggleFolder = (index) => {
    const newFolders = [...folders];
    newFolders[index].isOpen = !newFolders[index].isOpen;
    setFolders(newFolders);
  };

  // Handle resize of sidebar
  const handleMouseDown = (e) => {
    e.preventDefault();
    
    const startX = e.pageX;
    const startWidth = width;
    
    const onMouseMove = (e) => {
      const newWidth = startWidth + e.pageX - startX;
      if (newWidth > 150 && newWidth < 500) {
        setWidth(newWidth);
      }
    };
    
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      <div className="bg-dark-secondary h-full overflow-y-auto" style={{ width: `${width}px` }}>
        <div className="p-3">
          <h2 className="text-neon-cyan font-medium mb-4">Files</h2>
          
          <div className="space-y-2">
            {folders.map((folder, folderIndex) => (
              <div key={folderIndex}>
                <div 
                  className="flex items-center p-2 hover:bg-dark-tertiary rounded cursor-pointer"
                  onClick={() => toggleFolder(folderIndex)}
                >
                  {folder.isOpen ? (
                    <FaFolderOpen className="text-neon-orange mr-2" />
                  ) : (
                    <FaFolder className="text-neon-orange mr-2" />
                  )}
                  <span>{folder.name}</span>
                </div>
                
                {folder.isOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {folder.files.map((file) => (
                      <div 
                        key={file.id}
                        className="flex items-center p-1.5 hover:bg-dark-tertiary rounded cursor-pointer"
                        onClick={() => onFileSelect(file)}
                      >
                        <FaMarkdown className="text-neon-blue mr-2" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resizer handle */}
      <div 
        className="w-1 bg-dark-tertiary cursor-col-resize hover:bg-neon-blue transition-colors"
        onMouseDown={handleMouseDown}
      />
    </>
  );
}

export default Sidebar;