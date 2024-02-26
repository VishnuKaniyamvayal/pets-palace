import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FeaturedCategories = () => {

  const [ data , setData ] = useState([]);

  const getData = async()=>{
      const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/featuredCategories")
      setData(res.data.featuredCategories);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Featured Categories</h2>
      <div style={styles.categoryContainer}>
        {data.map((category) => (
          <div key={category._id} style={styles.category}>
            <img src={process.env.REACT_APP_DEV_BASE_URL + "uploads/" + category.image} alt={category.category} style={styles.image} />
            <p style={styles.categoryName}>{category.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: '29px',
    marginBottom: '15px',
    color: '#333',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  category: {
    textAlign: 'center',
    width: '30%',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  categoryName: {
    fontSize: '16px',
    color: '#444',
  },
};

export default FeaturedCategories;
