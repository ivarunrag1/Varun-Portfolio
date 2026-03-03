import { useState, useEffect, type FC } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { ArrowUpRight, Menu, X, ChevronDown, Twitter, Linkedin, Dribbble, Mail, Phone, Search, BarChart2, FileText, Package, Ship, PenTool, Layout, Cpu, Zap, Users, Briefcase, Layers, MessageSquare, Sparkles } from 'lucide-react';

// --- Types & Data ---

type ProjectSection = {
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  timelineItems?: { step: string; title: string; description: string; icon: any }[];
  highlight?: string;
  image?: string;
};

type Project = {
  id: string;
  title: string;
  category: string;
  image: string; // Keep for gradient fallback
  thumbnail?: string; // New property for image URL
  footerImage?: string; // Image to display at the bottom of the project details
  size: string;
  readTime: string;
  year: string;
  role: string;
  client: string;
  sections: ProjectSection[];
};

const projects: Project[] = [
  {
    id: "booking-module",
    title: "Revamping the Booking Module",
    category: "SaaS Logistics Platform",
    image: "from-blue-900 to-slate-900",
    thumbnail: "https://drive.google.com/thumbnail?id=1RlrgP4tJl2Cjsapbxt5erX_TwP3sMbtJ&sz=w1600",
    size: "md:col-span-3 md:row-span-2 h-[500px]",
    readTime: "5 min",
    year: "2025",
    role: "Senior Product Designer",
    client: "Freightify",
    footerImage: "https://drive.google.com/thumbnail?id=1CcW01psEJN2gnZUY-S9u4C4emgCLvZcC&sz=w1600",
    sections: [
      {
        title: "Scene 1 — The Friction",
        content: "Creating a booking should feel like confirming a decision. Instead, it felt like filing paperwork. Booking wasn’t hard. It was unnecessarily complicated.",
        items: [
          " Two different flows (Quote vs Manual)",
          " UI only power users understood",
          " New users dropped off before completing",
          "No seamless integration to partner TMS"
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
          "2-Step booking flow (down from multi-tab chaos)",
          "Same UI whether from Quote or Manual",
          "One-click sync to partner TMS",
          "Reduced cognitive load dramatically"
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
    id: "enquiry-module",
    title: "Redesigning the Enquiry Module",
    category: "Web Application",
    image: "from-slate-900 to-zinc-900",
    thumbnail: "https://drive.google.com/thumbnail?id=1xhwgqonWcL_zShg9bGukwMY58qYZ2--l&sz=w1600",
    size: "md:col-span-2 md:row-span-2 h-[500px]",
    readTime: "8 min",
    year: "2025",
    role: "Senior Product Designer",
    client: "Freightify Platform",
    footerImage: "https://drive.google.com/thumbnail?id=1-c2QdhEocqlyKUGa_oAYYpPqeVHRwUR2&sz=w1600",
    sections: [
      {
        title: "The Enquiry That Led Nowhere",
        content: "The analytics dashboard showed something strange. The Enquiry module -- built to track rate searches and help users negotiate better pricing -- had decent usage numbers. People were logging searches. They were submitting requests for better rates. The data suggested the feature was working.\n\nBut then we looked at what happened after the request.\n\nNothing.\n\nThe flow just... stopped. A user would search for a rate, realize it wasn't competitive, request a better one from the help desk, get a response -- and then the trail went cold. If they actually wanted to do something with that newly negotiated rate -- create a quote, make a booking -- they had to start over. New search. New entry. As if the previous conversation never happened.\n\nIt wasn't a bug. It was how the module was designed.",
        image: "https://drive.google.com/thumbnail?id=1Q2j2neC1vhyqhHijuhRAYiM668WaJNB1&sz=w1600"
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
        image: "https://drive.google.com/thumbnail?id=1igRMQqPBz8O9lJUF3Qa7x0lqeFYLKz0j&sz=w1600"
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
        image: "https://drive.google.com/thumbnail?id=1cAdrCCNlFMocbjb5H3TYt_Sugd2SwFnu&sz=w1600"
      },
      {
        title: "What We Learned",
        content: "The Enquiry module failed not because users didn't understand it, but because we hadn't finished building the thing it was supposed to be part of. Somewhere along the way, the vision got fragmented. Features were shipped in isolation. Knowledge transfer didn't happen. The module became a vestigial appendage -- technically working, practically useless.\n\nRevamping it wasn't about redesigning screens. It was about reconnecting severed workflows and asking what users actually needed to complete their work, not just record it.\n\nWe didn't track every possible path a rate card could take. We made sure it could take one clear path forward. Sometimes the best design decision is knowing what not to build.",
        highlight: "The module still records searches and negotiation requests. But now it also answers the question every user was silently asking: Okay, now what?"
      }
    ]
  },
  {
    id: "kaizen",
    title: "Kaizen HR Branding",
    category: "Branding & Identity",
    image: "from-blue-900 to-purple-900",
    thumbnail: "https://drive.google.com/thumbnail?id=1D7w73syv8t6GiKjZAPJiuJF_fnWZezeX&sz=w1600",
    size: "md:col-span-1 h-[240px]",
    readTime: "2 min",
    year: "2024",
    role: "Freelance Designer",
    client: "Kaizen HR",
    sections: [
      {
        title: "Concept Sketches",
        image: "https://drive.google.com/thumbnail?id=15oDhrKjBx5c3MDkLKESqSe8fPy-Eo7vR&sz=w1600"
      },
      {
        title: "Digital Drafting",
        image: "https://drive.google.com/thumbnail?id=1ZCBxb7q4mVBOnCV6OySscQnM6gpy8qFj&sz=w1600"
      },
      {
        title: "Logo Construction",
        image: "https://drive.google.com/thumbnail?id=1qzOVPROtTiO_2wj6tRrP6cqP8iNY1GAM&sz=w1600"
      },
      {
        title: "Final Logo Design",
        image: "https://drive.google.com/thumbnail?id=14kD5sVgni3Pkv0DDYt-8bIDRDR-N3jpP&sz=w1600"
      },
      {
        title: "Brand Application",
        image: "https://drive.google.com/thumbnail?id=1jVA8zrEQPrvxEmg0zsI8HoqqpS07_x9_&sz=w1600"
      }
    ]
  },
  {
    id: "shipper-mobile-app",
    title: "Shipper Mobile App",
    category: "Mobile Design",
    image: "from-emerald-900 to-teal-900",
    thumbnail: "https://drive.google.com/thumbnail?id=12VnulZRhjebMSjfGuV2eRwyKbHggDIbq&sz=w1600",
    size: "md:col-span-1 h-[240px]",
    readTime: "5 min",
    year: "2024",
    role: "Product Designer",
    client: "Freightify",
    footerImage: "https://drive.google.com/thumbnail?id=1jUvXFHPE0yQKwI5pzcpOO_pl2j5Sp_nG&sz=w1600",
    sections: [
      {
        title: "Project Overview",
        subtitle: "Empowering Shippers On The Go",
        content: "In the freight forwarding industry, shippers often need to quickly search for competitive shipping rates, review detailed charges, and submit booking requests while away from their desks. This mobile application was designed to bring the full power of rate search and booking management into a pocket-sized, intuitive interface."
      },

      {
        title: "The Problem",
        subtitle: "Complex Desktop Workflows Don't Translate to Mobile",
        content: "Existing rate search and booking systems were designed for desktop, requiring shippers to navigate complex multi-step processes with large data tables. Key pain points included:",
        items: [
          "Shippers couldn't check or compare rates while on-site at ports or warehouses",
          "Complex charge breakdowns were impossible to read on small screens",
          "Booking requests required desktop access, causing delays",
          "No visibility into booking status from mobile devices"
        ]
      },
      {
        title: "Design Goals",
        subtitle: "Mobile-First, Data-Rich, Action-Oriented",
        content: "The design needed to balance information density with mobile usability, ensuring shippers could make informed decisions quickly.",
        items: [
          "Enable full rate search with origin/destination, carrier selection, and equipment types",
          "Present complex pricing data in scannable, mobile-optimized layouts",
          "Provide one-tap booking request with clear confirmation flow",
          "Create a unified booking management view with status tracking"
        ]
      },
      {
        title: "User Flow",
        subtitle: "From Search to Booking in 5 Steps",
        timelineItems: [
          { 
            step: "01", 
            title: "Configure Search", 
            description: "Shipper sets origin, destination, service type (FCL/LCL/AIR), carrier preferences, and equipment requirements.",
            icon: Search
          },
          { 
            step: "02", 
            title: "Browse Results", 
            description: "View 24+ rate results from multiple carriers with live rates, transit times, and pricing comparison across equipment types.",
            icon: BarChart2
          },
          { 
            step: "03", 
            title: "Review Charges", 
            description: "Drill into detailed charge breakdowns—freight, origin, destination—with per-unit and total calculations.",
            icon: FileText
          },
          { 
            step: "04", 
            title: "Submit Booking", 
            description: "One-tap booking request with instant confirmation, booking ID generation, and email notification.",
            icon: Package
          },
          { 
            step: "05", 
            title: "Track & Manage", 
            description: "Monitor all bookings with status filters, view summaries, and manage shipment details from a centralized dashboard.",
            icon: Ship
          }
        ]
      }
    ]
  }
];

// --- Components ---

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Use springs for smooth movement
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });
  
  // Slightly slower spring for the outline to create a trailing effect
  const outlineX = useSpring(0, { stiffness: 250, damping: 20 });
  const outlineY = useSpring(0, { stiffness: 250, damping: 20 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      outlineX.set(e.clientX);
      outlineY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('hover-target')
      ) {
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
  }, [cursorX, cursorY, outlineX, outlineY]);

  return (
    <>
      <motion.div
        className="cursor-dot fixed pointer-events-none z-[100] hidden md:block rounded-full bg-[var(--color-accent)]"
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8
        }}
      />
      <motion.div
        className="cursor-outline fixed pointer-events-none z-[100] hidden md:block rounded-full border border-white/50 transition-colors duration-200"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
          borderColor: isHovering ? "transparent" : "rgba(255, 255, 255, 0.5)"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
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
      <div className="max-w-[1600px] mx-auto px-6 md:px-20 flex justify-between items-center">
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

