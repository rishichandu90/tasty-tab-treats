
import React from 'react';
import { FoodItem } from '@/types/food';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PlaceholderImage from '@/components/PlaceholderImage';

interface FoodCardProps {
  food: FoodItem;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <Card className="overflow-hidden card-hover bg-white">
      <div className="h-48 overflow-hidden">
        {food.imageUrl ? (
          <img 
            src={food.imageUrl} 
            alt={food.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{food.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">{food.vibe}</p>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>By {food.admin}</span>
        <span>{food.date}</span>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
