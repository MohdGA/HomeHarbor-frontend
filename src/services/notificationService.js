const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/requests`;

const index = async (requestId) => {
  try{
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${BASE_URL}/${requestId}/notification`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notification: ${res.status}`);
    }

    return await res.json();
  } catch(error){
    console.log(error)
  }
}

export {
  index
}
