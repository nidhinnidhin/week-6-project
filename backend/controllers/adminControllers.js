const asyncHandler = require('express-async-handler');
const Jwt = require("jsonwebtoken");
const User = require('../model/userModel')


// Admin login
const adminLogin = asyncHandler(async(req, res) => {
    let EMAIL = "admin@gmail.com";
    let PASSWORD = "12345";
    const JWT_SECRET = process.env.JWT_SECRET || "1921u0030";

    try {
        const { email, password } = req.body;
        if (email !== EMAIL || password !== PASSWORD) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        const token = Jwt.sign({ email, password }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token });
      } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Something went wrong..");
      }
});

// Delete user
const userDelete = asyncHandler(async (req, res) => {
    try{
        const id = req.params.id;
        const deletedUser = await User.findByIdAndDelete(id);
    
        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "User deleted successfully"})
    }
    catch(err){
        res.status(400).json({message: "Something went wrong."})
    }
})

// Get user detail

const getUserDetail = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const findUser = await User.findOne({ _id: id });
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(findUser);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
});

// Update user detail
const updateUserDetail = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
});


module.exports = {adminLogin, userDelete, updateUserDetail, getUserDetail}