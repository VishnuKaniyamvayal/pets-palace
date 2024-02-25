import { Button } from '@radix-ui/themes';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Card = ({ pet , userid }) => {

  const petid = pet._id
  const navigate = useNavigate();
  const addToCart = async() =>{
    try{
      const response = await axios.post( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/addtocart",{
          userid,
          petid
      })
      if(response.status == 200 )
      {
        toast.success("Added to cart")
      }
    }
    catch(err){
      console.log(err)
    }
    
  }

  return (
    <div style={styles.card }>
      <img src={process.env.REACT_APP_DEV_BASE_URL + "uploads/" + pet.petImages[0]} alt={pet.name} style={styles.image} onClick={()=>{navigate("/productview/"+petid)}}/>
      <div style={styles.cardBody}>
        <h3 style={styles.petName}>{pet.petName}</h3>
        <p style={styles.petBreed}>{pet.petBreed}</p>
        <p style={styles.petPrice}>Price: ₹ {pet.petPrice} </p>
        <Button onClick={() => {addToCart( pet._id , userid )}}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    backgroundColor: '#fff',
    maxHeight:"400px",
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    cursor:"pointer"
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardBody: {
    padding: '15px',
  },
  petName: {
    fontSize: '1.2rem',
    margin: '0 0 10px',
  },
  petBreed: {
    color: '#666',
    marginBottom: '10px', 
  },
  petPrice: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default Card;
