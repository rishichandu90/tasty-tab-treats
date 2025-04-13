
import React, { useState } from 'react';
import { Admin } from '@/types/food';
import { useFoodContext } from '@/contexts/FoodContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminForm: React.FC = () => {
  const { addFoodItem } = useFoodContext();
  const [foodName, setFoodName] = useState('');
  const [vibe, setVibe] = useState('');
  const [admin, setAdmin] = useState<Admin | ''>('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName || !vibe || !admin) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would upload the image to a server and get a URL back
    // For now, we'll use the local image preview URL
    const imageUrl = imagePreview || '';
    
    addFoodItem({
      name: foodName,
      vibe,
      admin: admin as Admin,
      imageUrl
    });
    
    // Reset form
    setFoodName('');
    setVibe('');
    setAdmin('');
    setImage(null);
    setImagePreview(null);
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Food Item</CardTitle>
        <CardDescription>
          Share your delicious food creation with everyone!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foodName">Food Name</Label>
            <Input
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="E.g., Butter Chicken"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vibe">Today's Vibe</Label>
            <Textarea
              id="vibe"
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="Describe the mood or occasion..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="admin">Admin</Label>
            <Select
              value={admin}
              onValueChange={(value) => setAdmin(value as Admin)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select who you are" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rishi">Rishi</SelectItem>
                <SelectItem value="Atthamma">Atthamma</SelectItem>
                <SelectItem value="Amma">Amma</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Food Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            
            {imagePreview && (
              <div className="mt-4 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-4 bg-food-orange hover:bg-food-orange/90" 
            disabled={isSubmitting || !foodName || !vibe || !admin}
          >
            {isSubmitting ? 'Adding...' : 'Add Food Item'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminForm;
