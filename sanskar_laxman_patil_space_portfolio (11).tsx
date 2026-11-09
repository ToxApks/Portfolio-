import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  AlertCircle,
  Loader2,
  X,
  Menu,
  ExternalLink,
  Database,
  Film,
  PenTool,
  Presentation,
  Server,
  Terminal,
  Globe,
  GraduationCap,
  MapPin,
  Languages,
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  User,
  AtSign,
  Tag,
  MessageSquare,
  Send
} from 'lucide-react';

// ============================================================================
// 0. LIGHTWEIGHT REACT 18 MOTION ENGINE (REDUCED-MOTION & GPU CLEANUP AWARE)
// ============================================================================
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return reduced;
}

function useInViewOnce(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}

function RevealBlock({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.8,
  y = 20,
  x = 0,
  scale = 1,
  clip = false,
  trigger = 'inView', // 'inView' | 'immediate'
  active = true,
  threshold = 0.15
}) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref, threshold);
  const reducedMotion = usePrefersReducedMotion();
  const isShown = reducedMotion || (trigger === 'immediate' ? active : inView && active);

  const hiddenTransform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  const shownTransform = 'translate3d(0px, 0px, 0) scale(1)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isShown ? 1 : 0,
        transform: isShown ? shownTransform : hiddenTransform,
        clipPath: clip
          ? isShown
            ? 'inset(0% 0% 0% 0%)'
            : 'inset(8% 0% 8% 0%)'
          : style.clipPath,
        transition: reducedMotion
          ? 'none'
          : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, clip-path ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

// ============================================================================
// 1. STATIC CONTENT ARCHITECTURE — SANSKAR LAXMAN PATIL SOURCE OF TRUTH
// ============================================================================
const PROFILE = {
  fullName: 'Sanskar Laxman Patil',
  heroGreeting: "Hello, I'm",
  heroFirstName: 'SANSKAR',
  heroLastName: 'LAXMAN PATIL',
  heroStatus: 'AVAILABLE FOR INTERNSHIPS AND COLLABORATIONS',
  heroRoleLine1: 'AN INTERDISCIPLINARY THINKER',
  heroRoleLine2: '& DIGITAL BUILDER',
  heroTypewriterPhrases: [
    'Exploring AI & Software',
    'Working with Data & Analytics',
    'Designing Digital Experiences',
    'Building Useful Products',
    'Exploring Creative Technologies'
  ],
  supportingIdentity: 'TECHNOLOGY / AI / DATA / CREATIVITY / BUSINESS',
  tagline: 'Observe with clarity. Think with purpose. Create with intent.',
  shortIntro:
    'I explore the intersection of technology, creativity and business to turn ideas into meaningful solutions.',
  positioning:
    'I believe in understanding before creating, discipline before ambition, and substance before recognition. A technology-driven, creative and business-minded individual who combines AI, development, data, design and communication to turn ideas into meaningful products.',
  educationDegree: 'Third Year Bachelor of Computer Applications (TY BCA)',
  educationCollege: 'Rajarambapu Institute of Technology, Rajaramnagar',
  expectedGraduation: '2027',
  currentLocation: 'Sangli, Maharashtra, India',
  preferredLocation: 'Pune, Maharashtra, India',
  languages: ['Marathi', 'Hindi', 'English'],
  email: 'iamsanskar.dev@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sanskar-patil-9371a9361',
  github: 'https://github.com/ToxApks',
  portraitUrl:
    'https://res.cloudinary.com/xfmoxgsd/image/upload/f_auto/q_auto/file_000000005b648208ae58c7e2a4646557_aosfdf.png',
  secondaryInterests:
    'Alongside software engineering, AI, data analytics, and management strategy, I maintain a personal creative interest in visual aesthetics and modeling.',
  futureAspiration:
    'Long-Term MBA Aspiration — Combining technical product execution in AI and software systems with business management, communication, and strategic leadership.',
  footerNote: 'Sanskar Laxman Patil — Observe with clarity. Think with purpose. Create with intent.'
};

// Curated Section-Specific Pexels Visual Assets (Unique per section)
const SECTION_VISUALS = {
  about: {
    url: 'https://images.pexels.com/photos/37085304/pexels-photo-37085304.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Minimal coding workspace setup representing discipline and architectural thinking',
    sourceUrl: 'https://www.pexels.com/photo/remote-work-setup-with-coding-on-laptop-37085304/'
  },
  skills: {
    url: 'https://images.pexels.com/photos/34804005/pexels-photo-34804005.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Laptop displaying software development and data analytics interface',
    sourceUrl: 'https://www.pexels.com/photo/laptop-displaying-coding-and-data-analysis-interface-34804005/'
  },
  experience: {
    url: 'https://images.pexels.com/photos/7988086/pexels-photo-7988086.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Software developer working on technical systems and digital publishing workflows',
    sourceUrl: 'https://www.pexels.com/photo/a-person-doing-computer-programming-7988086/'
  },
  education: {
    url: 'https://images.pexels.com/photos/6281030/pexels-photo-6281030.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Academic library environment representing BCA studies at Rajarambapu Institute of Technology',
    sourceUrl: 'https://www.pexels.com/photo/students-studying-at-the-library-6281030/'
  },
  management: {
    url: 'https://images.pexels.com/photos/6803521/pexels-photo-6803521.jpeg?auto=compress&cs=tinysrgb&w=1400',
    alt: 'Professional presentation and leadership conference representing communication and MBA direction',
    sourceUrl: 'https://www.pexels.com/photo/people-on-business-conference-6803521/'
  }
};

const SKILL_GROUPS_ORDER = [
  'Programming',
  'Frontend',
  'Backend',
  'Data Analytics',
  'Android Development',
  'AI and Generative AI',
  'SEO and Digital Publishing',
  'Creative Technologies'
];

const SKILLS = [
  // 1. Programming
  { id: 'sk-1', name: 'HTML', category: 'Programming', prominent: true },
  { id: 'sk-2', name: 'CSS', category: 'Programming', prominent: true },
  { id: 'sk-3', name: 'Java', category: 'Programming', prominent: true },
  { id: 'sk-4', name: 'Python', category: 'Programming', prominent: true },
  { id: 'sk-5', name: 'JavaScript', category: 'Programming', prominent: true },
  { id: 'sk-6', name: 'C', category: 'Programming', prominent: false },
  { id: 'sk-7', name: 'C++', category: 'Programming', prominent: false },
  { id: 'sk-8', name: 'SQL', category: 'Programming', prominent: true },
  { id: 'sk-9', name: 'PHP', category: 'Programming', prominent: false },
  { id: 'sk-10', name: 'Kotlin', category: 'Programming', prominent: true },

  // 2. Frontend
  { id: 'sk-11', name: 'React.js', category: 'Frontend', prominent: true },
  { id: 'sk-12', name: 'Next.js', category: 'Frontend', prominent: true },
  { id: 'sk-13', name: 'Bootstrap', category: 'Frontend', prominent: false },
  { id: 'sk-14', name: 'Tailwind CSS', category: 'Frontend', prominent: true },
  { id: 'sk-15', name: 'Responsive Design', category: 'Frontend', prominent: false },
  { id: 'sk-16', name: 'API Integration', category: 'Frontend', prominent: false },
  { id: 'sk-17', name: 'Basic UI/UX Design', category: 'Frontend', prominent: false },

  // 3. Backend
  { id: 'sk-18', name: 'Node.js', category: 'Backend', prominent: true },
  { id: 'sk-19', name: 'Supabase', category: 'Backend', prominent: true },
  { id: 'sk-20', name: 'Firebase', category: 'Backend', prominent: true },
  { id: 'sk-21', name: 'MongoDB', category: 'Backend', prominent: false },
  { id: 'sk-22', name: 'MySQL', category: 'Backend', prominent: true },
  { id: 'sk-23', name: 'Authentication Systems', category: 'Backend', prominent: false },
  { id: 'sk-24', name: 'REST API Development', category: 'Backend', prominent: false },
  { id: 'sk-25', name: 'Firebase Console', category: 'Backend', prominent: false },
  { id: 'sk-26', name: 'Supabase Dashboard', category: 'Backend', prominent: false },
  { id: 'sk-27', name: 'npm', category: 'Backend', prominent: false },

  // 4. Data Analytics
  { id: 'sk-28', name: 'Microsoft Fabric', category: 'Data Analytics', prominent: true },
  { id: 'sk-29', name: 'Pandas', category: 'Data Analytics', prominent: true },
  { id: 'sk-30', name: 'NumPy', category: 'Data Analytics', prominent: true },
  { id: 'sk-31', name: 'JupyterLab', category: 'Data Analytics', prominent: true },
  { id: 'sk-32', name: 'Power BI', category: 'Data Analytics', prominent: true },
  { id: 'sk-33', name: 'Excel', category: 'Data Analytics', prominent: false },
  { id: 'sk-34', name: 'Data Cleaning', category: 'Data Analytics', prominent: false },
  { id: 'sk-35', name: 'Data Visualisation', category: 'Data Analytics', prominent: false },
  { id: 'sk-36', name: 'CSV Handling', category: 'Data Analytics', prominent: false },
  { id: 'sk-37', name: 'SQL Queries', category: 'Data Analytics', prominent: false },
  { id: 'sk-38', name: 'Data Analysis', category: 'Data Analytics', prominent: false },

  // 5. Android Development
  { id: 'sk-39', name: 'Android Studio', category: 'Android Development', prominent: true },
  { id: 'sk-40', name: 'Kotlin', category: 'Android Development', prominent: true },
  { id: 'sk-41', name: 'Java for Android', category: 'Android Development', prominent: true },
  { id: 'sk-42', name: 'XML Layouts', category: 'Android Development', prominent: false },
  { id: 'sk-43', name: 'Firebase Integration', category: 'Android Development', prominent: false },
  { id: 'sk-44', name: 'APK Building', category: 'Android Development', prominent: false },

  // 6. AI and Generative AI
  { id: 'sk-45', name: 'Google Gemini API', category: 'AI and Generative AI', prominent: true },
  { id: 'sk-46', name: 'OpenAI API', category: 'AI and Generative AI', prominent: true },
  { id: 'sk-47', name: 'Prompt Engineering', category: 'AI and Generative AI', prominent: true },
  { id: 'sk-48', name: 'AI Chatbots', category: 'AI and Generative AI', prominent: true },
  { id: 'sk-49', name: 'AI Automation', category: 'AI and Generative AI', prominent: false },
  { id: 'sk-50', name: 'Google AI Studio', category: 'AI and Generative AI', prominent: true },
  { id: 'sk-51', name: 'AI Agents', category: 'AI and Generative AI', prominent: false },
  { id: 'sk-52', name: 'Generative AI Applications', category: 'AI and Generative AI', prominent: false },
  { id: 'sk-53', name: 'AI Tool Integration in Projects', category: 'AI and Generative AI', prominent: false },

  // 7. SEO and Digital Publishing
  { id: 'sk-54', name: 'WordPress', category: 'SEO and Digital Publishing', prominent: true },
  { id: 'sk-55', name: 'Yoast SEO', category: 'SEO and Digital Publishing', prominent: true },
  { id: 'sk-56', name: 'Keyword Research', category: 'SEO and Digital Publishing', prominent: true },
  { id: 'sk-57', name: 'On-Page SEO', category: 'SEO and Digital Publishing', prominent: false },
  { id: 'sk-58', name: 'Off-Page SEO', category: 'SEO and Digital Publishing', prominent: false },
  { id: 'sk-59', name: 'Technical SEO', category: 'SEO and Digital Publishing', prominent: false },
  { id: 'sk-60', name: 'Backlink Analysis', category: 'SEO and Digital Publishing', prominent: false },
  { id: 'sk-61', name: 'Google Search Console', category: 'SEO and Digital Publishing', prominent: true },
  { id: 'sk-62', name: 'Google Analytics', category: 'SEO and Digital Publishing', prominent: true },
  { id: 'sk-63', name: 'Affiliate Marketing', category: 'SEO and Digital Publishing', prominent: false },
  { id: 'sk-64', name: 'Domain, Hosting and SSL Management', category: 'SEO and Digital Publishing', prominent: false },

  // 8. Creative Technologies
  { id: 'sk-65', name: 'VS Code', category: 'Creative Technologies', prominent: true },
  { id: 'sk-66', name: 'Git', category: 'Creative Technologies', prominent: true },
  { id: 'sk-67', name: 'GitHub', category: 'Creative Technologies', prominent: true },
  { id: 'sk-68', name: 'Postman', category: 'Creative Technologies', prominent: false },
  { id: 'sk-69', name: 'Figma', category: 'Creative Technologies', prominent: true },
  { id: 'sk-70', name: 'Canva', category: 'Creative Technologies', prominent: true },
  { id: 'sk-71', name: 'Google Cloud', category: 'Creative Technologies', prominent: true },
  { id: 'sk-72', name: 'Microsoft Azure', category: 'Creative Technologies', prominent: false },
  { id: 'sk-73', name: 'Photoshop', category: 'Creative Technologies', prominent: true },
  { id: 'sk-74', name: 'Premiere Pro', category: 'Creative Technologies', prominent: true },
  { id: 'sk-75', name: 'CapCut', category: 'Creative Technologies', prominent: false },
  { id: 'sk-76', name: 'YouTube Thumbnail Design', category: 'Creative Technologies', prominent: false },
  { id: 'sk-77', name: 'Video Editing', category: 'Creative Technologies', prominent: false },
  { id: 'sk-78', name: 'Instagram Reels Creation', category: 'Creative Technologies', prominent: false },
  { id: 'sk-79', name: 'Social Media Content Strategy', category: 'Creative Technologies', prominent: false },
  { id: 'sk-80', name: 'Logo Design', category: 'Creative Technologies', prominent: false },
  { id: 'sk-81', name: 'Presentation/PPT Design', category: 'Creative Technologies', prominent: false }
];

