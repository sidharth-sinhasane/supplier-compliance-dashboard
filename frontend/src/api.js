const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchSuppliers = async () => {
  const response = await fetch(`${API_BASE_URL}/suppliers`);
  if (!response.ok) throw new Error('Failed to fetch suppliers');
  return response.json();
};

export const createSupplier = async (supplierData) => {
  const response = await fetch(`${API_BASE_URL}/suppliers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplierData),
  });
  if (!response.ok) throw new Error('Failed to create supplier');
  return response.json();
};

export const getSupplier = async (supplierId) => {
    const response = await fetch(`${API_BASE_URL}/suppliers/${supplierId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch supplier');
    }
    return response.json();
  };
  

export const checkCompliance = async (complianceData) => {
  const response = await fetch(`${API_BASE_URL}/suppliers/check-compliance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(complianceData),
  });
  if (!response.ok) throw new Error('Failed to check compliance');
  return response.json();
};

export const getInsights = async (supplierId) => {
  const response = await fetch(`${API_BASE_URL}/suppliers/insights/${supplierId}`);
  if (!response.ok) throw new Error('Failed to get insights');
  return response.json();
};
