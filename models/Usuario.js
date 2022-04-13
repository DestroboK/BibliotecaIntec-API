const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth_date: {
        type: Date,
        default: Date.now
    },
    cedula:{
        type: String
    },
    passport: {
        type: String
    },
    phone_number: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    postal_code: {
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true        
    },
    sanctioned: {
        type: Boolean,
        default: false,
        required: true
    },
    role: {
        type: String,
        default: 'Normal'
    }
})


module.exports = model('Usuarios', UsuarioSchema);