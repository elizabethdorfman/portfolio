export default function About() {
  const skills = {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'REST APIs'],
    tools: ['Git', 'Vite', 'Webpack', 'Docker', 'AWS', 'CI/CD'],
    product: ['User Research', 'Metrics & Analytics', 'A/B Testing', 'Product Strategy', 'Agile/Scrum'],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <img 
            src="/IMG_8965.jpeg" 
            alt="Elizabeth Dorfman"
            className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-xl border-4 border-white/50 flex-shrink-0"
          />
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-light text-purple-900 mb-8">About</h1>
            <div className="bg-pink-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
              <p className="text-base text-purple-700 font-light italic">
                This site is still being built out, but if you'd like to read some of my case studies, please go ahead.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-light text-purple-900 mb-8">Toolkit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-3">💻 Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-3">⚙️ Backend</h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-3">🔧 Tools & Infrastructure</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-3">📊 Product & Strategy</h3>
            <div className="flex flex-wrap gap-2">
              {skills.product.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-light text-purple-900 mb-8">Contact</h2>
        <div className="flex flex-col space-y-4">
          <a
            href="mailto:elizabethdorfman31@gmail.com"
              className="text-purple-700 hover:text-purple-900 font-medium"
          >
            elizabethdorfman31@gmail.com
          </a>
          <div className="flex space-x-6">
            <a
              href="https://github.com/elizabethdorfman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-pink-600 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/elizabethdorfman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-pink-600 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/elizabethdorfman99"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-pink-600 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

