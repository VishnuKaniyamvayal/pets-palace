import { Box, Grid } from '@radix-ui/themes';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useSelector} from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import SearchCard from '../components/SearchCard'

const Searchpage = () => {

  const [searchResults , setSearchResults] = useState([]);
  let { id } = useParams();

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

    fetchSearch();
  
  },[id])

  const fetchSearch = async() => {
    try
    {
      const response = await axios.get( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/rawsearch/" + id)
      setSearchResults(response.data);
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <div>
      <h2 style={{textAlign:"left"}}>{searchResults.length} results found</h2>
        <Grid columns="3" gap="3 " width="auto">
            {
            searchResults.map((pet,index)=>
            <Box key={index}>
            <SearchCard userid={user._id} key={pet.id} pet = {pet}/>
            </Box>
            )
            }
        </Grid>
        
    </div>
  )
}

export default Searchpage
