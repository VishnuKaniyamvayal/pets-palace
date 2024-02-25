import { Box, Button, Card, Flex, Grid, Text, TextArea, TextFieldInput } from '@radix-ui/themes';
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";
import CommentCard from '../components/CommentCard';
import Footer from '../components/Footer'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify"

const Productview = () => {

    const [pet , setPet] = useState({});
    const [images , setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState([]);
    const [comment, setComment] = useState("");
    const [allcomments, setAllCommets] = useState([]);
    const [rating, setRating] = useState("1");
    const { id } = useParams();

    const { user } = useSelector((state) => state.auth)

    const fetchData = async()=>{
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/pets/"+ id );
        setCurrentImage(res.data.pet.petImages[0]);
        setPet(res.data.pet);
        setImages(res.data.pet.petImages)
    }

    const addComment = async()=>{
        if(comment =="")
        {
            toast.error("Comment Cannot be Empty");
            return
        }
        const response = await axios.post(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/addcommentpet",{
            userid:user._id,
            petid:pet._id,
            comment:comment,
            rating:rating
        });
        if(response.status == 200)
        {
            toast.success("Comment Added")
            const newComment = response.data.comment;
            newComment.user = user;
            setAllCommets((oldComments)=>[...oldComments,newComment]);
        }
    }

    const getcomment = async()=>{
        const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/buyer/getcomment/" + pet._id)
        setAllCommets(res.data.commentsForPet);
    }

    useEffect(()=>{
        fetchData();
    },[])
    
    useEffect(()=>{
        getcomment();
    },[pet])

    return (
        <>
            <Grid columns={{ initial: "1", md: "3" }} gap="3">
                {/* Product Photo */}
                <img src={"uploads/"+currentImage} style={{ objectFit: "cover", borderWidth: "3px", borderColor: "gray" }} width="500px" height={"400px"} alt="" />
                {/* Details */}
                <Flex justify={"start"} direction="column" align={"left"} style={{ paddingLeft: "30px" }}>
                    <Text align={"left"} size="6" >{pet.petName}</Text>
                    <Flex justify={"start"} direction="row" align={"center"} gap="4">
                        <ReactStars
                            count={5}
                            value={3}
                            size={20}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <Text size={"2"} color='gray'>{5} Reviews</Text>
                        <Text size={"2"} color='gray'>{5} Orders</Text>
                    </Flex>
                    <Text as='p' size="2" color="gray" align={"left"}>{pet.petDesc}</Text>
                    <Text size="3" color="gray" align={"left"}>Species  : {pet.petType}</Text>
                    <Text size="3" color="gray" align={"left"}>Breed  : {pet.petBreed}</Text>
                    <Text size="3" color="gray" align={"left"}>Age  : {pet.petAge}</Text>
                </Flex>
                {/* Add to cart and other details*/}
                <Card style={{ height: '100%' , display:"flex" , flexDirection:"column"}}>
                    <Flex justify={"start"} direction="row" align={"left"} gap="4">
                        <Text size={"6"} weight="bold">Rs. {pet.petPrice}</Text>
                        <Text size={"2"} weight="bold" color='gray'><del>Rs. {Number(pet.petPrice) + 1239}</del></Text>
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
            {
            allcomments.map((comment,index)=>(
                <CommentCard key={index} comment={comment.comment} rating={comment.rating} userName  = {comment.user.name} />
            ))
            }
            </Flex>
            <Box style={{padding:"10px" , marginTop:"10px"}} >
                <TextArea size={"3"}  placeholder="Add a comment…" onChange={(e)=>{setComment(e.target.value)}} />
                <Text size={"2"} color='gray' align={"left"} tyle={{float:"right"}} >* You can add comment if only you are a verified customer</Text>
                <br></br>
                Rating:
               <select style={{width:"40px",marginLeft:"20px"}} onChange={(e)=>setRating(e.target.value)}>
                    <option value="1" selected>1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                </select>
                <Button style={{marginTop:"10px" , float:"right"}} onClick={addComment}>Comment</Button>
            </Box>
            </Grid>
            <Footer/>
        </>
    )
}

export default Productview