// Complete 11-Project Portfolio (Personal Projects & College Projects)
const PROJECTS = [
  // PERSONAL PROJECTS
  {
    id: 'proj-edumentor-ai',
    projectNumber: '01',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Generative AI',
    title: 'EduMentor AI',
    shortIntro:
      'An AI-powered learning environment created to help students explore academic concepts, structure study queries, and receive clear, guided explanations.',
    problemStatement:
      'Students often encounter dense academic subjects where static study notes do not adapt to their specific questions or learning pace.',
    proposedSolution:
      'A Generative AI-assisted learning interface built around structured educational prompts and focused, distraction-free study interaction.',
    mainFeatures: [
      'Guided educational query and concept explanation flow',
      'Structured prompt framing tailored for academic clarity',
      'Clean, readable learning workspace'
    ],
    techStack: ['Generative AI', 'Prompt Engineering'],
    personalContribution: 'Concept formulation, prompt design, and application interface build.',
    repoUrl: 'https://github.com/ToxApks/tox-hackathon',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/7777691/pexels-photo-7777691.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'College students studying with laptops in a modern academic library'
  },
  {
    id: 'proj-smart-resource',
    projectNumber: '02',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Productivity',
    title: 'Smart Resource Organizer',
    shortIntro:
      'A resource organization concept and application built to categorize, structure, and retrieve files, documents, and reference materials.',
    problemStatement:
      'Important study documents, files, and technical reference links frequently become scattered across folders, drives, and browser tabs.',
    proposedSolution:
      'A centralized file and resource organization workspace designed around intuitive categorization and quick retrieval.',
    mainFeatures: [
      'Categorized organization of files, folders, and documents',
      'Structured filtering for fast resource lookup'
    ],
    techStack: [],
    personalContribution: 'Information architecture, categorization workflow, and interface design.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/8970647/pexels-photo-8970647.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Organized documents and folders arranged beside a laptop on a clean desk'
  },
  {
    id: 'proj-fifa-companion',
    projectNumber: '03',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • AI Stadium Companion',
    title: 'FIFA AI Stadium Companion',
    shortIntro:
      'An independent AI-assisted stadium and match-day companion concept designed to organize tournament schedules, stadium context, and fan-facing insights.',
    problemStatement:
      'Navigating tournament fixtures, venue details, and match-day context across major football events can be fragmented.',
    proposedSolution:
      'A unified stadium companion concept combining match-day navigation views with AI-assisted tournament context (independent project; not affiliated with FIFA).',
    mainFeatures: [
      'Stadium navigation and match-day overview views',
      'AI-assisted fixture and tournament context'
    ],
    techStack: [],
    personalContribution: 'Concept design, interface layout, and implementation.',
    repoUrl: 'https://github.com/ToxApks/Fifa-AI-Stadium-Campanion-App',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/31160056/pexels-photo-31160056.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Illuminated football stadium at night during a match'
  },
  {
    id: 'proj-seo-explorer',
    projectNumber: '04',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Browser Extension',
    title: 'SEO Explorer Chrome Extension',
    shortIntro:
      'A browser-based SEO inspection utility built to extract and review page keywords, top multi-word phrases, frequency counts, links, and page metadata directly within the browser.',
    problemStatement:
      'Reviewing on-page keyword distribution, phrase frequencies, links, and metadata during content optimization typically requires switching across multiple external tools.',
    proposedSolution:
      'A compact Chrome Extension popup featuring dedicated Keywords, Links, and Metadata views with instant copy actions for extracted insights.',
    mainFeatures: [
      'Keywords tab displaying top keywords and multi-word phrases with frequency counts',
      'Dedicated Links tab and Metadata inspection tab',
      'One-click copy functionality for extracted keyword data'
    ],
    techStack: ['JavaScript', 'HTML', 'CSS', 'Chrome Extension'],
    personalContribution: 'Complete extension interface, DOM extraction logic, and keyword frequency view.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'screenshot',
    mediaBadge: 'Original Application Screenshot',
    coverUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214634/ChatGPT_Image_Nov_7_2026_02_25_18_PM_eddmdl.png',
    coverAlt: 'Original screenshot of the SEO Explorer Chrome Extension showing Keywords, Links, and Metadata tabs'
  },
  {
    id: 'proj-data-filter',
    projectNumber: '05',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Data Visualisation',
    title: 'Data-Filter',
    shortIntro:
      'An interactive client-side data filtering and visual exploration web application built with React, TypeScript, Vite, and Recharts.',
    problemStatement:
      'Inspecting structured datasets and comparing filtered subsets visually often requires a fast, responsive browser interface without heavy server setup.',
    proposedSolution:
      'A TypeScript-powered React and Vite interface utilizing Recharts to dynamically filter and chart tabular records.',
    mainFeatures: [
      'Interactive dataset filtering controls',
      'Dynamic chart rendering powered by Recharts',
      'Strongly typed component architecture with TypeScript and Vite'
    ],
    techStack: ['React.js', 'TypeScript', 'Vite', 'Recharts'],
    personalContribution: 'Frontend architecture, filtering state logic, and Recharts visual integration.',
    repoUrl: 'https://github.com/ToxApks/Data-Filter',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/34804005/pexels-photo-34804005.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Data filtering and analytical chart interface on a laptop screen'
  },
  {
    id: 'proj-attendance',
    projectNumber: '06',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Academic Utility',
    title: 'Student Attendance Management System',
    shortIntro:
      'A clean academic attendance interface concept created to organize class rosters, session attendance tracking, and structured attendance records.',
    problemStatement:
      'Manual paper attendance registers are slow to maintain and cumbersome to review across academic sessions.',
    proposedSolution:
      'A structured digital attendance interface for organizing student rosters and recording daily session attendance.',
    mainFeatures: [
      'Class roster organization and session attendance marking',
      'Clear tabular attendance record overview'
    ],
    techStack: [],
    personalContribution: 'Workflow structuring and interface layout.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/5306450/pexels-photo-5306450.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Students collaborating during classwork in an academic setting'
  },
  {
    id: 'proj-tts',
    projectNumber: '07',
    group: 'Personal Project',
    categoryLabel: 'Personal Project • Accessibility Utility',
    title: 'Text-to-Speech Application',
    shortIntro:
      'An accessibility and reading utility designed to convert written text passages into clear spoken audio playback.',
    problemStatement:
      'Reviewing lengthy study passages or supporting auditory reading accessibility benefits from straightforward text-to-voice playback.',
    proposedSolution:
      'A lightweight utility interface focused on text input, voice playback controls, and distraction-free reading.',
    mainFeatures: [
      'Written text to spoken audio synthesis',
      'Straightforward playback and reset controls'
    ],
    techStack: [],
    personalContribution: 'Complete interface design and utility implementation.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/33530876/pexels-photo-33530876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Audio studio headphones and sound production equipment representing speech synthesis'
  },

  // COLLEGE PROJECTS
  {
    id: 'proj-intellix-ai',
    projectNumber: '08',
    group: 'College Project',
    categoryLabel: 'College Project • Conversational AI',
    title: 'Intellix AI Chatbot',
    shortIntro:
      'A conversational AI chatbot explored as a college project to study structured dialogue flows, prompt handling, and connected information responses.',
    problemStatement:
      'Designing a responsive conversational interface capable of handling user queries clearly within an academic project environment.',
    proposedSolution:
      'An interactive dialogue assistant structured around clear prompt-response formatting and conversational flow.',
    mainFeatures: [
      'Multi-turn conversational dialogue interface',
      'Structured presentation of generated responses'
    ],
    techStack: [],
    personalContribution: 'Conversational flow design and college project build.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/17485657/pexels-photo-17485657.png?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Abstract visualization of artificial intelligence neural pathways'
  },
  {
    id: 'proj-study-resource',
    projectNumber: '09',
    group: 'College Project',
    categoryLabel: 'College Project • Academic Library',
    title: 'Study Resource Management',
    shortIntro:
      'An academic library platform concept built as a college project to organize subject-wise notes, syllabus references, and study resources.',
    problemStatement:
      'Students often spend unnecessary time searching across scattered channels for subject-specific notes and coursework materials.',
    proposedSolution:
      'A structured academic repository organizing study notes and reference materials by subject and coursework.',
    mainFeatures: [
      'Subject-wise categorization of notes and study materials',
      'Accessible academic browsing structure'
    ],
    techStack: [],
    personalContribution: 'Information organization and academic platform interface.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/15616259/pexels-photo-15616259.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Study books and organized academic notes on a wooden desk'
  },
  {
    id: 'proj-medico-ai',
    projectNumber: '10',
    group: 'College Project',
    categoryLabel: 'College Project • Health Communication',
    title: 'Medico AI',
    shortIntro:
      'An online doctor-patient interaction and health-related consultation platform concept explored as a college project to structure health communication.',
    problemStatement:
      'Patients preparing for online health consultations often struggle to organize symptoms and questions clearly before speaking with a doctor.',
    proposedSolution:
      'A structured consultation and doctor-patient communication interface concept designed to organize health queries clearly (informational concept only; not a diagnostic or treatment tool).',
    mainFeatures: [
      'Structured health query preparation for online doctor interaction',
      'Clear, accessible patient-doctor communication layout'
    ],
    techStack: [],
    personalContribution: 'Consultation workflow structure and interface concept.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'illustrative',
    mediaBadge: 'Illustrative Cover',
    coverUrl:
      'https://images.pexels.com/photos/7195308/pexels-photo-7195308.jpeg?auto=compress&cs=tinysrgb&w=1600',
    coverAlt: 'Doctor conducting an online consultation on a laptop'
  },
  {
    id: 'proj-arogyam',
    projectNumber: '11',
    group: 'College Project',
    categoryLabel: 'College Project • Consumer Health Utility',
    title: 'Arogyam — Product Barcode Scanner',
    shortIntro:
      'A product barcode scanning and ingredient-information concept developed as a college project to surface accessible health-related context for packaged goods.',
    problemStatement:
      'Packaged consumer food and household products feature dense ingredient and nutritional labels that are difficult to interpret quickly.',
    proposedSolution:
      'A linear barcode scanning concept that links scanned consumer product barcodes with structured, easy-to-read ingredient and health-related context.',
    mainFeatures: [
      'Consumer product linear barcode scanning workflow',
      'Readable presentation of ingredient and health-related context'
    ],
    techStack: [],
    personalContribution: 'Concept formulation, scanning user flow, and academic prototype.',
    repoUrl: '',
    liveUrl: '',
    mediaKind: 'concept-art',
    mediaBadge: 'Concept Artwork',
    coverUrl: '',
    coverAlt: 'Concept artwork showing a smartphone scanning a linear barcode on a packaged consumer product'
  }
];

const EXPERIENCES = [
  {
    id: 'exp-cognifyz',
    type: 'INTERNSHIP',
    role: 'Data Science Intern',
    organization: 'Cognifyz IT Solutions Pvt. Ltd.',
    period: '22 May 2026 – 22 June 2026',
    summary:
      'Completed a focused Data Science internship working practically with Python, JupyterLab, and CSV dataset handling.',
    responsibilities: [
      'Worked practically with Python for data science workflows.',
      'Used JupyterLab for exploratory notebook execution and inspection.',
      'Handled and processed structured CSV datasets.'
    ],
    tools: ['Python', 'JupyterLab', 'CSV Dataset Handling']
  },
  {
    id: 'exp-toxapks',
    type: 'INDEPENDENT WEBSITE OPERATION',
    role: 'Independent Website Operator & Publisher',
    organization: 'ToxApks.com',
    period: 'More than 1 Year',
    summary:
      'Founded, operated, and managed an independent APK blogging and digital publishing website for over one year.',
    responsibilities: [
      'Founded and managed end-to-end website operations on WordPress.',
      'Executed content publishing workflows, editorial formatting, and regular site updates.',
      'Applied practical On-Page SEO, keyword research, and search optimization.',
      'Managed domain, hosting, SSL certificates, and Google Search Console indexing.'
    ],
    tools: ['WordPress', 'SEO', 'Keyword Research', 'Google Search Console']
  },
  {
    id: 'exp-freelance',
    type: 'FREELANCE WORK',
    role: 'Freelance SEO Content Writer',
    organization: 'Upwork & Freelancer',
    period: 'Independent Freelance Engagements',
    summary:
      'Wrote SEO-optimized articles and blog content for clients through Upwork and Freelancer.',
    responsibilities: [
      'Researched target keywords and search intent for client briefs.',
      'Wrote structured, SEO-optimized articles and blog posts.',
      'Focused specifically on editorial SEO writing and content optimization.'
    ],
    tools: ['SEO Article Writing', 'Keyword Research', 'Content Optimization']
  }
];

// ============================================================================
// UNIFIED CERTIFICATE DATA STRUCTURE (EXACT ASSET MANIFEST MAPPINGS)
// ============================================================================
const CERTIFICATES = [
  // TIER 1 — FEATURED CREDENTIALS
  {
    id: 'cert-microsoft-fabric',
    tier: 'Tier 1 — Featured Credentials',
    credentialType: 'Professional Certification',
    title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    issuer: 'Microsoft',
    dateLabel: 'Verified Associate Credential',
    credentialId: '',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794231710/certificate_page-0001_wh3tss.jpg',
    published: true,
    featured: true,
    summary:
      'Official Microsoft Associate certification validating enterprise data analytics, lakehouse architecture, and Microsoft Fabric engineering capabilities.'
  },
  {
    id: 'cert-cognifyz-ds',
    tier: 'Tier 1 — Featured Credentials',
    credentialType: 'Internship Completion Certificate',
    title: 'Data Science Internship Completion Certificate',
    issuer: 'Cognifyz IT Solutions Pvt. Ltd.',
    dateLabel: '22 May 2026 – 22 June 2026',
    credentialId: 'CTI/A1/C360219',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214634/ChatGPT_Image_Nov_7_2026_02_24_52_PM_bis7ed.png',
    published: true,
    featured: true,
    summary:
      'Awarded upon completing the Data Science Internship (22 May 2026 – 22 June 2026) working with Python, JupyterLab, and CSV datasets.'
  },

  // TIER 2 — APPLIED TECHNICAL CREDENTIALS
  {
    id: 'cert-cisco-cyber',
    tier: 'Tier 2 — Applied Technical Credentials',
    credentialType: 'Career Path Completion',
    title: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    dateLabel: '06 May 2026',
    credentialId: '',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214635/ChatGPT_Image_Nov_7_2026_02_24_24_PM_gt3jm8.png',
    published: true,
    featured: false,
    summary:
      'Completed the Cisco Networking Academy Junior Cybersecurity Analyst Career Path covering network defense, threat detection, and security operations.'
  },
  {
    id: 'cert-tata-cyber',
    tier: 'Tier 2 — Applied Technical Credentials',
    credentialType: 'Job Simulation',
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Tata / Forage',
    dateLabel: '06 July 2026',
    credentialId: '',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794232701/2026-07-06_Certificate_Tata-Cybersecurity-Analyst-Job-Simulation_page-0001_xo7hnh.jpg',
    published: true,
    featured: false,
    summary:
      'Completed practical tasks in Identity and Access Management (IAM) fundamentals, strategy assessment, and custom IAM solution design.'
  },
  {
    id: 'cert-promptwars',
    tier: 'Tier 2 — Applied Technical Credentials',
    credentialType: 'Certificate of Appreciation',
    title: 'PromptWars Virtual — Certificate of Appreciation',
    issuer: 'Google for Developers & Hack2Skill',
    dateLabel: '25 August 2026',
    credentialId: '2026H2S07PWVCHL4-A00675',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214634/ChatGPT_Image_Nov_7_2026_02_24_46_PM_pjubgt.png',
    published: true,
    featured: false,
    summary:
      'Recognized for a verified Generative AI solution submission for Challenge 4 during PromptWars Virtual.'
  },

  // TIER 3 — TECHNICAL LEARNING AND WORKSHOPS
  {
    id: 'cert-simplilearn-gcp',
    tier: 'Tier 3 — Technical Learning & Workshops',
    credentialType: 'Course Completion',
    title: 'Modernize Infrastructure and Applications with Google Cloud',
    issuer: 'Simplilearn SkillUP, powered by Google Cloud',
    dateLabel: '26 May 2026',
    credentialId: '10272009',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214634/ChatGPT_Image_Nov_7_2026_02_24_57_PM_lvfvi0.png',
    published: true,
    featured: false,
    summary:
      'Course completion certificate covering cloud infrastructure and application modernization concepts.'
  },
  {
    id: 'cert-rit-ai-workshop',
    tier: 'Tier 3 — Technical Learning & Workshops',
    credentialType: 'Workshop & Training',
    title: 'Unlocking AI Potential: Concepts, Applications, and Performance Insights',
    issuer: 'Department of Computer Science & Engineering, RIT, in association with Global Cell RIT',
    dateLabel: '19–22 August 2025',
    credentialId: '',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214634/ChatGPT_Image_Nov_7_2026_02_25_13_PM_d9kqyk.png',
    published: true,
    featured: false,
    summary:
      'Completed intensive four-day institutional training exploring applied artificial intelligence concepts and performance insights.'
  },

  // TIER 4 — EVENTS AND PARTICIPATION
  {
    id: 'cert-india-ai-festival',
    tier: 'Tier 4 — Events & Participation',
    credentialType: 'Participation Certificate',
    title: 'India AI Impact Festival 2026 — AI Impact Creators',
    issuer: 'India AI Impact Festival 2026',
    dateLabel: '2026',
    credentialId: 'IAIIF26P10260842',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794214635/ChatGPT_Image_Nov_7_2026_02_24_38_PM_ib0dzm.png',
    published: true,
    featured: false,
    summary:
      'Official participation certificate under the AI Impact Creators category at India AI Impact Festival 2026.'
  },
  {
    id: 'cert-campus-unite',
    tier: 'Tier 4 — Events & Participation',
    credentialType: 'Participation Certificate',
    title: 'Campus Unite AI & Technology Quiz 2026',
    issuer: 'Campus Unite (Unstop)',
    dateLabel: '2026',
    credentialId: '',
    assetType: 'image',
    assetUrl:
      'https://res.cloudinary.com/xfmoxgsd/image/upload/v1794231990/2026_Certificate_Campus-Unite_AI-Technology-Quiz_page-0001_vmyuiw.jpg',
    published: true,
    featured: false,
    summary:
      'Participation certificate for the Campus Unite AI & Technology Quiz 2026.'
  }
];

