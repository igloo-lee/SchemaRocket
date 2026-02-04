import React from 'react';
import { Globe, MoreVertical } from 'lucide-react';

// Dynamic Badge Color
const getBadgeColor = (type?: string) => {
    if (type === 'NewsArticle') return 'bg-red-600';
    if (type === 'BlogPosting') return 'bg-orange-500';
    return 'bg-blue-600';
};

export const ArticlePreview = ({ data }: { data: any }) => {
    // Helper to format date
    const displayDate = data?.dateModified || data?.datePublished || new Date().toISOString().split('T')[0];
    const publisher = data?.publisherName || "Publisher Name";

    return (
        <div className="space-y-8 font-sans">

            {/* 1. Top Stories Card (Rich Result) */}
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Google "Top Stories" Card</h4>
                <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    {/* Image Area */}
                    <div className="h-48 sm:h-56 bg-slate-100 relative">
                        {data?.image ? (
                            <img src={data.image} alt="Article" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                <span className="text-sm">No Image</span>
                            </div>
                        )}
                        <div className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${getBadgeColor(data?.type)}`}>
                            {data?.type || 'Article'}
                        </div>
                    </div>
                    {/* Content Area */}
                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                            {data?.publisherLogo ? (
                                <img src={data.publisherLogo} className="w-4 h-4 rounded-full object-cover" alt="Logo" />
                            ) : (
                                <Globe className="w-4 h-4 text-slate-400" />
                            )}
                            <span className="font-medium uppercase text-[10px]">{publisher}</span>
                            <span className="text-slate-400">• 2 hours ago</span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 leading-snug hover:text-blue-700 hover:underline">
                            {data?.headline || "Your Article Headline Appears Here"}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>By {data?.authorName || "Author"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Standard Search Result (AEO View) */}
            <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Standard Search Result</h4>
                <div className="w-full bg-white p-4 rounded-lg border border-slate-100">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center overflow-hidden">
                            {data?.publisherLogo ? (
                                <img src={data.publisherLogo} className="w-full h-full object-cover" />
                            ) : (
                                <Globe className="w-4 h-4 text-slate-500" />
                            )}
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm text-slate-900 font-medium">{publisher}</span>
                            <span className="text-xs text-slate-500">{data?.url || "https://example.com/article"}</span>
                        </div>
                        <MoreVertical className="w-4 h-4 text-slate-400 ml-auto" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer mb-1">
                        {data?.headline || "Your Article Headline Appears Here"}
                    </h3>

                    {/* Description & Date */}
                    <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                        <span className="text-slate-500 mr-2">
                            {displayDate}
                            {data?.contentLocation && data.type === 'NewsArticle' && (
                                <span className="text-slate-700 font-medium"> — {data.contentLocation}</span>
                            )}
                            —
                        </span>
                        {data?.description || "This is the summary description that Google AI uses to understand your content. Make sure to include keywords here."}
                    </div>
                </div>
            </div>

        </div>
    );
};
