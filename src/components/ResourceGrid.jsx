import React from 'react';
import { Chrome, BookOpen, Code2, ExternalLink, Github, Link } from 'lucide-react';

const defaultResources = [
  {
    id: 'devtools',
    title: 'Chrome DevTools',
    href: 'chrome://inspect',
    icon: Chrome,
    description: 'Inspect, debug, and profile web apps',
  },
  {
    id: 'mdn',
    title: 'MDN Web Docs',
    href: 'https://developer.mozilla.org/',
    icon: BookOpen,
    description: 'Authoritative docs for web APIs and CSS',
  },
  {
    id: 'github',
    title: 'GitHub',
    href: 'https://github.com/',
    icon: Github,
    description: 'Repos, PRs, issues, and actions',
  },
  {
    id: 'vite',
    title: 'Vite Docs',
    href: 'https://vitejs.dev/guide/',
    icon: Code2,
    description: 'Lightning fast dev tooling',
  },
];

const ResourceCard = ({ title, href, icon: Icon, description }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
    >
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-white/10 p-2 ring-1 ring-white/10">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-white">{title}</h3>
            <ExternalLink className="h-3.5 w-3.5 text-slate-300/70 opacity-0 transition group-hover:opacity-100" />
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-300">{description}</p>
        </div>
      </div>
    </a>
  );
};

const ResourceGrid = ({ resources = defaultResources, onReorder }) => {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Quick Links</h2>
        <div className="text-xs text-slate-400">Drag to reorder</div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {resources.map((r) => (
          <div key={r.id} draggable onDragStart={(e)=>{
            e.dataTransfer.setData('text/plain', r.id);
          }} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>{
            e.preventDefault();
            const draggedId = e.dataTransfer.getData('text/plain');
            if (draggedId && onReorder) onReorder(draggedId, r.id);
          }}>
            <ResourceCard {...r} />
          </div>
        ))}
        <button
          onClick={() => window.prompt('Use the + button in the header to add links.')}
          className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 p-4 text-sm text-slate-300 hover:border-white/30 hover:bg-white/5"
        >
          <Link className="h-4 w-4" />
          Add link
        </button>
      </div>
    </section>
  );
};

export default ResourceGrid;
