import React from "react";
import "../../styles/auth-shared.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function UserLogin() {

  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true } // allow backend to set cookies
        
      );
      navigate('/');

      console.log("User logged in:", res.data);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
    }
  };
  const handleRegistration = () => {
    navigate("/user/registration");
  } 

  return (
    <div className="app-shell">
      <div className="container" role="region" aria-label="User Login">
        <div className="header">
          <div>
            <div className="title">User Login</div>
            <div className="subtitle">Sign in to continue</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <button className="btn ghost" type="button" onClick={handleRegistration}>Create account</button>
          </div>

        </form>
      </div>
    </div>
  );
}
