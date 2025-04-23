import React from 'react';
import { Product } from '../../types/Product';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <div className="product-info">
            <span className="product-name">{product.name}</span>
            <span className="product-calories">{product.calories} ккал/100г</span>
          </div>
          <div className="product-macros">
            {product.protein && <span>Б: {product.protein}g</span>}
            {product.fat && <span>Ж: {product.fat}g</span>}
            {product.carbs && <span>У: {product.carbs}g</span>}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;