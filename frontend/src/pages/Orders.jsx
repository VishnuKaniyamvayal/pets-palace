import { Box, Button, Card, Flex, Grid, Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';



function Orders() {
    const [ orders , setOrders ] = useState([]);

    const { user } = useSelector((state) => state.auth)

    const fetchOrders = async()=>{
      try
      {
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/getallorder/"+ user._id);
        console.log(user._id)
        console.log(res.data.allOrders)
        setOrders(res.data.allOrders)
      }
      catch(err)
      {
        console.log(err)
      }
    }

    useEffect(()=>{
        fetchOrders();
    },[])

    const cancelOrder = async( orderid ) =>{
      try {        
        const res = await axios.put(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/cancelorder/" + orderid );
        if(res.status == 200)
        {
          toast.success("Order Cancelled")
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <Flex width={"200px"} justify={"start"} direction={"column"} align={"center"} gap="6">
        {
          orders.map((item,index)=>(
      <Card key={index}>
        <Card>
          <Flex justify={"between"} align="center"  gap={"9"} direction="row">
            <>
            <Text>{index+1}.</Text>
            </>
            <>
              <Text>Total: {item.total}</Text>
            </>
            <>
            <Text style={{cursor:"pointer"}}>Total Items( {item.items.length} )</Text>
            </>
            <>
            {
              item.orderStatus == "Cancelled" ? 
              <Button disabled>Cancelled</Button>
              :
              <Button onClick={()=>{cancelOrder(item._id)}}>Cancel Order</Button>
            }
            </>
          </Flex> 
        </Card>
        <Text >Items:</Text>
        {
        item.items.map(( pet , index )=>(  
        <Card style={{marginTop:"10px"}} key={index}>
          <Flex justify={"between"} align="center"  gap={"9"} direction="row">
            <>
            Name : {pet.pet.petName}
            </>
            <br></br>
            <>
            Pet Type : {pet.pet.petType}
            </>
            <br></br>
            <>
            Breed : {pet.pet.petBreed}
            </>
            <br></br>
            <>
            petAge : {pet.pet.petAge}
            </>
            <br></br>
            <>
            Quantity : {pet.quantity}
            </>
          </Flex> 
        </Card>
        ))
        }
      </Card>
          ))
        }
      </Flex>
    </>
  )
}

export default Orders
