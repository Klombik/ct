import React from 'react';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import ProgressChart from '../components/ProgressChart/ProgressChart';
import MealCard from '../components/MealCard/MealCard';
import { Meal, MealItem } from '../types';
import './DiaryPage.css';


const DiaryPage: React.FC = () => {
  const { meals, profile } = useAppContext();

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayMeals = meals.filter(meal =>
    format(new Date(meal.date), 'yyyy-MM-dd') === today
  );

  const totalCaloriesToday = todayMeals.reduce(
    (sum, meal) => sum + (meal.totalCalories || 0),
    0
  );

  const totalMacros = todayMeals.reduce(
    (totals, meal) => ({
      proteins: totals.proteins + (meal.proteins || 0),
      fats: totals.fats + (meal.fats || 0),
      carbs: totals.carbs + (meal.carbs || 0),
    }),
    { proteins: 0, fats: 0, carbs: 0 }
  );

  // Заглушки для обработки MealCard событий
  const handleToggleItem = (mealId: string, itemId: string) => {
    console.log(`Toggle item ${itemId} in meal ${mealId}`);
  };

  const handleEditMeal = (mealId: string) => {
    console.log(`Edit meal ${mealId}`);
  };

  const handleDeleteMeal = (mealId: string) => {
    console.log(`Delete meal ${mealId}`);
  };

  return (
    <div className="diary-page">
      <h1 className="page-title">Дневник питания</h1>

      <div className="daily-summary">
        <ProgressChart
          consumed={totalCaloriesToday}
          goal={profile.dailyCalorieGoal || 0}
        />

        <div className="macros-summary">
          <div className="macro-item">
            <span className="macro-value">{totalMacros.proteins}g</span>
            <span className="macro-label">Белки</span>
          </div>
          <div className="macro-item">
            <span className="macro-value">{totalMacros.fats}g</span>
            <span className="macro-label">Жиры</span>
          </div>
          <div className="macro-item">
            <span className="macro-value">{totalMacros.carbs}g</span>
            <span className="macro-label">Углеводы</span>
          </div>
        </div>
      </div>

      <div className="meals-section">
        <h2 className="section-title">Сегодня</h2>

        {todayMeals.map(meal => (
          <MealCard
            key={meal.id}
            meal={meal}
            onToggleItem={handleToggleItem}
            onEdit={handleEditMeal}
            onDelete={handleDeleteMeal}
          />
        ))}
      </div>
    </div>
  );
};

export default DiaryPage;
