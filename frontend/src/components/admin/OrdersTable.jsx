import { Box, Button, Card, DropdownMenu, Flex, Grid, Select, Table, Text } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const OrdersTable = () => {

    const [allOrders, setAllOrders] = useState([]);
    const [items, setItems] = useState([]);

    const fetchAllOrders = async () => {
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/orders");
        setAllOrders(res.data.orders)
    }
    const updateOrderStatus = async ( orderid , status) => {
        const res = await axios.post(process.env.REACT_APP_DEV_BASE_URL + "api/admin/updateorderstatus",{
            orderid,
            status
        });
        if(res.status == 200)
        {
            toast.success("Status Changed")
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

    return (
        <>
            <Grid columns={"2"} >
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>User Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Payment type</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Sub Total</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Tax(18%)</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Order Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Items</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            allOrders.map((order, index) => (
                                <Table.Row key={index}>
                                    <Table.RowHeaderCell>{order.user.name}</Table.RowHeaderCell>
                                    <Table.Cell>{order.address.address}</Table.Cell>
                                    <Table.Cell>{order.paymentType}</Table.Cell>
                                    <Table.Cell>{order.subTotal}</Table.Cell>
                                    <Table.Cell>{Math.trunc(Number(order.tax))}</Table.Cell>
                                    <Table.Cell>{order.total}</Table.Cell>
                                    <Table.Cell>
                                        <Select.Root defaultValue={order.orderStatus} onValueChange={(value)=>{updateOrderStatus( order._id , value )}} disabled={order.orderStatus == "Cancelled" ? true : false}>
                                            <Select.Trigger/>
                                            <Select.Content position="popper" onChange={(e)=>{}}>
                                                <Select.Item value="Pending" >Pending</Select.Item>
                                                <Select.Item value="Processing" >Processing</Select.Item>
                                                <Select.Item value="Shipped" >Shipped</Select.Item>
                                                <Select.Item value="Delivered">Delivered</Select.Item>
                                                <Select.Item value="Cancelled">Cancelled</Select.Item>
                                            </Select.Content>
                                        </Select.Root>
                                    </Table.Cell>
                                    <Table.Cell><Button  onClick={()=>{setItems(order.items);console.log(order.items)}} variant='surface'>View({order.items.length})items</Button></Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table.Root>
                <Flex justify={"start"} direction="column" align={"center"}>
                    <Text>Items</Text>
                    {
                        items.length == 0 ?
                        <Text> Click any order to view items </Text>
                        :
                        ""
                    }
                    {
                        items.map(( item , index )=>(
                            <Card style={{marginTop:"10px",width:"250px"}}>
                            <Text>Pet: { item.pet.petName }</Text>
                            <br></br>
                            <Text>Price: { item.pet.petPrice }</Text><br></br>
                            <Text>Breed: { item.pet.petBreed }</Text><br></br>
                            <Text>Species: { item.pet.petType }</Text><br></br>
                            </Card>
                        ))
                    }
                </Flex>
            </Grid>
        </>
    )
}

export default OrdersTable