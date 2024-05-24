const express = require('express')
const productRouter = express();
const productController = require('../controller/productController')

productRouter.post('/addCategory', productController.addCategory)
productRouter.get('/getCategories/:userId', productController.getCategories)
productRouter.post('/addSubCategory', productController.addSubCategory)

module.exports = productRouter