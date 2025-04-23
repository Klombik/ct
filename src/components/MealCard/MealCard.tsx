import React from 'react';
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import './MealCard.css';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  completed: boolean;
}

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    time: string;
    totalCalories: number;
    items: MealItem[];
  };
  
  onToggleItem: (mealId: string, itemId: string) => void;
  onEdit: (mealId: string) => void;
  onDelete: (mealId: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({ 
  meal, 
  onToggleItem, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="meal-card">
      <div className="meal-header">
        <div className="meal-time">{meal.time}</div>
        <h3 className="meal-name">{meal.name}</h3>
        <div className="meal-calories">{meal.totalCalories} ккал</div>
      </div>
      
      <ul className="meal-items">
        {meal.items.map((item) => (
          <li key={item.id} className="meal-item">
            <label className="meal-item-checkbox">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(meal.id, item.id)}
                className="hidden-checkbox"
              />
              <span className={`custom-checkbox ${item.completed ? 'checked' : ''}`}>
                {item.completed && <FiCheck className="check-icon" />}
              </span>
              <span className={`item-name ${item.completed ? 'completed' : ''}`}>
                {item.name}
              </span>
              <span className="item-calories">{item.calories} ккал</span>
            </label>
          </li>
        ))}
      </ul>
      
      <div className="meal-actions">
        <button 
          className="icon-btn edit-btn"
          onClick={() => onEdit(meal.id)}
        >
          <FiEdit />
        </button>
        <button 
          className="icon-btn delete-btn"
          onClick={() => onDelete(meal.id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default MealCard;