
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodItem, Admin } from '@/types/food';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FoodContextType {
  foodItems: FoodItem[];
  addFoodItem: (item: Omit<FoodItem, 'id' | 'date'>) => void;
  getFoodItemsByAdmin: (admin: Admin) => FoodItem[];
  getAllFoodItems: () => FoodItem[];
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch food items from Supabase on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('food_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching food items:', error);
          toast({
            title: "Error",
            description: "Failed to load food items. Please try again later.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setFoodItems(data as FoodItem[]);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:food_items')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'food_items' 
      }, (payload) => {
        console.log('Change received!', payload);
        fetchFoodItems();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const addFoodItem = async (item: Omit<FoodItem, 'id' | 'date'>) => {
    const newItem: Omit<FoodItem, 'id'> = {
      ...item,
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    try {
      const { data, error } = await supabase
        .from('food_items')
        .insert([newItem])
        .select();

      if (error) {
        console.error('Error adding food item:', error);
        toast({
          title: "Error",
          description: "Failed to add food item. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        // No need to update state manually since we're using real-time subscription
        toast({
          title: "Success!",
          description: `${item.name} has been added to the collection.`,
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
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
