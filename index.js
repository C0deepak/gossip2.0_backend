import express from "express";
import dotenv from 'dotenv'
import connectDb from "./utils/database.js";
import userRoutes from './routes/user.js'
import { singleAvatar } from "./middlewares/multer.js";
import { errorHandler } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()

const port = process.env.PORT

connectDb()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v2/user', singleAvatar, userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})