import { useState } from 'react';
import ProductSelector from '../components/ProductSelector';
import './Calculator.css';

function Calculator({ products, onAddProduct, onSaveMeal }) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    calories: '',
    portion: 100
  });
  const [mealName, setMealName] = useState('');

  const handleAddProduct = (product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const handleAddCustomProduct = () => {
    if (!newProduct.name.trim() || isNaN(newProduct.calories)) {
      alert('Заполните все поля корректно!');
      return;
    }
    
    onAddProduct({
      name: newProduct.name,
      calories: Number(newProduct.calories),
      portion: Number(newProduct.portion) || 100
    });
    
    setNewProduct({ name: '', calories: '', portion: 100 });
    setIsAddingProduct(false);
  };

  const calculateTotalCalories = () => {
    return selectedProducts.reduce((sum, product) => sum + product.calories, 0);
  };

  const handleSaveMeal = () => {
    if (!mealName.trim()) {
      alert('Введите название приема пищи!');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Добавьте хотя бы один продукт!');
      return;
    }

    onSaveMeal({
      id: Date.now(),
      name: mealName,
      calories: calculateTotalCalories(),
      foods: selectedProducts.map(p => `${p.name} (${p.portion}г)`)
    });
  };

  return (
    <div className="calculator-page">
      <h2>Калькулятор калорий</h2>
      
      <div className="calculator-container">
        <div className="product-selection">
          <h3>Выберите продукты:</h3>
          <ProductSelector 
            products={products} 
            onAdd={handleAddProduct}
          />
          
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="add-product-btn"
          >
            + Добавить свой продукт
          </button>

          {isAddingProduct && (
            <div className="add-product-form">
              <h4>Добавить новый продукт</h4>
              <input
                type="text"
                placeholder="Название"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
              <input
                type="number"
                placeholder="Калории на 100г"
                value={newProduct.calories}
                onChange={(e) => setNewProduct({...newProduct, calories: e.target.value})}
              />
              <input
                type="number"
                placeholder="Порция (г)"
                value={newProduct.portion}
                onChange={(e) => setNewProduct({...newProduct, portion: e.target.value})}
              />
              <div className="form-buttons">
                <button onClick={handleAddCustomProduct}>Добавить</button>
                <button onClick={() => setIsAddingProduct(false)}>Отмена</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="selected-products">
          <h3>Выбранные продукты:</h3>
          {selectedProducts.length === 0 ? (
            <p>Нет выбранных продуктов</p>
          ) : (
            <ul>
              {selectedProducts.map(product => (
                <li key={product.id}>
                  <span className="product-name">{product.name}</span>
                  <span className="product-calories">{product.calories} ккал</span>
                  <button 
                    onClick={() => handleRemoveProduct(product.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="meal-name-input">
        <input
          type="text"
          placeholder="Название приема пищи (завтрак, обед...)"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </div>
      
      <div className="total-calories">
        <h3>Итого калорий:</h3>
        <p>{calculateTotalCalories()} ккал</p>
      </div>
      
      <button onClick={handleSaveMeal} className="save-meal-btn">
        Сохранить прием пищи
      </button>
    </div>
  );
}

export default Calculator;