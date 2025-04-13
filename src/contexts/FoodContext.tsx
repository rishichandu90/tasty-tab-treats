import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem, Admin } from '@/types/food';
import { useToast } from '@/components/ui/use-toast';

interface FoodContextType {
  foodItems: FoodItem[];
  addFoodItem: (item: Omit<FoodItem, 'id' | 'date'>) => void;
  getFoodItemsByAdmin: (admin: Admin) => FoodItem[];
  getAllFoodItems: () => FoodItem[];
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const { toast } = useToast();

  // Load from localStorage on init
  useEffect(() => {
    const storedItems = localStorage.getItem('foodItems');
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setFoodItems(parsedItems);
      } catch (error) {
        console.error('Failed to parse stored food items:', error);
        setFoodItems([]); // Set to empty array if parsing fails
      }
    } else {
      // If no stored items, start with an empty array
      setFoodItems([]);
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }, [foodItems]);

  const addFoodItem = (item: Omit<FoodItem, 'id' | 'date'>) => {
    const newItem: FoodItem = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    setFoodItems(prev => [newItem, ...prev]);
    toast({
      title: "Success!",
      description: `${item.name} has been added to the collection.`,
    });
  };

  const getFoodItemsByAdmin = (admin: Admin) => {
    return foodItems.filter(item => item.admin === admin);
  };

  const getAllFoodItems = () => {
    return foodItems;
  };

  return (
    <FoodContext.Provider value={{ foodItems, addFoodItem, getFoodItemsByAdmin, getAllFoodItems }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFoodContext must be used within a FoodProvider');
  }
  return context;
};
