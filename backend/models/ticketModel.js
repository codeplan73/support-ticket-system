const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iphone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description' ]
    },
    status: {
        type: String,
        required: [true, 'Please add a password'],
        enum: ['new', 'open', 'closed'],
        default: 'new'
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)