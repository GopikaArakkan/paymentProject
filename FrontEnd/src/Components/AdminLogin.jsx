//src//components/AdminLogin.js
import "./AdminLogin.css"
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const { useState } = require("react")


const AdminLogin = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    const navigate = useNavigate()

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

        //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
    

    try{
        //send login data to backend
        const res = await axios.post('http://localhost:8000/api/admin/login', form);
    

    //if login successful(backend sends token)
    if(res.data.token) {
        //store token for later use
        localStorage.setItem('adminToken', res.data.token);

        alert(res.data.message);  //"login successful"
        navigate('/admin/addProduct'); //go to admin page
    }
} catch (err) {
    //handle invalid credentials or other errors
    const msg = err.response?.data?.message || 'login failed';
    alert(msg);
    console.error(err);
}
};

return (
    <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <p></p>
        <input 
        type="email"
        name="email"
        placeholder="Admin Email"
        value={form.email}
        onChange={handleChange}
        required
        />
<br/><br/>

         <input 
        type="password"
        name="password"
        placeholder="password"
        value={form.password}
        onChange={handleChange}
        required
        />
        <br/><br/>

        <button type="submit">Login</button>
    </form>
);
};


export default AdminLogin;