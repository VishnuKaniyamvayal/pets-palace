const express = require('express')
const multer  = require("multer")
const router = express.Router()
const petModel = require('../models/petModel')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/'); // Specify the destination folder for uploaded images
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with current date-time
    const date = new Date().toISOString().replace(/\W/g, '_');
    const filename = `${date}.jpg`;
    cb(null, filename); // Use the original filename
  }
});

const upload = multer({ storage });


router.post('/addpet' , upload.any() , async (req, res) => {
  
  const image = req.files[0];

  if (!image) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const pet = await petModel.create({
    petName:req.body.petName,
    petType:req.body.petType,
    petAge:req.body.petAge,
    petBreed:req.body.petBreed,
    petDesc:req.body.petDesc,
    petImages:[image.filename]
  })

  res.status(200).json(pet)
})

router.delete('/removepet/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const deletedPet = await petModel.findByIdAndRemove(petId);

    if (!deletedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/updatepet/:id', upload.any(), async (req, res) => {
  try {
    const petId = req.params.id;
    
    // Check if there's a new photo
    const newImage = req.files[0];
    
    // Find the pet by ID
    const existingPet = await petModel.findById(petId);

    if (!existingPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Update pet details
    existingPet.petName = req.body.petName || existingPet.petName;
    existingPet.petType = req.body.petType || existingPet.petType;
    existingPet.petAge = req.body.petAge || existingPet.petAge;
    existingPet.petBreed = req.body.petBreed || existingPet.petBreed;
    existingPet.petDesc = req.body.petDesc || existingPet.petDesc;

    // Update pet photo if a new one is provided
    if (newImage) {
      existingPet.petImages = [newImage.filename];
    }
    console.log(newImage)

    // Save the updated pet
    const updatedPet = await existingPet.save();

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error , msg:'Internal Server Error' });
  }
});

router.get('/getallpet', async (req, res) => {
  try {
    const allPets = await petModel.find();
    res.status(200).json(allPets);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getpetbyid/:id', async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await petModel.findById(petId);

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router