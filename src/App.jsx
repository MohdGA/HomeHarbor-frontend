import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Footer from './components/Footer/Footer.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import * as authService from './services/authService.js'
import * as propertyService from './services/propertyService.js'
import { useState, useEffect } from 'react'
import PropertyForm from './components/PropertyForm/PropertyForm.jsx'
import PropertyList from './components/PropertyList/PropertyList.jsx'
import PropertyDetails from './components/PropertyDetails/PropertyDetails.jsx'
import Profile from './components/profile/profile.jsx'

const App = () => {
    const navigate = useNavigate()

  const initialState = authService.getUser()

  const [user, setUser] = useState(initialState)

   const [properties, setProperties] = useState([])

   const [selctedProperty, setSelctedProperty] = useState(null)

     useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await propertyService.index()
        setProperties(res)
      } catch (err) {
        console.error(err)
      }
    }
    loadProperties()
  }, [])

  const handleSignUp = async (formData) => {
    try {
      const res = await authService.signUp(formData)
      // setUser(res)
      // return success
      return { success: true }
    } catch(err){
      // return failure flag (then signup form can display message)
      // add message?
      return { success: false, message: err.message }
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleSignIn = async (formData) => {
    const res = await authService.signIn(formData)
    setUser(res)
  }

  const handleAddProperty = async (formData) => {
  const newProperty = await propertyService.create(formData)
       setProperties([...properties, newProperty])
  }

  const handleDeleteProperty = async (propertyId) => {
  try {
    await propertyService.deleteProperty(propertyId);
    setProperties(properties.filter(properties => properties.id !== propertyId))
    navigate('/properties')
  } catch (error) {
    console.error("Failed to delete property", error);
  }
};


  const handleUpdateProperty = async (formData, propertyId) => {
    console.log('in update')
    const updatedProperty = await propertyService.update(formData, propertyId)
    
    const updatedPropertyList = properties.map((property) => 
      property.id !== updatedProperty.id ? property : updatedProperty
    )
    setProperties(updatedPropertyList)
    navigate('/properties')
    return updatedProperty
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
          <Route path='/properties/new' element={<PropertyForm handleAddProperty={handleAddProperty} />}/>
          <Route path='/properties' element={<PropertyList properties={properties} handleDeleteProperty={handleDeleteProperty}/>} />
          <Route path="/properties/:propertyId" element={<PropertyDetails  properties={properties} handleDeleteProperty={handleDeleteProperty} handleUpdateProperty={handleUpdateProperty}/>} />
          <Route path='/property/:propertyId/edit' element={<PropertyForm selctedProperty ={selctedProperty} handleUpdateProperty={handleUpdateProperty} handleAddProperty={handleAddProperty}/>}/>

          <Route path="/profile" element={<Profile user={user}/>}/>
          <Route path='/' element={<h1>Hello!</h1>} />
          <Route path='/sign-up' element={<SignUp handleSignUp={handleSignUp} user={user} />} />
          <Route path='/sign-in' element={<SignIn handleSignIn={handleSignIn} user={user} />} />
          <Route path='*' element={<h1>404</h1>} />
    </Routes>
            <Footer /> 
    </>

    // <>
    //   <NavBar user={user} handleSignOut={handleSignOut} />
    //   <Routes>
    //     <Route path="/" element={<h1>Hello World!</h1>} />
    //     {!user && (
    //       <>
    //         <Route
    //           path="/sign-up"
    //           element={<SignUp handleSignUp={handleSignUp} />}
    //         />
    //         <Route
    //           path="/sign-in"
    //           element={<SignIn handleSignIn={handleSignIn} />}
    //         />
    //       </>
    //     )}
    //     <Route path="*" element={<h1>404</h1>} />
    //   </Routes>
    // </>
  )
}

export default App