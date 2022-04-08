const asyncHandler = require('express-async-handler')
// @desc    register a new user
//@route    /api/user
//@access   public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    res.send('Register user')
})

// @desc    login a user
//@route    /api/user/login
//@access   public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login user')
})

module.exports = {
    registerUser,
    loginUser,
}
