import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserService } from "../services";
import jwtHandler from "../modules/jwtHandler";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";

/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }
  const userCreateDto: UserCreateDto = req.body;
  try {
    const result = await UserService.createUser(userCreateDto);
    if (!result) return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, message.EMAIL_DUPLICATED));

    const accessToken: string = jwtHandler.getAccessToken(result._id);
    const data = {
      _id: result._id,
      accessToken,
    };

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_USER_SUCCESS, data)); //response에 data 끼워주고!
  } catch (err) {
    console.log(err); //서버 내부에서 오류 발생.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route POST /user/signin
 *  @desc Signin User(Login)
 *  @access Public
 */
const signinUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
  }

  const userSigninDto: UserSignInDto = req.body;
  try {
    const result = await UserService.signInUser(userSigninDto);
    if (!result) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    if (result === 401) {
      return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_PASSWORD));
    }

    const accessToken = jwtHandler.getAccessToken((result as PostBaseResponseDto)._id);
    const data = {
      _id: (result as PostBaseResponseDto)._id,
      accessToken,
    };
    res.status(statusCode.OK).send(util.success(statusCode.OK, message.SIGNIN_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /user
 *  @desc READ User
 *  @access Public
 */
const getUser = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  try {
    const data = await UserService.getUser(userId);
    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default { createUser, signinUser, getUser };
