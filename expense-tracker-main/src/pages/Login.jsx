import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { loginUser } from "../services/AuthService";
import { saveLoginData } from "../services/LocalStorageService";
import GradientBackground from "../components/GradientBackground.jsx"



function Login() {

    const [loginData, setLoginData] =useState({
        email:"",
        password:""

    });

    const { setUser, setAccessToken}=useAuthContext();

    const navigate =useNavigate();


    // submit
    const submitData= async(event)=> {
        event.preventDefault();

        if (loginData.email.trim() ==""){
            toast.error("Email required !!");
            return;
        }
        if (loginData.password.trim()==""){
            toast.error("Password required !!");
            return;
        }
        console.log(loginData);
        /// Sent this email and password to server:

          try {
      const responseData = await loginUser(loginData);
      console.log(responseData);
      //saves to localstorage
      saveLoginData(responseData);
      setUser(responseData.user);
      setAccessToken(responseData.accessToken);
      navigate("/dashboard/home");
    } catch (error) {
      console.log(error);
      if (error.status == 403) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error in login!!");
      }
    }
  };
    













  return (
    <GradientBackground>
    <div className="max-w-md shadow-blue-700 shadow-lg rounded-3xl p-10 bg-neutral-100 mx-auto  md:mt-10">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-600">
            Login Here 
        </h1>
        <form noValidate action=""onSubmit={submitData}>
            {/* email */}
            <div>
                <label className="block text-gray-700 mb-1 ">Email</label>
                <input 
                value={loginData.email}
                onChange={(e)=> {
                    setLoginData({
                        ...loginData,
                        email:e.target.value
                    });
                }}
                 type="email"
                 name="email"
                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                 placeholder="Enter your email"
                 required
                
                />

            </div>
            {/* password */}
            <div>
               <label className="block text-gray-700 mb-1 ">Password</label>
                <input 
                value={loginData.password}
                onChange={(e)=>{
                    setLoginData({
                        ...loginData,
                        password:e.target.value,
                    });
                }}
                 type="password"
                 name="password"
                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                 placeholder="Enter your password"
                 required
                
                /> 
            </div>

            {/* buttonb login */}
             
          <div className="flex justify-center gap-2 mt-3">
            <button
            className="bg-blue-700 text-white px-3 rounded py-2"
            type="submit"
            >
                Login

            </button>
            <button   className="bg-orange-700 text-white px-3 rounded py-2">
                Reset
            </button>
          </div>
        </form>
      
    </div>
    </GradientBackground>
  );
}

export default Login;
