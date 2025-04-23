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

