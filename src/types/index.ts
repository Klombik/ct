export interface Product {
  id: string;
  name: string;
  calories: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

export interface ProductWithQuantity extends Product {
  quantity: number;
}

export interface MealProduct extends ProductWithQuantity {}

export interface MealItem {
  id: string;
  name: string;
  calories: number;
  completed: boolean;
}

export interface Meal {
  id: string;
  name: string;
  date: string;
  time: string;
  totalCalories: number;
  items: MealItem[];
  proteins?: number;
  fats?: number;
  carbs?: number;
}

export interface UserProfile {
  name: string;
  email?: string;
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  goal: 'lose' | 'maintain' | 'gain';
  activityLevel: 'low' | 'moderate' | 'high' | 'very_high';
  dailyCalorieGoal?: number;
}
