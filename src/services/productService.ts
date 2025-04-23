import { Product } from '../types';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage';

const PRODUCTS_KEY = 'products';

const defaultProducts: Product[] = [
  { id: '1', name: 'Яблоко', calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
  { id: '2', name: 'Куриная грудка', calories: 165, protein: 31, fat: 3.6, carbs: 0 },
  { id: '3', name: 'Рис вареный', calories: 130, protein: 2.7, fat: 0.3, carbs: 28 },
];

export const getProducts = async (): Promise<Product[]> => {
  const savedProducts = loadFromLocalStorage<Product[]>(PRODUCTS_KEY, []);
  return savedProducts.length > 0 ? savedProducts : defaultProducts;
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const products = await getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
  };
  const updatedProducts = [...products, newProduct];
  saveToLocalStorage(PRODUCTS_KEY, updatedProducts);
  return newProduct;
};