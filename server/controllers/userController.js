const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');

const registerController = async (req, res) => {
    try {
        const { phoneNumber, role } = req.body;

        // Validation
        if (!phoneNumber) {
            return res.status(400).send({
                success: false,
                message: 'Phone Number is required'
            });
        }

        if (!role) {
            return res.status(400).send({
                success: false,
                message: 'Role is required'
            });
        }

        // Existing User
        const existingUser = await userModel.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: 'User Already Registered with this Phone Number'
            });
        }

        // Save User
        const user = new userModel({ phoneNumber, role });
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'Registration Successful'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error,
        });
    }
};


const passwordController = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Validation
        if (!phoneNumber || !password) {
            return res.status(400).send({
                success: false,
                message: 'Phone Number and Password are required'
            });
        }

        // Find User
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Set Password
        user.password = hashedPassword;

        // Save User
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'Password Saved'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Password API',
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Validation
        if (!phoneNumber || !password) {
            return res.status(400).send({
                success: false,
                message: 'Phone Number and Password are required'
            });
        }

        // Find User
        const user = await userModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Match password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid Phone Number or Password'
            });
        }
        // Token JWT
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        // Successful login
        res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error,
        });
    }
};

module.exports = { registerController, passwordController, loginController };
