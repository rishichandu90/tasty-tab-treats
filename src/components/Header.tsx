
import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="container mx-auto py-8 text-center">
      <div className="flex items-center justify-center mb-2">
        <UtensilsCrossed className="h-10 w-10 text-food-orange mr-2" />
        <h1 className="text-3xl md:text-4xl font-bold text-food-brown">
          Tasty Tab Treats
        </h1>
      </div>
      <p className="text-lg md:text-xl text-food-brown/80 italic font-display">
        Family recipes shared with love
      </p>
    </header>
  );
};

export default Header;
