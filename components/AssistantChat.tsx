import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantChatHandle {
  openChat: () => void;
  closeChat: () => void;
}

export const AssistantChat = forwardRef<AssistantChatHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content:
        "Hi! 👋 I'm Ajit's portfolio assistant. Ask me about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    openChat: () => setIsOpen(true),
    closeChat: () => setIsOpen(false),
  }));

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAssistantResponse = async (userMessage: string): Promise<string> => {
    // Simple response engine based on keywords
    const lowerMsg = userMessage.toLowerCase();

    // Projects questions
    if (
      lowerMsg.includes('project') ||
      lowerMsg.includes('work') ||
      lowerMsg.includes('build')
    ) {
      return "Ajit has worked on several interesting projects! Check the Projects section to see his portfolio work including web applications, data pipelines, and more. Each project includes live demos and GitHub links!";
    }

    // Skills questions
    if (
      lowerMsg.includes('skill') ||
      lowerMsg.includes('technology') ||
      lowerMsg.includes('tech')
    ) {
      return 'Ajit is skilled in React, TypeScript, Node.js, Python, and more! He specializes in full-stack development, data engineering, and creating beautiful user interfaces. Check the Skills section for a detailed breakdown!';
    }

    // Experience questions
    if (
      lowerMsg.includes('experience') ||
      lowerMsg.includes('work experience') ||
      lowerMsg.includes('job')
    ) {
      return "Ajit has professional experience as a developer and engineer. Visit the Experience section to see his career timeline and roles!";
    }

    // Contact questions
    if (
      lowerMsg.includes('contact') ||
      lowerMsg.includes('email') ||
      lowerMsg.includes('reach') ||
      lowerMsg.includes('hire')
    ) {
      return 'You can reach Ajit via email at the bottom of this portfolio or connect with him on LinkedIn. Scroll to the Contact section to get in touch!';
    }

    // About questions
    if (
      lowerMsg.includes('about') ||
      lowerMsg.includes('who') ||
      lowerMsg.includes('bio')
    ) {
      return 'Ajit is a passionate developer and engineer focused on building innovative solutions. Learn more in the About section!';
    }

    // Default response
    return `That's a great question! I don't have specific information about that, but feel free to explore the different sections of the portfolio or reach out directly!`;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate slight delay for natural feel
      await new Promise((resolve) => setTimeout(resolve, 600));

      const response = await getAssistantResponse(userText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error getting response:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button - Always on top */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform border border-white/10 flex items-center justify-center cursor-pointer"
        title="Open portfolio assistant"
        type="button"
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-2rem)] bg-dark-lighter border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col h-96 pointer-events-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20 px-4 py-3 rounded-t-lg flex-shrink-0">
            <h3 className="text-white font-bold flex items-center gap-2">
              <MessageCircle size={20} className="text-cyan-400" />
              Portfolio Assistant
            </h3>
            <p className="text-xs text-slate-400 mt-1">Ask about Ajit's work</p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-cyan-600/40 text-white rounded-br-none'
                      : 'bg-slate-700/40 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700/40 text-slate-200 px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-700/50 p-3 bg-dark rounded-b-lg flex gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects..."
              disabled={isLoading}
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-cyan-600/40 hover:bg-cyan-600/60 disabled:opacity-50 text-white p-2 rounded transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
});

AssistantChat.displayName = 'AssistantChat';

