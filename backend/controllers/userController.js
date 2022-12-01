const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const registerUser = asyncHandler(async(req, res) => {
    
    
    try {
        const {name, email, password} = req.body 
        
        if (!name || !email || !password) {
            
            res.status(400)
            throw new Error('Please Enter all fields')
        }
        const userExists = await User.findOne({email})
        if (userExists) {
            
            res.status(400)
            throw new Error('User already exists')
 
        }
        if (!(password.length >= 8)) {
            
            res.status(400)
            throw new Error('Password must be at least 8 charactor')

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
 
        
    } catch (error) {
        res.status(400).json({message: error.message})

        
    }


}) 

const loginUser =asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body
        
        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
        

        //  res.status(200).json({message : " This is the user login page"})
        
     } catch (error) {
           res.status(400).json({message : error.message})
     }
 
 
 })

const getMe = asyncHandler(async (req, res) => {
     
    try {
        const { _id, name, email} = await User.findById(req.user.id)
        
        res.status(200).json({
            id: _id,
            name,
            email
        })
        // res.status(200).json({message : " This is the user dashboard page"})
        
    } catch (error) {
        
        res.status(400).json({message : error.message})
    
    }
     
 
 
})
 
// generate JWT

const generateToken = (id) => {
    
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        
        expiresIn: '30d',

    })
}

 
module.exports = {
    
    registerUser,
    loginUser,
    getMe

}