import { Box, Card, Flex, Text } from '@radix-ui/themes'
import React from 'react'

const TopCard = ({ data }) => {
    return (
        <>
            <Card size="3" style={{ width: 300 }}>
                <Flex gap="4" align="center">
                    <Box>
                        <Text as="div" size="4" weight="bold">
                            { data.title }
                        </Text>
                        <Text as="div" size="4" color="gray">
                            { data.value }
                        </Text>
                    </Box>
                </Flex>
            </Card>
        </>
    )
}

export default TopCard