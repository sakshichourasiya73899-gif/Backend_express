import { useState } from 'react';
import classNames from 'classnames';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';
import InputBox from './components/InputBox';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-background text-on-surface overflow-hidden font-body">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className={classNames("flex flex-col relative h-full flex-1 transition-all duration-300", 
        !isSidebarOpen && "w-full"
      )}>
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 text-on-surface-variant hover:text-on-surface p-2 bg-surface-container-lowest/80 backdrop-blur-md border border-[rgba(255,255,255,0.05)] rounded-lg hover:bg-surface-container transition-all shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 overflow-y-auto w-full relative">
          <MainChat />
        </div>
        
        <div className="w-full shrink-0">
          <InputBox />
        </div>
      </main>
    </div>
  )
}

export default App;
