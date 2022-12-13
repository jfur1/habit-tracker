import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
    const userExists = await connectionPool.query(`
    SELECT * 
    FROM users
    WHERE email = ?
    `, [email]);

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
    const user = await connectionPool.query(`
    INSERT INTO
    users (email, password)
    VALUES (?, ?)
    `, [email, hashedPassword]);

    if (user) {
        res.status(201).json({
          user_id: user.user_id,
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
    var [user] = await connectionPool.query(`
    SELECT * 
    FROM users
    WHERE email = ?
    `, [email]);

    user = user[0]
    console.log(user)

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        user_id: user.user_id,
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