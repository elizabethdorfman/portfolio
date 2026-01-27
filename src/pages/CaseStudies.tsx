import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  return (
    <div className="bg-white">
      <div id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Case Studies</h1>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-8" aria-hidden="true"></div>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Deep dives into product engineering projects—from problem discovery to measurable impact. 
              Most case studies are from my work at <span className="font-semibold text-slate-900">Sapien</span>, a leading data labeling platform 
              that powers AI development for clients like Alibaba, ByteDance, and Zoox.
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  );
}

