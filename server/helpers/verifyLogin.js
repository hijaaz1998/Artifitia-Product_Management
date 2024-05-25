const User = require('../model/userModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const verifyLogin = async (data) => {
    try {
        const userData = await User.findOne({ email: data.email });

        if (!userData) {
            return { status: 404, error: "Invalid Email Or Password" };
        }

        const passwordMatch = await bcrypt.compare(data.password, userData.password);

        if (!passwordMatch) {
            return { status: 401, error: "Invalid Email Or Password" };
        }
        const userId = userData._id

        const token = createToken(userData._id);
        return { status: 200, token, userId };
    } catch (error) {
        console.error("Error occurred during login verification:", error);
        throw { status: 500, error: "Internal Server Error" };
    }
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
};

module.exports = {
    verifyLogin
};
