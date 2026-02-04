
export interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

export type ItemCondition = 'New' | 'Used' | 'Refurbished';

export interface ProductData {
  name: string;
  image: string;
  description?: string;
  brand?: string;
  sku?: string;
  reviews: {
    ratingValue: number;
    reviewCount: number;
  };
  offers: {
    price: string;
    currency: string;
    originalPrice?: string;
    merchantName?: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    itemCondition: ItemCondition;
    priceValidUntil?: string;
    hasFreeReturn?: boolean;
    returnDays?: number;
    hasFreeShipping?: boolean;
    deliveryDays?: number;
  };
}

export interface LocalBusinessData {
  category: 'General' | 'Dining' | 'Medical' | 'Hotel';
  type: string; // e.g., 'LocalBusiness', 'Restaurant', etc.
  name: string;
  image: string;
  image2?: string;
  telephone: string;
  email?: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  openingHours: Array<{
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs?: string[]; // Legacy generic list
  socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  menu?: string; // Legacy field, kept for compatibility if needed, but we also add menuUrl
  priceRange?: string; // e.g. $$
  hasMap?: string; // Google Maps URL

  // Category Specifics
  cuisine?: string; // Dining
  serviceOptions?: string; // Dining
  menuUrl?: string; // Dining
  medicalSpecialty?: string; // Medical
  appointmentUrl?: string; // Medical
  acceptsReservations?: boolean; // Medical/Dining
  starRating?: string; // Hotel (User Rating) & General
  reviewCount?: string; // General
  hotelClass?: string; // Hotel (Official Star Rating 1-5)
  minPrice?: string; // Hotel
  amenities?: string; // Hotel
  bookingUrl?: string; // Hotel
  checkinTime?: string; // Hotel
  description?: string; // General
  openingHoursString?: string; // General (Simple string format)
}

export interface ArticleData {
  type: 'Article' | 'NewsArticle' | 'BlogPosting';
  headline: string;
  image: string;
  authorName: string;
  authorType?: 'Person' | 'Organization';
  authorUrl?: string; // URL to author profile
  publisherName: string;
  publisherLogo?: string;
  datePublished: string;
  dateModified?: string;
  url?: string; // Canonical URL
  keywords?: string;
  description?: string;
  contentLocation?: string; // For NewsArticle (Dateline)
}

export const generateFAQSchema = (items: FAQItem[]) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer // Supports HTML strings
      }
    }))
  };
  return JSON.stringify(schema, null, 2);
};

export const generateProductSchema = (data: ProductData) => {
  const conditionMap: Record<ItemCondition, string> = {
    'New': 'https://schema.org/NewCondition',
    'Used': 'https://schema.org/UsedCondition',
    'Refurbished': 'https://schema.org/RefurbishedCondition'
  };

  const schema: any = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": data.name,
    "image": data.image,
    "description": data.description,
    "sku": data.sku || undefined,
    "brand": data.brand ? {
      "@type": "Brand",
      "name": data.brand
    } : undefined,
    "offers": {
      "@type": "Offer",
      "priceCurrency": data.offers.currency,
      "price": data.offers.price,
      "availability": `https://schema.org/${data.offers.availability}`,
      "itemCondition": conditionMap[data.offers.itemCondition],
      "priceValidUntil": data.offers.priceValidUntil || undefined,
      "seller": data.offers.merchantName ? {
        "@type": "Organization",
        "name": data.offers.merchantName
      } : undefined
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": data.reviews.ratingValue,
      "bestRating": "5",
      "ratingCount": data.reviews.reviewCount
    }
  };

  if (schema.offers.seller === undefined) {
    delete schema.offers.seller;
  }

  if (data.offers.returnDays) {
    schema.offers.merchantReturnPolicy = {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": Number(data.offers.returnDays),
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": data.offers.hasFreeReturn ? "https://schema.org/FreeReturn" : "https://schema.org/ReturnFeesCustomerResponsibility"
    };
  }

  if (data.offers.deliveryDays || data.offers.hasFreeShipping) {
    schema.offers.shippingDetails = {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": data.offers.hasFreeShipping ? 0 : 5, // Default explicit cost if not free? Or omit value if variable. Schema prefers 0 for free.
        "currency": data.offers.currency
      },
      "deliveryTime": data.offers.deliveryDays ? {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "d"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 1,
          "maxValue": data.offers.deliveryDays,
          "unitCode": "d"
        }
      } : undefined
    };

    if (!schema.offers.shippingDetails.deliveryTime) {
      delete schema.offers.shippingDetails.deliveryTime;
    }
  }

  return JSON.stringify(schema, null, 2);
};

