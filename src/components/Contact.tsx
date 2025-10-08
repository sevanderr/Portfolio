import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!supabase) {
      setStatus('error');
      setErrorMessage('Contact form is temporarily unavailable. Please email hello@yourname.com directly.');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 8000);
      return;
    }

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject || null,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <span className="text-cyan-400 text-xl font-mono">04</span>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400 to-transparent" />
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                GET IN TOUCH
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
              Have a project in mind or just want to chat? I'm always open to discussing new
              opportunities, creative ideas, or potential collaborations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: 'Email',
                    value: 'hello@yourname.com',
                    link: 'mailto:hello@yourname.com',
                  },
                  {
                    icon: <MessageSquare className="w-6 h-6" />,
                    title: 'Location',
                    value: 'San Francisco, CA',
                    link: null,
                  },
                  {
                    icon: <User className="w-6 h-6" />,
                    title: 'Availability',
                    value: 'Open to opportunities',
                    link: null,
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className={`group flex items-start gap-4 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="text-cyan-400 mt-1 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1 tracking-wider uppercase">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-lg text-white hover:text-cyan-400 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-gradient-to-br from-cyan-950/20 to-blue-950/20 border border-cyan-400/30">
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Let's Build Something</h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  I'm passionate about creating exceptional digital experiences. Whether you're a
                  startup looking to build your MVP or an established company seeking to revamp
                  your platform, I'd love to hear about your project.
                </p>
                <div className="flex items-center gap-2 text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm">Available for select projects</span>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                >
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2 tracking-wider">
                    NAME *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-900/50 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                >
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2 tracking-wider">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-900/50 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  <label
                    htmlFor="subject"
                    className="block text-sm text-gray-400 mb-2 tracking-wider"
                  >
                    SUBJECT
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-900/50 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>

                <div
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-400 mb-2 tracking-wider"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-900/50 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-cyan-950/30 border border-cyan-400/50 text-cyan-400">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-950/30 border border-red-400/50 text-red-400">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-400 rounded-full" />
                      {errorMessage || 'Failed to send message. Please try again.'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`group w-full px-8 py-5 bg-cyan-400 text-black font-medium tracking-widest transition-all duration-300 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      SEND MESSAGE
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
