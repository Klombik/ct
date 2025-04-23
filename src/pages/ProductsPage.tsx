import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { getProducts, addProduct } from '../services/productService';
import ProductList from '../components/ProductList/ProductList';
import AddProductModal from '../components/AddProductModal/AddProductModal';
import { useAppContext } from '../context/AppContext';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { products: contextProducts, addProduct } = useAppContext();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await addProduct(product);
      setProducts(products);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <h2 className="products-page__title">База продуктов</h2>
      
      <div className="products-page__controls">
        <input
          type="text"
          placeholder="Поиск продуктов..."
          className="products-page__search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="products-page__add-btn"
          onClick={() => setIsModalOpen(true)}
        >
          + Добавить продукт
        </button>
      </div>
      
      <ProductList products={filteredProducts} />
      
      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default ProductsPage;