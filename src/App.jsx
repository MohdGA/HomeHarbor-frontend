import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import { Route, Routes } from 'react-router-dom'
import * as authService from './services/authService.js'
import { useState } from 'react'

const App = () => {

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)

  const handleSignUp = async (formData) => {
   const res = await authService.signUp(formData)
   setUser(res)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
    </>
  )
}

export default App