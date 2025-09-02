import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./SignIn.css"

const SignIn = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  useEffect(() => {
    if (props.user) {
      navigate('/')
    }
  }, [props.user])

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleSignIn(formData)
    navigate('/')
  }

  return (
<main>
  <form onSubmit={handleSubmit}>
    <div className="form-header">
      <h1>Sign In Form</h1>
    </div>

    <div className="input-group">
      <label>Username:</label>
      <input type="text" name='username' onChange={handleChange} />
    </div>

    <div className="input-group">
      <label>Password:</label>
      <input type="password" name='password' onChange={handleChange} />
    </div>

    <button type="submit">Sign In</button>
  </form>
</main>

  )
}

export default SignIn