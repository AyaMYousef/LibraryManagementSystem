import { Router } from "express";
import * as UC from '../User/Services/user.service.js'
import { authMiddleware } from "../../MiddleWare/authentication.middleware.js";


const userRouter = Router();

userRouter.post('/register', UC.registerUserService);
userRouter.post('/login', UC.SignInService);
userRouter.get("/profile", authMiddleware, UC.getUserProfileService);

export default userRouter;