import { Button } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewArrival = () => {

    const [ data , setData ] = useState([]);

    const getData = async()=>{
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/newcomers")
        setData(res.data.newcomers);
    }
  
    useEffect(()=>{
      getData();
    },[])


    const navigate = useNavigate();

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
        height:"200px",
        width:"200px",
        objectFit:"cover"
    };

    const buttonStyle = {
        marginTop:"10px"
    };



    return (
        <div style={newArrivalsStyle}>
            <h2 style={headingStyle}>New Comers</h2>
            <div style={productGridStyle}>
                {data.map(product => (
                    <div style={productStyle} key={product._id} onClick={()=>{navigate("productview/"+product._id)}}>
                        <img src={process.env.REACT_APP_DEV_BASE_URL + "uploads/" + product.petImages[0]} alt={product.petName} style={imageStyle} />
                        <p>{product.petName}</p>
                        <Button
                        style={buttonStyle}
                        >View Product</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrival;
