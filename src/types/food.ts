
export type Admin = 'Rishi' | 'Atthamma' | 'Amma';

export interface FoodItem {
  id: string;
  name: string;
  vibe: string;
  imageUrl: string;
  date: string;
  admin: Admin;
}
