import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BestSellers = () => {

    const [ data , setData ] = useState([]);

    const getData = async()=>{
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/bestsellers")
        setData(res.data.petsWithRatings);
    }

    const navigate = useNavigate();
  
    useEffect(()=>{
      getData();
    },[])

    const bestSellersStyle = {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff', // White background color
    };

    const headingStyle = {
        fontSize: '2em',
        color: '#333', // Dark text color
        marginBottom: '20px',
    };

    const sellerListStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    };

    const sellerStyle = {
        textAlign: 'center',
        maxWidth: '200px',
        marginBottom: '20px',
        cursor:"pointer"
    };

    const imageStyle = {
        width: '100%',
        borderRadius: '10px',
        marginBottom: '10px',
        height:"200px",
        width:"200px",
        objectFit:"cover",
    };

    const ratingStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5px',
    };

    const starsStyle = {
        color: '#ff6f61', // Star color
        marginRight: '3px',
    };

    const reviewsStyle = {
        marginLeft: '3px',
        color: '#555', // Review text color
    };

    return (
        <div style={bestSellersStyle}>
            <h2 style={headingStyle}>Best Sellers</h2>
            <div style={sellerListStyle}>
                {
                data.map(pet => (
                    <div style={sellerStyle} key={pet._id} onClick={()=>{navigate("/search/"+pet.petType)}}>
                        <img src={process.env.REACT_APP_DEV_BASE_URL + "uploads/" + pet.petImages[0]}alt={pet.petName} style={imageStyle} />
                        <p className="seller-name">{pet.petType}s</p>
                        <div style={ratingStyle}>
                            <span style={starsStyle}>&#9733;</span>
                            <span className="rating-number">{Math.trunc(Number(pet.averageRating))}</span>
                            <span style={reviewsStyle}> | {pet.comments.length} Reviews</span>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default BestSellers;
