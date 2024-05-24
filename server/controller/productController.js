const Category = require('../model/categoryModel');
const SubCategory = require('../model/SubCategoryModel')

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


module.exports = {
    addCategory,
    getCategories,
    addSubCategory
}