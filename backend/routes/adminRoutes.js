const express = require('express')
const multer = require("multer")
const router = express.Router()
const petModel = require('../models/petModel')
const comment = require('../models/commentModel')
const order = require("../models/ordersModel")
const ordersModel = require('../models/ordersModel')

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


router.post('/addpet', upload.any(), async (req, res) => {

  const image = req.files[0];

  if (!image) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const pet = await petModel.create({
    petName: req.body.petName,
    petType: req.body.petType,
    petAge: req.body.petAge,
    petBreed: req.body.petBreed,
    petDesc: req.body.petDesc,
    petPrice: req.body.petPrice,
    petImages: [image.filename]
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
    existingPet.petPrice = req.body.petPrice || existingPet.petPrice;

    // Update pet photo if a new one is provided
    if (newImage) {
      existingPet.petImages = [newImage.filename];
    }

    // Save the updated pet
    const updatedPet = await existingPet.save();

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error, msg: 'Internal Server Error' });
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

// Endpoint to delete a pet by ID along with its comments
router.delete('/deletepet/:petId', async (req, res) => {
  try {
    const { petId } = req.params;

    // Check if the pet exists
    const pet = await petModel.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }

    // Delete comments associated with the pet
    await comment.deleteMany({ pet: petId });

    // Delete the pet
    await petModel.findByIdAndDelete(petId);

    res.json({ success: true, message: 'Pet and associated comments deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint to get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await order.find().populate('user', '-password').populate("address");

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint to get all orders
router.get('/saleslastweek', async (req, res) => {
  try {
    // Calculate the date seven days ago from the current date
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const ordersDelivered = await order.find({ updatedAt: { $gte: sevenDaysAgo }, orderStatus: "Delivered" });
    const ordersCancelled = await order.find({ updatedAt: { $gte: sevenDaysAgo }, orderStatus: "Cancelled" });
    const ordersPending = await order.find({ updatedAt: { $gte: sevenDaysAgo }, orderStatus: "Pending" });

    res.json({ ordersPending: ordersPending.length, ordersCancelled: ordersCancelled.length, ordersDelivered: ordersDelivered.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint to update all orders
router.post('/updateorderstatus', async (req, res) => {
  try {
    const updatedOrder = await order.findByIdAndUpdate(
      req.body.orderid,
      { orderStatus: req.body.status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json({ success: true, updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Endpoint to get all orders
router.get('/sales', async (req, res) => {
  try {
    // Calculate the date seven days ago from the current date
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesData = await order.find({ updatedAt: { $gte: sevenDaysAgo } });

    const data = [];

    function addLastSevenDaysSales() {
      const dailyData = {};

      salesData.forEach(sale => {
        const saleDate = new Date(sale.createdAt).toISOString().split('T')[0];
        dailyData[saleDate] = (dailyData[saleDate] || 0) + sale.total;
      });

      for (let i = 6; i >= 0; i--) {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        const currentDateISO = currentDate.toISOString().split('T')[0];
        data.push({
          date: currentDateISO,
          TotalSales: dailyData[currentDateISO] || 0,
        });
      }
    }

    addLastSevenDaysSales();

    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



// Endpoint to get all orders
router.get('/breedsales', async (req, res) => {
  try {

    const salesData = await order.find();
    const breedSales = [];
    function trackBreedSales() {
      salesData.forEach(sale => {
        sale.items.forEach(item => {
          const petBreed = item.pet.petBreed;
          const breedIndex = breedSales.findIndex(breed => breed.petBreed === petBreed);
          if (breedIndex !== -1) {
            breedSales[breedIndex].quantity += item.quantity;
          } else {
            breedSales.push({
              petBreed: petBreed,
              quantity: item.quantity
            });
          }
        });
      });
    }
    trackBreedSales();
    res.json({ breedSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


module.exports = router