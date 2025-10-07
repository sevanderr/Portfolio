import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const projects = [
    {
      title: 'Neural Dashboard',
      category: 'Web Application',
      description: 'An AI-powered analytics platform with real-time data visualization and predictive insights.',
      tech: ['React', 'TypeScript', 'D3.js', 'Node.js'],
      color: 'from-cyan-500 to-blue-500',
      accentColor: 'cyan',
    },
    {
      title: 'Quantum Design System',
      category: 'Component Library',
      description: 'A comprehensive design system with 100+ components, built for scale and accessibility.',
      tech: ['React', 'Storybook', 'Tailwind', 'Figma'],
      color: 'from-blue-500 to-indigo-500',
      accentColor: 'blue',
    },
    {
      title: 'Flux Commerce',
      category: 'E-commerce Platform',
      description: 'Next-generation shopping experience with AR product visualization and seamless checkout.',
      tech: ['Next.js', 'Three.js', 'Stripe', 'PostgreSQL'],
      color: 'from-teal-500 to-cyan-500',
      accentColor: 'teal',
    },
    {
      title: 'Velocity Studio',
      category: 'Creative Tool',
      description: 'A browser-based design tool for creating interactive prototypes and animations.',
      tech: ['Vue', 'WebGL', 'Canvas API', 'Firebase'],
      color: 'from-sky-500 to-blue-500',
      accentColor: 'sky',
    },
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-cyan-400 text-xl font-mono">02</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                FEATURED WORK
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              A selection of projects that showcase my approach to design engineering.
              Each one represents a unique challenge and a creative solution.
            </p>
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`group relative border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                } ${activeProject === index ? 'scale-105' : 'hover:scale-102'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${project.color} transform origin-top transition-all duration-500 ${
                  activeProject === index ? 'scale-y-100' : 'scale-y-0'
                }`} />

                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-sm text-gray-500 tracking-widest uppercase">
                          {project.category}
                        </span>
                        <div className="h-px flex-1 bg-gray-800" />
                      </div>

                      <h3 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                        activeProject === index ? 'text-cyan-400' : 'text-white'
                      }`}>
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-lg mb-6 leading-relaxed max-w-2xl">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-3 mb-6">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-gray-800/50 border border-gray-700 text-cyan-400 text-sm tracking-wide hover:bg-gray-700/50 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 group/btn">
                          <span className="tracking-wider text-sm">VIEW PROJECT</span>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white transition-all duration-300">
                          <Github className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="relative w-full md:w-64 h-48 md:h-64 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 overflow-hidden group-hover:border-cyan-400/50 transition-colors duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`text-6xl font-bold opacity-10 bg-clip-text text-transparent bg-gradient-to-br ${project.color}`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${project.color} transform origin-left transition-all duration-500 ${
                  activeProject === index ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="group relative px-12 py-5 bg-transparent border-2 border-cyan-400 text-cyan-400 font-medium tracking-widest text-lg overflow-hidden transition-all duration-300 hover:text-black">
              <span className="relative z-10">VIEW ALL PROJECTS</span>
              <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
