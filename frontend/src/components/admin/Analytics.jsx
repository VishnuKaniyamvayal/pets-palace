import { Box, Grid, Text } from '@radix-ui/themes'
import React from 'react'
import TopCard from './TopCard'
import SalesGraph from './SalesGraph'
import TrendGraph from './TrendGraph'

const Analytics = () => {


  const Data = [{title:"Sales Last Week" , value : 200} , {title:"Orders Cancelled" , value : 299} , {title:"Orders Pending" , value : 10} ]

  return (
    <>

      <Grid columns={"3"} gap="4" style={{padding:"20px 0px"}}>
        {
          Data.map((data , key) => (
        <Box >
        <TopCard data = {data} key={key}/>
        </Box>
          ))
        }
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