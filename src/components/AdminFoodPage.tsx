
import React from 'react';
import { Admin } from '@/types/food';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodGrid from '@/components/FoodGrid';

interface AdminFoodPageProps {
  admin: Admin;
  title: string;
  description: string;
}

const AdminFoodPage: React.FC<AdminFoodPageProps> = ({ admin, title, description }) => {
  const { getFoodItemsByAdmin } = useFoodContext();
  const foods = getFoodItemsByAdmin(admin);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-food-brown">{title}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
      
      <FoodGrid 
        foods={foods} 
        emptyMessage={`No food items from ${admin} yet. Check back soon!`}
      />
    </div>
  );
};

export default AdminFoodPage;
