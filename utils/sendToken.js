import jwt from "jsonwebtoken"

export const sendToken = (res, user, code, message) => {
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    
    const cookieOptions = {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        httpOnly: true,
        secure: false
    }

    return res.status(code).cookie('gossip-token', token, cookieOptions).json({
        message,
        user
    })
}