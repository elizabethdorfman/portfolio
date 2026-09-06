import { useId, useLayoutEffect, useRef, useState } from 'react';
const chapters = [
  ['Make a sunlit gallery by the sea.', 'Add flowers, servers, and a white glass table.'],
  ['Shape David from a circuit board.', 'Use the power of the computer to bring him to life.'],
  ['Add some colour to this masterpiece.'],
  ['Lift David, colour, and flowers onto a pink canvas.', 'Arrange them into something playful.'],
];
const closing = ['I make powerful technology', 'feel simple and beautiful.'];

function PaintedLine({text,center,baseline,amount,id}:{text:string;center:number;baseline:number;amount:number;id:string}) {
  const ref=useRef<SVGTextElement>(null);
  const [edge,setEdge]=useState(0);
  const [width,setWidth]=useState(0);
  const count=amount>=.999?text.length:Math.floor(Math.max(0,Math.min(1,amount))*text.length);
  const left=center-width/2;
  useLayoutEffect(()=>{
    let active=true;
    const measure=()=>{
      const node=ref.current;if(!active||!node)return;
      const naturalWidth=node.getComputedTextLength();
      setWidth(naturalWidth);
      setEdge(count===0?0:count===text.length?naturalWidth:node.getSubStringLength(0,count));
    };
    measure();document.fonts.ready.then(measure);
    return()=>{active=false;};
  },[count,text]);
  return <g>
    <defs><clipPath id={id}><rect x={left-1} y={baseline-45} width={count===text.length?width+8:edge} height="58"/></clipPath></defs>
    <text ref={ref} x={center} y={baseline} textAnchor="middle" className="prompt-painted-letters" fill="#b85490" clipPath={`url(#${id})`}>{text}</text>
    {amount>=0&&amount<1&&<g transform={`translate(${left+edge} ${baseline-12}) rotate(30)`} aria-hidden="true">
      <path d="M0 0 Q-7 -9 -5 -17 L5 -17 Q7 -9 0 0" fill="#b94c88"/>
      <path d="M-5 -17 L-4 -28 L4 -28 L5 -17Z" fill="#c3c7c9"/>
      <path d="M-3 -28 L-2 -65 Q0 -70 2 -65 L3 -28Z" fill="#faf6ef" stroke="#aaa49b" strokeWidth=".6"/>
    </g>}
  </g>;
}
export default function PromptDirector({stage,amount}:{stage:number;amount:number}) {
  const id=useId().replace(/:/g,'');
  if(stage===4)return <header className="prompt-site-headline">
    <h1 className="sr-only">{closing.join(' ')}</h1>
    <svg className="closing-painted" viewBox="0 0 760 128" aria-hidden="true">
      {closing.map((line,i)=><PaintedLine key={line} text={line} center={380} baseline={48+i*57} amount={amount*closing.length-i} id={`${id}-${i}`}/>)}
    </svg>
    <div className="prompt-status"><span className="prompt-pulse" aria-hidden="true"/>{amount>=1?'Complete':''}</div>
  </header>;
  const lines=chapters[stage];
  return <aside className={`prompt-director ${stage===0?'prompt-opening':stage===1?'prompt-shaping':''}`} aria-label="Creative direction">
    <p className="sr-only">{lines.join(' ')}</p>
    <svg className="prompt-painted" viewBox={`0 0 760 ${lines.length*57+14}`} role="img" aria-label={lines.join(' ')}>
      {lines.map((line,i)=><PaintedLine key={line} text={line} center={380} baseline={48+i*57} amount={amount*lines.length-i} id={`${id}-chapter-${i}`}/>)}
    </svg>
    <div className="prompt-status" style={{visibility:amount>=1?'visible':'hidden'}}><span className="prompt-pulse" aria-hidden="true"/>Generating…</div>
  </aside>;
}
