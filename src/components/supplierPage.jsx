import React, { useState } from 'react';

// Supplier Card Component
const SupplierCard = ({ supplier }) => {
  // Calculate a mock compliance score based on delivery time and discount
  const complianceScore = Math.min(100, Math.round((20 / supplier.deliveryTime) * 100 + supplier.discount));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{supplier.name}</h3>
          <p className="text-gray-600">ID: SUP{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{complianceScore}%</div>
          <div className="text-sm text-gray-500">Compliance Score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Location:</p>
          <p className="font-medium">{supplier.city}, {supplier.country}</p>
        </div>
        <div>
          <p className="text-gray-600">Quality Standard:</p>
          <p className="font-medium">{supplier.qualityStandard}</p>
        </div>
        <div>
          <p className="text-gray-600">Delivery Time:</p>
          <p className="font-medium">{supplier.deliveryTime} days</p>
        </div>
        <div>
          <p className="text-gray-600">Discount:</p>
          <p className="font-medium">{supplier.discount}%</p>
        </div>
      </div>
    </div>
  );
};

// Main Suppliers Page Component
export const SupplierPage = ({setCurrentPage}) => {
  const [searchId, setSearchId] = useState('');
  
  // backend request pending
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
      country: "USA",
      city: "New York",
      deliveryTime: 5,
      discount: 10,
      qualityStandard: "ISO9001"
    },
    {
      name: "John",
      country: "India",
      city: "Mumbai",
      deliveryTime: 5,
      discount: 10,
      qualityStandard: "ISO9001"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for supplier ID:', searchId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          {/* Add New Supplier Button */}
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() =>setCurrentPage('new-supplier')}
          >
            Add New Supplier
          </button>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search by Supplier ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Suppliers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((supplier, index) => (
            <SupplierCard key={index} supplier={supplier} />
          ))}
        </div>
      </div>
    </div>
  );
};
