import connectionPool from '../config/conn.js'
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

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
          first_name: user.first_name,
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
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: generateToken(user.user_id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
})

// @desc    Update a user
// @route   POST /api/users/update
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const { user_id, email, first_name, last_name, token } = req.body

  // Update
  var user = await connectionPool.query(`
  UPDATE users
  SET first_name=?, last_name=?, email=?
  WHERE user_id = ?
  `, [first_name, last_name, email, user_id]);

  var [user] = await connectionPool.query(`
  SELECT * 
  FROM users
  WHERE email = ?
  `, [email]);
  user = user[0]
  console.log("api response:", user)

  if (user) {
    res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user.user_id,
      email: user.email,
      token: token 
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Update user's password
// @route   POST /api/users/password
// @access  Private
export const updatePassword = asyncHandler(async (req, res) => {
  const { user_id, token, password } = req.body

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  console.log("Unencrypted pwd: ", password);
  console.log('Hashed pwd:', hashedPassword);

  // Update user pwd
  const updated = await connectionPool.query(`
  UPDATE users
  SET password=?
  WHERE user_id = ?
  `, [hashedPassword, user_id]);

  var [user] = await connectionPool.query(`
  SELECT * 
  FROM users
  WHERE user_id = ?
  `, [user_id]);
  user = user[0]

  console.log("updatePWD res: ", user)

  if (user) {
    res.status(201).json({
      first_name: user.first_name,
      last_name: user.last_name,
      user_id: user.user_id,
      email: user.email,
      token: generateToken(user.user_id),
    })
  } else {
    res.status(400)
    throw new Error('Server error while updating password.')
  }
})


const CONTACT_MESSAGE_FIELDS = {
  name: "Hello,",
  email: "Email",
  subject: "Subject",
  message: " ",
  submessage: " ",
  link: " ",
  thanks: " ",
  team: " "
};

const generateEmailContent = (data) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    if(key === 'link'){
      return (str += `<span class="center"><button class="resetBtn"><a href="${val}">Reset Password</a></button></span>`);
    } else {
      return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
    }
  }, "");

  return {
    text: stringData,
    html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}.resetBtn{background-color: rgb(50, 141, 215); color:#fefefe; padding: 10px; border-radius: 6px;}a{text-decoration: none;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.center{display: flex; align-items: center; justify-content: center;}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 350; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table cellpadding="0" cellspacing="0" width="100%"> <tr> <td style="padding: 10px 15px 30px 15px" class="section-padding" > <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`
  }
}

// @desc    Forgot Password
//            - Send email containing link via nodemailer
//            - URL tokenized via jwt
// @route   POST /api/users/forgot
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try{
    // Check if user exists
    var [userExists] = await connectionPool.query(`
    SELECT * 
    FROM users
    WHERE email = ?
    `, [email]);

    userExists = userExists[0]

    if (!userExists) {
      res.status(400);
      throw new Error('No account found associated to this email address!')
    }

    const token = jwt.sign({ id: userExists.user_id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    const resetLink =  `${process.env.CLIENT_URL}reset/${userExists.user_id}/${token}`;

    console.log('Reset pwd link: ', resetLink);
    // Begin email
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
      }
    });

    var data = {
      name: userExists.first_name,
      message: `<b>A request has been received to change the password for your Habit Tracker account.</b> This token will expire in 15 minutes.`,
      link: resetLink,
      submessage: `If you did not initate this request, please contact us immediately at habittrackerteam@gmail.com.`,
      thanks: "Thank you," ,
      team: "The HabitTracker Team"
    }
    
    var mailOptions = {
      subject: "Password Reset",
      from: process.env.NODEMAILER_EMAIL,
      // to: email,
      to: 'johnfurlong24@gmail.com',
      ...generateEmailContent(data)
      
    };
    
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ msg: "email sent successfully!"});
      }
    });

  } catch(error){
    res.status(400);
    throw new Error('Server error while resetting password.')
  }
})

// @desc    Forgot Password
//            - Verify Token
// @route   GET /api/:id/:token
// @access  Public
export const validateResetToken = asyncHandler(async (req, res) => {
  const { id, token } = req.params;

  console.log(req.params);

  var [userExists] = await connectionPool.query(`
  SELECT * 
  FROM users
  WHERE user_id = ?
  `, [id]);

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  try{
    if(decoded){
      res.status(200).json({ msg: "Done"});
      // res.send('Done')
    }
  } catch(error){
    res.status(400);
    throw new Error('Server error while getting reset password.')
  }
})

// @desc    Forgot Password
// @route   POST /api/:id/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  console.log(req.params);

  var [userExists] = await connectionPool.query(`
  SELECT * 
  FROM users
  WHERE user_id = ?
  `, [id]);

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  try{
    if(decoded){
      // Once token verified, reset pwd
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log('Restting Password....')
        console.log("Unencrypted pwd: ", password);
        console.log('Hashed pwd:', hashedPassword);
         // Update user pwd
        const [updated] = await connectionPool.query(`
        UPDATE users
        SET password=?
        WHERE user_id = ?
        `, [hashedPassword, id]);

        console.log(updated.affectedRows)
        if(updated.affectedRows > 0)
          res.status(201).json({ msg: "password updated successfully "});
        else
          res.status(400).json({ msg: "Server error while resetting password."});
    }
  } catch(error){
    res.status(400);
    throw new Error('Server error while resetting password.')
  }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
}