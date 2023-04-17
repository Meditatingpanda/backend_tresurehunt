import { Schema, model } from "mongoose";

const userSchema = new Schema({
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    questionsStats:{
        type: Array,
        default: []
    }

}, {
    timestamps: true,
})

export default model("User", userSchema)