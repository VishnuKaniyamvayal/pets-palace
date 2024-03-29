import { Box , Button, Flex, Tabs , Text } from '@radix-ui/themes'
import React from 'react'
import Analytics from './Analytics'
import OrdersTable from './OrdersTable'
import PetsTable from './PetsTable'
import { useNavigate } from 'react-router-dom'

const Navigator = () => {

    const navigate = useNavigate();

    return (
        <div style={{marginTop:"-50px"}}>
            <Tabs.Root defaultValue="pets">
                <Tabs.List>
                    <Tabs.Trigger value="pets">Pets</Tabs.Trigger>
                    <Tabs.Trigger value="orders">Orders</Tabs.Trigger>
                    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    
                    <Tabs.Content value="pets">
                        <Flex justify={"end"}>
                        <Button style={{margin:"10px" }} onClick = {()=>{navigate('/addpet')}}> Add pet</Button>
                        </Flex>
                        <PetsTable/>
                    </Tabs.Content>

                    <Tabs.Content value="orders">
                        <OrdersTable/>
                    </Tabs.Content>

                    <Tabs.Content value="analytics">
                        <Analytics/>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </div>
    )
}

export default Navigator