
import React from 'react';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodGrid from '@/components/FoodGrid';

const HomePage: React.FC = () => {
  const { getAllFoodItems } = useFoodContext();
  const recentItems = getAllFoodItems().slice(0, 3); // Get just the 3 most recent items

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-food-brown">Welcome to Tasty Tab Treats</h2>
          <p className="text-lg text-muted-foreground">
            Discover delicious homemade recipes from Rishi, Atthamma, and Amma. 
            Our family loves sharing food that brings joy and comfort.
          </p>
        </div>
        
        <div className="bg-food-cream rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Recent Additions</h3>
          <FoodGrid 
            foods={recentItems}
            emptyMessage="No food items yet. Check back soon for delicious recipes!"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold mb-3 text-food-brown">Rishi's Kitchen</h3>
            <p className="text-muted-foreground">
              Explore Rishi's creative and modern take on traditional recipes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold mb-3 text-food-brown">Atthamma's Specialties</h3>
            <p className="text-muted-foreground">
              Discover authentic family recipes passed down through generations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
            <h3 className="text-xl font-bold mb-3 text-food-brown">Amma's Comfort Food</h3>
            <p className="text-muted-foreground">
              Experience the warmth and love in every dish made by Amma.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
