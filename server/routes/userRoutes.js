import express from 'express'
import {registerUser,loginUser, userCredit, paymentRazorpay, verifyRazorpay} from '../controllers/user.js'
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredit);
userRouter.post('/pay-razor', userAuth,paymentRazorpay);
userRouter.post('/verify-razor', verifyRazorpay);

export default userRouter;



//https://localhost:4000/user/register
//https://localhost:4000/user/login