const GOOGLE_CLOUD_SKILLS = {
  title: 'Google Cloud Skills & Badges Progress',
  points: '1,040 Points Earned',
  subtitle: 'Hands-on Labs & Skill Badges Across Cloud & Generative AI',
  domains: [
    'BigQuery & Data Analytics',
    'Cloud Infrastructure & Cloud Storage',
    'Kubernetes',
    'Generative AI & Gemini',
    'Machine Learning APIs',
    'AppSheet & Apps Script',
    'Security & Monitoring'
  ],
  note: 'Represents practical Google Skills lab and badge progress (distinct from professional certification exams).'
};

// ============================================================================
// 2. INDIVIDUAL TECHNOLOGY LOGOS & DOMAIN ICONS
// ============================================================================
function SkillBrandVisual({ name, size = 'md' }) {
  const key = name.toLowerCase().trim();
  const dim = size === 'lg' ? 'w-7 h-7' : 'w-5 h-5';

  if (key === 'python') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path
          d="M11.9 2C7.8 2 8.1 3.8 8.1 3.8V5.7H12.1V6.3H6.5C6.5 6.3 3.8 6 3.8 10.1C3.8 14.2 6.1 14 6.1 14H7.5V12.1C7.5 12.1 7.4 9.8 9.8 9.8H14C14 9.8 16.2 9.8 16.2 7.6V4.1C16.2 4.1 16.5 2 11.9 2ZM9.7 3.2C10.1 3.2 10.5 3.6 10.5 4C10.5 4.4 10.1 4.8 9.7 4.8C9.3 4.8 8.9 4.4 8.9 4C8.9 3.6 9.3 3.2 9.7 3.2Z"
          fill="#3776AB"
        />
        <path
          d="M12.1 22C16.2 22 15.9 20.2 15.9 20.2V18.3H11.9V17.7H17.5C17.5 17.7 20.2 18 20.2 13.9C20.2 9.8 17.9 10 17.9 10H16.5V11.9C16.5 11.9 16.6 14.2 14.2 14.2H10C10 14.2 7.8 14.2 7.8 16.4V19.9C7.8 19.9 7.5 22 12.1 22ZM14.3 20.8C13.9 20.8 13.5 20.4 13.5 20C13.5 19.6 13.9 19.2 14.3 19.2C14.7 19.2 15.1 19.6 15.1 20C15.1 20.4 14.7 20.8 14.3 20.8Z"
          fill="#FFD43B"
        />
      </svg>
    );
  }
  if (key === 'javascript') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#F7DF1E" />
        <text x="12" y="17.5" textAnchor="middle" fill="#000" fontSize="10.5" fontWeight="800">
          JS
        </text>
      </svg>
    );
  }
  if (key === 'html') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M4 3L5.5 19.5L12 21.5L18.5 19.5L20 3H4Z" fill="#E34F26" />
        <path d="M12 4.5V19.8L17.2 18.2L18.4 4.5H12Z" fill="#EF652A" />
        <path d="M8 8H16L15.7 10.5H10.5L10.7 12.8H15.5L15 17.2L12 18.1L9 17.2L8.8 14.8H11L11.1 15.9L12 16.2L12.9 15.9L13.1 14.5H8.5L8 8Z" fill="#FFF" />
      </svg>
    );
  }
  if (key === 'css') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M4 3L5.5 19.5L12 21.5L18.5 19.5L20 3H4Z" fill="#1572B6" />
        <path d="M12 4.5V19.8L17.2 18.2L18.4 4.5H12Z" fill="#33A9DC" />
        <path d="M8 8H16L15.6 10.5H11.5L11.7 12.5H15.4L14.9 17.2L12 18.1L9.1 17.2L8.9 14.8H11.1L11.2 15.9L12 16.2L12.8 15.9L13 14.4H9.4L8.9 10.5H8V8Z" fill="#FFF" />
      </svg>
    );
  }
  if (key === 'react.js' || key === 'react') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.4" />
      </svg>
    );
  }
  if (key === 'next.js') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#111" stroke="#F3F4F6" strokeWidth="1.4" />
        <path d="M8.5 16V8L16.5 18.2M15.5 8V13.5" stroke="#FFF" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === 'tailwind css') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path
          d="M12 6C9.3 6 7.7 7.3 7 10C8 8.7 9.2 8.2 10.5 8.5C11.3 8.7 11.8 9.2 12.4 9.8C13.4 10.8 14.5 12 17 12C19.7 12 21.3 10.7 22 8C21 9.3 19.8 9.8 18.5 9.5C17.7 9.3 17.2 8.8 16.6 8.2C15.6 7.2 14.5 6 12 6ZM7 12C4.3 12 2.7 13.3 2 16C3 14.7 4.2 14.2 5.5 14.5C6.3 14.7 6.8 15.2 7.4 15.8C8.4 16.8 9.5 18 12 18C14.7 18 16.3 16.7 17 14C16 15.3 14.8 15.8 13.5 15.5C12.7 15.3 12.2 14.8 11.6 14.2C10.6 13.2 9.5 12 7 12Z"
          fill="#38BDF8"
        />
      </svg>
    );
  }
  if (key === 'bootstrap') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#7952B3" />
        <text x="12" y="16.5" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="800">
          B
        </text>
      </svg>
    );
  }
  if (key === 'node.js') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M12 2.5L20 7.1V16.9L12 21.5L4 16.9V7.1L12 2.5Z" fill="#339933" />
        <text x="12" y="15" textAnchor="middle" fill="#FFF" fontSize="8.5" fontWeight="800">
          JS
        </text>
      </svg>
    );
  }
  if (key === 'supabase' || key === 'supabase dashboard') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M13.5 2.5L4.5 14H12L10.5 21.5L19.5 10H12L13.5 2.5Z" fill="#3ECF8E" />
      </svg>
    );
  }
  if (key === 'firebase' || key === 'firebase integration' || key === 'firebase console') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M5 17.5L8.2 4.2C8.4 3.5 9.3 3.4 9.7 4L12.2 8.7L15.4 5.5C15.9 5 16.8 5.2 16.9 5.9L19 17.5L12 21.2L5 17.5Z" fill="#FFCA28" />
        <path d="M5 17.5L12.2 8.7L19 17.5L12 21.2L5 17.5Z" fill="#FFA000" />
      </svg>
    );
  }
  if (key === 'mongodb') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M12 2.5C12 2.5 7 7.8 7 13.2C7 17.4 10.6 19.8 11.6 20.4V22H12.4V20.4C13.4 19.8 17 17.4 17 13.2C17 7.8 12 2.5 12 2.5Z" fill="#47A248" />
      </svg>
    );
  }
  if (key === 'mysql' || key === 'sql' || key === 'sql queries') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7.5" ry="3" fill="#00758F" />
        <path d="M4.5 6V12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12V6" stroke="#00D8FF" strokeWidth="1.5" />
        <path d="M4.5 12V18C4.5 19.66 7.86 21 12 21C16.14 21 19.5 19.66 19.5 18V12" stroke="#F29111" strokeWidth="1.5" />
      </svg>
    );
  }
  if (key === 'npm') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="1.5" fill="#CB3837" />
        <text x="12" y="14.5" textAnchor="middle" fill="#FFF" fontSize="7.5" fontWeight="800">
          npm
        </text>
      </svg>
    );
  }
  if (key === 'kotlin') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M3 3H21L12 12L21 21H3V3Z" fill="#7F52FF" />
      </svg>
    );
  }
  if (key === 'java' || key === 'java for android') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M8 17C8 17 14 18 16.5 16.5M7 14C7 14 15 15 17 13.5M12.5 3C13.5 5 10.5 6.5 11.5 9M15 4.5C15.8 6 13.5 7.2 14.2 9.5" stroke="#F89820" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M6 19.5H18" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === 'c') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" fill="#A8B9CC" />
        <text x="12" y="15.5" textAnchor="middle" fill="#030014" fontSize="11" fontWeight="800">
          C
        </text>
      </svg>
    );
  }
  if (key === 'c++') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" fill="#00599C" />
        <text x="12" y="15" textAnchor="middle" fill="#FFF" fontSize="8.5" fontWeight="800">
          C++
        </text>
      </svg>
    );
  }
  if (key === 'php') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <ellipse cx="12" cy="12" rx="10" ry="6.2" fill="#777BB4" />
        <text x="12" y="14.5" textAnchor="middle" fill="#FFF" fontSize="7.5" fontWeight="800">
          php
        </text>
      </svg>
    );
  }
  if (key.includes('android') || key === 'apk building' || key === 'xml layouts') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M7.5 5.5L6 3.5M16.5 5.5L18 3.5" stroke="#3DDC84" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 10.5C6 7.5 8.7 5.2 12 5.2C15.3 5.2 18 7.5 18 10.5V11H6V10.5Z" fill="#3DDC84" />
        <circle cx="9.5" cy="8.5" r="0.8" fill="#030014" />
        <circle cx="14.5" cy="8.5" r="0.8" fill="#030014" />
        <rect x="6.5" y="11.8" width="11" height="7" rx="1.5" fill="#3DDC84" />
      </svg>
    );
  }
  if (key.includes('gemini') || key.includes('google ai')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path
          d="M12 2C12.7 7.4 16.6 11.3 22 12C16.6 12.7 12.7 16.6 12 22C11.3 16.6 7.4 12.7 2 12C7.4 11.3 11.3 7.4 12 2Z"
          fill="#60A5FA"
        />
      </svg>
    );
  }
  if (key.includes('openai')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="#10A37F" strokeWidth="1.8" strokeDasharray="4 2" />
        <circle cx="12" cy="12" r="3.5" stroke="#10A37F" strokeWidth="1.6" />
      </svg>
    );
  }
  if (key === 'prompt engineering') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#C084FC" strokeWidth="1.6" />
        <path d="M7.5 9.5L10.5 12L7.5 14.5M12.5 14.5H16.5" stroke="#38BDF8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (key === 'ai chatbots' || key === 'ai agents') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="12" rx="4" stroke="#818CF8" strokeWidth="1.6" />
        <circle cx="9.5" cy="12" r="1.4" fill="#00D8FF" />
        <circle cx="14.5" cy="12" r="1.4" fill="#00D8FF" />
        <path d="M12 3V6" stroke="#C084FC" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === 'ai automation' || key === 'generative ai applications' || key.includes('ai tool integration')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="6" cy="12" r="2.5" stroke="#00D8FF" strokeWidth="1.6" />
        <circle cx="18" cy="7" r="2.5" stroke="#A855F7" strokeWidth="1.6" />
        <circle cx="18" cy="17" r="2.5" stroke="#38BDF8" strokeWidth="1.6" />
        <path d="M8.3 11L15.6 7.8M8.3 13L15.6 16.2" stroke="#E9D5FF" strokeWidth="1.4" />
      </svg>
    );
  }
  if (key === 'figma') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M8.5 3H12V9H8.5C6.8 9 5.5 7.7 5.5 6C5.5 4.3 6.8 3 8.5 3Z" fill="#F24E1E" />
        <path d="M12 3H15.5C17.2 3 18.5 4.3 18.5 6C18.5 7.7 17.2 9 15.5 9H12V3Z" fill="#FF7262" />
        <path d="M12 9H15.5C17.2 9 18.5 10.3 18.5 12C18.5 13.7 17.2 15 15.5 15H12V9Z" fill="#1ABCFE" />
        <path d="M8.5 9H12V15H8.5C6.8 15 5.5 13.7 5.5 12C5.5 10.3 6.8 9 8.5 9Z" fill="#A259FF" />
        <path d="M8.5 15H12V18C12 19.7 10.7 21 9 21C7.3 21 6 19.7 6 18C6 16.3 7.1 15 8.5 15Z" fill="#0ACF83" />
      </svg>
    );
  }
  if (key === 'vs code') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M17.5 3L7.5 12L17.5 21L21 19.2V4.8L17.5 3Z" fill="#007ACC" />
        <path d="M3 8.5L7.5 12L3 15.5L5.2 17L11 12L5.2 7L3 8.5Z" fill="#2498F3" />
      </svg>
    );
  }
  if (key === 'postman') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#FF6C37" />
        <path d="M8.5 14.5L15.5 8.5M15.5 8.5H11M15.5 8.5V13" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (key === 'github' || key === 'git') {
    return <Github className={`${dim} text-white`} />;
  }
  if (key === 'wordpress') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#21759B" />
        <text x="12" y="16" textAnchor="middle" fill="#FFF" fontSize="11.5" fontWeight="800">
          W
        </text>
      </svg>
    );
  }
  if (key === 'power bi') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <rect x="4" y="12" width="3.5" height="8" rx="1" fill="#F2C811" />
        <rect x="9.5" y="8" width="3.5" height="12" rx="1" fill="#E8B20C" />
        <rect x="15" y="4" width="3.5" height="16" rx="1" fill="#D49B07" />
      </svg>
    );
  }
  if (key === 'pandas' || key === 'numpy' || key === 'jupyterlab') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#F37626" strokeWidth="1.8" />
        <circle cx="17.5" cy="5.5" r="2" fill="#F37626" />
        <circle cx="6.5" cy="18.5" r="2" fill="#38BDF8" />
      </svg>
    );
  }
  if (key === 'excel') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="#107C41" />
        <text x="12" y="16" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="800">
          X
        </text>
      </svg>
    );
  }
  if (key === 'yoast seo') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#A4286A" />
        <text x="12" y="16" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="800">
          Y
        </text>
      </svg>
    );
  }
  if (key === 'google analytics' || key === 'google search console') {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <rect x="4" y="13" width="3.5" height="7" rx="1.75" fill="#F9AB00" />
        <rect x="10.25" y="8.5" width="3.5" height="11.5" rx="1.75" fill="#E37400" />
        <rect x="16.5" y="4" width="3.5" height="16" rx="1.75" fill="#4285F4" />
      </svg>
    );
  }
  if (key.includes('seo') || key.includes('backlink') || key.includes('keyword') || key.includes('affiliate')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6" stroke="#00D8FF" strokeWidth="1.7" />
        <path d="M15 15L20 20M8 10.5H13M10.5 8V13" stroke="#A855F7" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (key.includes('data') || key.includes('csv')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="#38BDF8" strokeWidth="1.6" />
        <path d="M3 9H21M9 9V20M15 9V20" stroke="#A855F7" strokeWidth="1.4" />
      </svg>
    );
  }
  if (key.includes('domain') || key.includes('hosting')) {
    return <Server className={`${dim} text-cyan-300`} />;
  }
  if (key.includes('google cloud')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} fill="none" aria-hidden="true">
        <path d="M7.5 18H17A4 4 0 0 0 17.5 10.1A5.5 5.5 0 0 0 6.8 9.2A4.5 4.5 0 0 0 7.5 18Z" stroke="#4285F4" strokeWidth="1.8" />
        <path d="M7.5 18H13" stroke="#34A853" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (key.includes('microsoft')) {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" fill="#F25022" />
        <rect x="13" y="3" width="8" height="8" fill="#7FBA00" />
        <rect x="3" y="13" width="8" height="8" fill="#00A4EF" />
        <rect x="13" y="13" width="8" height="8" fill="#FFB900" />
      </svg>
    );
  }
  if (key === 'photoshop') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="1.5" />
        <text x="12" y="15.5" textAnchor="middle" fill="#31A8FF" fontSize="10" fontWeight="800">
          Ps
        </text>
      </svg>
    );
  }
  if (key === 'premiere pro') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#00005B" stroke="#9999FF" strokeWidth="1.5" />
        <text x="12" y="15.5" textAnchor="middle" fill="#9999FF" fontSize="10" fontWeight="800">
          Pr
        </text>
      </svg>
    );
  }
  if (key === 'canva') {
    return (
      <svg viewBox="0 0 24 24" className={dim} aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="#00C4CC" />
        <text x="12" y="15.5" textAnchor="middle" fill="#FFF" fontSize="10.5" fontWeight="800">
          C
        </text>
      </svg>
    );
  }
  if (key === 'capcut' || key.includes('video') || key.includes('reels')) {
    return <Film className={`${dim} text-purple-300`} />;
  }
  if (key.includes('thumbnail') || key.includes('logo')) {
    return <PenTool className={`${dim} text-cyan-300`} />;
  }
  if (key.includes('presentation') || key.includes('ppt')) {
    return <Presentation className={`${dim} text-indigo-300`} />;
  }
  if (key.includes('social media')) {
    return <Sparkles className={`${dim} text-purple-300`} />;
  }
  if (key.includes('ui/ux') || key.includes('responsive')) {
    return <Compass className={`${dim} text-cyan-300`} />;
  }
  if (key.includes('api') || key.includes('authentication')) {
    return <Terminal className={`${dim} text-emerald-300`} />;
  }
  return <Database className={`${dim} text-purple-300`} />;
}

