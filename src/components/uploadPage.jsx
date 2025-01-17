import React, { useState } from 'react';

export const UploadPage = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    metric: 'delivery', // default to delivery
    orderDate: '',
    deliveryDate: '',
    deliveryCity: '',
    qualityResult: 'pass', // for quality metric
  });

  const calculateDeliveryTime = (orderDate, deliveryDate) => {
    const start = new Date(orderDate);
    const end = new Date(deliveryDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const determineDeliveryStatus = (deliveryTime) => {
    // Example threshold of 7 days for compliance
    return deliveryTime <= 7 ? 'compliant' : 'non-compliant';
  };

  const handleSubmit = (e) => {
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

    const submissionData = {
      metric: formData.metric,
      date_recorded: currentDate,
      result: result,
      status: status,
      supplierId: parseInt(formData.supplierId),
      // Additional data for reference
      additionalInfo: formData.metric === 'delivery' ? {
        orderDate: formData.orderDate,
        deliveryDate: formData.deliveryDate,
        deliveryCity: formData.deliveryCity
      } : {}
    };

    console.log('Submission Data:', JSON.stringify(submissionData, null, 2));
    
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
          {/* Supplier ID Field */}
          <div>
            <label htmlFor="supplierId" className={labelClass}>
              Supplier ID
            </label>
            <input
              id="supplierId"
              name="supplierId"
              type="number"
              value={formData.supplierId}
              onChange={handleInputChange}
              placeholder="Enter supplier ID"
              className={inputClass}
              required
            />
          </div>

          {/* Metric Selection */}
          <div>
            <label htmlFor="metric" className={labelClass}>
              Metric Type
            </label>
            <select
              id="metric"
              name="metric"
              value={formData.metric}
              onChange={handleInputChange}
              className={inputClass}
              required
            >
              <option value="delivery">Delivery Time</option>
              <option value="quality">Quality</option>
            </select>
          </div>

          {formData.metric === 'delivery' ? (
            <>
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
            </>
          ) : (
            /* Quality Result Field */
            <div>
              <label htmlFor="qualityResult" className={labelClass}>
                Quality Result
              </label>
              <select
                id="qualityResult"
                name="qualityResult"
                value={formData.qualityResult}
                onChange={handleInputChange}
                className={inputClass}
                required
              >
                <option value="pass">Pass</option>
                <option value="fail">Fail</option>
              </select>
            </div>
          )}

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

