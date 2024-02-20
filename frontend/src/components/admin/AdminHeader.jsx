import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import Logo from "../../icons/paw-solid.svg"
import { Button, Text } from '@radix-ui/themes'
import { TextField } from '@radix-ui/themes'
 
function AdminHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
      <img src={Logo} width={50} height={50} fill="#FFBA18" alt="Logo" />
        <Link to='/'><h3>Paws Palace Admin Pannel </h3></Link>
      </div>
      <ul>
        {user ? (
          <>
          <li>
            <Text>Hi {user.name}</Text>
          </li>
          <li>
              <Button  onClick={onLogout}>Logout</Button>
          </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <Button>Login</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default AdminHeader
