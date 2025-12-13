// src/components/Cart.js
import "./Cart.css"
import React, {
  useContext,
  useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If using react-router



import { CartContext } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51P5lKgSBIUKMLzlmQkc7XcYB5IAVxKL9f2pxXnj0uZy3wGFi6le8KG4rA3jaiIma8GT1tHPOErWWATxTJ3pfilvV00KucCDp6r'); // Replace with your public key

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const navigate =useNavigate(); // Redirect to home

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (paymentMethod === "stripe") {
      try {
        const cartItems = cart.map(item => ({
          productId: item._id,
          quantity: 1,
        }));

        const response = await axios.post('http://localhost:8000/api/payment/checkout', {
          cartItems,
        });
window.location.href = response.data.url;
//         const stripe = await stripePromise;
//       await stripe.checkout.redirect({
//   sessionId: response.data.sessionId,
// });


        // Stripe handles redirection after payment (via success_url)
      } catch (err) {
        console.error("Stripe error:", err);
        alert("Stripe checkout failed.");
      }
    }

    if (paymentMethod === "cod") {
      alert("Cash on Delivery order placed!");
      clearCart();
      navigate('/'); // Go back to homepage
    }
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {cart.map((item, idx) => (
          <div key={idx} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            width: '250px',
            textAlign: 'center',
            width: '350px',
            height: '300px'
          }}>
            {item.image && (
              <img
                src={`http://localhost:8000${item.image}`}
                alt={item.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            )}
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))}
      </div>

      <h3>Total: ${totalAmount}</h3>

      <div>
        <label>
          <input
            type="radio"
            value="stripe"
            checked={paymentMethod === "stripe"}
            onChange={() => setPaymentMethod("stripe")}
          /> Pay with Stripe
        </label>

        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          /> Cash on Delivery
        </label>
      </div>

      <button onClick={handleCheckout} style={{ marginTop: '20px' }}>
        Place Order
      </button>
    </div>
  );
};

export default Cart;
