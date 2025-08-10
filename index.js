import express from "express"
import dbConnection from "./src/DB/db.connection.js";
import userRouter from "./src/Modules/User/user.controller.js"
import transactionRouter from "./src/Modules/Transaction/transaction.controller.js"
import bookRouter from "./src/Modules/Book/book.controller.js"
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(express.json());

//Routes
app.use('/api/users', userRouter);
app.use('/api/transaction', transactionRouter)
app.use("/api/book", bookRouter);


//dbConnection
dbConnection()

//Error Handling MiddleWare
app.use((err, req, res, next) => {
    console.error("Server Error:", err);
    res.status(err.cause || 500).json({ message: "Internal Server Error", error: err.message, stack: err.stack });
});

//404 error
app.use((req, res) => {
    res.status(404).send("Not Found");
});


// server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));