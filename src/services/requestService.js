const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/properties`;

const index = async (propertyId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${BASE_URL}/${propertyId}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch requests: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Request service error:", error);
    throw error;
  }
};

const create = async (formData, propertyId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${BASE_URL}/${propertyId}/requests`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Authentication failed");
      }
      if (res.status === 404) {
        throw new Error("Property not found");
      }
      throw new Error(`Failed to create request: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Request creation error:", error);
    throw error;
  }
};

export {
  index,
  create,
};