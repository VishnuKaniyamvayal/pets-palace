const mongoose = require('mongoose')

const petSchema = mongoose.Schema(
  {
    petName: { 
      type: String,
      required: true,
    },
    petType: {
      type: String,
      required: true,
    },
    petAge: {
      type: String,
      required: true,
    },
    petImages: {
      type: Array,
      required: true,
    },
    petBreed: {
      type: String,
      required: true,
    },
    petDesc: {
      type: String,
      required: true,
    },
    petPrice: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Pets', petSchema)