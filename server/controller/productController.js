const Category = require('../model/categoryModel');
const SubCategoryModel = require('../model/SubCategoryModel');
const SubCategory = require('../model/SubCategoryModel')
const Product = require('../model/productModel')
const Cart = require('../model/cartMode')
const Wishlist = require('../model/wishListModel')

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
            images: imageUrls,
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

const addToCart = async (req, res) => {
    try {
        const { userId, productId, variant, quantity, amount, totalAmount } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        let cart = await Cart.findOne({ user: userId });

        const cartItem = {
            product: productId,
            ram: variant.ram,
            price: amount,
            qty: quantity,
            totalAmount: totalAmount
        };

        const variantIndex = product.variants.findIndex(v => v.ram === variant.ram);
        if (variantIndex === -1) {
            return res.status(404).json({ message: 'Variant not found' });
        }
        if (product.variants[variantIndex].qty < quantity) {
            return res.status(400).json({ message: 'Insufficient stock' });
        }
        product.variants[variantIndex].qty -= quantity;
        const updatedProduct = await product.save();

        if (cart) {
            const items = cart.items.findIndex(item => item.product.toString() === productId && item.ram === variant.ram);

            if (items > -1) {
                cart.items[items].qty += quantity;
                cart.items[items].totalAmount += totalAmount;
            } else {
                cart.items.push(cartItem);
            }
        } else {
            cart = new Cart({
                user: userId,
                items: [cartItem]
            });
        }

        await cart.save();
        return res.status(200).json({succcess: true, message: 'Product added to cart successfully', cart, updatedProduct });

    } catch (error) {
        console.log("Error adding product to cart:", error);
        return res.status(500).json({ message: 'Failed to add product to cart', error });
    }
};

const addToWishlist = async (req, res) => {
    try {
        const { userId, productId, ram } = req.body;
        console.log(req.body)
        
        let wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            const existingItem = wishlist.items.find(item => item.product.toString() === productId && item.ram === ram);
            
            if (existingItem) {
                return res.status(400).json({ message: 'Item already in wishlist' });
            } else {
                wishlist.items.push({ product: productId, ram });
            }
        } else {
            wishlist = new Wishlist({ user: userId, items: [{ product: productId, ram }] });
        }

        await wishlist.save();
        res.status(201).json({ message: 'Item added to wishlist', wishlist });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
    }
};

const searchItems = async(req, res) => {
    try {
        const{text, userId} = req.query;
        const regex = new RegExp(text, 'i');

        const results = await Product.find({
            $or: [
                { productName: { $regex: regex } },
                { brand: { $regex: regex } },
                { description: { $regex: regex } }
            ]
        })
        .exec();

        res.status(200).json({success: true, results})

    } catch (error) {
        console.log(error)
    }
}

const filterProducts = async (req, res) => {
    try {
        const { filter } = req.query;

        if (filter) {
            const products = await Product.find({ subCategory: { $in: filter } });
            res.status(200).json(products);
        } else {
            res.status(400).json({ message: 'Filter is required' });
        }
    } catch (error) {
        console.error('Error filtering products:', error);
        res.status(500).json({ message: 'Server error' });
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
    updateProduct,
    addToCart,
    addToWishlist,
    searchItems,
    filterProducts
}