import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

export const ProductPreview = ({ data }: { data: any }) => {
    // Helper to format currency if possible (simplified)
    const currencySymbol = data?.offers?.currency === 'USD' ? '$' :
        data?.offers?.currency === 'EUR' ? '€' :
            data?.offers?.currency === 'GBP' ? '£' :
                data?.offers?.currency;

    const price = Number(data?.offers?.price || 0);
    const originalPrice = Number(data?.offers?.originalPrice || 0);
    const hasSale = originalPrice > price;

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex gap-4 items-stretch font-sans">
            {/* Semantic Image Container - Responsive Height */}
            <div className="relative shrink-0 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-1 min-w-[128px]">
                {data?.image ? (
                    <img
                        src={data.image}
                        alt={data.name}
                        className="h-full w-auto max-w-[200px] object-contain rounded-lg"
                    />
                ) : (
                    <div className="w-32 h-full min-h-[128px] bg-gray-50 rounded-lg flex items-center justify-center text-gray-300">
                        <span className="text-xs font-bold uppercase tracking-wider">No Img</span>
                    </div>
                )}
                {/* Sale Badge */}
                {hasSale && (
                    <div className="absolute top-2 left-2 bg-[#202124] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm z-10">
                        SALE
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0 py-1 space-y-1">
                {/* Merchant / Brand / Condition */}
                <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-gray-500 font-medium truncate">
                        {data?.brand || 'Brand Name'} from {data?.offers?.merchantName || 'Your Store'}
                    </span>
                    {data?.offers?.itemCondition === 'New' && (
                        <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 uppercase tracking-wide">
                            New
                        </span>
                    )}
                    {data?.offers?.itemCondition === 'Used' && (
                        <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200 uppercase tracking-wide">
                            Used
                        </span>
                    )}
                    {data?.offers?.itemCondition === 'Refurbished' && (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 uppercase tracking-wide">
                            Refurbished
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-base font-medium text-gray-900 leading-snug line-clamp-2">
                    {data?.name || 'Product Title Placeholder'}
                </h3>

                {/* Rating - Compact UI */}
                <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-sm font-bold text-gray-700">{data?.reviews?.ratingValue || '4.5'}</span>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < Math.floor(data?.reviews?.ratingValue || 0) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">({data?.reviews?.reviewCount || 120})</span>
                </div>

                {/* Price Section */}
                <div className="mt-2 text-left">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#137333]">
                            {currencySymbol}{price.toFixed(2)}
                        </span>
                        {/* Original Price (Strikethrough) - Only if Sale */}
                        {hasSale && (
                            <span className="text-xs text-gray-500 line-through">
                                {currencySymbol}{originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    {/* Price Valid Until - Visual Feedback */}
                    {data?.offers?.priceValidUntil && (
                        <div className="text-xs text-gray-400 mt-0.5">
                            Sale ends: {data.offers.priceValidUntil}
                        </div>
                    )}
                </div>

                {/* Unified Info Row: Stock / Delivery / Returns */}
                <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                    {/* 1. Availability Status */}
                    {data?.offers?.availability === 'InStock' ? (
                        <span className="text-[#137333]">Available now</span>
                    ) : (
                        <span className="text-red-600">Out of Stock</span>
                    )}

                    {/* 2. Separator for Delivery (Show if Delivery info exists) */}
                    {(data?.offers?.hasFreeShipping || (data?.offers?.deliveryDays !== undefined && data?.offers?.deliveryDays > 0)) && (
                        <span className="text-gray-300">•</span>
                    )}

                    {/* 3. Delivery Badge */}
                    {(data?.offers?.hasFreeShipping || (data?.offers?.deliveryDays !== undefined && data?.offers?.deliveryDays > 0)) && (
                        <span>
                            � {data?.offers?.hasFreeShipping ? 'Free Delivery' : ''}
                            {data?.offers?.hasFreeShipping && data?.offers?.deliveryDays > 0 ? ' • ' : ''}
                            {data?.offers?.deliveryDays > 0 ? `Arrives in ${data.offers.deliveryDays} days` : ''}
                        </span>
                    )}

                    {/* 4. Separator for Returns (Show if Return info exists AND (Status OR Delivery exists - wait, Status always exists. So just show if Return info exists)) */}
                    {/* Logic: We always show Status. So if Return info exists, we need a separator before it? 
                         Wait, if Delivery exists, we have Status • Delivery • Returns.
                         If Delivery DOES NOT exist, we have Status • Returns.
                         So yes, if Return info exists, we always need a separator because Status is always there.
                      */}
                    {data?.offers?.returnDays !== undefined && data?.offers?.returnDays > 0 && (
                        <span className="text-gray-300">•</span>
                    )}

                    {/* 5. Returns Badge */}
                    {data?.offers?.returnDays !== undefined && data?.offers?.returnDays > 0 && (
                        <span>
                            🔄 {data?.offers?.hasFreeReturn ? `Free ${data.offers.returnDays}-day returns` : `${data.offers.returnDays}-day returns`}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
