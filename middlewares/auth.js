import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies['gossip-token']
    if (!token) {
        res.status(400)
        throw new Error('Please login to access this resource!')
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id

    next()
})