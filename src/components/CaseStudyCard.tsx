import { Link } from 'react-router-dom';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  // Extract metrics from case study content
  const getMetrics = (id: string) => {
    if (id === 'ai-automation-qa') return { label: 'QA Time Reduction', value: '90%' };
    if (id === 'operations-dashboard') return { label: 'Cost Traceability', value: '100%' };
    if (id === 'self-serve-portal') return { label: 'Self-Service', value: '100%' };
    return null;
  };

  const metric = getMetrics(caseStudy.id);

  return (
    <Link
      to={`/case-studies/${caseStudy.id}`}
      className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-indigo-200 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
      aria-label={`View case study: ${caseStudy.title}`}
    >
      <div className="aspect-video bg-slate-100 overflow-hidden relative">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=' + encodeURIComponent(caseStudy.title);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {metric && (
          <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {metric.value} {metric.label}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded">{caseStudy.company}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
          {caseStudy.title}
        </h3>
        <p className="text-slate-600 text-sm mb-5 line-clamp-3 leading-relaxed">
          {caseStudy.previewText || caseStudy.problem}
        </p>
        <div className="flex items-center text-indigo-600 text-sm font-semibold group-hover:gap-2 transition-all">
          <span>View Case Study</span>
          <svg
            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

