function ProductCard({ product }) {
  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ marginTop: 0 }}>{product.name}</h3>
      <p><strong>Калории:</strong> {product.calories} ккал/100г</p>
    </div>
  );
}

export default ProductCard;