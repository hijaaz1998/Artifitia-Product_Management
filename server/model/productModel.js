const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productCode: {
        type: String,
        required: true
    },
    variants: [
        {
            ram: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }
    ],
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [String], // Define images as an array of strings
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);
