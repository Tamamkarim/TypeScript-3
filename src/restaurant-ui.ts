// UI Manager with proper TypeScript annotations
import { RestaurantService } from './restaurant-service';
import { Restaurant, MenuItem } from './types';

export class RestaurantUI {
    private restaurantService: RestaurantService;
    private container: HTMLElement | null; // Add proper property declaration
    
    // Proper parameter type annotation
    constructor(containerId: string) {
        this.restaurantService = new RestaurantService();
        // Proper type annotation for container
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container with id '${containerId}' not found`);
        }
    }
    
    // Method with proper return type annotation
    async init(): Promise<void> {
        try {
            await this.loadRestaurants();
        } catch (error) {
            this.showError('Failed to load restaurants. Please try again later.');
            console.error('Error initializing app:', error);
        }
    }
    
    // Method with proper return type annotation
    private async loadRestaurants(): Promise<void> {
        this.showLoading();
        
        try {
            // Proper type annotation for restaurants
            const restaurants: Restaurant[] = await this.restaurantService.fetchRestaurants();
            this.displayRestaurants(restaurants);
        } catch (error) {
            this.showError('Error loading restaurants');
            throw error;
        }
    }
    
    // Method with proper parameter and return type annotations
    private displayRestaurants(restaurants: Restaurant[]): void {
        if (!this.container) return;
        
        // Proper type annotation for html
        let html: string = '<div class="restaurant-grid">';
        
        // Proper type annotation in forEach
        restaurants.forEach((restaurant: Restaurant) => {
            html += this.createRestaurantCard(restaurant);
        });
        
        html += '</div>';
        this.container.innerHTML = html;
    }
    
    // Method with proper parameter and return type annotations
    private createRestaurantCard(restaurant: Restaurant): string {
        // Proper type annotation for menuHtml
        let menuHtml: string = '';
        
        // Proper type annotations in forEach  
        restaurant.menu.forEach((item: MenuItem) => {
            menuHtml += `
                <div class="menu-item">
                    <div class="menu-item-name">${item.name}</div>
                    <div>$${item.price}</div>
                    <div>${item.description}</div>
                </div>
            `;
        });
        
        return `
            <div class="restaurant-card">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-cuisine">Cuisine: ${restaurant.cuisine}</div>
                <div class="restaurant-rating">⭐ ${restaurant.rating}/5.0</div>
                <div>📍 ${restaurant.address}</div>
                <div>📞 ${restaurant.phone}</div>
                ${restaurant.website ? `<div>🌐 ${restaurant.website}</div>` : ''}
                <h4>Menu:</h4>
                ${menuHtml}
            </div>
        `;
    }
    
    // Method with proper return type annotation
    private showLoading(): void {
        if (!this.container) return;
        this.container.innerHTML = '<div class="loading">Loading restaurants...</div>';
    }
    
    // Method with proper parameter and return type annotations
    private showError(message: string): void {
        if (!this.container) return;
        this.container.innerHTML = `<div class="error">❌ ${message}</div>`;
    }
    
    // Method with proper parameter and return type annotations
    async searchRestaurants(query: string): Promise<void> {
        if (!query.trim()) {
            await this.loadRestaurants();
            return;
        }
        
        try {
            // Proper type annotation for results
            const results: Restaurant[] = await this.restaurantService.searchRestaurants(query);
            this.displayRestaurants(results);
        } catch (error) {
            this.showError('Error searching restaurants');
            console.error('Search error:', error);
        }
    }
    
    // Method with proper parameter and return type annotations
    async showRestaurantDetails(id: number): Promise<void> {
        try {
            // Proper type annotation for restaurant
            const restaurant: Restaurant | undefined = await this.restaurantService.getRestaurantById(id);
            
            if (restaurant) {
                this.displayRestaurants([restaurant]);
            } else {
                this.showError('Restaurant not found');
            }
        } catch (error) {
            this.showError('Error loading restaurant details');
            console.error('Detail error:', error);
        }
    }
}