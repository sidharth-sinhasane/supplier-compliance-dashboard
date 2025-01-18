import React, { useState } from 'react';
import { checkCompliance } from '../api';

export const UploadPage = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    metric: 'delivery',
    orderDate: '',
    deliveryDate: '',
    deliveryCity: '',
    qualityResult: 'pass',
  });

  const calculateDeliveryTime = (orderDate, deliveryDate) => {
    const start = new Date(orderDate);
    const end = new Date(deliveryDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const determineDeliveryStatus = (deliveryTime) => {
    return deliveryTime <= 7 ? 'compliant' : 'non-compliant';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];
    let result, status;

    if (formData.metric === 'delivery') {
      result = calculateDeliveryTime(formData.orderDate, formData.deliveryDate);
      status = determineDeliveryStatus(result);
    } else {
      result = formData.qualityResult === 'pass' ? 1 : 0;
      status = formData.qualityResult;
    }

    const complianceData = {
      supplier_id: parseInt(formData.supplierId),
      metric: formData.metric,
      date_recorded: currentDate,
      result: result,
      status: status
    };

    try {
      const response = await checkCompliance(complianceData);
      console.log('Compliance check result:', response);
      // Handle success (e.g., show a success message)
      alert('Compliance data submitted successfully!');
    } catch (error) {
      console.error('Failed to submit compliance data:', error);
      alert('Failed to submit compliance data. Please try again.');
    }
    
    // Reset form
    setFormData({
      supplierId: '',
      metric: 'delivery',
      orderDate: '',
      deliveryDate: '',
      deliveryCity: '',
      qualityResult: 'pass'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Compliance Data Entry</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          {/* ... */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
