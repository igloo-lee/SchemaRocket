import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Info, Lightbulb } from 'lucide-react';
import { FAQItem, ProductData, LocalBusinessData, ArticleData } from '../utils/schemaGenerator';

import { FAQForm } from './forms/FAQForm';
import { ProductForm } from './forms/ProductForm';
import { LocalBusinessForm } from './forms/LocalBusinessForm';
import { ArticleForm } from './forms/ArticleForm';

type TabId = 'faq' | 'product' | 'local-business' | 'article';

interface SchemaFormProps {
    activeTab: TabId;
    onDataChange: (data: any) => void;
}

export default function SchemaForm({ activeTab, onDataChange }: SchemaFormProps) {
    const { register, control, reset, watch } = useForm({
        mode: 'onChange',
        shouldUnregister: true
    });

    const watchedValues = useWatch({ control });

    useEffect(() => {
        // When tab changes, reset form with appropriate default values
        if (activeTab === 'faq') {
            const defaultFAQ: { items: FAQItem[] } = {
                items: [
                    { id: '1', question: '', answer: '' }
                ]
            };
            reset(defaultFAQ);
            onDataChange(defaultFAQ.items);
        } else if (activeTab === 'product') {
            const defaultProduct: ProductData = {
                name: '',
                image: '',
                reviews: { ratingValue: 4.5, reviewCount: 100 },
                offers: {
                    price: '0.00',
                    currency: 'USD',
                    availability: 'InStock',
                    itemCondition: 'New',
                    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Default +1 year
                    returnDays: undefined,
                    deliveryDays: undefined,
                    hasFreeReturn: false,
                    hasFreeShipping: false
                }
            };
            reset(defaultProduct);
            onDataChange(defaultProduct);
        } else if (activeTab === 'local-business') {
            const defaultLocal: LocalBusinessData = {
                category: 'Dining',
                name: '',
                image: '',
                type: 'LocalBusiness',
                telephone: '',
                email: '',
                address: { street: '', city: '', zip: '', country: 'US' },
                openingHours: [
                    { dayOfWeek: [], opens: '09:00', closes: '17:00' }
                ],
                sameAs: [],
                priceRange: ''
            };
            reset(defaultLocal);
            onDataChange(defaultLocal);
        } else if (activeTab === 'article') {
            const defaultArticle: ArticleData = {
                type: 'Article',
                headline: '',
                image: '',
                authorName: '',
                authorType: 'Person',
                publisherName: '',
                datePublished: new Date().toISOString().split('T')[0]
            };
            reset(defaultArticle);
            onDataChange(defaultArticle);
        }
    }, [activeTab, reset, onDataChange]);

    useEffect(() => {
        if (activeTab === 'faq') {
            onDataChange(watchedValues.items || []);
        } else {
            onDataChange(watchedValues);
        }
    }, [watchedValues, activeTab, onDataChange]);

    const tabTitles: Record<TabId, string> = {
        'faq': 'FAQ',
        'product': 'Product',
        'local-business': 'Local Business',
        'article': 'Article'
    };

    const guideMessages: Record<TabId, string> = {
        'product': "Price and stock visibility in Shopping tabs depends on Google Merchant Center policy compliance.",
        'faq': "Promotional text or repetitive Q&A may be filtered out from search results.",
        'local-business': "Map visibility works best when this data matches your Google Maps Business Profile.",
        'article': "Optimized for news/blogs. AMP or mobile-friendliness affects actual visibility."
    };

    return (
        <div className="w-full bg-white">
            <div className="w-full space-y-8">
                {/* GBP Advisory Alert - Only for LocalBusiness */}

                {/* GBP Advisory Alert - Only for LocalBusiness */}
                {activeTab === 'local-business' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start shadow-sm">
                        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1 text-sm text-amber-900">
                            <h3 className="font-bold">💡 Important: Want to appear on Google Maps?</h3>
                            <p className="leading-relaxed opacity-90">
                                This code improves SEO. To appear on the map, you must register a <span className="font-bold underline decoration-amber-500/50">[Google Business Profile]</span>.
                                This tool links your site to that listing for better search visibility.
                            </p>
                        </div>
                    </div>
                )}

                {/* Google Search Visibility Guide */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 flex gap-2 items-start">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 text-sm text-blue-900">
                        <h3 className="font-semibold text-xs uppercase tracking-wide">Google Search Visibility Guide</h3>
                        <p className="opacity-90 leading-snug text-xs">
                            This preview is a simulation. Actual appearance in search results depends on Google's algorithms.
                            {guideMessages[activeTab] && (
                                <span className="block mt-0.5 font-medium text-blue-800">
                                    {guideMessages[activeTab]}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                <form className="space-y-6">
                    {activeTab === 'faq' && <FAQForm control={control} />}
                    {activeTab === 'product' && <ProductForm register={register} watch={watch} />}
                    {activeTab === 'local-business' && <LocalBusinessForm register={register} control={control} watch={watch} />}
                    {activeTab === 'article' && <ArticleForm register={register} watch={watch} />}
                </form>
            </div>
        </div>
    );
}
