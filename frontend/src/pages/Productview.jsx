import { Button, Card, Flex, Grid, Text } from '@radix-ui/themes';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const Productview = () => {

    const images = ["https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg", "https://t3.ftcdn.net/jpg/04/81/85/46/360_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg", "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg"]

    const desc = "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident,"

    const [currentImage, setCurrentImage] = useState(images[0]);

    const { id } = useParams();

    return (
        <>
            <Grid columns={{ initial: "1", md: "3" }} gap="3">
                {/* Product Photo */}
                <img src={currentImage} style={{ objectFit: "cover", borderWidth: "3px", borderColor: "gray" }} width="500px" height={"400px"} alt="" />
                {/* Details */}
                <Flex justify={"start"} direction="column" align={"left"} style={{ paddingLeft: "30px" }}>
                    <Text align={"left"} size="6" >Name of the puppy</Text>
                    <Flex justify={"start"} direction="row" align={"center"} gap="4">
                        <ReactStars
                            count={5}
                            value={3}
                            size="20px"
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <Text size={"2"} color='gray'>{5} Reviews</Text>
                        <Text size={"2"} color='gray'>{5} Orders</Text>
                    </Flex>
                    <Text as='p' size="2" color="gray" align={"left"}>{desc}</Text>
                    <Text size="3" color="gray" align={"left"}>Species  : {"Species name"}</Text>
                    <Text size="3" color="gray" align={"left"}>Breed  : {"breed name"}</Text>
                    <Text size="3" color="gray" align={"left"}>Age  : {"breed name"}</Text>
                    <Text size="3" color="gray" align={"left"}>Height :{50}cm</Text>
                    <Text size="3" color="gray" align={"left"}>Weight :{50}cm</Text>
                </Flex>
                {/* Add to cart and other details*/}
                <Card style={{ height: '100%' , display:"flex" , flexDirection:"column"}}>
                    <Flex justify={"start"} direction="row" align={"left"} gap="4">
                        <Text size={"6"} weight="bold">Rs. {8000}</Text>
                        <Text size={"2"} weight="bold" color='gray'><del>Rs. {2000}</del></Text>
                    </Flex>
                    <Text size={"2"} color='gray'>Excluding Tax and other Charges</Text>
                    <Flex justify={'center'} align="center" direction={"column"} gap="4" style={{ padding: "10px 0 10px 0" }}>
                        <Button size={"3"} style={{ width: "300px" }}>Add to cart</Button>
                        <Button size={"3"} style={{ width: "300px" }} variant="soft">Add to wishlist</Button>
                    </Flex>
                    <Flex grow={"1"} justify={'end'} align="baseline" direction={"column"} gap="4" style={{ padding: "10px 0 10px 0" }}>
                        <Text size={"2"} color='gray'>Cash on delivery available</Text>
                        <Text size={"2"} color='gray'>Secure payment</Text>
                        <Text size={"2"} color='gray'>Returns available</Text>
                    </Flex>
                </Card>
            </Grid>
        </>
    )
}

export default Productview