const CosmicAnimation = () => {
  // Nebula clouds - soft glowing areas
  const nebulaClouds = [
    { id: 1, color: "bg-indigo-900", size: "w-[800px] h-[800px]", left: "-10%", top: "-20%", delay: 0, duration: 25 },
    { id: 2, color: "bg-purple-900", size: "w-[600px] h-[600px]", left: "70%", top: "40%", delay: 5, duration: 30 },
    { id: 3, color: "bg-blue-900", size: "w-[700px] h-[700px]", left: "20%", top: "60%", delay: 2, duration: 28 },
    { id: 4, color: "bg-slate-900", size: "w-[500px] h-[500px]", left: "50%", top: "-10%", delay: 8, duration: 35 },
  ];

  // Stars - subtle twinkling background
  const stars = Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.5 + 0.1,
    duration: Math.random() * 3 + 2,
  }));

  // Shooting stars - occasional and smooth
  const shootingStars = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 40, // Start from upper half
    delay: Math.random() * 10 + 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      {/* Deep Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#000000] opacity-90" />

      {/* Nebula Clouds */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className={`absolute rounded-full mix-blend-screen filter blur-[120px] opacity-20 ${cloud.color} ${cloud.size}`}
          style={{ left: cloud.left, top: cloud.top }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, 30, 0, -30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: star.opacity,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Shooting Stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={`shooting-${star.id}`}
          className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            x: [0, 400],
            y: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: Math.random() * 15 + 10, // Long random delay
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Soft Vignette */}
      <div className="absolute inset-0 bg-radial-gradient-to-t from-transparent via-transparent to-black/60" />
    </div>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Background Elements */}
      <CosmicAnimation />

      <div className="relative z-10 px-6 md:px-20 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left Column: Intro */}
        <div className="flex flex-col items-start text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-8 leading-[1.1]"
          >
            Hey, I’m Varun — <span className="text-[var(--color-accent)]">a Product Designer.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-lg md:text-2xl max-w-xl mb-10 font-light leading-relaxed"
          >
            Right now, I’m building SaaS products at Freightify, Chennai.
            <br className="block mt-4" />
            I design clean, easy-to-use experiences that make complex systems feel effortless.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a
              href="#works"
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[var(--color-accent)] hover:shadow-[0_0_40px_rgba(249,115,22,0.4)] transition-all duration-300 w-full sm:w-auto text-center"
            >
              View Works
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all duration-300 w-full sm:w-auto text-center"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right Column: Metrics & Tools */}
        <div className="flex flex-col gap-10 lg:pl-10">
          {/* Metrics Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="grid grid-cols-3 gap-4 border-b border-white/10 pb-10"
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2 text-[var(--color-accent)]">
                <Briefcase className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-display font-bold">2+</span>
              </div>
              <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest font-mono text-left">Years Exp.</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2 text-[var(--color-accent)]">
                <Layers className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-display font-bold">12+</span>
              </div>
              <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest font-mono text-left">Projects</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2 text-[var(--color-accent)]">
                <Users className="w-6 h-6" />
                <span className="text-3xl md:text-4xl font-display font-bold">10K+</span>
              </div>
              <p className="text-white/60 text-xs md:text-sm uppercase tracking-widest font-mono text-left">Users</p>
            </div>
          </motion.div>

          {/* Tools Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            {/* Design Tools */}
            <div className="flex flex-col gap-4">
              <span className="text-white/60 text-sm uppercase tracking-widest font-mono text-left">Design Tools</span>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#F24E1E] transition-colors">
                    <PenTool className="w-6 h-6 text-white group-hover:text-[#F24E1E]" />
                  </div>
                  <span className="text-xs text-white/70">Figma</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#0061FF] transition-colors">
                    <Layout className="w-6 h-6 text-white group-hover:text-[#0061FF]" />
                  </div>
                  <span className="text-xs text-white/70">Adobe</span>
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div className="flex flex-col gap-4">
              <span className="text-white/60 text-sm uppercase tracking-widest font-mono text-left">AI Tools</span>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#10A37F] transition-colors">
                    <MessageSquare className="w-6 h-6 text-white group-hover:text-[#10A37F]" />
                  </div>
                  <span className="text-xs text-white/70">ChatGPT</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#FF0055] transition-colors">
                    <Zap className="w-6 h-6 text-white group-hover:text-[#FF0055]" />
                  </div>
                  <span className="text-xs text-white/70">Midjourney</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#D97757] transition-colors">
                    <Cpu className="w-6 h-6 text-white group-hover:text-[#D97757]" />
                  </div>
                  <span className="text-xs text-white/70">Claude</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center group-hover:border-[#4285F4] transition-colors">
                    <Sparkles className="w-6 h-6 text-white group-hover:text-[#4285F4]" />
                  </div>
                  <span className="text-xs text-white/70">AI Studio</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full max-w-[1600px] h-full md:h-[90vh] bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl"
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
        <div className={`w-full h-[25vh] relative shrink-0 overflow-hidden`}>
           {project.thumbnail ? (
             <img 
               src={project.thumbnail} 
               alt={project.title} 
               className="absolute inset-0 w-full h-full object-cover"
               referrerPolicy="no-referrer"
             />
           ) : (
             <div className={`absolute inset-0 bg-gradient-to-br ${project.image}`} />
           )}
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent flex flex-col justify-end">
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
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="p-6 md:p-10 max-w-full mx-auto space-y-12 flex-1">
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
                   <p className="text-lg text-white/70 leading-relaxed font-light w-full text-justify">
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
                 
                 {section.timelineItems && (
                   <div className="mt-12 relative border-l-2 border-white/10 ml-6 space-y-16">
                     {section.timelineItems.map((item, i) => (
                       <div key={i} className="relative pl-12">
                         {/* Icon Bubble */}
                         <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-black shadow-lg shadow-[var(--color-accent)]/20 z-10">
                           <item.icon className="w-5 h-5" />
                         </div>
                         
                         {/* Content */}
                         <div className="space-y-2">
                           <span className="text-white/40 font-mono text-sm tracking-widest uppercase block mb-1">{item.step}</span>
                           <h4 className="text-xl font-bold text-white">{item.title}</h4>
                           <p className="text-white/70 leading-relaxed">{item.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
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
          </div>
          
          {project.footerImage && (
            <div className="w-full mt-12">
              <img 
                src={project.footerImage} 
                alt="Project Footer" 
                className="w-full h-auto object-cover block"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
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
      {project.thumbnail ? (
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="w-full h-full absolute inset-0 object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`w-full h-full absolute inset-0 bg-gradient-to-br ${project.image} opacity-80 group-hover:opacity-100 transition-opacity duration-500`} />
      )}
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-8 flex flex-col justify-end">
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
    <section id="works" className="py-32 px-6 md:px-20 max-w-[1600px] mx-auto">
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
      className="py-32 px-6 md:px-20 max-w-[1600px] mx-auto bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative z-10 border border-white/10 group">
             <img 
               src="https://drive.google.com/thumbnail?id=1RGc0FTSNW6iEOFhA9AFnkj52qyiZl0Ol&sz=w1600" 
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
              I used to navigate ships for a living. The merchant navy took me across oceans, and I genuinely loved it — but design kept pulling at me. The interest in art had always been there, and at some point the pull became too strong to ignore. So I made the switch.
            </p>
            <p>
              That was three years ago. Since then I've been designing for SaaS platforms, mobile apps, and brands, and I've found that the shift wasn't as strange as it sounds. Both worlds ask you to pay close attention, think clearly, and get things right.
            </p>
            <p>
              Travelling is still a big part of my life, and so is art — they both feed into how I see and approach design. I'm here to keep growing, and I'm always up for work that challenges me.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-2">Experience</h4>
              <p className="text-white/50">3+ Years</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Projects</h4>
              <p className="text-white/50">15+ Delivered</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">Focus</h4>
              <p className="text-white/50">SaaS,Branding, Website </p>
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
    <footer id="contact" className="pt-32 pb-12 px-6 md:px-20 bg-black border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
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
        <div className="h-px bg-white/5 w-full max-w-[1600px] mx-auto" />
        <Works />
        <div className="h-px bg-white/5 w-full max-w-[1600px] mx-auto" />
        <About />
        <div className="h-px bg-white/5 w-full max-w-[1600px] mx-auto" />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
