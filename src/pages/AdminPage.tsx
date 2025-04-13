
import React, { useState } from 'react';
import AdminForm from '@/components/AdminForm';
import AdminLogin from '@/components/AdminLogin';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodGrid from '@/components/FoodGrid';
import { Admin } from '@/types/food';

const AdminPage: React.FC = () => {
  const { getAllFoodItems } = useFoodContext();
  const allFoods = getAllFoodItems();
  const [loggedInAdmin, setLoggedInAdmin] = useState<Admin | null>(null);

  const handleLogin = (admin: Admin) => {
    setLoggedInAdmin(admin);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-food-brown">Admin Dashboard</h2>
      
      {!loggedInAdmin ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AdminForm defaultAdmin={loggedInAdmin} />
          </div>
          
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Your Food Items</h3>
            <FoodGrid 
              foods={allFoods.filter(food => food.admin === loggedInAdmin)} 
              emptyMessage="You haven't added any food items yet."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
