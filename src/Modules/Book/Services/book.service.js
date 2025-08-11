import bcrypt from "bcrypt";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';
import Book from '../../../DB/Models/book.model.js'
import dotenv from 'dotenv';
dotenv.config();



export const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    author: Joi.string().min(2).max(100).required(),
    publishedYear: Joi.number().integer().min(0).required(),
    availableCopies: Joi.number().integer().min(0).required()
});


export const addBook = async (req, res) => {
    try {
    
        const { error } = bookSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

      
        const newBook = new Book({
            ...req.body,
            createdBy: req.user._id 
        });

        await newBook.save();

        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};