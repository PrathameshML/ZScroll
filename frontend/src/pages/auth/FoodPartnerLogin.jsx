import React from "react";
import "../../styles/auth-shared.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function FoodPartnerLogin() {
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/login",
        { email, password },
        { withCredentials: true }
      );

      console.log("Food partner logged in:", res.data);
      navigate("/create-food")
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  const handleRegister = () => {
    navigate("/partner/registration");
  }

  return (
    <div className="app-shell">
      <div className="container" role="region" aria-label="Partner Login">
        <div className="header">
          <div>
            <div className="title">FoodPartner Login</div>
            <div className="subtitle">Sign in to manage orders</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn ghost" type="button" onClick={handleRegister}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
