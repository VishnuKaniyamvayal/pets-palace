import { Box, Grid, Text } from '@radix-ui/themes'
import React, { useState } from 'react'
import TopCard from './TopCard'
import SalesGraph from './SalesGraph'
import TrendGraph from './TrendGraph'
import axios from 'axios'

const Analytics = () => {

  const [ data , setData ] = useState([]); 

  const fetchData = async()=>{
    const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/saleslastweek");
    setData(res.data)
  }

  useState(()=>{
    fetchData();
  },[])

  const Data = [{title:"Sales Last Week" , value : 200} , {title:"Orders Cancelled" , value : 299} , {title:"Orders Pending" , value : 10} ]

  return (
    <>

      <Grid columns={"3"} gap="4" style={{padding:"20px 0px"}}>
        <Box >
        <TopCard title={"Sales Last Week"} value={data.ordersDelivered} />
        </Box>
        <Box >
        <TopCard title={"Orders Cancelled"} value={data.ordersCancelled}/>
        </Box>
        <Box >
        <TopCard title={"Orders Pending"} value={data.ordersPending}/>
        </Box>
      </Grid>  
      <Grid columns={"2"} gap="4" style={{padding:"20px 0px"}}>
        <Box style={{paddingTop:"45px"}}>
          <SalesGraph/>
        </Box>
        <Box>
          <TrendGraph/>
        </Box>
      </Grid>  
    </>
  )
}

export default Analytics