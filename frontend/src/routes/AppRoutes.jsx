import React from 'react'
import { Route, Routes } from 'react-router-dom';
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home"
import CreateFood from "../pages/food-partner/CreateFood"
import Profile from '../pages/food-partner/Profile';
import Saved from '../pages/general/Saved';


const   AppRoutes = () => {
  return (
    <Routes>
        <Route path="/*" element={<UserLogin/>} />
        <Route path="/user/registration" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/partner/registration" element={<FoodPartnerRegister/>} />
        <Route path="/partner/login" element={<FoodPartnerLogin/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/create-food" element={<CreateFood/>}/>
        <Route path="/food-partner/profile/:id" element={<Profile/>}/>
        <Route path="/saved" element={<Saved/>}/>
    </Routes>
  )
}

export default AppRoutes