import React from "react";

const AdminCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-gray-600 font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default AdminCard;
