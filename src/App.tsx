import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Typewriter } from 'react-simple-typewriter';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  ChevronRight,
  User,
  Code2,
  Briefcase,
  Award,
  Phone,
  GraduationCap,
  Twitter,
  X
} from 'lucide-react';

import { Navbar } from './components/Navbar';
import { ProjectCard } from './components/ProjectCard';
import { Globe } from './components/canvas/Globe';
import { Stars } from './components/canvas/Stars';
import { NeuralNetwork } from './components/canvas/NeuralNetwork';
import { Loading } from './components/Loading';
import { CustomCursor } from './components/CustomCursor';
import { SKILLS, PROJECTS, EXPERIENCE, ACHIEVEMENTS } from './constants';
import { cn } from './lib/utils';

const Section = ({ 
  children, 
  id, 
  className, 
  title, 
  subtitle 
}: { 
  children: React.ReactNode; 
  id: string; 
  className?: string;
  title?: string;
  subtitle?: string;
}) => (
  <section id={id} className={cn('py-24 px-6 relative', className)}>
    <div className="max-w-7xl mx-auto">
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          {title && (
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}
      {children}
    </div>
  </section>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 50);
    mouseY.set((clientY / innerHeight - 0.5) * 50);
  };

 const handleDownloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume/Manan_Mishra_for_Software_Dev_Engineer_I.pdf';
  link.download = 'Manan_Mishra_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="relative min-h-screen bg-dark-bg selection:bg-purple-500/30"
      onMouseMove={handleMouseMove}
    >
      <CustomCursor />
      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>
        </Canvas>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <Globe />
            </Suspense>
          </Canvas>
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
          style={{ x: mouseX, y: mouseY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Manan Mishra
              </span>
            </h1>
            <div className="text-xl md:text-3xl font-medium text-slate-300 h-12">
              <Typewriter
                words={['Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver']}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
              >
                View Projects <ChevronRight size={20} />
              </a>
              <button
                onClick={handleDownloadResume}
                className="px-8 py-4 rounded-full glass text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                Download Resume <Download size={20} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
        >
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-slate-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" subtitle="A passionate developer building the future with code and AI.">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              🚀 I am a passionate Full Stack Web Developer and B.Tech (IT) student at Government Engineering College, Ajmer, driven to build impactful and user-friendly web applications. I enjoy transforming ideas into real-world digital solutions using modern technologies and best coding practices.
            </p>
            <p className="text-lg leading-relaxed text-slate-300 mb-6">
              💡 I specialize in JavaScript, React, Node.js, Express, and MongoDB, with hands-on experience gained through internships and projects like a Weather App 🌦️, Netflix Clone 🎬, and responsive web platforms. I also explored AI/ML by developing a Potato Disease Classification system 🤖, showcasing my ability to integrate machine learning with web technologies.
            </p>
             <p className="text-lg leading-relaxed text-slate-300">
             🔥 I love solving complex problems, writing clean and efficient code, and continuously learning new skills. With strong teamwork 🤝 and communication abilities, I aim to contribute to innovative projects and grow as a software engineer.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: User, label: 'Name', value: 'Manan Mishra' },
              { icon: Mail, label: 'Email', value: 'Mananmishra2004@gmail.com' },
              { icon: Phone, label: 'Phone', value: '9024847250' },
              { icon: GraduationCap, label: 'Education', value: 'B-Tech (IT)' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex flex-col items-center text-center"
              >
                <item.icon className="text-blue-400 mb-2" size={24} />
                <span className="text-xs text-slate-500 uppercase tracking-wider mb-1">{item.label}</span>
                <span className="text-sm font-semibold text-slate-200">{item.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Technical Skills" subtitle="My toolbox for turning ideas into reality.">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {['Languages', 'Web', 'Tools'].map((category) => (
              <div key={category} className="space-y-6">
                <h3 className="text-xl font-bold text-slate-400 border-l-4 border-blue-500 pl-4 uppercase tracking-widest text-sm">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {SKILLS.filter(s => s.category === category).map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="glass-card flex flex-col items-center gap-4 group"
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${skill.color}15` }}
                      >
                        <skill.icon size={32} style={{ color: skill.color }} />
                      </div>
                      <span className="font-semibold text-slate-300">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-400 border-l-4 border-purple-500 pl-4 uppercase tracking-widest text-sm">
                ML/AI Focus
              </h3>
              <div className="glass-card h-[400px] relative overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Suspense fallback={null}>
                      <NeuralNetwork />
                    </Suspense>
                  </Canvas>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent z-10 p-6 flex flex-col justify-end">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.filter(s => s.category === 'ML/AI').map((skill) => (
                        <span key={skill.name} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Deeply passionate about Artificial Intelligence and Machine Learning. 
                      Experienced in building Neural Networks, Computer Vision models, and data-driven solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects" subtitle="A showcase of my recent work in Web Dev and AI/ML.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Experience" subtitle="My professional journey and internships.">
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          {EXPERIENCE.map((exp, i) => (
            <div key={exp.company} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-dark-bg text-blue-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Briefcase size={18} />
              </div>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                  <time className="text-xs font-semibold text-blue-400">{exp.period}</time>
                </div>
                <div className="text-sm font-medium text-purple-400 mb-4">{exp.role}</div>
                <ul className="space-y-2">
                  {exp.description.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-400 flex gap-2">
                      <ChevronRight size={14} className="shrink-0 mt-1 text-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements Section */}
      <Section id="achievements" title="Achievements" className="bg-white/[0.02]">
        <div className="grid md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedAchievement(ach)}
              className="glass-card flex items-center gap-6 cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                <ach.icon size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">{ach.title}</h3>
                <p className="text-slate-400">{ach.issuer}</p>
              </div>
              <ExternalLink size={18} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Achievement Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-dark-bg/90 backdrop-blur-xl"
            onClick={() => setSelectedAchievement(null)}
          >
            {/* Close button in the overlay for better responsiveness */}
            <button 
              className="fixed top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-red-400 transition-colors z-[1001] shadow-2xl"
              onClick={() => setSelectedAchievement(null)}
            >
              <X size={28} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full glass-card p-2 md:p-4 flex flex-col gap-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-auto custom-scrollbar rounded-xl bg-white/5 flex items-center justify-center min-h-0">
                <img 
                  src={selectedAchievement.image} 
                  alt={selectedAchievement.title}
                  className="max-w-full max-h-full object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="text-center pb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedAchievement.title}</h3>
                <p className="text-sm md:text-base text-slate-400">{selectedAchievement.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <Section id="contact" title="Get In Touch" subtitle="Let's discuss your next project or just say hi!">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass-card p-8 space-y-6">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-blue-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Email</p>
                  <p className="font-medium">Mananmishra2004@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-purple-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">Phone</p>
                  <p className="font-medium">9024847250</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-pink-400">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">LinkedIn</p>
                  <p className="font-medium">linkedin.com/in/manan-mishra2004</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 flex flex-col justify-center items-center space-y-8"
          >
            <h3 className="text-2xl font-bold text-center">Connect with Me</h3>
            <p className="text-slate-400 text-center max-w-sm">
              Feel free to reach out through any of these platforms. I'm always open to new opportunities and collaborations!
            </p>
            <div className="grid grid-cols-2 gap-6 w-full max-w-xs">
              <a 
                href="https://github.com/Mananmishra2004" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:scale-110 transition-all">
                  <Github size={24} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white">GitHub</span>
              </a>
              <a 
                href="https://linkedin.com/in/manan-mishra2004" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all">
                  <Linkedin size={24} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white">LinkedIn</span>
              </a>
              <a 
                href="mailto:Mananmishra2004@gmail.com"
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all">
                  <Mail size={24} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white">Email</span>
              </a>
              <a 
                href="https://x.com/manan4816" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-sky-900/30 flex items-center justify-center text-sky-400 group-hover:text-sky-300 group-hover:scale-110 transition-all">
                  <Twitter size={24} />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-white">Twitter</span>
              </a>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Manan Mishra
          </h2>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/Mananmishra2004" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://linkedin.com/in/manan-mishra2004" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:Mananmishra2004@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Manan Mishra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
