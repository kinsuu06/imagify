import mongoose from "mongoose";

const transcationSchema = new mongoose.Schema({
    userId: {
        type : String,
        required: true
    },
    plan: {
        type : String,
        required: true
    },
    amount: {
        type : Number,
        required: true
    },
    credits: {
        type : Number,
        required: true
    },
    payment: {
        type : Boolean,
        default: false
    },
    Date: {
        type : Number
    }

})


const Transcation = mongoose.model.transcation ||  mongoose.model("transcation ",transcationSchema)

export default Transcation;
