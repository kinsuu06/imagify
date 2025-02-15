import express from 'express'
import {registerUser,loginUser} from '../controllers/user.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);


export default userRouter;



//https://localhost:4000/user/register
//https://localhost:4000/user/login