import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Login from './LogIn/Login'
import Register from './Register/Register'
import Home from './Home/Home'
import Contacts from "./contacts/Contacts";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contacts" element={<Contacts/>} />
      </Routes>
    </div>
  );
};
