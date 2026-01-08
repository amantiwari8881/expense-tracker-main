import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import "./App.css";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Signup from "./pages/Signup";
import DashboardLayout from "./pages/user/DashboardLayout";
import AddExpense from "./pages/user/AddExpense";
import ViewExpenses from "./pages/user/ViewExpenses";
import { AuthProvider } from "./context/AuthContext";
import UserHome from "./pages/user/UserHome"; 
import RecycleBin from "./pages/user/RecycleBin";
import { Navigate } from "react-router-dom";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Userdetail from "./pages/admin/Userdetail";









function App() {
  
const [count, setCount] = useState(0);
  return (
   <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="" element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          <Route path="login" element={<Login />} /> 
           
          <Route path="sign-up" element={<Signup />} />
          <Route path="category" element={<h1>category</h1>} />
          <Route path="setting" element={<h1>setting</h1>} />
           <Route path="/admin" element={<AdminDashboard />} > 
            <Route index element={<Navigate to="user" replace />} />
            <Route path="user" element={<Userdetail/>} />
            

          </Route>


          <Route path="dashboard" element={<DashboardLayout />} >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<UserHome />} />
             
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="expenses" element={<ViewExpenses />} />
            <Route path="assistant" element={<h1>Chat Assistant</h1>} />
             <Route path="recycle-bin" element={<RecycleBin />} />
          </Route>
             
          
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;



