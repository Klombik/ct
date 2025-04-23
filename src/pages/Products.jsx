function Products({ products }) {
  return (
    <div>
      <h2>База продуктов</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.calories} ккал/100г</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;