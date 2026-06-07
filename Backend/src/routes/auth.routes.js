import {Router} from "express";
import { registerUserController, loginUserController, logoutUserController, getMeController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();


// Register API

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', registerUserController)

/**
 * @route POST /api/auth/login
 * @description To login a  user with email and password
 * @access Public
 */
authRouter.post('/login', loginUserController)

/**
 * @route GET /api/auth/logout
 * @description logout a  user with token
 * @access Public
 */
authRouter.get('/logout', logoutUserController)


/**
 * @route GET /api/auth/get-me
 * @description Get the current login user details
 * @access Private
 */
authRouter.get('/get-me', authUser,getMeController)

export default authRouter
