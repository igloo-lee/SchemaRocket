import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  HelpCircle,
  ShoppingBag,
  MapPin,
  Newspaper,
  Code,
  Menu,
  X,
  Github,
  Twitter,
  Rocket,
  Info
} from 'lucide-react';

// --- Components Import ---
import { HeroSection } from './components/HeroSection';
import { GuideSection } from './components/GuideSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import SchemaForm from './components/SchemaForm';
import PreviewPanel from './components/PreviewPanel';

// --- Types ---
type TabId = 'faq' | 'product' | 'local-business' | 'article';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

// --- Constants ---
const TABS: Tab[] = [
  { id: 'faq', label: 'Questions & Answers', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'product', label: 'Product & Stars', icon: <ShoppingBag className="w-4 h-4" /> },
  { id: 'local-business', label: 'Local Business', icon: <MapPin className="w-4 h-4" /> },
  { id: 'article', label: 'News Article', icon: <Newspaper className="w-4 h-4" /> },
];

// --- Helper: ClassName Merger ---
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// --- Sub-Components (Header/Footer) ---

const Header = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="w-full px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        {/* Brand Logo Area */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Go to Home"
        >
          {/* Icon: Rocket */}
          <div className="relative flex items-center justify-center w-10 h-10 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
            <Rocket className="w-6 h-6 text-blue-600 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>

          {/* Text Logo */}
          <div className="flex flex-col items-start leading-none">
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              SchemaRocket
            </span>
            <span className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mt-0.5 group-hover:text-blue-500/80 transition-colors">
              for A.I Search
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#3182F6] transition-colors">Home</button>
          <a href="#" className="hover:text-[#3182F6] transition-colors">Documentation</a>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors text-xs font-semibold"
          >
            Get Started
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 p-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-sm font-medium text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-left hover:text-[#3182F6]">Home</button>
            <a href="#" className="hover:text-[#3182F6]">Documentation</a>
            <hr className="border-slate-100" />
            <button onClick={() => { onGetStarted(); setIsMobileMenuOpen(false); }} className="text-[#3182F6] font-semibold text-left">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-8">
    <div className="w-full px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-sm text-slate-500 text-center md:text-left">
        © {new Date().getFullYear()} SchemaRocket. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="text-slate-400 hover:text-slate-600 transition-colors">
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

const TabNavigation = ({ activeTab, onTabChange }: { activeTab: TabId; onTabChange: (id: TabId) => void }) => {
  return (
    <div className="w-full border-b border-slate-200 bg-white sticky top-[64px] z-40"> {/* Sticky below header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="flex justify-start gap-8 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200",
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState<TabId>('faq');
  const [formData, setFormData] = useState<any>(null);

  // Smooth Scroll Function
  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white">
      {/* 1. Header */}
      <Header onGetStarted={scrollToGenerator} />

      {/* 2. Landing Sections */}
      <HeroSection />
      <ShowcaseSection />
      <GuideSection />

      {/* 3. Generator Tool Area */}
      <div id="generator" className="w-full bg-white flex flex-col min-h-screen scroll-mt-16">

        <TabNavigation activeTab={activeTab} onTabChange={(id) => {
          setActiveTab(id);
          setFormData(null);
        }} />

        {/* Content Area (Form + Preview) */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-8 py-8 md:py-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start relative">

            {/* Left: Configuration Form */}
            <div className="w-full lg:w-1/2 min-w-0">
              {/* SINGLE SOURCE OF TITLE */}
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'local-business' && 'Local Business Configuration'}
                  {activeTab === 'product' && 'Product & Stars Configuration'}
                  {activeTab === 'faq' && 'FAQ Configuration'}
                  {activeTab === 'article' && 'News & Article Configuration'}
                </h2>
                <p className="text-slate-500 mt-2 text-lg">
                  Enter the details below to generate your structured data for A.I Search.
                </p>
              </div>

              <SchemaForm
                activeTab={activeTab}
                onDataChange={setFormData}
              />
            </div>

            {/* Right: Preview Panel */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-24 z-10">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                {/* 1. Unified Header Section */}
                <div className="px-5 pt-5 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 bg-blue-100 rounded text-blue-600">
                      <Info className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Visual Preview
                    </h3>
                  </div>
                  {/* Disclaimer moved here for alignment */}
                  <p className="text-xs text-slate-400">
                    The images below are for illustration purposes only and may differ from the actual Google search results.
                  </p>
                </div>

                {/* 2. Content Body (Padding matches Header px-5) */}
                <div className="p-5">
                  <PreviewPanel
                    activeTab={activeTab}
                    data={formData}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
