const {jwtDecode} = require('jwt-decode'); // Ensure this is correctly imported
const User = require('../model/userModel'); // Adjust the path to your User model accordingly
const passwordHasher = require('../helpers/passwordHash');
const { verifyLogin, createToken, maxAge } = require('../helpers/verifyLogin');
const Cart = require('../model/cartMode');
const Wishlist = require('../model/wishListModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User Already Registered', success: false });
        }

        const hashedPassword = await passwordHasher(password);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: 'Registration Successful', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const loginResult = await verifyLogin(req.body);

        const cartItems = await Cart.find({ user: loginResult.userId }).populate('items.product');
        const wishlistItems = await Wishlist.find({ user: loginResult.userId }).populate('items.product');

        const flattenedCartItems = cartItems.flatMap(cart => cart.items);
        const flattenedWishlistItems = wishlistItems.flatMap(wishlist => wishlist.items);

        if (loginResult.status === 200) {
            res.status(200).json({ 
                message: "Login successful", 
                token: loginResult.token, 
                userId: loginResult.userId, 
                cartItems: flattenedCartItems,
                wishlistItems: flattenedWishlistItems 
            });
        } else if (loginResult.status === 401) {
            res.status(401).json({ error: loginResult.error });
        } else {
            res.status(500).json({ message: 'Error logging in user', error: loginResult.error });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;

        const decoded = jwtDecode(token);

        const email = decoded.email;
        const name = decoded.name;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const newUser = new User({
                name,
                email
            });

            await newUser.save();

            const cartItems = await Cart.find({ user: newUser._id }).populate('items.product');
            const wishlistItems = await Wishlist.find({ user: newUser._id }).populate('items.product');

            const flattenedCartItems = cartItems.flatMap(cart => cart.items);
            const flattenedWishlistItems = wishlistItems.flatMap(wishlist => wishlist.items);

            const jwtToken = createToken(newUser._id);

            res.status(201).json({
                message: 'Login successful',
                token: jwtToken,
                userId: newUser._id,
                cartItems: flattenedCartItems,
                wishlistItems: flattenedWishlistItems,
                success: true
            });
        } else {
            const cartItems = await Cart.find({ user: existingUser._id }).populate('items.product');
            const wishlistItems = await Wishlist.find({ user: existingUser._id }).populate('items.product');

            const flattenedCartItems = cartItems.flatMap(cart => cart.items);
            const flattenedWishlistItems = wishlistItems.flatMap(wishlist => wishlist.items);

            const jwtToken = createToken(existingUser._id);

            res.status(200).json({
                message: 'Login successful',
                token: jwtToken,
                userId: existingUser._id,
                cartItems: flattenedCartItems,
                wishlistItems: flattenedWishlistItems,
                success: true
            });
        }
    } catch (error) {
        console.error('Error in googleAuth:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleAuth
};
