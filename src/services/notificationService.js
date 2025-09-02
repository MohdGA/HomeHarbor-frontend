const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`;

const index = async (requestId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${BASE_URL}/requests/${requestId}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notification: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const markSeen = async (notificationId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No authentication token found");

    const res = await fetch(`${BASE_URL}/notifications/${notificationId}/seen`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to update notification: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  index,
  markSeen
};
