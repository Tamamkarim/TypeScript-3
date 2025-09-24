// Main application entry point with proper TypeScript annotations
import { RestaurantUI } from './restaurant-ui';

// Function with proper return type annotation
function initializeApp(): void {
    // Proper type annotation for app
    const app: RestaurantUI = new RestaurantUI('app');
    
    // Proper return type and error handling types
    app.init().catch((error: unknown) => {
        console.error('Failed to initialize restaurant app:', error);
    });
    
    // Add search functionality if search input exists
    // Proper type annotation for searchInput
    const searchInput: HTMLElement | null = document.getElementById('search-input');
    if (searchInput) {
        // Proper type annotation for event parameter
        searchInput.addEventListener('input', (event: Event) => {
            // Proper type annotation for target with type assertion
            const target = event.target as HTMLInputElement;
            if (target) {
                // Proper type annotation for value
                const value: string = target.value;
                app.searchRestaurants(value);
            }
        });
    }
}

// Function with proper return type annotation
function handleDOMContentLoaded(): void {
    initializeApp();
}

// Event listener with proper type annotation for event parameter
document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

// Export for potential testing - proper type annotations
export { initializeApp, handleDOMContentLoaded };