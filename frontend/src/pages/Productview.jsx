import { Box, Button, Card, Flex, Grid, Text, TextArea, TextFieldInput } from '@radix-ui/themes';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import CommentCard from '../components/CommentCard';
import Footer from '../components/Footer'

const Productview = () => {

    const images = ["https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg", "https://t3.ftcdn.net/jpg/04/81/85/46/360_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYi0S8pxLUemotBw_8SzBFpuo0TeZc72-zpAiGzc_rji_6xfvdTPsImL9BCY9CHOK1L1w&usqp=CAU" , "https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?cs=srgb&dl=pexels-svetozar-milashevich-1490908.jpg&fm=jpg"]

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
            <Flex justify={"start"} align="center" direction={"row"} gap="6" style={{margin: "20px 0 10px 0"}}>
            {
                images.map(( imageUrl , index )=>
                    <img onClick={()=>{setCurrentImage(imageUrl)}}  style={{objectFit:"cover" , borderRadius: "10px"}} width={"100px"} height="100px" key={ index } src={imageUrl} alt="PRODUCT IMAGE"/>
                )
            }
            </Flex>
            <Text weight={"bold"} size="6" align={"left"}>Comments</Text>
            <Grid columns={"2"} gap="6" style={{margin: "20px 0 10px 0"}}>
            <Flex justify={"start"} align="left" direction={"column"} gap="6" style={{margin: "20px 0 10px 0"}}>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            </Flex>
            <Box style={{padding:"10px" , marginTop:"10px"}}>
                <TextArea size={"3"}  placeholder="Add a comment…" />
                <Text size={"2"} color='gray' align={"left"} tyle={{float:"right"}} >* You can add comment if only you are a verified customer</Text>
                <Button style={{marginTop:"10px" , float:"right"}}>Comment</Button>
            </Box>
            </Grid>
            <Footer/>
        </>
    )
}

export default Productview