import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Calculator from './pages/Calculator';
import Products from './pages/Products';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const [days, setDays] = useState(() => {
    const savedData = localStorage.getItem('diaryData');
    return savedData ? JSON.parse(savedData) : [
      {
        date: new Date().toISOString().split('T')[0],
        meals: [],
        total: 0,
        goal: 2000
      }
    ];
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Яблоко', calories: 52, portion: 100 },
    { id: 2, name: 'Куриная грудка', calories: 165, portion: 100 },
    { id: 3, name: 'Рис вареный', calories: 130, portion: 100 }
  ]);

  useEffect(() => {
    localStorage.setItem('diaryData', JSON.stringify(days));
  }, [days]);

  const addNewProduct = (newProduct) => {
    setProducts([...products, {
      ...newProduct,
      id: Date.now(),
      portion: newProduct.portion || 100
    }]);
  };

  const addMealToDay = (date, newMeal) => {
    setDays(prevDays => {
      const dayIndex = prevDays.findIndex(d => d.date === date);
      
      if (dayIndex >= 0) {
        const updatedDays = [...prevDays];
        updatedDays[dayIndex] = {
          ...updatedDays[dayIndex],
          meals: [...updatedDays[dayIndex].meals, newMeal],
          total: updatedDays[dayIndex].total + newMeal.calories
        };
        return updatedDays;
      } else {
        return [...prevDays, {
          date,
          meals: [newMeal],
          total: newMeal.calories,
          goal: 2000
        }];
      }
    });
  };

  const deleteMeal = (date, mealId) => {
    setDays(prevDays => 
      prevDays.map(day => 
        day.date === date
          ? {
              ...day,
              meals: day.meals.filter(m => m.id !== mealId),
              total: day.total - (day.meals.find(m => m.id === mealId)?.calories || 0)
            }
          : day
      )
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/diary" 
            element={<Diary days={days} onDeleteMeal={deleteMeal} />} 
          />
          <Route 
            path="/calculator" 
            element={
              <Calculator 
                products={products} 
                onAddProduct={addNewProduct}
                onSaveMeal={(meal) => {
                  const urlParams = new URLSearchParams(window.location.search);
                  const date = urlParams.get('date') || new Date().toISOString().split('T')[0];
                  addMealToDay(date, meal);
                  window.location.href = '/diary';
                }}
              />
            } 
          />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;