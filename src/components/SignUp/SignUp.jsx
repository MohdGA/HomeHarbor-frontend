import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: "",
    password: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [error, setError] = useState(null)


// useEffect(() => {
//   if (props.user && !props.justSignedUp) {
//     navigate('/')
//   }
// }, [props.user, props.justSignedUp])


  const handleChange = (evt) => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

const handleSubmit = async (evt) => {
  evt.preventDefault()
  const result = await props.handleSignUp(formData)
  if (result.success) {
    navigate('/sign-in')   // ✅ this will now run
  } else {
    setError(result.message)
  }
}


  let formIsInvalid = true

  if (formData.username && formData.password && formData.password === formData.passwordConf) {
    formIsInvalid = false
  }

  return (
    <main>
      <h1>Sign up Form</h1>
      {/* add error message display to form */}
      {error}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name='username' onChange={handleChange} />
        <br />
 
        <label>Email:</label>
        <input type="email" name='email' onChange={handleChange} />
        <br />

        <label>Password:</label>
        <input type="password" name='password' onChange={handleChange} />
        <br />
        <label>Confirm Password:</label>
        <input type="password" name="passwordConf" onChange={handleChange} />
        <br />
        <button type="submit" disabled={formIsInvalid}>Sign up</button>
      </form>
    </main>
  )
}

export default SignUp