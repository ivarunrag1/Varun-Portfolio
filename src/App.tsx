import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, ChevronDown, Twitter, Linkedin, Dribbble, Mail, Phone } from 'lucide-react';

// --- Types & Data ---

type ProjectSection = {
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  highlight?: string;
  image?: string;
};

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  size: string;
  readTime: string;
  year: string;
  role: string;
  client: string;
  sections: ProjectSection[];
};

const projects: Project[] = [
  {
    id: "enquiry-module",
    title: "Redesigning the Enquiry Module",
    category: "Web Application",
    image: "from-slate-900 to-zinc-900",
    size: "md:col-span-2 md:row-span-2 h-[500px]",
    readTime: "8 min",
    year: "2025",
    role: "UX Designer",
    client: "Freightify Platform",
    sections: [
      {
        title: "The Enquiry That Led Nowhere",
        content: "The analytics dashboard showed something strange. The Enquiry module -- built to track rate searches and help users negotiate better pricing -- had decent usage numbers. People were logging searches. They were submitting requests for better rates. The data suggested the feature was working.\n\nBut then we looked at what happened after the request.\n\nNothing.\n\nThe flow just... stopped. A user would search for a rate, realize it wasn't competitive, request a better one from the help desk, get a response -- and then the trail went cold. If they actually wanted to do something with that newly negotiated rate -- create a quote, make a booking -- they had to start over. New search. New entry. As if the previous conversation never happened.\n\nIt wasn't a bug. It was how the module was designed.",
        image: "https://drive.google.com/uc?export=view&id=1KK6VKIiOd-MmjCloGwsIWDLtPc33DBVI"
      },
      {
        title: "The Module That Forgot Its Purpose",
        content: "We sat down with users expecting to hear complaints about clunky UI or slow load times. Instead, we heard confusion.\n\nMost users had no idea the Enquiry module was supposed to be part of a larger workflow. They treated it like a help desk form -- a dead-end for problems, not a bridge to action. A few power users knew there should be a way to convert searches into quotes or bookings, but even they had given up trying to figure it out.\n\nThe module wasn't failing because it was broken. It was failing because it had been orphaned from the rest of the platform.",
        items: [
          "\"Wait, I thought this was just for logging issues with rate fetching.\"",
          "\"I use it when something breaks. Like a support ticket.\"",
          "\"Oh, you can create bookings from here?\""
        ],
        highlight: "I just do the search again. It's faster than trying to remember what rate I requested two days ago."
      },
      {
        title: "Rebuilding the Map",
        content: "The original vision -- tracking a rate card's journey from search to booking -- made sense on paper. But when we started mapping it out, the complexity became obvious.\n\nA single rate search could branch into multiple paths. One enquiry might spawn three different quotes. A quote could sit idle for weeks, then suddenly convert. Another might get abandoned, revisited, modified, and merged with a different booking entirely. Tracking every possible path meant storing massive amounts of relational data across modules that weren't designed to talk to each other.\n\nWe could build it. But it would be slow, fragile, and nearly impossible to maintain.\n\nSo we stepped back and asked a different question: What does this module actually need to do?",
        highlight: "The answer wasn't \"track everything.\" It was \"don't make users start from scratch.\"",
        image: "https://www.dropbox.com/scl/fi/tp9brgihfg8a4buvvj49y/Enquiry-new-screen.png?rlkey=bkxf4h7gqdbso6ak8qllq3bm8&st=sppyhc9a&raw=1"
      },
      {
        title: "The Trade-Off",
        content: "I wanted full traceability. I wanted to see the entire lifecycle of a rate card, from first search to final booking, with every negotiation and revision logged along the way. It felt like the right thing to build -- transparent, accountable, data-rich.\n\nBut the product team and stakeholders pushed back. Not because it was a bad idea, but because it was the wrong scope.\n\nThe real problem wasn't tracking. It was continuity. Users were losing context every time they left the Enquiry module. They couldn't carry their work forward. The platform was making them repeat themselves.\n\nSo we narrowed the focus: record the search, capture the negotiation request, and -- this was the key part -- let users create a quote or booking directly from the enquiry record. No re-entering data. No searching twice. The rate they negotiated? It flows forward.",
        highlight: "We weren't building a tracking system. We were building a bridge."
      },
      {
        title: "Showing, Not Selling",
        content: "When we put the prototype in front of users, the reaction wasn't excitement. It was relief.\n\nOne user immediately started mapping out how her team would use it: search, negotiate, convert -- all in one place. Another asked if we could add a filter to see which enquiries hadn't been converted yet. The internal ops team realized they could finally measure search-to-quote conversion rates without duct-taping three different reports together.\n\nIt wasn't flashy. It was functional. And that was the point.",
        items: [
          "\"Oh. So I can just... do it from here?\"",
          "\"This makes so much more sense.\""
        ],
        image: "https://picsum.photos/seed/enquiry-after/1200/800"
      },
      {
        title: "What We Learned",
        content: "The Enquiry module failed not because users didn't understand it, but because we hadn't finished building the thing it was supposed to be part of. Somewhere along the way, the vision got fragmented. Features were shipped in isolation. Knowledge transfer didn't happen. The module became a vestigial appendage -- technically working, practically useless.\n\nRevamping it wasn't about redesigning screens. It was about reconnecting severed workflows and asking what users actually needed to complete their work, not just record it.\n\nWe didn't track every possible path a rate card could take. We made sure it could take one clear path forward. Sometimes the best design decision is knowing what not to build.",
        highlight: "The module still records searches and negotiation requests. But now it also answers the question every user was silently asking: Okay, now what?"
      }
    ]
  },
  {
    id: "booking-module",
    title: "Revamping the Booking Module",
    category: "SaaS Logistics Platform",
    image: "from-blue-900 to-slate-900",
    size: "md:col-span-2 md:row-span-2 h-[500px]",
    readTime: "5 min",
    year: "2025",
    role: "Lead Product Designer",
    client: "Logistics SaaS",
    sections: [
      {
        title: "Scene 1 — The Friction",
        content: "Creating a booking should feel like confirming a decision. Instead, it felt like filing paperwork. Booking wasn’t hard. It was unnecessarily complicated.",
        items: [
          "❌ Two different flows (Quote vs Manual)",
          "❌ UI only power users understood",
          "❌ New users dropped off before completing",
          "❌ No seamless integration to partner TMS"
        ]
      },
      {
        title: "Scene 2 — The Reveal",
        content: "When I dug into behavior data and usage, I found that multiple tabs were never used, users had to recreate data inside the partner TMS, and the booking flow was actually one step behind the real user intent.",
        highlight: "Users didn’t want to “create a booking.” They wanted to move fast and sync instantly."
      },
      {
        title: "Scene 3 — The Rewrite",
        subtitle: "Clarity + Consistency + Sync",
        content: "I redesigned the entire experience around one idea: From complex workflow → To guided momentum.",
        image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/b1f1414c62-2317079203649252-0/booking-flow.jpg",
        items: [
          "✅ 2-Step booking flow (down from multi-tab chaos)",
          "✅ Same UI whether from Quote or Manual",
          "✅ One-click sync to partner TMS",
          "✅ Reduced cognitive load dramatically"
        ]
      },
      {
        title: "Scene 4 — The Impact",
        content: "The results weren’t subtle.",
        items: [
          "📈 +40% increase in task completion efficiency",
          "⚡ +50% faster booking creation via TMS integration",
          "🎯 Reduced onboarding friction for new users",
          "🔄 Stronger system consistency across the platform"
        ]
      },
      {
        title: "✨ The Big Takeaway",
        content: "This wasn’t just a UI cleanup. It was a structural rethink of how bookings should feel.",
        highlight: "From fragmented flows → To a cohesive booking engine."
      }
    ]
  },
  {
    id: "lumina",
    title: "Lumina Brand",
    category: "Branding & Identity",
    image: "from-orange-900 to-amber-900",
    size: "md:col-span-1 h-[240px]",
    readTime: "3 min",
    year: "2024",
    role: "Brand Designer",
    client: "Lumina",
    sections: [
      {
        title: "Overview",
        content: "A complete brand identity overhaul for a lighting technology startup, focusing on warmth and innovation."
      }
    ]
  },
  {
    id: "healthtrack",
    title: "HealthTrack App",
    category: "Mobile Design",
    image: "from-emerald-900 to-teal-900",
    size: "md:col-span-1 h-[240px]",
    readTime: "4 min",
    year: "2023",
    role: "UI/UX Designer",
    client: "HealthTrack",
    sections: [
      {
        title: "Overview",
        content: "Designing a habit-forming health tracking application that simplifies daily logging through intuitive gestures."
      }
    ]
  }
];

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot fixed pointer-events-none z-[100] hidden md:block"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />
      <div
        className={`cursor-outline fixed pointer-events-none z-[100] hidden md:block transition-all duration-150 ease-out ${
          isHovering ? 'scale-150 bg-white/10 border-transparent' : ''
        }`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
    </>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Works', href: '#works' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-black/50 backdrop-blur-md border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-display font-bold tracking-tighter text-white z-50">
          VARUN<span className="text-[var(--color-accent)]">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-[var(--color-accent)] transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border border-white/20 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-[var(--color-accent)] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[var(--color-dark)]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-glow)]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-accent)]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--color-accent)] font-mono text-sm tracking-[0.2em] uppercase mb-4"
        >
          Product Designer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-9xl font-display font-bold tracking-tighter mb-6 leading-none"
        >
          VARUN
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light"
        >
          Crafting intuitive digital experiences with a focus on SaaS, mobile, and brand systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a
            href="#works"
            className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[var(--color-accent)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            View Works
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
      </motion.div>
    </section>
  );
};

const ProjectDetailsModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-5xl h-full md:h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Hero Image */}
        <div className={`w-full h-1/3 bg-gradient-to-br ${project.image} relative shrink-0`}>
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-[#0a0a0a] to-transparent flex flex-col justify-end">
              <span className="text-[var(--color-accent)] font-mono text-xs md:text-sm uppercase tracking-widest mb-2 block">{project.category}</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-none mb-4">{project.title}</h2>
              
              <div className="flex flex-wrap gap-3">
                 <span className="px-3 py-1 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-xs text-white/80">Year: {project.year}</span>
                 <span className="px-3 py-1 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-xs text-white/80">Role: {project.role}</span>
                 <span className="px-3 py-1 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-xs text-white/80">Client: {project.client}</span>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
          <div className="max-w-3xl mx-auto space-y-16">
             {project.sections.map((section, index) => (
               <div key={index} className="space-y-6">
                 <div className="flex items-baseline gap-4 border-b border-white/10 pb-4 mb-6">
                   <span className="text-[var(--color-accent)] font-mono text-sm font-bold tracking-widest uppercase">0{index + 1}</span>
                   <h3 className="text-3xl font-display font-bold text-white tracking-tight">{section.title.replace(/Scene \d+ — |✨ /g, '')}</h3>
                 </div>
                 
                 {section.subtitle && (
                   <p className="text-white font-medium text-xl tracking-wide uppercase opacity-90">{section.subtitle}</p>
                 )}
                 
                 {section.content && (
                   <p className="text-lg text-white/70 leading-relaxed font-light max-w-2xl">
                     {section.content}
                   </p>
                 )}

                 {section.image && (
                   <div className="mt-8 rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                     <img 
                       src={section.image} 
                       alt={section.title} 
                       className="w-full h-auto object-cover"
                       referrerPolicy="no-referrer"
                     />
                   </div>
                 )}
                 
                 {section.items && (
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                     {section.items.map((item, i) => (
                       <li key={i} className="flex items-start gap-4 text-white/80 group">
                         <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[var(--color-accent)] transition-colors shrink-0" />
                         <span className="leading-relaxed">{item.replace(/^[❌✅📈⚡🎯🔄] /, '')}</span>
                       </li>
                     ))}
                   </ul>
                 )}
                 
                 {section.highlight && (
                   <div className="mt-8 p-8 bg-white/5 border border-white/10 rounded-xl relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)]" />
                     <p className="text-2xl text-white font-display font-medium leading-normal tracking-tight">
                       {section.highlight}
                     </p>
                   </div>
                 )}
               </div>
             ))}
             
             <div className="h-64 w-full bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center mt-12">
               <span className="text-white/20 font-mono text-sm uppercase tracking-widest">Project Screenshots / Mockups Placeholder</span>
             </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 ${project.size} cursor-pointer`}
    >
      {/* Image Placeholder */}
      <div className={`w-full h-full absolute inset-0 bg-gradient-to-br ${project.image} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-[var(--color-accent)] text-xs font-mono uppercase tracking-wider mb-2 block">{project.category}</span>
              <h3 className="text-3xl font-display font-bold text-white">{project.title}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4">
             <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-md">
               {project.readTime} Read
             </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="works" className="py-32 px-6 max-w-7xl mx-auto">
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex items-end justify-between"
      >
        <div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">Selected Works</h2>
          <div className="h-1 w-24 bg-[var(--color-accent)]" />
        </div>
        <a href="#" className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          View All Projects <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={project.size}
          >
            <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <motion.section 
      id="about" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-32 px-6 max-w-7xl mx-auto bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 border border-white/10 group">
             <img 
               src="https://picsum.photos/seed/varun/800/1000" 
               alt="Varun Portrait" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 bg-[var(--color-accent)]/10 mix-blend-overlay" />
          </div>
          {/* Orange Glow Card Behind */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-accent)]/20 to-transparent rounded-2xl blur-xl -z-10" />
        </div>

        <div>
          <span className="text-[var(--color-accent)] font-mono text-sm uppercase tracking-widest mb-4 block">About Me</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
            Design isn't just about how it looks, but how it <span className="text-white/40 italic">feels</span>.
          </h2>
          <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
            <p>
              I'm Varun, a Product Designer with over 4 years of experience crafting digital products that merge aesthetics with functionality.
            </p>
            <p>
              My journey started in graphic design, but I quickly fell in love with the interactive nature of product design. I specialize in building scalable design systems, intuitive mobile interfaces, and SaaS platforms that solve complex user problems.
            </p>
            <p>
              When I'm not designing, you can find me exploring brutalist architecture, curating playlists, or experimenting with 3D art.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-2">Experience</h4>
              <p className="text-white/50">4+ Years</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Projects</h4>
              <p className="text-white/50">30+ Delivered</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Focus</h4>
              <p className="text-white/50">SaaS, Mobile, Brand</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Location</h4>
              <p className="text-white/50">Remote / Worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const FAQItem: FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left hover:text-[var(--color-accent)] transition-colors group"
      >
        <span className="text-xl md:text-2xl font-display font-medium">{question}</span>
        <span className={`p-2 rounded-full border border-white/10 group-hover:border-[var(--color-accent)] transition-all ${isOpen ? 'rotate-180 bg-white/5' : ''}`}>
          <ChevronDown className="w-5 h-5" />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-white/60 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is your design process?",
      answer: "My process is deeply rooted in user-centric design thinking. I start with discovery and research to understand the problem space. Then, I move to wireframing and prototyping to test concepts. Finally, I move to high-fidelity visual design and handoff, ensuring every detail is polished."
    },
    {
      question: "Do you take freelance projects?",
      answer: "Yes, I am currently open to select freelance opportunities. I typically look for projects where I can add significant value, whether it's a complete product redesign, a new MVP, or a design system implementation."
    },
    {
      question: "What tools do you use?",
      answer: "My primary stack includes Figma for interface design and prototyping. I also use Adobe Creative Suite (Photoshop, Illustrator) for asset creation, and I'm familiar with Webflow and Framer for web building. For 3D, I dabble in Blender."
    },
    {
      question: "Can you work with development teams?",
      answer: "Absolutely. I have extensive experience working closely with engineers. I understand the constraints of CSS/HTML and React, which allows me to design feasible solutions and provide clean, organized developer handoffs."
    },
    {
      question: "What industries have you worked in?",
      answer: "I've worked across Fintech, EdTech, Healthcare, and E-commerce. I enjoy diving into new industries and understanding their specific user needs and business models."
    }
  ];

  return (
    <section className="py-32 px-6 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-[var(--color-accent)] font-mono text-sm uppercase tracking-widest mb-4 block">FAQ</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold">Common Questions</h2>
      </motion.div>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FAQItem {...faq} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="pt-32 pb-12 px-6 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-none">
              LET'S WORK <br /> <span className="text-white/20">TOGETHER</span>
            </h2>
            <p className="text-white/60 text-xl max-w-md">
              Have a project in mind? Let's create something extraordinary.
            </p>
          </div>

          <div className="flex flex-col justify-end items-start md:items-end gap-8">
            <a href="mailto:rajeevanvarun57@design.com" className="flex items-center gap-4 text-2xl hover:text-[var(--color-accent)] transition-colors group">
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              rajeevanvarun57@design.com
            </a>
            <a href="tel:+917010963989" className="flex items-center gap-4 text-2xl hover:text-[var(--color-accent)] transition-colors group">
              <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
              +91 7010963989
            </a>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            {['Home', 'About', 'Works', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors uppercase tracking-wider">
                {item}
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {[
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Dribbble, href: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Varun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-[var(--color-dark)] min-h-screen text-white selection:bg-[var(--color-accent)] selection:text-white">
      <div className="noise-overlay" />
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <div className="h-px bg-white/5 w-full max-w-7xl mx-auto" />
        <Works />
        <div className="h-px bg-white/5 w-full max-w-7xl mx-auto" />
        <About />
        <div className="h-px bg-white/5 w-full max-w-7xl mx-auto" />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
