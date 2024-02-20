const mongoose = require('mongoose')

const OrdersSchema = mongoose.Schema(
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
    rating: {
      type: Number,
      required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    totalPrice: {
        type: Number,
        required: true,
      },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending',
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', OrdersSchema)