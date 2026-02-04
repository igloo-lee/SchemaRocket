import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPreview = ({ data }: { data: any[] }) => {
    const [openIndices, setOpenIndices] = useState<number[]>([0, 1]); // Default first TWO items open
    const [showAll, setShowAll] = useState(false);

    const toggle = (index: number) => {
        setOpenIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    if (!data || data.length === 0) return <div className="text-slate-400 italic p-4">Add questions to see the preview.</div>;

    const visibleData = showAll ? data : data.slice(0, 2);
    const hasMore = data.length > 2;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-[#dadce0] overflow-hidden font-sans text-left">
            {/* Fake Search Result Header */}
            <div className="p-4 pb-0">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-7 h-7 bg-[#f1f3f4] rounded-full flex items-center justify-center border border-[#dadce0]">
                        <span className="text-[11px] font-bold text-[#5f6368]">ex</span>
                    </div>
                    <div className="flex flex-col leading-none gap-0.5">
                        <span className="text-sm text-[#202124] font-medium">Example Site</span>
                        <span className="text-xs text-[#4d5156]">https://www.example.com › faq</span>
                    </div>
                </div>
                <h3 className="text-[20px] text-[#1a0dab] hover:underline cursor-pointer truncate mb-1 font-normal leading-tight">
                    Frequently Asked Questions
                </h3>
            </div>

            {/* Accordion List - Mimicking Google Serps */}
            <div className="mt-2 border-t border-[#dadce0]">
                {visibleData.map((item: any, i: number) => (
                    <div key={i} className="border-b border-[#dadce0] last:border-0 hover:bg-[#f8f9fa] transition-colors group">
                        <div
                            onClick={() => toggle(i)}
                            className="flex justify-between items-start gap-4 p-3 cursor-pointer select-none"
                        >
                            <h4 className="flex-1 text-[16px] text-[#202124] font-medium leading-tight group-hover:text-[#1a0dab]">
                                {item.question || 'New Question'}
                            </h4>
                            <div className="mt-0.5">
                                {openIndices.includes(i)
                                    ? <ChevronUp className="w-5 h-5 text-[#5f6368] shrink-0" />
                                    : <ChevronDown className="w-5 h-5 text-[#5f6368] shrink-0" />
                                }
                            </div>
                        </div>

                        {openIndices.includes(i) && (
                            <div className="px-3 pb-3 text-sm text-[#4d5156] leading-snug">
                                <div dangerouslySetInnerHTML={{ __html: item.answer || 'Answer will appear here...' }} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Fake 'More results' for realism - Now Functional if needed or kept as visual trigger for full list */}
            {(!showAll && hasMore) && (
                <div
                    onClick={() => setShowAll(true)}
                    className="bg-[#f8f9fa] p-3 text-center border-t border-[#dadce0] cursor-pointer hover:bg-[#f1f3f4] transition-colors"
                >
                    <span className="text-sm font-medium text-[#202124] hover:underline">More results</span>
                </div>
            )}

            {/* If all shown or no more results, show static 'More results' simulating end of block or just hide */}
            {(showAll || !hasMore) && (
                <div className="bg-[#f8f9fa] p-3 text-center border-t border-[#dadce0]">
                    <span className="text-sm font-medium text-[#202124] cursor-pointer hover:underline">More results</span>
                </div>
            )}
        </div>
    );
};
