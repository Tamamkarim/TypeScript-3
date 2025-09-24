// Restaurant data type definitions

// Menu item interface
export interface MenuItem {
    name: string;
    price: number;
    description: string;
}

// Restaurant interface
export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    rating: number;
    address: string;
    phone: string;
    website?: string; // Optional property
    menu: MenuItem[];
}

// Mock API user data interface (for transformation)
export interface ApiUser {
    id: number;
    name: string;
    phone: string;
    website: string;
    company?: {
        name: string;
    };
    address: {
        street: string;
        city: string;
    };
}

// API Response interface for restaurant data
export interface RestaurantApiResponse {
    restaurants: Restaurant[];
    total: number;
}