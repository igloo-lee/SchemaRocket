import React, { useEffect, useState } from 'react';
import { Book, CheckCircle, Globe, MapPin, ShoppingBag, HelpCircle, ArrowRight, Terminal, Menu, X, Lightbulb, Search, Cpu, Code2 } from 'lucide-react';

interface DocumentationProps {
    onGoHome?: () => void;
}

const Documentation = ({ onGoHome }: DocumentationProps) => {
    const [activeSection, setActiveSection] = useState<string>('section-0');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section, header');
            let current = '';
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id') || '';
                }
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            setIsMobileMenuOpen(false);
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'section-0', label: 'Start Here' },
        { id: 'section-1', label: '1. Why AI Cant Read' },
        { id: 'section-2', label: '2. From SEO to GEO' },
        { id: 'section-3', label: '3. The 4 Main Schemas' },
        { id: 'section-4', label: '4. How to Implement' },
        { id: 'section-5', label: '5. Verification' },
    ];

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-2">
                    <Book className="w-5 h-5 text-blue-600" /> <span className="text-lg">Documentation</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 overflow-y-auto">
                    <nav className="space-y-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block text-xl font-medium text-slate-700 w-full text-left py-3 border-b border-slate-100"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button onClick={onGoHome} className="block text-xl font-bold text-blue-600 w-full text-left py-6 mt-4">
                            &larr; Back to Generator
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Wrapper */}
            <div className="max-w-[1600px] mx-auto px-5 md:px-8 lg:px-12">
                <div className="md:grid md:grid-cols-[280px_1fr] gap-16 relative">

                    {/* Sidebar (Desktop Sticky) */}
                    <aside className="hidden md:block h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto py-12 pr-6 scrollbar-hide">
                        <div className="mb-10">
                            <button
                                onClick={onGoHome}
                                className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-8 group"
                            >
                                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to App
                            </button>
                            <h5 className="text-base font-bold text-slate-400 uppercase tracking-widest pl-4">Guide Contents</h5>
                        </div>

                        <nav className="space-y-2 relative border-l border-slate-200 ml-2">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`block text-lg transition-all text-left w-full pl-5 py-3 border-l-[3px] -ml-[3px] ${isActive
                                            ? 'border-blue-600 text-blue-700 font-bold'
                                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 font-medium'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="py-12 md:py-20 min-w-0">
                        {/* Single Centered Container for Text - Max width 3xl for readability */}
                        <div className="max-w-3xl mx-auto space-y-32">

                            {/* Header */}
                            <header id="section-0" className="scroll-mt-32">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8">
                                    <Book className="w-3.5 h-3.5" /> Start Here
                                </div>
                                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                                    The Ultimate Guide to Schema & AI Search (GEO)
                                </h1>
                                <p className="text-2xl text-slate-500 font-light leading-relaxed">
                                    Stop guessing. Start speaking the language of Google and AI bots. Here is everything you need to know to future-proof your SEO.
                                </p>
                            </header>

                            {/* Section 1: The Why */}
                            <section id="section-1" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Your Website is Invisible to AI</h2>
                                </div>
                                <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-8 text-lg">
                                    <p className="mb-6">
                                        Imagine you are a librarian with 10 million new books arriving every day. You don't have time to read every single page. You scan the <strong>index cards</strong>.
                                    </p>
                                    <p className="mb-8">
                                        Google and AI bots (like ChatGPT) are exactly like that librarian. When they visit your website, they see a "wall of text." They have to guess what your price is, where your image is, and who the author is.
                                    </p>
                                    <div className="bg-slate-50 border-l-4 border-blue-500 p-8 my-8 rounded-r-xl">
                                        <p className="font-medium text-slate-800 italic">
                                            "Imagine handing a stranger a book and asking for a summary. That's traditional SEO. Now imagine handing them a summary card with bullet points. That's <strong>Schema Markup</strong>."
                                        </p>
                                    </div>
                                    <p>
                                        Without Schema, you are forcing the AI to guess. And when AI guesses, it often gets it wrong—or worse, it ignores you completely.
                                    </p>
                                </div>
                            </section>

                            {/* Section 2: GEO Opportunity */}
                            <section id="section-2" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">From SEO to GEO: Winning the AI Era</h2>
                                </div>

                                <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-8 text-lg mb-10">
                                    <p className="mb-6">
                                        We are shifting from <strong>SEO (Search Engine Optimization)</strong> to <strong>GEO (Generative Engine Optimization)</strong>.
                                    </p>
                                    <p>
                                        AI chatbots like Gemini and ChatGPT don't give users 10 blue links to choose from. They give <strong>one single answer</strong>. To be referenced in that answer, you must "spoon-feed" the AI with structured facts.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Old Way (SEO)</div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">The "Guessing Game"</h3>
                                        <p className="text-slate-600 mb-4">You write paragraphs of text hoping Google extracts the price.</p>
                                        <div className="bg-slate-100 p-4 rounded-lg text-sm font-mono text-slate-500">
                                            &lt;p&gt;We sell this great widget for only $20...&lt;/p&gt;
                                        </div>
                                    </div>
                                    <div className="bg-white p-8 rounded-2xl border border-blue-100 shadow-md ring-1 ring-blue-50">
                                        <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">New Way (GEO)</div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">The "Direct Feed"</h3>
                                        <p className="text-slate-600 mb-4">You explicitly tell the AI the facts using JSON-LD code.</p>
                                        <div className="bg-blue-50 p-4 rounded-lg text-sm font-mono text-blue-700">
                                            "price": "20.00",<br />
                                            "currency": "USD"
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 3: The 4 Schemas */}
                            <section id="section-3" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <Lightbulb className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">The 4 Pillars You Cannot Ignore</h2>
                                </div>
                                <p className="text-lg text-slate-700 mb-10 leading-8">
                                    There are hundreds of Schema types, but these 4 are the absolute essentials for modern business visibility.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Article & News</h3>
                                        <p className="text-slate-600 text-[15px] mb-4 leading-relaxed">
                                            Don't just write. Be the authority. Tells AI <strong>who</strong> wrote this, <strong>when</strong> it was published, and that it's a credible source.
                                        </p>
                                    </div>

                                    <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                                            <ShoppingBag className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Product</h3>
                                        <p className="text-slate-600 text-[15px] mb-4 leading-relaxed">
                                            Turn search results into storefronts. Show <strong>Price</strong>, <strong>Stars</strong>, and <strong>Stock Status</strong> directly in the search result before they even click.
                                        </p>
                                    </div>

                                    <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 text-green-600 group-hover:scale-110 transition-transform">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Local Business</h3>
                                        <p className="text-slate-600 text-[15px] mb-4 leading-relaxed">
                                            Put your shop on the map. Literally. Feed your exact <strong>coordinates</strong>, <strong>opening hours</strong>, and <strong>contact info</strong> directly to AI maps and assistants.
                                        </p>
                                    </div>

                                    <div className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group">
                                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                                            <HelpCircle className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">FAQ</h3>
                                        <p className="text-slate-600 text-[15px] mb-4 leading-relaxed">
                                            Dominate the screen. Take up more pixel space in search results and provide direct answers for <strong>Voice Search</strong> queries.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4: Implementation */}
                            <section id="section-4" className="scroll-mt-32">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How to Implement (No Coding Required)</h2>
                                </div>

                                <div className="relative border-l-2 border-slate-100 ml-4 space-y-12 pl-12">
                                    <div className="relative">
                                        <span className="absolute -left-[53px] top-1 w-8 h-8 rounded-full bg-blue-600 border-[3px] border-white shadow-md flex items-center justify-center text-sm text-white font-bold">1</span>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Generate</h3>
                                        <p className="text-lg text-slate-600 leading-8">Use our tool on the homepage. Fill in the blanks. We format everything correctly for you automatically.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[53px] top-1 w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-sm text-slate-500 font-bold">2</span>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Copy</h3>
                                        <p className="text-lg text-slate-600 leading-8">Click the blue "Copy" button. You now have a block of code called <strong>JSON-LD</strong>.</p>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute -left-[53px] top-1 w-8 h-8 rounded-full bg-white border-2 border-slate-300 flex items-center justify-center text-sm text-slate-500 font-bold">3</span>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Paste</h3>
                                        <p className="text-lg text-slate-600 leading-8 mb-6">
                                            Paste that code into the <code>&lt;head&gt;</code> section of your website.
                                        </p>
                                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 inline-block">
                                            <p className="text-sm font-medium text-slate-500 mb-1 uppercase tracking-wider">Comforting Note for Non-Devs:</p>
                                            <p className="text-slate-800 italic">"You don't need to understand the code. You just need to copy and paste it, like a YouTube embed code."</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5: Verification */}
                            <section id="section-5" className="scroll-mt-32 pb-20">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                                    <span className="text-green-600">5.</span> Verification
                                </h2>
                                <div className="bg-green-50 rounded-[2rem] p-10 md:p-12 border border-green-100 text-center">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">One Last Step: The "Green Check"</h3>
                                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-8">
                                        Before you celebrate, you must ensure Google explicitly accepts your data. Use their official tool to look for the green checkmark.
                                    </p>
                                    <a
                                        href="https://search.google.com/test/rich-results"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 bg-white text-green-700 font-bold text-lg py-4 px-8 rounded-xl border border-green-200 hover:border-green-400 hover:shadow-lg hover:-translate-y-1 transition-all"
                                    >
                                        <CheckCircle className="w-5 h-5" /> Open Rich Results Test
                                    </a>
                                </div>

                                {/* Footer CTA */}
                                <div className="pt-24 mt-10 border-t border-slate-100 text-center">
                                    <h2 className="text-3xl font-bold mb-6 text-slate-900">Ready to speak AI?</h2>
                                    <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-light">
                                        Your competitors are still just writing text. Start structuring your data today.
                                    </p>
                                    <button
                                        onClick={onGoHome}
                                        className="bg-blue-600 text-white text-lg font-bold py-4 px-12 rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
                                    >
                                        Start Generating Now
                                    </button>
                                </div>
                            </section>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Documentation;