import React from 'react';
import { User } from 'lucide-react';

interface UserMessageProps {
  message: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-end mt-8 w-full group">
      <div className="max-w-[85%] md:max-w-[75%] transition-all animate-fade-in-up">
        <div className="flex items-center justify-end gap-3 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
          <span className="font-display text-[10px] tracking-widest text-on-surface-variant uppercase">User_Prompt</span>
          <div className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
            <User className="w-3 h-3 text-outline" />
          </div>
        </div>
        <div className="bg-surface-bright rounded-[20px] rounded-tr-[5px] px-5 py-4 shadow-lg border border-[rgba(255,255,255,0.03)] text-[15px] leading-relaxed text-on-surface">
          {message}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
