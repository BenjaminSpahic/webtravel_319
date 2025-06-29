// models/bookingModel.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    travelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dateStart: {
        type: Date,
        required: true
    },
    dateEnd: {
        type: Date,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'active', // Može biti 'active', 'cancelled', itd.
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
