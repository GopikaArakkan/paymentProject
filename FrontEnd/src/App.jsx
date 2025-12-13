import { useEffect, useState } from "react";


import AdminLogin from "./Components/AdminLogin";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductList from "./Components/ProductList";
import { CartProvider } from "./context/CartContext";
import Success from "./Components/Success";
import AdminAddProduct from "./Components/AdminAddProduct";
import Cart from "./Components/Cart";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

//check if the admin token exists in localstorage on initial load
useEffect(() => {
if (localStorage.getItem('adminToken')) {
    setIsAdmin(true);
}
}, []);




    return (
        <CartProvider>
           
                <div>
                    <Routes>

                        {/*user side*/}

                        <Route
                        path="/"
                        element={
                            <>
                            <ProductList />
                            <Cart />
                            </>
                        }
                      />

                      <Route path="/success" element={<Success />} />

                      {/* Admin side*/}
                      <Route
                      path="/admin"
                      element={<AdminLogin/>}
                      />

                    <Route
                    path="/admin/addProduct"
                    element={
                        isAdmin ? (
                            <AdminAddProduct />
                        ) : (
                            <Navigate to="/admin" replace />
                        )   
                    }
                    />
                    </Routes>
                </div>
            
        </CartProvider>
    );
}

export default App