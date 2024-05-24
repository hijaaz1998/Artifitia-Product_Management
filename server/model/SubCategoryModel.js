const mongoose = require('mongoose')

const subCategoryModel = new mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('SubCategory', subCategoryModel)