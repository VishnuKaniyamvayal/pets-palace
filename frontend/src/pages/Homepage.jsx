import React from "react";
import BestSellers from "../components/Bestsellers";
import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrival";
import Testimonials from "../components/Testimonial";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { reset } from '../features/goals/goalSlice'



function Homepage(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
    
    return(
        <>
        <Hero/>
        <Featured/>
        <NewArrivals/>
        <BestSellers/>
        <Testimonials/>
        <Footer/>
        </>
    )
}

export default Homepage