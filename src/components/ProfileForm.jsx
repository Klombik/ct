function ProfileForm({ user, setUser }) {
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form style={{ display: 'grid', gap: '15px', maxWidth: '400px' }}>
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Дневная норма калорий:
        <input
          type="number"
          name="goal"
          value={user.goal}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Рост (см):
        <input
          type="number"
          name="height"
          value={user.height}
          onChange={handleChange}
        />
      </label>
      
      <label>
        Вес (кг):
        <input
          type="number"
          name="weight"
          value={user.weight}
          onChange={handleChange}
        />
      </label>
      
      <button type="button" style={{ padding: '10px' }}>
        Сохранить
      </button>
    </form>
  );
}

export default ProfileForm;