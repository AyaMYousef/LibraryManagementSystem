import { Router } from "express";
import * as BR from './Services/book.service.js'
//import {verifyToken} from  "../../../utils/tokens.utils.js";
import { authMiddleware } from "../../MiddleWare/authentication.middleware.js";
import {authorizeRoles} from "../../MiddleWare/role.middleware.js"
const bookRouter = Router();



bookRouter.post("/add", authMiddleware, authorizeRoles('admin'),BR.addBook);
bookRouter.get("/listBooks",BR.listBooks);
bookRouter.put("/updateBook/:id", authMiddleware,authorizeRoles('admin'), BR.UpdateBook);
bookRouter.delete("/deletebook/:id", authMiddleware,authorizeRoles('admin'), BR.deleteBook)

export default bookRouter;