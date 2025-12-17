import React from "react";
import "../../styles/auth-shared.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export default function FoodPartnerRegister(){
  const navigate=useNavigate();
  const goToRegister = () => {
    navigate("/partner/login");
  };
  

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    const name=e.target.name.value;
    const bussinesName=e.target.bussinesName.value;
    const address=e.target.address.value;
    const number=e.target.number.value;
    
  
     await axios.post("http://localhost:3000/api/auth/foodpartner/register",{
        email,
        password,
        name,
        bussinesName,
        address,
        number

      },
      { withCredentials: true })
   console.log("food partner registered in succusfully");
   navigate("/create-food")
  }



  return (
    <div className="app-shell">
      <div className="container" role="region" aria-label="Partner Register">
        <div className="header">
          <div>
            <div className="title">FoodPartner Registration</div>
            <div className="subtitle">Create partner account</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          
          <div className="form-row">
            <label>Shop / Business Name</label>
            <input name="bussinesName" type="text" placeholder="Arihant Foods" />
          </div>

          <div className="form-row">
            <label>Owner Name</label>
            <input name="name" type="text" placeholder="Prathamesh" />
          </div>

          <div className="form-row">
            <label>Contact Number</label>
            <input name="number"  type="text" placeholder="9876543210" />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input name="address"  type="text" placeholder="Street, City, Area" />
          </div>

          <div className="form-row">
            <label>Contact Email</label>
            <input  name="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="form-row">
            <label>Password</label>
            <input name="password"  type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Create Partner</button>
     
            <button className="btn ghost" type="button" onClick={goToRegister}>login</button>
          </div>

        </form>
      </div>
    </div>
  );
}
