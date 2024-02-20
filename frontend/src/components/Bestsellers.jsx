import React from 'react';

const BestSellers = () => {

    const imageUrl = "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg";

    const bestSellers = [
        { id: 1, name: 'Comfy Cat Tower', imageUrl, rating: 4.8, reviews: 32 },
        { id: 2, name: 'Chewy Dog Treats', imageUrl, rating: 4.5, reviews: 21 },
        { id: 3, name: 'Colorful Bird Toys', imageUrl, rating: 4.9, reviews: 45 },
        // Add more best sellers as needed
    ];

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
                {bestSellers.map(seller => (
                    <div style={sellerStyle} key={seller.id}>
                        <img src={seller.imageUrl}alt={seller.name} style={imageStyle} />
                        <p className="seller-name">{seller.name}</p>
                        <div style={ratingStyle}>
                            <span style={starsStyle}>&#9733;</span>
                            <span className="rating-number">{seller.rating}</span>
                            <span style={reviewsStyle}>{seller.reviews} Reviews</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellers;
