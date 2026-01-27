export default function Resume() {
  return (
    <div className="bg-white min-h-screen">
      <section id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Resume</h1>
          <div className="w-20 h-1 bg-indigo-600 mb-6"></div>
        </div>
        
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-lg">
          <iframe
            src="/jan-25-resume-elizabeth.pdf"
            className="w-full h-[calc(100vh-200px)] min-h-[800px]"
            title="Elizabeth Dorfman Resume"
          />
        </div>
      </section>
    </div>
  );
}

