const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: 'Bike',
    },
    startDate:{
        type: Schema.Types.Date,
        required: true
    },
    endDate:{
        type: Schema.Types.Date,
        required: true
    },
})

module.exports = mongoose.model('Reservation', reservationSchema);