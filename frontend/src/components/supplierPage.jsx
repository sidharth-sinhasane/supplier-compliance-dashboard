import React, { useState, useEffect } from 'react';
import { fetchSuppliers, getSupplier } from '../api';

const SupplierCard = ({ supplier }) => {
  const contractTerms = JSON.parse(supplier.contract_terms);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{supplier.name}</h3>
          <p className="text-gray-600">ID: SUP{supplier.id}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">{supplier.compliance_score}%</div>
          <div className="text-sm text-gray-500">Compliance Score</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Location:</p>
          <p className="font-medium">{supplier.country}</p>
        </div>
        <div>
          <p className="text-gray-600">Quality Standard:</p>
          <p className="font-medium">{contractTerms.quality_standard}</p>
        </div>
        <div>
          <p className="text-gray-600">Delivery Time:</p>
          <p className="font-medium">{contractTerms.delivery_time}</p>
        </div>
        <div>
          <p className="text-gray-600">Discount:</p>
          <p className="font-medium">{contractTerms.discount_rate}%</p>
        </div>
      </div>
    </div>
  );
};

export const SupplierPage = ({setCurrentPage}) => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const data = await fetchSuppliers();
      setSuppliers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const supplier = await getSupplier(searchId);
      setSelectedSupplier(supplier);
    } catch (err) {
      setError('Supplier not found');
      setSelectedSupplier(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => setCurrentPage('new-supplier')}
          >
            Add New Supplier
          </button>
          
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

      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Suppliers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
      </div>

      {selectedSupplier && (
        <div className="mt-6">
          <h3 className="text-xl font-bold">Selected Supplier Details</h3>
          <SupplierCard supplier={selectedSupplier} />
        </div>
      )}
    </div>
  );
};
