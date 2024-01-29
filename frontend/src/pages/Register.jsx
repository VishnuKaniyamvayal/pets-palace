import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { Button, Flex, TextField } from '@radix-ui/themes'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  // validate email using regex
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if(formData.email == "" || formData.name == "" || formData.password == "")
    {
      toast.error("Please enter a name");
      return
    }
    if(!validateEmail(formData.email))
    {
      toast.error("Enter valid email")
      return
    }
    if (password !== password2) {
      toast.error('Passwords do not match')
      return
    } 
    else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
           Register
        </h1>
        <p>create an account </p>
      </section>
      <section className='form'>
      <Flex direction={'column'} gap="3" align="center" justify="center">
          <TextField.Input value={name} style={{width:400}} type='text' size={"3"} name="name" onChange={onChange} variant="surface" placeholder="Enter your Name" />            
          <TextField.Input value={email} style={{width:400}} type='email' size={"3"} name="email" onChange={onChange} variant="surface" placeholder="Enter your e-mail" />            
          <TextField.Input value={password} style={{width:400}} type='password' size={"3"} name="password" onChange={onChange} variant="surface" placeholder="Enter your Password" />            
          <TextField.Input value= {password2} style={{width:400}} type='password' size={"3"} name="password2" onChange={onChange} variant="surface" placeholder="Confirm your password" />            
          <Button onClick={onSubmit} style={{maxWidth:100}}>Register</Button>
       </Flex>
      </section>
    </>
  )
}

export default Register
