const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: Date
    },
    role: {
        type: String,
        default: "User"
    },
    profilePic: {
        type: String
    }
})

const users = mongoose.model("users", userSchema)

module.exports = users