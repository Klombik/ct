import React from 'react';
import { FiCheck } from 'react-icons/fi';
import './ProductSelector.css';

interface ProductSelectorProps {
  product: {
    id: string;
    name: string;
    selected: boolean;
  };
  onToggle: (id: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ product, onToggle }) => {
  return (
    <div 
      className={`product-selector ${product.selected ? 'selected' : ''}`}
      onClick={() => onToggle(product.id)}
    >
      <div className="selector-checkbox">
        <input
          type="checkbox"
          checked={product.selected}
          readOnly
          className="hidden-checkbox"
        />
        <div className={`custom-checkbox ${product.selected ? 'checked' : ''}`}>
          {product.selected && <FiCheck className="check-icon" />}
        </div>
      </div>
      <span className="product-name">{product.name}</span>
    </div>
  );
};

export default ProductSelector;