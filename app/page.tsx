'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  X, 
  Check, 
  ShoppingBag, 
  Send, 
  Upload, 
  Award, 
  Users, 
  Globe,
  Star,
  Sun,
  Moon
} from 'lucide-react';

interface Kit {
  id: string;
  title: string;
  badge: string;
  description: string;
  contents: string[];
  features: string[];
  image: string;
  priceEstimate: string;
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  
  // Handle Light / Dark mode gracefully with persistent local state
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  
  // Form State corresponding to Screenshot 5
  const [formData, setFormData] = useState({
    email: 'clarathorne@gmail.com',
    subject: 'Skincare Kit details / Retail Inquiry',
    interest: 'Both Products & Business Opportunity',
    message: '',
    consent: true
  });

  // Premium default images and high-quality Unsplash fallbacks
  const defaultImages: Record<string, string> = {
    rujelHoldingGummies: '/assets/input_file_0.png',
    rujelExecutiveFlyer: '/assets/input_file_4.png',
    skincare: '/assets/input_file_2.png',
    glow: '/assets/input_file_3.png',
    calendula: '/assets/input_file_5.png',
    transformation: '/assets/input_file_6.png',
  };

  const fallbackImages: Record<string, string> = {
    rujelHoldingGummies: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200',
    rujelExecutiveFlyer: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200',
    skincare: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
    glow: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200',
    calendula: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800',
    transformation: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800',
  };

  const [brandImages, setBrandImages] = useState<Record<string, string>>(defaultImages);

