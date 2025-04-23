import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import CalculatorPage from './pages/CalculatorPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { AppProvider } from './context/AppContext';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;