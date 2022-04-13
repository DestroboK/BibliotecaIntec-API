const { Schema, model } = require("mongoose");


const PrestamoSchema = Schema({
    user_name: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    },
    emission_date: {
        type: Date,
        default: Date.now
    },
    final_date: {
        type: Date,
        default: Date.now
    },
    book_quantity: {
        type: Number,
        min: 1,
        max: 3,
        default: 1
    },
    status: {
        type: String,
        default: 'Nuevo'
    }
})


module.exports = model('Prestamos', PrestamoSchema);