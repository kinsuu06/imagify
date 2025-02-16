import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import Transaction from "../models/Transcation.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing details' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = new User({ name, email, password: hashedPassword });
        const user = await userData.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(201).json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const userCredit = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;
        const userData = await User.findById(userId);

        if (!userData || !planId) {
            return res.status(400).json({ success: false, message: 'Missing details' });
        }

        let credits, plan, amount;

        switch (planId) {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business':
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.status(400).json({ success: false, message: 'Plan not found' });
        }

        const date = Date.now();
        const transactionData = new Transaction({ userId, plan, credits, amount, date, payment: false });
        const newTransaction = await transactionData.save();

        const options = {
            amount: amount * 100, // Convert to paise (smallest currency unit)
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
        };

        const order = await razorpayInstance.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status !== 'paid') {
            return res.status(400).json({ success: false, message: 'Payment failed' });
        }

        const transactionData = await Transaction.findById(orderInfo.receipt);
        if (!transactionData || transactionData.payment) {
            return res.status(400).json({ success: false, message: 'Transaction not found or already completed' });
        }

        const userData = await User.findById(transactionData.userId);
        if (!userData) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        const creditBalance = userData.creditBalance + transactionData.credits;
        await User.findByIdAndUpdate(userData._id, { creditBalance });
        await Transaction.findByIdAndUpdate(transactionData._id, { payment: true });

        res.json({ success: true, message: 'Credits added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, userCredit, paymentRazorpay, verifyRazorpay };
