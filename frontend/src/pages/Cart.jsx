// src/components/Cart.js

import { Box, Flex, Grid } from '@radix-ui/themes';
import React, { useState } from 'react';
import CartCard from '../components/CartCard';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);


  return (
    <div>
      <h3>Your Cart</h3>
      <Grid columns="3" gap="3">
        <Flex direction="column" gap="3">
          <CartCard/>
          <CartCard/>
          <CartCard/>
          <CartCard/>
        </Flex>

        <Flex direction="column" gap="3">
          <Box grow="1">
          </Box>
          <Box height="6">
            
          </Box>
        </Flex>
      </Grid>
    </div>
  );
};
export default Cart;
