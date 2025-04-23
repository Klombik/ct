import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import './ProductItem.css';

interface ProductItemProps {
  product: {
    id: string;
    name: string;
    calories: number;
    protein?: number;
    selected?: boolean;
  };
  onToggle: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onToggle }) => {
  return (
    <div 
      className={`product-item ${product.selected ? 'selected' : ''}`}
      onClick={() => onToggle(product.id)}
    >
      <div className="product-checkbox">
        {product.selected ? (
          <FiCheck className="check-icon" />
        ) : (
          <div className="empty-checkbox" />
        )}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-meta">
          <span>{product.calories} ккал</span>
          {product.protein && <span>{product.protein}g белка</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;