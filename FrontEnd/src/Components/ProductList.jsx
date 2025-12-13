// src/components/ProductList.js
import "./ProductList.css"
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

// import axios from 'axios';
import { CartContext } from '../context/CartContext';
import axios from 'axios';



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(prod => (
          <div
            key={prod._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              width: '250px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            {prod.image && (
              <img
                src={`http://localhost:8000${prod.image}`}
                alt={prod.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <h3>{prod.name}</h3>
            <p>${prod.price}</p>
            {/* {prod.description && <p style={{ fontSize: '14px' }}>{prod.description}</p>} */}
            <button onClick={() => addToCart(prod)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
