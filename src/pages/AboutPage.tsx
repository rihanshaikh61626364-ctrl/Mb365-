import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  BookOpen, Lightbulb, TrendingUp, Building, 
  Briefcase, Target, PieChart, Zap, Map, 
  CheckCircle, TabletSmartphone, Clock, 
  BookMarked, ShieldCheck 
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // SEO Settings
    document.title = "About MyBooks365 | Practical Digital eBooks for Learning & Growth";
    
    // Manage Meta Tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about MyBooks365, a digital eBook platform offering practical books on business, entrepreneurship, marketing, finance, productivity, AI and growth.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Learn about MyBooks365, a digital eBook platform offering practical books on business, entrepreneurship, marketing, finance, productivity, AI and growth.";
      document.head.appendChild(meta);
    }

    // Canonical
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `${window.location.origin}/about`;
    if (linkCanonical) {
      linkCanonical.setAttribute("href", canonicalUrl);
    } else {
      const link = document.createElement('link');
      link.rel = "canonical";
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }

    // Open Graph
    const ogTags = [
      { property: 'og:title', content: 'About MyBooks365 | Practical Digital eBooks for Learning & Growth' },
      { property: 'og:description', content: 'Learn about MyBooks365, a digital eBook platform offering practical books on business, entrepreneurship, marketing, finance, productivity, AI and growth.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl }
    ];

    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (element) {
        element.setAttribute("content", tag.content);
      } else {
        element = document.createElement('meta');
        element.setAttribute("property", tag.property);
        element.setAttribute("content", tag.content);
        document.head.appendChild(element);
      }
    });

    // JSON-LD
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "MyBooks365",
      "url": window.location.origin,
      "description": "A digital eBook platform focused on practical, easy-to-understand and actionable knowledge.",
      "publisher": {
        "@type": "Organization",
        "name": "MyBooks365",
        "url": window.location.origin
      }
    };
    
    const existingScript = document.querySelector('#json-ld-about');
    if (existingScript) {
      existingScript.remove();
    }
    const script = document.createElement('script');
    script.id = 'json-ld-about';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    // Scroll to top
    window.scrollTo(0, 0);

  }, []);

  const handleHomeClick = () => navigate('/');
  const handleBooksClick = () => navigate('/');
  const handleCategoriesClick = () => navigate('/');
  const handleAboutClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleContactClick = () => {
    const el = document.getElementById('about-contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] font-sans antialiased flex flex-col selection:bg-[#2563EB]/20 selection:text-[#0B1F3A]">
      <Header 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />
      
      <main className="flex-grow flex flex-col">
        {/* HERO SECTION */}
        <section className="w-full bg-white border-b border-slate-100 py-20 px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#2563EB] font-black uppercase tracking-widest text-[10px] mb-4 bg-blue-50 px-3 py-1 rounded"
            >
              ABOUT MYBOOKS365
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] tracking-tight leading-tight mb-6 font-serif"
            >
              Knowledge That Helps You Move Forward.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            >
              MyBooks365 is a digital eBook platform built for people who want practical knowledge without unnecessary complexity. We create and curate easy-to-understand books designed to help readers learn, think and take action.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={handleBooksClick}
                className="bg-[#0B1F3A] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-md"
              >
                Explore Books
              </button>
              <button 
                onClick={handleContactClick}
                className="bg-white border border-slate-200 text-[#0B1F3A] hover:border-[#0B1F3A] px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-sm"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="w-full py-20 px-8 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-8">Why MyBooks365 Exists</h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Learning should not always mean going through hundreds of pages before reaching something useful. MyBooks365 was created with a simple idea: make valuable knowledge easier to understand, easier to access and easier to apply.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              Our books are designed around practical topics that matter in the real world — from understanding how businesses work to learning about marketing, money, productivity, AI and personal growth.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              We want every book to leave the reader with something useful they can actually understand and apply.
            </p>
          </div>
        </section>

        {/* OUR MISSION */}
        <section className="w-full py-20 px-8 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-4">Our Mission</h2>
            <p className="text-xl sm:text-2xl text-[#2563EB] font-bold max-w-3xl mx-auto leading-relaxed mb-16 font-serif">
              "To make practical knowledge more accessible, understandable and actionable for modern learners."
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <motion.div whileHover={{ y: -5 }} className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl">
                <BookOpen className="w-8 h-8 text-[#0B1F3A] mb-4" />
                <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-3">Learn</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Understand important concepts in a simple and structured way.</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl">
                <Zap className="w-8 h-8 text-[#0B1F3A] mb-4" />
                <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-3">Apply</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Turn knowledge into practical ideas, decisions and actions.</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-[#0B1F3A] mb-4" />
                <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-3">Grow</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Keep building skills, understanding and confidence over time.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHAT WE CREATE */}
        <section className="w-full py-20 px-8 bg-[#F8FAFC]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-12 text-center">Practical Knowledge. Thoughtfully Organized.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Building, title: "Business", desc: "Understand how businesses actually work — from customers and value to revenue, costs and growth." },
                { icon: Briefcase, title: "Entrepreneurship", desc: "Explore ideas, fundamentals and frameworks for building and understanding businesses." },
                { icon: Target, title: "Marketing", desc: "Learn practical marketing concepts, positioning, customer psychology and growth fundamentals." },
                { icon: PieChart, title: "Finance & Money", desc: "Build a stronger understanding of money, business finance and financial fundamentals." },
                { icon: Lightbulb, title: "Productivity & AI", desc: "Explore practical systems, tools and concepts for working smarter and understanding AI." },
                { icon: Map, title: "Growth & Strategy", desc: "Learn frameworks for better decisions, planning, execution and long-term growth." }
              ].map((cat, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-start hover:shadow-lg transition-shadow">
                  <cat.icon className="w-6 h-6 text-[#2563EB] mb-4" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-2">{cat.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY MYBOOKS365 */}
        <section className="w-full py-20 px-8 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-12 text-center">Built for Practical Learning</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-2">Clear & Structured</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Complex ideas are organized into easy-to-follow sections.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <BookMarked className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-2">Practical</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Focus on concepts, examples and frameworks that readers can understand and apply.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <TabletSmartphone className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-2">Digital-First</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Access your purchased digital books conveniently in supported formats.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="w-6 h-6 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#0B1F3A] mb-2">Learn At Your Pace</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">Read whenever and wherever it works for you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE SERVE */}
        <section className="w-full py-20 px-8 bg-[#F8FAFC] border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-6">For Curious, Ambitious Learners</h2>
            <p className="text-slate-500 text-base leading-relaxed">
              MyBooks365 is built for students, aspiring entrepreneurs, creators, professionals and anyone who wants to understand useful real-world concepts without unnecessary complexity.
            </p>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section className="w-full py-20 px-8 bg-white border-t border-slate-100">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-16">How We Think About Books</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { step: "01 — IDENTIFY", text: "Start with topics that matter." },
                { step: "02 — STRUCTURE", text: "Organize information into clear sections." },
                { step: "03 — SIMPLIFY", text: "Explain concepts in accessible language." },
                { step: "04 — DELIVER", text: "Turn the knowledge into a convenient digital reading experience." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB] mb-4 bg-blue-50 px-3 py-1 rounded-full">{item.step}</span>
                  <p className="text-[#0B1F3A] font-semibold text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST / TRANSPARENCY SECTION */}
        <section className="w-full py-20 px-8 bg-[#F8FAFC] border-t border-slate-100">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-[#0B1F3A] mb-6" />
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-6">Built With Transparency</h2>
            <p className="text-slate-500 text-base leading-relaxed max-w-2xl mx-auto mb-10">
              We believe readers should know what they are buying. Each book page clearly presents the book's topic, format, description, pricing and available details before purchase.
            </p>
            <button 
              onClick={handleBooksClick}
              className="bg-white border border-[#0B1F3A] text-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-sm"
            >
              Browse Our Books
            </button>
          </div>
        </section>

        {/* BRAND PROMISE */}
        <section className="w-full py-24 px-8 bg-[#0B1F3A] text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6 font-serif">Read. Learn. Grow.</h2>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 italic">
              "Every book should give you something worth taking forward — a clearer idea, a better understanding or a practical next step."
            </p>
            <button 
              onClick={handleBooksClick}
              className="bg-[#D4A72C] text-[#111C18] hover:bg-yellow-400 px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-lg"
            >
              Explore Books
            </button>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="about-contact-section" className="w-full py-20 px-8 bg-white border-b border-slate-100 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] tracking-tight mb-4">Have a Question?</h2>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              For questions, feedback or support, we'd love to hear from you.
            </p>
            <p className="text-[#0B1F3A] font-bold text-lg mb-8">
              supportmybooks365@gmail.com
            </p>
            <a 
              href="mailto:supportmybooks365@gmail.com"
              className="inline-block bg-[#0B1F3A] hover:bg-[#2563EB] text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-md"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full py-20 px-8 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] tracking-tight mb-6">Start Your Next Chapter.</h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-10">
              Explore practical digital books built to help you understand more, learn faster and move forward with confidence.
            </p>
            <button 
              onClick={handleBooksClick}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-10 py-4 rounded-xl text-xs font-black tracking-widest uppercase transition-all shadow-lg"
            >
              Explore Books
            </button>
          </div>
        </section>

      </main>
      
      <Footer 
        onHomeClick={handleHomeClick}
        onBooksClick={handleBooksClick}
        onCategoriesClick={handleCategoriesClick}
        onAboutClick={handleAboutClick}
        onContactClick={handleContactClick}
      />
    </div>
  );
}
