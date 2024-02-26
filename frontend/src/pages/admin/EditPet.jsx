import React, { useEffect, useState } from 'react';
import { Button, Flex, Text, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import  { useSelector } from "react-redux"


const EditPet = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petImage, setPetImage] = useState([]);
  const [petBreed, setPetBreed] = useState('');
  const [petDesc, setPetDesc] = useState('');
  const [petPrice, setPetPrice] = useState('');
  
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPetImage(imageFile);
  };

  const getPetDetails = async()=>{
    const res = await axios.get(process.env.REACT_APP_DEV_BASE_URL + "api/admin/getpetbyid/"+ id);
    setPetName(res.data.petName);
    setPetType(res.data.petType);
    setPetAge(res.data.petAge);
    setPetBreed(res.data.petBreed);
    setPetPrice(res.data.petPrice);
    setPetDesc(res.data.petDesc);
    setPetImage(res.data.petImages);
  };

  const handleSubmit =async (e) => {

    if(petBreed == "" || petType == "" || petName == "" || petImage == "" || petAge == "" )
    {
      toast.error("all fields are important");
    }
    else{
      const formData = new FormData();
      formData.append('petName', petName);
      formData.append('petBreed', petBreed);
      formData.append('petType', petType);
      formData.append('petAge', petAge);
      formData.append("image",petImage);
      formData.append("petDesc",petDesc);
      formData.append("petPrice",petPrice);
      try {
        const response = await axios.put(process.env.REACT_APP_DEV_BASE_URL + 'api/admin/updatepet/' + id ,  formData , {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          toast.success('Pet Updated successfull');
          navigate("/admin")
        } else {
          console.error('Failed to update pet.');
        }
      } catch (error) {
        console.error('Error updating pet:', error);
      }
    }
 };

 useEffect(()=>{
  if(user && user.admin == null)
  {
    navigate("/")
  }
  getPetDetails();
 },[])

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 400 ,marginLeft:"auto",marginRight:"auto"}}>
      <Text size={"6"} weight={"medium"}>Edit Pet</Text>
      <TextField.Root>
        <TextField.Input
          placeholder="Pet Name"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Pet Type"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
        />
        <TextField.Slot>
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Pet Age"
          type="number"
          value={petAge}
          onChange={(e) => setPetAge(e.target.value)}
        />
        <TextField.Slot pr="3">
        </TextField.Slot>
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Pet Image URL"
          type="file"
          onChange={handleImageChange}
        />
      </TextField.Root>

      <TextField.Root>
        <TextField.Input
          placeholder="Pet Breed"
          value={petBreed}
          onChange={(e) => setPetBreed(e.target.value)}
        />
      </TextField.Root>
      <TextField.Root>
        <TextField.Input
          placeholder="Pet price"
          value={petPrice}
          onChange={(e) => setPetPrice(e.target.value)}
        />
      </TextField.Root>
      <TextArea
          value={petDesc}
          onChange={(e) => setPetDesc(e.target.value)}
        />

      <Button
        onClick={handleSubmit}
      >
        Add Pet
      </Button>
    </Flex>
  );
};

export default EditPet;
