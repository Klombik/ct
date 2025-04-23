import React, { useState } from 'react';
import Calculator from '../components/Calculator/Calculator';
import { ProductWithQuantity } from '../types/Product';
import { useAppContext } from '../context/AppContext';
import './CalculatorPage.css';
import { format } from 'date-fns';

const CalculatorPage: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState('12:00'); // Добавляем состояние для времени
  const { addMeal } = useAppContext();

  const handleAddProduct = (product: ProductWithQuantity) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setSelectedProducts(selectedProducts.map(product => 
      product.id === id ? { ...product, quantity } : product
    ));
  };

  const calculateTotalCalories = () => {
    return selectedProducts.reduce(
      (sum, product) => sum + (product.calories * product.quantity) / 100,
      0
    );
  };

  const handleSaveMeal = () => {
    if (selectedProducts.length === 0) {
      alert('Добавьте хотя бы один продукт');
      return;
    }

    const mealItems = selectedProducts.map(product => ({
      ...product,
      completed: false
    }));

    addMeal({
      date: format(new Date(), 'yyyy-MM-dd'),
      name: mealName || 'Без названия',
      time: mealTime, // Добавляем время приема пищи
      items: mealItems,
      totalCalories: calculateTotalCalories(),
    });

    setSelectedProducts([]);
    setMealName('');
    alert('Приём пищи сохранён в дневник!');
  };

  return (
    <div className="calculator-page">
      <h2 className="calculator-page__title">Калькулятор калорий</h2>
      <Calculator 
        selectedProducts={selectedProducts}
        mealName={mealName}
        mealTime={mealTime}
        onMealNameChange={setMealName}
        onMealTimeChange={setMealTime} // Передаем функцию изменения времени
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
        onUpdateQuantity={handleUpdateQuantity}
        onSaveMeal={handleSaveMeal}
      />
    </div>
  );
};

export default CalculatorPage;