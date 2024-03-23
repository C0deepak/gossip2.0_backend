import User from '../models/user.js'
import { sendToken } from '../utils/sendToken.js'
import bcrypt from 'bcrypt'
import expressAsyncHandler from 'express-async-handler'

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, username, password } = req.body

    // Just for backend only once connected to frontend then will be fetched from frontend and cloudinary only
    const avatar = {
        public_id: 'Temp Public ID',
        url: 'Temp URL'
    }

    if (!name || !username || !password) {
        res.status(400)
        throw new Error('Please Enter all the fields!')
    }

    const userExist = await User.findOne({ username })
    if (userExist) {
        res.status(400)
        throw new Error('User Already Exists!')
    }

    const user = await User.create({ name, username, password, avatar })
    if (user) {
        sendToken(res, user, 201, 'User Registered Successfully!')
    } else {
        res.status(400)
        throw new Error('Failed to create User!')
    }
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400)
        throw new Error('Please Enter all the fields!')
    }

    const user = await User.findOne({ username }).select('+password')
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400)
            throw new Error('Invalid Email or Password!')
        }
        sendToken(res, user, 201, 'User Loggedin Successfully!')
    } else {
        res.status(400)
        throw new Error('Invalid Email or Password!')
    }
})

export const myProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user)
    res.status(200).json({
        success: true,
        data: user
    })
})
