import React, { useEffect } from 'react';
import { Product, ProductWithQuantity } from '../../types/Product';
import { getProducts } from '../../services/productService';
import './Calculator.css';

interface CalculatorProps {
  selectedProducts: ProductWithQuantity[];
  mealName: string;
  mealTime: string;
  onMealNameChange: (name: string) => void;
  onMealTimeChange: (time: string) => void;
  onAddProduct: (product: ProductWithQuantity) => void;
  onRemoveProduct: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSaveMeal: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({
  selectedProducts,
  mealName,
  onMealNameChange,
  onAddProduct,
  onRemoveProduct,
  onUpdateQuantity,
  onSaveMeal,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [products, setProducts] = React.useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await getProducts();
        const productsWithQuantity = productsData.map((product: Product) => ({
          ...product,
          quantity: 100
        }));
        setProducts(productsWithQuantity);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCalories = selectedProducts.reduce(
    (sum, product) => sum + (product.calories * product.quantity) / 100,
    0
  );

  return (
    <div className="calculator">
      <div className="calculator__left">
        <h3 className="calculator__subtitle">Выберите продукты:</h3>
        <input
          type="text"
          className="calculator__search"
          placeholder="Поиск продуктов..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <ul className="calculator__product-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="calculator__product-item">
              <span className="calculator__product-name">{product.name}</span>
              <span className="calculator__product-calories">{product.calories} ккал/100г</span>
              <button
                className="calculator__add-button"
                onClick={() => onAddProduct({ ...product, quantity: 100 })}
              >
                +
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="calculator__right">
        <div className="calculator__meal-name">
          <label>Название приёма пищи:</label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => onMealNameChange(e.target.value)}
            placeholder="Завтрак/Обед/Ужин"
          />
        </div>

        <h3 className="calculator__subtitle">Выбранные продукты:</h3>
        
        {selectedProducts.length === 0 ? (
          <p className="calculator__empty">Нет выбранных продуктов</p>
        ) : (
          <ul className="calculator__selected-list">
            {selectedProducts.map((product) => (
              <li key={product.id} className="calculator__selected-item">
                <div className="calculator__selected-info">
                  <span className="calculator__selected-name">{product.name}</span>
                  <input
                    type="number"
                    className="calculator__selected-quantity"
                    value={product.quantity}
                    onChange={(e) => onUpdateQuantity(product.id, Number(e.target.value))}
                    min="1"
                  />
                  <span className="calculator__selected-unit">г</span>
                </div>
                <span className="calculator__selected-calories">
                  {Math.round((product.calories * product.quantity) / 100)} ккал
                </span>
                <button
                  className="calculator__remove-button"
                  onClick={() => onRemoveProduct(product.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="calculator__total">
          <h3 className="calculator__subtitle">Итого калорий:</h3>
          <p className="calculator__total-calories">{Math.round(totalCalories)} ккал</p>
        </div>

        <button 
          className="calculator__save-button"
          onClick={onSaveMeal}
          disabled={selectedProducts.length === 0}
        >
          Сохранить прием пищи
        </button>
      </div>
    </div>
  );
};

export default Calculator;