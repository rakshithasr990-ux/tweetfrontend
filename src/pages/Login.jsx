import React, { useState } from "react";
import axios from "axios";
import "./Login.css";  
import { useNavigate } from "react-router-dom"; // using same CSS

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:7000/api/login",form);
  
    if (res.data.success) {
      alert(res.data.message);
      localStorage.setItem("myToken", res.data.token);
      navigate("/profile");
       // Save token to localStorage
    }
    else {
      alert(res.data.message);  // Invalid Credentials
    }

  } catch (error) {
    console.error(error);
    alert("Login Failed ");
  }
};


  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p className="login-text">
          Don't have an account? <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;