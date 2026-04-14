import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain, ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 relative overflow-hidden font-body">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="w-full max-w-md bg-surface-container-low/40 backdrop-blur-xl border border-[rgba(255,255,255,0.05)] p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center shadow-[0_0_30px_rgba(138,76,252,0.4)] mb-6">
             <Brain className="w-8 h-8 text-background" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-on-surface mb-2">ARENAMIND</h1>
          <p className="text-on-surface-variant text-sm">Enter the battleground of intelligence.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-display text-outline uppercase tracking-wider pl-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container/50 border border-[rgba(255,255,255,0.05)] text-on-surface p-3.5 rounded-xl focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/50"
              placeholder="e.g. Shadow Architect"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-display text-outline uppercase tracking-wider pl-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container/50 border border-[rgba(255,255,255,0.05)] text-on-surface p-3.5 rounded-xl focus:ring-1 focus:ring-primary/50 focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/50"
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary-dim hover:from-primary-dim hover:to-primary text-background font-medium p-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_0_rgba(138,76,252,0.39)] hover:shadow-[0_6px_20px_rgba(138,76,252,0.23)] hover:-translate-y-0.5 mt-4"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
