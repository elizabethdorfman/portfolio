export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-pink-100 to-pink-50 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="max-w-md">
            <h3 className="text-lg font-light text-purple-900 mb-4">On Craft</h3>
            <p className="text-purple-700 text-sm font-light leading-relaxed">
              Software engineering is a craft—one that requires both technical depth and thoughtful intention. 
              Every line of code, every design decision, every product feature is a choice. I believe in making 
              those choices with care, understanding the why behind the what, and building products that solve 
              real problems with elegance and precision.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-light text-purple-900 mb-4">Connect</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com/elizabethdorfman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-purple-900 text-sm font-light transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/elizabethdorfman"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-purple-900 text-sm font-light transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/elizabethdorfman99"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-700 hover:text-purple-900 text-sm font-light transition-colors"
              >
                Instagram
              </a>
              <a
                href="mailto:elizabethdorfman31@gmail.com"
                className="text-purple-700 hover:text-purple-900 text-sm font-light transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-pink-200 text-center">
          <p className="text-sm text-purple-600 font-light">
            &copy; {new Date().getFullYear()} Elizabeth Dorfman
          </p>
        </div>
      </div>
    </footer>
  );
}

