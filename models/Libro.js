const { Schema, model } = require("mongoose");


const LibroSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    img_url: {
        type: String,
        default: 'https://g.christianbook.com/g/slideshow/8/8768903/main/8768903_1_ftc.jpg'
    },
    author: {
        type: String,
        required: true
    },
    editorial: {
        type: String
    },
    edition: {
        type: String,
        default: "1ra"
    },
    page_nums: {
        type: Number,
        required: true
    },
    book_quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: 'Libro nuevo'
    },
    categories:{
        type: [String],
        required: true
    },
    publish_date:{
        type: String,
        default: "1919",
        required: true
    }
})


module.exports = model('Libros', LibroSchema);