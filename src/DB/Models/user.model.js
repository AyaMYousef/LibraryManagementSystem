import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "First Name must be at least 3 chars"],
        maxLength: 20,
        lowercase: true,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true,
            name: 'idx_email_unique'
        }
    },
    password: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true
    })




const User = mongoose.model("user", userSchema)

export default User