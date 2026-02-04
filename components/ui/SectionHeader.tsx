import React from 'react';

export const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 mb-4 mt-6 first:mt-0">
        <Icon className="w-4 h-4 text-slate-500" />
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">{title}</h4>
    </div>
);
