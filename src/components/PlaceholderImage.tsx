
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const PlaceholderImage: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-food-cream">
      <UtensilsCrossed className="h-12 w-12 text-food-orange/50" />
    </div>
  );
};

export default PlaceholderImage;
