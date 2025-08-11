import { Router } from "express";
import * as BR from './Services/book.service.js'
//import {verifyToken} from  "../../../utils/tokens.utils.js";
import { authMiddleware } from "../../MiddleWare/authentication.middleware.js";

const bookRouter = Router();



bookRouter.post("/add", authMiddleware, BR.addBook);

export default bookRouter;