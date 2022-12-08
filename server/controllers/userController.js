import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

// @Route:  /register
// @Desc:   Register a new user
// @Access: Public
export const registerUser = async(req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error('Please add required fields.')
    }

    // Check if user exists
    const userExists = await User.findOne({ 
        where: {
            email: email
        }
     })

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log("Unencrypted pwd: ", password);
    console.log('Hashed pwd:', hashedPassword)

    // Create user
    const user = await User.create({
        email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
          email: user.email,
          token: generateToken(user.user_id),
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    // Check for user email
    const user = await User.findOne({ 
        where: {
            email: email
        }
     })
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        email: user.email,
        token: generateToken(user.user_id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
}