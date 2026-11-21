import { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowRight, ArrowUpRight, Search, X } from 'lucide-react';
import type { Technology } from '../types';
import '../mission.css';

type Props = { technologies: Technology[]; search: string; setSearch: (value: string) => void; onOpen: (id: string) => void; count: (tech: string, topic: string) => number };

export function MissionSelect({ technologies, search, setSearch, onOpen, count }: Props) {
  const [selected, setSelected] = useState('java');
  const visible = technologies.filter(t => `${t.name} ${t.description} ${t.topics.map(p => p.name).join(' ')}`.toLowerCase().includes(search.toLowerCase().trim()));
  const active = visible.find(t => t.id === selected) ?? visible[0];
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const intro = animate('.mission-preview-content', { opacity: [0, 1], translateY: [16, 0], duration: 440, ease: 'outExpo' });
    const chips = animate('.mission-chip', { opacity: [0, 1], scale: [.85, 1], delay: stagger(50), duration: 400, ease: 'outBack' });
    return () => { intro.cancel(); chips.cancel(); };
  }, [active?.id]);
  return <section id="explore" className="mission-section"><div className="wrap">
    <div className="mission-heading"><div><div className="mission-eyebrow">✳ YOUR NEXT CHALLENGE AWAITS</div><h2>CHOOSE YOUR<br/><span>PLAYGROUND.</span></h2></div><p>Four worlds. A universe of things to learn. Pick the one calling your name.</p></div>
    <div className="mission-control"><div className="mission-list-panel"><div className="mission-panel-label"><span>SELECT A WORLD</span><span>0{visible.length} AVAILABLE</span></div><label className="mission-search"><Search size={18}/><span className="sr-only">Search technologies or topics</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your thing..."/>{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={16}/></button>}</label><div className="mission-list" role="group" aria-label="Select a technology">{visible.map(t => <button key={t.id} className={`mission-option ${active?.id === t.id ? 'is-active' : ''}`} aria-pressed={active?.id === t.id} onClick={() => setSelected(t.id)}><span className="mission-option-num">0{technologies.indexOf(t) + 1}</span><span className="mission-option-name">{t.name}</span><span className="mission-option-icon"><t.icon size={21}/></span><ArrowUpRight className="mission-option-arrow" size={20}/></button>)}</div>{!active && <div className="mission-empty"><strong>No worlds found.</strong><p>Try another search.</p><button onClick={() => setSearch('')}>Clear search</button></div>}</div>
    {active && <div className={`mission-preview world-${active.id}`}><div className="mission-preview-top"><span>WORLD 0{technologies.indexOf(active) + 1} / 04</span><span>✦ READY TO EXPLORE</span></div><div className="mission-art" aria-hidden="true"><div className="mission-art-ring ring-one"/><div className="mission-art-ring ring-two"/><div className="mission-art-core"><active.icon size={66} strokeWidth={1.4}/></div><span className="mission-art-star">✳</span></div><div className="mission-preview-content" key={active.id}><span className="mission-code">YOUR MISSION, SHOULD YOU ACCEPT IT</span><h3>{active.name}<span> ↗</span></h3><p>{active.description}</p><div className="mission-chips">{active.topics.slice(0, 4).map(topic => <span className="mission-chip" key={topic.id}>{topic.name}</span>)}{active.topics.length > 4 && <span className="mission-chip">+{active.topics.length - 4}</span>}</div><div className="mission-preview-bottom"><span><b>{active.topics.length}</b> TOPICS &nbsp; / &nbsp; <b>{active.topics.reduce((s, p) => s + count(active.id, p.id), 0)}</b> QUESTIONS</span><button onClick={() => onOpen(active.id)}>EXPLORE {active.name.toUpperCase()} <ArrowRight size={17}/></button></div></div></div>}</div>
    <div className="mission-after"><span>NO SIGN-UP. NO GATEKEEPING.</span><strong>JUST YOU &amp; YOUR NEXT AHA MOMENT <span>✳</span></strong><span>BUILT FOR CURIOUS MINDS ↗</span></div>
  </div></section>;
}
