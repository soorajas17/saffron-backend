const users = require("../model/userModel")

exports.getProfileController = async (req, res) => {

    const userId = req.userId

    try {
        const existingUser = await users.findById(userId).select("-password")

        if (!existingUser) {
            return res.status(404).json("User not found")
        }

        res.status(200).json(existingUser)

    } catch (err) {
        res.status(500).json(err)
    }

}