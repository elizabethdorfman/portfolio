import { useParams, Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const caseStudy = caseStudies.find((cs) => cs.id === id);
  const mermaidRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!caseStudy?.diagrams) return;
    
    mermaid.initialize({ 
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
    
    // Render all mermaid diagrams
    caseStudy.diagrams.forEach((diagram, index) => {
      if (diagram.mermaid && mermaidRefs.current[index]) {
        const element = mermaidRefs.current[index];
        if (element && !element.hasAttribute('data-processed')) {
          element.setAttribute('data-processed', 'true');
          const id = `mermaid-${caseStudy.id}-${index}`;
          mermaid.render(id, diagram.mermaid).then((result) => {
            if (element) {
              element.innerHTML = result.svg;
            }
          }).catch((error) => {
            console.error('Mermaid rendering error:', error);
          });
        }
      }
    });
  }, [caseStudy]);

  if (!caseStudy) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-purple-600 hover:text-purple-700">
          Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link
          to="/case-studies"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <svg
            className="mr-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Case Studies
        </Link>
        <div className="mb-4">
          <span className="text-sm font-medium text-purple-600">{caseStudy.company}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-2">{caseStudy.title}</h1>
      </div>

      {/* Problem Statement */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Problem Statement</h2>
        <p className="text-purple-700 leading-relaxed text-lg">{caseStudy.problem}</p>
      </section>

      {/* Discovery & Research */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Discovery & Research</h2>
        <p className="text-purple-700 leading-relaxed text-lg whitespace-pre-line">{caseStudy.discovery}</p>
      </section>

      {/* Solution & Engineering Approach */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Solution & Engineering Approach</h2>
        <p className="text-purple-700 leading-relaxed text-lg whitespace-pre-line mb-6">{caseStudy.solution}</p>
        
        {/* Video */}
        {caseStudy.video && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-xl border border-pink-200">
            <video 
              src={caseStudy.video}
              controls
              className="w-full h-auto"
              style={{ maxHeight: '600px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        {/* Screenshot */}
        {caseStudy.screenshot && !caseStudy.video && (
          <div className="my-8 rounded-2xl overflow-hidden shadow-xl border border-pink-200">
            <img 
              src={caseStudy.screenshot} 
              alt={`${caseStudy.title} screenshot`}
              className="w-full h-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Diagrams */}
        {caseStudy.diagrams && caseStudy.diagrams.length > 0 && (
          <div className="space-y-12 my-12">
            {caseStudy.diagrams.map((diagram, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 md:p-8 border border-pink-200/50">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{diagram.title}</h3>
                <p className="text-purple-600 mb-6">{diagram.description}</p>
                {diagram.mermaid && (
                  <div 
                    ref={(el) => { mermaidRefs.current[index] = el; }}
                    className="mermaid-diagram bg-white rounded-lg p-4 overflow-x-auto"
                  >
                    {/* Mermaid will render here */}
                  </div>
                )}
                {diagram.image && (
                  <img 
                    src={diagram.image} 
                    alt={diagram.title}
                    className="w-full rounded-lg shadow-md"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-medium text-purple-900 mb-3">Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Impact & Results</h2>
        <p className="text-purple-700 leading-relaxed text-lg whitespace-pre-line">{caseStudy.impact}</p>
      </section>

      {/* Learnings */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-purple-900 mb-4">Learnings</h2>
        <p className="text-purple-700 leading-relaxed text-lg whitespace-pre-line">{caseStudy.learnings}</p>
      </section>
    </div>
  );
}
