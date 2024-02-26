const mongoose = require('mongoose')

const OrdersSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    items:{
      type: Array,
      required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending',
    },
    paymentType: {
        type: String,
        default: 'Pending',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"address"
      },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Order', OrdersSchema)