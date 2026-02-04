import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, CheckCircle2, Search, Code2 } from 'lucide-react';

const Typewriter = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor effect
    useEffect(() => {
        const timeout = setTimeout(() => setBlink(!blink), 500);
        return () => clearTimeout(timeout);
    }, [blink]);

    // Typing logic
    useEffect(() => {
        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1500); // Wait before deleting
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150); // Typing speed vs deleting speed

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="inline-flex items-center">
            {words[index].substring(0, subIndex)}
            <span className={`ml-1 w-0.5 h-8 md:h-12 bg-blue-600 ${blink ? 'opacity-100' : 'opacity-0'}`}></span>
        </span>
    );
};

export const HeroSection = () => {
    const scrollToGenerator = () => {
        document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200">
            {/* Dynamic Background Mesh */}
            <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-32 md:pb-32">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Column: Copy & Action */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            🚀 Boost your CTR by 30%
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight animate-in fade-in slide-in-from-bottom-3 duration-700 min-h-[160px] md:min-h-[220px]">
                            Generate <br />
                            <span className="text-blue-600">
                                <Typewriter words={["Product", "FAQ", "Local Business", "Article"]} />
                            </span> <br />
                            Schema
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            Generate SEO-optimized JSON-LD schema in seconds. <br className="hidden md:block" />
                            <span className="font-medium text-slate-900">No coding required.</span> Just fill, copy, and rank.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            <button
                                onClick={scrollToGenerator}
                                className="group relative px-8 py-4 bg-slate-900 hover:bg-black text-white text-lg font-bold rounded-full shadow-2xl shadow-blue-900/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 overflow-hidden"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                Start Building for Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                No credit card needed
                            </div>
                        </div>

                        {/* Trusted By Strip */}
                        <div className="pt-8 border-t border-slate-200/60 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compatible With</span>
                            <div className="flex gap-4 font-bold text-slate-500">
                                <span>Google</span>
                                <span>Bing</span>
                                <span>Schema.org</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Immersive Visual */}
                    <div className="flex-1 relative w-full max-w-xl lg:max-w-none animate-in fade-in slide-in-from-right-4 duration-1000">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-[2rem] transform rotate-3 scale-105 blur-2xl"></div>

                        {/* Main Glass Container */}
                        <div className="relative">

                            {/* Layer 1: The 'Code' (Back Layer) */}
                            <div className="absolute top-4 -left-4 md:-left-12 -right-4 md:-right-4 h-full bg-slate-900 rounded-2xl p-6 shadow-2xl transform -rotate-2 opacity-90 scale-95 border border-slate-700/50">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="space-y-2 font-mono text-[10px] md:text-xs text-slate-400 opacity-50 select-none">
                                    <p><span className="text-purple-400">"@context"</span>: <span className="text-green-400">"https://schema.org"</span>,</p>
                                    <p><span className="text-purple-400">"@type"</span>: <span className="text-green-400">"Product"</span>,</p>
                                    <p><span className="text-purple-400">"name"</span>: <span className="text-green-400">"Ultra Wireless Headphones"</span>,</p>
                                    <p><span className="text-purple-400">"aggregateRating"</span>: {"{"}</p>
                                    <p className="pl-4"><span className="text-purple-400">"@type"</span>: <span className="text-green-400">"AggregateRating"</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">"ratingValue"</span>: <span className="text-blue-400">"4.8"</span>,</p>
                                    <p className="pl-4"><span className="text-purple-400">"reviewCount"</span>: <span className="text-blue-400">"1250"</span></p>
                                    <p>{"}"}</p>
                                </div>
                            </div>

                            {/* Layer 2: The 'Result' (Floating Front Layer) */}
                            <div className="relative bg-white rounded-xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 backdrop-blur-sm animate-[bounce_6s_infinite_ease-in-out]">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">A</div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-800 font-medium">Acme Electronics</span>
                                        <span className="text-[10px] text-slate-500">https://www.acme.com › products</span>
                                    </div>
                                </div>

                                <h3 className="text-blue-800 text-lg md:text-xl font-medium hover:underline cursor-pointer mb-1">
                                    Ultra Wireless Noise-Cancelling Headphones - Black
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                                    <div className="flex text-amber-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <span className="font-bold text-slate-800">4.8</span>
                                    <span>(1,250 reviews)</span>
                                    <span className="font-bold text-slate-900 ml-2">$299.00</span>
                                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wide">In Stock</span>
                                </div>

                                <p className="text-sm text-slate-500 leading-snug">
                                    Experience premium sound quality with our latest noise-cancelling technology. 30-hour battery life, plush comfort...
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
