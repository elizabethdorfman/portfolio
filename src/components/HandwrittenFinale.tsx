import { useEffect, useRef } from 'react';

// Single-line pen strokes, in writing order, rather than outlines of a font.
// Coordinates use a common baseline so adjoining letters connect naturally.
const letters: Record<string, [number, string]> = {
  a:[19,'M0 40 Q6 37 10 24 C1 19 0 43 10 40 Q16 36 17 24 L13 38 Q13 44 19 40'],
  b:[18,'M0 40 C9 28 19 0 12 4 C5 7 3 33 5 39 C8 48 23 25 13 25 Q8 25 7 32 Q12 43 18 40'],
  c:[17,'M0 40 Q5 37 7 27 C15 17 21 24 13 26 C4 20 1 46 17 40'],
  d:[20,'M0 40 Q5 38 10 25 C0 19 0 44 10 40 C17 34 26 1 20 4 C16 6 13 28 13 38 Q13 45 20 40'],
  e:[16,'M0 40 C5 37 19 24 12 23 C3 21 0 49 16 40'],
  f:[17,'M0 40 C13 22 22 0 14 3 C5 6 5 32 7 50 C9 67 17 48 7 42 Q11 37 17 40 M3 26 L19 24'],
  g:[19,'M0 40 Q7 34 10 25 C0 20 0 44 10 40 Q15 37 17 24 C14 41 14 60 6 61 C-3 61 5 49 19 40'],
  h:[21,'M0 40 C10 24 20 0 13 4 C7 8 6 29 4 40 C10 22 23 16 16 34 Q12 46 21 40'],
  i:[11,'M0 40 Q6 36 8 25 L5 37 Q4 44 11 40 M10 16 l.5 -1'],
  j:[11,'M0 40 Q5 36 9 25 C6 43 8 57 0 61 C-10 64 -4 49 11 40 M11 16 l.5 -1'],
  k:[20,'M0 40 C11 22 20 1 13 4 C6 7 6 30 4 40 M5 36 C23 17 25 31 10 33 Q15 47 20 40'],
  l:[12,'M0 40 C9 29 22 0 14 3 C7 7 3 35 6 40 Q8 43 12 40'],
  m:[31,'M0 40 Q5 36 8 25 L4 40 C12 20 21 20 15 36 L13 40 C23 19 30 22 25 35 Q21 46 31 40'],
  n:[22,'M0 40 Q5 36 8 25 L4 40 C13 20 24 20 17 35 Q13 46 22 40'],
  o:[18,'M0 40 Q7 35 9 25 C-1 27 3 48 13 38 C23 21 10 19 9 26 Q10 34 18 29'],
  p:[20,'M0 40 Q6 34 9 25 L1 60 M7 33 C14 19 24 22 18 34 C11 46 6 41 8 37 Q12 44 20 40'],
  r:[17,'M0 40 Q7 31 9 24 Q8 34 16 25 Q10 37 17 40'],
  s:[16,'M0 40 Q9 31 11 22 C9 31 20 36 10 41 Q4 44 3 39 Q10 45 16 40'],
  t:[14,'M0 40 Q8 31 13 12 C6 29 2 48 14 40 M3 25 L17 24'],
  u:[22,'M0 40 Q6 35 8 25 C-1 46 10 46 18 25 L14 37 Q13 44 22 40'],
  v:[19,'M0 40 Q5 35 7 25 C1 47 12 45 17 26 Q14 34 19 31'],
  w:[28,'M0 40 Q5 35 7 25 C0 47 11 46 16 27 C9 48 23 44 25 25 Q22 34 28 30'],
  x:[20,'M0 40 C8 30 7 23 10 25 Q13 30 14 37 Q15 44 20 40 M19 24 Q10 32 4 42'],
  y:[21,'M0 40 Q5 35 7 25 C0 46 11 44 17 25 C13 45 13 59 4 61 C-5 62 4 49 21 40'],
  E:[29,'M29 10 C17 -1 0 16 15 22 C-5 22 -2 48 18 40 Q23 38 29 40'],
  D:[32,'M0 40 Q9 38 17 7 M7 11 C34 -5 42 25 22 39 Q10 46 5 37 Q20 44 32 40'],
  z:[19,'M0 40 Q5 34 8 25 Q14 21 17 25 L7 38 C24 29 20 49 9 55 Q1 57 5 50 Q10 45 19 40'],
  T:[30,'M2 13 C10 2 28 14 35 5 M21 9 C17 23 13 38 8 41 Q3 44 1 40 M14 38 Q22 43 30 40'],
  ',':[9,'M5 40 Q7 46 2 49'],
  '.':[8,'M4 40 l.6 -.6'],
  '-':[15,'M3 32 L12 31'],
};
const lines = ['Transforming powerful technology', 'into beautiful, human-centric', 'experiences.'];
function pencilLine(line: string, row: number, lineWidth: number) {
  const width = [...line].reduce((sum, letter) => sum + (letter === ' ' ? 12 : letters[letter][0]), 0);
  let x = (lineWidth - width) / 2;
  return [...line].flatMap(letter => {
    if (letter === ' ') { x += 12; return []; }
    const [advance, d] = letters[letter];
    const stroke = { x, y: row * 66 + 12, d };
    x += advance;
    return [stroke];
  });
}
const strokes = lines.flatMap((line, row) => pencilLine(line, row, 640));

