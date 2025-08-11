import bcrypt from "bcrypt";
import Joi from "joi";
import { v4 as uuidv4 } from 'uuid';
import Book from '../../../DB/Models/book.model.js'
import dotenv from 'dotenv';
dotenv.config();



export const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
    author: Joi.string().min(2).max(100).optional(),
    publishedYear: Joi.number().integer().min(0).optional(),
    availableCopies: Joi.number().integer().min(0).optional()
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


export const listBooks = async (req, res) => {
    let books = await Book.find();
    res.status(200).json({ books })
};

export const UpdateBook = async (req, res) => {
    try {
        const { error } = bookSchema.validate(req.body);
        if (error)
            return res.status(400).json({ message: error.message });
        const { id } = req.params
        const { title, author, publishedYear, availableCopies } = req.body
        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, publishedYear, availableCopies },
            { new: true }
        )
        console.log(book);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book updated Successfully", book })

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Error", error: error.message });

    }

};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findByIdAndDelete(id)

        if (!book)
            return res.status(404).json({ message: 'Book Not Found' })

        return res.status(200).json({ message: "Deleted Successfully" })

    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error })
    }
};