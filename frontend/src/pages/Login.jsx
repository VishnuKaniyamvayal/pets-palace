import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Button, Flex, TextField } from '@radix-ui/themes'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) =>{ 
      return ({
      ...prevState,
      [e.target.name]: e.target.value,
    })})
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <section className='heading'>
        <h1>
          Login 
        </h1>
        <p> to find your best <span style={{color:"#FFBA18"}}>Partner</span></p>
      </section>

      <section className='form'>
          <Flex direction={'column'} gap="3" align="center" justify="center">
          <TextField.Input style={{width:400}} type='email' size={"3"} name="email" onChange={onChange} variant="surface" placeholder="Enter your e-mail" />            
          <TextField.Input style={{width:400}} type='password' size={"3"} name="password" onChange={onChange} variant="surface" placeholder="Enter your Password" />            
          <Button onClick={onSubmit} style={{maxWidth:100}}>Login</Button>
          </Flex>
          <div className='form-group'>
          </div>
      </section>
    </div>
  )
}

export default Login
