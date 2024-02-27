import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedCategories = () => {

  const [ data , setData ] = useState([]);

  const navigate = useNavigate();

  const getData = async()=>{
      const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/featuredCategories")
      setData(res.data.featuredCategories);
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Featured Breeds</h2>
      <div style={styles.categoryContainer}>
        {data.map((category,index) => (
          <div key={index} style={styles.category} onClick={()=>{navigate("/search/"+category.category)}}>
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
    cursor:"pointer"
  },
  image: {
    width: '100%',
    height: '300px',
    borderRadius: '5px',
    marginBottom: '10px',
    objectFit:"cover"
  },
  categoryName: {
    fontSize: '16px',
    color: '#444',
  },
};

export default FeaturedCategories;
