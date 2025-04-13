
import React from 'react';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodGrid from '@/components/FoodGrid';

const AllFoodsPage: React.FC = () => {
  const { getAllFoodItems } = useFoodContext();
  const allFoods = getAllFoodItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-food-brown">All Food Items</h2>
      <FoodGrid 
        foods={allFoods} 
        emptyMessage="No food items have been added yet. Check back soon!"
      />
    </div>
  );
};

export default AllFoodsPage;
