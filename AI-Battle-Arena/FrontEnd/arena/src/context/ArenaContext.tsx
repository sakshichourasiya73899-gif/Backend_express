import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ArenaState, AgentResponse, JudgeEvaluation } from '../types/arena';

interface ArenaContextType extends ArenaState {
  submitPrompt: (prompt: string) => Promise<void>;
  resetBattle: () => void;
}

const initialState: ArenaState = {
  currentPrompt: null,
  agent1Response: null,
  agent2Response: null,
  judgeResult: null,
  status: 'idle',
};

const ArenaContext = createContext<ArenaContextType | undefined>(undefined);

export const ArenaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ArenaState>(initialState);

  const resetBattle = () => {
    setState(initialState);
  };

  const submitPrompt = async (prompt: string) => {
    if (!prompt.trim()) return;

    // Set initial prompt and shift status to 'generating'
    setState({
      ...initialState,
      currentPrompt: prompt,
      status: 'generating_agents',
    });

    // TODO: Connect this to the actual backend API logic.
    // Simulating sequence of events purely for UI demonstration:
    
    // Simulate API delay for Agent Responses
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const mockAgent1: AgentResponse = {
      id: 'msg-1',
      agentId: 'agent-1',
      agentName: 'Model Alpha',
      content: 'Hello! I am Model Alpha processing your request: "' + prompt + '".'
    };

    const mockAgent2: AgentResponse = {
      id: 'msg-2',
      agentId: 'agent-2',
      agentName: 'Model Beta',
      content: 'Greetings. I am Model Beta, providing an alternative perspective on: "' + prompt + '".'
    };

    setState((prev) => ({
      ...prev,
      agent1Response: mockAgent1,
      agent2Response: mockAgent2,
      status: 'evaluating_judge',
    }));

    // Simulate API delay for Judge Evaluation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockJudge: JudgeEvaluation = {
      winnerAgentId: 'agent-1',
      score1: 9,
      score2: 7,
      reasoning: 'Model Alpha provided a cleaner explanation, whereas Model Beta was a bit generic. Hence, Model Alpha claims the win.'
    };

    setState((prev) => ({
      ...prev,
      judgeResult: mockJudge,
      status: 'completed',
    }));
  };

  return (
    <ArenaContext.Provider value={{ ...state, submitPrompt, resetBattle }}>
      {children}
    </ArenaContext.Provider>
  );
};

export const useArena = () => {
  const context = useContext(ArenaContext);
  if (context === undefined) {
    throw new Error('useArena must be used within an ArenaProvider');
  }
  return context;
};
