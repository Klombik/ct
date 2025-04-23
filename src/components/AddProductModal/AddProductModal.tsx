import React from 'react';
import { Product } from '../../types/Product';
import './AddProductModal.css';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const [calories, setCalories] = React.useState<number>(0);
  const [protein, setProtein] = React.useState<number | undefined>(undefined);
  const [fat, setFat] = React.useState<number | undefined>(undefined);
  const [carbs, setCarbs] = React.useState<number | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      calories,
      protein,
      fat,
      carbs,
    });
    setName('');
    setCalories(0);
    setProtein(undefined);
    setFat(undefined);
    setCarbs(undefined);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Добавить свой продукт</h3>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Название продукта:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="calories">Калорийность (на 100г):</label>
            <input
              type="number"
              id="calories"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              required
              min="0"
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="protein">Белки (г):</label>
              <input
                type="number"
                id="protein"
                value={protein || ''}
                onChange={(e) => setProtein(e.target.value ? Number(e.target.value) : undefined)}
                min="0"
                step="0.1"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fat">Жиры (г):</label>
              <input
                type="number"
                id="fat"
                value={fat || ''}
                onChange={(e) => setFat(e.target.value ? Number(e.target.value) : undefined)}
                min="0"
                step="0.1"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="carbs">Углеводы (г):</label>
              <input
                type="number"
                id="carbs"
                value={carbs || ''}
                onChange={(e) => setCarbs(e.target.value ? Number(e.target.value) : undefined)}
                min="0"
                step="0.1"
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="form-button form-button--cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="form-button form-button--submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;