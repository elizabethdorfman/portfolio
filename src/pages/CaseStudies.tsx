import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">📊 Case Studies</h1>
        <p className="text-lg text-purple-600 max-w-3xl mx-auto">
          Deep dives into product engineering projects—from problem discovery to measurable impact. 
          Most case studies are from my work at <span className="font-semibold">Sapien</span>, a leading data labeling platform 
          that powers AI development for clients like Alibaba, ByteDance, and Zoox.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </div>
  );
}

