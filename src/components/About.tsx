import { Code2, Palette, Sparkles, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  const skills = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Frontend Engineering',
      description: 'React, TypeScript, Next.js, Vue - Building scalable and performant web applications',
      color: 'cyan',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Figma, Adobe XD - Creating intuitive and beautiful user interfaces',
      color: 'blue',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Design Systems',
      description: 'Component libraries, style guides - Ensuring consistency at scale',
      color: 'teal',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Performance',
      description: 'Optimization, accessibility - Delivering exceptional user experiences',
      color: 'sky',
    },
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-cyan-400 text-xl font-mono">01</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                ABOUT ME
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              I bridge the gap between design and development, transforming creative visions
              into production-ready code. With a keen eye for aesthetics and a deep understanding
              of modern web technologies, I craft experiences that are both beautiful and functional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.title}
                className={`group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 p-8 backdrop-blur-sm transition-all duration-500 hover:border-${skill.color}-400/50 hover:shadow-2xl hover:shadow-${skill.color}-500/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className={`text-${skill.color}-400 mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  {skill.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {skill.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {skill.description}
                </p>

                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-radial from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 border border-gray-800 bg-gradient-to-br from-cyan-950/20 to-blue-950/20 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">My Approach</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every project is an opportunity to push boundaries. I believe in the power of
                  details, the importance of performance, and the impact of thoughtful design.
                  My process combines rapid prototyping with meticulous refinement to deliver
                  solutions that exceed expectations.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">50+</div>
                  <div className="text-sm text-gray-500 tracking-wider">PROJECTS</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
                  <div className="text-sm text-gray-500 tracking-wider">YEARS</div>
                </div>
                <div className="w-px bg-gray-800" />
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                  <div className="text-sm text-gray-500 tracking-wider">PASSION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
