import React from 'react';
import { LayoutGrid, PenTool, Rocket, ArrowDown } from 'lucide-react';

export const GuideSection = () => {
    const scrollToGenerator = () => {
        document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    };

    const steps = [
        {
            num: "01",
            icon: <LayoutGrid className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />,
            title: "Select Category",
            text: "Choose from Product, Article, FAQ, or Local Business to match your content type perfectly."
        },
        {
            num: "02",
            icon: <PenTool className="w-8 h-8 text-white group-hover:rotate-12 transition-transform duration-300" />,
            title: "Fill & Visualize",
            text: "Enter your details in the simple form and watch the Google Snippet preview update instantly in real-time."
        },
        {
            num: "03",
            icon: <Rocket className="w-8 h-8 text-white group-hover:-translate-y-1 transition-transform duration-300" />,
            title: "Deploy & Rank",
            text: "Copy the clean, validated JSON-LD code and paste it into your site to start winning Rich Results."
        }
    ];

    return (
        <section className="relative py-24 md:py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white border-b border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                        How to Dominate Search
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Transform your content into rich results in three simple steps.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

                    {/* Connector Lines */}
                    {/* Desktop: Horizontal Line running through the top part where icons are */}
                    {/* Position: top-16 aligns roughly with the center of the 16+16+32 = 64px vertical area of icon? No. Icon is top-8 inside card. */}
                    {/* Let's just place it visually behind the cards roughly where the icons sit */}
                    <div className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-0.5 border-t-2 border-dashed border-blue-200/60 -z-10" />

                    {/* Mobile: Vertical Line on the left */}
                    <div className="md:hidden absolute top-8 bottom-8 left-8 w-0.5 border-l-2 border-dashed border-blue-200/60 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="group relative bg-white/80 backdrop-blur-sm border border-slate-100 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">

                            {/* Watermark Number */}
                            <div className="absolute top-4 right-6 text-8xl font-black text-slate-100/50 -z-10 select-none font-sans">
                                {step.num}
                            </div>

                            {/* Floating Icon Bubble */}
                            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white mb-8 group-hover:shadow-blue-500/40 transition-shadow">
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Transition Arrow */}
                <div className="flex justify-center">
                    <button
                        onClick={scrollToGenerator}
                        className="group flex flex-col items-center gap-3 text-slate-400 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                    >
                        <span className="text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            Start Building Now
                        </span>
                        <div className="p-3 rounded-full bg-white border border-slate-200 shadow-sm group-hover:shadow-md transition-all group-hover:scale-110 animate-bounce">
                            <ArrowDown className="w-5 h-5" />
                        </div>
                    </button>
                </div>

            </div>
        </section>
    );
};
