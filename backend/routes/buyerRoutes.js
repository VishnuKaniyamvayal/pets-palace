const express = require('express');
const order = require('../models/ordersModel');
const router = express.Router()
const petModel = require('../models/petModel')
const comment = require('../models/commentModel')
const Cart = require('../models/cartModel');
const addressModel = require('../models/addressModel');

router.get('/rawsearch/:searchkeyword', async (req, res) => {
    try {
      const searchKeyword = req.params.searchkeyword;
  
      // Use Mongoose to find pets that match the keyword in any of the fields
      const matchingPets = await petModel.find({
        $or: [
          { petName: { $regex: searchKeyword, $options: 'i' } }, 
          { petType: { $regex: searchKeyword, $options: 'i' } }, 
          { petBreed: { $regex: searchKeyword, $options: 'i' } }, 
          { petPrice: { $regex: searchKeyword, $options: 'i' } }, 
        ],
      });
  
      res.json( matchingPets );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/featuredCategories', async (req, res) => {
    try {
      // Use Mongoose distinct to get unique values for the petBreed field
      const featuredCategories = await petModel.distinct('petBreed');
  
      // Choose any image from the petImages field of the first document in each category
      const categoryImages = await Promise.all(
        featuredCategories.map(async (category) => {
          const petInCategory = await petModel.findOne({ petBreed: category });
          return petInCategory ? petInCategory.petImages[0] : null;
        })
      );
  
      // Combine the category names and images into an array of objects
      const result = featuredCategories.map((category, index) => ({
        category,
        image: categoryImages[index],
      }));
  
      res.json({ featuredCategories: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/newcomers', async (req, res) => {
    try {
      // Use Mongoose to find the last 5 added pets, sorted by creation timestamp in descending order
      const newcomers = await petModel.find().sort({ createdAt: -1 }).limit(5);
  
      res.json({ newcomers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/bestSellers', async (req, res) => {
    try {
      // Aggregate orders to find the best-selling pets
      const bestSellers = await order.aggregate([
        {
          $group: {
            _id: '$pet',
            totalOrders: { $sum: '$quantity' },
          },
        },
        {
          $lookup: {
            from: 'pets', // Assuming your Pets model is named 'Pets'
            localField: '_id',
            foreignField: '_id',
            as: 'petDetails',
          },
        },
        {
          $match: {
            'petDetails': { $exists: true, $ne: [] }, // Exclude pets without orders
          },
        },
        {
          $sort: { totalOrders: -1 },
        },
        {
          $limit: 5, // Retrieve the top 5 best-selling pets
        },
      ]);
  
      res.json({ bestSellers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/testmonials', async (req, res) => {
    try {
      // Aggregate comments to find the best latest comment for each pet
      const bestLatestComment = await comment.aggregate([
        {
          $sort: { rating: -1, createdAt: -1 }, // Sort comments by rating in descending order and createdAt in descending order
        },
        {
          $group: {
            _id: '$pet',
            latestComment: { $first: '$$ROOT' }, // Get the latest comment for each pet
          },
        },
        {
          $lookup: {
            from: 'pets', // Assuming your Pets model is named 'Pets'
            localField: '_id',
            foreignField: '_id',
            as: 'petDetails',
          },
        },
        {
          $match: {
            'petDetails': { $exists: true, $ne: [] }, // Exclude pets without comments
          },
        },
        {
          $limit: 5, // Retrieve the top 5 best latest comments
        },
      ]);
  
      if (bestLatestComment.length === 0) {
        return res.json({ message: 'No comments available.' });
      }
  
      res.json({ bestLatestComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/getcartdata' , async (req, res) => {
    try {
      // Get the user ID from the authenticated user
      const userId = req.body.userid;
  
      // Find the cart associated with the user
      const userCart = await Cart.findOne({ user: userId })
        .populate({
          path: 'user',
          select: '-password', // Exclude any confidential fields from the user data
        })
        .populate('items.pet');
  
      if (!userCart) {
        return res.status(404).json({ message: 'Cart art Empty' });
      }
  
      if (userCart.items.length === 0) {
        return res.json({ message: 'Cart is empty.' });
      }
  
      res.json({ userCart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to add a pet to the user's cart
router.post('/addtocart', async (req, res) => {
  try {
    const { userid , petid } = req.body;
    const quantity = req.body.quantity ? req.body.quantity : 1;
    // Check if the pet exists
    const pet = await petModel.findById(petid);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }

    // Check if the user has an active cart
    let userCart = await Cart.findOne({ user: userid });

    // If the user doesn't have a cart, create a new one
    if (!userCart) {
      userCart = new Cart({
        user: userid,
        items: [{ pet: petid, quantity }],
      });
    } else {
      // If the user has a cart, check if the pet is already in the cartS
      const existingItemIndex = userCart.items.findIndex(item => item.pet.equals(petid));

      if (existingItemIndex !== -1) {
        // If the pet is already in the cart, update the quantity
        userCart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the pet is not in the cart, add it as a new item
        userCart.items.push({ pet: petid, quantity });
      }
    }

    await userCart.save();

    res.json({ message: 'Pet added to the cart successfully', userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/deletecart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedCart = await Cart.deleteMany({ user: userId });

    if (deletedCart.deletedCount === 0) {
      return res.status(404).json({ message: 'No cartitems found for the specified user.' });
    }

    res.status(200).json({ message: 'items in cart deleted successfully', deletedCount: deletedCart.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to add a new address for the authenticated user
router.post('/addaddress', async (req, res) => {
    try {
      const userId = req.body.userid;
  
      const { address } = req.body;
  
      const newAddress = new addressModel({
        user: userId,
        address,
      });
  
      await newAddress.save();
  
      res.status(200).json({ message: 'Address added successfully', address: newAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Route to get pet data by pet ID
router.get('/pets/:petId', async (req, res) => {
  try {
    const { petId } = req.params;

    // Find the pet by ID
    const pet = await petModel.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found.' });
    }

    res.json({ pet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getaddress/:userid', async (req, res) => {
    try {
      const userId = req.params.userid;

      const userAddress = await addressModel.findOne({ user: userId }).limit(1);
  
      if (!userAddress) {
        return res.json({ address: "" });
      }
  
      res.json({ address: userAddress });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteaddress/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedAddresses = await addressModel.deleteMany({ user: userId });

    if (deletedAddresses.deletedCount === 0) {
      return res.status(404).json({ message: 'No addresses found for the specified user.' });
    }

    res.json({ message: 'Addresses deleted successfully', deletedCount: deletedAddresses.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to add an order
router.post('/addorder', async (req, res) => {
  try {
    // Extract order details from the request body
    const { userid , items , address , paymentType  } = req.body;

      let subTotal = 0;
      for(let i = 0 ; i < items.length ; i++)
      {
        subTotal += Number(items[i].pet.petPrice) * Number(items[i].quantity);
      }
      let Tax = subTotal*0.18;
      let tax = Tax;
      subTotal = subTotal;
      let total = tax + subTotal;

    // Create a new order
    const newOrder = new order({
      user:userid,
      items,
      tax,
      address,
      subTotal,
      total,
      paymentType
    });

    // Save the order to the database
    await newOrder.save();

    res.status(200).json({ message: 'Order added successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to get all orders by userid
router.get('/getallorder/:id', async (req, res) => {
  try {
    const userid = req.params.id;
    // Fetch all orders from the database
    const allOrders = await order.find({
      user:userid,
    });

    res.json({ allOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to cancel an order by ID
router.put('/cancelorder/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    // Update the order status to 'Cancelled'
    const cancelledOrder = await order.findByIdAndUpdate(
      orderId,
      { orderStatus: 'Cancelled' },
      { new: true }
    );

    if (!cancelledOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json({ message: 'Order cancelled successfully', order: cancelledOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to add a comment for a specific pet and user
router.post('/addcommentpet', async (req, res) => {
  try {
    const {  rating , userid , petid } = req.body;

    const commenttext = req.body.comment

    const newComment = new comment({
      user: userid,
      pet: petid,
      comment:commenttext,
      rating:rating,
    });

    await newComment.save();

    res.json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all comments for a specific pet
router.get('/getcomment/:petid', async (req, res) => {
  try {
    const petId = req.params.petid;

    const commentsForPet = await comment.find({ pet: petId }).populate({
      path: 'user',
      select: 'name', // Exclude any confidential fields from the user data
    });

    res.json({ commentsForPet });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a comment by ID
router.delete('/deletecomment/:id', async (req, res) => {
  try {
    const commentId = req.params.id;

    const deletedComment = await comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }

    res.json({ message: 'Comment deleted successfully', comment: deletedComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router