import React, { createContext, useState, useContext, type ReactNode } from 'react';
import axios from 'axios';

export interface JudgeResult {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
}

export interface BattleTurn {
  id: number;
  problem: string;
  solution_1?: string;
  solution_2?: string;
  judge?: JudgeResult;
}

export interface Battle {
  id: string;
  title: string;
  turns: BattleTurn[];
}

interface ChatContextType {
  battles: Battle[];
  currentBattleId: string | null;
  createNewBattle: () => void;
  selectBattle: (id: string) => void;
  addTurn: (prompt: string) => Promise<void>;
  currentTurns: BattleTurn[];
  isWaiting: boolean; // to disable send button
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [currentBattleId, setCurrentBattleId] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const createNewBattle = () => {
    setCurrentBattleId(null);
  };

  const selectBattle = (id: string) => {
    setCurrentBattleId(id);
  };

  const addTurn = async (prompt: string) => {
    setIsWaiting(true);
    let battleId = currentBattleId;
    
    // Auto-create battle if it doesn't exist
    if (!battleId) {
      battleId = Date.now().toString();
      setCurrentBattleId(battleId);
      setBattles(prev => [{ id: battleId!, title: prompt.slice(0, 30) + "...", turns: [] }, ...prev]);
    }

    // append placeholder for user immediately
    const tempId = Date.now();
    setBattles(prev => prev.map(b => 
      b.id === battleId ? { ...b, turns: [...b.turns, { id: tempId, problem: prompt }] } : b
    ));

    try {
      const response = await axios.post("http://localhost:3000/api/invoke", { input: prompt });
      const data = response.data;
      
      setBattles(prev => prev.map(b => 
        b.id === battleId ? { 
          ...b, 
          turns: b.turns.map(t => t.id === tempId ? { ...t, ...data.result } : t)
        } : b
      ));

    } catch (err) {
      console.error("Backend unreachable, providing local mockup response.", err);
      // Fallback mock if backend is down
      const mockResult = {
        solution_1: "Error reaching backend. Is the server running? Run a local mock test:\n\n```python\nprint('Are we connected?')\n```",
        solution_2: "Axios error caught on frontend. Ensure your http://localhost:3000 instance is up and CORS is configured.",
        judge: {
          solution_1_score: 5,
          solution_2_score: 5,
          solution_1_reasoning: "Server unattainable. Solution 1 provides debugging tips.",
          solution_2_reasoning: "Solution 2 provides technical diagnostic context."
        }
      };
      setBattles(prev => prev.map(b => 
        b.id === battleId ? { 
          ...b, 
          turns: b.turns.map(t => t.id === tempId ? { ...t, ...mockResult } : t)
        } : b
      ));
    } finally {
      setIsWaiting(false);
    }
  };

  const currentTurns = battles.find(b => b.id === currentBattleId)?.turns || [];

  return (
    <ChatContext.Provider value={{ battles, currentBattleId, createNewBattle, selectBattle, addTurn, currentTurns, isWaiting }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
