import { Router } from "express";
import * as BR from './Services/book.service.js'
//import {verifyToken} from  "../../../utils/tokens.utils.js";
import { authMiddleware } from "../../MiddleWare/authentication.middleware.js";

const bookRouter = Router();



bookRouter.post("/add", authMiddleware, BR.addBook);
bookRouter.get("/listBooks", BR.listBooks);
bookRouter.put("/updateBook/:id", authMiddleware, BR.UpdateBook);
bookRouter.delete("/deletebook/:id", authMiddleware, BR.deleteBook)

export default bookRouter;