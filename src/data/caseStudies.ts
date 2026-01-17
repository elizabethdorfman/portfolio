export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  thumbnail: string;
  problem: string;
  previewText?: string; // Short preview text for cards
  discovery: string;
  solution: string;
  impact: string;
  learnings: string;
  technologies: string[];
  screenshot?: string; // Full screenshot of the product
  video?: string; // Video demonstration (.mov, .mp4, etc.)
  diagrams?: {
    type: 'architecture' | 'user-flow' | 'data-flow' | 'before-after';
    title: string;
    description: string;
    image?: string;
    mermaid?: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'operations-dashboard',
    title: 'Operations Dashboard for Data Traceability',
    company: 'Sapien',
    thumbnail: '/operations-dashboard-screenshot.png',
    problem: `Projects were unprofitable because operators couldn't trace labeling costs. When data was labeled incorrectly, some pieces were labeled up to 20 times unnecessarily—but there was no way to see which labels belonged to which data point or identify patterns. This made it impossible to catch ambiguous data early, identify malicious users, or fix misreviewed labels. The team spent hours per week in spreadsheets trying to trace costs.`,
    previewText: `Built a dashboard that enables profitability tracking by tracing labeling costs per data point. Operators can now identify patterns, catch problematic data early, and make projects profitable.`,
    discovery: `I analyzed the core business problem: no way to trace costs per project and per data point. The data model wasn't tracking the labeling process, so I needed to create an algorithm to consolidate labeling data. Operators needed to see: which data points had too many labels (ambiguous data to remove), which users were repeatedly labeling incorrectly (malicious behavior), and which correct labels were misreviewed. Technical constraints: 1000s of data points, some with 10+ labels, existing GraphQL API, 1-week timeline.`,
    solution: `I designed a datapoint-centric dashboard that enables profitability tracking by showing all labels for each data point in chronological order. Operators can now trace costs per project and per data point, identify where efficiencies can be made, and surface insights like which projects have more incorrect labels. I built filtering by tagger, reviewer, and date to identify patterns over time. I created an algorithm to consolidate labeling data by organizing labels by time and label type, and designed new GraphQL queries with pagination and progressive disclosure to handle large datasets efficiently.`,
    impact: `This dashboard enables profitability tracking per project and per data point. Operators can now catch ambiguous data points early (before 20 labels), identify malicious users, and fix misreviewed correct labels. The filtering allows operators to view issues throughout a period and trace back patterns. Expected impact: reducing hours spent in spreadsheets, enabling early detection of problematic data, and making projects profitable.`,
    learnings: `Traceability in data for business use cases is critical—without being able to trace costs and identify inefficiencies, projects become unprofitable. Organizing by datapoint rather than label provides the context needed for business insights. Making clarity out of messy data requires careful algorithm design and UI decisions to balance information density with usability.`,
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
    screenshot: '/operations-dashboard-screenshot.png',
  },
  {
    id: 'ai-automation-qa',
    title: 'AI-Powered Data Labelling',
    company: 'Sapien',
    thumbnail: '/speech-to-text-zoomed-screenshot.png',
    problem: `Our data labeling and QA workflow relied entirely on human labor—no AI integration existed. For audio transcription projects, QAers had to manually listen to entire audio files to verify transcriptions, sometimes spending up to 10 minutes per file. They either timestamped to implicitly QA or listened to the whole file to explicitly QA. This human-only approach was time-consuming, expensive, and difficult to scale. We needed our first AI integration to augment human QAers and make the process more efficient.`,
    previewText: `Built the first AI integration into our data labeling workflow, moving from human-only QA to AI-assisted processes. This tool shows audio-to-text match rates, eliminating the need for QAers to listen to entire audio files and dramatically reducing QA time and costs.`,
    discovery: `As a solo project, I analyzed our data labeling workflow and identified the core business problem: we were entirely dependent on human labor with no AI assistance. For audio projects, QAers spent significant time listening to audio files when AI could analyze the audio and provide transcription accuracy. This was an opportunity to build our first AI integration into the workflow. I researched Speech-to-Text API integration options and analyzed requirements for integrating into the existing tag flow system, replacing manual timestamping with automated transcription. Key constraint: this first AI integration would provide tools to augment human QAers, not fully automate—full automation could come later.`,
    solution: `I built our first AI integration into the data labeling workflow, moving from human-only to AI-assisted labeling. I created a QA interface that displays transcribed text and match rate, allowing QAers to quickly see audio-to-text accuracy without listening to entire files. I built a transcription visualization with word-level diff display that highlights differences between expected and actual transcriptions, making it easy for QAers to see what's happening in the audio file visually. I integrated a Speech-to-Text API service and designed a desktop-first interface optimized for QA accuracy. The hardest technical challenge was integrating AI into our complex, previously human-only workflow—accounting for all edge cases where it could be triggered depending on review outcomes, and ensuring accurate match rate calculation with clear visualization.`,
    impact: `This first AI integration into our data labeling workflow dramatically reduced QA time and costs—QAers can now look at audio-to-text match rates instead of listening to entire audio files (which previously took up to 10 minutes per file). The visual transcription and word-level diffs make it easy to quickly identify transcription errors without any audio playback. This marked a shift from human-only to AI-assisted labeling, proving that AI could augment human QAers effectively. While I don't have exact metrics yet, the expected impact is reducing QA time from ~10 minutes per file to just seconds of visual review, significantly reducing QA costs, and enabling the ability to scale audio transcription projects more efficiently. This first AI integration also established a foundation for future AI capabilities across other data labeling workflows.`,
    learnings: `Integrating AI into a previously human-only workflow requires careful design—the key is providing tools that augment human judgment rather than replacing it entirely. This first AI integration proved that AI can significantly improve data labeling workflows when designed thoughtfully. Visualization is crucial for helping humans verify AI outputs quickly—word-level diffs provide clear, actionable feedback on transcription accuracy. Balancing automation with human oversight is key for quality—starting with assistive tools before full automation was the right approach for our first AI integration. Desktop-first design is appropriate for detailed QA work where accuracy matters more than mobile accessibility.`,
    technologies: ['React', 'TypeScript', 'GraphQL', 'Speech-to-Text API', 'Audio Processing'],
    screenshot: '/speech-to-text-screenshot.png',
  },
  {
    id: 'self-serve-portal',
    title: 'Self-Serve Project Creation Portal',
    company: 'Sapien',
    thumbnail: '/self-serve-screenshot.png',
    problem: `Every new project required operator intervention—clients couldn't create projects themselves. The existing operator interface was too complex for client use, creating a bottleneck that limited scalability. As we grew, the operations team couldn't scale project creation proportionally, creating delays and reducing client autonomy.`,
    previewText: `Enabled client self-service project creation through an intuitive multi-step portal, removing operational bottlenecks and scaling project creation without proportional operator growth.`,
    discovery: `I worked with Product Management, Customer Success, Backend Engineers, and Design to analyze client requests for self-service. The core business problem was clear: project creation was a bottleneck limiting scalability. The existing operator interface had too many configuration options and technical jargon for clients. I researched multi-step onboarding best practices and gathered requirements for supported data types and project configurations. Key constraint: simplify complex project setup without losing necessary functionality.`,
    solution: `I built a customer-facing self-serve portal with a simplified, step-by-step wizard that guides clients through project creation. I designed a multi-step flow with clear instructions, file upload with validation, and progressive disclosure of configuration options. I created a separate customer portal route structure and separated customer and operator interfaces for better UX. The main challenge was simplifying complex project configuration for non-technical users while maintaining all necessary functionality.`,
    impact: `This removed the bottleneck in project creation—clients can now create projects independently without operator intervention. The self-service capability reduced time to create projects and scaled project creation without proportional operator growth. Clients found the step-by-step flow intuitive, and clear instructions helped non-technical users successfully create projects. This improved client autonomy and satisfaction while creating a foundation for expanded self-serve capabilities.`,
    learnings: `Simplifying complex workflows requires careful UX design—progressive disclosure and clear instructions are essential. Multi-step wizards work well for guided onboarding of non-technical users. Separating customer and operator interfaces improves both experiences. File upload UX needs careful attention to validation and feedback to prevent user errors.`,
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'File Upload', 'Form Handling'],
    video: '/Self-serve-portal.mov'
  }
];
