import React from 'react';
import { LayoutGrid, Plus, Settings } from 'lucide-react';

const Header = ({ onAdd }) => {
  return (
    <header className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/20 ring-1 ring-emerald-400/40">
          <LayoutGrid className="h-4 w-4 text-emerald-300" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">My Dashboard</h2>
          <p className="text-xs text-slate-400">Centralize your daily resources</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20"
        >
          <Plus className="h-4 w-4" />
          Add Link
        </button>
        <button className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 transition hover:bg-white/10">
          <Settings className="h-4 w-4" />
          Customize
        </button>
      </div>
    </header>
  );
};

export default Header;
