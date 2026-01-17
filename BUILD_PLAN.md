# 3-Hour Build & Deploy Plan
## Product Engineering Portfolio for Elizabeth Dorfman

**Goal**: Build and deploy a product engineering portfolio showcasing 3 case studies to land product engineering roles.

---

## Phase 1: Setup & Foundation (20 min)
**Time: 0:00 - 0:20**

### Tasks:
- [ ] Initialize GitHub repository
  - Create repo: `portfolio-elizabeth-dorfman` (or similar)
  - Add README.md with basic description
  - Choose license (MIT recommended)
  
- [ ] Initialize Vite + React + TypeScript project
  ```bash
  npm create vite@latest . -- --template react-ts
  npm install
  ```

- [ ] Install dependencies
  ```bash
  npm install react-router-dom
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [ ] Set up folder structure
  ```
  src/
  ├── components/
  │   ├── Layout.tsx
  │   ├── Nav.tsx
  │   ├── Footer.tsx
  │   └── CaseStudyCard.tsx
  ├── pages/
  │   ├── Home.tsx
  │   ├── About.tsx
  │   ├── CaseStudies.tsx
  │   └── CaseStudyDetail.tsx
  ├── data/
  │   └── caseStudies.ts
  ├── assets/
  │   └── images/
  └── App.tsx
  ```

- [ ] Configure Tailwind CSS
- [ ] Set up React Router
- [ ] Create basic Layout component
- [ ] Test dev server: `npm run dev`

**Deliverable**: Working dev environment with basic routing

---

## Phase 2: Content Creation (50 min)
**Time: 0:20 - 1:10**

### Tasks:

#### About Page Content (10 min)
- [ ] Write bio (2-3 paragraphs)
  - Who you are
  - Your product engineering focus
  - Core strengths and values
  - What you're looking for
  
- [ ] Create skills list
  - Frontend: React, TypeScript, etc.
  - Backend: (if applicable)
  - Tools: Vite, Git, etc.
  - Product: User research, metrics, etc.

#### Case Study Selection & Content (40 min)
- [ ] Choose 3 projects (5 min)
  - Pick variety: different domains, complexity, or tech stacks
  - Ensure you can clearly articulate your role in each
  
- [ ] For each case study, write:
  - **Project 1** (12 min):
    - Title, company, role, timeline
    - Problem statement (2-3 sentences)
    - Your approach (3-4 bullet points)
    - Key technical decisions
    - Impact/metrics (2-3 sentences)
    - Lessons learned (1-2 sentences)
  
  - **Project 2** (12 min): Same structure
  
  - **Project 3** (11 min): Same structure

- [ ] Collect/gather visuals
  - Screenshots, diagrams, or placeholders
  - Save to `src/assets/images/`

**Deliverable**: All content written, ready to format

---

## Phase 3: Design & Styling (40 min)
**Time: 1:10 - 1:50**

### Tasks:

#### Design System (10 min)
- [ ] Choose color palette
  - Primary, secondary, accent colors
  - Text colors (dark/light)
  - Background colors
  
- [ ] Set typography
  - Heading font (e.g., Inter, Geist)
  - Body font
  - Font sizes and weights
  
- [ ] Define spacing scale
  - Consistent padding/margins

#### Component Styling (30 min)
- [ ] Home page (10 min)
  - Hero section with name and tagline
  - Intro paragraph
  - Case study preview cards (3 cards)
  - Call-to-action
  
- [ ] Case Studies list page (5 min)
  - Grid layout of case study cards
  - Each card: thumbnail, title, brief description
  
- [ ] Case Study detail page (10 min)
  - Header with title, role, timeline
  - Sections: Problem, Approach, Solution, Impact, Learnings
  - Image placeholders
  - Responsive layout
  
- [ ] About page (3 min)
  - Bio section
  - Skills grid/list
  
- [ ] Navigation & Footer (2 min)
  - Clean nav bar
  - Footer with links (GitHub, LinkedIn, Email)

**Deliverable**: Fully styled, responsive site

---

## Phase 4: Testing & Polish (20 min)
**Time: 1:50 - 2:10**

### Tasks:
- [ ] Mobile responsiveness check
  - Test on different screen sizes
  - Fix any layout issues
  
- [ ] Navigation testing
  - All links work
  - Back buttons function correctly
  - Smooth transitions
  
- [ ] Content review
  - Proofread all text
  - Check for typos
  - Ensure clarity
  
- [ ] Performance check
  - Images optimized
  - Fast load times
  - No console errors
  
- [ ] Update README.md
  - Portfolio description
  - Tech stack list
  - How to run locally
  - Link to live site (after deployment)

**Deliverable**: Polished, tested site ready for deployment

---

## Phase 5: Deploy & Share (30-40 min)
**Time: 2:10 - 3:00**

### Tasks:

#### GitHub Setup (10 min)
- [ ] Commit all changes
  ```bash
  git add .
  git commit -m "Initial portfolio setup"
  ```
  
- [ ] Push to GitHub
  ```bash
  git remote add origin [your-repo-url]
  git push -u origin main
  ```

#### Deployment (15 min)
- [ ] Choose platform (Vercel recommended)
  - Go to vercel.com
  - Connect GitHub account
  - Import repository
  
- [ ] Configure build settings
  - Build command: `npm run build`
  - Output directory: `dist`
  - Framework preset: Vite
  
- [ ] Deploy
  - Wait for build to complete
  - Get live URL

#### Final Checks (10 min)
- [ ] Test live site
  - All pages load correctly
  - Links work
  - Mobile view works
  - Images load
  
- [ ] Update README with live link
- [ ] Add portfolio link to GitHub profile
- [ ] Share with friends/colleagues for feedback

**Deliverable**: Live portfolio site, ready to share!

---

## Time-Saving Tips

1. **Start with placeholder content**: Write "lorem ipsum" first, replace with real content later
2. **Use Tailwind defaults**: Don't spend time customizing colors initially
3. **Template case studies**: Create one detailed case study, then copy structure for others
4. **Deploy early**: Get it live, then iterate
5. **Focus on desktop first**: Quick mobile pass at the end

---

## MVP Checklist

**Must have before launch:**
- [x] Home page with intro
- [x] 3 case study pages (can be placeholders initially)
- [x] About page
- [x] Navigation working
- [x] Responsive design
- [x] Deployed and live
- [x] GitHub repo public

**Can add later:**
- Animations/transitions
- More detailed case study content
- Contact form
- Blog section
- Custom domain
- Analytics

---

## Post-Launch Improvements

After the initial 3-hour build, consider:

1. **Week 1**: Refine case study content with more detail
2. **Week 2**: Add more visuals (diagrams, screenshots)
3. **Week 3**: Optimize SEO and add analytics
4. **Ongoing**: Update with new projects, keep content fresh

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Git
git add .
git commit -m "message"
git push

# Tailwind
npx tailwindcss init -p  # Initialize Tailwind
```

---

## Success Criteria

Your portfolio is successful if:
- ✅ Clearly shows your product engineering skills
- ✅ Demonstrates impact and results
- ✅ Easy to navigate and understand
- ✅ Loads quickly and works on mobile
- ✅ Makes hiring managers want to interview you

**Remember**: The goal is to get product engineering interviews. Focus on showing your process, impact, and technical depth.

