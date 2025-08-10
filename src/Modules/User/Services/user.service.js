import bcrypt from "bcrypt";
import Joi from "joi";
import User from "../../../DB/Models/user.model.js";
import { generateToken } from "../../../../utils/tokens.utils.js";
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();


const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "member").default("member")
});


export const registerUserService = async (req, res) => {
    try {
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { name, email, password, role } = value;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

   
        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASHED));


        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

   
        const { password: _, ...safeUser } = newUser.toObject();

        return res.status(201).json({
            message: "User registered successfully",
            user: safeUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const SignInService = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "Sign up instead" });
        }

        const isMatch = await bcrypt.compare(String(password), user.password);
        console.log(user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //Generate token for the loggedIn User

        const accesstoken = generateToken(

            { _id: user._id, email: user.email },
            process.env.JWT_ACCESS_SECRET,
            {

                expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
                jwtid: uuidv4()
            }
        )// end of accesstoken

        const refreshtoken = generateToken(

            { _id: user._id, email: user.email },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
                jwtid: uuidv4()
            }
        )

        return res.status(200).json({ message: "User logged in successfully", accesstoken, refreshtoken });
    }
    catch (error) {
        return res.status(500).json({ message: "Error occurred", error: error.message });
    }
};

export const getUserProfileService = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile" });
  }
};