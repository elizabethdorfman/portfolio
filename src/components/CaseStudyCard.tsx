import { Link } from 'react-router-dom';
import type { CaseStudy } from '../data/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Link
      to={`/case-studies/${caseStudy.id}`}
      className="group block bg-white/90 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
    >
      <div className="aspect-video bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 overflow-hidden">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=' + encodeURIComponent(caseStudy.title);
          }}
        />
      </div>
      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm font-medium text-purple-600">{caseStudy.company}</span>
        </div>
        <h3 className="text-xl font-semibold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors">
          {caseStudy.title}
        </h3>
        <p className="text-purple-600 text-sm mb-4 line-clamp-2">
          {caseStudy.previewText || caseStudy.problem}
        </p>
        <div className="flex items-center text-purple-700 text-sm font-medium group-hover:text-purple-900 group-hover:underline transition-colors">
          View Case Study
          <svg
            className="ml-2 w-4 h-4"
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

