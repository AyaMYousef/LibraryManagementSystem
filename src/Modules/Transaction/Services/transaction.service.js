import Joi from "joi";
import Transaction from '../../../DB/Models/transaction.model.js'
import Book from '../../../DB/Models/book.model.js'
import dotenv from 'dotenv';
dotenv.config();


export const borrowBook = async (req, res) => {
    try {
        const schema = Joi.object({
            userId: Joi.string().required(),
            bookId: Joi.string().required()
        })

        const { error } = schema.validate(req.body)
        if (error) 
            return res.status(400).json({ message: error.message })

        const { userId, bookId } = req.body
        const book = await Book.findById(bookId)
        if (!book) 
            return res.status(404).json({ message: "Book Not Found" })
        if (book.availableCopies < 1)
             return res.status(400).json({ message: "No Copies Available" })

        const transaction = await Transaction.create({
            userId,
            bookId,
            status: "borrowed"
        })

        book.availableCopies -= 1
        await book.save()

        return res.status(201).json({ message: "Book Borrowed Successfully", transaction })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}