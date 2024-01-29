import { Button } from '@radix-ui/themes';
import React from 'react';
import PetImage from "../images/pet.jpg"

const Hero = () => {
    const heroBannerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '500px', // Adjust the height as needed
        backgroundColor: '#f8f8f8', // Light background color
    };

    const contentStyle = {
        flex: 1,
        padding: '20px',
        textAlign: 'left',
    };

    const headingStyle = {
        fontSize: '2.5em',
        color: '#333', // Dark text color
    };

    const paragraphStyle = {
        fontSize: '1.2em',
        color: '#555', // Slightly darker text color
    };

    const imageContainerStyle = {
        flex: 1,
        overflow: 'hidden',
    };

    const imageStyle = {
        width: '400px',
        height: '400px',
        objectFit: 'cover',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
    };

    return (
        <div style={heroBannerStyle}>
            <div style={contentStyle}>
                <h1 style={headingStyle}>Cute & Cuddly</h1>
                <p style={paragraphStyle}>Discover a world of adorable pet products that will make your furry friends jump with joy!</p>
                <Button>Shop Now</Button>
            </div>
            <div style={imageContainerStyle}>
                <img src={PetImage} alt="Cute Pet" style={imageStyle} />
            </div>
        </div>
    );
};

export default Hero;
