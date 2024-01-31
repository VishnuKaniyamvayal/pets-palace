import { Avatar, Box, Card, Flex, Grid, Text } from '@radix-ui/themes'
import React from 'react'
import ReactStars from 'react-rating-stars-component';

const CommentCard = () => {

    const images = ["https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg", "https://t3.ftcdn.net/jpg/04/81/85/46/360_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYi0S8pxLUemotBw_8SzBFpuo0TeZc72-zpAiGzc_rji_6xfvdTPsImL9BCY9CHOK1L1w&usqp=CAU" , "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg"]

    const Comment = "asdasdasdasdasdasdssssssssssssssssssssssss asd as d asd asd sa d as da sd asd a sd asd ads";
    return (
        <Card size="3" style={{ width: 600 }}>
            <Flex gap="4" align="center" grow={"1"}>
                <Avatar size="5" radius="full" fallback="T" color="indigo" />
                <Box>
                    <Text as="div" size="4" weight="bold">
                        Teodros Girmay
                    </Text>
                    <Text as="div" size="2" color="gray">
                        {Comment}
                    </Text>
                <ReactStars
                            count={5}
                            value={3}
                            size="20px"
                            edit={false}
                            activeColor="#ffd700"
                />
                </Box>
            </Flex>
        </Card>
    )
}

export default CommentCard