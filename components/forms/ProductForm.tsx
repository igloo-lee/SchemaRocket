import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Tag, Star, CreditCard, Truck } from 'lucide-react';

export const ProductForm = ({ register, watch }: { register: UseFormRegister<any>, watch: any }) => {
    // Keep watch just in case later, but visibility logic is removed as per previous requests.

    return (
        <div className="space-y-5">
            {/* Basic Info Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Basic Info</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Product Name</label>
                        <input
                            {...register('name')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="Ultra Wireless Headphones"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Product Brand (Manufacturer)</label>
                        <input
                            {...register('brand')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="AudioTech"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Store Name (Merchant)</label>
                        <input
                            {...register('offers.merchantName')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="e.g. Coupang, MyShop"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Image URL</label>
                        <input
                            {...register('image')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="https://example.com/product.jpg"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">SKU (Optional)</label>
                    <input
                        {...register('sku')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        placeholder="HEAD-001"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Description</label>
                    <textarea
                        {...register('description')}
                        autoComplete="off"
                        className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                        rows={3}
                        placeholder="Detailed product description..."
                    />
                </div>
            </div>

            {/* Offer Details Box */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Offer Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Sale Price</label>
                        <input
                            {...register('offers.price')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                            placeholder="199.99"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Original Price (optional)</label>
                        <input
                            {...register('offers.originalPrice')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                            placeholder="249.99"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Currency</label>
                        <select
                            {...register('offers.currency')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="KRW">KRW</option>
                        </select>
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Price Valid Until</label>
                        <input
                            type="date"
                            {...register('offers.priceValidUntil')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Item Condition</label>
                        <select
                            {...register('offers.itemCondition')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                        >
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                            <option value="Refurbished">Refurbished</option>
                        </select>
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Availability</label>
                        <select
                            {...register('offers.availability')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                        >
                            <option value="InStock">In Stock</option>
                            <option value="OutOfStock">Out of Stock</option>
                            <option value="PreOrder">Pre Order</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 space-y-3">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange-600" />
                    <h4 className="text-xs font-bold text-orange-800 uppercase tracking-widest">Reviews</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-0.5">
                        <label className="text-xs font-medium text-orange-700 uppercase">Rating (0-5)</label>
                        <input
                            type="number"
                            step="0.1"
                            max="5"
                            {...register('reviews.ratingValue', { valueAsNumber: true })}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-xs font-medium text-orange-700 uppercase">Count</label>
                        <input
                            type="number"
                            {...register('reviews.reviewCount', { valueAsNumber: true })}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Shipping & Returns Box */}
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 space-y-3">
                <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest">Shipping & Returns</h4>
                </div>

                {/* Delivery Subsection */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Delivery</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register('offers.hasFreeShipping')}
                                id="hasFreeShipping"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="hasFreeShipping" className="text-sm font-medium text-slate-700">Free Delivery</label>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                {...register('offers.deliveryDays', { valueAsNumber: true })}
                                placeholder="Delivery Time (e.g. 2 days)"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200"></div>

                {/* Returns Subsection */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Returns</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                {...register('offers.hasFreeReturn')}
                                id="hasFreeReturn"
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="hasFreeReturn" className="text-sm font-medium text-slate-700">Free Returns</label>
                        </div>
                        <div className="flex-1">
                            <input
                                type="number"
                                {...register('offers.returnDays', { valueAsNumber: true })}
                                placeholder="Return Period (e.g. 30 days)"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
