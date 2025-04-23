import React from 'react';
import { Meal } from '../../types/Meal';
import './MealList.css';

interface MealListProps {
  meals: Meal[];
}

const MealList: React.FC<MealListProps> = ({ meals }) => {
  return (
    <div className="meal-list">
      {meals.map(meal => (
        <div key={meal.id} className="meal-item">
          <div className="meal-header">
            <h3 className="meal-name">{meal.name}</h3>
            <span className="meal-date">{meal.date.toLocaleDateString()}</span>
            <span className="meal-calories">{meal.totalCalories} ккал</span>
          </div>
          <ul className="meal-products">
            {meal.products.map(product => (
              <li key={product.id} className="meal-product">
                {product.name} - {product.quantity}г ({product.calories} ккал)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MealList;