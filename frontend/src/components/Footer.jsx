import React from 'react';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#FFC53D', // Dark background color
        color: '#A9A9A9', // Light text color
        padding: '20px',
        textAlign: 'center',
    };

    const linkStyle = {
        color: '#A9A9A9',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    return (
        <div style={footerStyle}>
            <p>&copy; 2024 Your Pet Store</p>
            <div>
                <a href="#" style={linkStyle}>Privacy Policy</a>
                <a href="#" style={linkStyle}>Terms of Service</a>
                <a href="#" style={linkStyle}>Contact Us</a>
            </div>
        </div>
    );
};

export default Footer;
