import express from "express"
import { loginUser, myProfile, registerUser } from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js"
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

// for authenticated routes
router.route('/me').get(isAuthenticated, myProfile)

export default router