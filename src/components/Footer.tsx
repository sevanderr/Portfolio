import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:hello@yourname.com', label: 'Email' },
  ];

  const quickLinks = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'About', sectionId: 'about' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  return (
    <footer className="relative border-t border-gray-800 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="text-3xl font-bold tracking-wider mb-4">
              <span className="text-cyan-400">{'<'}</span>
              <span className="text-white">DESIGN ENGINEER</span>
              <span className="text-cyan-400">{'/>'}</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Crafting exceptional digital experiences through the perfect blend of design thinking
              and engineering excellence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <div className="group-hover:scale-110 transition-transform">{link.icon}</div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wider">QUICK LINKS</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cyan-400 group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4 tracking-wider">CONTACT</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a
                  href="mailto:hello@yourname.com"
                  className="hover:text-cyan-400 transition-colors"
                >
                  hello@yourname.com
                </a>
              </li>
              <li>San Francisco, CA</li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400">Available for work</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Design Engineer. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-cyan-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 flex items-center justify-center border border-gray-800 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300 group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
    </footer>
  );
}
