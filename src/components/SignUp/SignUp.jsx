import { useState } from 'react'

const SignUp = () => {

  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('form was submitted')
  }

  return (
    <main>
      <h1>Sign up Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} />
        <br />
        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} />
        <br />
        <button type="submit">Sign up</button>
      </form>
    </main>
  )
}

export default SignUp