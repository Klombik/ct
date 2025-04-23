import { useState } from 'react';

function CalculatorForm({ setResult }) {
  const [form, setForm] = useState({
    gender: 'male',
    weight: '',
    height: '',
    age: '',
    activity: '1.2'
  });

  const handleCalculate = () => {
    if (form.weight && form.height && form.age) {
      let bmr;
      if (form.gender === 'male') {
        bmr = 88.362 + (13.397 * form.weight) + (4.799 * form.height) - (5.677 * form.age);
      } else {
        bmr = 447.593 + (9.247 * form.weight) + (3.098 * form.height) - (4.330 * form.age);
      }
      setResult(Math.round(bmr * form.activity));
    }
  };

  return (
    <div style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
      <select 
        value={form.gender}
        onChange={(e) => setForm({...form, gender: e.target.value})}
      >
        <option value="male">Мужской</option>
        <option value="female">Женский</option>
      </select>
      
      <input
        type="number"
        placeholder="Вес (кг)"
        value={form.weight}
        onChange={(e) => setForm({...form, weight: e.target.value})}
      />
      
      <input
        type="number"
        placeholder="Рост (см)"
        value={form.height}
        onChange={(e) => setForm({...form, height: e.target.value})}
      />
      
      <input
        type="number"
        placeholder="Возраст"
        value={form.age}
        onChange={(e) => setForm({...form, age: e.target.value})}
      />
      
      <select
        value={form.activity}
        onChange={(e) => setForm({...form, activity: e.target.value})}
      >
        <option value="1.2">Минимальная активность</option>
        <option value="1.375">Легкая активность</option>
        <option value="1.55">Умеренная активность</option>
        <option value="1.725">Высокая активность</option>
      </select>
      
      <button onClick={handleCalculate} style={{ padding: '10px' }}>
        Рассчитать норму
      </button>
    </div>
  );
}

export default CalculatorForm;