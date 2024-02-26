import { Table } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrdersTable = () => {

    const [ allOrders , setAllOrders ] = useState([]);

    const fetchAllOrders = async () => {
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/orders");
        setAllOrders(res.data.orders)
        console.log(res.data.orders)
    }

    useEffect(() => {
        fetchAllOrders();
    }, [])

  return (
    <>
        <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>User Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Breed </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                allOrders.map(( order , index)=>(
                    <Table.Row key={index}>
                        <Table.RowHeaderCell>Tesa</Table.RowHeaderCell>
                        <Table.Cell>Pomerian</Table.Cell>
                        <Table.Cell>Dog</Table.Cell>
                        <Table.Cell>17000</Table.Cell>
                        <Table.Cell>Delivered</Table.Cell>
                    </Table.Row>
                ))
                }
                </Table.Body>
            </Table.Root>
    </>
  )
}

export default OrdersTable