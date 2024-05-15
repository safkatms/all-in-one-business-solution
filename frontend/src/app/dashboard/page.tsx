import React from "react";
import InsideHeader from "@/components/insideheader";
import Sidebar from "@/components/sidebar";
import ProtectedRoute from "@/utils/protectedRoute";

const Dashboard = () => {
  // Mock data for features
  const features = [
    {
      title: "HR Management",
      description: "Manage employee data, payroll, and leave requests.",
    },
    {
      title: "Inventory Management",
      description: "Track and manage your inventory, stock levels, and suppliers.",
    },
    {
      title: "Account Management",
      description: "Manage financial records, invoices, and payments.",
    },
    {
      title: "Sales Management",
      description: "Track sales, manage customers, and analyze performance.",
    },
  ];

  return (
    <ProtectedRoute
      requiredRole={[
        "admin",
        "owner",
        "hr",
        "accountant",
        "inventory_manager",
        "salesman",
      ]}
    >
      <InsideHeader />
      <div className="flex">
        <Sidebar />
        <div className="ml-8">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to All in One Business Solution
          </h1>
          <p className="text-gray-600 mb-8">
            Your one-stop solution for all business needs!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
