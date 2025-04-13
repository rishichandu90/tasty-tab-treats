
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem, Admin } from '@/types/food';
import { useToast } from '@/components/ui/use-toast';

// Sample food items that will always be available
const SAMPLE_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'sample-1',
    name: 'Vegetable Biryani',
    vibe: 'Perfect for a family gathering',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    date: '2025-04-10',
    admin: 'Atthamma'
  },
  {
    id: 'sample-2',
    name: 'Butter Chicken',
    vibe: 'Comfort food for a rainy day',
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    date: '2025-04-08',
    admin: 'Rishi'
  },
  {
    id: 'sample-3',
    name: 'Coconut Chutney',
    vibe: 'Perfect side for breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    date: '2025-04-05',
    admin: 'Amma'
  }
];

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
        // Combine stored items with sample items, ensuring no duplicates by ID
        const combinedItems = [...parsedItems];
        // Only add sample items if they don't exist in stored items
        SAMPLE_FOOD_ITEMS.forEach(sampleItem => {
          if (!combinedItems.some(item => item.id === sampleItem.id)) {
            combinedItems.push(sampleItem);
          }
        });
        setFoodItems(combinedItems);
      } catch (error) {
        console.error('Failed to parse stored food items:', error);
        // If parsing fails, fall back to sample items
        setFoodItems(SAMPLE_FOOD_ITEMS);
      }
    } else {
      // If no stored items, use sample items
      setFoodItems(SAMPLE_FOOD_ITEMS);
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
