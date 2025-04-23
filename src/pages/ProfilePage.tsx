import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { UserProfile } from '../types';
import './ProfilePage.css';

const calculateDailyCalories = (profile: UserProfile): number => {
  // Формула Миффлина-Сан Жеора
  let bmr: number;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }

  const activityFactors = {
    low: 1.2,
    moderate: 1.55,
    high: 1.725,
    very_high: 1.9
  };
  
  const maintenanceCalories = bmr * activityFactors[profile.activityLevel];

  switch (profile.goal) {
    case 'lose': return maintenanceCalories - 500;
    case 'gain': return maintenanceCalories + 500;
    default: return maintenanceCalories;
  }
};

const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useAppContext();

  const [userData, setUserData] = useState<UserProfile>({
    name: '',
    email: '',
    age: 0,
    height: 0,
    weight: 0,
    gender: 'male',
    goal: 'maintain',
    activityLevel: 'moderate',
    dailyCalorieGoal: 0
  });
  
  useEffect(() => {
    if (profile) {
      setUserData({
        name: profile.name || '',
        email: profile.email || '',
        age: profile.age || 0,
        height: profile.height || 0,
        weight: profile.weight || 0,
        gender: profile.gender || 'male',
        goal: profile.goal || 'maintain',
        activityLevel: profile.activityLevel || 'moderate',
        dailyCalorieGoal: profile.dailyCalorieGoal || 0
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'height' || name === 'weight' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  updateProfile({
    name: userData.name,
    email: userData.email,
    age: userData.age,
    height: userData.height,
    weight: userData.weight,
    gender: userData.gender as 'male' | 'female',
    goal: userData.goal as 'lose' | 'maintain' | 'gain',
    activityLevel: userData.activityLevel as 'low' | 'moderate' | 'high' | 'very_high',
    dailyCalorieGoal: calculateDailyCalories({
      ...userData,
      gender: userData.gender as 'male' | 'female',
      goal: userData.goal as 'lose' | 'maintain' | 'gain',
      activityLevel: userData.activityLevel as 'low' | 'moderate' | 'high' | 'very_high'
    })
  });
};

  return (
    <div className="profile-page">
      <h2 className="profile-page__title">Профиль пользователя</h2>

      <form className="profile-page__form" onSubmit={handleSubmit}>
        <div className="profile-page__form-group">
          <label htmlFor="name" className="profile-page__label">
            Имя:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="profile-page__input"
          />
        </div>

        <div className="profile-page__form-group">
          <label htmlFor="email" className="profile-page__label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ''}
            onChange={handleChange}
            className="profile-page__input"
          />
        </div>

        <div className="profile-page__form-row">
          <div className="profile-page__form-group">
            <label htmlFor="age" className="profile-page__label">
              Возраст:
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={userData.age}
              onChange={handleChange}
              className="profile-page__input"
              min="10"
              max="120"
            />
          </div>

          <div className="profile-page__form-group">
            <label htmlFor="height" className="profile-page__label">
              Рост (см):
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={userData.height}
              onChange={handleChange}
              className="profile-page__input"
              min="100"
              max="250"
            />
          </div>

          <div className="profile-page__form-group">
            <label htmlFor="weight" className="profile-page__label">
              Вес (кг):
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={userData.weight}
              onChange={handleChange}
              className="profile-page__input"
              min="30"
              max="300"
            />
          </div>
        </div>

        <div className="profile-page__form-group">
          <label htmlFor="goal" className="profile-page__label">
            Цель:
          </label>
          <select
            id="goal"
            name="goal"
            value={userData.goal}
            onChange={handleChange}
            className="profile-page__select"
          >
            <option value="lose">Похудение</option>
            <option value="maintain">Поддержание веса</option>
            <option value="gain">Набор массы</option>
          </select>
        </div>

        <div className="profile-page__form-group">
          <label htmlFor="activityLevel" className="profile-page__label">
            Уровень активности:
          </label>
          <select
            id="activityLevel"
            name="activityLevel"
            value={userData.activityLevel}
            onChange={handleChange}
            className="profile-page__select"
          >
            <option value="low">Низкий</option>
            <option value="moderate">Умеренный</option>
            <option value="high">Высокий</option>
            <option value="very_high">Очень высокий</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">Пол:</label>
          <select
            id="gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            className="profile-page__select"
          >
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <button type="submit" className="profile-page__submit-button">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
