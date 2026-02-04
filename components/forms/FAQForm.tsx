import React from 'react';
import { useFieldArray, Control, Controller } from 'react-hook-form';
import { Trash2, Plus, Info, MessageCircle } from 'lucide-react';

export const FAQForm = ({ control }: { control: Control<any> }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    return (
        <div className="space-y-3">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 flex gap-2 items-center text-xs text-blue-700">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <p>You can use HTML tags (e.g., &lt;a href="..."&gt;Link&lt;/a&gt;, &lt;b&gt;Bold&lt;/b&gt;) in the Answer field.</p>
            </div>

            {/* FAQ List Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-slate-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Q&A List</h4>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 relative group transition-all hover:border-slate-300 shadow-sm">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Question</label>
                            <Controller
                                control={control}
                                name={`items.${index}.question`}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        value={field.value ?? ''}
                                        autoComplete="off"
                                        className="w-full px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                        placeholder="e.g. What is your return policy?"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Answer</label>
                            <Controller
                                control={control}
                                name={`items.${index}.answer`}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        value={field.value ?? ''}
                                        autoComplete="off"
                                        rows={3}
                                        className="w-full px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none"
                                        placeholder="e.g. You can return items within 30 days..."
                                    />
                                )}
                            />
                        </div>
                    </div>
                ))}

                {fields.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-sm italic">
                        No questions added yet.
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => append({ question: '', answer: '' })}
                    className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 rounded-lg transition-colors border border-slate-300 border-dashed"
                >
                    <Plus className="w-4 h-4" /> Add Question
                </button>
            </div>
        </div>
    );
};
