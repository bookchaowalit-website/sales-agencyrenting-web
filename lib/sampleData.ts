export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    price_type: string;
    location: string;
    property_type: string;
    bedrooms: number;
    bathrooms: number;
    size: number;
    images: string[];
    created_at: string;
    updated_at: string;
    features?: string[];
    agent?: {
        name: string;
        phone: string;
        image?: string;
    };
    isNew?: boolean;
    isFeatured?: boolean;
    views?: number;
    listedDate?: string;
    parking?: number;
    floor?: number;
    rating?: number;
    coordinates?: {
        lat: number;
        lng: number;
    };
    amenities?: string[];
    nearbyPlaces?: string[];
    yearBuilt?: number;
    furnishing?: "fully" | "partial" | "unfurnished";
    availability?: string;
    propertyId?: string;
}

export const sampleProperties: Property[] = [
    {
        id: "1",
        title: "Luxury Condo in Central Bangkok",
        description:
            "Beautiful modern condominium in the heart of Bangkok with stunning city views. Located near BTS stations and shopping centers.",
        price: 15000000,
        price_type: "sale",
        location: "Sukhumvit Road, Bangkok",
        property_type: "condo",
        bedrooms: 3,
        bathrooms: 2,
        size: 120,
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-01-15T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z",
        features: [
            "Swimming Pool",
            "Gym",
            "Security 24/7",
            "Parking",
            "Garden",
        ],
        agent: {
            name: "Somchai Prasert",
            phone: "+66 89 123 4567",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        isNew: true,
        isFeatured: true,
        views: 1250,
        listedDate: "2024-01-15",
        parking: 2,
        floor: 25,
        rating: 4.8,
        coordinates: { lat: 13.7563, lng: 100.5018 },
        amenities: [
            "Swimming Pool",
            "Fitness Center",
            "Concierge",
            "Rooftop Garden",
            "Conference Room",
        ],
        nearbyPlaces: ["BTS Phrom Phong", "EmQuartier Mall", "Benjasiri Park"],
        yearBuilt: 2022,
        furnishing: "fully",
        availability: "Immediate",
        propertyId: "BKK001",
    },
    {
        id: "2",
        title: "Beachfront Villa in Phuket",
        description:
            "Stunning beachfront villa with private pool and direct beach access. Perfect for vacation rental or permanent residence.",
        price: 85000,
        price_type: "rent",
        location: "Patong Beach, Phuket",
        property_type: "villa",
        bedrooms: 4,
        bathrooms: 3,
        size: 300,
        images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-01-20T00:00:00Z",
        updated_at: "2024-01-20T00:00:00Z",
        features: [
            "Private Beach",
            "Swimming Pool",
            "Garden",
            "Parking",
            "Sea View",
        ],
        agent: {
            name: "Siriporn Thanakit",
            phone: "+66 87 234 5678",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        isFeatured: true,
        views: 890,
        listedDate: "2024-01-20",
        parking: 3,
        rating: 4.9,
        coordinates: { lat: 7.8804, lng: 98.3923 },
        amenities: [
            "Private Pool",
            "Beach Access",
            "BBQ Area",
            "Outdoor Shower",
            "Tropical Garden",
        ],
        nearbyPlaces: ["Patong Beach", "Jungceylon Mall", "Bangla Road"],
        yearBuilt: 2020,
        furnishing: "fully",
        availability: "Available February",
        propertyId: "PHK001",
    },
    {
        id: "3",
        title: "Modern Townhouse in Chiang Mai",
        description:
            "Contemporary townhouse in trendy Nimman area. Walking distance to cafes, restaurants, and Chiang Mai University.",
        price: 8500000,
        price_type: "sale",
        location: "Nimmanhaemin, Chiang Mai",
        property_type: "townhouse",
        bedrooms: 3,
        bathrooms: 3,
        size: 180,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-01-25T00:00:00Z",
        updated_at: "2024-01-25T00:00:00Z",
        features: [
            "Modern Design",
            "Parking",
            "Air Conditioning",
            "Garden",
            "Security",
        ],
        agent: {
            name: "Niran Kulwong",
            phone: "+66 88 345 6789",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        isNew: true,
        views: 650,
        listedDate: "2024-01-25",
        parking: 2,
        rating: 4.6,
        coordinates: { lat: 18.7883, lng: 98.9853 },
        amenities: [
            "Private Garden",
            "Covered Parking",
            "Modern Kitchen",
            "Rooftop Terrace",
        ],
        nearbyPlaces: [
            "Maya Shopping Mall",
            "Chiang Mai University",
            "Think Park",
        ],
        yearBuilt: 2023,
        furnishing: "partial",
        availability: "Available March",
        propertyId: "CNX001",
    },
    {
        id: "4",
        title: "Affordable Condo for Rent",
        description:
            "Cozy studio apartment perfect for young professionals. Near BTS station and local amenities.",
        price: 18000,
        price_type: "rent",
        location: "On Nut, Bangkok",
        property_type: "condo",
        bedrooms: 1,
        bathrooms: 1,
        size: 35,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-01-30T00:00:00Z",
        updated_at: "2024-01-30T00:00:00Z",
        features: [
            "BTS Access",
            "Swimming Pool",
            "Fitness Center",
            "Security",
            "Laundry",
        ],
        agent: {
            name: "Achara Maneekan",
            phone: "+66 86 456 7890",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        views: 420,
        listedDate: "2024-01-30",
        parking: 1,
        floor: 12,
        rating: 4.3,
        coordinates: { lat: 13.7049, lng: 100.5986 },
        amenities: [
            "Swimming Pool",
            "Fitness Center",
            "Co-working Space",
            "Convenience Store",
        ],
        nearbyPlaces: ["BTS On Nut", "Tesco Lotus", "W Market"],
        yearBuilt: 2019,
        furnishing: "fully",
        availability: "Immediate",
        propertyId: "BKK002",
    },
    {
        id: "5",
        title: "Luxury House in Hua Hin",
        description:
            "Spacious family home with large garden and private pool. Quiet residential area close to the beach.",
        price: 22000000,
        price_type: "sale",
        location: "Cha-am, Hua Hin",
        property_type: "house",
        bedrooms: 5,
        bathrooms: 4,
        size: 400,
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-02-01T00:00:00Z",
        updated_at: "2024-02-01T00:00:00Z",
        features: [
            "Swimming Pool",
            "Large Garden",
            "Maid's Room",
            "Parking",
            "Sea Breeze",
        ],
        agent: {
            name: "Pranee Songkran",
            phone: "+66 85 567 8901",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        isFeatured: true,
        views: 780,
        listedDate: "2024-02-01",
        parking: 4,
        rating: 4.7,
        coordinates: { lat: 12.8225, lng: 99.9358 },
        amenities: [
            "Private Pool",
            "Large Garden",
            "Outdoor Kitchen",
            "Storage Room",
            "Covered Parking",
        ],
        nearbyPlaces: [
            "Hua Hin Beach",
            "Cicada Market",
            "Royal Hua Hin Golf Course",
        ],
        yearBuilt: 2021,
        furnishing: "partial",
        availability: "Available April",
        propertyId: "HHN001",
    },
    {
        id: "6",
        title: "Commercial Space for Rent",
        description:
            "Prime commercial space in business district. Perfect for office, retail, or restaurant. High foot traffic area.",
        price: 120000,
        price_type: "rent",
        location: "Asoke, Bangkok",
        property_type: "commercial",
        bedrooms: 0,
        bathrooms: 2,
        size: 200,
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-02-05T00:00:00Z",
        updated_at: "2024-02-05T00:00:00Z",
        features: [
            "High Ceiling",
            "Glass Front",
            "Air Conditioning",
            "Parking",
            "Security",
        ],
        agent: {
            name: "Kamon Thepsiri",
            phone: "+66 84 678 9012",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        views: 340,
        listedDate: "2024-02-05",
        parking: 6,
        floor: 1,
        rating: 4.4,
        coordinates: { lat: 13.7563, lng: 100.562 },
        amenities: [
            "High-speed Internet",
            "Meeting Rooms",
            "Reception Area",
            "Kitchen Facility",
        ],
        nearbyPlaces: ["MRT Sukhumvit", "Terminal 21", "Exchange Tower"],
        yearBuilt: 2018,
        furnishing: "unfurnished",
        availability: "Available May",
        propertyId: "BKK003",
    },
    {
        id: "7",
        title: "Cozy Apartment in Pattaya",
        description:
            "Comfortable apartment with sea view. Walking distance to Jomtien Beach and local restaurants.",
        price: 35000,
        price_type: "rent",
        location: "Jomtien Beach, Pattaya",
        property_type: "apartment",
        bedrooms: 2,
        bathrooms: 1,
        size: 80,
        images: [
            "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        created_at: "2024-02-10T00:00:00Z",
        updated_at: "2024-02-10T00:00:00Z",
        features: [
            "Sea View",
            "Balcony",
            "Swimming Pool",
            "Security",
            "Internet",
        ],
        agent: {
            name: "Wanida Seaside",
            phone: "+66 83 789 0123",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        views: 510,
        listedDate: "2024-02-10",
        parking: 1,
        floor: 8,
        rating: 4.2,
        coordinates: { lat: 12.8947, lng: 100.884 },
        amenities: [
            "Sea View",
            "Swimming Pool",
            "Beach Access",
            "Restaurant",
            "Mini Mart",
        ],
        nearbyPlaces: [
            "Jomtien Beach",
            "Walking Street",
            "Central Festival Pattaya",
        ],
        yearBuilt: 2017,
        furnishing: "fully",
        availability: "Available March",
        propertyId: "PTY001",
    },

    {
        id: "8",
        title: "Investment Land Plot",
        location: "Koh Samui, Surat Thani",
        price: 12000000,
        price_type: "sale",
        property_type: "land",
        created_at: "2024-02-12T00:00:00Z",
        updated_at: "2024-02-12T00:00:00Z",
        bedrooms: 0,
        bathrooms: 0,
        size: 1600,
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=entropy&cs=tinysrgb",
        ],
        description:
            "Prime land plot with sea view. Perfect for hotel or residential development. Excellent investment opportunity.",
        features: [
            "Sea View",
            "Development Rights",
            "Road Access",
            "Utilities",
            "Mountain View",
        ],
        agent: {
            name: "Sakchai Island",
            phone: "+66 82 890 1234",
            image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face&cs=tinysrgb",
        },
        views: 280,
        listedDate: "2024-02-12",
        rating: 4.5,
        coordinates: { lat: 9.533, lng: 99.9426 },
        amenities: [
            "Sea View",
            "Mountain View",
            "Beach Access",
            "Development Rights",
        ],
        nearbyPlaces: ["Chaweng Beach", "Samui Airport", "Fisherman's Village"],
        furnishing: "unfurnished",
        availability: "Available",
        propertyId: "KSM001",
    },
];

/** Lower-case and strip everything except letters and digits. */
export const compactText = (value: string): string =>
    value.toLowerCase().replace(/[^a-z0-9\u0e00-\u0e7f]+/g, "");

/** Parse a numeric filter ("", "any", or a number); null means "no filter". */
export const parseFilterNumber = (value?: string): number | null => {
    if (!value || value === "any") return null;
    const parsed = Number(value.replace(/[,\s]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
};

// Utility functions for filtering and searching
export const filterProperties = (
    properties: Property[],
    filters: {
        keyword?: string;
        location?: string;
        type?: string;
        priceMin?: string;
        priceMax?: string;
        bedrooms?: string;
        bathrooms?: string;
        size?: string;
        saleType?: string;
    },
): Property[] => {
    return properties.filter((property) => {
        // Keyword search
        const keywordInput = filters.keyword?.trim();
        if (keywordInput) {
            const keyword = keywordInput.toLowerCase();
            const searchText =
                `${property.title} ${property.location} ${property.description}`.toLowerCase();
            if (!searchText.includes(keyword)) return false;
        }

        // Location filter
        if (
            filters.location &&
            filters.location !== "" &&
            filters.location !== "any"
        ) {
            // Filter values are slugs ("chiangmai", "koh_samui") while data
            // uses display names ("Nimmanhaemin, Chiang Mai"); compare both
            // with spaces/punctuation removed.
            const locationMatch = compactText(property.location).includes(
                compactText(filters.location),
            );
            if (!locationMatch) return false;
        }

        // Property type filter
        if (filters.type && filters.type !== "" && filters.type !== "any") {
            if (property.property_type !== filters.type) return false;
        }

        // Price range filter
        const priceMinFilter = parseFilterNumber(filters.priceMin);
        if (priceMinFilter !== null && property.price < priceMinFilter) return false;
        const priceMaxFilter = parseFilterNumber(filters.priceMax);
        if (priceMaxFilter !== null && property.price > priceMaxFilter) return false;

        // Bedrooms filter
        const bedroomsFilter = parseFilterNumber(filters.bedrooms);
        if (bedroomsFilter !== null && property.bedrooms < bedroomsFilter) return false;

        // Bathrooms filter
        const bathroomsFilter = parseFilterNumber(filters.bathrooms);
        if (bathroomsFilter !== null && property.bathrooms < bathroomsFilter) return false;

        // Size filter
        const sizeFilter = parseFilterNumber(filters.size);
        if (sizeFilter !== null && property.size < sizeFilter) return false;

        // Sale type filter
        if (
            filters.saleType &&
            filters.saleType !== "" &&
            filters.saleType !== "any"
        ) {
            if (property.price_type !== filters.saleType) return false;
        }

        return true;
    });
};

/** Listing time in ms; falls back to created_at, then 0, so sorting never sees NaN. */
const listedTime = (property: Property): number => {
    const time = Date.parse(property.listedDate || property.created_at || "");
    return Number.isNaN(time) ? 0 : time;
};

// Sort properties
export const sortProperties = (
    properties: Property[],
    sortBy:
        | "price-asc"
        | "price-desc"
        | "date-new"
        | "date-old"
        | "size-asc"
        | "size-desc" = "date-new",
): Property[] => {
    return [...properties].sort((a, b) => {
        switch (sortBy) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "date-new":
                return listedTime(b) - listedTime(a);
            case "date-old":
                return listedTime(a) - listedTime(b);
            case "size-asc":
                return a.size - b.size;
            case "size-desc":
                return b.size - a.size;
            default:
                return 0;
        }
    });
};

// Get featured properties
export const getFeaturedProperties = (limit: number = 6): Property[] => {
    return sampleProperties
        .filter((property) => property.isFeatured)
        .slice(0, limit);
};
