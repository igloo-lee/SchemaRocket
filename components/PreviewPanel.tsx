import React, { useState, useMemo } from 'react';
import { CheckCircle2, Copy, ChevronDown, ChevronUp, ExternalLink, Code2, AlertCircle } from 'lucide-react';
import { generateFAQSchema, generateProductSchema, generateLocalBusinessSchema, generateArticleSchema } from '../utils/schemaGenerator';
import clsx from 'clsx';
import { FAQPreview } from './previews/FAQPreview';
import { ProductPreview } from './previews/ProductPreview';
import { LocalBusinessPreview } from './previews/LocalBusinessPreview';
import { ArticlePreview } from './previews/ArticlePreview';

type TabId = 'faq' | 'product' | 'local-business' | 'article';

interface PreviewPanelProps {
    activeTab: TabId;
    data: any;
}

const PreviewPanel = ({ activeTab, data }: PreviewPanelProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isCodeOpen, setIsCodeOpen] = useState(true); // Default open
    const [includeScriptTag, setIncludeScriptTag] = useState(true);

    const generatedCode = useMemo(() => {
        if (!data) return '';
        let jsonString = '';
        try {
            switch (activeTab) {
                case 'faq':
                    jsonString = generateFAQSchema(data);
                    break;
                case 'product':
                    jsonString = generateProductSchema(data);
                    break;
                case 'local-business':
                    jsonString = generateLocalBusinessSchema(data);
                    break;
                case 'article':
                    jsonString = generateArticleSchema(data);
                    break;
                default:
                    jsonString = '{}';
            }
        } catch (e) {
            console.error("Schema Gen Error", e);
            return '{}';
        }

        if (includeScriptTag) {
            return `<script type="application/ld+json">\n${jsonString}\n</script>`;
        }
        return jsonString;
    }, [activeTab, data, includeScriptTag]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(generatedCode);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy logic', err);
        }
    };

    const handleTestInGoogle = () => {
        window.open('https://search.google.com/test/rich-results?hl=en', '_blank');
    };

    return (
        <div className="w-full h-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto space-y-8">

                {/* Visual Preview Section */}
                <div>

                    {/* Dynamic Preview Component */}
                    <div className="transition-all duration-300">
                        {activeTab === 'faq' && <FAQPreview data={data} />}
                        {activeTab === 'product' && <ProductPreview data={data} />}
                        {activeTab === 'local-business' && <LocalBusinessPreview data={data} />}
                        {activeTab === 'article' && <ArticlePreview data={data} />}
                    </div>
                </div>

                {/* Smart Code Viewer Section */}
                <div className="space-y-0 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50">

                    {/* Sticky Action Header */}
                    <div className="bg-slate-900 p-3 sm:px-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-700/50">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-slate-200 font-mono text-sm font-semibold">
                                <Code2 className="w-4 h-4 text-blue-400" />
                                <span>JSON-LD</span>
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer select-none group">
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${includeScriptTag ? 'bg-blue-500 border-blue-500' : 'border-slate-500 bg-transparent group-hover:border-slate-400'}`}>
                                    {includeScriptTag && <ChevronDown className="w-3 h-3 text-white" strokeWidth={4} />}
                                </div>
                                <span className="text-xs text-slate-400 font-medium group-hover:text-slate-300 transition-colors">Include &lt;script&gt;</span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={includeScriptTag}
                                    onChange={(e) => setIncludeScriptTag(e.target.checked)}
                                />
                            </label>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleTestInGoogle}
                                title="Test in Google Rich Results"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-all"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Test on Google</span>
                                <span className="sm:hidden">Test</span>
                            </button>
                            <button
                                onClick={handleCopy}
                                className={clsx(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative group",
                                    isCopied
                                        ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50"
                                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                                )}
                            >
                                {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {isCopied ? "Copied! Test Now →" : "Copy Code"}

                                {isCopied && (
                                    <div className="absolute top-full right-0 mt-2 w-max px-3 py-1.5 bg-slate-800 text-white text-[10px] rounded-md shadow-xl border border-slate-700 animate-in fade-in slide-in-from-top-1 z-50">
                                        Head to Google to validate!
                                    </div>
                                )}
                            </button>
                            <button
                                onClick={() => setIsCodeOpen(!isCodeOpen)}
                                className="ml-1 p-1.5 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-md transition-all border border-transparent hover:border-slate-700"
                            >
                                {isCodeOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Collapsible Code Area */}
                    <div className={clsx(
                        "bg-[#0F172A] transition-all duration-300 ease-in-out overflow-hidden origin-top",
                        isCodeOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="p-4 overflow-x-auto">
                            <pre className="font-mono text-xs sm:text-sm leading-relaxed text-emerald-400/90 whitespace-pre-wrap selection:bg-emerald-500/30 break-all">
                                <code>{generatedCode}</code>
                            </pre>
                        </div>
                    </div>

                    {/* Collapsed State Hint */}
                    {!isCodeOpen && (
                        <div
                            onClick={() => setIsCodeOpen(true)}
                            className="bg-[#0F172A] p-2 text-center cursor-pointer hover:bg-slate-900 transition-colors border-t border-slate-800/50 group"
                        >
                            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                <Code2 className="w-3 h-3" /> Click to view code
                            </span>
                        </div>
                    )}
                </div>

                {/* Extra padding at bottom for aesthetic breathing room */}
                <div className="h-12"></div>
            </div>
        </div>
    );
};

export default PreviewPanel;