  useEffect(() => {
    // 1. Load darkMode state from localStorage safely on client side
    const savedDarkMode = localStorage.getItem('rujel_dark_mode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }

    // 2. Load brandImages from localStorage safely on client side
    try {
      const savedImages = localStorage.getItem('rujel_brand_images');
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        setBrandImages(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.error('Error loading brand images:', e);
    }

    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('rujel_dark_mode', String(darkMode));
    }
  }, [darkMode, hasMounted]);

  const handleImageUpdate = (key: string, value: string) => {
    setBrandImages(prev => {
      const next = { ...prev, [key]: value };
      if (typeof window !== 'undefined') {
        localStorage.setItem('rujel_brand_images', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleResetImage = (key: string) => {
    setBrandImages(prev => {
      const next = { ...prev, [key]: defaultImages[key] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('rujel_brand_images', JSON.stringify(next));
      }
      return next;
    });
  };

  const handleResetAll = () => {
    setBrandImages(defaultImages);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rujel_brand_images');
    }
  };

  // Recommended Premium Kits
  const kits: Kit[] = [
    {
      id: 'transformation',
      title: 'Nutriplus My Transformation Kit',
      badge: 'Holistic Body Reboot',
      description: 'A comprehensive package curated to revitalize your gut health, kickstart balanced energy levels, and nurture a healthier, more vibrant posture on life.',
      contents: [
        'Premium Nutriplus Wellness Meal Replacement Shake',
        'Daily Detox Herbal Infusions',
        'Probiotic & Dietary Balance Capsules',
        'Holistic Mind-Body Tracker Guide'
      ],
      features: [
        'Supports light, refreshed digestion',
        'Step-by-step guidance manual from Rujel'
      ],
      image: '/assets/input_file_6.png',
      priceEstimate: '$120'
    },
    {
      id: 'glow',
      title: 'Morning Wake & Glow Recipe Pack',
      badge: 'Ultimate Sunrise Energizer',
      description: 'Your mandatory ritual to wake up feeling intensely energized, mentally sharp, and complete with a youthful, radiant skin complexion that lasts all day.',
      contents: [
        'Liquid L-Carnitine Plus Morning Shot',
        'Chicory & Grain Gourmet Coffee Blend',
        'Marine Glow Liquid Collagen Shot',
        'Wake-Up Wellness Journaling Guide'
      ],
      features: [
        'Nourishes nail, hair, and fascia beauty from within',
        'Brightens skin appearance with a clean morning ritual'
      ],
      image: '/assets/input_file_3.png',
      priceEstimate: '$95'
    },
    {
      id: 'calendula',
      title: 'Calendula Balm & Tattoo Care',
      badge: 'Intense Botanical Hydration',
      description: 'A concentrated Calendula flower formula recommended for tattoo healing and intensive skin care, providing deep hydration and soothing protection.',
      contents: [
        'Dr. C. Tuna Calendula Cream Balm',
        'Soothing Calendula Multi-Balm Jar',
        'Intense Hydration Hand & Body Care Wash',
        'Specialized Soft & Healthy Skin Care Manual'
      ],
      features: [
        'Clinically recommended therapeutic care for tattoos',
        'Provides intense, continuous hydration for damaged skin'
      ],
      image: '/assets/input_file_5.png',
      priceEstimate: '$85'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setFormData({
        email: '',
        subject: '',
        interest: 'Both Products & Business Opportunity',
        message: '',
        consent: true
      });
    }, 4000);
  };

  return (
    <div className={`min-h-screen relative font-sans antialiased transition-colors duration-500 selection:bg-[#E8C0B0]/40 selection:text-[#1A1A1A] ${
      darkMode ? 'bg-[#121110] text-[#F5F2EF]' : 'bg-[#FAF8F5] text-[#1A1A1A]'
    }`}>
      
      {/* 1. Header Navigation - Styled strictly as Screenshot 1 */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md px-6 py-6 md:px-12 transition-all duration-300 ${
        darkMode ? 'bg-[#121110]/90 border-b border-white/10' : 'bg-[#FAF8F5]/90 border-b border-[#1A1A1A]/5'
      }`} id="app-nav">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={`font-serif font-semibold text-lg sm:text-xl tracking-[0.08em] uppercase transition-colors duration-300 ${
                darkMode ? 'text-[#F5F2EF]' : 'text-[#1A1A1A]'
              }`}>
                RUJEL BUGGS
              </span>
              <span className={`inline-block w-2 h-2 rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-[#CD816E]' : 'bg-[#E8C0B0]'
              }`}></span>
            </div>
            <span className={`text-[9px] uppercase tracking-[0.24em] font-semibold mt-1 transition-colors duration-300 ${
              darkMode ? 'text-[#BAB0AC]' : 'text-[#8C8380]'
            }`}>
              FARMASI ELITE AMBASSADOR
            </span>
          </div>

          {/* Minimalist Action & Burger Menu Toggle */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation Links */}
            <div className={`hidden md:flex items-center gap-8 transition-colors duration-300 ${
              darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
            }`}>
              <a href="#about" className="text-[10px] uppercase tracking-[0.16em] font-semibold hover:text-[#CD816E] transition-colors">Our Story</a>
              <a href="#offerings" className="text-[10px] uppercase tracking-[0.16em] font-semibold hover:text-[#CD816E] transition-colors">Offerings</a>
              <a href="#kits" className="text-[10px] uppercase tracking-[0.16em] font-semibold hover:text-[#CD816E] transition-colors">Care Packs</a>
              <a href="#inquiry" className="text-[10px] uppercase tracking-[0.16em] font-semibold hover:text-[#CD816E] transition-colors">Inquire</a>
            </div>

            {/* Premium Theme Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all duration-300 relative overflow-hidden flex items-center justify-center cursor-pointer ${
                darkMode 
                  ? 'bg-white/10 text-amber-300 hover:bg-white/20' 
                  : 'bg-black/5 text-[#5C5450] hover:bg-black/10'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Dark Mode"
              id="theme-mode-toggle"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col justify-between h-3 w-6 cursor-pointer group"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              <span className={`h-0.5 w-full rounded-full transition-all duration-300 ${darkMode ? 'bg-[#F2BCA6]' : 'bg-[#1A1A1A]'}`}></span>
              <span className={`h-0.5 w-full rounded-full transition-all duration-300 my-0.5 ${darkMode ? 'bg-[#F2BCA6]' : 'bg-[#1A1A1A]'}`}></span>
              <span className={`h-0.5 w-full rounded-full transition-all duration-300 ${darkMode ? 'bg-[#F2BCA6]' : 'bg-[#1A1A1A]'}`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden fixed top-[81px] left-0 right-0 backdrop-blur-lg border-b shadow-lg z-50 px-8 py-10 flex flex-col gap-5 text-center font-semibold transition-all duration-300 ${
              darkMode ? 'bg-[#121110]/98 border-white/10' : 'bg-[#FAF8F5]/98 border-[#1A1A1A]/10'
            }`}
            id="mobile-drawer"
          >
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`py-2 border-b text-xs uppercase tracking-[0.15em] block transition-all ${
              darkMode ? 'border-white/5 text-[#F5F2EF] hover:text-[#CD816E]' : 'border-[#1A1A1A]/5 text-[#1A1A1A] hover:text-[#CD816E]'
            }`}>Our Story</a>
            <a href="#offerings" onClick={() => setMobileMenuOpen(false)} className={`py-2 border-b text-xs uppercase tracking-[0.15em] block transition-all ${
              darkMode ? 'border-white/5 text-[#F5F2EF] hover:text-[#CD816E]' : 'border-[#1A1A1A]/5 text-[#1A1A1A] hover:text-[#CD816E]'
            }`}>Offerings</a>
            <a href="#kits" onClick={() => setMobileMenuOpen(false)} className={`py-2 border-b text-xs uppercase tracking-[0.15em] block transition-all ${
              darkMode ? 'border-white/5 text-[#F5F2EF] hover:text-[#CD816E]' : 'border-[#1A1A1A]/5 text-[#1A1A1A] hover:text-[#CD816E]'
            }`}>Care Packs</a>
            <a href="#inquiry" onClick={() => setMobileMenuOpen(false)} className={`py-2 text-xs uppercase tracking-[0.15em] block transition-all ${
              darkMode ? 'text-[#F5F2EF] hover:text-[#CD816E]' : 'text-[#1A1A1A] hover:text-[#CD816E]'
            }`}>Inquiry Form</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Header Section - Screen 1 & Screen 2 Hybrid Layout */}
      <section className="px-6 py-12 md:px-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center" id="hero">
        
        {/* Left Column Text - S1 replica */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className={`inline-block px-4 py-2 border rounded-full text-[10px] md:text-xs tracking-[0.2em] font-semibold uppercase transition-all duration-300 ${
            darkMode 
              ? 'border-[#CD816E]/40 bg-[#1D1A18] text-[#E8C0B0]' 
              : 'border-[#F2C0B0]/60 bg-[#FCF8F6] text-[#CD816E]'
          }`}>
            FARMASI BRAND AMBASSADOR
          </div>

          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight transition-colors duration-300 ${
            darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
          }`}>
            Transform your <span className="italic text-[#CD816E]">Health</span>, Elevate your <span className="italic text-[#CD816E]">Finances</span>.
          </h1>

          <p className={`text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-xl transition-colors duration-300 ${
            darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
          }`}>
            Welcome to the space where wellness legacy meets wealth. Rujel Buggs is here to guide you toward a life of vibrant health, radiant beauty, and complete financial freedom.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <button 
              onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer ${
                darkMode ? 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#E8C0B0]' : 'bg-[#1A1A1A] text-white hover:bg-[#CD816E]'
              }`}
              id="find-my-path-btn"
            >
              <span>FIND MY PATH</span>
              <span className="text-[13px] leading-none mb-0.5">✦</span>
            </button>
            <button 
              onClick={() => document.getElementById('offerings')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border px-8 py-4.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                darkMode 
                  ? 'border-white/20 text-[#FAF8F5] hover:bg-white/5' 
                  : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
              }`}
              id="explore-offerings-btn"
            >
              <span>EXPLORE OFFERINGS</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* Right Column Visual - S2 replica container */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-[4/5]" id="promo-card-container">
            {/* Soft pink/salmon framing border */}
            <div className={`absolute inset-0 border rounded-[2.5rem] transform -translate-x-3 -translate-y-3 transition-colors duration-300 ${
              darkMode ? 'border-[#CD816E]/20' : 'border-[#F2C0B0]/40'
            }`} />
            
            {/* The main picture block */}
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#ECE7E2] shadow-xl group">
              <img 
                src={brandImages.skincare}
                onError={(e) => {
                  e.currentTarget.src = fallbackImages.skincare;
                  e.currentTarget.onerror = null;
                }}
                alt="White premium care bottle with soft cotton cloth and pink flowers"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              
              {/* Overlay card - Wealth meets premium wellness */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#211E1C]/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 text-white shadow-xl">
                <p className="font-serif text-sm sm:text-base font-normal tracking-wide text-[#FAF8F5] leading-relaxed">
                  &ldquo;Wealth meets premium wellness.&rdquo;
                </p>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#D5A795] font-semibold mt-2.5">
                  A CURATED FARMASI APPROACH
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 3. My Story Section - Screen 3 & Screen 4 replica */}
      <section className={`px-6 py-16 md:px-12 md:py-24 border-t transition-colors duration-500 ${
        darkMode ? 'bg-[#181615] border-white/10' : 'bg-white border-[#1A1A1A]/5'
      }`} id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left / Top Copy */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-serif italic text-base md:text-lg text-[#CD816E] tracking-wide" id="about-pre-title">
              The Catalyst
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-[1.12] transition-colors duration-300 ${
              darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
            }`}>
              My Story: Empowering Women Through Wellness and Wealth.
            </h2>
            <div className="w-16 h-0.5 bg-[#CD816E] my-6"></div>

            <div className={`space-y-5 text-xs md:text-sm font-light leading-relaxed max-w-2xl transition-colors duration-300 ${
              darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
            }`}>
              <p>
                Hello, I&apos;m <span className={`font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Rujel Buggs</span>, and my journey is one of transformation, purpose, and unwavering belief in the powerhouse nature of women.
              </p>
              <p>
                With a prominent career background as a former <span className={`font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>Sr. Client Retention Manager at Avaya Inc.</span> and holding an elegant <span className={`font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>MBA from Warner University</span>, I&apos;ve always been driven by an intrinsic desire to connect, lead, and create beautiful impact. However, it was my personal deeply-held quest for holistic well-being and financial sovereignty that naturally guided me home to Farmasi.
              </p>
              
              {/* Highlight Block corresponding to Screen 3 bottom */}
              <div className={`border-l border-[#CD816E] pl-5 py-2.5 my-8 font-serif italic text-sm md:text-lg leading-relaxed transition-colors duration-300 ${
                darkMode ? 'bg-[#121110] text-[#E8C0B0]' : 'bg-[#FAF8F5]/50 text-[#4E4441]'
              }`}>
                &ldquo;Our vision, &apos;1000FamiliesRich&apos;, is a luxurious legacy of health, happiness, and prosperity. True empowerment is nurturing both your inner light and outer elegance, on your own terms.&rdquo;
              </div>

              <p>
                Today, as a proud Farmasi Brand Ambassador, I&apos;ve dedicated myself to helping ambitious women discover their own curated paths to success. My mission expands far beyond cosmetics; of fostering a premium community&mdash;my <span className={`font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-[#1A1A1A]'}`}>&ldquo;Team Purpose&rdquo;</span>&mdash;where every single woman feels supported, inspired, and equipped with the toolkit to reach her absolute fullest potential.
              </p>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })}
                className={`inline-flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] transition-all group duration-300 cursor-pointer ${
                  darkMode ? 'text-white hover:text-[#E8C0B0]' : 'text-[#1A1A1A] hover:text-[#CD816E]'
                }`}
                id="inquire-story-trigger"
              >
                <span>INQUIRE INTO TEAM PURPOSE</span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                  darkMode 
                    ? 'border-white/20 group-hover:border-[#E8C0B0] group-hover:bg-white/5' 
                    : 'border-[#1A1A1A] group-hover:border-[#CD816E] group-hover:bg-[#CD816E]/5'
                }`}>
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right Portrait / Business Flyer View */}
          <div className="lg:col-span-5 flex flex-col space-y-6 items-center">
            <div className={`relative w-full max-w-[360px] aspect-[11/14] rounded-2xl overflow-hidden shadow-lg transition-colors duration-300 ${
              darkMode ? 'bg-[#2D2A26]' : 'bg-[#ECE7E2]'
            }`}>
              <img 
                src={brandImages.rujelExecutiveFlyer}
                onError={(e) => {
                  e.currentTarget.src = fallbackImages.rujelExecutiveFlyer;
                  e.currentTarget.onerror = null;
                }}
                alt="Portrait of Rujel Buggs - Elite Leader"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1A1A1A]/90 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.15em] font-medium px-4 py-1.5 rounded-full">
                TEAM PURPOSE LEADER
              </div>
            </div>

            <div className="w-full max-w-[360px] text-center lg:text-left">
              <h4 className={`font-serif text-sm font-semibold transition-colors duration-300 ${darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'}`}>Rujel Buggs MBA</h4>
              <p className="text-[10px] uppercase tracking-wider text-[#CD816E] font-bold mt-1">Farmasi Gold Executive Leader</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Experience Offerings Section - Bridges previous and new content */}
      <section className={`px-6 py-16 md:px-12 md:py-24 border-t transition-colors duration-500 ${
        darkMode ? 'bg-[#121110] border-white/10' : 'bg-[#FAF8F5] border-[#1A1A1A]/5'
      }`} id="offerings">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">Wealth & Well-Being blueprint</span>
            <h2 className={`font-serif text-3xl md:text-4xl font-light tracking-tight transition-colors duration-300 ${
              darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
            }`}>
              A Direct Path To <span className="font-serif italic text-[#CD816E]">Financial Sovereignty</span>
            </h2>
            <p className={`text-xs md:text-sm font-light leading-relaxed max-w-lg mx-auto transition-colors duration-300 ${
              darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
            }`}>
              Partnering with Rujel Buggs unlocks Farmasi&apos;s clean medical-grade products paired with an aggressive recurring cash commission structure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "50% Sales Commission",
                desc: "No minimum quotas or limits. Earn a complete 50% cash margin instantly on all customer orders placed online dynamically.",
                icon: <Award className="h-4.5 w-4.5 text-[#CD816E]" />
              },
              {
                title: "50% Personal Discount",
                desc: "Save 50% off retail immediately for your home cosmetic, skincare, and gourmet food supplements for life.",
                icon: <Users className="h-4.5 w-4.5 text-[#CD816E]" />
              },
              {
                title: "Luxury Travel Incentives",
                desc: "Qualify for elite direct seller retreats, brand summits, and physical training courses in Istanbul, Paris, and tropical cruises.",
                icon: <Globe className="h-4.5 w-4.5 text-[#CD816E]" />
              }
            ].map((off, idx) => (
              <div key={idx} className={`border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm hover:shadow-md transition-all duration-300 ${
                darkMode ? 'bg-[#181615] border-white/10' : 'bg-white border-[#1A1A1A]/5'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  darkMode ? 'bg-[#121110]' : 'bg-[#FAF8F5]'
                }`}>
                  {off.icon}
                </div>
                <h3 className={`font-serif text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                  darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
                }`}>{off.title}</h3>
                <p className={`text-[11px] leading-relaxed font-light transition-colors duration-300 ${
                  darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                }`}>{off.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Recommended Premium Packs Section */}
      <section className={`px-6 py-16 md:px-12 md:py-24 border-t transition-colors duration-500 ${
        darkMode ? 'bg-[#181615] border-white/10' : 'bg-white border-[#1A1A1A]/5'
      }`} id="kits">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">Curated collections</span>
            <h2 className={`font-serif text-3xl md:text-4xl font-light tracking-tight transition-colors duration-300 ${
              darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
            }`}>
              Curator-Selected <span className="font-serif italic text-[#CD816E]">Wellness Care Packs</span>
            </h2>
            <p className={`text-xs font-light leading-relaxed max-w-lg mx-auto transition-colors duration-300 ${
              darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
            }`}>
              Ready-made solutions designed by Rujel using gold safety certified compounds to promote total body recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kits.map((k) => {
              const currentImg = brandImages[k.id] || k.image;
              const fallbackImg = fallbackImages[k.id];

              return (
                <div 
                  key={k.id} 
                  className={`border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col p-4 shadow-sm hover:shadow ${
                    darkMode 
                      ? 'bg-[#121110] border-white/10 hover:border-[#CD816E] hover:bg-[#1C1A19]' 
                      : 'bg-[#FAF8F5]/50 border-[#1A1A1A]/5 hover:border-[#F2C0B0] hover:bg-white'
                  }`}
                >
                  <div className={`relative aspect-video w-full rounded-2xl overflow-hidden mb-5 transition-colors duration-300 ${
                    darkMode ? 'bg-[#2D2A26]' : 'bg-[#ECE7E2]'
                  }`}>
                    <img 
                      src={currentImg}
                      onError={(e) => {
                        e.currentTarget.src = fallbackImg;
                        e.currentTarget.onerror = null;
                      }}
                      alt={k.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#1A1A1A] text-[#FAF8F5] text-[8px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full">
                      {k.badge}
                    </div>
                  </div>

                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className={`font-serif text-sm font-bold transition-colors duration-300 ${
                        darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
                      }`}>{k.title}</h3>
                      <p className={`text-[11px] font-light leading-relaxed transition-colors duration-300 ${
                        darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                      }`}>{k.description}</p>
                    </div>

                    <div className="space-y-3 pt-3">
                      {/* Contents List */}
                      <div className={`border p-3 rounded-xl space-y-1 transition-colors duration-300 ${
                        darkMode ? 'bg-[#181615] border-white/10' : 'bg-white border-[#1A1A1A]/5'
                      }`}>
                        <span className={`text-[8px] uppercase font-bold tracking-wider transition-colors duration-300 ${
                          darkMode ? 'text-[#BAB0AC]' : 'text-[#A69B97]'
                        }`}>Pack Contents</span>
                        <ul className="space-y-1">
                          {k.contents.slice(0, 3).map((item, id) => (
                            <li key={id} className={`text-[9px] flex items-center gap-1.5 font-light transition-colors duration-300 ${
                              darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                            }`}>
                              <span className="w-1 h-1 bg-[#CD816E] rounded-full inline-block"></span>
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button 
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            subject: `Inquiry for ${k.title}`,
                            message: `Hi Rujel! Please share how to get the ${k.title} at absolute pre-agent pricing.`
                          }));
                          document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-colors duration-300 cursor-pointer ${
                          darkMode 
                            ? 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#E8C0B0]' 
                            : 'bg-[#1A1A1A] text-white hover:bg-[#CD816E]'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Inquire This Pack</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Form Section - Styled exactly as Screenshot 5 */}
      <section className={`px-6 py-16 md:px-12 md:py-24 border-t relative overflow-hidden transition-colors duration-500 ${
        darkMode ? 'bg-[#121110] border-white/10' : 'bg-[#FCFBF9] border-[#1A1A1A]/5'
      }`} id="inquiry">
        
        {/* Soft natural blurry accent balls background */}
        <div className={`absolute top-20 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${
          darkMode ? 'bg-[#CD816E]/5' : 'bg-[#F2C0B0]/10'
        }`} />
        <div className={`absolute -bottom-10 left-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-300 ${
          darkMode ? 'bg-[#181615]/10' : 'bg-[#ECE7E2]/20'
        }`} />

        <div className="max-w-xl mx-auto space-y-10 relative z-10">
          
          <div className="text-center space-y-2">
            <span className="text-[9px] uppercase font-bold tracking-[0.24em] text-[#CD816E] block">INQUIRE INTO TEAM PURPOSE</span>
            <h2 className={`font-serif text-3xl md:text-4xl font-light transition-colors duration-300 ${
              darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
            }`}>Get In Touch</h2>
          </div>

          <div className={`backdrop-blur-md border rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-sm transition-all duration-300 ${
            darkMode ? 'bg-[#181615]/90 border-white/10' : 'bg-white/90 border-[#1A1A1A]/5'
          }`}>
            {consultSuccess ? (
              <div className="text-center py-12 space-y-4" id="consult-success">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-lg transition-colors duration-300 ${
                  darkMode ? 'bg-[#FAF8F5] text-[#1A1A1A]' : 'bg-[#1A1A1A] text-white'
                }`}>
                  ✓
                </div>
                <h3 className={`font-serif text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
                }`}>Consultation Sent Successfully</h3>
                <p className={`text-[11px] max-w-xs mx-auto leading-relaxed font-light transition-colors duration-300 ${
                  darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                }`}>
                  Thank you! Rujel has received your details. Our team will follow up at your provided email coordinates shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6" id="consultation-form">
                
                {/* Email Address input with initial placeholder matching S5 */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className={`w-full bg-transparent border-b py-3 text-sm focus:border-[#CD816E] outline-none transition-all placeholder:text-[#A69B97] ${
                      darkMode ? 'border-white/10 text-white' : 'border-[#1A1A1A]/10 text-[#1A1A1A]'
                    }`}
                    placeholder="clarathorne@gmail.com"
                  />
                </div>

                {/* Subject matching S5 */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">INQUIRY SUBJECT</label>
                  <input 
                    type="text" 
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))}
                    className={`w-full bg-transparent border-b py-3 text-sm focus:border-[#CD816E] outline-none transition-all placeholder:text-[#A69B97] ${
                      darkMode ? 'border-white/10 text-white' : 'border-[#1A1A1A]/10 text-[#1A1A1A]'
                    }`}
                    placeholder="Skincare Kit details / Retail Inquiry"
                  />
                </div>

                {/* Dropdown list of interest matching S5 */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">MAIN AREA OF INTEREST</label>
                  <select 
                    value={formData.interest}
                    onChange={(e) => setFormData(p => ({ ...p, interest: e.target.value }))}
                    className={`w-full bg-transparent border-b py-3 text-sm focus:border-[#CD816E] outline-none transition-all cursor-pointer font-sans ${
                      darkMode ? 'border-white/10 text-white bg-[#181615]' : 'border-[#1A1A1A]/10 text-[#1A1A1A] bg-white'
                    }`}
                  >
                    <option value="Both Products & Business Opportunity" className={darkMode ? 'bg-[#181615] text-white' : 'bg-white text-[#1A1A1A]'}>Both Products & Business Opportunity</option>
                    <option value="Only Premium Skincare and Shakes" className={darkMode ? 'bg-[#181615] text-white' : 'bg-white text-[#1A1A1A]'}>Only Premium Skincare and Shakes</option>
                    <option value="Only Affiliate Commission Network" className={darkMode ? 'bg-[#181615] text-white' : 'bg-white text-[#1A1A1A]'}>Only Affiliate Commission Network</option>
                  </select>
                </div>

                {/* Narrative block matching S5 */}
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">NARRATE YOUR TRANSFORMATION VISION</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    className={`w-full bg-transparent border-b py-3 text-sm focus:border-[#CD816E] outline-none transition-all resize-none placeholder:text-[#A69B97] ${
                      darkMode ? 'border-white/10 text-white' : 'border-[#1A1A1A]/10 text-[#1A1A1A]'
                    }`}
                    placeholder="Share your goals regarding wellness legacy or financial breakthrough..."
                  />
                </div>

                {/* Consent checkbox matching S5 */}
                <div className="flex items-start gap-3 mt-8">
                  <input 
                    type="checkbox" 
                    id="consent-check"
                    checked={formData.consent}
                    onChange={(e) => setFormData(p => ({ ...p, consent: e.target.checked }))}
                    className="w-4 h-4 rounded text-[#CD816E] border-[#F2C0B0]/80 focus:ring-[#CD816E] mt-0.5 accent-[#CD816E] cursor-pointer"
                  />
                  <label htmlFor="consent-check" className={`text-[10px] md:text-xs leading-relaxed font-light cursor-pointer transition-colors duration-300 ${
                    darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                  }`}>
                    I submit this consultation inquiry directly to Rujel Buggs&apos; Team Purpose network and consent to receive personal business wellness follow-ups.
                  </label>
                </div>

                <button 
                  type="submit"
                  className={`w-full mt-6 py-4 transition-colors rounded-full text-xs font-bold uppercase tracking-[0.18em] cursor-pointer ${
                    darkMode 
                      ? 'bg-[#FAF8F5] text-[#1A1A1A] hover:bg-[#E8C0B0]' 
                      : 'bg-[#1A1A1A] text-[#FAF8F5] hover:bg-[#CD816E]'
                  }`}
                  id="final-form-submit-btn"
                >
                  Submit Consultation
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className={`px-6 py-16 md:px-12 transition-colors duration-500 ${
        darkMode ? 'bg-[#181615]' : 'bg-white'
      }`} id="faq">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#CD816E] block">Clarifications</span>
            <h2 className={`font-serif text-2xl md:text-3xl font-light transition-colors duration-300 ${
              darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
            }`}>Frequently Answered Questions</h2>
          </div>

          <div className="space-y-5">
            {[
              {
                q: 'Who is Rujel Buggs?',
                a: 'Rujel Buggs is a Senior Executive Brand Leader for Farmasi, holding an elegant MBA from Warner University. She helps ambitious women build recurring stream commissions.'
              },
              {
                q: 'What is special about these Farmasi Kits?',
                a: 'They are crafted under high-grade European medical certifications (GMP/ISO check). Safe, clean, and extremely high consumer demand.'
              },
              {
                q: 'How does the Live Brand Assets Suite work?',
                a: 'Click the "N" action button on the bottom left of your viewport at any time to open our drag-and-drop live branding suit and load custom images instantly.'
              }
            ].map((item, id) => (
              <div key={id} className={`border-b pb-5 space-y-2 transition-colors duration-300 ${
                darkMode ? 'border-white/5' : 'border-[#1A1A1A]/10'
              }`}>
                <h4 className={`font-serif text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  darkMode ? 'text-[#FAF8F5]' : 'text-[#1A1A1A]'
                }`}>{item.q}</h4>
                <p className={`text-[11px] md:text-xs leading-relaxed font-light pl-3 border-l border-[#CD816E] transition-colors duration-300 ${
                  darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                }`}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Static Footer */}
      <footer className="bg-[#1A1A1A] text-white/50 px-6 py-12 text-center text-[10px] tracking-wide border-t border-white/5">
        <p className="max-w-xl mx-auto leading-relaxed">
          &copy; {new Date().getFullYear()} Rujel Buggs &amp; Farmasi Global Group. Handcrafted Elite Experience. Washington DC, USA. All private wellness consultations managed directly through Team Purpose network partners.
        </p>
      </footer>

      {/* 8. Fixed Floating Badge (N) - Matches screenshots on bottom left! */}
      <button 
        onClick={() => setConfigOpen(true)}
        className={`fixed bottom-8 left-6 z-50 rounded-full w-12 h-12 text-white flex items-center justify-center font-serif text-lg font-bold shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 ${
          darkMode ? 'bg-[#CD816E] hover:bg-[#E8C0B0]' : 'bg-[#2D2A26] hover:bg-[#CD816E]'
        }`}
        title="Open Live Brand Assets Manager"
        id="n-floating-trigger"
      >
        N
      </button>

      {/* Floating Dynamic Brand Live Suite Configurer Panel */}
      <AnimatePresence>
        {configOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" id="brand-suite-config-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfigOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              id="brand-suite-backdrop"
            />
            
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 transition-colors duration-300 border-l ${
                darkMode ? 'bg-[#181615] border-white/10' : 'bg-[#FAF8F5] border-[#1A1A1A]/10'
              }`}
              id="brand-suite-panel"
            >
              {/* Header */}
              <div className={`p-6 border-b flex items-center justify-between transition-colors duration-300 ${
                darkMode ? 'border-white/10 bg-white/5' : 'border-[#1A1A1A]/10 bg-black/5'
              }`}>
                <div>
                  <h3 className={`font-serif text-base font-bold flex items-center gap-2 transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-[#1a1a1a]'
                  }`}>
                    <Sparkles className="h-4 w-4 text-[#CD816E]" />
                    Live Brand Assets Manager
                  </h3>
                  <p className={`text-[10px] mt-1 transition-colors duration-300 ${
                    darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                  }`}>
                    Upload Rujel&apos;s real photo files or paste web URLs to render them live!
                  </p>
                </div>
                <button 
                  onClick={() => setConfigOpen(false)}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    darkMode ? 'hover:bg-white/15 text-white' : 'hover:bg-[#1A1A1A]/10 text-[#1a1a1a]'
                  }`}
                  id="brand-suite-close-btn"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className={`border rounded-xl p-4 transition-colors duration-300 ${
                  darkMode ? 'bg-[#121110] border-[#CD816E]/40' : 'bg-[#FCF8F6] border-[#F2C0B0]/60'
                }`}>
                  <h4 className="text-[11px] font-semibold text-[#CD816E] uppercase tracking-wider flex items-center gap-1 font-sans">
                    💡 Dynamic Browser Upload
                  </h4>
                  <p className={`text-[10px] leading-normal mt-1 font-light transition-colors duration-300 ${
                    darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                  }`}>
                    Select your custom images from your desktop. They convert immediately to responsive local assets and update on the page live!
                  </p>
                </div>

                {/* Grid items */}
                {[
                  { key: 'skincare', label: '1. Soap, Towel & Tulip Card (Hero)', desc: 'Large promotional photo from S2.', fallback: fallbackImages.skincare },
                  { key: 'rujelExecutiveFlyer', label: '2. Rujel Business Flyer (Story)', desc: 'Professional suit or recruitment flyer.', fallback: fallbackImages.rujelExecutiveFlyer },
                  { key: 'rujelHoldingGummies', label: '3. Rujel Holding Gummies', desc: 'Greeting card asset holding gummies package.', fallback: fallbackImages.rujelHoldingGummies },
                  { key: 'transformation', label: '4. My Transformation Kit', desc: 'Premium body reboot container packaging.', fallback: fallbackImages.transformation },
                  { key: 'glow', label: '5. Morning Wake & Glow Pack', desc: 'Morning sunrise drink recipe visuals.', fallback: fallbackImages.glow },
                  { key: 'calendula', label: '6. Calendula Balm Care', desc: 'Calendula Dr. Tuna balm skincare ointment.', fallback: fallbackImages.calendula }
                ].map((item) => {
                  const currentImgVal = brandImages[item.key] || defaultImages[item.key];
                  const fallbackImgVal = item.fallback;
                  const isModified = currentImgVal !== defaultImages[item.key];

                  return (
                    <div key={item.key} className={`border rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-all duration-300 ${
                      darkMode ? 'bg-[#121110] border-white/5' : 'bg-white border-[#1A1A1A]/10'
                    }`}>
                      <div>
                        <span className={`text-xs font-serif font-bold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-[#1A1A1A]'
                        }`}>{item.label}</span>
                        <p className={`text-[9px] transition-colors duration-300 ${
                          darkMode ? 'text-[#BAB0AC]' : 'text-[#5C5450]'
                        }`}>{item.desc}</p>
                      </div>

                      <div className="flex gap-4 items-center">
                        <div className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-colors duration-300 border ${
                          darkMode ? 'bg-[#181615] border-white/10' : 'bg-[#ECE7E2] border-[#1A1A1A]/10'
                        }`}>
                          <img 
                            src={currentImgVal}
                            onError={(e) => {
                              e.currentTarget.src = fallbackImgVal;
                              e.currentTarget.onerror = null;
                            }}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="relative">
                            <input 
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      handleImageUpdate(item.key, event.target.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                              id={`upload-input-${item.key}`}
                            />
                            <button className={`w-full px-3 py-1.5 border rounded-lg text-[10px] font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              darkMode 
                                ? 'border-white/20 text-white hover:bg-white hover:text-[#1A1A1A]' 
                                : 'border-[#1A1A1A]/15 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                            }`}>
                              <Upload className="h-3 w-3" />
                              <span>Choose Local Image File</span>
                            </button>
                          </div>

                          <input 
                            type="text"
                            placeholder="Or paste any web photo URL..."
                            value={currentImgVal.startsWith('data:') ? '' : currentImgVal}
                            onChange={(e) => handleImageUpdate(item.key, e.target.value)}
                            className={`w-full px-3 py-1.5 rounded-lg text-[9px] font-mono outline-none border transition-colors ${
                              darkMode 
                                ? 'bg-[#181615] border-white/10 text-white focus:border-[#CD816E]' 
                                : 'bg-[#1A1A1A]/[0.02] border-[#1A1A1A]/10 text-[#1a1a1a] focus:border-[#CD816E]'
                            }`}
                          />
                        </div>
                      </div>

                      {isModified && (
                        <div className="flex justify-end p-0">
                          <button 
                            onClick={() => handleResetImage(item.key)}
                            className="text-[9px] font-bold text-[#CD816E] hover:underline uppercase tracking-wide cursor-pointer"
                          >
                            Reset To Default Route
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Action Triggers */}
              <div className={`p-6 border-t flex gap-4 transition-colors duration-300 ${
                darkMode ? 'border-white/10 bg-white/5' : 'border-[#1A1A1A]/10 bg-black/5'
              }`}>
                <button 
                  onClick={handleResetAll}
                  className={`flex-1 px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                    darkMode 
                      ? 'bg-[#121110] border-white/15 text-white hover:bg-white hover:text-[#1A1A1A]' 
                      : 'bg-white border-[#1A1A1A]/10 text-[#1a1a1a] hover:bg-black hover:text-white'
                  }`}
                  id="brand-suite-reset-all-btn"
                >
                  Reset All Assets
                </button>
                <button 
                  onClick={() => setConfigOpen(false)}
                  className={`flex-1 px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    darkMode 
                      ? 'bg-amber-100 text-[#121110] hover:bg-[#E8C0B0]' 
                      : 'bg-[#1A1A1A] text-white hover:bg-[#CD816E]'
                  }`}
                  id="brand-suite-apply-btn"
                >
                  Apply & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
