import React from 'react';
import { Home, Star, Rocket, Settings } from 'lucide-react';

const StickyToolbar = () => {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'fav', icon: Star, label: 'Favorites' },
    { id: 'launch', icon: Rocket, label: 'Launch' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="sticky bottom-4 z-50 mx-auto mt-10 w-full max-w-3xl rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur">
      <ul className="grid grid-cols-4 gap-2">
        {items.map(({ id, icon: Icon, label }) => (
          <li key={id}>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default StickyToolbar;
