const mongoose = require('mongoose')
const Schema = mongoose.Schema


const bikeSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        enum: ['red', 'blue', 'black', 'yellow', 'green', 'white'],
        default: 'white'
    },
    weight: {
        type: Number,
        required: true
    },
    addressName: {
        type: String,
        required: true
    },
    location: new Schema({
        coordinates: { type: [Number], required: true },
        type: { type: String, required: true }
    }),
    imageName: {
        type: String,
        required: false
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },

})

module.exports = mongoose.model('Bike', bikeSchema);