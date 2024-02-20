const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pets',
    },
    comment: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    rating: {
      type: Number,
      required: true
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('comment', commentSchema)