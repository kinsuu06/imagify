import express from 'express'
import {registerUser,loginUser, userCredit} from '../controllers/user.js'
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser);
userRouter.post('/credits',userAuth,userCredit);

export default userRouter;



//https://localhost:4000/user/register
//https://localhost:4000/user/login