const express = require('express')
const multer = require('multer')
const productRouter = express();
const productController = require('../controller/productController')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

productRouter.post('/addCategory', productController.addCategory)
productRouter.get('/getCategories/:userId', productController.getCategories)
productRouter.post('/addSubCategory', productController.addSubCategory)
productRouter.get('/fetchSubCategory/:userId', productController.fetchSubCategories)
productRouter.post('/addProduct', upload.none(), productController.addProduct)
productRouter.get('/getCategoriesWithSub/:userId', productController.getCategoriesWithSubCategories)
productRouter.get('/getAllProducts/:userId', productController.getAllProducts)
productRouter.get('/getSingleProduct/:productId', productController.getSingleProduct)
productRouter.put('/updateProduct/:productId', productController.updateProduct);
productRouter.post('/addToCart', productController.addToCart)

module.exports = productRouter