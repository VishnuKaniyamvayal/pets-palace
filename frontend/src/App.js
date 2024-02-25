import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from "./pages/Homepage"
import Searchpage from './pages/Searchpage'
import Cart from './pages/Cart'
import Productview from './pages/Productview'
import AdminView from "./pages/admin/AdminView"
import AddPet from './pages/admin/AddPet'
import EditAddress from "./pages/EditAddress"
import Orders from './pages/Orders'
function App() {
  return (
    <>
      <Router>
        <div className='container'>
        <Header />: 
          <Routes>
            <Route path='/' element={<Homepage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/search/:id' element={<Searchpage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/productview/:id' element={<Productview />} />
            <Route path='/admin' element={<AdminView />} />
            <Route path='/addpet' element={<AddPet />} />
            <Route path='/addaddress' element={<EditAddress />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
