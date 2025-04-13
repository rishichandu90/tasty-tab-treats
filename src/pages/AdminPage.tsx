
import React from 'react';
import AdminForm from '@/components/AdminForm';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodGrid from '@/components/FoodGrid';

const AdminPage: React.FC = () => {
  const { getAllFoodItems } = useFoodContext();
  const allFoods = getAllFoodItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-food-brown">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AdminForm />
        </div>
        
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-4">Your Food Items</h3>
          <FoodGrid 
            foods={allFoods} 
            emptyMessage="You haven't added any food items yet."
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
