import React, { useState } from 'react';
import { Star, ChevronDown, MapPin, Phone, Clock, ShoppingBag, HelpCircle, Building2, Newspaper, TrendingUp } from 'lucide-react';

type ShowcaseTab = 'product' | 'faq' | 'local' | 'article';

export const ShowcaseSection = () => {
    const [activeTab, setActiveTab] = useState<ShowcaseTab>('product');

    const tabs = [
        { id: 'product', label: 'Product', icon: <ShoppingBag className="w-4 h-4" /> },
        { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
        { id: 'local', label: 'Local Business', icon: <Building2 className="w-4 h-4" /> },
        { id: 'article', label: 'Article', icon: <Newspaper className="w-4 h-4" /> },
    ];

    return (
        <section className="py-24 bg-slate-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-6">
                        <TrendingUp className="w-3.5 h-3.5" />
                        See the Impact
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Explore Supported Rich Results
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Select a category below to see how structured data transforms your appearance on Google Search.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as ShowcaseTab)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]'
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="relative max-w-4xl mx-auto">

                    {/* Mockup Container */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 md:p-8 min-h-[300px] flex items-center justify-center transition-all duration-500">

                        {/* Product Mockup */}
                        {activeTab === 'product' && (
                            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="w-full md:w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                        <ShoppingBag className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="text-xs text-slate-500">Example Store › products › electronics</div>
                                        <h3 className="text-xl text-blue-800 font-medium hover:underline cursor-pointer">
                                            Premium Wireless Noise-Cancelling Headphones
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <div className="flex text-amber-400">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                            </div>
                                            <span className="font-bold text-slate-700">4.9</span>
                                            <span className="text-slate-500">(2,400 reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <span className="font-bold text-slate-900">$299.00</span>
                                            <span className="text-green-700 font-medium">In Stock</span>
                                            <span className="text-slate-500 border-l border-slate-300 pl-3">Free shipping</span>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2">
                                            Experience crystal clear sound with our award-winning headphones. Features 30-hour battery life...
                                        </p>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3 flex items-center gap-2 animate-bounce">
                                    <span className="text-xl">📈</span>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold opacity-80 uppercase">Benefit</span>
                                        <span className="text-sm font-bold">+20% Click Rate</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQ Mockup */}
                        {activeTab === 'faq' && (
                            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-3">
                                    <div className="text-xs text-slate-500">Example Site › support › faq</div>
                                    <h3 className="text-xl text-blue-800 font-medium hover:underline cursor-pointer mb-4">
                                        Common Questions about SEO
                                    </h3>
                                    {/* Accordion Item 1 */}
                                    <div className="border-t border-slate-200 pt-3">
                                        <div className="flex justify-between items-center text-slate-800 font-medium text-sm cursor-pointer">
                                            <span>What is structured data?</span>
                                            <ChevronDown className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <p className="text-sm text-slate-600 mt-2 pl-4 border-l-2 border-slate-100">
                                            Structured data is a standardized format for providing information about a page and classifying the page content...
                                        </p>
                                    </div>
                                    {/* Accordion Item 2 */}
                                    <div className="border-t border-slate-200 pt-3">
                                        <div className="flex justify-between items-center text-slate-800 font-medium text-sm cursor-pointer">
                                            <span>How does JSON-LD help SEO?</span>
                                            <ChevronDown className="w-4 h-4 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-2 flex items-center gap-2 animate-bounce">
                                    <span className="text-xl">🏆</span>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold opacity-80 uppercase">Benefit</span>
                                        <span className="text-sm font-bold">Dominate Space</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Local Business Mockup */}
                        {activeTab === 'local' && (
                            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex gap-4 p-4 border border-slate-200 rounded-lg">
                                    <div className="w-24 h-24 bg-slate-100 rounded-md flex items-center justify-center shrink-0">
                                        <MapPin className="w-8 h-8 text-red-500" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="text-lg text-slate-900 font-medium">Downtown Coffee Roasters</h3>
                                        <div className="flex items-center gap-1 text-sm text-slate-600">
                                            <span className="text-orange-500 font-bold">4.8</span>
                                            <div className="flex text-orange-500">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                            </div>
                                            <span className="text-slate-400">(450) · Coffee Shop</span>
                                        </div>
                                        <div className="text-sm text-slate-600">123 Market St · (555) 012-3456</div>
                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <span className="text-green-700 font-medium">Open</span>
                                            <span className="text-slate-500">· Closes 8PM</span>
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <button className="px-4 py-1 rounded-full border border-slate-300 text-blue-700 text-xs font-semibold hover:bg-slate-50">Website</button>
                                            <button className="px-4 py-1 rounded-full border border-slate-300 text-blue-700 text-xs font-semibold hover:bg-slate-50">Directions</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-2 flex items-center gap-2 animate-bounce">
                                    <span className="text-xl">📍</span>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold opacity-80 uppercase">Benefit</span>
                                        <span className="text-sm font-bold">Physical Traffic</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Article Mockup */}
                        {activeTab === 'article' && (
                            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm font-medium text-slate-900">Top stories</span>
                                    <ChevronDown className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="flex gap-4">
                                    {/* Story Card 1 */}
                                    <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="h-32 bg-slate-100 flex items-center justify-center">
                                            <Newspaper className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <div className="p-3 bg-white space-y-2">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-semibold text-slate-900">TechDaily</span>
                                                <span>· 2 hours ago</span>
                                            </div>
                                            <h4 className="text-sm font-medium text-blue-800 hover:underline leading-snug">
                                                The Future of AI in Web Development: 2025 Outlook
                                            </h4>
                                        </div>
                                    </div>
                                    {/* Story Card 2 (Partial) */}
                                    <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden shadow-sm opacity-60 hidden md:block">
                                        <div className="h-32 bg-slate-50"></div>
                                        <div className="p-3 bg-white space-y-2">
                                            <div className="w-20 h-3 bg-slate-100 rounded"></div>
                                            <div className="w-full h-4 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-6 flex items-center gap-2 animate-bounce">
                                    <span className="text-xl">📰</span>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold opacity-80 uppercase">Benefit</span>
                                        <span className="text-sm font-bold">Top Stories Carousel</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

                </div>
            </div>
        </section>
    );
};