export default function HandwrittenFinale({ active, amount, loading, onSkip }: { active: boolean; amount: number; loading: boolean; onSkip: () => void }) {
  const paths = useRef<Array<SVGPathElement | null>>([]);
  const pencil = useRef<SVGGElement>(null);
  const finished = active && amount >= 1;
  useEffect(() => {
    const ink = paths.current.map(path => ({ path: path!, length: path!.getTotalLength() }));
    ink.forEach(({path,length}) => { path.style.strokeDasharray = `${length}`; path.style.strokeDashoffset = `${length}`; });
    if (pencil.current) pencil.current.style.opacity = '0';
    if (!active) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const total = ink.reduce((sum, item) => sum + item.length, 0);
    {
      const fraction = Math.max(0, Math.min(amount, 1));
      let remaining = total * fraction;
      let tipIndex = 0;
      let tipDistance = 0;
      ink.forEach(({path,length}, index) => {
        const drawn = Math.max(0, Math.min(remaining, length));
        path.style.strokeDashoffset = `${length - drawn}`;
        if (remaining > 0) { tipIndex = index; tipDistance = drawn; }
        remaining -= length;
      });
      if (pencil.current) {
        const tip = ink[tipIndex].path.getPointAtLength(tipDistance);
        pencil.current.setAttribute('transform', `translate(${tip.x + strokes[tipIndex].x} ${tip.y + strokes[tipIndex].y}) rotate(${fraction === 1 ? 72 : 24})`);
        pencil.current.style.opacity = reduced || fraction >= 1 || fraction <= 0 ? '0' : '1';
      }
    }
  }, [active, amount]);
  // The parent remounts this component when the scroll sequence is replayed.
  return <>
    <div className="studio-nameplate studio-glass"><div className="studio-identity"><div className="studio-name">Elizabeth Dorfman</div><div className="studio-role"><span aria-hidden="true">›_</span> software engineer<span className="nameplate-cursor" aria-hidden="true" /></div></div></div>

    <header className={`handwritten-heading ${active ? 'is-writing' : ''}`}>
      <h1 className="sr-only">Transforming powerful technology into beautiful, human-centric experiences.</h1>
      <svg viewBox="0 0 640 240" aria-hidden="true" className="handwritten-ink">
        <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
          {strokes.map((stroke, index) => <path key={index} d={stroke.d} transform={`translate(${stroke.x} ${stroke.y})`} ref={el => { paths.current[index] = el; }} />)}
        </g>
        <g ref={pencil} className="writing-pencil" style={{opacity:0}}>
          <defs>
            <linearGradient id="pencil-lacquer" x1="-3.5" y1="0" x2="3.5" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#233e36"/><stop offset=".3" stopColor="#6c8978"/><stop offset=".5" stopColor="#a3b8a0"/><stop offset=".65" stopColor="#597b68"/><stop offset="1" stopColor="#294b3f"/>
            </linearGradient>
            <linearGradient id="pencil-brass" x1="-4" y1="0" x2="4" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#877047"/><stop offset=".4" stopColor="#f1dfab"/><stop offset=".6" stopColor="#c7ab70"/><stop offset="1" stopColor="#8d754d"/>
            </linearGradient>
          </defs>
          <path d="M0 0 L-3.5 -19 L3.5 -19Z" fill="#d1b38b"/>
          <path d="M0 0 L.3 -17 L3.5 -19Z" fill="#e8d1ac"/>
          <path d="M-2 -15 L-.5 -5 M1 -17 L1 -9" stroke="#aa855c" strokeWidth=".4"/>
          <path d="M0 0 L-1 -5.5 Q0 -4.8 1 -5.5Z" fill="#28322e"/>
          <path d="M-3.5 -19 L-3.5 -102 Q0 -105 3.5 -102 L3.5 -19 L1.5 -21 L0 -19 L-1.5 -21Z" fill="url(#pencil-lacquer)"/>
          <path d="M-1.6 -24 V-96" stroke="#c3d1b6" strokeWidth=".45" opacity=".6"/>
          <path d="M-3.7 -99 H3.7 V-105 H-3.7Z" fill="url(#pencil-brass)"/>
          <path d="M-3.7 -100 H3.7 M-3.7 -104 H3.7" stroke="#fff0c7" strokeWidth=".4" opacity=".7"/>
          <path d="M-3.4 -105 V-109 Q0 -112 3.4 -109 V-105Z" fill="#325747"/>
          <path d="M-1 -106 V-109" stroke="#a6b69b" strokeWidth=".6"/>
          <path d="M-.5 -77 V-65 M1 -77 V-73 M1 -70 V-65" stroke="#d6c593" strokeWidth=".55" opacity=".8"/>

        </g>
      </svg>
    </header>
    {!active && !loading && <div className="studio-intro studio-glass"><span>Scroll to transform</span><button onClick={onSkip}>Skip intro ↗</button></div>}
    {active && !finished && <div className="studio-writing-hint studio-glass">Keep scrolling to write <span aria-hidden="true">↓</span></div>}
    {finished && <nav className="studio-bottom-links" aria-label="Explore Elizabeth’s portfolio">
      <a className="studio-glass" href="/Elizabeth_Dorfman_Resume_Aug2026.pdf" download="Elizabeth_Dorfman_Resume_Aug2026.pdf">Résumé <span>↗</span></a>
      <a className="studio-glass" href="mailto:elizabethdorfman31@gmail.com">Contact <span>↗</span></a>
    </nav>}
  </>;
}
