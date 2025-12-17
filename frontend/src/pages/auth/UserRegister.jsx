import React from "react";
import "../../styles/auth-shared.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { fullname, email, password },
        { withCredentials: true }
      );

      console.log("Registration successful:", response.data);
      navigate("/");   // redirect ONLY if registration succeeds

    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };
  const handleRegistration = () => {
    navigate("/user/login");
  }

  return (
    <div className="app-shell">
      <div className="container" role="region" aria-label="User Register">
        <div className="header">
          <div>
            <div className="title">User Registration</div>
            <div className="subtitle">Create your user account</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Full name</label>
            <input name="fullname" type="text" placeholder="John Doe" required />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Create account</button>
            <button className="btn ghost" type="button" onClick={handleRegistration}>Have an account?</button>
          </div>
        </form>
      </div>
    </div>
  );
}
