import  { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  Code, 
  ArrowRight, 
  ChevronRight, 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  Dribbble, 
  CheckCircle,
  Menu,
  Heart
} from 'lucide-react';

// --- Typewriter Hook ---
const useTypewriter = (phrases, typingSpeed = 150, deletingSpeed = 100, delay = 2000) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), delay);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, phrases]);

  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return `${phrases[index].substring(0, subIndex)}${blink ? "|" : " "}`;
};

// --- Intersection Observer Component ---
const RevealOnScroll = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 bg-slate-900/70 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
      <a href="#" className="text-2xl font-extrabold tracking-tighter text-white">
        ALEX<span className="text-blue-500">.</span>
      </a>
      <div className="hidden md:flex gap-8 font-medium text-slate-300">
        <a href="#home" className="hover:text-white transition-colors">Home</a>
        <a href="#about" className="hover:text-white transition-colors">About</a>
        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        <a href="#contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all">Hire Me</a>
      </div>
      <button className="md:hidden text-white"><Menu size={24} /></button>
    </div>
  </nav>
);

const Hero = () => {
  const text = useTypewriter(["experiences.", "solutions.", "interfaces.", "products."]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800/50 backdrop-blur text-blue-400 text-sm font-semibold tracking-wide border border-blue-500/20">
            OPEN FOR OPPORTUNITIES
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Building digital <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {text}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Full-stack developer specializing in building exceptional digital experiences. Currently focused on accessible, human-centered products.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform">
              View Work
            </button>
            <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-white/10 hover:bg-slate-700 transition-all">
              Download CV
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-80 h-80 lg:w-96 lg:h-96 animate-[bounce_6s_ease-in-out_infinite]">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] rotate-6 opacity-20"></div>
            <div className="absolute inset-0 bg-slate-800/50 backdrop-blur rounded-[40px] overflow-hidden border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceCard = ({ icon: Icon, title, company, period, description, delay }) => (
  <RevealOnScroll delay={delay}>
    <div className="bg-slate-800/50 backdrop-blur-lg p-8 rounded-3xl border border-white/10 group hover:border-blue-500/30 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-blue-400">{company}</p>
          </div>
        </div>
        <div className="text-slate-500 font-medium">{period}</div>
      </div>
      <p className="mt-6 text-slate-400 leading-relaxed">{description}</p>
    </div>
  </RevealOnScroll>
);

const ProjectCard = ({ title, tags, description, image, color, delay }) => (
  <RevealOnScroll delay={delay}>
    <div className="group bg-slate-800/50 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10">
      <div className="h-64 bg-slate-800 overflow-hidden relative">
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity z-10 ${color}`}></div>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-1 rounded bg-blue-500/10 text-blue-400 font-bold uppercase">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2">{description}</p>
        <button className="inline-flex items-center mt-4 text-blue-400 font-semibold text-sm hover:gap-2 transition-all">
          View Case Study <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  </RevealOnScroll>
);

export default function App() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      </div>

      <Nav />
      <Hero />

      {/* Stats */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "5+", label: "Years Experience" },
            { val: "40+", label: "Projects Completed" },
            { val: "15+", label: "Global Clients" },
            { val: "99%", label: "Happy Clients" }
          ].map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="text-center">
                <div className="text-4xl font-extrabold mb-2 text-white">{stat.val}</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional Journey</h2>
              <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
            </div>
          </RevealOnScroll>

          <div className="space-y-8">
            <ExperienceCard 
              icon={Briefcase}
              title="Senior Product Designer"
              company="TechFlow Systems • Full-time"
              period="Jan 2022 — Present"
              description="Leading the design system team for a Series B fintech startup. Reduced interface inconsistency by 40% and improved developer handoff speed significantly."
              delay={0}
            />
            <ExperienceCard 
              icon={Code}
              title="UI/UX Engineer"
              company="Creative Labs • Contract"
              period="Mar 2020 — Dec 2021"
              description="Developed responsive web applications using React and Tailwind. Collaborated with marketing teams to build high-converting landing pages for fortune 500 clients."
              delay={100}
            />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <RevealOnScroll>
              <h2 className="text-4xl font-bold mb-4">Selected Work</h2>
              <p className="text-slate-400 max-w-md">A collection of projects that define my engineering philosophy and aesthetic.</p>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <button className="px-6 py-3 bg-slate-800/50 backdrop-blur rounded-xl border border-white/10 hover:bg-white/5 transition-all inline-flex items-center">
                Browse Archive <ArrowRight size={18} className="ml-2" />
              </button>
            </RevealOnScroll>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Nova Analytics Dashboard"
              tags={["React", "Node.js"]}
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
              description="Real-time crypto tracking platform with integrated AI predictions and custom alerts."
              color="bg-blue-600"
              delay={0}
            />
            <ProjectCard 
              title="Lumina Smart Home App"
              tags={["UI Design", "Figma"]}
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
              description="Minimalist IoT interface designed for senior accessibility and high-latency environments."
              color="bg-purple-600"
              delay={100}
            />
            <ProjectCard 
              title="Echo 3D Immersive Web"
              tags={["Next.js", "Three.js"]}
              image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
              description="A high-performance 3D portfolio engine for architects and spatial designers."
              color="bg-emerald-600"
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <RevealOnScroll>
          <div className="max-w-5xl mx-auto bg-slate-800/50 backdrop-blur-2xl p-10 md:p-16 rounded-[40px] border border-blue-500/10">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold mb-6 leading-tight">Let's build something <br /><span className="text-blue-500 italic">meaningful.</span></h2>
                <p className="text-slate-400 mb-10">Currently accepting new projects. Whether you have a specific idea or just want to chat, my inbox is always open.</p>
                
                <div className="space-y-6">
                  <a href="mailto:hello@alexrivera.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="font-medium">hello@alexrivera.dev</span>
                  </a>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Linkedin size={20} />
                    </div>
                    <span className="font-medium">linkedin.com/in/alexrivera</span>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Name" className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 border border-white/5 outline-none focus:border-blue-500/50 transition-all text-white" />
                  <input type="email" placeholder="Email" className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 border border-white/5 outline-none focus:border-blue-500/50 transition-all text-white" />
                </div>
                <input type="text" placeholder="Subject" className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 border border-white/5 outline-none focus:border-blue-500/50 transition-all text-white" />
                <textarea rows="4" placeholder="Message" className="w-full px-5 py-4 rounded-2xl bg-slate-900/50 border border-white/5 outline-none focus:border-blue-500/50 transition-all text-white"></textarea>
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm flex items-center gap-1">
            © 2024 Alex Rivera. Designed with <Heart size={14} className="text-red-500/50" />
          </div>
          <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={18} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Github size={18} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Dribbble size={18} /></a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-500 z-[100] ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}>
        <CheckCircle size={20} />
        <span className="font-bold">Message sent! I'll get back to you soon.</span>
      </div>
    </div>
  );
}



