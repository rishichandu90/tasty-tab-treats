
import React from 'react';
import { FoodItem } from '@/types/food';
import FoodCard from './FoodCard';

interface FoodGridProps {
  foods: FoodItem[];
  emptyMessage?: string;
}

const FoodGrid: React.FC<FoodGridProps> = ({ foods, emptyMessage = "No food items found." }) => {
  if (foods.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodGrid;