export const generateLocalBusinessSchema = (data: LocalBusinessData) => {
  let schemaType = "LocalBusiness";
  let additionalProps: any = {};

  // Category to Schema Type Mapping
  switch (data.category) {
    case 'Dining':
      schemaType = "Restaurant";
      if (data.cuisine) additionalProps["servesCuisine"] = data.cuisine;
      if (data.menuUrl) additionalProps["menu"] = data.menuUrl;
      if (data.acceptsReservations !== undefined) additionalProps["acceptsReservations"] = data.acceptsReservations;
      break;
    case 'Medical':
      schemaType = "MedicalBusiness"; // More generic than Physician
      if (data.medicalSpecialty) additionalProps["medicalSpecialty"] = {
        "@type": "MedicalSpecialty",
        "name": data.medicalSpecialty
      };
      if (data.appointmentUrl) {
        additionalProps["sameAs"] = [
          ...(additionalProps["sameAs"] || []),
          data.appointmentUrl
        ];
      }
      break;
    case 'Hotel':
      schemaType = "Hotel";
      // Official Hotel Class (Star Rating)
      if (data.hotelClass) {
        additionalProps["starRating"] = {
          "@type": "Rating",
          "ratingValue": data.hotelClass // Official Stars (e.g. 5)
        };
      }
      // User Aggregate Rating
      if (data.starRating) {
        additionalProps["aggregateRating"] = {
          "@type": "AggregateRating",
          "ratingValue": data.starRating,
          "reviewCount": data.reviewCount || "100"
        };
      }

      if (data.minPrice) additionalProps["priceRange"] = data.minPrice;

      if (data.amenities) {
        additionalProps["amenityFeature"] = data.amenities.split(',').map(a => ({
          "@type": "LocationFeatureSpecification",
          "name": a.trim(),
          "value": true
        }));
      }

      if (data.bookingUrl) {
        additionalProps["potentialAction"] = {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": data.bookingUrl,
            "inLanguage": "en-US",
            "actionPlatform": [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/IOSPlatform",
              "http://schema.org/AndroidPlatform"
            ]
          },
          "result": {
            "@type": "LodgingReservation",
            "name": "Book a room"
          }
        };
      }

      if (data.checkinTime) additionalProps["checkinTime"] = data.checkinTime;
      break;
    case 'General':
      // General Business Logic
      if (data.type) schemaType = data.type; // Allow user to override type (Store, etc)
      if (data.description) additionalProps["description"] = data.description;
      if (data.openingHoursString) additionalProps["openingHours"] = data.openingHoursString;
      if (data.type === 'Store' || data.type === 'AutomotiveBusiness') {
        additionalProps["priceRange"] = data.priceRange || "$$";
      }
      break;
    default:
      schemaType = data.type || "LocalBusiness";
      break;
  }

  const schema: any = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": data.name,
    "image": data.image2 ? [data.image, data.image2].filter(Boolean) : data.image,
    "telephone": data.telephone,
    "email": data.email || undefined,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": data.address.street,
      "addressLocality": data.address.city,
      "postalCode": data.address.zip,
      "addressCountry": data.address.country
    },
    "openingHoursSpecification": data.openingHours?.map(spec => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": spec.dayOfWeek,
      "opens": spec.opens,
      "closes": spec.closes
    })) || [],
    "priceRange": data.priceRange || undefined,
    "hasMap": data.hasMap || undefined,
    "sameAs": [
      ...(data.sameAs || []), // Keep legacy/manual array if any
      data.socials?.facebook,
      data.socials?.instagram,
      data.socials?.twitter,
      data.socials?.youtube,
      data.socials?.linkedin
    ].filter(Boolean) as string[],
    ...additionalProps
  };

  if (schema.sameAs.length === 0) delete schema.sameAs;

  return JSON.stringify(schema, null, 2);
};

export const generateArticleSchema = (data: ArticleData) => {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": data.type || "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url || undefined
    },
    "headline": data.headline,
    "description": data.description || undefined,
    "image": data.image ? [data.image] : undefined,
    "keywords": data.keywords || undefined,

    // Dateline mapping (Specifically for NewsArticle)
    "contentLocation": data.contentLocation ? {
      "@type": "Place",
      "name": data.contentLocation
    } : undefined,

    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": data.authorType || "Person",
      "name": data.authorName,
      "url": data.authorUrl || undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisherName,
      "logo": data.publisherLogo ? {
        "@type": "ImageObject",
        "url": data.publisherLogo
      } : undefined
    }
  };
  return JSON.stringify(schema, null, 2);
};
