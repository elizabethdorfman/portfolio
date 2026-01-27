import { Link } from 'react-router-dom';
import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export default function Home() {
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section id="main-content" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-indigo-300 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img 
                  src="/profile-picture.png" 
                  alt="Elizabeth Dorfman - Product Engineer"
                  className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-indigo-100"
                  loading="eager"
                />
              </div>
            </div>

            {/* Role Badge */}
            <div className="mb-6 animate-fade-in-delay-1">
              <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
                Product Engineer
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl text-indigo-600 mb-6 font-semibold tracking-tight leading-[1.2] max-w-4xl mx-auto animate-fade-in-delay-2">
              Building Features That Drive Revenue
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-6 font-light leading-relaxed max-w-3xl mx-auto animate-fade-in-delay-3">
              I've shipped products used by millions at companies like <span className="font-semibold text-slate-900">Sapien</span>, turning ambiguous requirements into profitable features
            </p>

            {/* Social Proof Metrics */}
            <div className="flex flex-wrap justify-center gap-8 mb-10 animate-fade-in-delay-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">2+</div>
                <div className="text-sm text-slate-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">100K+</div>
                <div className="text-sm text-slate-600 font-medium">Users Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">1000s</div>
                <div className="text-sm text-slate-600 font-medium">Hours Saved</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-delay-6">
              <Link
                to="/case-studies"
                className="group relative w-full sm:w-auto px-8 py-4 min-h-[44px] flex items-center justify-center bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base tracking-wide overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              >
                <span className="relative z-10">Explore My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto px-8 py-4 min-h-[44px] flex items-center justify-center bg-white text-slate-900 border-2 border-slate-200 rounded-lg font-semibold hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow-md text-base tracking-wide focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              The Dual Perspective
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-12"></div>
            <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed mb-8 max-w-3xl mx-auto">
              Most engineers think about <em className="font-medium not-italic text-slate-900">how</em> to build things. I think about <em className="font-medium not-italic text-slate-900">why</em> we should build them.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
              My background in both business and software engineering gives me a rare perspective. I understand unit economics, go-to-market strategy, and how products drive real value. But I also have the technical depth to execute on complex problems. This means I ask better questions, challenge weak assumptions, and ship solutions that matter—products that drive measurable impact on both user satisfaction and business metrics.
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-200">
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Business-Focused</h3>
                <p className="text-sm text-slate-600">Every feature tied to measurable business outcomes</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Technical Excellence</h3>
                <p className="text-sm text-slate-600">Deep technical depth to execute complex solutions</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-3">
                  <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Data-Driven</h3>
                <p className="text-sm text-slate-600">Decisions backed by metrics and user research</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Featured Work
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Real projects. Real impact. From <span className="font-semibold text-slate-900">Sapien</span>, a leading data labeling platform powering AI for Alibaba, ByteDance, and Zoox.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCaseStudies.map((caseStudy, index) => (
              <div
                key={caseStudy.id}
                className={`animate-fade-in-up ${
                  index === 0
                    ? 'animate-fade-in-delay-1'
                    : index === 1
                    ? 'animate-fade-in-delay-2'
                    : 'animate-fade-in-delay-3'
                }`}
              >
                <CaseStudyCard caseStudy={caseStudy} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base tracking-wide group"
            >
              View All Case Studies
              <svg 
                className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

