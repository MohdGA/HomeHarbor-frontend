const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/properties`
const index = async () => {
    try {
        const res = await fetch(BASE_URL)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

const show = async (propertyId) => {
  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

const create = async (formData) => {
    try {
        const token = localStorage.getItem('token')

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}


const update = async (formData, propertyId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${propertyId}`, {
            method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
        })
    const data = await res.json()
    return data
    } catch (err) {
        console.log(err)
    }
} 


const deleteProperty = async (propertyId) => {
    try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${BASE_URL}/${propertyId}`, {
            method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
        })
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

const createReviews = async (formData, propertyId) => {
  const token = localStorage.getItem('token')
  const res = await fetch(`${BASE_URL}/${propertyId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  })
  const data = await res.json()
  return data
}


const deleteReviews = async (propertyId , reviewsId) => {
  try{
      const token = localStorage.getItem('token')
    const res = await fetch(`${BASE_URL}/${propertyId}/reviews/${reviewsId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      const data = await res.json()
  return data
  }
   catch (err) {
    console.log(err)
  }
}

export {
    index,
    show,
    create,
    update,
    deleteProperty,
    createReviews,
    deleteReviews,

}