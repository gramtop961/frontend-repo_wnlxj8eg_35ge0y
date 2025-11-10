import React, { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero';
import Header from './components/Header';
import ResourceGrid from './components/ResourceGrid';
import StickyToolbar from './components/StickyToolbar';
import { Chrome, BookOpen, Github, Code2, Link as LinkIcon } from 'lucide-react';

const iconFor = (url) => {
  const u = (url || '').toLowerCase();
  if (u.includes('github')) return Github;
  if (u.includes('developer.mozilla') || u.includes('mdn')) return BookOpen;
  if (u.startsWith('chrome://') || u.includes('chrome')) return Chrome;
  if (u.includes('vite')) return Code2;
  return LinkIcon;
};

const initialResources = [
  { id: 'devtools', title: 'Chrome DevTools', href: 'chrome://inspect', icon: Chrome, description: 'Inspect, debug, and profile web apps' },
  { id: 'mdn', title: 'MDN Web Docs', href: 'https://developer.mozilla.org/', icon: BookOpen, description: 'Authoritative docs for web APIs and CSS' },
  { id: 'github', title: 'GitHub', href: 'https://github.com/', icon: Github, description: 'Repos, PRs, issues, and actions' },
  { id: 'vite', title: 'Vite Docs', href: 'https://vitejs.dev/guide/', icon: Code2, description: 'Lightning fast dev tooling' },
];

function App() {
  const [resources, setResources] = useState(() => {
    try {
      const raw = localStorage.getItem('dashboard.resources');
      if (raw) {
        const parsed = JSON.parse(raw);
        // revive icon refs
        return parsed.map((r) => ({ ...r, icon: iconFor(r.href) }));
      }
    } catch {}
    return initialResources;
  });

  useEffect(() => {
    // persist without functions
    const serializable = resources.map(({ id, title, href, description }) => ({ id, title, href, description }));
    localStorage.setItem('dashboard.resources', JSON.stringify(serializable));
  }, [resources]);

  const handleAdd = () => {
    const title = window.prompt('Title for the link?');
    if (!title) return;
    const href = window.prompt('URL for the link?');
    if (!href) return;
    const description = window.prompt('Short description (optional)') || 'Custom link';
    const Icon = iconFor(href);
    const id = `${Date.now()}`;
    setResources((prev) => [{ id, title, href, description, icon: Icon }, ...prev]);
  };

  const handleReorder = (dragId, dropId) => {
    if (dragId === dropId) return;
    setResources((prev) => {
      const list = [...prev];
      const fromIndex = list.findIndex((r) => r.id === dragId);
      const toIndex = list.findIndex((r) => r.id === dropId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return list;
    });
  };

  const dateLabel = useMemo(() => new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">{dateLabel}</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Welcome back</h1>
          </div>
        </div>

        <Hero />

        <div className="mt-6">
          <Header onAdd={handleAdd} />
          <ResourceGrid resources={resources} onReorder={handleReorder} />
        </div>

        <StickyToolbar />
      </div>
    </div>
  );
}

export default App;
