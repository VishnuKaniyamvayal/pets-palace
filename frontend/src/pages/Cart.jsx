// src/components/Cart.js

import { Avatar, Box, Button, Card, Checkbox, Flex, Grid, RadioGroup, Text, TextField, TextFieldInput } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';


const Cart = () => {
  const [ cartItems ,setCartItems ] = useState([]);
  const [ userAddress ,setAddress ] = useState({});
  const [ subTotal , setSubTotal ] = useState();
  const [ tax , setTax ] = useState();
  const [ total , setTotal ] = useState();

  const { user } = useSelector((state) => state.auth)

  const deleteAddress = async()=>{
    // code to delete address from db
    try {
      const response = await axios.delete( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/deleteaddress/"+user._id);
      setAddress("");
      if(response.status == 200)
      {
        toast.error("Address deleted successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCartItems = async() =>{
    try {
      const response = await axios.post( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/getcartdata", {
        userid:user._id
      });
      setCartItems(response.data.userCart.items);
      calculateTotal();
    } catch (error) {
      console.log(error)
    }
  }
  const fetchAddress = async() =>{
    try {
      const response = await axios.get( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/getaddress/" + user._id);
      setAddress(response.data.address);
      calculateTotal();
    } catch (error) {
      console.log(error)
    }
  }       

  const calculateTotal = ()=>{
    let subTotal = 0;
    for(let i = 0 ; i < cartItems.length ; i++)
    {
      subTotal += Number(cartItems[i].pet.petPrice) * Number(cartItems[i].quantity);
    }
    let tax = subTotal*0.18;
    setTax(tax);
    setSubTotal(subTotal);
    setTotal(tax + subTotal);
  }

  const addcount = (index) => {
    const updatedCartItems = [...cartItems];
    // Increment the quantity for the selected item
    if(updatedCartItems[index].quantity >= 4)
    {
      toast.info("Ony 4 qty per Order")
      return
    }
    updatedCartItems[index].quantity += 1;
    // Update the state with the new cart items array
    setCartItems(updatedCartItems);
    calculateTotal();
  }

  const minuscount = (index) => {
    const updatedCartItems = [...cartItems];
    // Increment the quantity for the selected item
    if(updatedCartItems[index].quantity <= 1)
    {
      return
    }
    updatedCartItems[index].quantity -= 1;
    // Update the state with the new cart items array
    setCartItems(updatedCartItems);
    calculateTotal()
  }

  const placeOrder = async ()=>{
    if(userAddress == "")
    {
      toast.error("Please add address first")
    }
    try {
      const response = await axios.post(process.env.REACT_APP_DEV_BASE_URL + 'api/buyer/addorder',{
        userid:user._id,
        items:cartItems,
        address:userAddress,
        paymentType: "COD"  //currently setting as static
      })
      console.log(response)
      if(response.status == 200)
      {
        toast.success("Order Successfully Placed");
        await axios.delete(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/deletecart/"+user._id)
        setCartItems([]);
      }
      else
      {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCartItems();
    fetchAddress();
  },[])

  const navigate = useNavigate()

  return (
    <>
    {
      (cartItems.length == 0)
      ?
      <Text style={{ margin: "11px" }} weight="bold">No Items in Cart</Text>
      :
      
    <>
      <Text style={{ margin: "11px" }} weight="bold">Your Cart ( {cartItems.length} ) Items</Text>
      <Grid columns={{ initial: "1", md: '3' }} gap="3">
        {/* cards */}
        <Flex direction="column" gap="3" justify={"center"} align="center">
          {
            cartItems.map(( item , index )=>
            <div key={index}>
            <Card style={{ maxWidth: 540, height: 100 }} >
                <Grid columns={"3"} gap="3">

                    <Flex gap="3" align="center">
                        <Avatar
                            size="3"
                            src={item.pet.petImages[0]}
                            fallback="T"
                            />
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                {item.pet.petName}
                            </Text>
                            <Text as="div" size="2" color="gray">
                               {item.pet.petBreed}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex gap="3" align="center" style={{ marginTop: 10 }} justify="center">
                        <Button size="1" variant="soft"  onClick={()=>{minuscount(index)}}>-</Button>
                        <TextField.Input disabled value={item.quantity} style={{ width: 30, textAlign: "center" }} />
                        <Button size="1" variant="soft" onClick={()=>{addcount(index)}}>+</Button>
                    </Flex>
                    <Flex align={"center"} justify="center" gap={"2"}>
                        <Text weight={"bold"}>Price:</Text>
                        <Text weight={"light"} size="2">Rs.{item.pet.petPrice}</Text>
                    </Flex>
                </Grid>
            </Card>
        </div>
            )
          }
        </Flex>
        {/* Payment Method */}
        <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"between"} align={"center"}>
        <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"start"} align={"center"}>
          <Text weight={"bold"} size="5">Available Payment Methods</Text>
          <RadioGroup.Root defaultValue="1">
            <Flex gap="3" direction="column">
              <Text as="label" weight={"light"} size="6">
                <Flex gap="2">
                  <RadioGroup.Item checked value="COD" /> Cash on Delivery
                </Flex>
              </Text>
              <Text as="label" size="6">
                <Flex gap="2" onClick={()=>{toast.error("Online payment Currently not available")}}>
                  <RadioGroup.Item value="OnlinePayment" disabled /> Online Payment (Not available for this order)
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
          </Flex>
          <Flex direction="column" gap="3" style={{ padding: 10 }} justify={"start"} align={"center"}>
          <Flex direction="row" gap="4" justify={"center"} align={"center"}>
          <Text weight={"bold"} size="5">Address</Text>
          {
            userAddress != ""
            ? 
            <MdDelete size={23} style={{cursor:"pointer"}} onClick={deleteAddress} title='Delete current address'/>
            :
            "" 
          }
          </Flex>
          {
            userAddress == "" ? 
            <>
            Address Not Found
            <Button onClick={()=>{navigate('/addaddress')}}>Add Address</Button>
            </>
            :
            <Text>
              {userAddress.address}
            </Text>
          }
          </Flex>
        </Flex>
        {/* Details */}
        <Flex direction="column" gap="3">
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Subtotal:</Text>
            <Text weight={"Light"}>Rs {subTotal}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Sales Tax (18%):</Text>
            <Text weight={"Light"}>Rs {tax}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="between" gap="3" style={{ padding: "10px" }}>
            <Text weight={"bold"} size="5">Grand Total:</Text>
            <Text weight={"medium"} size="4">Rs {total}</Text>
          </Flex>
          <Flex direction="row" align={"center"} justify="end" gap="3" style={{ padding: "10px" }}>
            <Button size={"4"} onClick={placeOrder}>Checkout</Button>
          </Flex>
        </Flex>
      </Grid>
    </>
  }
    </>
  );
};
export default Cart;
