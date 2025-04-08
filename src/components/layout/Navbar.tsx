import { FaCode, FaFolder, FaUpload } from 'react-icons/fa';

function Navbar() {
  return (
    <header className="bg-dark-tertiary h-14 flex items-center px-4 border-b border-dark-secondary">
      <div className="flex items-center">
        <FaCode className="text-neon-blue mr-2 text-2xl" />
        <h1 className="text-xl font-semibold text-neon-blue">
          Obsidian Code Runner
        </h1>
      </div>
      
      <div className="ml-auto flex gap-4">
        <button className="flex items-center gap-2 bg-dark-bg px-3 py-1.5 rounded hover:bg-dark-secondary transition-colors">
          <FaFolder className="text-neon-green" />
          <span className="text-dark-text-secondary">Open Vault</span>
        </button>
        
        <button className="flex items-center gap-2 bg-dark-bg px-3 py-1.5 rounded hover:bg-dark-secondary transition-colors">
          <FaUpload className="text-neon-cyan" />
          <span className="text-dark-text-secondary">Upload File</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;