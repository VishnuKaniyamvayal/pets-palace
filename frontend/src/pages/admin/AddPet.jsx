import React, { useState } from 'react';
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const AddPet = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petImage, setPetImage] = useState([]);
  const [petBreed, setPetBreed] = useState('');
  const [petDesc, setPetDesc] = useState('');

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setPetImage(imageFile);
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
      try {
        const response = await axios.post(process.env.REACT_APP_DEV_BASE_URL + 'api/admin/addpet',  formData ,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response)
        if (response.status === 200) {
          // Pet added successfully
          console.log('Pet added successfull');
        } else {
          console.error('Failed to add pet.');
        }
      } catch (error) {
        console.error('Error adding pet:', error);
      }
      setPetAge("")
      setPetBreed("")
      setPetImage("")
      setPetName("")
      setPetType("")
    }
 };

  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
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

export default AddPet;
