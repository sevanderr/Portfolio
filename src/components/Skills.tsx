import { useEffect, useRef, useState } from 'react';

export default function Skills() {
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

  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Vue.js', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
      ],
    },
    {
      category: 'Design',
      skills: [
        { name: 'Figma', level: 92 },
        { name: 'Adobe XD', level: 85 },
        { name: 'Prototyping', level: 90 },
        { name: 'UI Systems', level: 93 },
        { name: 'User Research', level: 80 },
      ],
    },
    {
      category: 'Development',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Git', level: 90 },
        { name: 'REST APIs', level: 88 },
        { name: 'GraphQL', level: 82 },
        { name: 'Testing', level: 85 },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Webpack/Vite', level: 87 },
        { name: 'CI/CD', level: 83 },
        { name: 'Performance', level: 90 },
        { name: 'Accessibility', level: 88 },
        { name: 'Animations', level: 92 },
      ],
    },
  ];

  return (
    <div ref={sectionRef} className="relative min-h-screen flex items-center px-6 py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-cyan-400 text-xl font-mono">03</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                SKILLS & EXPERTISE
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              A comprehensive toolkit honed through years of building production-grade applications
              and designing user-centric interfaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.category}
                className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 p-8 transition-all duration-700 hover:border-cyan-400/50 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 tracking-wide">
                  {category.category}
                </h3>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`transition-all duration-500 ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                      }`}
                      style={{
                        transitionDelay: `${categoryIndex * 100 + skillIndex * 50}ms`,
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-cyan-400 text-sm font-mono">{skill.level}%</span>
                      </div>

                      <div className="relative h-2 bg-gray-800 overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-1000 ease-out"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${categoryIndex * 100 + skillIndex * 50 + 200}ms`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { label: 'Years Experience', value: '5+' },
              { label: 'Projects Completed', value: '50+' },
              { label: 'Client Satisfaction', value: '100%' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-8 bg-gradient-to-br from-cyan-950/20 to-blue-950/20 border border-cyan-400/30 transition-all duration-700 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <div className="text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 tracking-wider uppercase text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
