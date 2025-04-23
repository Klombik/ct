import React from 'react';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h2 className="home-page__title">Добро пожаловать в Трекер калорий</h2>
      <div className="home-page__content">
        <div className="home-page__card">
          <h3 className="home-page__card-title">Контролируйте питание</h3>
          <p className="home-page__card-text">
            Отслеживайте потребляемые калории и питательные вещества для достижения ваших целей.
          </p>
        </div>
        <div className="home-page__card">
          <h3 className="home-page__card-title">Планируйте диету</h3>
          <p className="home-page__card-text">
            Создавайте индивидуальные планы питания на основе ваших предпочтений и потребностей.
          </p>
        </div>
        <div className="home-page__card">
          <h3 className="home-page__card-title">Анализируйте прогресс</h3>
          <p className="home-page__card-text">
            Получайте подробную статистику и графики вашего прогресса в достижении целей.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;