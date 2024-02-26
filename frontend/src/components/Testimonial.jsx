import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Testimonials = () => {

    const [ data , setData ] = useState([]);

    const getData = async()=>{
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/testmonials")
        setData(res.data.bestLatestComment);
    }
    
    useEffect(()=>{
      getData();
    },[])


    const imageUrl = "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg";

    const testimonials = [
        { id: 1, petName: 'Buddy', ownerName: 'Alice', review: 'The pet products here are amazing! Buddy loves them all.', imageUrl },
        { id: 2, petName: 'Whiskers', ownerName: 'Bob', review: 'Whiskers is the happiest cat ever thanks to these products.', imageUrl },
        { id: 3, petName: 'Max', ownerName: 'Charlie', review: 'Max favorite treats are from this fantastic pet store!', imageUrl} ,
        // Add more testimonials as needed
    ];

    const testimonialsStyle = {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff', // White background color
    };

    const headingStyle = {
        fontSize: '2em',
        color: '#333', // Dark text color
        marginBottom: '20px',
    };

    const testimonialListStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    };

    const testimonialStyle = {
        textAlign: 'center',
        maxWidth: '300px',
        marginBottom: '20px',
    };

    const imageStyle = {
        width: '100%',
        borderRadius: '50%',
        marginBottom: '10px',
    };

    const ownerNameStyle = {
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const reviewStyle = {
        color: '#555', // Review text color
    };

    return (
        <div style={testimonialsStyle}>
            <h2 style={headingStyle}>Testimonials</h2>
            <div style={testimonialListStyle}>
                {data.map(testimonial => (
                    <div style={testimonialStyle} key={testimonial._id}>
                        <img src={process.env.REACT_APP_DEV_BASE_URL + "uploads/" + testimonial.petDetails[0].petImages[0].ImageName} alt={testimonial.petName} style={imageStyle} />
                        <p style={ownerNameStyle}>{testimonial.userDetails[0].name}</p>
                        <p>{testimonial.petDetails[0].petName}</p>
                        <p style={reviewStyle}>{testimonial.latestComment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
