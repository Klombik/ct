import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Diary.css';

function Diary({ days, onDeleteMeal }) {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const navigate = useNavigate();

  const currentDay = days.find(d => d.date === currentDate) || {
    meals: [],
    total: 0,
    goal: 2000
  };

  const progressWidth = Math.min(100, (currentDay.total / currentDay.goal) * 100);

  return (
    <div className="diary-page">
      <h2>Дневник питания</h2>
      
      <div className="date-picker">
        <input 
          type="date" 
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
        />
      </div>
      
      <div className="day-summary">
        <h3>Итого за {currentDate}:</h3>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ 
              width: `${progressWidth}%`,
              backgroundColor: progressWidth >= 100 ? '#f44336' : '#4CAF50'
            }}
          ></div>
        </div>
        <p>
          <span className="calories-consumed">{currentDay.total}</span> / 
          <span className="calories-goal">{currentDay.goal}</span> ккал
        </p>
      </div>
      
      <div className="meals-list">
        {currentDay.meals.length > 0 ? (
          currentDay.meals.map(meal => (
            <div key={meal.id} className="meal-card">
              <div className="meal-header">
                <h4>{meal.name}</h4>
                <button 
                  onClick={() => onDeleteMeal(currentDate, meal.id)}
                  className="delete-meal-btn"
                >
                  ×
                </button>
              </div>
              <p className="meal-calories">{meal.calories} ккал</p>
              <div className="meal-products">
                <h5>Продукты:</h5>
                <ul>
                  {meal.foods.map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="no-meals">Нет записей о приемах пищи за этот день</p>
        )}
      </div>
      
      <button 
        onClick={() => navigate(`/calculator?date=${currentDate}`)}
        className="add-meal-btn"
      >
        + Добавить прием пищи
      </button>
    </div>
  );
}

export default Diary;