// ============================================================================
// 3. THREE.JS COSMIC UNIVERSE CANVAS (STARFIELD, NEBULA & BLACK-HOLE DISK)
// ============================================================================
function CosmicUniverseCanvas() {
  const containerRef = useRef(null);
  const [fallbackActive, setFallbackActive] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (reducedMotion) {
      setFallbackActive(true);
      return;
    }

    let renderer;
    let scene;
    let camera;
    let animId;
    let isDisposed = false;
    let starGeo;
    let starMat;
    let nebulaGeo;
    let nebulaMat;
    let coreGeo;
    let coreMat;
    let photonGeo;
    let photonMat;
    let diskGeo;
    let diskMat;
    let outerArcGeo;
    let outerArcMat;

    const cleanupResources = () => {
      if (animId) cancelAnimationFrame(animId);
      starGeo?.dispose();
      starMat?.dispose();
      nebulaGeo?.dispose();
      nebulaMat?.dispose();
      coreGeo?.dispose();
      coreMat?.dispose();
      photonGeo?.dispose();
      photonMat?.dispose();
      diskGeo?.dispose();
      diskMat?.dispose();
      outerArcGeo?.dispose();
      outerArcMat?.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };

    try {
      const isMobile = window.innerWidth < 768;
      const isLowPower =
        isMobile ||
        (typeof navigator !== 'undefined' &&
          typeof navigator.hardwareConcurrency === 'number' &&
          navigator.hardwareConcurrency <= 4);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        52,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      camera.position.set(0, 0.12, 2.35);

      renderer = new THREE.WebGLRenderer({
        antialias: !isLowPower,
        alpha: true,
        powerPreference: isLowPower ? 'low-power' : 'high-performance'
      });
      const maxDpr = isMobile ? 1.25 : isLowPower ? 1.5 : 1.75;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const starCount = isMobile ? 650 : isLowPower ? 1200 : 1850;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);

      const cWhite = new THREE.Color('#F3F4F6');
      const cViolet = new THREE.Color('#A855F7');
      const cCyan = new THREE.Color('#00D8FF');

      for (let i = 0; i < starCount; i++) {
        const r = 3.6 * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi) - 0.9;

        const pick = Math.random();
        const chosen = pick > 0.8 ? cCyan : pick > 0.56 ? cViolet : cWhite;
        colors[i * 3] = chosen.r;
        colors[i * 3 + 1] = chosen.g;
        colors[i * 3 + 2] = chosen.b;
      }

      starGeo = new THREE.BufferGeometry();
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      starMat = new THREE.PointsMaterial({
        size: isMobile ? 0.009 : 0.0065,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: false
      });

      const starPoints = new THREE.Points(starGeo, starMat);
      scene.add(starPoints);

      nebulaGeo = new THREE.PlaneGeometry(6.4, 3.6, 1, 1);
      nebulaMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec2 p = vUv - 0.5;
            float n1 = sin(p.x * 5.0 + uTime * 0.14) * cos(p.y * 4.0 - uTime * 0.11);
            float glow = smoothstep(0.65, 0.05, length(p * vec2(1.1, 1.4)));
            vec3 col = mix(vec3(0.22, 0.07, 0.48), vec3(0.0, 0.38, 0.62), n1 * 0.5 + 0.5);
            gl_FragColor = vec4(col, glow * 0.22);
          }
        `
      });
      const nebulaPlane = new THREE.Mesh(nebulaGeo, nebulaMat);
      nebulaPlane.position.set(0, 0.1, -1.7);
      scene.add(nebulaPlane);

      const blackHoleGroup = new THREE.Group();
      blackHoleGroup.position.set(0, 0.36, -0.58);
      blackHoleGroup.rotation.x = 0.34;
      scene.add(blackHoleGroup);

      coreGeo = new THREE.SphereGeometry(0.38, 32, 32);
      coreMat = new THREE.MeshBasicMaterial({ color: 0x02000a });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      blackHoleGroup.add(coreMesh);

      photonGeo = new THREE.RingGeometry(0.385, 0.425, 56);
      photonMat = new THREE.MeshBasicMaterial({
        color: 0xd8b4fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const photonRing = new THREE.Mesh(photonGeo, photonMat);
      photonRing.rotation.x = -0.34;
      blackHoleGroup.add(photonRing);

      diskGeo = new THREE.PlaneGeometry(3.4, 1.4, 1, 1);
      diskMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColorViolet: { value: new THREE.Color('#7C3AED') },
          uColorCyan: { value: new THREE.Color('#00D8FF') }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColorViolet;
          uniform vec3 uColorCyan;
          varying vec2 vUv;
          void main() {
            vec2 p = (vUv - 0.5) * vec2(2.4, 2.0);
            float dist = length(p);
            float angle = atan(p.y, p.x);
            float swirl = sin(angle * 4.0 - dist * 11.0 + uTime * 1.3) * 0.5 + 0.5;
            float ring = smoothstep(0.28, 0.44, dist) * (1.0 - smoothstep(0.62, 1.05, dist));
            vec3 col = mix(uColorViolet, uColorCyan, swirl * 0.72 + (1.0 - dist) * 0.25);
            float alpha = ring * (0.45 + 0.55 * swirl) * 0.76;
            gl_FragColor = vec4(col, alpha);
          }
        `
      });
      const diskMesh = new THREE.Mesh(diskGeo, diskMat);
      diskMesh.rotation.x = -Math.PI * 0.37;
      blackHoleGroup.add(diskMesh);

      outerArcGeo = new THREE.TorusGeometry(0.9, 0.008, 10, 84);
      outerArcMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.42
      });
      const outerArc = new THREE.Mesh(outerArcGeo, outerArcMat);
      outerArc.rotation.x = Math.PI * 0.42;
      blackHoleGroup.add(outerArc);

      let mouseX = 0;
      let mouseY = 0;
      const onMouseMove = (e) => {
        if (isMobile) return;
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.14;
      };
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const onResize = () => {
        if (!renderer || !camera) return;
        const mobileNow = window.innerWidth < 768;
        const dprCap = mobileNow ? 1.25 : 1.75;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let lastTime = performance.now();
      let lastRenderTime = lastTime;
      const targetFrameInterval = isLowPower ? 1000 / 30 : 1000 / 60;

      const animate = (now) => {
        if (isDisposed) return;
        animId = requestAnimationFrame(animate);
        if (document.hidden) {
          lastTime = now;
          lastRenderTime = now;
          return;
        }

        const elapsedSinceRender = now - lastRenderTime;
        if (elapsedSinceRender < targetFrameInterval - 1) return;
        lastRenderTime = now;

        const delta = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        const scrollY = window.scrollY || 0;
        const heroFade = Math.max(0, 1 - scrollY / (window.innerHeight * 0.95));

        starPoints.rotation.y -= delta * 0.026;
        starPoints.rotation.x -= delta * 0.009;

        nebulaMat.uniforms.uTime.value += delta;

        if (heroFade > 0.02) {
          blackHoleGroup.visible = true;
          diskMat.uniforms.uTime.value += delta;
          outerArc.rotation.z += delta * 0.16;
          blackHoleGroup.position.y = 0.36 + scrollY * 0.00075;
          diskMat.uniforms.uColorViolet.value.set('#7C3AED').multiplyScalar(heroFade);
          diskMat.uniforms.uColorCyan.value.set('#00D8FF').multiplyScalar(heroFade);
          photonMat.opacity = 0.85 * heroFade;
          outerArcMat.opacity = 0.42 * heroFade;
        } else {
          blackHoleGroup.visible = false;
        }

        camera.position.x += (mouseX - camera.position.x) * 0.032;
        camera.position.y += (0.12 - mouseY - camera.position.y) * 0.032;

        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(animate);

      return () => {
        isDisposed = true;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        cleanupResources();
      };
    } catch {
      cleanupResources();
      setFallbackActive(true);
    }
  }, [reducedMotion]);

  if (fallbackActive) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 20%, rgba(124,58,237,0.32) 0%, rgba(0,216,255,0.12) 38%, transparent 68%)'
        }}
        aria-hidden="true"
      />
    );
  }

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}

