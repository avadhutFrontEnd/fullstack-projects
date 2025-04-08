import React from "react";
import { useState } from "react";
import Navbar from "./components/layout/Navbar.tsx";
import Sidebar from "./components/layout/Sidebar.tsx";
import MainContent from "./components/layout/MainContent.tsx";
import "./index.css";

const App = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(250);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          width={sidebarWidth}
          setWidth={setSidebarWidth}
          onFileSelect={setSelectedFile}
        />
        <MainContent selectedFile={selectedFile} />
      </div>
    </div>
  );
};

export default App;
