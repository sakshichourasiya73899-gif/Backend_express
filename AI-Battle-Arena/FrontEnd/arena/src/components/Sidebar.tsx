import React from 'react';
import { Menu, Plus, MessageSquare, LogOut, Settings, User } from 'lucide-react';
import classNames from 'classnames';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { battles, currentBattleId, createNewBattle, selectBattle } = useChatContext();
  const displayUsername = user?.username || 'Shadow Architect';

  return (
    <div 
      className={classNames(
        "h-full flex flex-col bg-surface-container-low border-r border-[rgba(255,255,255,0.02)] transition-all duration-300 shrink-0",
        isOpen ? "w-[300px]" : "w-0 overflow-hidden"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-[0_0_15px_rgba(138,76,252,0.3)]">
            <span className="font-display font-bold text-background tracking-tighter">A</span>
          </div>
          <span className="font-display font-bold text-lg tracking-wide hidden md:block">ARENAMIND</span>
        </div>
        
        <button 
          onClick={toggleSidebar} 
          className="text-on-surface-variant hover:text-on-surface transition-colors p-2 rounded-lg hover:bg-surface-container"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 mt-2">
        <button 
          onClick={createNewBattle}
          className="w-full bg-surface-variant/40 hover:bg-surface-variant/60 border border-[rgba(255,255,255,0.05)] rounded-xl p-3 flex items-center justify-center gap-2 transition-all group backdrop-blur-sm shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <Plus className="w-4 h-4 text-primary" />
          <span className="font-display text-sm tracking-wide font-medium">New Battle</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-surface-bright">
        <h3 className="font-display text-xs text-outline mb-4 uppercase tracking-wider">Recent Battles</h3>
        <div className="space-y-1">
          {battles.length === 0 ? (
            <div className="text-xs text-outline text-center py-4 bg-surface-container-low rounded-xl">No battles yet</div>
          ) : (
            battles.map((battle) => (
              <button 
                key={battle.id}
                onClick={() => selectBattle(battle.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors text-sm ${
                  battle.id === currentBattleId 
                    ? 'bg-surface-container-high text-on-surface font-medium border border-outline-variant/30' 
                    : 'hover:bg-surface-container text-on-surface-variant hover:text-on-surface border border-transparent'
                }`}
              >
                <MessageSquare className={`w-4 h-4 shrink-0 ${battle.id === currentBattleId ? 'text-primary' : 'text-outline'}`} />
                <span className="truncate">{battle.title}</span>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-[rgba(255,255,255,0.02)] bg-surface-container-lowest/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-[rgba(255,255,255,0.05)]">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="font-display font-medium text-sm truncate">{displayUsername}</h4>
            <p className="text-xs text-on-surface-variant truncate">elite+ tier</p>
          </div>
        </div>
        
        <div className="flex justify-between border-t border-[rgba(255,255,255,0.02)] pt-3 mt-1">
          <button className="text-on-surface-variant hover:text-on-surface p-2 rounded-lg hover:bg-surface-container transition-colors focus:ring-1 focus:ring-primary/50 outline-none">
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={logout}
            className="text-on-surface-variant hover:text-error p-2 rounded-lg hover:bg-surface-container transition-colors focus:ring-1 focus:ring-error/50 outline-none"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
