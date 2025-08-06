import './App.css'
import NavBar from './components/NavBar/NavBar'
import SignUp from './components/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
          <Route path='/' element={<h1>Hello world!</h1>} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </>
  )
}

export default App