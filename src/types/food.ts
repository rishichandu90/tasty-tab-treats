
export type Admin = 'Rishi' | 'Atthamma' | 'Amma';

export interface AdminCredentials {
  username: string;
  password: string;
}

export const ADMIN_CREDENTIALS: Record<Admin, AdminCredentials> = {
  'Rishi': { username: 'rishi', password: 'food123' },
  'Atthamma': { username: 'atthamma', password: 'food123' },
  'Amma': { username: 'amma', password: 'food123' }
};

export interface FoodItem {
  id: string;
  name: string;
  vibe: string;
  imageUrl: string;
  date: string;
  admin: Admin;
}
