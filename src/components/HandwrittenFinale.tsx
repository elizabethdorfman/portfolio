import { useEffect, useRef } from 'react';

const lines = ['Making powerful technology', 'feel simple.', ''];

export default function HandwrittenFinale({ active, amount, loading, introVisible }: { active: boolean; amount: number; loading: boolean; introVisible: boolean; onSkip: () => void }) {
  const brush = useRef<SVGGElement>(null);
  const finished = active && amount >= 1;
  useEffect(() => {
    if (!brush.current) return;
    const fraction = Math.max(0, Math.min(amount, 1));
    const row = Math.min(1, Math.floor(fraction * 2));
    const progress = Math.min(1, fraction * 2 - row);
    const width = row === 0 ? 620 : 290;
    const x = (640 - width) / 2 + width * progress;
    brush.current.setAttribute('transform', `translate(${x} ${row * 70 + 49}) rotate(24)`);
    brush.current.style.opacity = !active || fraction <= 0 || fraction >= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? '0' : '1';
  }, [active, amount]);
  // The parent remounts this component when the scroll sequence is replayed.
  return <>


    <header className={`handwritten-heading ${active ? 'is-writing' : ''}`}>
      <h1 className="sr-only">Making powerful technology feel simple.</h1>
      <svg viewBox="0 0 640 240" aria-hidden="true" className="handwritten-ink">
        <defs>
          <linearGradient id="glass-pink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop stopColor="#b52bc0"/><stop offset=".35" stopColor="#f060ce" stopOpacity=".88"/><stop offset=".52" stopColor="#f68ce0" stopOpacity=".8"/><stop offset=".7" stopColor="#e438b0" stopOpacity=".92"/><stop offset="1" stopColor="#9745cc"/>
          </linearGradient>
          <filter id="paint-pigment" x="-3%" y="-10%" width="106%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".045 .08" numOctaves="2" seed="12" result="wash"/>
            <feColorMatrix in="wash" type="matrix" values="0 0 0 0 .65 0 0 0 0 .02 0 0 0 0 .5 0 0 0 1.1 -.2" result="pigment"/>
            <feComposite in="pigment" in2="SourceGraphic" operator="in" result="pooled"/>
            <feBlend in="SourceGraphic" in2="pooled" mode="multiply"/>
          </filter>
        </defs>
        {lines.filter(Boolean).map((line, row) => {
          const width = row === 0 ? 620 : 290;
          const progress = Math.max(0, Math.min(1, amount * 2 - row));
          return <g key={line}>
            <defs><clipPath id={`paint-reveal-${row}`}><rect x={(640 - width) / 2 - 5} y={row * 70} width={(width + 10) * progress} height="80"/></clipPath></defs>
            <text x="320" y={row * 70 + 55} textAnchor="middle" textLength={width} lengthAdjust="spacingAndGlyphs" className="paint-lettering" fill="url(#glass-pink)" filter="url(#paint-pigment)" clipPath={`url(#paint-reveal-${row})`}>{line}</text>
          </g>;
        })}
        <g ref={brush} className="writing-brush" style={{opacity:0}}>
          <defs>
            <linearGradient id="brush-ferrule"><stop stopColor="#666d70"/><stop offset=".18" stopColor="#c4cacc"/><stop offset=".36" stopColor="#fff"/><stop offset=".53" stopColor="#b0b7bb"/><stop offset=".76" stopColor="#e6e9e9"/><stop offset="1" stopColor="#727a80"/></linearGradient>
            <linearGradient id="brush-handle"><stop stopColor="#b6b4af"/><stop offset=".3" stopColor="#faf9f5"/><stop offset=".52" stopColor="#fff"/><stop offset=".8" stopColor="#e3e1db"/><stop offset="1" stopColor="#a3a4a0"/></linearGradient>
            <linearGradient id="brush-hair" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#493025"/><stop offset=".4" stopColor="#b18a5b"/><stop offset=".7" stopColor="#80603c"/><stop offset="1" stopColor="#38271f"/></linearGradient>
            <linearGradient id="brush-paint" x1="0%" y1="0%" x2="0%" y2="100%"><stop stopColor="#b74c99" stopOpacity="0"/><stop offset=".45" stopColor="#c149a6" stopOpacity=".8"/><stop offset="1" stopColor="#922175"/></linearGradient>
          </defs>
          <path d="M-4.6 -40 C-5.4 -62 -3.6 -102 -1.4 -119 Q0 -123 1.4 -119 C3.6 -102 5.4 -62 4.6 -40Z" fill="url(#brush-handle)"/>
          <path d="M-2 -45 Q-3.4 -79 -.7 -115" fill="none" stroke="#fff" strokeWidth=".7" opacity=".85"/>
          <path d="M-5.4 -24 L-4.6 -43 Q0 -44 4.6 -43 L5.4 -24 Q0 -22.6 -5.4 -24Z" fill="url(#brush-ferrule)"/>
          <path d="M-4.7 -40 Q0 -39 4.7 -40 M-5.1 -28 Q0 -26.8 5.1 -28" fill="none" stroke="#61696c" strokeWidth=".7" opacity=".65"/>
          <path d="M-4.7 -38.8 Q0 -37.8 4.7 -38.8 M-5.2 -26.7 Q0 -25.5 5.2 -26.7" fill="none" stroke="#fff" strokeWidth=".45" opacity=".8"/>
          <path d="M-5.3 -24 C-6 -15 -3 -6 0 0 C3 -5 6 -15 5.3 -24Z" fill="url(#brush-hair)"/>
          <g fill="none" strokeWidth=".35" opacity=".65">
            <path d="M-4 -23 Q-4 -11 0 -1 M-2.4 -23 Q-2 -9 0 -1 M.2 -23 L0 -1 M2 -23 Q2.8 -11 0 -1 M4 -23 Q4 -10 0 -1" stroke="#d3ad78"/>
            <path d="M-3.2 -23 Q-2.7 -10 0 -1 M1 -23 Q1.3 -10 0 -1 M3 -23 Q3 -10 0 -1" stroke="#3f2920"/>
          </g>
          <path d="M-4.5 -15 C-4 -9 -1.8 -3 0 0 C2.6 -5 4.2 -10 4.6 -16 Q1 -13 -1 -16Z" fill="url(#brush-paint)"/>
          <path d="M-1.5 -8 Q-.8 -4 0 -2" fill="none" stroke="#f4a5dc" strokeWidth=".65" strokeLinecap="round" opacity=".8"/>

        </g>
      </svg>
    </header>
    {introVisible && !active && !loading && <div className="studio-scroll-hint">Scroll to explore <span aria-hidden="true">↓</span></div>}
    {active && !finished && <div className="studio-writing-hint studio-glass"><span className="desktop-gesture-hint">Keep scrolling to paint</span><span className="mobile-gesture-hint">Swipe up to paint</span> <span aria-hidden="true">↓</span></div>}
    {finished && <nav className="studio-bottom-links" aria-label="Explore Elizabeth’s portfolio">
      <a className="studio-glass" href="/Elizabeth_Dorfman_Resume_Aug2026.pdf" download="Elizabeth_Dorfman_Resume_Aug2026.pdf">Résumé <span>↗</span></a>
      <a className="studio-glass" href="mailto:elizabethdorfman31@gmail.com">Contact <span>↗</span></a>
    </nav>}
  </>;
}

export function StudioNameplate(){
  return <div className="studio-nameplate studio-glass"><span className="studio-portrait-glass"><img className="studio-portrait" src="/elizabeth-watercolor-180.png" alt="" width="48" height="48" /><span className="portrait-sparkles" aria-hidden="true"><i/><i/><i/></span></span><div className="studio-identity"><div className="studio-name">Elizabeth Dorfman</div><div className="studio-role"><span aria-hidden="true">›_</span> software engineer<span className="nameplate-cursor" aria-hidden="true" /></div></div></div>;
}
