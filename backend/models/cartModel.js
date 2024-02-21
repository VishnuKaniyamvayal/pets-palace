const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items: [
      {
        pet: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Pets',
        },
        quantity: {
          type: Number,
          default: 1,
          max:4
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Cart', cartSchema)