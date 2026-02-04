import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Globe, MapPin } from 'lucide-react';

export const LocalBusinessPreview = ({ data }: { data: any }) => {

    // Dynamic Subtitle Logic
    const getSubtitle = () => {
        if (!data) return '';
        if (data?.category === 'Dining') return `${data.cuisine || 'Cuisine'} • ${data.priceRange || 'Price'}`;
        if (data?.category === 'Medical') return `${data.medicalSpecialty || 'Specialty'} • Medical Clinic`;
        if (data?.category === 'Hotel') return `${data.starRating ? data.starRating + '-Star' : 'Hotel Class'} Hotel`;
        return data.type || 'Local Business';
    };

    // Contextual Button Logic
    const getContextButton = () => {
        if (!data) return null;
        if (data?.category === 'Dining') {
            return (
                <a href={data.menuUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 text-white text-center py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                    📖 Menu
                </a>
            );
        }
        if (data?.category === 'Medical') {
            return (
                <button className="flex-1 bg-blue-600 text-white text-center py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                    📅 Book Appt
                </button>
            );
        }
        if (data?.category === 'Hotel') {
            return (
                <button className="flex-1 bg-blue-600 text-white text-center py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                    🛏️ Check Rooms
                </button>
            );
        }
        return null;
    };

    // Safe URL hostname extractor
    const getHostname = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch (e) {
            return url; // Return original if parsing fails (e.g. no protocol)
        }
    };

    // Star Rating Visual Renderer
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                    const fill = Math.min(Math.max(rating - i, 0), 1); // 0 to 1
                    return (
                        <div key={i} className="relative w-3.5 h-3.5">
                            {/* Empty Star Background */}
                            <svg className="w-full h-full text-gray-300 absolute top-0 left-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {/* Filled Star Overlay (Clipped) */}
                            {fill > 0 && (
                                <div style={{ width: `${fill * 100}%` }} className="overflow-hidden absolute top-0 left-0 h-full">
                                    <svg className="w-3.5 h-3.5 text-[#e7711b] min-w-[14px]" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    if (!data) return null;

    // Use specific Dining preview if category matches
    if (data.category === 'Dining') {
        const rating = Number(data.starRating) || 0;
        const reviewCount = Number(data.reviewCount) || 0;
        const showRichActions = data.reservationUrl || data.orderUrl;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe1e5] overflow-hidden font-sans text-[#202124]">
                {/* 1. Split Media Header */}
                {/* 1. Split Media Header 50/50 Grid */}
                <div className="grid grid-cols-2 gap-px h-48 border-b border-[#f1f3f4] bg-gray-200">
                    {/* Left Slot: Primary Image */}
                    {/* Left Slot: Primary Image */}
                    <div className="relative bg-slate-100 overflow-hidden group">
                        {data.image ? (
                            <img
                                src={data.image}
                                alt={data.name || "Dining Cover"}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-slate-300">
                                <span className="text-xs font-semibold uppercase tracking-wider">Cover Image</span>
                            </div>
                        )}
                        {/* Fallback Placeholder (Hidden by default) */}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">Image Error</span>
                        </div>

                        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm z-10">
                            See 200+ photos
                        </div>
                    </div>

                    {/* Right Slot: Secondary Image */}
                    <div className="relative bg-slate-100 overflow-hidden">
                        {data.image2 ? (
                            <img src={data.image2} alt={`${data.name} Secondary`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-slate-300">
                                <span className="text-xs font-semibold uppercase tracking-wider">Image 2</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {/* 2. Title & Subtitle */}
                    <div className="space-y-1 mb-1">
                        <h2 className="text-xl font-normal text-[#202124] leading-tight">{data.name || 'Restaurant Name'}</h2>

                        {/* Row 1: Rating & Reviews */}
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="font-bold text-[#202124]">{rating > 0 ? rating.toFixed(1) : '4.5'}</span>
                            {renderStars(rating > 0 ? Number(rating) : 4.5)}
                            <span className="text-[#70757a]">({reviewCount > 0 ? reviewCount.toLocaleString() : '1,204'})</span>
                        </div>

                        {/* Row 2: Meta Info (Price, Cuisine, Type) */}
                        <div className="flex items-center gap-1 text-sm text-[#70757a]">
                            <span>{data.priceRange || '$$'}</span>
                            <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#70757a]"></span>
                            <span>{data.cuisine || 'Cuisine'}</span>
                            <span className="inline-block w-0.5 h-0.5 rounded-full bg-[#70757a]"></span>
                            <span>{data.type || 'Restaurant'}</span>
                        </div>
                    </div>

                    {/* 3. Action Chips (Scrollable) */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                        {['Website', 'Directions', 'Save', 'Call', 'Share'].map((action, i) => (
                            <button key={action} className="flex-shrink-0 px-3 py-1.5 rounded-full border border-[#dadce0] bg-white text-[#1a73e8] text-xs font-medium hover:bg-[#f8f9fa] transition-colors whitespace-nowrap">
                                {action === 'Directions' && <span className="mr-1">💎</span>}
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* 4. Primary Rich Actions */}
                    {showRichActions && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            {data.reservationUrl && (
                                <a href={data.reservationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1558b0] text-white py-2 px-4 rounded-full text-sm font-bold transition-colors text-center shadow-sm">
                                    📅 Reserve a table
                                </a>
                            )}
                            {data.orderUrl && (
                                <a href={data.orderUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1558b0] text-white py-2 px-4 rounded-full text-sm font-bold transition-colors text-center shadow-sm">
                                    🍴 Order Online
                                </a>
                            )}
                            {(!data.reservationUrl && data.orderUrl) && <div></div> /* Balanced grid filler if needed */}
                        </div>
                    )}

                    {/* 5. Detailed Info List (Service Options, Address, Hours, Phone, Menu, Res) */}
                    <div className="space-y-2 pt-1 text-sm text-[#202124]">

                        {/* Service Options */}
                        <div className="flex gap-2 items-start border-t border-[#f1f3f4] pt-2">
                            <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Service options:</span>
                            <span className="text-[#4d5156] text-xs">{data.serviceOptions || 'Dine-in · Takeout · No-contact delivery'}</span>
                        </div>

                        {/* Address */}
                        <div className="flex gap-2 items-start">
                            <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Address:</span>
                            <span className="text-[#4d5156] text-xs">{data.address?.street ? `${data.address.street}, ${data.address.city}` : '123 Main St, New York, NY'}</span>
                        </div>

                        {/* Hours */}
                        <div className="flex gap-2 items-start">
                            <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Hours:</span>
                            <span className="text-[#4d5156] text-xs">
                                {(data.openingHours && data.openingHours.length > 0 && data.openingHours[0].closes) ? (
                                    <span>
                                        <span className="text-[#188038] font-semibold">Open</span> ⋅ Closes {data.openingHours[0].closes}
                                    </span>
                                ) : (
                                    <span><span className="text-[#d93025] font-semibold">Closed</span> ⋅ Opens 9AM</span>
                                )}
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-2 items-start">
                            <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Phone:</span>
                            <span className="text-[#1a0dab] cursor-pointer hover:underline text-xs">{data.telephone || '(212) 555-0199'}</span>
                        </div>

                        {/* Menu Link */}
                        {data.menuUrl && (
                            <div className="flex gap-2 items-start">
                                <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Menu:</span>
                                <span className="text-[#1a0dab] cursor-pointer hover:underline text-xs">
                                    {getHostname(data.menuUrl)}
                                </span>
                            </div>
                        )}

                        {/* Reservations Link */}
                        {data.reservationUrl && (
                            <div className="flex gap-2 items-start">
                                <span className="font-bold whitespace-nowrap text-xs text-[#202124]">Reservations:</span>
                                <span className="text-[#1a0dab] cursor-pointer hover:underline text-xs">
                                    {getHostname(data.reservationUrl)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 6. Popular Times Simulation */}
                    <div className="pt-3 border-t border-[#dadce0] mt-3">
                        <h3 className="text-sm font-normal text-[#202124] mb-2">Popular times</h3>
                        <div className="flex gap-4 border-b border-[#dadce0] mb-2">
                            <span className="text-xs font-bold border-b-2 border-[#202124] pb-1 cursor-pointer">Wed</span>
                            {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map(d => (
                                <span key={d} className="text-xs text-[#70757a] cursor-pointer hover:text-[#202124]">{d}</span>
                            ))}
                        </div>
                        <div className="flex items-end justify-between h-16 gap-0.5 px-1 border-b border-[#dadce0] pb-0 relative">
                            {/* Hour Markers */}
                            <div className="absolute top-0 right-0 text-[10px] text-[#70757a]">Peak: 8 PM</div>

                            {[...Array(18)].map((_, i) => {
                                // Simulate bell curve centered around index 12 (roughly 8 PM)
                                const hour = i + 6; // starting 6am
                                const dist = Math.abs(i - 12);
                                let heightVal = Math.max(10, 80 - (dist * 12) + (Math.random() * 20));
                                const height = heightVal + '%';
                                const isPeak = i === 12; // 8 PM estimated

                                return (
                                    <div key={i} className="flex-1 flex flex-col justify-end h-full gap-0.5 group">
                                        <div
                                            style={{ height }}
                                            className={`w-full rounded-t-[1px] transition-all duration-500 ${isPeak ? 'bg-[#1a73e8]' : 'bg-[#dadce0]'}`}
                                        ></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between text-[10px] text-[#70757a] mt-1 font-medium px-2">
                            <span>6a</span>
                            <span>12p</span>
                            <span>6p</span>
                        </div>
                    </div>

                    {/* 7. Social Profiles (Knowledge Panel Style) */}
                    {(data.socials?.facebook || data.socials?.instagram || data.socials?.twitter || data.socials?.youtube || data.socials?.linkedin) && (
                        <div className="pt-3 border-t border-[#dadce0] mt-3">
                            <h3 className="text-lg font-bold text-[#202124] mb-3">Profiles</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {data.socials?.facebook && (
                                    <a href={data.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Facebook className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">Facebook</span>
                                    </a>
                                )}
                                {data.socials?.instagram && (
                                    <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Instagram className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">Instagram</span>
                                    </a>
                                )}
                                {data.socials?.twitter && (
                                    <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Twitter className="w-6 h-6 text-black" fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">X</span>
                                    </a>
                                )}
                                {data.socials?.youtube && (
                                    <a href={data.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Youtube className="w-6 h-6 text-red-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">YouTube</span>
                                    </a>
                                )}
                                {data.socials?.linkedin && (
                                    <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Linkedin className="w-6 h-6 text-blue-700" fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Medical Specific Preview
    if (data.category === 'Medical') {
        const rating = Number(data.starRating) || 0;
        const reviewCount = Number(data.reviewCount) || 0;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe1e5] overflow-hidden font-sans text-[#202124]">
                {/* 1. Split Media Header 50/50 Grid */}
                <div className="grid grid-cols-2 gap-px h-48 border-b border-[#f1f3f4] bg-gray-200">
                    {/* Left Slot: Primary Image */}
                    {/* Left Slot: Primary Image */}
                    <div className="relative bg-slate-100 overflow-hidden group">
                        {data.image ? (
                            <img
                                src={data.image}
                                alt={data.name || "Medical Cover"}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-slate-300">
                                <span className="text-xs font-semibold uppercase tracking-wider">Cover Image</span>
                            </div>
                        )}
                        {/* Fallback Placeholder */}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">Image Error</span>
                        </div>

                        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm z-10">
                            See Photos
                        </div>
                    </div>

                    {/* Right Slot: Secondary Image or Fake Map */}
                    <div className="relative bg-[#f1f3f4] border-l border-white overflow-hidden">
                        {data.image2 ? (
                            <img src={data.image2} alt={`${data.name} Secondary`} className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-80 grayscale-[30%]"
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')` }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center pb-2">
                                    <MapPin className="w-8 h-8 text-[#ea4335] fill-[#ea4335] drop-shadow-md" />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {/* 2. Title & Subtitle */}
                    <div className="space-y-1 mb-1">
                        <h2 className="text-2xl font-medium text-[#202124] leading-tight">{data.name || 'Medical Clinic Name'}</h2>
                        {/* Rating & Meta */}
                        <div className="flex items-center gap-1.5 text-sm">
                            <span className="font-bold text-[#202124]">{rating > 0 ? rating.toFixed(1) : '4.8'}</span>
                            {renderStars(rating > 0 ? Number(rating) : 4.8)}
                            <span className="text-[#70757a]">({reviewCount > 0 ? reviewCount.toLocaleString() : '84'})</span>
                            <span className="text-[#70757a] mx-1">•</span>
                            <span className="text-[#70757a]">{data.medicalSpecialty || 'Medical Clinic'}</span>
                            <span className="text-[#70757a] mx-1">•</span>
                            <span className="text-[#70757a]">{data.address?.city || 'City'}</span>
                        </div>
                    </div>

                    {/* 3. Action Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                        {['Website', 'Directions', 'Save', 'Call'].map((action) => (
                            <button key={action} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-[#dadce0] bg-white text-[#1a73e8] text-sm font-medium hover:bg-[#f8f9fa] transition-colors whitespace-nowrap">
                                {action === 'Directions' && <span className="mr-1">💎</span>}
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* 4. Primary CTA: Book Online */}
                    {data.appointmentUrl && (
                        <div className="pt-1">
                            <a href={data.appointmentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1558b0] text-white py-2.5 px-4 rounded-full text-sm font-bold transition-colors text-center shadow-sm w-full">
                                📅 Book Online
                            </a>
                        </div>
                    )}

                    {/* 5. Detailed Info List */}
                    <div className="space-y-3 pt-2 text-sm text-[#202124]">
                        {/* Address */}
                        <div className="flex gap-3 items-start border-t border-[#f1f3f4] pt-3">
                            <MapPin className="w-5 h-5 text-[#1a73e8] shrink-0 mt-0.5" />
                            <span className="text-[#202124]">{data.address?.street ? `${data.address.street}, ${data.address.city}, ${data.address.zip}` : '123 Medical Center Dr, New York, NY 10001'}</span>
                        </div>

                        {/* Hours */}
                        <div className="flex gap-3 items-start border-t border-[#f1f3f4] pt-3">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[#1a73e8] font-bold text-xs">🕒</span>
                            </div>
                            <span className="text-[#202124]">
                                {(data.openingHours && data.openingHours.length > 0 && data.openingHours[0].closes) ? (
                                    <span>
                                        <span className="text-[#188038] font-semibold">Open</span> ⋅ Closes {data.openingHours[0].closes}
                                    </span>
                                ) : (
                                    <span><span className="text-[#d93025] font-semibold">Closed</span> ⋅ Opens 8AM</span>
                                )}
                            </span>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-3 items-start border-t border-[#f1f3f4] pt-3">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                                <span className="text-[#1a73e8] font-bold text-xs">📞</span>
                            </div>
                            <span className="text-[#1a0dab] cursor-pointer hover:underline">{data.telephone || '(212) 555-0123'}</span>
                        </div>

                        {/* Appointment Source */}
                        {data.appointmentUrl && (
                            <div className="flex gap-3 items-start border-t border-[#f1f3f4] pt-3">
                                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                                    <span className="text-[#1a73e8] font-bold text-xs">📅</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-[#202124]">Appointments:</span>
                                    <span className="text-[#1a0dab] cursor-pointer hover:underline">
                                        {getHostname(data.appointmentUrl)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 6. Popular Times (Reuse) */}
                    <div className="pt-3 border-t border-[#dadce0] mt-3">
                        <h3 className="text-sm font-normal text-[#202124] mb-2">Popular times</h3>
                        <div className="flex gap-4 border-b border-[#dadce0] mb-2">
                            <span className="text-xs font-bold border-b-2 border-[#202124] pb-1 cursor-pointer">Wed</span>
                            {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map(d => (
                                <span key={d} className="text-xs text-[#70757a] cursor-pointer hover:text-[#202124]">{d}</span>
                            ))}
                        </div>
                        <div className="flex items-end justify-between h-16 gap-0.5 px-1 border-b border-[#dadce0] pb-0 relative">
                            {/* Histogram bars similar to Dining */}
                            {[...Array(18)].map((_, i) => {
                                const isPeak = i === 10; // Peak around 10AM-2PM for medical
                                const h = Math.max(10, 60 - Math.abs(i - 8) * 8 + Math.random() * 20);
                                return (
                                    <div key={i} className="flex-1 flex flex-col justify-end h-full gap-0.5">
                                        <div style={{ height: `${h}%` }} className={`w-full rounded-t-[1px] ${isPeak ? 'bg-[#1a73e8]' : 'bg-[#dadce0]'}`}></div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-between text-[10px] text-[#70757a] mt-1 font-medium px-2">
                            <span>6a</span>
                            <span>12p</span>
                            <span>6p</span>
                        </div>
                    </div>

                    {/* 7. Profiles (Reuse) */}
                    {(data.socials?.facebook || data.socials?.instagram || data.socials?.twitter || data.socials?.youtube || data.socials?.linkedin) && (
                        <div className="pt-3 border-t border-[#dadce0] mt-3">
                            <h3 className="text-lg font-bold text-[#202124] mb-3">Profiles</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {data.socials?.facebook && (
                                    <a href={data.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Facebook className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">Facebook</span>
                                    </a>
                                )}
                                {data.socials?.instagram && (
                                    <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Instagram className="w-6 h-6 text-pink-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">Instagram</span>
                                    </a>
                                )}
                                {data.socials?.twitter && (
                                    <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Twitter className="w-6 h-6 text-black" fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">X</span>
                                    </a>
                                )}
                                {data.socials?.youtube && (
                                    <a href={data.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Youtube className="w-6 h-6 text-red-600" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">YouTube</span>
                                    </a>
                                )}
                                {data.socials?.linkedin && (
                                    <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[60px] group">
                                        <div className="w-12 h-12 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Linkedin className="w-6 h-6 text-blue-700" fill="currentColor" />
                                        </div>
                                        <span className="text-xs font-medium text-[#202124]">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Hotel Specific Preview
    if (data.category === 'Hotel') {
        const rating = Number(data.starRating) || 0;
        const reviewCount = Number(data.reviewCount) || 0;
        const hotelClass = Number(data.hotelClass) || 4;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe1e5] overflow-hidden font-sans text-[#202124]">
                {/* 1. Split Media Header 50/50 Grid */}
                <div className="grid grid-cols-2 gap-px h-48 border-b border-[#f1f3f4] bg-gray-200">
                    {/* Left Slot: Primary Image */}
                    {/* Left Slot: Primary Image */}
                    <div className="relative bg-slate-100 overflow-hidden group">
                        {data.image ? (
                            <img
                                src={data.image}
                                alt={data.name || "Hotel Cover"}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-slate-300">
                                <span className="text-xs font-semibold uppercase tracking-wider">Cover Image</span>
                            </div>
                        )}
                        {/* Fallback Placeholder */}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                            <span className="text-xs font-semibold uppercase tracking-wider">Image Error</span>
                        </div>

                        {/* Overlay: See Photos */}
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-sm backdrop-blur-sm z-10">
                            See Photos
                        </div>
                    </div>

                    {/* Right Slot: Secondary Image or Fake Map */}
                    <div className="relative bg-[#f1f3f4] border-l border-white overflow-hidden">
                        {data.image2 ? (
                            <img src={data.image2} alt={`${data.name} Secondary`} className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <div
                                    className="absolute inset-0 bg-cover bg-center opacity-80 grayscale-[30%]"
                                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop')` }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center pb-2">
                                    <div className="relative">
                                        {/* Hotel Price Marker */}
                                        <div className="bg-[#1a73e8] text-white text-xs font-bold px-2 py-1 rounded shadow-md border border-white">
                                            {data.minPrice || '$195'}
                                        </div>
                                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1a73e8] mx-auto mt-[-1px]"></div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* 2. Title & Reviews */}
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-[#202124] leading-tight">{data.name || 'NU Hotel Brooklyn'}</h2>
                        <div className="flex items-center gap-2 text-sm flex-wrap">
                            <div className="flex items-center gap-1">
                                <span className="font-bold text-[#202124]">{rating > 0 ? rating.toFixed(1) : '4.5'}</span>
                                <span className="text-[#202124]">/ 5</span>
                                {renderStars(rating > 0 ? rating : 4.5)}
                            </div>
                            <span className="text-[#4d5156]">({reviewCount > 0 ? reviewCount.toLocaleString() : '1,028'} reviews)</span>
                            <span className="text-[#3c4043] font-medium bg-[#f1f3f4] px-1.5 py-0.5 rounded-full text-xs">{hotelClass}-star hotel</span>
                        </div>
                    </div>

                    {/* 3. Booking Widget (Commercial Box) */}
                    {(data.bookingUrl || data.minPrice) && (
                        <div className="border border-gray-200 rounded-xl p-4 mt-4 bg-white shadow-sm animate-in fade-in slide-in-from-top-1">
                            {/* Top Part: Date Simulation */}
                            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-2">
                                    <span>📅</span>
                                    <span className="font-medium">Check-in</span>
                                </div>
                                <div className="text-gray-400">→</div>
                                <div className="flex items-center gap-2">
                                    <span>📅</span>
                                    <span className="font-medium">Check-out</span>
                                </div>
                            </div>

                            {/* Bottom Part: Price & Action */}
                            <div className="flex items-center justify-between mt-3 gap-3">
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-[#202124]">{data.minPrice || '$195'}</span>
                                    <span className="text-xs text-gray-500">avg/night</span>
                                </div>
                                <a
                                    href={data.bookingUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#1a73e8] hover:bg-[#1558b0] text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
                                >
                                    Check Availability
                                </a>
                            </div>

                            {/* Footer */}
                            <div className="mt-3 pt-2 text-xs text-[#188038] font-medium flex items-center gap-1">
                                Free cancellation
                            </div>
                        </div>
                    )}

                    {!data.bookingUrl && !data.minPrice && (
                        <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100 flex items-center gap-2">
                            <span>ℹ️</span> Add a <b>Price</b> or <b>Booking URL</b> to see the Booking Widget.
                        </div>
                    )}


                    {/* 4. Amenities Section */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#4d5156] pt-2 mt-2">
                        {(data.amenities || 'Free Wi-Fi, Air conditioning, Breakfast').split(',').map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {/* Dynamic Icon Logic (Simple) */}
                                <span className="text-sm">
                                    {item.toLowerCase().includes('wifi') ? '📶' :
                                        item.toLowerCase().includes('pool') ? '🏊' :
                                            item.toLowerCase().includes('breakfast') ? '🍳' :
                                                item.toLowerCase().includes('spa') ? '💆' : '✦'}
                                </span>
                                <span>{item.trim()}</span>
                            </div>
                        ))}
                    </div>

                    {/* 5. Details (Address code kept simple) */}
                    <div className="text-sm text-[#70757a] border-t border-[#f1f3f4] pt-3 mt-1">
                        <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5" />
                            <span>{data.address?.street ? `${data.address.street}, ${data.address.city}, ${data.address.zip}` : '85 Smith St, Brooklyn, NY 11201'}</span>
                        </div>
                    </div>

                    {/* 6. Social Profiles (Knowledge Panel Style) */}
                    {(data.socials?.facebook || data.socials?.instagram || data.socials?.twitter || data.socials?.youtube || data.socials?.linkedin) && (
                        <div className="pt-3 border-t border-[#f1f3f4] mt-2">
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {data.socials?.facebook && (
                                    <a href={data.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Facebook className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">Facebook</span>
                                    </a>
                                )}
                                {data.socials?.instagram && (
                                    <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Instagram className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">Instagram</span>
                                    </a>
                                )}
                                {data.socials?.twitter && (
                                    <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Twitter className="w-5 h-5 text-black" fill="currentColor" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">X</span>
                                    </a>
                                )}
                                {data.socials?.youtube && (
                                    <a href={data.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Youtube className="w-5 h-5 text-red-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">YouTube</span>
                                    </a>
                                )}
                                {data.socials?.linkedin && (
                                    <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Linkedin className="w-5 h-5 text-blue-700" fill="currentColor" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );

    }

    // General Local Business Preview (Standard)
    if (data.category === 'General') {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-[#dfe1e5] overflow-hidden font-sans text-[#202124]">
                {/* 1. Header (Standard Split) */}
                <div className="grid grid-cols-2 gap-px h-40 border-b border-[#f1f3f4] bg-gray-200">
                    {/* Left: Main Image */}
                    {/* Left: Main Image */}
                    <div className="relative bg-slate-100 overflow-hidden group">
                        {data.image ? (
                            <img
                                src={data.image}
                                alt={data.name || "Business Cover"}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                <span className="text-xs font-semibold uppercase tracking-wider">Image</span>
                            </div>
                        )}
                        {/* Fallback on Error */}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
                            <MapPin className="w-8 h-8 opacity-50" />
                        </div>
                    </div>
                    {/* Right: Map or Secondary */}
                    <div className="relative bg-[#f1f3f4] border-l border-white overflow-hidden">
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-80"
                            style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=14&size=400x300&sensor=false&key=YOUR_API_KEY_HERE')` }} // Placeholder static map look
                        >
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                <MapPin className="w-8 h-8 text-[#ea4335]" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {/* 2. Title & Subtitle */}
                    <div>
                        <h2 className="text-xl font-medium text-[#202124]">{data.name || 'Your Business Name'}</h2>
                        <div className="text-sm text-[#70757a] flex items-center gap-1 mt-1">
                            <span className="font-bold text-[#e7711b]">4.8</span>
                            {renderStars(4.8)}
                            <span>(42)</span>
                            <span className="mx-1">•</span>
                            <span>{data.type || 'Local Business'}</span>
                            <span className="mx-1">•</span>
                            <span>{data.address?.city || 'City'}</span>
                        </div>
                    </div>

                    {/* 3. Action Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                        {['Website', 'Directions', 'Save', 'Call'].map((action) => (
                            <button key={action} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-[#dadce0] bg-white text-[#1a73e8] text-sm font-medium hover:bg-[#f8f9fa] transition-colors whitespace-nowrap">
                                {action === 'Directions' && <span className="mr-1">💎</span>}
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* 4. Description Box */}
                    {data.description && (
                        <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-3">
                            {data.description}
                        </div>
                    )}

                    {/* 5. Info List */}
                    <div className="space-y-2 pt-2 border-t border-[#f1f3f4] text-sm">
                        <div className="flex gap-3 items-start">
                            <MapPin className="w-5 h-5 text-[#70757a] shrink-0 mt-0.5" />
                            <span className="text-[#202124]">{data.address?.street ? `${data.address.street}, ${data.address.city}` : '123 Main St, City'}</span>
                        </div>
                        {data.openingHoursString && (
                            <div className="flex gap-3 items-start">
                                <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#70757a] font-bold text-xs">🕒</div>
                                <span className="text-[#202124]">{data.openingHoursString}</span>
                            </div>
                        )}
                        <div className="flex gap-3 items-start">
                            <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#70757a] font-bold text-xs">📞</div>
                            <span className="text-[#1a0dab]">{data.telephone || '(555) 123-4567'}</span>
                        </div>
                    </div>

                    {/* 6. Social Profiles (Knowledge Panel Style) */}
                    {(data.socials?.facebook || data.socials?.instagram || data.socials?.twitter || data.socials?.youtube || data.socials?.linkedin) && (
                        <div className="pt-3 border-t border-[#f1f3f4] mt-2">
                            <h3 className="text-sm font-semibold text-[#202124] mb-3">Profiles</h3>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {data.socials?.facebook && (
                                    <a href={data.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Facebook className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">Facebook</span>
                                    </a>
                                )}
                                {data.socials?.instagram && (
                                    <a href={data.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Instagram className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">Instagram</span>
                                    </a>
                                )}
                                {data.socials?.twitter && (
                                    <a href={data.socials.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Twitter className="w-5 h-5 text-black" fill="currentColor" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">X</span>
                                    </a>
                                )}
                                {data.socials?.youtube && (
                                    <a href={data.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Youtube className="w-5 h-5 text-red-600" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">YouTube</span>
                                    </a>
                                )}
                                {data.socials?.linkedin && (
                                    <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 min-w-[50px] group">
                                        <div className="w-10 h-10 rounded-full bg-white border border-gray-300 shadow-sm flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                                            <Linkedin className="w-5 h-5 text-blue-700" fill="currentColor" />
                                        </div>
                                        <span className="text-[10px] font-medium text-[#202124]">LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default Preview (Non-Dining)
    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 space-y-3 font-sans">
            <div className="flex gap-4 items-center">
                {data?.image ? (
                    <img src={data.image} alt={data.name} className="w-14 h-14 object-cover rounded-full bg-slate-100 border border-slate-200" />
                ) : (
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-xs">Img</div>
                )}
                <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{data?.name || 'Business Name'}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">{getSubtitle()}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{data?.address?.street}, {data?.address?.city}</div>
                </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-2 pt-1.5">
                {getContextButton()}
                <button className="flex-1 bg-slate-100 text-slate-600 text-center py-1.5 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors">
                    Website
                </button>
                <button className="flex-1 bg-slate-100 text-slate-600 text-center py-1.5 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors">
                    Call
                </button>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Phone</span>
                    <span className="text-slate-700">{data?.telephone || '-'}</span>
                </div>
                <div>
                    <span className="block text-[10px] font-semibold text-slate-400 uppercase">Price Range</span>
                    <span className="text-slate-700">{data?.priceRange || '-'}</span>
                </div>
            </div>
        </div>
    );
};
