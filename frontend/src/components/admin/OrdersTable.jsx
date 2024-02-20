import { Table } from '@radix-ui/themes'
import React from 'react'

const OrdersTable = () => {
  return (
    <>
        <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Pet Name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Breed </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Age</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell>Tesa</Table.RowHeaderCell>
                        <Table.Cell>Pomerian</Table.Cell>
                        <Table.Cell>Dog</Table.Cell>
                        <Table.Cell>17000</Table.Cell>
                        <Table.Cell>Delivered</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
    </>
  )
}

export default OrdersTable