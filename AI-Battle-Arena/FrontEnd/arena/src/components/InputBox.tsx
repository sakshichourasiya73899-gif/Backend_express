import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';
import { useArena } from '../context/ArenaContext';

const InputBox = () => {
  const [text, setText] = useState("");
  const { submitPrompt, status } = useArena();
  
  const isGenerating = status !== 'idle' && status !== 'completed';

  const handleSend = () => {
    if (!text.trim() || isGenerating) return;
    submitPrompt(text);
    setText("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gradient-to-t from-background via-background to-transparent pt-12 pb-8 px-4 w-full">
      <div className="max-w-4xl mx-auto relative group">
        <div className="bg-surface-container-highest border border-outline-variant/30 rounded-3xl p-2 relative flex flex-col transition-all duration-300">
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            placeholder={isGenerating ? "Models are battling..." : "Initialize battle prompt..."}
            className="w-full bg-transparent resize-none border-none outline-none py-3 px-4 text-[15px] max-h-48 min-h-[56px] text-on-surface placeholder:text-outline scrollbar-thin scrollbar-thumb-surface-bright disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{
               height: text ? "auto" : "56px"
            }}
          />

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(255,255,255,0.03)] px-2 pb-1">
            <div className="flex gap-1">
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-xl hover:bg-surface-bright focus:ring-1 focus:ring-primary/50 outline-none group relative">
                <Paperclip className="w-5 h-5" />
                {/* Upload File feature tooltip */}
                 <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[rgba(255,255,255,0.05)] shadow-xl hidden md:block w-max">
                  Upload file (Drag & Drop)
                </span>
              </button>
              <button className="text-on-surface-variant hover:text-secondary transition-colors p-2 rounded-xl hover:bg-surface-bright focus:ring-1 focus:ring-secondary/50 outline-none">
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleSend}
              disabled={isGenerating || !text.trim()}
              className="bg-gradient-to-br from-primary to-primary-dim hover:opacity-90 active:scale-95 transition-all text-on-primary-fixed rounded-xl p-2.5 shadow-[0_0_20px_rgba(138,76,252,0.15)] focus:ring-2 focus:ring-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-outline mt-3 font-display tracking-wide uppercase opacity-60">ArenaMind AI Model Verification Engine v1.0.2</p>
      </div>
    </div>
  );
};

export default InputBox;
