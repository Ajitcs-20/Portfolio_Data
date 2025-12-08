import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Terminal: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = (message: string, type: 'system' | 'user' | 'response' = 'system') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let prefix = '';
    if (type === 'system') prefix = `[${timestamp}] `;
    
    setLogs(prev => [...prev.slice(-50), { message: `${prefix}${message}`, type } as any]);
  };

  useEffect(() => {
    // Initial boot sequence
    addLog("System initialized.");
    addLog("Connecting to Azure Data Lake...");
    setTimeout(() => addLog("Connection established (200 OK)."), 800);
    setTimeout(() => addLog("Fetching portfolio data..."), 1500);
    setTimeout(() => addLog("Rendering pipelines..."), 2200);
    setTimeout(() => addLog("Interactive Shell Ready. Type 'help' for commands.", 'response'), 3000);

    const handleScroll = () => {
      if (Math.random() > 0.98) { // Reduced spam frequency
        const percent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        addLog(`User scroll event detected: ${percent}% depth`);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Prevent logging clicks inside the terminal itself
      if ((target.tagName === 'BUTTON' || target.tagName === 'A') && !target.closest('.terminal-window')) {
        addLog(`Interaction detected: Clicked <${target.tagName.toLowerCase()}>`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    addLog(input, 'user');
    setInput('');

    // Simulate processing delay
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          addLog("Available commands:", 'response');
          addLog("  help    - Show this menu", 'response');
          addLog("  clear   - Clear terminal output", 'response');
          addLog("  about   - Display summary", 'response');
          addLog("  skills  - List technical stack", 'response');
          addLog("  contact - Show contact info", 'response');
          break;
        case 'clear':
          setLogs([]);
          break;
        case 'about':
          addLog("Ajit Sharma | Azure Data Engineer at ThoughtSol Infotech.", 'response');
          break;
        case 'skills':
          addLog("Stack: Azure (ADF, Databricks, Synapse), Python, SQL, PySpark.", 'response');
          break;
        case 'contact':
          addLog("Email: ajitsharma4789@gmail.com", 'response');
          addLog("LinkedIn: /in/ajit-sharma-ajitcse20", 'response');
          break;
        case 'sudo':
          addLog("Permission denied: You are not root.", 'response');
          break;
        case 'ls':
          addLog("home/  experience/  projects/  skills/  contact/", 'response');
          break;
        default:
          addLog(`Command not found: ${cmd}. Type 'help' for options.`, 'response');
      }
    }, 200);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-300 ${isOpen ? 'w-96 h-96' : 'w-48 h-10'} terminal-window`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-dark-lighter border border-slate-700 rounded-t-lg shadow-2xl flex flex-col h-full overflow-hidden backdrop-blur-md">
        {/* Header */}
        <div 
          className="bg-slate-800 px-3 py-2 flex justify-between items-center cursor-pointer border-b border-slate-700 hover:bg-slate-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2 text-primary font-mono text-xs">
            <TerminalIcon size={14} />
            <span>SYSTEM_LOGS</span>
          </div>
          <div className="flex gap-2">
            {isOpen ? <Minimize2 size={12} className="text-slate-400 hover:text-white" /> : <Maximize2 size={12} className="text-slate-400 hover:text-white" />}
          </div>
        </div>

        {/* Console Body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="flex-1 p-3 overflow-y-auto font-mono text-xs bg-black/90 flex flex-col cursor-text"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              onClick={focusInput}
            >
              <div className="flex-1 space-y-1">
                {logs.map((log: any, i) => (
                  <div key={i} className="break-words leading-relaxed">
                    {log.type === 'user' ? (
                       <span className="text-white">
                         <span className="text-primary mr-2">visitor@ajit.dev:~$</span>
                         {log.message}
                       </span>
                    ) : log.type === 'response' ? (
                      <span className="text-cyan-300">{log.message}</span>
                    ) : (
                      <span className="text-slate-400">
                        <span className="text-green-500 mr-2">➜</span>
                        {log.message}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>

              {/* Input Field */}
              <form onSubmit={handleCommand} className="mt-2 flex items-center pt-2 border-t border-slate-800/50">
                <span className="text-primary mr-2 whitespace-nowrap">visitor@ajit.dev:~$</span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 w-full"
                  placeholder="Enter command..."
                  autoComplete="off"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};