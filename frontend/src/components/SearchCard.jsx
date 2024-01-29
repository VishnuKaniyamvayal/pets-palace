import { Button } from '@radix-ui/themes';
import React from 'react';
import { toast } from 'react-toastify';

const Card = ({ pet }) => {
  return (
    <div style={styles.card}>
      <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGs22Ni8UwHVtdPUErmVQst-xfxF5yK3jPW0uEYZ25nw&s"} alt={pet.name} style={styles.image} />
      <div style={styles.cardBody}>
        <h3 style={styles.petName}>{pet.name}</h3>
        <p style={styles.petBreed}>{pet.breed}</p>
        <p style={styles.petPrice}>Price: ${pet.price}</p>
        <Button onClick={() => {addToCart(pet)}}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const addToCart = (pet) => {
  // Implement your logic to add the pet to the cart
  toast.success(pet.name + " added to cart")
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
