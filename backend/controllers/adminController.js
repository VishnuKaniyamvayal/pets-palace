const asyncHandler = require('express-async-handler')
const multer = require('multer');
const Pet = require('../models/petModel')


const Addpet = asyncHandler(async (req, res) => {
  // if (!req.body) {
  //   res.status(400)
  //   throw new Error('DATA MISSING')
  // }
  // console.log(req.files)

  // if (!image) {
  //   return res.status(400).json({ error: 'No image uploaded' });
  // }

  const pet = await Pet.create({
    petName:req.body.petName,
    petType:req.body.petType,
    petAge:req.body.petAge,
    petBreed:req.body.petBreed,
    petImages:{
      ImageUrl: image.path,
      ImageName: image.originalname
    }
  })

  res.status(200).json(pet)
})


const Removepet = asyncHandler(async (req,res)=>{})
const Updatepet = asyncHandler(async (req,res)=>{})
const Getallpet = asyncHandler(async (req,res)=>{})
const GetpetByid = asyncHandler(async (req,res)=>{})

module.exports = {
  Addpet
}
