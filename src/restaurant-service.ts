// Restaurant API service with proper TypeScript annotations
import { Restaurant, MenuItem, RestaurantApiResponse, ApiUser } from './types';

export class RestaurantService {
    private baseUrl: string = 'https://jsonplaceholder.typicode.com/users'; // Mock API
    
    // Method with proper return type annotation
    async fetchRestaurants(): Promise<Restaurant[]> {
        try {
            const response: Response = await fetch(this.baseUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Proper type annotation for data
            const data: ApiUser[] = await response.json();
            
            // Transform mock user data to restaurant data
            return this.transformToRestaurants(data);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
        }
    }
    
    // Method with proper parameter and return type annotations
    private transformToRestaurants(users: ApiUser[]): Restaurant[] {
        // Proper type annotation for return value
        return users.map((user: ApiUser) => ({
            id: user.id,
            name: user.company?.name || `${user.name}'s Restaurant`,
            cuisine: this.getRandomCuisine(),
            rating: this.getRandomRating(),
            address: `${user.address.street}, ${user.address.city}`,
            phone: user.phone,
            website: user.website,
            menu: this.generateMenu()
        }));
    }
    
    // Method with proper return type annotation
    private getRandomCuisine(): string {
        const cuisines: string[] = ['Italian', 'Mexican', 'Chinese', 'Japanese', 'American', 'French', 'Indian', 'Thai'];
        return cuisines[Math.floor(Math.random() * cuisines.length)];
    }
    
    // Method with proper return type annotation
    private getRandomRating(): number {
        return Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0 - 5.0 rating
    }
    
    // Method with proper return type annotation
    private generateMenu(): MenuItem[] {
        const menuItems: MenuItem[] = [
            { name: 'Appetizer Special', price: 8.99, description: 'Chef\'s choice starter' },
            { name: 'House Salad', price: 12.50, description: 'Fresh mixed greens' },
            { name: 'Main Course', price: 24.99, description: 'Today\'s featured dish' },
            { name: 'Dessert', price: 7.99, description: 'Sweet finish to your meal' }
        ];
        
        // Proper type annotation
        const selectedItems: MenuItem[] = [];
        const numItems: number = Math.floor(Math.random() * 3) + 2; // 2-4 items
        
        // Proper type annotations in loop
        for (let i: number = 0; i < numItems; i++) {
            const randomItem: MenuItem = menuItems[Math.floor(Math.random() * menuItems.length)];
            selectedItems.push(randomItem);
        }
        
        return selectedItems;
    }
    
    // Method with proper parameter and return type annotations
    async getRestaurantById(id: number): Promise<Restaurant | undefined> {
        const restaurants: Restaurant[] = await this.fetchRestaurants();
        // Proper type annotation for return value
        return restaurants.find((restaurant: Restaurant) => restaurant.id === id);
    }
    
    // Method with proper parameter and return type annotations  
    searchRestaurants(query: string): Promise<Restaurant[]> {
        return this.fetchRestaurants().then((restaurants: Restaurant[]) => {
            // Proper type annotation for filtered results
            return restaurants.filter((restaurant: Restaurant) => 
                restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
                restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
            );
        });
    }
}