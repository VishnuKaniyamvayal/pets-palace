import { Table } from '@radix-ui/themes'
import React from 'react'

const OrdersTable = () => {
  return (
    <>
        <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                        <Table.Cell>danilo@example.com</Table.Cell>
                        <Table.Cell>Developer</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
    </>
  )
}

export default OrdersTable