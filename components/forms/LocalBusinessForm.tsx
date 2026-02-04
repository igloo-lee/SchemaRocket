import React from 'react';
import { UseFormRegister, Control, useFieldArray, Controller } from 'react-hook-form';
import { MapPin, Globe, Trash2, Clock, Star, Share2, Facebook, Instagram, Twitter, Youtube, Linkedin, Link, Info } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

export const LocalBusinessForm = ({ register, control, watch }: { register: UseFormRegister<any>, control: Control<any>, watch: any }) => {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const category = watch('category');

    // ... existing useFieldArray ...


    return (
        <div className="space-y-5">
            <SectionHeader icon={MapPin} title="Business Info" />

            {/* Category Selector */}
            <div className="space-y-0.5">
                <label className="text-sm font-medium text-slate-700">Business Category</label>
                <select
                    {...register('category')}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white"
                >
                    <option value="Dining">Dining (Restaurant / Cafe)</option>
                    <option value="Medical">Medical (Clinic / Dentist)</option>
                    <option value="Hotel">Hotel / Accommodation</option>
                    <option value="General">General Local Business</option>
                </select>
            </div>

            {/* Standard Fields (Non-Dining) */}
            {category !== 'Dining' && (
                <>
                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Business Name</label>
                        <input
                            {...register('name')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="Joe's Pizza"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Image URL</label>
                            <input
                                {...register('image')}
                                autoComplete="off"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                                placeholder="https://example.com/store.jpg"
                            />
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Secondary Cover Image URL (Optional)</label>
                            <input
                                {...register('image2')}
                                autoComplete="off"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                                placeholder="https://example.com/another-image.jpg"
                            />
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Telephone</label>
                            <input
                                {...register('telephone')}
                                autoComplete="off"
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                                placeholder="+1-555-0199"
                            />
                        </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <h4 className="text-sm font-semibold text-slate-700">Address</h4>
                        <div className="space-y-2">
                            <input
                                {...register('address.street')}
                                autoComplete="off"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                                placeholder="Street Address"
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    {...register('address.city')}
                                    autoComplete="off"
                                    className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="City"
                                />
                                <input
                                    {...register('address.zip')}
                                    autoComplete="off"
                                    className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                                    placeholder="Zip Code"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <label className="text-sm font-medium text-slate-700">Google Maps URL (hasMap)</label>
                        <input
                            {...register('hasMap')}
                            autoComplete="off"
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm"
                            placeholder="https://maps.app.goo.gl/..."
                        />
                        <p className="text-xs text-slate-400">Enter your shared Google Maps link to help search engines explicitly match your site to the location.</p>
                    </div>
                </>
            )}

            {/* Dining Specific Layout (Replaces Standard Fields) */}
            {category === 'Dining' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

                    {/* Group 1: Core Info */}
                    <div className="space-y-3">
                        <SectionHeader icon={MapPin} title="Core Info" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Restaurant Name</label>
                                <input {...register('name')} placeholder="The Burger Joint" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Cuisine Type</label>
                                <input {...register('cuisine')} placeholder="American, Burgers" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5 col-span-2">
                                <label className="text-sm font-medium text-slate-700">Service Options</label>
                                <input {...register('serviceOptions')} placeholder="e.g., Dine-in · Takeout · No-contact delivery" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5 col-span-2">
                                <label className="text-sm font-medium text-slate-700">Price Range</label>
                                <input {...register('priceRange')} placeholder="$$ or $30-50" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
                                <input {...register('image')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Secondary Cover Image URL (Optional)</label>
                                <input {...register('image2')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Group 2: Location & Contact */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location & Contact</h4>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Address</label>
                                <input {...register('address.street')} placeholder="123 Main St" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Google Maps URL (hasMap)</label>
                                <input {...register('hasMap')} placeholder="https://maps.app.goo.gl/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                <p className="text-xs text-slate-400">Enter your shared Google Maps link to help search engines explicitly match your site to the location.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">City</label>
                                    <input {...register('address.city')} placeholder="New York" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input {...register('telephone')} placeholder="+1-555-000-0000" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group 3: Rich Actions */}
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest">Rich Actions</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Menu Link</label>
                                <input {...register('menuUrl')} placeholder="https://..." className="w-full px-3 py-2 bg-white rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">Reservation Link</label>
                                    <input {...register('reservationUrl')} placeholder="https://..." className="w-full px-3 py-2 bg-white rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">Order Online Link</label>
                                    <input {...register('orderUrl')} placeholder="https://..." className="w-full px-3 py-2 bg-white rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group 4: Social Proof */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-3">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-600" />
                            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">Social Proof</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Star Rating (0-5)</label>
                                <input type="number" step="0.1" max="5" {...register('starRating')} placeholder="4.8" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Review Count</label>
                                <input type="number" {...register('reviewCount')} placeholder="154" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Medical Specific Layout */}
            {category === 'Medical' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

                    {/* Group 1: Core Info */}
                    <div className="space-y-3">
                        <SectionHeader icon={MapPin} title="Clinic Info" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Clinic Name</label>
                                <input {...register('name')} placeholder="Century Medical & Dental" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Specialty / Clinic Type</label>
                                <input {...register('medicalSpecialty')} placeholder="Medical Clinic" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
                                <input {...register('image')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Secondary Cover Image URL (Optional)</label>
                                <input {...register('image2')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>

                            <div className="space-y-0.5 col-span-2">
                                <label className="text-sm font-medium text-slate-700">Appointment Booking URL</label>
                                <input {...register('appointmentUrl')} placeholder="https://zocdoc.com/..." className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                                <p className="text-xs text-slate-400">Add a direct link to your booking page to enable the "Book Online" button.</p>
                            </div>
                        </div>
                    </div>

                    {/* Group 2: Location & Contact */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location & Contact</h4>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Address</label>
                                <input {...register('address.street')} placeholder="123 Main St" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Google Maps URL (hasMap)</label>
                                <input {...register('hasMap')} placeholder="https://maps.app.goo.gl/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">City</label>
                                    <input {...register('address.city')} placeholder="New York" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input {...register('telephone')} placeholder="+1-555-000-0000" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group 3: Social Proof */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-3">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-600" />
                            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">Social Proof</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Star Rating (0-5)</label>
                                <input type="number" step="0.1" max="5" {...register('starRating')} placeholder="4.8" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Review Count</label>
                                <input type="number" {...register('reviewCount')} placeholder="154" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* General Business Specific Inputs */}
            {category === 'General' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-3">
                        <SectionHeader icon={Info} title="General Info" />
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Business Type</label>
                            <select
                                {...register('type')}
                                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-sm bg-white"
                            >
                                <option value="LocalBusiness">LocalBusiness (Generic)</option>
                                <option value="Store">Store</option>
                                <option value="ProfessionalService">Professional Service</option>
                                <option value="AutomotiveBusiness">Automotive Business</option>
                                <option value="HomeAndConstructionBusiness">Home & Construction</option>
                            </select>
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Business Description</label>
                            <textarea
                                {...register('description')}
                                placeholder="Briefly describe your business..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm min-h-[80px]"
                            />
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium text-slate-700">Opening Hours</label>
                            <input
                                {...register('openingHoursString')}
                                placeholder="e.g., Mon-Fri 09:00-18:00"
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Hotel Specific Layout */}
            {category === 'Hotel' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">

                    {/* Group 1: Hotel Info */}
                    <div className="space-y-3">
                        <SectionHeader icon={MapPin} title="Hotel Info" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Hotel Name</label>
                                <input {...register('name')} placeholder="The Grand Hotel" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-slate-700">Hotel Class (Stars)</label>
                                <select {...register('hotelClass')} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white">
                                    <option value="">Select Class</option>
                                    <option value="5">5-Star</option>
                                    <option value="4">4-Star</option>
                                    <option value="3">3-Star</option>
                                    <option value="2">2-Star</option>
                                    <option value="1">1-Star</option>
                                </select>
                            </div>

                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Cover Image URL</label>
                                <input {...register('image')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Secondary Cover Image URL (Optional)</label>
                                <input {...register('image2')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Group 2: Booking & Amenities */}
                    <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest">Booking & Details</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Avg Price per Night</label>
                                <input {...register('minPrice')} placeholder="$195" className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Booking URL</label>
                                <input {...register('bookingUrl')} placeholder="https://..." className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                            </div>
                            <div className="col-span-2 space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Amenities (comma separated)</label>
                                <input {...register('amenities')} placeholder="Free Wi-Fi, Pool, Spa, Gym, Breakfast included" className="w-full px-3 py-2 rounded-lg border border-blue-200 text-sm focus:ring-2 focus:ring-blue-100" />
                            </div>
                        </div>
                    </div>

                    {/* Group 3: Location & Contact */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location & Contact</h4>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Address</label>
                                <input {...register('address.street')} placeholder="123 Ocean Dr" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Google Maps URL (hasMap)</label>
                                <input {...register('hasMap')} placeholder="https://maps.app.goo.gl/..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">City</label>
                                    <input {...register('address.city')} placeholder="Miami" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input {...register('telephone')} placeholder="+1-555-000-0000" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Group 4: Social Proof */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-3">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-600" />
                            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">Social Proof</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">User Rating (0-5)</label>
                                <input type="number" step="0.1" max="5" {...register('starRating')} placeholder="4.8" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium text-slate-700">Review Count</label>
                                <input type="number" {...register('reviewCount')} placeholder="1250" className="w-full px-3 py-1.5 bg-white rounded-lg border border-amber-200 text-sm focus:ring-2 focus:ring-amber-200" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Online Presence (Social Profiles) Grouped Box */}
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-3">
                <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-widest">Social Profiles</h4>
                </div>

                <div className="space-y-3">
                    {/* Facebook */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <Facebook className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <label className="text-xs font-medium text-slate-500">Facebook URL</label>
                            <input
                                {...register('socials.facebook')}
                                placeholder="https://facebook.com/page"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Instagram */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <Instagram className="w-4 h-4 text-pink-600" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <label className="text-xs font-medium text-slate-500">Instagram URL</label>
                            <input
                                {...register('socials.instagram')}
                                placeholder="https://instagram.com/profile"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* Twitter / X */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <Twitter className="w-4 h-4 text-slate-900" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <label className="text-xs font-medium text-slate-500">X (Twitter) URL</label>
                            <input
                                {...register('socials.twitter')}
                                placeholder="https://x.com/handle"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* YouTube */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <Youtube className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <label className="text-xs font-medium text-slate-500">YouTube URL</label>
                            <input
                                {...register('socials.youtube')}
                                placeholder="https://youtube.com/@channel"
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white border border-indigo-100 flex items-center justify-center shrink-0">
                            <Linkedin className="w-4 h-4 text-blue-700" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                            <label className="text-xs font-medium text-slate-500">LinkedIn URL</label>
                            <input
                                {...register('socials.linkedin')}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-3 py-1.5 bg-white rounded-lg border border-indigo-200 focus:border-indigo-500 outline-none text-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>
                </div>
            </div>


            {/* Opening Hours Grouped Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-600" />
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Opening Hours</h4>
                </div>
                {/* Checkboxes for Days */}
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Days Open</label>
                    <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map(day => (
                            <label key={day} className="flex items-center gap-1.5 p-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 transition-colors">
                                <input
                                    type="checkbox"
                                    value={day}
                                    {...register('openingHours.0.dayOfWeek')}
                                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                                />
                                <span className="text-sm text-slate-700">{day.slice(0, 3)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Time Inputs */}
                <div className="flex items-center gap-3">
                    <div className="space-y-1 flex-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Opens At</label>
                        <input
                            type="time"
                            {...register('openingHours.0.opens')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                        />
                    </div>
                    <div className="space-y-1 flex-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Closes At</label>
                        <input
                            type="time"
                            {...register('openingHours.0.closes')}
                            className="w-full px-3 py-1.5 bg-white rounded-lg border border-slate-200 focus:border-blue-500 outline-none text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
