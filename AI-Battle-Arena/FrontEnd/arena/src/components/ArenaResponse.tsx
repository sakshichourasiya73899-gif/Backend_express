import React from 'react';
import { Cpu, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface JudgeResult {
  solution_1_score: number;
  solution_2_score: number;
  solution_1_reasoning: string;
  solution_2_reasoning: string;
}

interface ArenaResponseProps {
  solution1?: string;
  solution2?: string;
  judge?: JudgeResult;
}

const ArenaResponse: React.FC<ArenaResponseProps> = ({ solution1, solution2, judge }) => {
  const isAgent1Winner = judge ? judge.solution_1_score > judge.solution_2_score : true;
  const isDraw = judge ? judge.solution_1_score === judge.solution_2_score : false;

  return (
    <div className="w-full flex flex-col gap-8 mt-12 animate-fade-in">
      {/* Agents Arena Header */}
      <h3 className="font-display text-[10px] text-outline text-center uppercase tracking-[0.3em] relative flex items-center justify-center">
        <span className="bg-background px-4 z-10 relative">System engaging models</span>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent top-1/2"></div>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Agent 1 */}
        {solution1 && (
          <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 relative overflow-hidden transition-all hover:bg-surface-container-high group shadow-md hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dim opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                <Cpu className="w-4 h-4 text-primary" />
              </div>
              <h4 className="font-display font-medium tracking-wide text-on-surface">Model Alpha</h4>
            </div>
            <div className="text-on-surface-variant text-[14px] leading-relaxed whitespace-pre-wrap">
              {solution1}
            </div>
          </div>
        )}

        {/* Agent 2 */}
        {solution2 && (
          <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 relative overflow-hidden transition-all hover:bg-surface-container-high group shadow-md hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-surface-bright flex items-center justify-center">
                <Cpu className="w-4 h-4 text-secondary" />
              </div>
              <h4 className="font-display font-medium tracking-wide text-on-surface">Model Beta</h4>
            </div>
            <div className="text-on-surface-variant text-[14px] leading-relaxed whitespace-pre-wrap">
              {solution2}
            </div>
          </div>
        )}
      </div>

      {/* Judge Result Section */}
      {judge && (
        <div className="mt-8 mb-4 w-full">
          <div className="relative rounded-3xl p-[1px] overflow-hidden bg-gradient-to-br from-primary/80 via-background to-background group hover:from-primary transition-all duration-700">
            {/* Glowing Aura Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 blur-[40px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="bg-surface-container-highest rounded-[23px] p-6 md:p-8 h-full relative z-10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                 <h4 className="font-display text-xs uppercase tracking-widest text-primary flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                   Verification Core
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agent 1 Score Panel */}
                <div className={`rounded-2xl p-5 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${isAgent1Winner ? 'bg-surface-container border-primary/30 shadow-[0_4px_20px_rgba(138,76,252,0.1)]' : 'bg-surface-container-low border-[rgba(255,255,255,0.02)] grayscale-[0.8]'}`}>
                  {isAgent1Winner && <div className="absolute top-0 left-0 w-1.5 h-full bg-primary shadow-[0_0_10px_#bd9dff]"></div>}
                  
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isAgent1Winner ? 'bg-surface-bright text-primary' : 'bg-surface-container text-outline'}`}>
                          {isAgent1Winner ? <Trophy className="w-4 h-4" /> : <span className="text-xs font-bold font-display">#2</span>}
                        </div>
                        <div>
                          <div className="text-[10px] text-outline uppercase tracking-widest mb-1">Agent 1</div>
                          <div className="font-display text-2xl font-bold flex items-baseline gap-1 text-on-surface">
                            {judge.solution_1_score}<span className="text-[10px] text-on-surface-variant font-normal">/10</span>
                          </div>
                        </div>
                     </div>
                  </div>
                  <div className="text-[13px] text-on-surface-variant bg-surface-container-low/50 p-3 rounded-xl border border-[rgba(255,255,255,0.02)]">
                     <span className="flex items-center gap-1.5 mb-1 font-medium text-on-surface"><Sparkles className={`w-3.5 h-3.5 ${isAgent1Winner ? 'text-primary' : 'text-outline'}`} /> Insights</span>
                     {judge.solution_1_reasoning}
                  </div>
                </div>

                {/* Agent 2 Score Panel */}
                <div className={`rounded-2xl p-5 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${!isAgent1Winner && !isDraw ? 'bg-surface-container border-secondary/30 shadow-[0_4px_20px_rgba(255,100,100,0.1)]' : 'bg-surface-container-low border-[rgba(255,255,255,0.02)] grayscale-[0.8]'}`}>
                  {!isAgent1Winner && !isDraw && <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary shadow-[0_0_10px_#ff6464]"></div>}
                  
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!isAgent1Winner && !isDraw ? 'bg-surface-bright text-secondary' : 'bg-surface-container text-outline'}`}>
                          {!isAgent1Winner && !isDraw ? <Trophy className="w-4 h-4" /> : <span className="text-xs font-bold font-display">#2</span>}
                        </div>
                        <div>
                          <div className="text-[10px] text-outline uppercase tracking-widest mb-1">Agent 2</div>
                          <div className="font-display text-2xl font-bold flex items-baseline gap-1 text-on-surface">
                            {judge.solution_2_score}<span className="text-[10px] text-on-surface-variant font-normal">/10</span>
                          </div>
                        </div>
                     </div>
                  </div>
                  <div className="text-[13px] text-on-surface-variant bg-surface-container-low/50 p-3 rounded-xl border border-[rgba(255,255,255,0.02)]">
                     <span className="flex items-center gap-1.5 mb-1 font-medium text-on-surface"><Sparkles className={`w-3.5 h-3.5 ${!isAgent1Winner && !isDraw ? 'text-secondary' : 'text-outline'}`} /> Insights</span>
                     {judge.solution_2_reasoning}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArenaResponse;
