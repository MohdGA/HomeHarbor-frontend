const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/properties/`

const index = async (propertyId) => {
  try{
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${propertyId}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()
    return data
  } catch(error){
    console.log(error)
  }
}

const create = async (formData, propertyId) => {
  try{
    const token = localStorage.getItem('token')

    const res = await fetch(`${BASE_URL}/${propertyId}/requests`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    return data;
  } catch(error){
    console.log(error)
  }
};

// const show = async (requestId) => {
//   try{
//     const token = localStorage.getItem('token');
    
//     const res = await fetch(`${BASE_URL}/requests/${requestId}` , {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     const data = await res.json();
//     return data;

//   } catch(error){
//     console.log(error)
//   }
// }

export {
  index,
  create,
}