// ============================================================================
// 4. SELECTIVE TYPEWRITER, WORD REVEALS & DISTINCT SECTION CHOREOGRAPHIES
// ============================================================================
function HeroRoleTypewriter({ phrases }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timeoutId;

    if (!isDeleting && displayedText.length < currentPhrase.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
      }, 54);
    } else if (!isDeleting && displayedText.length === currentPhrase.length) {
      timeoutId = setTimeout(() => {
        setIsDeleting(true);
      }, 1750);
    } else if (isDeleting && displayedText.length > 0) {
      timeoutId = setTimeout(() => {
        setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
      }, 30);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex, phrases, reducedMotion]);

  return (
    <div className="min-h-[1.75rem] flex items-center gap-2 text-xs sm:text-sm font-medium text-cyan-300 tracking-wide">
      <span className="text-purple-400 select-none">//</span>
      <span>{displayedText}</span>
      {!reducedMotion && (
        <span
          className="inline-block w-[1.5px] h-4 bg-cyan-300 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function WordRevealHeading({ text, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref, 0.2);
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(' ');
  const shown = reducedMotion || inView;

  return (
    <h2 ref={ref} className={className} style={style}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.26em] last:mr-0">
          <span
            className="inline-block"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? 'translateY(0%)' : 'translateY(100%)',
              transition: reducedMotion
                ? 'none'
                : `opacity 0.7s ease-out ${idx * 0.065}s, transform 0.7s ease-out ${idx * 0.065}s`
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}

function CosmicSectionBridge({ variant = 'orbit' }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref, 0.2);

  return (
    <div
      ref={ref}
      className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pointer-events-none select-none overflow-hidden"
    >
      {variant === 'orbit' && (
        <div className="relative h-12 flex items-center justify-center">
          <svg viewBox="0 0 800 48" className="w-full max-w-3xl h-12" fill="none">
            <path
              d="M 40 36 Q 400 4 760 36"
              stroke="url(#bridgeGrad1)"
              strokeWidth="1"
              style={{
                opacity: inView ? 0.7 : 0,
                transition: 'opacity 1.1s ease-out'
              }}
            />
            <defs>
              <linearGradient id="bridgeGrad1" x1="40" y1="24" x2="760" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
                <stop offset="50%" stopColor="#00D8FF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      {variant === 'light-trail' && (
        <div className="relative h-10 flex items-center">
          <div
            style={{
              transformOrigin: 'left center',
              transform: inView ? 'scaleX(1)' : 'scaleX(0)',
              opacity: inView ? 1 : 0,
              transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.1s ease-out'
            }}
            className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
          />
        </div>
      )}
      {variant === 'constellation' && (
        <div className="relative h-12 flex items-center justify-between px-12">
          {[0, 1, 2].map((node) => (
            <span
              key={node}
              style={{
                transform: inView ? 'scale(1)' : 'scale(0)',
                opacity: inView ? 0.65 : 0,
                transition: `transform 0.5s ease-out ${node * 0.15}s, opacity 0.5s ease-out ${node * 0.15}s`
              }}
              className="w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#C084FC]"
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ArogyamBarcodeConceptArtwork() {
  const barWidths = [3, 1.5, 4, 2, 1.5, 3.5, 2, 4.5, 1.5, 2.5, 3, 1.5, 4, 2, 3, 1.5, 2.5, 4, 1.5, 3];
  let cursorX = 82;

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#06222E] via-[#070720] to-[#030014] relative overflow-hidden flex items-center justify-center p-4 sm:p-6">
      <svg
        viewBox="0 0 640 360"
        className="w-full max-w-[580px] h-auto"
        fill="none"
        role="img"
        aria-label="Arogyam concept artwork illustrating a smartphone camera scanning a linear barcode on a packaged consumer product"
      >
        <rect
          x="52"
          y="46"
          width="210"
          height="268"
          rx="16"
          fill="#0B132B"
          stroke="#38BDF8"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <text
          x="157"
          y="82"
          textAnchor="middle"
          fill="#93C5FD"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2.5"
        >
          PACKAGED PRODUCT
        </text>
        <rect x="74" y="102" width="166" height="8" rx="4" fill="#E0F2FE" fillOpacity="0.22" />
        <rect x="92" y="118" width="130" height="6" rx="3" fill="#E0F2FE" fillOpacity="0.14" />

        <rect x="72" y="148" width="170" height="118" rx="8" fill="#F8FAFC" />
        {barWidths.map((w, idx) => {
          const x = cursorX;
          cursorX += w + (idx % 2 === 0 ? 3.2 : 2.4);
          return <rect key={idx} x={x} y="164" width={w} height="74" fill="#0F172A" />;
        })}
        <text
          x="157"
          y="254"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="11"
          fontFamily="monospace"
          fontWeight="700"
          letterSpacing="3"
        >
          8 901234 567890
        </text>

        <line x1="60" y1="201" x2="254" y2="201" stroke="#00D8FF" strokeWidth="2.5" />
        <rect
          x="64"
          y="156"
          width="186"
          height="96"
          rx="6"
          stroke="#00D8FF"
          strokeWidth="1.5"
          strokeDasharray="8 6"
        />

        <path d="M262 201H332" stroke="#00D8FF" strokeWidth="1.8" strokeDasharray="4 4" />
        <circle cx="332" cy="201" r="4" fill="#00D8FF" />

        <rect
          x="338"
          y="58"
          width="250"
          height="244"
          rx="16"
          fill="#0A0624"
          stroke="#A855F7"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <text x="362" y="92" fill="#00D8FF" fontSize="11" fontWeight="700" letterSpacing="2">
          AROGYAM INSIGHT CONCEPT
        </text>
        <text x="362" y="118" fill="#FFFFFF" fontSize="17" fontWeight="700">
          Ingredient & Nutrition Context
        </text>
        <line x1="362" y1="134" x2="564" y2="134" stroke="#FFFFFF" strokeOpacity="0.12" />

        {[
          { y: 158, label: 'Barcode Lookup', color: '#38BDF8' },
          { y: 202, label: 'Ingredient Breakdown', color: '#C084FC' },
          { y: 246, label: 'Health-Related Notes', color: '#34D399' }
        ].map((row) => (
          <g key={row.label}>
            <rect
              x="362"
              y={row.y - 16}
              width="202"
              height="32"
              rx="6"
              fill="#FFFFFF"
              fillOpacity="0.04"
            />
            <circle cx="376" cy={row.y} r="4" fill={row.color} />
            <text x="388" y={row.y + 4} fill="#E5E7EB" fontSize="11.5" fontWeight="600">
              {row.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function ProjectCoverMedia({ project, featured = false }) {
  const [imgError, setImgError] = useState(false);

  if (project.mediaKind === 'concept-art' || project.artworkVariant === 'arogyam' || imgError) {
    return (
      <div className="relative w-full h-full">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-[#120736] via-[#07031A] to-[#030014] flex flex-col items-center justify-center p-6 text-center space-y-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cyan-300 font-bold">
              PROJECT #{project.projectNumber}
            </span>
            <p className="font-space-display font-bold text-xl sm:text-2xl text-white">
              {project.title}
            </p>
            <p className="text-xs text-gray-400">{project.categoryLabel}</p>
          </div>
        ) : (
          <ArogyamBarcodeConceptArtwork />
        )}
        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-[#030014]/85 border border-white/15 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-200">
          {project.mediaBadge}
        </span>
      </div>
    );
  }

  if (project.mediaKind === 'screenshot') {
    return (
      <div className="relative w-full h-full bg-[#050214] p-4 flex items-center justify-center">
        <img
          src={project.coverUrl}
          alt={project.coverAlt}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
        />
        <span className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-cyan-400/20 border border-cyan-300/45 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
          {project.mediaBadge}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-[#040112] overflow-hidden">
      <img
        src={project.coverUrl}
        alt={project.coverAlt}
        loading={featured ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setImgError(true)}
        className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/35 to-[#1E0B4B]/25 pointer-events-none" />
      <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#030014]/80 border border-white/15 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
        PROJECT #{project.projectNumber}
      </span>
      <span className="absolute top-3.5 right-3.5 px-2.5 py-1 bg-[#030014]/80 border border-white/15 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-200">
        {project.mediaBadge}
      </span>
    </div>
  );
}

function ProjectShowcasePanel({ project, index, featured = false, onSelect }) {
  const cardRef = useRef(null);
  const inView = useInViewOnce(cardRef, 0.14);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -y * 5, ry: x * 5 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const xOffset = featured ? 0 : index % 2 === 0 ? -24 : 24;
  const delay = Math.min(index * 0.08, 0.28);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(0, 0, 0)`
          : `perspective(1100px) translate3d(${xOffset}px, 20px, 0)`,
        transition:
          tilt.rx === 0 && tilt.ry === 0
            ? `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, border-color 0.3s ease`
            : 'transform 0.14s ease-out, border-color 0.3s ease'
      }}
      className={`group cursor-pointer bg-[#08031B]/85 backdrop-blur-md border border-white/15 hover:border-cyan-300/65 shadow-[0_14px_45px_rgba(3,0,20,0.8)] overflow-hidden flex flex-col justify-between ${
        featured ? 'lg:grid lg:grid-cols-12' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#040112] ${
          featured ? 'lg:col-span-7 aspect-[16/9] lg:aspect-auto lg:min-h-[360px]' : 'aspect-[16/9]'
        }`}
      >
        <ProjectCoverMedia project={project} featured={featured} />
      </div>

      <div
        className={`p-6 sm:p-8 flex flex-col justify-between space-y-5 ${
          featured ? 'lg:col-span-5 lg:border-l lg:border-white/10' : ''
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-[0.16em] text-purple-300 font-semibold">
              {project.categoryLabel}
            </span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          <h3 className="font-space-display font-bold text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">{project.shortIntro}</p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#030014]/80 border border-white/10 text-[11px] text-gray-200"
                >
                  <SkillBrandVisual name={tech} size="md" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-cyan-300 font-semibold uppercase tracking-[0.14em] inline-flex items-center gap-1.5">
            Inspect Case Study <ArrowRight className="w-3.5 h-3.5" />
          </span>
          {project.repoUrl && (
            <span className="text-gray-400 inline-flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub Repository
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// 5. SIGNATURE BRANDING WORDMARK ("SANSKAR PATIL" — SHARED BY NAVBAR & PRELOADER)
// ============================================================================
function SignatureBrandWordmark({ variant = 'navbar', onClick, ready = true }) {
  const firstWord = ['S', 'A', 'N', 'S', 'K', 'A', 'R'];
  const secondWord = ['P', 'A', 'T', 'I', 'L'];
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const isPreloader = variant === 'preloader';

  const continuousGradient = hovered
    ? 'linear-gradient(105deg, #F8FAFC 0%, #67E8F9 24%, #E9D5FF 48%, #A855F7 72%, #93C5FD 88%, #F8FAFC 100%)'
    : 'linear-gradient(105deg, #F8FAFC 0%, #CFFAFE 24%, #E9D5FF 48%, #C084FC 72%, #BFDBFE 88%, #F8FAFC 100%)';

  const content = (
    <span className="relative inline-flex items-center select-none">
      {/* Restrained Atmospheric Glow */}
      <span
        aria-hidden="true"
        style={{
          opacity: isPreloader ? 0.36 : hovered ? 0.48 : 0.2,
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
          transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(103,232,249,0.32) 0%, rgba(168,85,247,0.24) 55%, rgba(3,0,20,0) 80%)'
        }}
        className="pointer-events-none absolute -inset-x-3 -inset-y-1 blur-lg rounded-full"
      />

      {/* Single Continuous Animated Gradient Text Container */}
      <span
        style={{
          backgroundImage: continuousGradient,
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: reducedMotion ? 'none' : 'brandGradientFlow 9s linear infinite',
          filter: hovered
            ? 'drop-shadow(0 0 14px rgba(103, 232, 249, 0.26))'
            : 'drop-shadow(0 1px 0 rgba(255, 255, 255, 0.08))'
        }}
        className={`relative inline-flex items-baseline uppercase font-space-display leading-none transition-[filter] duration-500 ${
          isPreloader
            ? 'text-xl sm:text-4xl tracking-[0.2em] sm:tracking-[0.26em] pl-[0.2em] sm:pl-[0.26em]'
            : 'text-[13px] sm:text-[17px] tracking-[0.15em] sm:tracking-[0.19em]'
        }`}
      >
        {/* SANSKAR — Slightly Heavier Weight */}
        <span className="inline-flex font-bold">
          {firstWord.map((char, idx) => (
            <span
              key={`first-${idx}`}
              style={{
                opacity: ready || reducedMotion ? 1 : 0,
                transform: ready || reducedMotion ? 'translateY(0px)' : 'translateY(9px)',
                filter: ready || reducedMotion ? 'blur(0px)' : 'blur(5px)',
                transition: reducedMotion
                  ? 'none'
                  : `opacity 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + idx * 0.032}s, transform 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + idx * 0.032}s, filter 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + idx * 0.032}s`
              }}
              className="inline-block"
            >
              {char}
            </span>
          ))}
        </span>

        {/* Balanced Optical Word Gap */}
        <span className={isPreloader ? 'w-3 sm:w-5 inline-block' : 'w-1.5 sm:w-2.5 inline-block'} />

        {/* PATIL — Slightly Lighter Weight */}
        <span className="inline-flex font-medium">
          {secondWord.map((char, idx) => {
            const globalIndex = firstWord.length + idx;
            return (
              <span
                key={`second-${idx}`}
                style={{
                  opacity: ready || reducedMotion ? 1 : 0,
                  transform: ready || reducedMotion ? 'translateY(0px)' : 'translateY(9px)',
                  filter: ready || reducedMotion ? 'blur(0px)' : 'blur(5px)',
                  transition: reducedMotion
                    ? 'none'
                    : `opacity 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + globalIndex * 0.032}s, transform 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + globalIndex * 0.032}s, filter 0.54s cubic-bezier(0.22, 1, 0.36, 1) ${0.06 + globalIndex * 0.032}s`
                }}
                className="inline-block"
              >
                {char}
              </span>
            );
          })}
        </span>
      </span>

      {/* Delicate Light-Reflection Sweep */}
      {!reducedMotion && (
        <span
          aria-hidden="true"
          style={{
            transform: isPreloader
              ? undefined
              : hovered
              ? 'translateX(260%)'
              : 'translateX(-140%)',
            opacity: isPreloader ? undefined : hovered ? 0.75 : 0,
            transition: isPreloader
              ? undefined
              : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease-out',
            animation: isPreloader ? 'brandLightSweep 3s ease-in-out infinite' : 'none'
          }}
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-transparent via-white/80 to-transparent mix-blend-overlay"
        />
      )}
    </span>
  );

  if (isPreloader) {
    return content;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="SANSKAR PATIL — Scroll to top"
      className="relative inline-flex items-center py-1 text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-300/70"
    >
      {content}
    </button>
  );
}

// ============================================================================
// 5B. CINEMATIC COSMIC EVENT-HORIZON PRELOADER
// ============================================================================
const PRELOADER_STARS = [
  { top: '12%', left: '16%', size: 1.5, delay: 0.1, duration: 4.2, color: '#F8FAFC' },
  { top: '20%', left: '78%', size: 2, delay: 0.4, duration: 5.1, color: '#00D8FF' },
  { top: '34%', left: '10%', size: 1.5, delay: 0.8, duration: 4.6, color: '#E9D5FF' },
  { top: '28%', left: '88%', size: 1.5, delay: 0.2, duration: 3.9, color: '#F8FAFC' },
  { top: '68%', left: '14%', size: 2, delay: 0.6, duration: 5.4, color: '#A855F7' },
  { top: '76%', left: '82%', size: 1.5, delay: 0.3, duration: 4.5, color: '#00D8FF' },
  { top: '84%', left: '26%', size: 1.5, delay: 0.9, duration: 4.8, color: '#F8FAFC' },
  { top: '16%', left: '46%', size: 1.5, delay: 0.5, duration: 4.1, color: '#E9D5FF' }
];

function CosmicPreloader({ isVisible, progress, statusText, reducedMotion }) {
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const t = setTimeout(() => setShouldRender(false), reducedMotion ? 320 : 780);
      return () => clearTimeout(t);
    }
  }, [isVisible, reducedMotion]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : reducedMotion ? 'scale(1)' : 'scale(1.035)',
        transition: reducedMotion
          ? 'opacity 0.3s ease-out'
          : 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      className="fixed inset-0 z-50 bg-[#030014] flex flex-col items-center justify-center px-6 overflow-hidden select-none"
      role="status"
      aria-live="polite"
      aria-label="Loading Sanskar Patil Portfolio"
    >
      {/* Deep Radial Violet & Electric Cyan Nebula Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 44%, rgba(112, 66, 248, 0.24) 0%, rgba(168, 85, 247, 0.11) 30%, rgba(0, 216, 255, 0.06) 52%, rgba(3, 0, 20, 0.98) 76%)'
        }}
      />

      {/* Drifting Stars */}
      {!reducedMotion &&
        PRELOADER_STARS.map((star, idx) => (
          <span
            key={idx}
            aria-hidden="true"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              animation: `cosmicStarPulse ${star.duration}s ease-in-out ${star.delay}s infinite`
            }}
            className="pointer-events-none absolute rounded-full"
          />
        ))}

      <div className="relative z-10 flex flex-col items-center">
        {/* Central Event-Horizon & Accretion Rings */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center mb-6 sm:mb-8">
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, rgba(112,66,248,0.45) 0%, rgba(0,216,255,0.22) 52%, rgba(3,0,20,0) 75%)'
            }}
          />

          <svg
            viewBox="0 0 260 260"
            className="w-full h-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="preloaderRingCyanViolet" x1="20" y1="130" x2="240" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00D8FF" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7042F8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="preloaderRingPurple" x1="30" y1="60" x2="230" y2="200" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00D8FF" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#7042F8" stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="singularityCore" cx="50%" cy="50%" r="50%">
                <stop offset="68%" stopColor="#030014" stopOpacity="1" />
                <stop offset="92%" stopColor="#1B0A4A" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
              </radialGradient>
            </defs>

            <g
              style={{
                transformOrigin: '130px 130px',
                animation: reducedMotion ? 'none' : 'orbitSpinCW 24s linear infinite'
              }}
            >
              <ellipse
                cx="130"
                cy="130"
                rx="116"
                ry="44"
                transform="rotate(-24 130 130)"
                stroke="url(#preloaderRingPurple)"
                strokeWidth="1.1"
              />
              <circle cx="235" cy="83" r="2.2" fill="#00D8FF" />
            </g>

            <g
              style={{
                transformOrigin: '130px 130px',
                animation: reducedMotion ? 'none' : 'orbitSpinCCW 15s linear infinite'
              }}
            >
              <ellipse
                cx="130"
                cy="130"
                rx="96"
                ry="34"
                transform="rotate(18 130 130)"
                stroke="url(#preloaderRingCyanViolet)"
                strokeWidth="1.5"
              />
              <circle cx="39" cy="100" r="2" fill="#E9D5FF" />
            </g>

            <g
              style={{
                transformOrigin: '130px 130px',
                animation: reducedMotion ? 'none' : 'orbitSpinCW 9s linear infinite'
              }}
            >
              <circle
                cx="130"
                cy="130"
                r="44"
                stroke="url(#preloaderRingCyanViolet)"
                strokeWidth="1.4"
                strokeDasharray="110 42 28 42"
              />
            </g>

            <circle
              cx="130"
              cy="130"
              r="36"
              fill="url(#singularityCore)"
              stroke="#E9D5FF"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Unified Signature Branding: SANSKAR PATIL */}
        <SignatureBrandWordmark variant="preloader" ready={true} />

        {/* Thin Milestone-Driven Progress Track */}
        <div className="mt-6 w-52 sm:w-64 space-y-2.5">
          <div className="relative h-[2px] w-full bg-white/10 overflow-hidden">
            <div
              style={{
                transformOrigin: 'left center',
                transform: `scaleX(${Math.max(0.14, Math.min(1, progress))})`,
                transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              className="h-full w-full bg-gradient-to-r from-[#7042F8] via-[#A855F7] to-[#00D8FF]"
            />
          </div>

          <p className="text-center text-[10px] uppercase tracking-[0.22em] text-gray-400">
            {statusText}
          </p>
        </div>
      </div>
    </div>
  );
}

const CosmicEventHorizon = () => (
  <div
    className="pointer-events-none select-none absolute -top-44 left-1/2 -translate-x-1/2 w-[960px] sm:w-[1320px] h-[560px] overflow-hidden opacity-85"
    aria-hidden="true"
  >
    <div
      className="w-full h-full rounded-full blur-3xl"
      style={{
        background:
          'radial-gradient(ellipse at 50% 45%, rgba(168,85,247,0.42) 0%, rgba(79,70,229,0.28) 38%, rgba(0,216,255,0.12) 62%, rgba(3,0,20,0) 76%)'
      }}
    />
    <svg
      viewBox="0 0 1200 420"
      className="absolute inset-x-0 top-14 w-full h-auto opacity-80"
      fill="none"
    >
      <defs>
        <linearGradient id="horizonArc" x1="150" y1="210" x2="1050" y2="210" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D8FF" stopOpacity="0" />
          <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#00D8FF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#00D8FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="600" cy="185" rx="450" ry="74" stroke="url(#horizonArc)" strokeWidth="2.2" />
      <ellipse
        cx="600"
        cy="185"
        rx="360"
        ry="48"
        stroke="url(#horizonArc)"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
    </svg>
  </div>
);

// ============================================================================
// 6. MAIN APPLICATION — SINGLE-PAGE COSMIC PORTFOLIO
// ============================================================================
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0.18);
  const [loadStatusText, setLoadStatusText] = useState('INITIALIZING');
  const reducedMotion = usePrefersReducedMotion();

  const [activeSection, setActiveSection] = useState('home');
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certZoom, setCertZoom] = useState(1);

  const [activeSkillCategory, setActiveSkillCategory] = useState('All');

  useEffect(() => {
    let active = true;
    const minDisplayMs = reducedMotion ? 350 : 1200;
    const failSafeMs = 4600;
    const startTime = performance.now();

    let frameDone = false;
    let fontsDone = false;
    let portraitDone = false;
    let minTimeDone = false;

    const updateProgressAndCheck = () => {
      if (!active) return;
      const completedCount = (frameDone ? 1 : 0) + (fontsDone ? 1 : 0) + (portraitDone ? 1 : 0);
      const nextProgress = 0.22 + (completedCount / 3) * 0.78;
      setLoadProgress(nextProgress);

      if (!fontsDone) {
        setLoadStatusText('CALIBRATING TYPOGRAPHY');
      } else if (!portraitDone) {
        setLoadStatusText('PREPARING VISUALS');
      } else {
        setLoadStatusText('READY');
      }

      if (frameDone && fontsDone && portraitDone && minTimeDone) {
        setIsLoading(false);
      }
    };

    const rafId = requestAnimationFrame(() => {
      frameDone = true;
      updateProgressAndCheck();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          fontsDone = true;
          updateProgressAndCheck();
        })
        .catch(() => {
          fontsDone = true;
          updateProgressAndCheck();
        });
    } else {
      fontsDone = true;
      updateProgressAndCheck();
    }

    const heroImg = new Image();
    const markPortraitReady = () => {
      portraitDone = true;
      updateProgressAndCheck();
    };
    heroImg.onload = markPortraitReady;
    heroImg.onerror = markPortraitReady;
    heroImg.src = PROFILE.portraitUrl;
    if (heroImg.complete) {
      markPortraitReady();
    }

    const elapsed = performance.now() - startTime;
    const minTimer = setTimeout(() => {
      minTimeDone = true;
      updateProgressAndCheck();
    }, Math.max(0, minDisplayMs - elapsed));

    const failSafeTimer = setTimeout(() => {
      if (!active) return;
      setLoadProgress(1);
      setIsLoading(false);
    }, failSafeMs);

    return () => {
      active = false;
      cancelAnimationFrame(rafId);
      clearTimeout(minTimer);
      clearTimeout(failSafeTimer);
      heroImg.onload = null;
      heroImg.onerror = null;
    };
  }, [reducedMotion]);

  useEffect(() => {
    const hasModal = Boolean(isLoading || selectedProject || selectedCertificate);
    if (hasModal) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isLoading, selectedProject, selectedCertificate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setSelectedCertificate(null);
        setCertZoom(1);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'skills',
      'projects',
      'experience',
      'education',
      'achievements',
      'contact'
    ];

    const onScroll = () => {
      const y = window.scrollY;
      setHeaderScrolled(y > 28);

      const scrollPos = y + 240;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'achievements', label: 'Certificates' }
  ];

  const personalProjects = PROJECTS.filter((p) => p.group === 'Personal Project');
  const collegeProjects = PROJECTS.filter((p) => p.group === 'College Project');
  const publishedCertificates = CERTIFICATES.filter((c) => c.published);
  const featuredCertificates = publishedCertificates.filter((c) => c.featured);
  const supportingCertificates = publishedCertificates.filter((c) => !c.featured);

  return (
    <div className="min-h-screen bg-[#030014] text-[#F3F4F6] font-space-body selection:bg-[#7042f8] selection:text-white overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@1,500;1,600&display=swap');

        .font-space-display { font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
        .font-space-body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; }
        .font-editorial-italic { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-style: italic; }

        @keyframes brandGradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes brandLightSweep {
          0%, 20% { transform: translateX(-140%); opacity: 0; }
          50% { opacity: 0.75; }
          80%, 100% { transform: translateX(320%); opacity: 0; }
        }

        @keyframes orbitSpinCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes orbitSpinCCW {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        @keyframes cosmicStarPulse {
          0%, 100% { opacity: 0.2; transform: translateY(-4px); }
          50% { opacity: 0.85; transform: translateY(4px); }
        }

        @keyframes skillFloatEven {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes skillFloatOdd {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(3px); }
        }

        .hero-portrait-mask {
          -webkit-mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) calc(100% - 210px),
            rgba(0, 0, 0, 0.55) calc(100% - 105px),
            rgba(0, 0, 0, 0) 100%
          );
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) calc(100% - 210px),
            rgba(0, 0, 0, 0.55) calc(100% - 105px),
            rgba(0, 0, 0, 0) 100%
          );
        }

        @media (min-width: 1024px) {
          .hero-portrait-mask {
            -webkit-mask-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) calc(100% - 290px),
              rgba(0, 0, 0, 0.52) calc(100% - 145px),
              rgba(0, 0, 0, 0) 100%
            );
            mask-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 1) 0%,
              rgba(0, 0, 0, 1) calc(100% - 290px),
              rgba(0, 0, 0, 0.52) calc(100% - 145px),
              rgba(0, 0, 0, 0) 100%
            );
          }
        }
      `}</style>

      <CosmicPreloader
        isVisible={isLoading}
        progress={loadProgress}
        statusText={loadStatusText}
        reducedMotion={reducedMotion}
      />

      <CosmicUniverseCanvas />

      {/* ====================================================================
          CUSTOM BRANDED HEADER ("SANSKAR PATIL" SIGNATURE WORDMARK)
         ==================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          headerScrolled
            ? 'bg-[#030014]/88 backdrop-blur-xl border-white/[0.1]'
            : 'bg-[#030014]/45 backdrop-blur-md border-white/[0.05]'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 h-16 sm:h-20 flex items-center justify-between gap-3">
          <SignatureBrandWordmark
            variant="navbar"
            onClick={() => scrollToSection('home')}
            ready={!isLoading}
          />

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary Navigation">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    opacity: !isLoading || reducedMotion ? 1 : 0,
                    transform: !isLoading || reducedMotion ? 'translateY(0)' : 'translateY(-8px)',
                    transition: reducedMotion
                      ? 'none'
                      : `opacity 0.5s ease-out ${0.28 + idx * 0.05}s, transform 0.5s ease-out ${0.28 + idx * 0.05}s, color 0.25s ease`
                  }}
                  className={`text-xs uppercase tracking-[0.18em] font-semibold cursor-pointer relative py-1.5 ${
                    isActive ? 'text-cyan-300' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-400 to-cyan-300" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-[0.16em] font-semibold text-white border border-white/25 hover:border-cyan-300 transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-white border border-white/15"
              aria-label="Toggle Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#07021A]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-5 py-5 space-y-2">
            {[...navItems, { id: 'education', label: 'Education' }, { id: 'contact', label: 'Contact' }].map(
              (item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left py-2.5 text-xs uppercase tracking-[0.18em] font-semibold border-b border-white/10 ${
                    activeSection === item.id ? 'text-cyan-300' : 'text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        )}
      </header>

      {/* ====================================================================
          SECTION 1: HERO — LONG SEAMLESS PORTRAIT FADE INTO ABOUT
         ==================================================================== */}
      <section
        id="home"
        className="relative z-10 min-h-[96vh] pt-20 sm:pt-24 flex flex-col justify-between overflow-hidden"
      >
        <CosmicEventHorizon />

        <div
          style={{
            opacity: !isLoading || reducedMotion ? 1 : 0,
            transform: !isLoading || reducedMotion ? 'scale(1) translateY(0px)' : 'scale(1.04) translateY(20px)',
            transition: reducedMotion
              ? 'none'
              : 'opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s'
          }}
          className="pointer-events-none select-none lg:absolute lg:inset-x-0 lg:bottom-0 flex justify-center items-end z-10 pt-2 lg:pt-0"
        >
          <div className="relative flex justify-center items-end w-full max-w-[920px] xl:max-w-[1040px]">
            <img
              src={PROFILE.portraitUrl}
              alt={PROFILE.fullName}
              fetchpriority="high"
              decoding="async"
              className="hero-portrait-mask w-auto h-[52vh] sm:h-[70vh] lg:h-[88vh] max-h-[900px] object-contain object-bottom drop-shadow-[0_24px_65px_rgba(112,66,248,0.34)]"
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 sm:h-72 z-[15]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(3,0,20,0) 0%, rgba(11,4,34,0.55) 48%, rgba(3,0,20,0.95) 85%, #030014 100%)'
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-10 lg:px-14 flex-1 flex flex-col justify-between py-5 sm:py-6 relative z-20">
          <div
            style={{
              opacity: !isLoading || reducedMotion ? 1 : 0,
              transform: !isLoading || reducedMotion ? 'translateY(0)' : 'translateY(-10px)',
              transition: reducedMotion
                ? 'none'
                : 'opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s'
            }}
            className="flex flex-wrap items-center justify-between gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-gray-300"
          >
            <span className="inline-flex items-center gap-2 text-cyan-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse shrink-0" />
              {PROFILE.heroStatus}
            </span>
            <span className="text-purple-200/85 hidden md:inline">{PROFILE.supportingIdentity}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 sm:gap-8 pb-2 sm:pb-6 mt-auto">
            <div className="lg:col-span-8 space-y-2 sm:space-y-3">
              <p
                style={{
                  opacity: !isLoading || reducedMotion ? 1 : 0,
                  transform: !isLoading || reducedMotion ? 'translateY(0)' : 'translateY(14px)',
                  transition: reducedMotion
                    ? 'none'
                    : 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.42s, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.42s'
                }}
                className="font-editorial-italic text-3xl sm:text-5xl text-cyan-300 drop-shadow-[0_2px_12px_rgba(3,0,20,0.95)]"
              >
                {PROFILE.heroGreeting}
              </p>

              <h1 className="font-space-display font-bold uppercase tracking-tight leading-[0.88] text-white drop-shadow-[0_8px_32px_rgba(3,0,20,0.95)]">
                <span className="block overflow-hidden">
                  <span
                    className="block"
                    style={{
                      fontSize: 'clamp(3.15rem, 9.8vw, 8.8rem)',
                      opacity: !isLoading || reducedMotion ? 1 : 0,
                      transform: !isLoading || reducedMotion ? 'translateY(0%)' : 'translateY(105%)',
                      transition: reducedMotion
                        ? 'none'
                        : 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.56s, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.56s'
                    }}
                  >
                    {PROFILE.heroFirstName}
                  </span>
                </span>
                <span className="block overflow-hidden mt-1">
                  <span
                    className="block bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent"
                    style={{
                      fontSize: 'clamp(2.55rem, 8.4vw, 7.6rem)',
                      opacity: !isLoading || reducedMotion ? 1 : 0,
                      transform: !isLoading || reducedMotion ? 'translateY(0%)' : 'translateY(105%)',
                      transition: reducedMotion
                        ? 'none'
                        : 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.72s, transform 0.95s cubic-bezier(0.22, 1, 0.36, 1) 0.72s'
                    }}
                  >
                    {PROFILE.heroLastName}
                  </span>
                </span>
              </h1>
            </div>

            <div
              style={{
                opacity: !isLoading || reducedMotion ? 1 : 0,
                transform: !isLoading || reducedMotion ? 'translateY(0)' : 'translateY(20px)',
                transition: reducedMotion
                  ? 'none'
                  : 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.9s, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.9s'
              }}
              className="lg:col-span-4 space-y-3.5 bg-[#030014]/70 backdrop-blur-md p-4 sm:p-6 border border-white/10"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300 leading-relaxed">
                {PROFILE.heroRoleLine1} {PROFILE.heroRoleLine2}
              </p>

              <HeroRoleTypewriter phrases={PROFILE.heroTypewriterPhrases} />

              <p className="text-sm text-gray-200 leading-relaxed">{PROFILE.shortIntro}</p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-4 sm:px-5 py-3 bg-white text-[#030014] hover:bg-cyan-200 text-xs font-bold uppercase tracking-[0.16em] inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-4 sm:px-5 py-3 border border-white/25 hover:border-cyan-300 text-white text-xs font-semibold uppercase tracking-[0.16em] transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2: ABOUT — CONTINUOUS FLOW FROM HERO (NO HARD DIVIDER)
         ==================================================================== */}
      <section
        id="about"
        className="relative z-10 pt-10 sm:pt-14 pb-20 sm:pb-24 bg-gradient-to-b from-[#030014] via-[#06021B]/65 to-transparent"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <RevealBlock x={-12} y={0} duration={0.6}>
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
                  01 / Identity & Philosophy
                </span>
              </RevealBlock>

              <WordRevealHeading
                text="Understanding before creating."
                className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
              />

              <RevealBlock x={-16} y={0} delay={0.15} duration={0.85}>
                <blockquote className="pl-4 border-l-2 border-purple-400 font-editorial-italic text-2xl sm:text-3xl text-purple-200 leading-snug">
                  “{PROFILE.tagline}”
                </blockquote>
              </RevealBlock>

              <RevealBlock clip={true} y={0} duration={1.0}>
                <div className="relative aspect-[16/10] overflow-hidden border border-white/15 bg-[#08031B]">
                  <img
                    src={SECTION_VISUALS.about.url}
                    alt={SECTION_VISUALS.about.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#030014]/80 via-transparent to-[#7042f8]/20 pointer-events-none" />
                </div>
              </RevealBlock>
            </div>

            <div className="lg:col-span-7 space-y-8 lg:pt-8">
              <RevealBlock y={18} duration={0.8}>
                <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                  {PROFILE.positioning}
                </p>
              </RevealBlock>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/15 text-sm">
                <RevealBlock delay={0.05} y={14} className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-300" /> Academic Track
                  </span>
                  <p className="font-semibold text-white">{PROFILE.educationDegree}</p>
                  <p className="text-xs text-gray-400">
                    {PROFILE.educationCollege} • Expected {PROFILE.expectedGraduation}
                  </p>
                </RevealBlock>

                <RevealBlock delay={0.1} y={14} className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-300" /> Base & Preferred Work Location
                  </span>
                  <p className="font-semibold text-white">{PROFILE.currentLocation}</p>
                  <p className="text-xs text-gray-400">
                    Preferred Work Location: {PROFILE.preferredLocation}
                  </p>
                </RevealBlock>

                <RevealBlock delay={0.15} y={14} className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400 flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-cyan-300" /> Languages Spoken
                  </span>
                  <p className="font-semibold text-white">{PROFILE.languages.join(' • ')}</p>
                </RevealBlock>

                <RevealBlock delay={0.2} y={14} className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    Personal Creative Interest
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {PROFILE.secondaryInterests}
                  </p>
                </RevealBlock>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="constellation" />

      {/* ====================================================================
          SECTION 3: TECHNOLOGY CONSTELLATIONS
         ==================================================================== */}
      <section id="skills" className="relative z-10 py-18 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <RevealBlock y={22} className="lg:col-span-7 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
                02 / Technology Constellations
              </span>
              <h2
                className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
              >
                Capabilities Across 8 Domains
              </h2>
              <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                Organized across software development, data analytics, Android engineering, Generative AI, SEO publishing, and creative production.
              </p>
            </RevealBlock>

            <RevealBlock clip={true} y={0} duration={0.95} className="lg:col-span-5">
              <div className="relative aspect-[16/8] overflow-hidden border border-white/15 bg-[#08031B]">
                <img
                  src={SECTION_VISUALS.skills.url}
                  alt={SECTION_VISUALS.skills.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#030014]/75 via-transparent to-[#00D8FF]/15 pointer-events-none" />
              </div>
            </RevealBlock>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', ...SKILL_GROUPS_ORDER].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveSkillCategory(cat)}
                className={`px-3.5 py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                  activeSkillCategory === cat
                    ? 'bg-white text-[#030014] border-white'
                    : 'border-white/15 text-gray-300 hover:border-cyan-300/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {SKILL_GROUPS_ORDER.filter(
              (cat) => activeSkillCategory === 'All' || activeSkillCategory === cat
            ).map((category, groupIdx) => {
              const items = SKILLS.filter((s) => s.category === category);
              const prominentItems = items.filter((s) => s.prominent);
              const supportingItems = items.filter((s) => !s.prominent);

              return (
                <RevealBlock
                  key={category}
                  y={20}
                  delay={Math.min(groupIdx * 0.05, 0.2)}
                  className="pt-8 border-t border-white/15 space-y-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-space-display font-bold text-2xl sm:text-3xl text-white">
                      {category}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                      0{groupIdx + 1} // {items.length} Capabilities
                    </span>
                  </div>

                  {prominentItems.length > 0 && (
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
                      {prominentItems.map((sk, idx) => (
                        <div
                          key={sk.id}
                          style={{
                            animation: reducedMotion
                              ? 'none'
                              : `${idx % 2 === 0 ? 'skillFloatEven' : 'skillFloatOdd'} ${4.8 + (idx % 3)}s ease-in-out infinite`
                          }}
                          className="flex items-center gap-3 p-3.5 sm:p-4 bg-[#09041C]/90 border border-[#7042f8]/35 hover:border-cyan-300/75 hover:scale-[1.03] transition-[border-color,transform] duration-300"
                        >
                          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/[0.04] flex items-center justify-center shrink-0">
                            <SkillBrandVisual name={sk.name} size="lg" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-white leading-snug break-words">
                            {sk.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {supportingItems.length > 0 && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {supportingItems.map((sk) => (
                        <div
                          key={sk.id}
                          className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#050214]/90 border border-white/10 hover:border-purple-400/50 text-xs text-gray-200 transition-colors"
                        >
                          <SkillBrandVisual name={sk.name} size="md" />
                          <span>{sk.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="light-trail" />

      {/* ====================================================================
          SECTION 4: SELECTED PROJECTS
         ==================================================================== */}
      <section id="projects" className="relative z-10 py-18 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 space-y-14">
          <RevealBlock y={22} className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
              03 / Selected Builds & Concepts
            </span>
            <h2
              className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
            >
              Personal & College Projects
            </h2>
          </RevealBlock>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <h3 className="font-space-display font-bold text-xl sm:text-2xl text-purple-200 uppercase tracking-wider">
                Personal Projects ({String(personalProjects.length).padStart(2, '0')})
              </h3>
              <span className="text-xs text-gray-400">Independent Builds & Explorations</span>
            </div>

            {personalProjects.length > 0 && (
              <ProjectShowcasePanel
                project={personalProjects[0]}
                index={0}
                featured={true}
                onSelect={setSelectedProject}
              />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {personalProjects.slice(1).map((proj, idx) => (
                <ProjectShowcasePanel
                  key={proj.id}
                  project={proj}
                  index={idx + 1}
                  featured={false}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <h3 className="font-space-display font-bold text-xl sm:text-2xl text-cyan-200 uppercase tracking-wider">
                College Projects ({String(collegeProjects.length).padStart(2, '0')})
              </h3>
              <span className="text-xs text-gray-400">
                Rajarambapu Institute of Technology
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collegeProjects.map((proj, idx) => (
                <ProjectShowcasePanel
                  key={proj.id}
                  project={proj}
                  index={idx}
                  featured={false}
                  onSelect={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="orbit" />

      {/* ====================================================================
          SECTION 5: EXPERIENCE JOURNEY (PROGRESSIVE VERTICAL TIMELINE DRAW)
         ==================================================================== */}
      <section id="experience" className="relative z-10 py-18 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <RevealBlock y={22} className="lg:col-span-7 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
                04 / Practical Journey
              </span>
              <h2
                className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
                style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
              >
                Experience & Independent Operations
              </h2>
            </RevealBlock>

            <RevealBlock x={20} y={0} duration={0.85} className="lg:col-span-5">
              <div className="relative aspect-[16/8] overflow-hidden border border-white/15 bg-[#08031B]">
                <img
                  src={SECTION_VISUALS.experience.url}
                  alt={SECTION_VISUALS.experience.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#030014]/80 via-transparent to-[#7042f8]/20 pointer-events-none" />
              </div>
            </RevealBlock>
          </div>

          <div className="relative pl-5 sm:pl-10 space-y-12">
            <div className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-cyan-300 via-[#7042f8] to-purple-500/20" />

            {EXPERIENCES.map((exp, idx) => (
              <RevealBlock
                key={exp.id}
                y={18}
                delay={0.1 + idx * 0.12}
                className="relative pb-10 border-b border-white/10 last:border-b-0 last:pb-0"
              >
                <span className="absolute -left-[25px] sm:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_14px_#00D8FF]" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-5 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 block">
                      {exp.type}
                    </span>
                    <h3 className="font-space-display font-bold text-2xl sm:text-3xl text-white">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-purple-200">{exp.organization}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400 pt-1">
                      {exp.period}
                    </p>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      {exp.summary}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400"
                        >
                          <span className="text-cyan-300 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {exp.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-3 py-1 bg-[#09041C] border border-[#7042f8]/35 text-purple-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="light-trail" />

      {/* ====================================================================
          SECTION 6: EDUCATION & MANAGEMENT TRAJECTORY
         ==================================================================== */}
      <section id="education" className="relative z-10 py-18 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 space-y-14">
          <RevealBlock y={22} className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
              05 / Academic & Strategic Trajectory
            </span>
            <h2
              className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
            >
              Education, Communication & Management Vision
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <RevealBlock
              x={-20}
              y={0}
              duration={0.85}
              className="lg:col-span-7 bg-[#09041C]/95 border border-cyan-400/35 overflow-hidden"
            >
              <div className="relative aspect-[16/8] overflow-hidden border-b border-white/10">
                <img
                  src={SECTION_VISUALS.education.url}
                  alt={SECTION_VISUALS.education.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09041C] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                    <GraduationCap className="w-4 h-4" /> Current Academic Milestone
                  </span>
                  <span className="px-3.5 py-1 bg-cyan-400/15 border border-cyan-300/35 text-xs font-bold text-cyan-200">
                    Expected Graduation: {PROFILE.expectedGraduation}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-space-display font-bold text-2xl sm:text-4xl text-white leading-tight">
                    {PROFILE.educationDegree}
                  </h3>
                  <p className="text-base sm:text-lg text-purple-200 font-medium">
                    {PROFILE.educationCollege}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                  Building a multidisciplinary foundation across software engineering, Generative AI systems, data analytics, and structured product problem-solving.
                </p>
              </div>
            </RevealBlock>

            <div className="lg:col-span-5 space-y-8 lg:pl-4">
              <RevealBlock clip={true} y={0} duration={0.95}>
                <div className="relative aspect-[16/8] overflow-hidden border border-white/15 bg-[#08031B]">
                  <img
                    src={SECTION_VISUALS.management.url}
                    alt={SECTION_VISUALS.management.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </RevealBlock>

              <RevealBlock delay={0.12} y={16} className="pb-7 border-b border-white/15 space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-purple-300 block">
                  01 • Communication & Team Coordination
                </span>
                <h3 className="font-space-display font-bold text-2xl text-white">
                  Complementary Leadership Strengths
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Public speaking, structured presentations, technical communication, and collaborative project coordination across academic and digital initiatives.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Public Speaking', 'Presentations', 'Team Coordination', 'Communication'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-white/[0.04] border border-white/10 text-gray-200"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </RevealBlock>

              <RevealBlock delay={0.2} y={16} className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 block">
                  02 • Future Goal (Post-Graduation)
                </span>
                <h3 className="font-space-display font-bold text-2xl text-white">
                  Long-Term MBA Aspiration
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">{PROFILE.futureAspiration}</p>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="constellation" />

      {/* ====================================================================
          SECTION 7: UNIFIED CERTIFICATES GALLERY & GOOGLE CLOUD ACHIEVEMENTS
         ==================================================================== */}
      <section id="achievements" className="relative z-10 py-18 sm:py-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 space-y-14">
          <RevealBlock y={22} className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 block">
              06 / Verified Credentials & Cloud Progress
            </span>
            <h2
              className="font-space-display font-bold text-white tracking-tight leading-[1.06]"
              style={{ fontSize: 'clamp(2.1rem, 4.2vw, 3.6rem)' }}
            >
              Certificates & Google Cloud Achievements
            </h2>
          </RevealBlock>

          <RevealBlock
            y={16}
            className="p-5 sm:p-8 bg-gradient-to-r from-[#13083A]/85 via-[#0B041E]/95 to-[#062038]/75 border border-cyan-400/35 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Globe className="w-5 h-5 text-sky-400 shrink-0" />
                <span className="font-space-display font-bold text-lg sm:text-xl text-white">
                  {GOOGLE_CLOUD_SKILLS.title}
                </span>
                <span className="text-xs font-bold px-3.5 py-1 bg-cyan-400/20 border border-cyan-300/40 text-cyan-200">
                  {GOOGLE_CLOUD_SKILLS.points}
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.16em] text-purple-200">
                {GOOGLE_CLOUD_SKILLS.subtitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {GOOGLE_CLOUD_SKILLS.domains.map((domain) => (
                  <span
                    key={domain}
                    className="text-xs px-3 py-1 bg-[#030014]/80 border border-white/15 text-gray-200"
                  >
                    {domain}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">{GOOGLE_CLOUD_SKILLS.note}</p>
            </div>
          </RevealBlock>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <h3 className="font-space-display font-bold text-xl sm:text-2xl text-cyan-200 uppercase tracking-wider">
                Tier 1 — Featured Credentials
              </h3>
              <span className="text-xs text-gray-400">
                Click any credential to inspect the full original document
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCertificates.map((cert, idx) => (
                <RevealBlock key={cert.id} y={20} delay={idx * 0.1}>
                  <article
                    onClick={() => {
                      setSelectedCertificate(cert);
                      setCertZoom(1);
                    }}
                    className="group cursor-pointer bg-gradient-to-br from-[#120736]/90 to-[#07031A]/95 border border-cyan-400/40 hover:border-cyan-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-[0_14px_45px_rgba(3,0,20,0.75)] h-full"
                  >
                    <div className="aspect-[16/10] bg-[#040112] p-4 flex items-center justify-center overflow-hidden border-b border-white/10">
                      {cert.assetType === 'image' ? (
                        <img
                          src={cert.assetUrl}
                          alt={`${cert.title} — ${cert.issuer}`}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-br from-[#150A3E] to-[#050214]">
                          <div className="w-14 h-14 border border-cyan-300/45 bg-cyan-400/10 flex items-center justify-center">
                            <FileText className="w-7 h-7 text-cyan-300" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300 block">
                              Official PDF Credential
                            </span>
                            <p className="text-xs font-mono text-gray-300 break-all max-w-sm">
                              {cert.assetUrl}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-5 sm:p-7 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="font-bold uppercase tracking-[0.16em] text-cyan-300">
                          {cert.credentialType}
                        </span>
                        <span className="text-gray-400">{cert.dateLabel}</span>
                      </div>

                      <h4 className="font-space-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {cert.title}
                      </h4>

                      <p className="text-sm font-semibold text-purple-200">{cert.issuer}</p>

                      {cert.credentialId && (
                        <p className="text-xs font-mono text-gray-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-300">{cert.tier}</span>
                        <span className="text-cyan-300 font-semibold inline-flex items-center gap-1">
                          Inspect Document <ZoomIn className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </RevealBlock>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
              <h3 className="font-space-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wider">
                Applied Credentials, Workshops & Participation ({supportingCertificates.length})
              </h3>
              <span className="text-xs text-gray-400">
                Complete original images preserved without cropping
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportingCertificates.map((cert, idx) => (
                <RevealBlock key={cert.id} y={18} delay={Math.min(idx * 0.06, 0.3)}>
                  <article
                    onClick={() => {
                      setSelectedCertificate(cert);
                      setCertZoom(1);
                    }}
                    className="group cursor-pointer bg-[#09041C]/90 border border-white/15 hover:border-cyan-300/70 hover:-translate-y-1 overflow-hidden flex flex-col justify-between transition-all duration-300 h-full"
                  >
                    <div className="aspect-[4/3] bg-[#040112] p-3 flex items-center justify-center overflow-hidden border-b border-white/10">
                      <img
                        src={cert.assetUrl}
                        alt={`${cert.title} — ${cert.issuer}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="font-bold uppercase tracking-[0.15em] text-cyan-300">
                            {cert.credentialType}
                          </span>
                          <span className="text-gray-400">{cert.dateLabel}</span>
                        </div>

                        <h4 className="font-space-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {cert.title}
                        </h4>

                        <p className="text-xs font-medium text-purple-200">{cert.issuer}</p>

                        {cert.credentialId && (
                          <p className="text-[11px] font-mono text-gray-400 pt-0.5">
                            ID: {cert.credentialId}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-gray-400">
                          {cert.tier.split('—')[0].trim()}
                        </span>
                        <span className="text-cyan-300 font-semibold inline-flex items-center gap-1">
                          View <ZoomIn className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CosmicSectionBridge variant="orbit" />

      {/* ====================================================================
          SECTION 8: PREMIUM INTERACTIVE CONTACT EXPERIENCE
         ==================================================================== */}
      <section
        id="contact"
        className="relative z-10 py-20 sm:py-28 overflow-hidden"
      >
        <div
          className="pointer-events-none select-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 25% 45%, rgba(124,58,237,0.16) 0%, rgba(0,216,255,0.06) 42%, rgba(3,0,20,0) 72%)'
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side — Personal Connection */}
            <div className="lg:col-span-5 space-y-7">
              <RevealBlock y={12} duration={0.6}>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 block">
                  07 / ESTABLISH CONNECTION
                </span>
              </RevealBlock>

              <div className="font-space-display font-bold uppercase text-white tracking-tight leading-[0.94]">
                {["LET'S CREATE", 'SOMETHING', 'MEANINGFUL.'].map((line, i) => (
                  <RevealBlock
                    key={line}
                    delay={0.08 + i * 0.1}
                    y={24}
                    duration={0.8}
                    className="block"
                  >
                    <span
                      className={`block ${
                        i === 2
                          ? 'bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent'
                          : ''
                      }`}
                      style={{ fontSize: 'clamp(2.2rem, 4.9vw, 4.35rem)' }}
                    >
                      {line}
                    </span>
                  </RevealBlock>
                ))}
              </div>

              <RevealBlock delay={0.22} y={16}>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-md">
                  Have an idea, an opportunity, a project or simply something worth discussing? Send me a message. I&apos;d be glad to hear from you.
                </p>
              </RevealBlock>

              {/* Interactive Contact Rows with Hairline Separators */}
              <RevealBlock delay={0.3} y={16} className="pt-2 space-y-0">
                {[
                  {
                    label: 'Email',
                    value: PROFILE.email,
                    href: `mailto:${PROFILE.email}`,
                    icon: Mail,
                    external: false
                  },
                  {
                    label: 'LinkedIn',
                    value: 'Sanskar Patil',
                    href: PROFILE.linkedin,
                    icon: Linkedin,
                    external: true
                  },
                  {
                    label: 'GitHub',
                    value: 'ToxApks',
                    href: PROFILE.github,
                    icon: Github,
                    external: true
                  }
                ].map((channel, idx) => {
                  const IconComp = channel.icon;
                  return (
                    <div key={channel.label} className="relative">
                      {idx === 0 && <div className="h-[1px] w-full bg-white/15" />}

                      <a
                        href={channel.href}
                        target={channel.external ? '_blank' : undefined}
                        rel={channel.external ? 'noopener noreferrer' : undefined}
                        className="group py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors hover:bg-white/[0.02] px-2 -mx-2"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="w-9 h-9 bg-white/[0.04] border border-white/10 group-hover:border-cyan-300/60 group-hover:bg-cyan-400/10 flex items-center justify-center transition-all duration-300 shrink-0">
                            <IconComp className="w-4 h-4 text-purple-300 group-hover:text-cyan-300 group-hover:scale-110 transition-all duration-300" />
                          </span>
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-cyan-300/80 transition-colors">
                              {channel.label}
                            </span>
                            <span className="block text-sm sm:text-base font-semibold text-white group-hover:text-cyan-200 transition-colors truncate">
                              {channel.value}
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                      </a>

                      <div className="h-[1px] w-full bg-white/15" />
                    </div>
                  );
                })}
              </RevealBlock>
            </div>

            {/* Right Side — Formspree Message Interface */}
            <RevealBlock
              clip={true}
              y={18}
              delay={0.15}
              duration={0.9}
              className="lg:col-span-7"
            >
              <ContactForm recipientEmail={PROFILE.email} />
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER
         ==================================================================== */}
      <footer className="relative z-10 border-t border-white/10 bg-[#030014]/90 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 lg:px-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-3">
            <span className="text-gray-200 font-semibold">{PROFILE.fullName}</span>
          </div>
          <p className="text-center">{PROFILE.footerNote}</p>
          <div className="flex items-center gap-5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          WIDE SINGLE-SCROLL CASE-STUDY PROJECT PRESENTATION MODAL
         ==================================================================== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#030014]/92 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full h-full sm:w-[90vw] sm:max-w-[1320px] sm:h-[90vh] bg-[#0B041E] border-0 sm:border sm:border-white/20 shadow-2xl overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 px-5 sm:px-8 py-4 bg-[#030014]/95 backdrop-blur-md border-b border-white/15 flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                  PROJECT #{selectedProject.projectNumber}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs uppercase tracking-[0.14em] text-purple-200 font-semibold">
                  {selectedProject.categoryLabel}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-8 lg:p-10 space-y-8">
              <div className="w-full aspect-[16/9] max-h-[480px] bg-[#040112] border border-white/15 overflow-hidden">
                <ProjectCoverMedia project={selectedProject} featured={true} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-white/15">
                <div className="lg:col-span-8 space-y-3">
                  <h3 className="font-space-display font-bold text-3xl sm:text-5xl text-white leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                    {selectedProject.shortIntro}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                  {selectedProject.repoUrl && (
                    <a
                      href={selectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#030014] hover:bg-cyan-200 text-xs font-bold uppercase tracking-[0.16em] w-full sm:w-auto"
                    >
                      <Github className="w-4 h-4" /> View GitHub Repository
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cyan-400 text-[#030014] text-xs font-bold uppercase tracking-[0.16em] w-full sm:w-auto"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-[#030014] border border-white/10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-purple-300 block">
                    Problem Addressed
                  </span>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                    {selectedProject.problemStatement}
                  </p>
                </div>
                <div className="p-6 bg-[#030014] border border-white/10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 block">
                    Proposed Solution
                  </span>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                    {selectedProject.proposedSolution}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                <div className="lg:col-span-7 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300 block">
                    Main Verified Features
                  </span>
                  <ul className="space-y-2.5">
                    {(selectedProject.mainFeatures || []).map((f, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm sm:text-base text-gray-200"
                      >
                        <span className="text-cyan-300 font-bold">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 space-y-6 p-6 bg-[#030014]/80 border border-white/10">
                  <div>
                    <span className="uppercase tracking-[0.16em] text-gray-400 text-[11px] block mb-1.5">
                      Personal Contribution
                    </span>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {selectedProject.personalContribution}
                    </p>
                  </div>

                  {selectedProject.techStack && selectedProject.techStack.length > 0 && (
                    <div>
                      <span className="uppercase tracking-[0.16em] text-gray-400 text-[11px] block mb-2">
                        Verified Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0B041E] border border-white/15 text-xs text-white"
                          >
                            <SkillBrandVisual name={tech} size="md" />
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          ZOOMABLE FULL CERTIFICATE & PDF DOCUMENT VIEWER
         ==================================================================== */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 bg-[#030014]/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
          onClick={() => {
            setSelectedCertificate(null);
            setCertZoom(1);
          }}
        >
          <div
            className="w-full max-w-5xl bg-[#0B041E] border border-white/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-4 bg-[#030014] border-b border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300 block">
                  {selectedCertificate.credentialType} • {selectedCertificate.dateLabel}
                </span>
                <h4 className="font-space-display font-bold text-base sm:text-lg text-white">
                  {selectedCertificate.title} — {selectedCertificate.issuer}
                </h4>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedCertificate.assetType === 'image' && (
                  <>
                    <button
                      onClick={() => setCertZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                      className="p-2 bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 cursor-pointer"
                      title="Zoom Out"
                      aria-label="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-gray-300 px-1.5">
                      {Math.round(certZoom * 100)}%
                    </span>
                    <button
                      onClick={() => setCertZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
                      className="p-2 bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 cursor-pointer"
                      title="Zoom In"
                      aria-label="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCertZoom(1)}
                      className="p-2 bg-white/5 hover:bg-white/15 text-gray-200 border border-white/10 cursor-pointer"
                      title="Reset Zoom"
                      aria-label="Reset Zoom"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </>
                )}
                <a
                  href={selectedCertificate.assetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white text-[#030014] hover:bg-cyan-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                >
                  Open Original <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => {
                    setSelectedCertificate(null);
                    setCertZoom(1);
                  }}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
                  aria-label="Close Certificate Viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#040112] flex items-center justify-center">
              <img
                src={selectedCertificate.assetUrl}
                alt={`${selectedCertificate.title} — ${selectedCertificate.issuer}`}
                style={{
                  transform: `scale(${certZoom})`,
                  transformOrigin: 'center center'
                }}
                className="max-w-full max-h-[74vh] object-contain transition-transform duration-200"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. PREMIUM INTERACTIVE FORMSPREE CONTACT INTERFACE
// ============================================================================
const MESSAGE_SOFT_LIMIT = 1200;

function InteractiveFloatingField({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  localError,
  formspreeField,
  formspreeErrors,
  disabled,
  icon: IconComp,
  isTextarea = false,
  index = 0
}) {
  const [focused, setFocused] = useState(false);
  const [typingPulse, setTypingPulse] = useState(false);
  const textareaRef = useRef(null);
  const pulseTimerRef = useRef(null);

  const isFloating = focused || value.length > 0;
  const fieldServerErrors =
    formspreeErrors && Array.isArray(formspreeErrors)
      ? formspreeErrors.filter((err) => err.field === formspreeField)
      : [];
  const hasAnyError = Boolean(localError || fieldServerErrors.length > 0);

  useEffect(() => {
    if (isTextarea && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      const nextHeight = Math.min(Math.max(el.scrollHeight, 132), 300);
      el.style.height = `${nextHeight}px`;
    }
  }, [value, isTextarea]);

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    };
  }, []);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setTypingPulse(true);
    if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = setTimeout(() => setTypingPulse(false), 380);
  };

  const progressRatio = isTextarea ? Math.min(value.length / MESSAGE_SOFT_LIMIT, 1) : 0;

  return (
    <RevealBlock y={14} delay={0.08 + index * 0.06} duration={0.55} className="relative group">
      <div
        className={`relative transition-colors duration-300 border-b ${
          focused
            ? 'bg-[#0F072B]/80 border-white/25 shadow-[0_8px_28px_rgba(112,66,248,0.14)]'
            : hasAnyError
            ? 'bg-rose-950/15 border-rose-400/50'
            : 'bg-[#060218]/65 hover:bg-[#0B0422]/75 border-white/15'
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
            focused ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background:
              'linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(0,216,255,0.06) 100%)'
          }}
          aria-hidden="true"
        />

        {IconComp && (
          <div
            className={`pointer-events-none absolute left-4 ${
              isTextarea ? 'top-5' : 'top-1/2 -translate-y-1/2'
            } transition-colors duration-300 ${
              focused
                ? 'text-cyan-300'
                : value.length > 0
                ? 'text-purple-300'
                : 'text-gray-500'
            }`}
          >
            <IconComp className="w-4 h-4" />
          </div>
        )}

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-11 transition-all duration-200 ease-out select-none ${
            isFloating
              ? 'top-2.5 text-[10px] font-bold uppercase tracking-[0.18em]'
              : isTextarea
              ? 'top-5 text-sm font-normal text-gray-400'
              : 'top-1/2 -translate-y-1/2 text-sm font-normal text-gray-400'
          } ${
            focused
              ? 'text-cyan-300'
              : isFloating
              ? 'text-purple-200'
              : 'text-gray-400'
          }`}
        >
          {label} *
        </label>

        {isTextarea ? (
          <textarea
            ref={textareaRef}
            id={id}
            name={name}
            required
            disabled={disabled}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-transparent pl-11 pr-4 pt-7 pb-3 text-sm sm:text-[15px] text-white leading-relaxed focus:outline-none resize-none transition-[height] duration-150 ease-out disabled:opacity-60"
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            required
            disabled={disabled}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            onChange={handleInputChange}
            className="w-full bg-transparent pl-11 pr-4 pt-6 pb-2.5 text-sm sm:text-[15px] text-white focus:outline-none disabled:opacity-60"
          />
        )}

        <div
          style={{
            transformOrigin: 'left center',
            transform: focused ? 'scaleX(1)' : 'scaleX(0)',
            opacity: focused ? 1 : 0,
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease-out'
          }}
          className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${
            typingPulse
              ? 'from-cyan-300 via-purple-300 to-cyan-300'
              : 'from-purple-400 via-cyan-300 to-purple-400'
          }`}
        />
      </div>

      {isTextarea && (
        <div className="pt-2 flex items-center justify-between gap-4 text-[11px] text-gray-400">
          <div className="flex-1 max-w-[180px] h-[2px] bg-white/10 overflow-hidden">
            <div
              style={{
                width: `${Math.round(progressRatio * 100)}%`,
                transition: 'width 0.2s ease-out'
              }}
              className={`h-full ${
                value.length > MESSAGE_SOFT_LIMIT
                  ? 'bg-amber-400'
                  : 'bg-gradient-to-r from-purple-400 to-cyan-300'
              }`}
            />
          </div>
          <span className="font-mono tabular-nums text-gray-400">
            {value.length} / {MESSAGE_SOFT_LIMIT} chars
          </span>
        </div>
      )}

      {localError && (
        <p className="text-[11px] text-rose-300 mt-1.5 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{localError}</span>
        </p>
      )}

      {fieldServerErrors.length > 0 && (
        <div className="text-[11px] text-rose-300 mt-1 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{fieldServerErrors.map((err) => err.message).join(' ')}</span>
        </div>
      )}
    </RevealBlock>
  );
}

function ContactForm({ recipientEmail }) {
  const [formKey, setFormKey] = useState(0);

  const handleResetForm = () => {
    setFormKey((prev) => prev + 1);
  };

  return (
    <ContactFormInner
      key={formKey}
      recipientEmail={recipientEmail}
      onResetForm={handleResetForm}
    />
  );
}

function ContactFormInner({ recipientEmail, onResetForm }) {
  const [state, setState] = useState({
    submitting: false,
    succeeded: false,
    errors: null
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const getValidationErrors = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = 'Full name is required.';
    }
    const emailVal = data.email.trim();
    if (!emailVal) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!data.subject.trim()) {
      errors.subject = 'Subject is required.';
    }
    if (!data.message.trim()) {
      errors.message = 'Message is required.';
    }
    return errors;
  };

  const allErrors = getValidationErrors(formData);
  const visibleError = (field) =>
    touched[field] || submitAttempted ? allErrors[field] : '';

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (state.submitting) return;

    setSubmitAttempted(true);
    if (Object.keys(allErrors).length > 0) {
      return;
    }

    setState({ submitting: true, succeeded: false, errors: null });
    try {
      const payload = new FormData(e.currentTarget);
      const response = await fetch('https://formspree.io/f/mzeelndq', {
        method: 'POST',
        body: payload,
        headers: {
          Accept: 'application/json'
        }
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setState({ submitting: false, succeeded: true, errors: null });
      } else {
        const parsedErrors =
          Array.isArray(result.errors) && result.errors.length > 0
            ? result.errors
            : [{ message: result.error || 'Submission failed. Please try again.' }];
        setState({ submitting: false, succeeded: false, errors: parsedErrors });
      }
    } catch {
      setState({
        submitting: false,
        succeeded: false,
        errors: [{ message: 'Network error while sending message. Please try again.' }]
      });
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const generalFormErrors =
    state.errors &&
    Array.isArray(state.errors) &&
    state.errors.filter((err) => !err.field);

  return (
    <div className="relative bg-[#070319]/75 backdrop-blur-xl border border-white/15 p-6 sm:p-9 lg:p-10 shadow-[0_20px_70px_rgba(3,0,20,0.85)]">
      <div
        className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-purple-500/60 via-cyan-300/80 to-purple-500/60"
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-baseline justify-between gap-2 pb-6 mb-7 border-b border-white/10">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300 block mb-1">
            DIRECT MESSAGE DELIVERY
          </span>
          <h3 className="font-space-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            SEND A MESSAGE
          </h3>
        </div>
        <span className="text-xs text-gray-400">To: {recipientEmail}</span>
      </div>

      {state.succeeded ? (
        <div
          role="status"
          aria-live="polite"
          className="py-10 sm:py-12 px-4 sm:px-6 text-center space-y-6"
        >
          <div className="w-16 h-16 mx-auto bg-cyan-400/10 border border-cyan-300/40 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
              <path
                d="M8 18.5L15 25.5L28 11.5"
                stroke="#00D8FF"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <div className="w-32 h-[1.5px] mx-auto bg-gradient-to-r from-purple-400 to-cyan-300" />

          <div className="space-y-2.5 max-w-md mx-auto">
            <h4 className="font-space-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              MESSAGE SENT SUCCESSFULLY
            </h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Thank you for reaching out. Your message has been received and I&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onResetForm}
              className="px-6 py-3 border border-white/25 hover:border-cyan-300 text-xs font-bold uppercase tracking-[0.18em] text-white hover:text-cyan-200 transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onFormSubmit} className="space-y-6" noValidate>
          {state.errors && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-4 bg-rose-500/10 border border-rose-400/50 text-xs text-gray-100 flex items-start gap-3 leading-relaxed"
            >
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-[0.16em] text-rose-300">
                  MESSAGE COULD NOT BE SENT
                </p>
                <p className="text-gray-200">
                  {generalFormErrors && generalFormErrors.length > 0
                    ? generalFormErrors.map((err) => err.message).join(' ')
                    : 'Please check the highlighted fields below and try submitting again.'}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InteractiveFloatingField
              id="name"
              name="name"
              type="text"
              label="Full Name"
              icon={User}
              index={0}
              disabled={state.submitting}
              value={formData.name}
              onChange={(val) => handleFieldChange('name', val)}
              onBlur={() => handleFieldBlur('name')}
              localError={visibleError('name')}
              formspreeField="name"
              formspreeErrors={state.errors}
            />

            <InteractiveFloatingField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              icon={AtSign}
              index={1}
              disabled={state.submitting}
              value={formData.email}
              onChange={(val) => handleFieldChange('email', val)}
              onBlur={() => handleFieldBlur('email')}
              localError={visibleError('email')}
              formspreeField="email"
              formspreeErrors={state.errors}
            />
          </div>

          <InteractiveFloatingField
            id="subject"
            name="subject"
            type="text"
            label="Subject"
            icon={Tag}
            index={2}
            disabled={state.submitting}
            value={formData.subject}
            onChange={(val) => handleFieldChange('subject', val)}
            onBlur={() => handleFieldBlur('subject')}
            localError={visibleError('subject')}
            formspreeField="subject"
            formspreeErrors={state.errors}
          />

          <InteractiveFloatingField
            id="message"
            name="message"
            label="Message"
            icon={MessageSquare}
            isTextarea={true}
            index={3}
            disabled={state.submitting}
            value={formData.message}
            onChange={(val) => handleFieldChange('message', val)}
            onBlur={() => handleFieldBlur('message')}
            localError={visibleError('message')}
            formspreeField="message"
            formspreeErrors={state.errors}
          />

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="submit"
              disabled={state.submitting}
              className="group relative overflow-hidden px-8 py-4 bg-white text-[#030014] hover:bg-cyan-200 hover:scale-[1.015] active:scale-[0.985] disabled:bg-white/60 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2.5 transition-all cursor-pointer min-w-[215px]"
            >
              {state.submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#030014]" />
                  <span>SENDING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND MESSAGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>

            <span className="text-[11px] text-gray-400">
              Replies are sent directly to your email address.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
export { App };