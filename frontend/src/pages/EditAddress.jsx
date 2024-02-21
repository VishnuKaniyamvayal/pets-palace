import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Flex, TextArea } from '@radix-ui/themes';


function EditAddress() {
  const [ address , setAddress ] = useState("Write Your Full Address Here");
  const navigate = useNavigate()

  const { user } =  useSelector((state)=>state.auth)

  const addAddress = async()=>{
    if(!address)
    {
      toast.error("Address cannot be empty")
    }
    try {
      const response = await axios.post( process.env.REACT_APP_DEV_BASE_URL + "api/buyer/addaddress" ,{
        userid:user._id,
        address:address
      });
      console.log(response.data)
      if(response.status == 200)
      {
        toast.success("Successfully Added");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
      <TextArea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      <Button
        onClick={addAddress}
      >
        Add Address
      </Button>
    </Flex>
    </>
  )
}

export default EditAddress
