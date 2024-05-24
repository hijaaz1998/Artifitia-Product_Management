const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps:true})

module.exports = mongoose.model('Category', categoryModel)