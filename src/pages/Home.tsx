import { Link } from 'react-router-dom';
import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export default function Home() {
  const featuredCaseStudies = caseStudies.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 pt-8 pb-12 md:pt-12 md:pb-24 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <img 
                src="/IMG_7775.jpeg" 
                alt="Elizabeth Dorfman"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl border-4 border-white/50 animate-fade-in-delay-1"
              />
            </div>
            <p className="text-sm md:text-base text-purple-600 font-light tracking-widest mb-4 uppercase">Product Engineer</p>
            <h1 className="text-5xl md:text-8xl font-light text-purple-900 mb-6 tracking-tight leading-tight">
              Elizabeth<br/>Dorfman
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 mx-auto mb-8"></div>
            <p className="text-lg md:text-2xl text-purple-700 mb-8 font-light leading-relaxed max-w-2xl mx-auto">
              Building products at the intersection of <span className="italic">business strategy</span> and <span className="italic">technical excellence</span>. 
              Every feature solves a real problem. Every decision drives measurable impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <Link
                to="/case-studies"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full font-medium hover:from-purple-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg tracking-wide"
              >
                View My Work
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/80 text-purple-900 border border-purple-200 rounded-full font-medium hover:bg-white hover:border-purple-300 transition-all duration-300 shadow-md hover:shadow-lg text-lg tracking-wide backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-24 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-light text-purple-900 mb-8">The Dual Perspective</h2>
            <p className="text-lg text-purple-700 font-light leading-relaxed mb-6">
              Most engineers think about <i>how</i> to build things. I think about <i>why</i> we should build them.
            </p>
            <p className="text-base text-purple-600 font-light leading-relaxed">
              My background in both business and software engineering gives me a rare perspective. I understand unit economics, go-to-market strategy, and how products drive real value. But I also have the technical depth to execute on complex problems. This means I ask better questions, challenge weak assumptions, and ship solutions that matter—products that drive measurable impact on both user satisfaction and business metrics.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-light text-purple-900 mb-4">Case Studies</h2>
            <p className="text-base text-purple-600 font-light max-w-3xl mx-auto mb-4">
              Real projects. Real impact. From <span className="font-semibold">Sapien</span>, a leading data labeling platform powering AI for Alibaba, ByteDance, and Zoox.
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
          <div className="text-center animate-fade-in-up">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
            >
              View All Case Studies →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

