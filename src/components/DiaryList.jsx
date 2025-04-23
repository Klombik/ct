function DiaryList({ meals, setMeals }) {
  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);

  const handleDelete = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <div>
      <h3>Итого за день: {totalCalories} ккал</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {meals.map(meal => (
          <li key={meal.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            padding: '10px',
            borderBottom: '1px solid #eee'
          }}>
            <span>{meal.name} - {meal.calories} ккал</span>
            <button onClick={() => handleDelete(meal.id)} style={{ color: 'red' }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList;