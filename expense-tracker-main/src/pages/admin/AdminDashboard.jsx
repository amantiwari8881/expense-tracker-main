// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminCard from "../../components/AdminCard";

// const AdminDashboard = () => {
//   const [totalViews, setTotalViews] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       // Mock API (replace with your backend later)
//       const { data } = await axios.get("/mock/adminData.json");
//       setTotalViews(data.totalViews);
//       setTotalUsers(data.totalUsers);
//       setUsers(data.users);
//     } catch (error) {
//       console.error("Error fetching admin dashboard data:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
//         Admin Dashboard
//       </h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <AdminCard title="Total Views" value={totalViews} />
//         <AdminCard title="Total Logged-in Users" value={totalUsers} />
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">User Details & Expenses</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200 text-sm text-left">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-2 px-4 border">#</th>
//                 <th className="py-2 px-4 border">Name</th>
//                 <th className="py-2 px-4 border">Email</th>
//                 <th className="py-2 px-4 border">Expenses Count</th>
//                 <th className="py-2 px-4 border">Total Expense</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(users && Array.isArray(users) ? users : []).map((user, index) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border">{index + 1}</td>
//                   <td className="py-2 px-4 border">{user.name}</td>
//                   <td className="py-2 px-4 border">{user.email}</td>
//                   <td className="py-2 px-4 border text-center">
//                     {user.expenses?.length || 0}
//                   </td>
//                   <td className="py-2 px-4 border text-center">
//                     ₹{user.expenses?.reduce((a, b) => a + (b.amount || 0), 0)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React from 'react';
import AdminSidemenu from "../../components/AdminSidemenu.jsx";
import { Navigate, Outlet } from "react-router";

function AdminDashboard() {

  
  return (
     <div className="flex">
      {/* left */}
      <div className="">
        <AdminSidemenu />
      </div>

      {/* right */}
      <div className=" pl-64 pt-16 min-h-screen  flex-1  bg-gray-200">
        <div className="p-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
  
}

export default AdminDashboard
