import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { AlignLeft, Calendar, User, Building } from 'lucide-react';

export const ArticleForm = ({ register, watch }: { register: UseFormRegister<any>, watch: any }) => {
    const type = watch('type');

    return (
        <div className="space-y-5">
            {/* Content Info Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-slate-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Content Info</h4>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Type</label>
                    <select
                        {...register('type')}
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                    >
                        <option value="Article">General Article</option>
                        <option value="NewsArticle">News Article</option>
                        <option value="BlogPosting">Blog Posting</option>
                    </select>
                    <p className="text-[10px] text-blue-600/80 flex items-center gap-1">
                        <span className="font-bold">ℹ️ Info:</span> NewsArticle allows specifying the reporting location for better local SEO.
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Headline</label>
                    <input
                        {...register('headline')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        placeholder="Article Title..."
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-slate-700">Image URL</label>
                        <div className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Rec: 1200×675px (16:9)</div>
                    </div>
                    <input
                        {...register('image')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        placeholder="https://example.com/news.jpg"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Canonical URL (Article Link)</label>
                    <input
                        {...register('url')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        placeholder="https://mysite.com/article/1"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Keywords (Comma separated)</label>
                    <input
                        {...register('keywords')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        placeholder="SEO, AI, Tech"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Short Description (AI Summary)</label>
                    <textarea
                        {...register('description')}
                        autoComplete="off"
                        rows={3}
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm resize-none"
                        placeholder="Brief summary for AI and search results..."
                    />
                </div>
            </div>

            {/* Author Box */}
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-3">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-widest">Author</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Author Name</label>
                        <input
                            {...register('authorName')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Author Type</label>
                        <select
                            {...register('authorType')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                        >
                            <option value="Person">Person</option>
                            <option value="Organization">Organization</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Author Profile URL</label>
                    <input
                        {...register('authorUrl')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm"
                        placeholder="https://example.com/author/john"
                    />
                </div>
            </div>

            {/* Publisher Box */}
            <div className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-100 space-y-3">
                <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-cyan-600" />
                    <h4 className="text-xs font-bold text-cyan-800 uppercase tracking-widest">Publisher</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Publisher Name</label>
                        <input
                            {...register('publisherName')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none text-sm"
                            placeholder="Daily News"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700">Publisher Logo URL</label>
                            <div className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Rec: 112×112px (Square)</div>
                        </div>
                        <input
                            {...register('publisherLogo')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none text-sm"
                            placeholder="https://example.com/logo.png"
                        />
                    </div>
                </div>
            </div>

            {/* Dates Box */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">Dates</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {/* Left: Published Date */}
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-slate-700 h-5">
                            Published
                        </label>
                        <input
                            type="date"
                            {...register('datePublished')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 outline-none text-sm"
                        />
                    </div>

                    {/* Right: Modified Date (Fixed Alignment) */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 h-5">
                            <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                                Modified Date
                            </label>
                            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                                Recommended for Freshness
                            </span>
                        </div>
                        <input
                            type="date"
                            {...register('dateModified')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-gray-200 focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 outline-none text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
