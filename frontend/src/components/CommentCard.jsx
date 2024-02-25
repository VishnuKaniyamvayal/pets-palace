import { Avatar, Box, Card, Flex, Grid, Text } from '@radix-ui/themes'
import React from 'react'
import ReactStars from 'react-rating-stars-component';

const CommentCard = ({ comment , userName , rating }) => {
    return (
        <Card size="3" style={{ width: 600 }}>
            <Flex gap="4" align="center" grow={"1"}>
                <Avatar size="5" radius="full" fallback="T" color="indigo" />
                <Box>
                    <Text as="div" size="4" weight="bold">
                        {userName}
                    </Text>
                    <Text as="div" size="2" color="gray">
                        {comment}
                    </Text>
                <ReactStars
                            count={5}
                            value={rating}
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