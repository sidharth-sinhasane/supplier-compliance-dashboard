import React from 'react';

export const HomePage = () => {
  
  // backend request pe
  // useEffect(() => {
  //   async function getAllSuppliers() {
  //     const response = await fetch('string');
  //     const data = await response.json();
  //     // set suppliers array to this data
  // }
  // }, []);
  const suppliers = [
    {
      name: "John Doe",
      complianceScore: 85
    },
    {
      name: "Jane Smith",
      complianceScore: 92
    },
    {
      name: "Bob Johnson",
      complianceScore: 78
    }
  ];

  // Calculate metrics
  const totalSuppliers = suppliers.length;
  const averageCompliance = Math.round(
    suppliers.reduce((acc, curr) => acc + curr.complianceScore, 0) / totalSuppliers
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Supplier Management System
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your suppliers' performance and compliance all in one place.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Suppliers Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <svg 
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
              </div>
            </div>
          </div>

          {/* Average Compliance Score Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <svg 
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Compliance Score</p>
                <p className="text-2xl font-bold text-gray-900">{averageCompliance}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
