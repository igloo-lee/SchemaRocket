import React, { useState } from 'react';
import { Star, ChevronDown, MapPin, Phone, Clock, ShoppingBag, HelpCircle, Building2, Newspaper, TrendingUp, CheckCircle } from 'lucide-react';

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
                            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row gap-5 border border-slate-200 rounded-xl p-5 bg-white hover:shadow-lg transition-all duration-300">

                                    {/* 1. Product Image (Square & Specific URL) */}
                                    <div className="w-full sm:w-52 sm:h-52 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-slate-100 relative">
                                        <img
                                            src="https://us.technics.com/cdn/shop/files/EAH-A800_NonTextCarousels_01_2000x2000_aa2eef2b-7bd7-4800-936b-100d796ceb13_1800x.jpg?v=1745873069"
                                            alt="Technics EAH-A800"
                                            className="w-full h-full object-contain p-2"
                                        />
                                        {/* Optional: 'Sale' Badge */}
                                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                            SALE
                                        </div>
                                    </div>

                                    {/* 2. Rich Details (Right) */}
                                    <div className="flex-1 flex flex-col justify-center space-y-2 min-w-0">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                            <span className="font-medium text-slate-900">Technics Audio</span>
                                            <span>› headphones › wireless</span>
                                        </div>

                                        <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer leading-snug">
                                            Technics EAH-A800 Wireless Noise Cancelling Headphones
                                        </h3>

                                        <div className="flex items-center gap-2 text-sm mt-1">
                                            <span className="font-bold text-slate-900">4.8</span>
                                            <div className="flex text-[#fbbc04]">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                            </div>
                                            <span className="text-slate-500">(1,240 reviews)</span>
                                        </div>

                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-xl font-bold text-slate-900">$299.00</span>
                                            <span className="text-sm text-slate-500 line-through">$349.00</span>
                                            <span className="text-sm text-[#188038] font-medium">In Stock</span>
                                        </div>

                                        <div className="text-sm text-slate-600 line-clamp-2 leading-relaxed mt-1">
                                            Legendary Technics sound quality with industry-leading noise cancelling, superior call quality, and multipoint Bluetooth connection.
                                        </div>
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
                            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                            <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col sm:flex-row gap-5 border border-slate-200 rounded-xl p-5 bg-white hover:shadow-lg transition-all duration-300">

                                    {/* 1. Map Visual (Left) */}
                                    <div className="w-full sm:w-52 sm:h-52 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 relative border border-slate-100">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/1003/7044/files/coffeeroaster_large.jpg?v=1505809797"
                                            alt="Map View"
                                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                        </div>
                                    </div>

                                    {/* 2. Rich Details (Right) */}
                                    <div className="flex-1 flex flex-col justify-center space-y-1.5 min-w-0">
                                        <h3 className="text-xl text-slate-900 font-semibold truncate">
                                            Downtown Coffee Roasters
                                        </h3>

                                        {/* Rating & Category */}
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <span className="font-bold text-slate-900">4.8</span>
                                            <div className="flex text-[#fbbc04]">
                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? 'fill-current' : 'text-slate-300'}`} />)}
                                            </div>
                                            <span className="text-slate-500">(450)</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-500 font-medium">Coffee Shop</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-500">$$</span>
                                        </div>

                                        {/* Address & Phone */}
                                        <div className="text-sm text-slate-600 truncate">
                                            123 Market St, San Francisco · (555) 012-3456
                                        </div>

                                        {/* Status & Hours */}
                                        <div className="text-sm flex items-center gap-1.5">
                                            <span className="text-green-700 font-bold">Open</span>
                                            <span className="text-slate-500">· Closes 8PM</span>
                                        </div>

                                        {/* Service Options (The "Rich" Part) */}
                                        <div className="text-xs text-slate-500 flex items-center gap-2 pt-0.5">
                                            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-600" /> Dine-in</span>
                                            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-600" /> Takeaway</span>
                                            <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-600" /> Delivery</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
                                            {['Website', 'Directions', 'Call'].map((btn) => (
                                                <button key={btn} className="px-3 py-1.5 rounded-full border border-slate-300 text-blue-700 text-xs font-bold hover:bg-blue-50 transition-colors">
                                                    {btn}
                                                </button>
                                            ))}
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
                            <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">

                                {/* Header */}
                                <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                                    <span className="text-base font-medium text-slate-700">Top stories</span>
                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                </div>

                                {/* 3 Cards Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    {/* Card 1: AI Search */}
                                    <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                        <div className="h-32 overflow-hidden relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                                                alt="AI Search"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-3 flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-semibold text-slate-900">SearchEngineLand</span>
                                                <span>• 2h ago</span>
                                            </div>
                                            <h4 className="text-sm font-medium text-[#1a0dab] group-hover:underline leading-snug line-clamp-3">
                                                How AI Search Agents Are Changing Discovery Forever
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Card 2: GEO */}
                                    <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                        <div className="h-32 overflow-hidden relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                                                alt="GEO Strategies"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-3 flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-semibold text-slate-900">TechCrunch</span>
                                                <span>• 4h ago</span>
                                            </div>
                                            <h4 className="text-sm font-medium text-[#1a0dab] group-hover:underline leading-snug line-clamp-3">
                                                Mastering GEO: Optimization for Generative Engines
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Card 3: SEO */}
                                    <div className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group">
                                        <div className="h-32 overflow-hidden relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                                                alt="Technical SEO"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-3 flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="font-semibold text-slate-900">Moz Blog</span>
                                                <span>• 5h ago</span>
                                            </div>
                                            <h4 className="text-sm font-medium text-[#1a0dab] group-hover:underline leading-snug line-clamp-3">
                                                Technical SEO in 2025: Why Structured Data is Key
                                            </h4>
                                        </div>
                                    </div>

                                </div>

                                {/* Floating Badge (Updated Position) */}
                                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3 flex items-center gap-2 animate-bounce z-10">
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
