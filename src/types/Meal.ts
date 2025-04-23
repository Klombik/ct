export interface MealProduct {
  id: string;
  name: string;
  calories: number;
  quantity: number;
}

export interface Meal {
  id: string;
  date: Date;
  name: string;
  products: MealProduct[];
  totalCalories: number;
}