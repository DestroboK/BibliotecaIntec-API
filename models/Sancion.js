const { Schema, model } = require("mongoose");


const SancionSchema = Schema({
    user_id: {
        type: String,
        required: true
    },
    sanction_description: {
        type: String,
        required: true
    },
    emission_date: {
        type: Date,
        default: Date.now
    },
    sanction_time_days: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 1
    }
})


module.exports = model('Sanciones', SancionSchema);