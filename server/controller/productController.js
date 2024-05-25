const Category = require('../model/categoryModel');
const SubCategoryModel = require('../model/SubCategoryModel');
const SubCategory = require('../model/SubCategoryModel')
const Product = require('../model/productModel')

const addCategory = async (req, res) => {
    try {
        const {category, userId} = req.body;

        const existingCategory = await Category.findOne({categoryName: category})
        if(existingCategory){
            return res.status(400).json({message: 'Category Already Exists', success: false})
        }

        const newCategory = await new Category({
            categoryName: category,
            author: userId
        })

        await newCategory.save()

        res.status(200).json({message: 'Category Added Successfully', success:true})

    } catch (error) {
        console.log(error)
    }
}

const getCategories = async (req, res) => {
    try {
        const userId = req.params.userId
        const categories = await Category.find({author: userId}).select('categoryName _id')
        res.status(200).json({ success: true, categories });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const addSubCategory = async (req, res) => {
    try {
        const {userId, category, subCategoryName} = req.body

        const existingSubCategory = await SubCategory.findOne({subCategoryName, categoryId: category})
        if(existingSubCategory){
            return res.status(400).json({message: 'Sub Category Already Exists', success: false})
        }
        const newSubCategory = await new SubCategory({
            subCategoryName,
            categoryId: category,
            author: userId
        })

        await newSubCategory.save()

        res.status(200).json({message: 'Subcategory added successfully',success: true})
    } catch (error) {
        
    }

}

const fetchSubCategories = async (req, res) => {
    try {
        const {userId} = req.params
        const subCategories = await SubCategoryModel.find({author: userId})
        .populate('categoryId', 'categoryName')
        .select('subCategoryName _id')
        console.log(subCategories)
        res.status(200).json({ success: true, subCategories });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const addProduct = async (req, res) => {
    try {
        const { userId, productName, brand, productCode, selectedSubCategory, description } = req.body;
        const variants = JSON.parse(req.body.variants);
        const imageUrls = JSON.parse(req.body.imageUrls)

        console.log(imageUrls)
        console.log(typeof imageUrls)

        const product = new Product({
            productName,
            brand,
            productCode,
            variants,
            subCategory: selectedSubCategory,
            description,
            images: imageUrls, // Assign imageUrls directly to the images field
            author: userId
        });

        await product.save();

        const aded = await Product.find();
        console.log(aded)

        res.status(200).json({ message: 'Product added successfully', success: true });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Failed to add product', success: false });
    }
}



const getCategoriesWithSubCategories = async (req, res) => {
    try {
        const {userId} = req.params;
        const categories = await Category.find({author: userId})

        const categoriesWithSub = await Promise.all(
            categories.map( async (category) => {
                const subCategories = await SubCategory.find({categoryId: category._id})
                return {...category, subCategories}
            })
        )

        res.json({categoriesWithSub})
        
    } catch (error) {
        
    }
}

const getAllProducts = async (req, res) => {
    try {
        const {userId} = req.params;

        const products = await Product.find({author: userId})

        res.json({products})
    } catch (error) {
        
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log(productId)
        const product = await Product.findOne({_id: productId});
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log(product)
        // If product is found, send it in the response
        res.status(200).json({ product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { productName, brand, productCode, description, variants } = req.body;
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                productName,
                brand,
                productCode,
                variants,
                description
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully', success: true, data: updatedProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Failed to update product', success: false });
    }
};


module.exports = {
    addCategory,
    getCategories,
    addSubCategory,
    fetchSubCategories,
    addProduct,
    getCategoriesWithSubCategories,
    getAllProducts,
    getSingleProduct,
    updateProduct
}