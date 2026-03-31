import { 
  Code2, 
  Cpu, 
  Globe, 
  Layout, 
  Server, 
  Database, 
  GitBranch, 
  Terminal, 
  Layers, 
  Monitor, 
  Smartphone, 
  Zap,
  Award,
  Briefcase,
  GraduationCap,
  Brain,
  Binary,
  Workflow
} from 'lucide-react';

export const SKILLS = [
  { name: 'C', icon: Terminal, color: '#00599C', category: 'Languages' },
  { name: 'C++', icon: Terminal, color: '#00599C', category: 'Languages' },
  { name: 'Java', icon: Code2, color: '#007396', category: 'Languages' },
  { name: 'Python', icon: Cpu, color: '#3776AB', category: 'Languages' },
  { name: 'JavaScript', icon: Code2, color: '#F7DF1E', category: 'Languages' },
  { name: 'HTML', icon: Layout, color: '#E34F26', category: 'Web' },
  { name: 'CSS', icon: Layout, color: '#1572B6', category: 'Web' },
  { name: 'React', icon: Globe, color: '#61DAFB', category: 'Web' },
  { name: 'Node.js', icon: Server, color: '#339933', category: 'Web' },
  { name: 'MongoDB', icon: Database, color: '#47A248', category: 'Web' },
  { name: 'SQL', icon: Database, color: '#4479A1', category: 'Web' },
  { name: 'Git', icon: GitBranch, color: '#F05032', category: 'Tools' },
  { name: 'Linux', icon: Terminal, color: '#FCC624', category: 'Tools' },
  { name: 'TensorFlow', icon: Brain, color: '#FF6F00', category: 'ML/AI' },
  { name: 'PyTorch', icon: Zap, color: '#EE4C2C', category: 'ML/AI' },
  { name: 'Scikit-Learn', icon: Binary, color: '#F7931E', category: 'ML/AI' },
];

export const PROJECTS = [
  {
    title: 'Potato Disease Classification',
    description: 'AI/ML project using CNN (TensorFlow, Keras) for real-time potato leaf disease detection. Deployed using Firebase + Docker backend.',
    tags: ['TensorFlow', 'Keras', 'CNN', 'Firebase', 'Docker', 'Python'],
    image: 'images/screencapture-potato-plant-disease-detection-web-app-2026-03-30-18_53_58.png',
    liveLink: 'https://potato-plant-disease-detection.web.app/',
    githubLink: 'https://github.com/Mananmishra2004/potato-disease-detection-using-machine-learning',
  },
  {
    title: 'Weather App',
    description: 'Real-time weather tracking website utilizing HTML, CSS, JavaScript, and Weather API. Features a clean, responsive UI with real-time data integration.',
    tags: ['JavaScript', 'Weather API', 'HTML5', 'CSS3'],
    image: 'images/screencapture-weather-application-12feb-web-app-2026-03-30-19_08_49.png',
    liveLink: 'https://weather-application-12feb.web.app/',
    githubLink: 'https://github.com/Mananmishra2004/Climate_detection_webapp',
  },
  {
    title: 'Task Management Web Application (Full Stack - Node.js & MongoDB)',
    description: 'Developed a full-stack task management application that allows users to efficiently create, organize, and prioritize their daily tasks. The application enables users to add task titles, descriptions, and assign priority levels (Low, Medium, High) to improve productivity and task tracking.The frontend is built using EJS and Tailwind CSS, providing a responsive and user-friendly interface, while the backend is powered by Node.js, Express.js, and MongoDB for efficient data handling and storage. The system ensures smooth CRUD operations and structured task management.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS', 'REST API', 'CRUD', 'MVC'],
    image: 'images/taskapp.png',
    liveLink: 'https://task-management-ggxv.onrender.com',
    githubLink: 'https://github.com/Mananmishra2004/Task_Management-',
  },
];

export const EXPERIENCE = [
  {
    company: 'Bharat Intern',
    role: 'Full-Stack Web Developer Intern',
    period: 'Jun 2024 - Jul 2024',
    description: [
      'Developed multiple web projects utilizing HTML, CSS, and JavaScript technologies.',
      'Built a Contact Form application incorporating form validation and effective data handling.',
      'Created a Netflix Clone featuring a responsive user interface and engaging interactive elements.',
    ],
  },
  {
    company: 'Cognifyz Technologies',
    role: 'Full-Stack Web Developer Intern',
    period: 'May 2024 - Jun 2024',
    description: [
      'Designed and implemented Weather Application utilizing HTML, CSS, JavaScript, and APIs.',
      'Enhanced user experience through integration of real-time weather data and responsive design.',
      'Collaborated on full-stack development projects, applying best practices in web development.',
    ],
  },
  {
    company: 'Internsavvy',
    role: 'Full-Stack Web Developer Intern',
    period: 'Jun 2023 - Jul 2023',
    description: [
      'Developed personal portfolio website to effectively showcase projects and skills.',
      'Contributed to various web development projects using HTML, CSS, JavaScript, Node.js, and MongoDB.',
      'Applied full-stack development principles to create responsive interfaces and robust back-end services.',
    ],
  },
];

export const ACHIEVEMENTS = [
  {
    title: 'Introduction to Web Development',
    issuer: 'IBM (via Coursera)',
    icon: Award,
    image: 'images/ibm frontend2023.png',
  },
  {
    title: 'Web Designing Coordinator',
    issuer: 'GEC Ajmer (COMBAT 2K23-24)',
    icon: Layout,
    image: 'images/geca_sport_webdev2023-2024.jpg',
  },
];
