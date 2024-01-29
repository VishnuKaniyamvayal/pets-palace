import { Avatar, Box, Button, Card, Flex, Text, TextField } from '@radix-ui/themes'
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

const CartCard = () => {

    const [count , setCount] = useState(1);


    function increaseCount(){
        if(count < 4)
        {
            setCount(count+1);
        }
        else
        {
            toast.info("you can only get upto 4 Nos in one checkout")
        }
    }
    function decreaseCount() {
        if(count > 1)
        {
            setCount(count-1);
        }
    }

    return (
        <div>
            <Card style={{ maxWidth: 540, height: 100 }} >
                <Flex gap="3" align="center">
                    <Avatar
                        size="3"
                        src=""
                        fallback="T"
                    />
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            Puppy fox
                        </Text>
                        <Text as="div" size="2" color="gray">
                            Engineering
                        </Text>
                    </Box>
                </Flex>
                <Flex gap="3" align="center" style={{marginTop:10}} justify="center">
                    <Button size="1" variant="soft" onClick={decreaseCount}>-</Button>
                    <TextField.Input disabled value={count} style={{width:30 , textAlign:"center"}}/>
                    <Button size="1" variant="soft" onClick={increaseCount}>+</Button>
                </Flex>
            </Card>
        </div>
    )
}

export default CartCard