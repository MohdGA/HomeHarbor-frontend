import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./SignUp.css"

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: "",
    password: '',
    passwordConf: ''
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)

  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const result = await props.handleSignUp(formData)
    if (result.success) {
      navigate('/sign-in')  
    } else {
      setError(result.message)
    }
  }

  const formIsInvalid = !(formData.username && formData.password && formData.password === formData.passwordConf)

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign Up Form</h1>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Username:</label>
          <input type="text" name='username' onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input type="email" name='email' onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input type="password" name='password' onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Confirm Password:</label>
          <input type="password" name="passwordConf" onChange={handleChange} />
        </div>

        <button type="submit" disabled={formIsInvalid}>Sign Up</button>
      </form>
    </main>
  )
}

export default SignUp
