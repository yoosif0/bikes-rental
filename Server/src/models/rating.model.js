const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ratingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
    },
    rate: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Rating', ratingSchema);