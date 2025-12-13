import {
  createContext,
  useState,
} from 'react';

// Step 1: Create a new context called "CartContext"
// A context lets us share values between components
// without having to pass them manually through props.
export const CartContext = createContext();

// Step 2: Create a provider component called "CartProvider"
// This component will wrap around the main part of our app.
// It will provide (or give) the cart data to all components inside it.
export const CartProvider = ({ children }) => {

  // Step 3: Create a state variable to store the cart items.
  // - "cart" will hold the list of products added by the user.
  // - "setCart" is a function that can change or update the cart.
  // We start with an empty array because the cart is empty at the beginning.
  const [cart, setCart] = useState([]);

  // Step 4: Create a function to add a new product to the cart.
  // This takes the current cart items (prev) and adds the new product to it.
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // Step 5: Create a function to clear the cart.
  // This will make the cart empty again.
  const clearCart = () => {
    setCart([]);
  };

  // Step 6: Share the cart data and the functions with other components.
  // <CartContext.Provider> makes the cart, addToCart, and clearCart
  // available to any component that is inside this provider.
  // The "value" property is what gets shared.
  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {/* "children" means any other components that are inside CartProvider.
          They will be able to use the cart data and functions. */}
      {children}
    </CartContext.Provider>
  );
};
