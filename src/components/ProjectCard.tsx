import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveLink?: string;
  githubLink?: string;
  className?: string;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  image,
  liveLink,
  githubLink,
  className,
}: ProjectCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'group relative h-full w-full glass-card overflow-hidden',
        className
      )}
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full space-y-4"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold neon-text-blue">{title}</h3>
          <p className="text-sm text-slate-400 line-clamp-3">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium text-blue-400 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-white hover:text-purple-400 transition-colors"
            >
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
