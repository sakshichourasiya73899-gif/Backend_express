import React from 'react';
import { User, Cpu, ShieldCheck, Trophy, Sparkles, Loader2 } from 'lucide-react';
import { useArena } from '../context/ArenaContext';

const MainChat: React.FC = () => {
  const { currentPrompt, agent1Response, agent2Response, judgeResult, status } = useArena();

  if (status === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center h-full opacity-50 text-center">
        <Sparkles className="w-12 h-12 mb-4 text-outline" />
        <p className="font-display uppercase tracking-widest text-outline">Awaiting Initialization</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-12 pb-32">
      
      {/* User Message */}
      {currentPrompt && (
        <div className="flex justify-end mt-8">
          <div className="max-w-[80%] md:max-w-[70%]">
            <div className="flex items-center justify-end gap-3 mb-2">
              <span className="font-display text-sm tracking-wide text-on-surface-variant uppercase">User_Prompt</span>
              <div className="w-6 h-6 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
                <User className="w-3 h-3 text-outline" />
              </div>
            </div>
            <div className="bg-surface-bright rounded-2xl rounded-tr-none px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.03)] text-[15px] leading-relaxed">
              {currentPrompt}
            </div>
          </div>
        </div>
      )}

      {/* Agents Arena */}
      {(status === 'generating_agents' || agent1Response || agent2Response) && (
        <>
          <h3 className="font-display text-xs text-outline text-center uppercase tracking-[0.2em] relative flex items-center justify-center">
            <span className="bg-background px-4 z-10 relative">System engaging models</span>
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent top-1/2"></div>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Agent 1 */}
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 relative overflow-hidden transition-all hover:bg-surface-container-high">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim opacity-50"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-display font-medium tracking-wide">Model Alpha</h4>
              </div>
              <div className="text-on-surface-variant text-sm leading-relaxed">
                {agent1Response ? (
                   <p>{agent1Response.content}</p>
                ) : (
                   <div className="flex items-center gap-2 text-outline"><Loader2 className="w-4 h-4 animate-spin"/> Generating...</div>
                )}
              </div>
            </div>

            {/* Agent 2 */}
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 relative overflow-hidden transition-all hover:bg-surface-container-high">
               <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-50"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-secondary" />
                </div>
                <h4 className="font-display font-medium tracking-wide">Model Beta</h4>
              </div>
              <div className="text-on-surface-variant text-sm leading-relaxed">
                {agent2Response ? (
                   <p>{agent2Response.content}</p>
                ) : (
                   <div className="flex items-center gap-2 text-outline"><Loader2 className="w-4 h-4 animate-spin"/> Generating...</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Judge Result Section */}
      {(status === 'evaluating_judge' || judgeResult) && (
        <div className="mt-8 mb-16 max-w-3xl mx-auto w-full">
          <div className="relative rounded-3xl p-[1px] overflow-hidden bg-gradient-to-br from-primary via-background to-background">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-[40px] rounded-full pointer-events-none"></div>
            
            <div className="bg-surface-container-highest rounded-[23px] p-8 h-full relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <h4 className="font-display text-sm uppercase tracking-widest text-primary flex items-center gap-2 mb-6">
                <ShieldCheck className="w-5 h-5" />
                Judge Core Result
              </h4>

              {!judgeResult ? (
                 <div className="flex items-center justify-center gap-2 text-outline py-8">
                   <Loader2 className="w-6 h-6 animate-spin text-primary"/> 
                   <span className="animate-pulse">Evaluating outputs...</span>
                 </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Winner Side */}
                    <div className="bg-surface-container rounded-xl pl-4 py-4 pr-6 flex gap-4 items-center border border-primary/20 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-primary shadow-[0_0_10px_#bd9dff]"></div>
                      <div className="w-12 h-12 rounded-full bg-surface-bright flex items-center justify-center shrink-0">
                        <Trophy className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-outline uppercase tracking-wider mb-1">
                          Winner ({judgeResult.winnerAgentId === 'agent-1' ? 'Alpha' : 'Beta'})
                        </div>
                        <div className="font-display text-2xl font-bold flex items-baseline gap-1">
                          {Math.max(judgeResult.score1, judgeResult.score2)}<span className="text-sm text-on-surface-variant font-normal">/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Loser Side */}
                    <div className="bg-surface-container-low rounded-xl px-4 py-4 flex gap-4 items-center border border-[rgba(255,255,255,0.02)]">
                       <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-outline">#2</span>
                      </div>
                      <div>
                        <div className="text-xs text-outline uppercase tracking-wider mb-1">
                          Loser ({judgeResult.winnerAgentId === 'agent-1' ? 'Beta' : 'Alpha'})
                        </div>
                        <div className="font-display text-xl font-medium text-on-surface-variant flex items-baseline gap-1">
                          {Math.min(judgeResult.score1, judgeResult.score2)}<span className="text-xs text-outline font-normal">/10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-sm text-on-surface-variant bg-surface-container-low p-4 rounded-xl border border-[rgba(255,255,255,0.03)] leading-relaxed">
                    <span className="text-on-surface font-medium block mb-2 font-display text-xs uppercase">Judge Reasoning:</span>
                    {judgeResult.reasoning}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainChat;
