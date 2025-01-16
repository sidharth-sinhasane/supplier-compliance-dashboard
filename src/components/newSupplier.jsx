import React, { useState } from 'react';

export const NewSupplier = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    deliveryTime: '',
    discount: '',
    qualityStandard: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a JSON object with the form data
    const formDataJSON = {
      name: formData.name,
      country: formData.country,
      city: formData.city,
      deliveryTime: parseInt(formData.deliveryTime),
      discount: parseFloat(formData.discount),
      qualityStandard: formData.qualityStandard
    };

    // backend put request pending
    // Log the JSON to console
    console.log('Form Data JSON:', formDataJSON);
    
    // Optional: Clear the form after submission
    setFormData({
      name: '',
      country: '',
      city: '',
      deliveryTime: '',
      discount: '',
      qualityStandard: ''
    });

    // Show an alert to confirm submission (optional)
    // alert('Form submitted! Check the console for the JSON data.');
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Validation for discount (0-100)
    if (name === 'discount') {
      value = Math.min(Math.max(0, value), 100);
    }
    
    // Validation for delivery time (positive numbers only)
    if (name === 'deliveryTime') {
      value = Math.max(0, value);
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Upload Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
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

          {/* Country Field */}
          <div>
            <label htmlFor="country" className={labelClass}>
              Country
            </label>
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

          {/* City Field */}
          <div>
            <label htmlFor="city" className={labelClass}>
              Delivery Location (City)
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className={inputClass}
              required
            />
          </div>

          {/* Delivery Time Field */}
          <div>
            <label htmlFor="deliveryTime" className={labelClass}>
              Estimated Delivery Time (Days)
            </label>
            <input
              id="deliveryTime"
              name="deliveryTime"
              type="number"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              placeholder="Enter number of days"
              min="0"
              className={inputClass}
              required
            />
          </div>

          {/* Discount Field */}
          <div>
            <label htmlFor="discount" className={labelClass}>
              Discount Offered (%)
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleInputChange}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
              className={inputClass}
              required
            />
          </div>

          {/* Quality Standard Field */}
          <div>
            <label htmlFor="qualityStandard" className={labelClass}>
              Quality Standard
            </label>
            <input
              id="qualityStandard"
              name="qualityStandard"
              value={formData.qualityStandard}
              onChange={handleInputChange}
              placeholder="e.g., ISO9001"
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
