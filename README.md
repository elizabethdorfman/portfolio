# Elizabeth Dorfman - Product Engineering Portfolio

A portfolio website showcasing product engineering work, case studies, and technical expertise.

## 🎯 Purpose

This portfolio demonstrates:
- Product engineering skills and experience
- Technical decision-making and problem-solving
- Impact and results from shipped products
- Process and collaboration in product development

## 🚀 Tech Stack

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support
- **Deployment**: Vercel / Netlify

## 📁 Project Structure

```
src/
├── components/      # Reusable React components
│   ├── Layout.tsx
│   ├── Nav.tsx
│   ├── Footer.tsx
│   └── CaseStudyCard.tsx
├── pages/          # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── CaseStudies.tsx
│   └── CaseStudyDetail.tsx
├── data/           # Case study data
│   └── caseStudies.ts
├── assets/         # Images and static assets
└── App.tsx         # Main app component with routing
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix
```

## 📚 Documentation

- **[BUILD_PLAN.md](./BUILD_PLAN.md)**: Step-by-step 3-hour build plan
- **[PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md)**: Rules and guidelines for product engineering portfolios

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework Preset: Vite
5. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub
3. Click "Add new site" > "Import an existing project"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

**Live URL**: [Will be added after deployment]

## 📝 Case Studies

The portfolio includes 3 detailed case studies demonstrating:
1. Problem-solving approach
2. Technical architecture and decisions
3. Impact and measurable results
4. Learnings and iteration

Each case study follows the structure outlined in [PORTFOLIO_GUIDE.md](./PORTFOLIO_GUIDE.md).

## 📧 Contact

- GitHub: [@elizabethdorfman](https://github.com/elizabethdorfman)
- LinkedIn: [Elizabeth Dorfman](https://linkedin.com/in/elizabethdorfman)
- Email: elizabethdorfman31@gmail.com

---

Built with ❤️ by Elizabeth Dorfman
