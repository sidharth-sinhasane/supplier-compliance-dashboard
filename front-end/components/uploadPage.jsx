import React, { useState } from 'react';

export const UploadPage = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    qualityRating: 0,
    orderDate: '',
    deliveryDate: '',
    deliveryCity: ''
  });

  // Star Rating Component
  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  const calculateDeliveryTime = (orderDate, deliveryDate) => {
    const start = new Date(orderDate);
    const end = new Date(deliveryDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const deliveryTime = calculateDeliveryTime(formData.orderDate, formData.deliveryDate);
    
    const complianceData = {
      supplierId: formData.supplierId,
      qualityStandard: formData.qualityRating,
      deliveryTime: deliveryTime,
      deliveryCity: formData.deliveryCity
    };

    console.log('Compliance Data:', complianceData);
    
    // Clear form after submission
    setFormData({
      supplierId: '',
      qualityRating: 0,
      orderDate: '',
      deliveryDate: '',
      deliveryCity: ''
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
          {/* Supplier ID Field */}
          <div>
            <label htmlFor="supplierId" className={labelClass}>
              Supplier ID
            </label>
            <input
              id="supplierId"
              name="supplierId"
              value={formData.supplierId}
              onChange={handleInputChange}
              placeholder="Enter supplier ID"
              className={inputClass}
              required
            />
          </div>

          {/* Quality Rating Field */}
          <div>
            <label className={labelClass}>
              Quality Standard Rating
            </label>
            <StarRating 
              rating={formData.qualityRating}
              onRatingChange={(rating) => 
                setFormData(prev => ({ ...prev, qualityRating: rating }))
              }
            />
          </div>

          {/* Order Date Field */}
          <div>
            <label htmlFor="orderDate" className={labelClass}>
              Order Date
            </label>
            <input
              id="orderDate"
              name="orderDate"
              type="date"
              value={formData.orderDate}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Delivery Date Field */}
          <div>
            <label htmlFor="deliveryDate" className={labelClass}>
              Delivery Date
            </label>
            <input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
              value={formData.deliveryDate}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>

          {/* Delivery City Field */}
          <div>
            <label htmlFor="deliveryCity" className={labelClass}>
              Delivery City
            </label>
            <input
              id="deliveryCity"
              name="deliveryCity"
              value={formData.deliveryCity}
              onChange={handleInputChange}
              placeholder="Enter delivery city"
              className={inputClass}
              required
            />
          </div>

          {/* Submit Button */}
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