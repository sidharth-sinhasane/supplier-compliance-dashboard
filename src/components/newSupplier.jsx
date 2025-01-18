import React, { useState } from 'react';
import { createSupplier } from '../api';

export const NewSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    compliance_score: 100,
    contract_terms: {
      delivery_time: '',
      quality_standard: '',
      discount_rate: ''
    },
    last_audit: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newSupplier = await createSupplier(formData);
      console.log('New supplier created:', newSupplier);
      // Handle success (e.g., show a success message, redirect)
      alert('Supplier created successfully!');
      
      // Clear the form after submission
      setFormData({
        name: '',
        country: '',
        compliance_score: 100,
        contract_terms: {
          delivery_time: '',
          quality_standard: '',
          discount_rate: ''
        },
        last_audit: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Failed to create supplier:', error);
      alert('Failed to create supplier. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Supplier</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className={labelClass}>Name</label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="country" className={labelClass}>Country</label>
            <input
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Enter country"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="contract_terms.delivery_time" className={labelClass}>Delivery Time (Days)</label>
            <input
              id="contract_terms.delivery_time"
              name="contract_terms.delivery_time"
              type="number"
              value={formData.contract_terms.delivery_time}
              onChange={handleInputChange}
              placeholder="Enter delivery time in days"
              min="0"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="contract_terms.discount_rate" className={labelClass}>Discount Rate (%)</label>
            <input
              id="contract_terms.discount_rate"
              name="contract_terms.discount_rate"
              type="number"
              value={formData.contract_terms.discount_rate}
              onChange={handleInputChange}
              placeholder="Enter discount rate"
              min="0"
              max="100"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="contract_terms.quality_standard" className={labelClass}>Quality Standard</label>
            <input
              id="contract_terms.quality_standard"
              name="contract_terms.quality_standard"
              value={formData.contract_terms.quality_standard}
              onChange={handleInputChange}
              placeholder="e.g., ISO9001"
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
};
