import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Meal, UserProfile } from '../types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

interface AppContextType {
  products: Product[];
  meals: Meal[];
  profile: UserProfile;
  addProduct: (product: Omit<Product, 'id'>) => Promise<Product>;
  addMeal: (meal: Omit<Meal, 'id'>) => Promise<Meal>;
  updateProfile: (profile: UserProfile) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [profile, setProfile] = useState<UserProfile>(() => {
  const defaultProfile: UserProfile = {
    name: '',
    email: '',
    age: 30,
    height: 170,
    weight: 70,
    gender: 'male',
    goal: 'maintain',
    activityLevel: 'moderate',
    dailyCalorieGoal: 2000
  };
  return loadFromLocalStorage<UserProfile>('profile', defaultProfile);
});

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedMeals = localStorage.getItem('meals');
    const savedProfile = localStorage.getItem('profile');

    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedMeals) setMeals(JSON.parse(savedMeals));
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  }, []);

  // Сохранение данных при изменении
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
      return newProduct;
    };

  const addMeal = async (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  const newMeal: Meal = {
    ...meal,
    id: Date.now().toString(),
  };
  const updatedMeals = [...meals, newMeal];
  setMeals(updatedMeals);
  localStorage.setItem('meals', JSON.stringify(updatedMeals));
  return newMeal;
};

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <AppContext.Provider value={{ products, meals, profile, addProduct, addMeal, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
