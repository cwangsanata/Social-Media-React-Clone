import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER USER FUNCTION*/
export const register = async (req, res) => {
    // Create new user
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), // NOTE: Dummy data TODO: Change
            impressions: Math.floor(Math.random() * 10000), // NOTE: Dummy data TODO: Change
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // User has been created with status 201
    }

    catch (error) {
        res.status(500).json({error: err.message});
    }
};

/* LOGIN USER AUTH */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user)
            return res.status(400).json({msg: "User not found"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({msg: "Incorrect credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    }
    catch {
        res.status(500).json({error: err.message});
    }
}