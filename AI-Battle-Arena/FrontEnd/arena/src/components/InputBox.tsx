import React, { useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

const InputBox: React.FC = () => {
  const [text, setText] = useState("");
  const { addTurn, isWaiting } = useChatContext();

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim() || isWaiting) return;

    await addTurn(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gradient-to-t from-background via-background to-transparent pt-12 pb-8 px-4 w-full relative z-10">
      <div className="max-w-4xl mx-auto relative group">
        <form onSubmit={handleSend} className="bg-surface-container-highest border border-outline-variant/30 rounded-[28px] p-2 relative flex flex-col transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50">
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Initialize battle prompt..."
            className="w-full bg-transparent resize-none border-none outline-none py-4 px-5 text-[15px] max-h-48 min-h-[60px] text-on-surface placeholder:text-outline scrollbar-thin scrollbar-thumb-surface-bright"
            rows={1}
            style={{
               height: text ? "auto" : "60px"
            }}
          />

          <div className="flex items-center justify-between mt-1 pt-1 px-3 pb-2">
            <div className="flex gap-2">
              <button type="button" className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-xl hover:bg-surface-bright focus:ring-1 focus:ring-primary/50 outline-none group relative">
                <Paperclip className="w-5 h-5" />
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[rgba(255,255,255,0.05)] shadow-xl hidden md:block w-max">
                  Upload file (Drag & Drop)
                </span>
              </button>
              <button type="button" className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-xl hover:bg-surface-bright focus:ring-1 focus:ring-secondary/50 outline-none">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              type="submit"
              disabled={!text.trim() || isWaiting}
              className="bg-gradient-to-br from-primary to-primary-dim hover:opacity-90 active:scale-95 transition-all text-background font-bold rounded-xl p-3 shadow-[0_0_20px_rgba(138,76,252,0.15)] focus:ring-2 focus:ring-primary outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        <p className="text-center text-[10px] text-outline mt-3 font-display tracking-[0.2em] uppercase opacity-70">ArenaMind Verification Engine v2.0</p>
      </div>
    </div>
  );
};

export default InputBox;
