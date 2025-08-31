const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

const signUp = async (formData) => {

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) throw new Error(data.detail || 'Something went wrong')

    return data
  } catch (err) {
    throw err
  }
}

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await res.json()
    console.log(data)

    if (!res.ok) throw new Error(data.detail || 'Something went wrong')

    if (data.token) {
      localStorage.setItem('token', data.token)
      const decodedToken = JSON.parse(atob(data.token.split('.')[1]))
      return decodedToken
    }

  } catch (err) {
    throw err
  }
}


const getUser = () => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]))
    console.log(decodedToken)
    return decodedToken
  } 
  return null
}

export {
  signUp,
  signIn,
  getUser,
}
