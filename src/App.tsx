import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { Menu, X, Search, BarChart2, FileText, Package, Ship, Figma, Framer } from 'lucide-react';

// --- Types & Data ---

type ProjectSection = {
  title: string;
  subtitle?: string;
  content?: string;
  items?: string[];
  metrics?: { value: string; label: string; subLabel?: string }[];
  timelineItems?: { step: string; title: string; subtitle?: string; description: string; icon: React.ElementType }[];
  highlight?: string;
  image?: string;
};

type Project = {
  id: string;
  title: string;
  category: string;
  image: string; // Keep for gradient fallback
  thumbnail?: string; // New property for image URL
  thumbnailClass?: string; // Optional class for thumbnail image
  footerImage?: string; // Image to display at the bottom of the project details
  size: string;
  readTime: string;
  year: string;
  role: string;
  client: string;
  description?: string;
  tags?: string[];
  keyOutcomes?: { value: string; label: string; subLabel?: string; }[];
  sections: ProjectSection[];
};

const projects: Project[] = [
  {
    id: "booking-module",
    title: "Revamping the Booking Module",
    category: "SaaS Logistics Platform",
    image: "from-blue-900 to-slate-900",
    thumbnail: "https://drive.google.com/thumbnail?id=1RlrgP4tJl2Cjsapbxt5erX_TwP3sMbtJ&sz=w1600",
    size: "col-span-1 md:col-span-1 h-[500px]",
    readTime: "5 min",
    year: "2025",
    role: "Senior Product Designer",
    client: "Freightify",
    footerImage: "https://drive.google.com/thumbnail?id=1CcW01psEJN2gnZUY-S9u4C4emgCLvZcC&sz=w1600",
    description: "Simplified the logistics booking process by turning a fragmented manual workflow into a cohesive, 2-step guided experience.",
    tags: ["B2B", "SaaS", "Logistics", "UX Redesign"],
    keyOutcomes: [{ value: "40%↑", label: "Task completion", subLabel: "efficiency" }, { value: "50%↑", label: "Faster booking", subLabel: "via TMS" }, { value: "1-Click", label: "Seamless sync", subLabel: "& integration" }],
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
        metrics: [
          { value: "40%↑", label: "Task completion", subLabel: "efficiency" },
          { value: "50%↑", label: "Faster booking", subLabel: "via TMS integration" },
          { value: "1-Click", label: "Seamless sync", subLabel: "& integration" }
        ],
        items: [
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
    thumbnail: "https://drive.google.com/thumbnail?id=18LvEhAApsd4zfVvNEhlTTvTIT_L4YwUn&sz=w1600",
    size: "col-span-1 md:col-span-1 h-[500px]",
    readTime: "8 min",
    year: "2025",
    role: "Senior Product Designer",
    client: "Freightify Platform",
    footerImage: "https://drive.google.com/thumbnail?id=1-c2QdhEocqlyKUGa_oAYYpPqeVHRwUR2&sz=w1600",
    description: "Connected severed workflows by turning a dead-end help desk feature into an actionable bridge for rate negotiation and booking.",
    tags: ["B2B", "Web App", "Workflow", "0→1"],
    keyOutcomes: [
      { value: "~22%↓", label: "Duplicate", subLabel: "rate searches" },
      { value: "73%", label: "Adoption rate", subLabel: "among active users" },
      { value: "12", label: "User interviews", subLabel: "across 4 roles" },
      { value: "100%", label: "Search-to-quote", subLabel: "conversion trackable" }
    ],
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
        image: "https://drive.google.com/thumbnail?id=1UXdah4VBgKX3tuqiH4OwgjdIoQ4mfg5R&sz=w1600"
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
        title: "The Impact",
        content: "By bridging the gap between enquiry and booking, we turned a dead-end feature into a continuous workflow.",
        metrics: [
          { value: "~22%↓", label: "Duplicate", subLabel: "rate searches" },
          { value: "73%", label: "Adoption rate", subLabel: "among active users" },
          { value: "12", label: "User interviews", subLabel: "across 4 roles" },
          { value: "100%", label: "Search-to-quote", subLabel: "conversion trackable" }
        ]
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
    size: "col-span-1 md:col-span-1 h-[500px]",
    readTime: "2 min",
    year: "2024",
    role: "Freelance Designer",
    client: "Kaizen HR",
    description: "Developed a comprehensive brand identity and design system for Kaizen HR, emphasizing professional growth and continuous improvement.",
    tags: ["Branding", "Identity", "Visual Design"],
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
    thumbnailClass: "object-cover object-center",
    size: "col-span-1 md:col-span-1 h-[500px]",
    readTime: "5 min",
    year: "2024",
    role: "Product Designer",
    client: "Freightify",
    footerImage: "https://drive.google.com/thumbnail?id=1jUvXFHPE0yQKwI5pzcpOO_pl2j5Sp_nG&sz=w1600",
    description: "Empowered shippers on the go with a mobile-first application to quickly search for competitive rates and submit booking requests.",
    tags: ["B2B", "Mobile App", "Logistics", "0→1"],
    keyOutcomes: [{ value: "0→1", label: "Strategic", subLabel: "ownership" }, { value: "40%↑", label: "Faster booking", subLabel: "time" }, { value: "5-Step", label: "Mobile-native", subLabel: "flow" }],
    sections: [
      {
        title: "Project Overview",
        subtitle: "Designing a mobile-first rate search and booking experience for freight shippers",
        content: "Freight forwarders operate in fast-moving, high-stakes environments where access to accurate shipping rates and the ability to act on them immediately can determine whether a shipment is won or lost. This project involved designing a mobile application that translated a complex, desktop-bound workflow into a streamlined, decision-ready experience — enabling shippers to search rates, evaluate charges, and submit bookings entirely from their mobile devices.",
        metrics: [
          { value: "0→1", label: "Strategic", subLabel: "ownership" },
          { value: "40%↑", label: "Faster booking", subLabel: "time" },
          { value: "5-Step", label: "Mobile-native", subLabel: "flow" }
        ]
      },
      {
        title: "The Problem",
        subtitle: "Existing tools were built for desktops — not for how shippers actually work",
        content: "Rate search and booking systems in the freight forwarding industry were designed around desktop interfaces with large data tables and multi-step navigation. For shippers operating on-site at ports or warehouses, this created significant friction.",
        items: [
          "Unable to check or compare rates while on-site",
          "Charge breakdowns were unreadable on small screens",
          "Booking required desktop access, introducing delays",
          "No visibility into booking status from a mobile device"
        ]
      },
      {
        title: "Design Goals",
        subtitle: "Mobile-first, information-dense, and optimised for speed of decision",
        content: "The core design challenge was balancing data richness with mobile usability — ensuring shippers could access the information they needed without cognitive overload.",
        items: [
          "Full rate search across origin, destination, carrier, and equipment type",
          "Complex pricing data presented in scannable, layered layouts",
          "One-tap booking with a clear, low-friction confirmation flow",
          "Unified booking management with real-time status tracking"
        ]
      },
      {
        title: "Design Rationale",
        highlight: "Rather than simply adapting the desktop interface for smaller screens, I approached this as a context-first redesign. Mobile shippers have different cognitive loads, time pressures, and physical environments than desktop users — so the information hierarchy, interaction patterns, and visual density were rebuilt from the ground up to reflect that."
      },
      {
        title: "User Flow",
        subtitle: "A five-step flow from rate discovery to confirmed booking",
        content: "The user flow was structured to mirror the shipper's natural decision-making process — moving from broad exploration to a specific, committed action. Each step reduces ambiguity and builds confidence toward booking.",
        timelineItems: [
          { 
            step: "01", 
            title: "Configure Search",
            subtitle: "Define the shipment parameters",
            description: "The shipper sets origin, destination, service type (FCL, LCL, or AIR), carrier preferences, and equipment requirements. This input layer was designed to be fast to complete while collecting all variables needed to surface accurate, relevant results.",
            icon: Search
          },
          { 
            step: "02", 
            title: "Browse Results", 
            subtitle: "Evaluate carrier rates at a glance",
            description: "24+ live carrier rates are presented with transit times and equipment pricing in a scannable list format. The layout was optimised to support quick comparison without requiring horizontal scrolling or table navigation.",
            icon: BarChart2
          },
          { 
            step: "03", 
            title: "Review Charges", 
            subtitle: "Drill into itemised cost breakdowns",
            description: "Shippers can expand any rate to view a full charge breakdown — freight, origin, and destination costs — with per-unit and total calculations. Transparency at this stage reduces back-and-forth with operations teams and supports faster sign-off.",
            icon: FileText
          },
          { 
            step: "04", 
            title: "Submit Booking", 
            subtitle: "Confirm and book in a single action",
            description: "A one-tap booking request triggers an instant confirmation screen with a generated booking ID and email notification. The confirmation flow was designed to be irreversible yet reassuring — reducing drop-off caused by uncertainty at the final step.",
            icon: Package
          },
          { 
            step: "05", 
            title: "Track & Manage", 
            subtitle: "Monitor all bookings from a centralised dashboard",
            description: "A unified management view surfaces booking status, shipment summaries, and filtering by status — giving shippers ongoing visibility without needing to contact operations. This closes the loop on the end-to-end mobile experience.",
            icon: Ship
          }
        ]
      }
    ]
  }
];

const faqs = [
  {
    question: "What is your design process?",
    answer: "I start with understanding the problem — talking to stakeholders, reviewing existing data, and identifying what's actually broken before touching any design tool. From there I move into structure: flows, wireframes, and information architecture. Once the logic is solid, I refine the visual layer and prototype for testing. Every decision ties back to user needs and business goals. No decoration for decoration's sake."
  },
  {
    question: "Do you take freelance projects?",
    answer: "Selectively. I take on projects where I can add real value — typically early-stage products, redesigns with clear scope, or teams that need a senior design perspective without a full-time hire. If the problem is interesting and the collaboration looks right, let's talk."
  },
  {
    question: "How do you use AI in your design process?",
    answer: "As a thinking tool, not a shortcut. I use AI early in the process — to pressure-test ideas, explore directions quickly, and shape the narrative around a design through better copy and content framing. It speeds up the messy front-end work so I can spend more time on decisions that actually require design judgment."
  },
  {
    question: "Can you work with development teams?",
    answer: "Yes, and I prefer it. Good design falls apart without a solid handoff. I work closely with developers from early on — using their constraints to sharpen decisions, not fight them. I deliver production-ready specs, stay available during build, and QA the final output."
  },
  {
    question: "What industries have you worked in?",
    answer: "Primarily tech — SaaS, consumer apps, and B2B products. I've also worked across fintech, e-commerce, and healthcare-adjacent products. The through-line is always complex systems that need to feel simple to the end user."
  }
];

// --- Components ---

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useSpring(0, { stiffness: 800, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 35 });
  const outlineX = useSpring(0, { stiffness: 200, damping: 20 });
  const outlineY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
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
        className="fixed pointer-events-none z-[9999] hidden md:block rounded-full bg-[var(--color-ember)]"
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 12,
          height: 12,
        }}
        animate={{ scale: isHovering ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block rounded-full border-[1.5px] border-[var(--color-ember)] mix-blend-multiply opacity-50"
        style={{
          x: outlineX,
          y: outlineY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          opacity: isHovering ? 1 : 0.5
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Works', href: '#works' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 mix-blend-multiply pointer-events-none">
      <a href="#" className="font-sans font-extrabold text-xl tracking-tight text-[var(--color-ink)] pointer-events-auto hover-target">
        VARUN<span className="text-[var(--color-ember)]">.</span>
      </a>

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-10 pointer-events-auto">
        {navLinks.map((link) => (
          <li key={link.name}>
            <a href={link.href} className="font-mono text-sm tracking-[0.12em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ember)] hover-target transition-colors">
              {link.name}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://drive.google.com/uc?export=download&id=1NYNGvvaH1xLprt30l1Q9eDL0ei8ZMXLE"
            className="font-mono text-sm tracking-[0.1em] uppercase bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 hover:bg-[var(--color-ember)] hover:text-white transition-colors hover-target"
          >
            Resume ↓
          </a>
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-[var(--color-ink)] z-50 pointer-events-auto"
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
            className="fixed inset-0 bg-[var(--color-paper)] z-40 flex flex-col items-center justify-center gap-8 md:hidden pointer-events-auto mix-blend-normal"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-4xl text-[var(--color-ink)] hover:text-[var(--color-ember)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://drive.google.com/uc?export=download&id=1NYNGvvaH1xLprt30l1Q9eDL0ei8ZMXLE"
              className="font-mono text-sm tracking-widest uppercase bg-[var(--color-ink)] text-[var(--color-paper)] px-8 py-3 mt-4"
            >
              Resume ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-end pt-32 pb-20 px-6 md:px-12 relative md:border-r border-b md:border-b-0 border-[var(--color-border)]">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.1 }}
           className="font-mono text-sm tracking-[0.15em] uppercase text-[var(--color-ember)] mb-8 flex items-center gap-2.5"
        >
           <span className="w-8 h-[1px] bg-[var(--color-ember)]" />
           Senior Product Designer — Chennai, IN
        </motion.div>
        <motion.h1
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.25 }}
           className="font-display text-[4rem] sm:text-[6vw] md:text-[7.5rem] leading-[0.95] tracking-[-0.02em] mb-8 text-[var(--color-ink)]"
        >
           Hey,<br />I'm <em className="text-[var(--color-ember)] italic">Varun</em>
        </motion.h1>
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.4 }}
           className="font-mono text-base leading-[1.8] text-[var(--color-muted)] max-w-[380px] border-l-2 border-[var(--color-ember)] pl-5 mb-12"
        >
           Building SaaS products at Freightify. I design clean, easy-to-use experiences that make complex systems feel effortless.
        </motion.div>
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.55 }}
           className="flex flex-wrap gap-4 items-center"
        >
           <a href="#works" className="bg-[var(--color-ember)] text-white font-mono text-sm tracking-[0.1em] uppercase px-8 py-4 hover:bg-[var(--color-ink)] hover:-translate-y-0.5 transition-all hover-target inline-block">
             View Works
           </a>
           <a href="#contact" className="text-[var(--color-ink)] font-mono text-sm tracking-[0.1em] uppercase px-8 py-4 border border-[var(--color-border)] hover:border-[var(--color-ember)] hover:text-[var(--color-ember)] hover:-translate-y-0.5 transition-all hover-target inline-block">
             Get in Touch
           </a>
        </motion.div>
      </div>

      {/* Right */}
      <div className="flex flex-col justify-between pt-12 md:pt-32 pb-20 px-6 md:px-12 bg-[var(--color-paper2)]">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.25 }}
        >
           <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-muted)] mb-6">Experience</div>
           <div className="flex flex-col gap-0 border-t border-[var(--color-border)]">
             {[
               { role: "Senior Product Designer", co: "Freightify", date: "Jul 2025 — Present" },
               { role: "Junior Product Designer", co: "Freightify", date: "Jul 2024 — Jul 2025" },
               { role: "Product Design Intern", co: "Freightify", date: "Apr 2024 — Jul 2024" },
               { role: "Freelancer — Visual & UX/UI", co: "Self-employed", date: "Oct 2023 — Apr 2024" },
             ].map((exp, i) => (
               <div key={i} className="grid grid-cols-[1fr_auto] gap-4 py-[1.1rem] border-b border-[var(--color-border)] group items-start hover:bg-black/5 transition-colors hover-target">
                 <div>
                   <div className="font-sans text-base font-semibold tracking-[-0.01em] group-hover:text-[var(--color-ember)] transition-colors">{exp.role}</div>
                   <div className="font-mono text-sm text-[var(--color-muted)] mt-[2px]">{exp.co}</div>
                 </div>
                 <div className="font-mono text-[13px] text-[var(--color-muted)] text-right whitespace-nowrap">{exp.date}</div>
               </div>
             ))}
           </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.7, delay: 0.25 }}
           className="mt-12"
        >
           <div className="grid grid-cols-3 border border-[var(--color-border)]">
             <div className="p-4 md:p-5 border-r border-[var(--color-border)]">
               <div className="font-display text-3xl md:text-[2.2rem] text-[var(--color-ember)] leading-none mb-1">3+</div>
               <div className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Years exp.</div>
             </div>
             <div className="p-4 md:p-5 border-r border-[var(--color-border)]">
               <div className="font-display text-3xl md:text-[2.2rem] text-[var(--color-ember)] leading-none mb-1">12+</div>
               <div className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Projects</div>
             </div>
             <div className="p-4 md:p-5">
               <div className="font-display text-3xl md:text-[2.2rem] text-[var(--color-ember)] leading-none mb-1">10K+</div>
               <div className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Users</div>
             </div>
           </div>

           <div className="mt-10">
             <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-muted)] mb-3">Tools</div>
             <div className="flex flex-wrap gap-2">
               {['Figma', 'Adobe', 'ChatGPT', 'Midjourney', 'Claude', 'AI Studio', 'Jira', 'Mixpanel', 'Notion'].map((tool) => (
                 <span key={tool} className="font-mono text-[13px] tracking-[0.08em] uppercase px-[12px] py-[5px] border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-ember)] hover:text-[var(--color-ember)] transition-colors hover-target inline-block bg-transparent">
                   {tool}
                 </span>
               ))}
             </div>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="overflow-hidden bg-[var(--color-ink)] py-4 whitespace-nowrap border-y border-[var(--color-border)] flex items-center">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="inline-block"
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-flex items-center">
             {['Product Design', 'SaaS Platforms', 'UX Research', 'Design Systems', 'Freightify', 'Logistics', 'Mobile Apps', 'Branding'].map((text, idx) => (
               <span key={idx} className="inline-flex items-center mx-[2rem]">
                 <span className="font-mono text-sm tracking-[0.15em] uppercase text-[var(--color-paper)] opacity-50 mr-[2rem]">{text}</span>
                 <span className="text-[var(--color-ember)]">✦</span>
               </span>
             ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Works = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
  return (
    <section id="works" className="py-28 px-6 md:px-12 max-w-[1920px] mx-auto">
      <motion.div 
         initial={{ opacity: 0, y: 24 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7 }}
         className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[var(--color-border)] pb-8 gap-4"
      >
         <div>
            <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-ember)] mb-2">Selected Works</div>
            <h2 className="font-display text-[2.5rem] md:text-[4.5rem] leading-none tracking-[-0.02em]">Case Studies</h2>
         </div>
         <a href="#" className="font-mono text-sm tracking-[0.12em] uppercase text-[var(--color-muted)] hover:text-[var(--color-ember)] group flex items-center gap-2 transition-colors hover-target pb-2">
            View all projects <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
         </a>
      </motion.div>

      <motion.div 
         initial={{ opacity: 0, y: 24 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7, delay: 0.1 }}
         className="flex flex-col gap-10"
      >
         {projects.map((project, index) => {
            let patternClass = "";
            if (project.id === "booking-module") patternClass = "bg-booking-pattern ";
            
              return (
                <motion.div 
                  layoutId={`project-${project.id}`}
                  key={index} 
                  className="group flex flex-col lg:flex-row bg-[var(--color-paper)] rounded-[2rem] overflow-hidden border border-[var(--color-border)] cursor-pointer hover-target transition-colors hover:shadow-lg" 
                  onClick={() => onSelectProject(project)}
                >
                  {/* Left: Image Container */}
                  <div className="w-full lg:w-[45%] p-4 md:p-5 bg-[#FaF8FD] shrink-0 flex items-stretch"> 
                     <div className={"relative w-full h-full min-h-[250px] lg:min-h-[320px] rounded-[1.25rem] overflow-hidden grayscale-[5%] group-hover:grayscale-0 transition-all duration-500 " + patternClass}>
                       {project.thumbnail ? (
                         <img src={project.thumbnail} alt={project.title} className={"absolute inset-0 w-full h-full " + (project.thumbnailClass || 'object-cover object-center')} referrerPolicy="no-referrer" />
                       ) : (
                         <div className={"absolute inset-0 w-full h-full bg-gradient-to-br " + project.image} />
                       )}
                     </div>
                  </div>

                  {/* Right: Content */}
                  <div className="w-full lg:w-[55%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                     <h3 className="font-display text-[2rem] md:text-[2.2rem] font-bold text-[var(--color-ink)] leading-[1.1] mb-3">
                       {project.title.replace(/\\n/g, ' ')}
                     </h3>
                     <p className="font-sans text-base text-[#4a4a4a] mb-5 leading-[1.5]">
                       {project.description || "A comprehensive case study showcasing design problem-solving and systematic approach to complex user experiences."}
                     </p>
                     
                     <div className="flex flex-wrap gap-2 mb-6">
                        {(project.tags || [project.category, project.year]).map((tag, i) => (
                           <span key={i} className="px-4 py-1.5 rounded-full border border-[var(--color-border)] text-[0.8rem] font-sans text-[#4a4a4a]">
                              {tag}
                           </span>
                        ))}
                     </div>

                     {project.keyOutcomes && project.keyOutcomes.length > 0 && (
                       <div>
                         <h4 className="font-sans text-base text-[#6b6b6b] font-medium mb-3">Key outcomes</h4>
                         <div className="flex flex-wrap gap-3">
                           {project.keyOutcomes.map((outcome, i) => (
                             <div key={i} className="flex-1 min-w-[120px] px-5 py-4 rounded-xl border border-[var(--color-border)] bg-transparent">
                               <div className="font-sans text-[1.5rem] font-bold text-[var(--color-ink)] mb-1 leading-none">{outcome.value}</div>
                               <div className="font-sans text-xs text-[#4a4a4a] mt-1.5 leading-[1.3]">
                                 {outcome.label} <br/> {outcome.subLabel}
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                  </div>
                </motion.div>
            );
         })}
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh] border-t border-[var(--color-border)]">
      <div className="bg-[var(--color-ink)] py-24 px-8 md:px-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute -bottom-8 -right-4 font-display text-[9rem] md:text-[15rem] leading-none text-white/[0.03] tracking-tighter pointer-events-none select-none">VARUN</div>
        
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.7 }}
        >
           <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-ember)] mb-8">About Me</div>
           <h2 className="font-display text-[2.5rem] lg:text-[3.5rem] leading-[1.1] text-[var(--color-paper)] mb-8">
             Design isn't just<br />how it looks,<br />but how it <em className="italic text-[var(--color-ember)]">feels.</em>
           </h2>
           <div className="font-mono text-base leading-[1.9] text-[rgba(245,240,232,0.55)] max-w-[420px] space-y-4 mb-12">
             <p>I used to navigate ships for a living. The merchant navy took me across oceans, and I loved it — but design kept pulling at me. The interest in art had always been there, and at some point the pull became too strong to ignore. So I made the switch.</p>
             <p>That was three years ago. Since then I've been designing for SaaS platforms, mobile apps, and brands — and I've found that both worlds ask you to pay close attention, think clearly, and get things right.</p>
           </div>
           
           <div className="grid grid-cols-2 border border-white/10 mb-12 max-w-[500px]">
             {[
               { label: 'Experience', value: '3+ Years' },
               { label: 'Projects', value: '15+ Delivered' },
               { 
                 label: 'Tools', 
                 value: (
                   <div className="flex gap-3 items-center mt-1">
                     <Figma className="w-5 h-5 text-white hover:text-[#0ACF83] transition-colors" />
                     <div className="bg-[#330000] text-[#FF9A00] font-sans font-bold w-5 h-5 flex items-center justify-center rounded-[3px] text-[9px] border border-[#FF9A00]/30 hover:border-[#FF9A00] transition-colors">Ai</div>
                     <div className="bg-[#00005C] text-[#9999FF] font-sans font-bold w-5 h-5 flex items-center justify-center rounded-[3px] text-[9px] border border-[#9999FF]/30 hover:border-[#9999FF] transition-colors">Ae</div>
                     <Framer className="w-5 h-5 text-white hover:text-[#0055FF] transition-colors" />
                   </div>
                 )
               },
               { label: 'Location', value: 'Remote / India' },
             ].map((fact, i) => (
               <div key={i} className={`p-6 border-white/10 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b' : ''}`}>
                 <div className="font-mono text-xs tracking-[0.18em] uppercase text-[rgba(245,240,232,0.4)] mb-2">{fact.label}</div>
                 <div className="font-sans text-lg font-semibold text-[var(--color-paper)]">{fact.value}</div>
               </div>
             ))}
           </div>
           
           <div className="border-l-[3px] border-[var(--color-ember)] p-6 bg-white/5 shrink-0 max-w-[500px]">
             <p className="font-display italic text-[1.2rem] leading-[1.5] text-[var(--color-paper)]">
               "Travelling is still a big part of my life, and so is art — they both feed into how I see and approach design."
             </p>
           </div>
        </motion.div>
      </div>

      <div className="bg-[var(--color-paper2)] relative overflow-hidden h-[60vh] md:h-auto">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="https://drive.google.com/thumbnail?id=1trdva4NArRtmBllFDkfJ5fRydnVsuzF5&sz=w1600" 
          alt="Varun" 
          className="absolute inset-0 w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06] flex flex-col hover-target cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-start gap-4 py-5 md:py-6">
        <div className="font-mono text-[13px] text-white/20 mt-[3px] shrink-0 group-hover:text-[var(--color-ember)] transition-colors">{isOpen ? '▼' : '▶'}</div>
        <div className="flex-1">
          <h3 className="font-sans text-base font-semibold text-white/35 group-hover:text-[var(--color-paper)] transition-colors data-[open=true]:text-[var(--color-paper)]" data-open={isOpen}>{question}</h3>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="font-mono text-base leading-[1.9] text-[rgba(245,240,232,0.5)] mt-4 max-w-3xl pb-2 whitespace-pre-wrap">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="bg-[var(--color-ink)] px-6 md:px-12 py-28 border-t border-white/[0.08]">
      <div className="max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/[0.08] pb-8 gap-4"
        >
          <div>
            <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-ember)] mb-2">Common Questions</div>
            <h2 className="font-display text-[2.5rem] md:text-[4.5rem] leading-none tracking-[-0.02em] text-[var(--color-paper)]">FAQ</h2>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.7, delay: 0.1 }}
        >
           {faqs.map((faq, index) => (
             <FAQItem key={index} question={faq.question} answer={faq.answer} />
           ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 py-28 px-6 md:px-12 border-t border-[var(--color-border)] max-w-[1920px] mx-auto bg-[var(--color-paper)] z-10 relative">
      <div className="md:pr-20 mb-16 md:mb-0">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.7 }}
        >
           <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-ember)] mb-8">Get in Touch</div>
           <h2 className="font-display text-[3rem] sm:text-[6vw] md:text-[5.5rem] leading-[0.95] tracking-[-0.02em] mb-8 text-[var(--color-ink)]">
             Let's build<br />something <em className="italic text-[var(--color-ember)]">great.</em>
           </h2>
           <p className="font-mono text-base leading-[1.8] text-[var(--color-muted)] max-w-[340px] mb-12 md:mb-0">
             Open to full-time roles, freelance projects, and collaborations. I design clean, purposeful experiences — if that resonates, let's talk.
           </p>
        </motion.div>
      </div>
      
      <div className="md:pl-20 border-t md:border-t-0 md:border-l border-[var(--color-border)] flex flex-col justify-center">
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.7, delay: 0.2 }}
           className="flex flex-col"
        >
          {[
            { name: "Email", handle: "rajeevanvarun57@gmail.com", href: "mailto:rajeevanvarun57@gmail.com" },
            { name: "LinkedIn", handle: "@varun-rajeevan-5b5483169", href: "https://www.linkedin.com/in/varun-rajeevan-5b5483169/" },
            { name: "Instagram", handle: "@ivarunrag1", href: "https://instagram.com/ivarunrag1" },
            { name: "Behance", handle: "@varun", href: "#" },
            { name: "Resume", handle: "Download PDF", href: "https://drive.google.com/uc?export=download&id=1NYNGvvaH1xLprt30l1Q9eDL0ei8ZMXLE" },
          ].map((link, i) => (
            <a key={i} href={link.href} className="group py-5 border-b border-[var(--color-border)] flex items-center justify-between hover:text-[var(--color-ember)] transition-colors first:border-t hover-target">
              <div>
                <div className="font-sans text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-ember)] transition-colors">{link.name}</div>
                <div className="font-mono text-sm text-[var(--color-muted)] mt-[2px]">{link.handle}</div>
              </div>
              <div className="text-xl text-[var(--color-ember)] group-hover:translate-x-1 transition-transform">
                {link.name === "Resume" ? "↓" : "→"}
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[var(--color-ink)] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 z-10 relative">
      <div className="font-sans font-extrabold text-base text-[var(--color-paper)] tracking-[-0.01em]">
        VARUN<span className="text-[var(--color-ember)]">.</span>
      </div>
      <div className="font-mono text-[13px] tracking-[0.1em] text-[rgba(245,240,232,0.3)] uppercase">
        © {new Date().getFullYear()} Varun — All rights reserved
      </div>
      <div className="font-mono text-[13px] tracking-[0.1em] text-[rgba(245,240,232,0.3)] uppercase flex items-center gap-2">
        <span className="text-[var(--color-ember)] text-[0.5rem]">◉</span> Chennai, India
      </div>
    </footer>
  );
};

const ProjectDetailsModal = ({ project, onClose, onNextProject }: { project: Project; onClose: () => void; onNextProject: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[var(--color-paper)] overflow-hidden flex flex-col"
    >
      <motion.div
        layoutId={`project-${project.id}`}
        className="relative w-full h-full flex flex-col overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 z-30 p-6 md:p-8 flex items-center justify-between pointer-events-none">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-paper)]/90 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-ember)] hover:border-[var(--color-ember)] hover:text-white transition-colors pointer-events-auto hover-target group font-mono text-xs tracking-widest uppercase"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Works
          </button>
          
          <div className="flex gap-4 pointer-events-auto">
            <button 
              onClick={onNextProject}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-paper)]/90 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-ink)] hover:bg-[var(--color-ember)] hover:border-[var(--color-ember)] hover:text-white transition-colors hover-target group font-mono text-xs tracking-widest uppercase"
            >
              Next Project <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
          <div className="w-full relative shrink-0 overflow-hidden border-b border-[var(--color-border)] min-h-[35vh] flex flex-col justify-end">
             {project.thumbnail ? (
               <img src={project.thumbnail} alt={project.title} className="absolute inset-0 w-full h-full object-cover grayscale-[10%]" referrerPolicy="no-referrer" />
             ) : (
               <div className={`absolute inset-0 bg-gradient-to-br ${project.image}`} />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-paper)] via-[var(--color-paper)]/70 to-transparent opacity-90" />
             <div className="relative z-10 w-full px-[40px] pb-[40px] pt-32 flex flex-col justify-end">
                <span className="text-[var(--color-ember)] font-mono text-[13px] uppercase tracking-[0.2em] mb-3 block">{project.category}</span>
                <h2 className="text-3xl md:text-[4rem] font-display text-[var(--color-ink)] leading-[1.05] mb-6">{project.title}</h2>
                <div className="flex flex-wrap gap-4">
                   <span className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Year: {project.year}</span>
                   <span className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Role: {project.role}</span>
                   <span className="font-mono text-[13px] tracking-[0.1em] uppercase text-[var(--color-muted)]">Client: {project.client}</span>
                </div>
             </div>
          </div>

          <div className="px-[40px] py-[40px] max-w-full mx-auto space-y-16 w-full">
             {project.sections.map((section, index) => (
               <div key={index} className="space-y-6">
                 <div className="flex items-start gap-6 border-b border-[var(--color-border)] pb-6 mb-8">
                   <span className="text-[var(--color-ember)]/50 font-mono text-[13px] mt-[0.6rem]">0{index + 1}</span>
                   <h3 className="text-2xl md:text-[2rem] font-display text-[var(--color-ink)] tracking-[-0.01em] italic leading-tight">
                     {section.title.replace(/Scene \d+ — |✨ /, '')}
                   </h3>
                 </div>
                 
                 {section.subtitle && (
                   <p className="text-[var(--color-ember)] font-mono font-medium text-sm tracking-[0.1em] uppercase">{section.subtitle}</p>
                 )}
                 
                 {section.content && (
                   <p className="font-mono text-base text-[var(--color-muted)] leading-[1.9] max-w-full whitespace-pre-wrap">
                     {section.content}
                   </p>
                 )}

                 {section.highlight && (
                   <div className="mt-8 bg-[var(--color-ink)] rounded-[1.5rem] p-8 md:p-12">
                     <p className="font-sans text-xl md:text-2xl text-[var(--color-paper)] leading-[1.6]">
                       {section.highlight}
                     </p>
                   </div>
                 )}

                 {section.image && (
                   <div className="mt-8 overflow-hidden border border-[var(--color-border)]">
                     <img src={section.image} alt={section.title} className="w-full h-auto object-cover grayscale-[10%]" referrerPolicy="no-referrer" />
                   </div>
                 )}
                 
                 {section.metrics && (
                   <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${section.metrics.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 mt-12 mb-8 w-full`}>
                     {section.metrics.map((metric, i) => (
                       <div key={i} className="flex-1 px-8 py-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-paper)] relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-6 opacity-5 border-l border-b border-[var(--color-border)] rounded-bl-[2rem] bg-white group-hover:bg-[var(--color-ember)] group-hover:opacity-10 transition-colors">
                           <BarChart2 className="w-12 h-12" />
                         </div>
                         <div className="font-sans text-[3.5rem] md:text-[4rem] font-bold text-[var(--color-ink)] mb-2 leading-none tracking-tight group-hover:text-[var(--color-ember)] transition-colors">{metric.value}</div>
                         <div className="font-sans text-lg text-[#4a4a4a] leading-[1.4] font-medium">
                           {metric.label} <br/> <span className="text-[#888] font-normal">{metric.subLabel}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}

                 {section.items && (
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-8 bg-[var(--color-paper2)] p-8 border border-[var(--color-border)]">
                     {section.items.map((item, i) => (
                       <li key={i} className="flex items-start gap-4 text-[var(--color-ink)] group">
                         <span className="mt-[0.6rem] w-1 h-1 bg-[var(--color-ember)] shrink-0" />
                         <span className="font-mono text-base leading-[1.8]">{item.replace(/^[❌✅📈⚡🎯🔄] /u, '')}</span>
                       </li>
                     ))}
                   </ul>
                 )}
                 
                 {section.timelineItems && (
                   <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12 mb-8">
                     {section.timelineItems.map((item, i) => (
                       <div key={i} className="flex flex-col relative group">
                         <div className="h-[2px] w-full bg-[var(--color-border)] absolute top-[11px] left-0 md:block hidden" />
                         <div className="w-[24px] h-[24px] rounded-full bg-[var(--color-paper)] border-2 border-[var(--color-ember)] relative z-10 mb-6 flex items-center justify-center">
                           <div className="w-[8px] h-[8px] rounded-full bg-[var(--color-ember)]" />
                         </div>
                         <div>
                           <div className="font-mono text-[13px] text-[var(--color-ember)] mb-1">STEP {item.step}</div>
                           <h4 className="font-sans font-semibold text-base text-[var(--color-ink)] mb-2 inline-flex items-center gap-2">
                             <item.icon className="w-4 h-4 text-[var(--color-ember)]" />
                             {item.title}
                           </h4>
                           {item.subtitle && (
                             <p className="font-sans font-medium text-sm text-[var(--color-muted)] mb-2">{item.subtitle}</p>
                           )}
                           <p className="font-mono text-base leading-[1.8] text-[var(--color-muted)] max-w-full">{item.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             ))}
          </div>
          
          <div className="mt-auto border-t border-[var(--color-border)] w-full">
            {project.footerImage ? (
                <div className="w-full">
                    <img src={project.footerImage} alt={`${project.title} footer`} className="w-full h-auto object-cover grayscale-[10%]" referrerPolicy="no-referrer" />
                </div>
            ) : (
                <div className={`w-full h-[40vh] bg-gradient-to-br ${project.image} opacity-80`} />
            )}
            <div className="w-full bg-[var(--color-ink)] py-16 flex items-center justify-center">
              <div className="text-center">
                 <div className="font-mono text-[13px] tracking-[0.2em] uppercase text-[var(--color-ember)] mb-4">Thanks for scrolling</div>
                 <h2 className="font-display text-[2.5rem] text-[var(--color-paper)] leading-none">— The End</h2>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Restore scroll position logic
  useEffect(() => {
    if (selectedProject) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
      // For some reason, motion's layoutId can sometimes jump the scroll back to top.
      // In a real app we might handle preserving scroll correctly but here just unlocking is enough
    }
  }, [selectedProject]);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] selection:bg-[var(--color-ember)] selection:text-white font-sans text-[var(--color-ink)] overflow-x-hidden relative max-w-[2560px] mx-auto">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <Works onSelectProject={setSelectedProject} />
        <About />
        <FAQSection />
        <Contact />
      </main>

      <Footer />

      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetailsModal 
            key={selectedProject.id}
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onNextProject={() => {
              const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
              const nextIndex = (currentIndex + 1) % projects.length;
              setSelectedProject(projects[nextIndex]);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
