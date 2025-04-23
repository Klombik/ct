import { Meal } from '../types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const MEALS_KEY = 'meals';

export const getMeals = async (): Promise<Meal[]> => {
  return loadFromLocalStorage<Meal[]>(MEALS_KEY, []);
};

export const addMeal = async (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  const meals = await getMeals();
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
  };
  saveToLocalStorage(MEALS_KEY, [...meals, newMeal]);
  return newMeal;
};