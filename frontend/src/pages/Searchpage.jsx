import { Box, Grid } from '@radix-ui/themes';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import SearchCard from '../components/SearchCard'

const Searchpage = () => {

    const [searchResults , setSearchResults] = useState([]);
    
    useEffect(() => {
        setSearchResults([
            {
              "id": 1,
              "name": "Buddy",
              "species": "Dog",
              "breed": "Golden Retriever",
              "description" : "nicedog",
              "age": "2 years",
              "price": 500
            },
            {
              "id": 2,
              "name": "Whiskers",
              "species": "Cat",
              "breed": "Siamese",
              "description" : "nicedog",
              "age": "1 year",
              "price": 300
            },
            {
              "id": 3,
              "name": "Rex",
              "species": "Dog",
              "breed": "German Shepherd",
              "description" : "nicedog",
              "age": "3 years",
              "price": 600
            },
            {
              "id": 4,
              "name": "Fluffy",
              "species": "Cat",
              "breed": "Persian",
              "description" : "nicedog",
              "age": "2 years",
              "price": 400
            },
            {
              "id": 5,
              "name": "Max",
              "species": "Dog",
              "breed": "Labrador Retriever",
              "age": "4 years",
              "description" : "nicedogauhsdgajhsdgjahgsdjahsgdjhasdjahsgdjhagsdjhagsdjhagdjhagsdjhgsajhdgasjhdgajsgdjahgdajhsgdjahgdjhagdjhagdjhagdjhagdjhasgdjhagdjagsdjhsajdhsagdjahgsdjhagjhdajsd",
              "price": 550
            }
            ,
            {
              "id": 6,
              "name": "Max",
              "species": "Dog",
              "breed": "Labrador Retriever",
              "age": "4 years",
              "description" : "nicedog",
              "price": 550
            }
          ])
    
    },[])
    




  return (
    <div>
      <h2 style={{textAlign:"left"}}>{searchResults.length} results found</h2>
        <Grid columns="3" gap="3 " width="auto">
            {
            searchResults.map((pet)=>
            <Box key={pet.id}>
            <SearchCard key={pet.id} pet = {pet}/>
            </Box>
            )
            }
        </Grid>
        
    </div>
  )
}

export default Searchpage
