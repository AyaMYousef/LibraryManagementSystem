import { Router } from "express";
import { authMiddleware } from "../../MiddleWare/authentication.middleware.js";
import * as TR from './Services/transaction.service.js'

const transactionRouter = Router();


transactionRouter.post("/borrow", authMiddleware, TR.borrowBook);

transactionRouter.post("/returnBook", authMiddleware, TR.returnBook);

transactionRouter.get("/listTransactions", authMiddleware, TR.listTransactions);

export default transactionRouter;