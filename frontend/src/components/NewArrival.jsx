import { Button } from '@radix-ui/themes';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewArrival = () => {

    const navigate = useNavigate();
    
    const imageUrl = "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg";

    const newProducts = [
        { _id: 1, name: 'Cozy Pet Bed', imageUrl },
        { _id: 2, name: 'Interactive Cat Toy', imageUrl },
        { _id: 3, name: 'Durable Dog Chew', imageUrl },
        // Add more new arrivals as needed
    ];

    const newArrivalsStyle = {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff', // White background color
    };

    const headingStyle = {
        fontSize: '2em',
        color: '#333', // Dark text color
        marginBottom: '20px',
    };

    const productGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        justifyContent: 'center',
    };

    const productStyle = {
        textAlign: 'center',
        cursor:"pointer"
    };

    const imageStyle = {
        width: '100%', // Adjusted width to make the image responsive within the grid cell
        borderRadius: '10px',
        marginBottom: '10px',
    };

    const buttonStyle = {
        marginTop:"10px"
    };



    return (
        <div style={newArrivalsStyle}>
            <h2 style={headingStyle}>New Comers</h2>
            <div style={productGridStyle}>
                {newProducts.map(product => (
                    <div style={productStyle} key={product.id} onClick={()=>{navigate("productview/"+product._id)}}>
                        <img src={product.imageUrl} alt={product.name} style={imageStyle} />
                        <p>{product.name}</p>
                        <Button
                        style={buttonStyle}
                        >Add to cart</Button>
                    </div>
                ))}
            </div>
            <Button>Shop Now</Button>
        </div>
    );
};

export default NewArrival;
