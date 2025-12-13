// src/pages/Success.js
import React, {
  useContext,
  useEffect,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { CartContext } from '../context/CartContext';

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000); // Go back home after 2 seconds
  }, []);

  return (
    <div>
      <h2>Payment Successful!</h2>
      <p>Redirecting to home...</p>
    </div>
  );
};

export default Success;
