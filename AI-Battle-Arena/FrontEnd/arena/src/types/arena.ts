export interface AgentResponse {
  id: string;
  agentId: string;
  agentName: string;
  content: string;
}

export interface JudgeEvaluation {
  winnerAgentId: string | null;
  score1: number;
  score2: number;
  reasoning: string;
}

export interface Message {
  id: string;
  role: 'user' | 'system';
  content: string;
}

export type BattleStatus = 'idle' | 'generating_agents' | 'evaluating_judge' | 'completed';

export interface ArenaState {
  currentPrompt: string | null;
  agent1Response: AgentResponse | null;
  agent2Response: AgentResponse | null;
  judgeResult: JudgeEvaluation | null;
  status: BattleStatus;
}
