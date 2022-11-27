import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import User from "../models/User";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {};

/**
 *  @route POST /user/signin
 *  @desc Signin User(Login)
 *  @access Public
 */
const signinUser = async (req: Request, res: Response) => {};

/**
 *  @route GET /user/:userId
 *  @desc READ User
 *  @access Public
 */
const findUserById = async (req: Request, res: Response) => {};

export default { createUser, signinUser, findUserById };
