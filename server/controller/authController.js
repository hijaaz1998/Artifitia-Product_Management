const User = require('../model/userModel');
const passwordHasher = require('../helpers/passwordHash');
const bcrypt = require('bcrypt')
const {verifyLogin} = require('../helpers/verifyLogin')

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

        if (loginResult.status === 200) {
            res.status(200).json({ message: "Login successful", token: loginResult.token, userId: loginResult.userId });
        } else if (loginResult.status === 401) {
            res.status(401).json({ error: loginResult.error });
        } else {
            res.status(500).json({ message: 'Error logging in user', error: loginResult.error });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};




module.exports = {
    registerUser,
    loginUser
};
