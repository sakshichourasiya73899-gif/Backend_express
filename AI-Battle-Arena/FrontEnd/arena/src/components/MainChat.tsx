import React, { useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse from './ArenaResponse';
import { useChatContext } from '../context/ChatContext';

const MainChat: React.FC = () => {
  const { currentTurns } = useChatContext();
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [ currentTurns ]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-6 pb-32">
      {currentTurns.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant min-h-[50vh]">
            <div className="text-center animate-fade-in-up">
              <h2 className="text-3xl font-display font-light mb-4 text-on-surface tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-on-surface to-secondary">Welcome to ARENAMIND</h2>
              <p className="text-sm tracking-widest uppercase opacity-70">Type a prompt below to initialize battle sequence.</p>
            </div>
          </div>
      ) : (
        currentTurns.map((msg) => (
          <div key={msg.id} className="w-full flex flex-col gap-2">
            <UserMessage message={msg.problem} />
            <ArenaResponse
              solution1={msg.solution_1}
              solution2={msg.solution_2}
              judge={msg.judge}
            />
          </div>
        ))
      )}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MainChat;
