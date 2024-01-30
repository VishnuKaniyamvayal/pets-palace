// src/components/Cart.js

import { Box, Button, Checkbox, Flex, Grid, RadioGroup, Text, TextFieldInput } from '@radix-ui/themes';
import React from 'react';
import CartCard from '../components/CartCard';
import { FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const navigate = useNavigate()

  return (
    < >
      <Text style={{ margin: "11px" }} weight="bold">Your Cart ( {4} ) Items</Text>
      <Grid columns={{ initial: "1", md: '3' }} gap="3">
        {/* cards */}
        <Flex direction="column" gap="3" justify={"center"} align="center">
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </Flex>
        {/* Payment Method */}
        <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"between"} align={"center"}>
        <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"start"} align={"center"}>
          <Text weight={"bold"} size="5">Available Payment Methods</Text>
          <RadioGroup.Root defaultValue="1">
            <Flex gap="3" direction="column">
              <Text as="label" weight={"light"} size="6">
                <Flex gap="2">
                  <RadioGroup.Item value="1" /> Cash on Delivery
                </Flex>
              </Text>
              <Text as="label" size="6">
                <Flex gap="2">
                  <RadioGroup.Item value="2" /> Online Payment
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
          </Flex>
          <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"start"} align={"center"}>
          <Flex direction="row" gap="4" justify={"center"} align={"center"}>
          <Text weight={"bold"} size="5">Address</Text>
          <FaPen onClick={()=>{navigate("/edit-address")}}/>
          </Flex>
          Address.<br/>
          asdasdasdasdasdasd
          asdasdasdasdasdasdasda
          asdasdasdasdasdasdasdaas
          asdasda
          </Flex>
        </Flex>
        {/* Details */}
        <Flex direction="column" gap="3">
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Subtotal:</Text>
            <Text weight={"Light"}>Rs {200}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Sales Tax</Text>
            <Text weight={"Light"}>Rs {200}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Coupon Code</Text>
            <TextFieldInput></TextFieldInput>
          </Flex>
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Grand Total</Text>
            <Text weight={"Light"}>Rs {200}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="end" gap="3" style={{ padding: "10px" }}>
            <Button size={"4"}>Checkout</Button>
          </Flex>
        </Flex>
      </Grid>
    </>
  );
};
export default Cart;
