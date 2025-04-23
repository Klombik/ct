import { useState } from 'react';
import './ProductSelector.css';

function ProductSelector({ products, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-selector">
      <input
        type="text"
        placeholder="Поиск продуктов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="product-item"
              onClick={() => onAdd(product)}
            >
              <span className="product-name">{product.name}</span>
              <span className="product-info">{product.calories} ккал/100г</span>
            </div>
          ))
        ) : (
          <div className="no-products">Продукты не найдены</div>
        )}
      </div>
    </div>
  );
}

export default ProductSelector;