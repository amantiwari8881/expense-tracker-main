import React, { useState } from "react";
import { createUser } from "../services/Userservice";
import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    age: "",
  });
  const [errors, setErrors] = useState([]);
  const [creating, setCreating] = useState(false);

  const handelChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    // User jab SignUp button dabata hai to browser by default form submit karke page reload karta hai.
    e.preventDefault();

    // Submit karte hi hum chahte hain ki user dubara-dubara button na dabaye.
    setCreating(true);
    setErrors([]);
    console.log("Form Submitted", formData);
    // api call
    try {
      // Hum createUser(formData) call karte hain jo axios se backend ko POST request bhejta hai.
      const response = await createUser(formData);
      console.log(response);
      console.log("user created");
      // Agar backend successfully user save kar de to success message show hota hai aur form reset ho jata hai.
      toast.success("User created successfully");
      setFormData({
        username: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      });
      setCreating(false);
    } catch (error) {
      if (error.status == 400) {
        console.log(error.response.data);
        setErrors(error.response.data);
        toast.error("validation error");
      } else if (error.status == 403) {
        toast.error("You are not authorized to create user");
        console.log(error);
      } else {
        toast.error("Server error");
        console.log(error);
      }
      setCreating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md shadow-indigo-800">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create your Account
      </h2>
      {/* .Errors Display*/}
      <div className="py-3">
        {errors.length > 0 &&
          errors.map((error) => (
            <div className="p-2 border-red-300 mb-2 border rounded">
              <p className="text-red-400">
                {error.property.toUpperCase()}:{error.errorValue}
              </p>
            </div>
          ))}
      </div>
      <form onSubmit={handelSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={handelChange}
            id="username"
            name="username"
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-md focus:outline-nane focus:ring-2 focus:ring-indigo-400 "
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={handelChange}
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 "
          />
        </div>
        {/* Password  */}
        <div>
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 "
            type="password"
            value={formData.password}
            onChange={handelChange}
            id="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* gender */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            {" "}
            Gender
          </label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handelChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Male</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handelChange}
                className="form-radio text-indigo-600"
              />
              <span className="ml-2 text-gray-700">Female</span>
            </label>
          </div>
        </div>

        {/* age */}
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handelChange}
            required
            placeholder="Enter your age"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 "
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={creating}
            type="submit"
            className="w-50 mx-20 bg-indigo-600 text-white px-4 py-2 my-3  rounded-md hover:bg-indigo-700 transition duration-300"
          >
            <span> {creating ? "Creating user..." : "SignUp"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
