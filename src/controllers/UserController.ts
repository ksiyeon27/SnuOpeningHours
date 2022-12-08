import { NextFunction, Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { validationResult } from "express-validator";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserService } from "../services";
import jwtHandler from "../modules/jwtHandler";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";
import exceptionMessage from "../modules/exceptionMessage";
import { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
/**
 *  @route POST /user
 *  @desc Create User
 *  @access Public
 */
const createUser = async (req: Request, res: Response) => {
  // req.body.email = req.body.email as string;
  // req.body.username = req.body.username as string;
  // req.body.password = req.body.password as string;
  const userCreateDto: UserCreateDto = req.body;
  console.log(userCreateDto);
  try {
    const result = await UserService.createUser(userCreateDto);
    if (!result) {
      res.render("signup", { isLogin: false });
      return res.status(statusCode.CONFLICT).send(util.fail(statusCode.CONFLICT, message.EMAIL_DUPLICATED));
    }
    const accessToken: string = jwtHandler.getAccessToken(result._id);
    const data = {
      _id: result._id,
      accessToken,
    };

    res.cookie("token", accessToken, { httpOnly: true });
    res.render("home", { isLogin: true, statusCode: statusCode.CREATED, message: message.CREATE_USER_SUCCESS, data: data });
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
  console.log(userSigninDto);
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
    res.cookie("token", accessToken, { httpOnly: true });
    res.render("home", { isLogin: true, statusCode: statusCode.OK, message: message.SIGNIN_USER_SUCCESS, data: data });
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
      res.render("needLogin", { isLogin: false });
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    res.render("mypage", { isLogin: true, statusCode: statusCode.OK, message: message.READ_USER_SUCCESS, data: data });
    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

//쿠키로 auth!!
const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  // 공통적으로 사용되는 data
  res.locals.user = null;

  // 쿠키에서 토큰 가져오기
  const token = req.cookies.token;
  if (!token) {
    // 정상적인 경우
    if (req.url === "/" || req.url === "/api/user/signup" || req.url === "/api/user/login") return next();
    // 비정상적인 경우
    else return res.render("user/signin");
  }

  // token 값을 verify
  const decoded = jwtHandler.verifyToken(token);

  if (decoded === exceptionMessage.EXPIRED_TOKEN) {
    res.clearCookie("token");
    return res.render("signin");
    //return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.EXPIRED_TOKEN));
  }

  if (decoded === exceptionMessage.INVALID_TOKEN) {
    res.clearCookie("token");
    return res.render("signin");
    //return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.INVALID_TOKEN));
  }

  const userId = (decoded as JwtPayload).user;
  if (!userId) {
    return res.status(statusCode.FORBIDDEN).send(util.fail(statusCode.FORBIDDEN, message.INVALID_TOKEN));
  }

  const user = User.findById(userId.id);
  if (!user) {
    return res.render("signin");
    //return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, message.NO_USER));
  }

  res.locals.user = user;

  next();
};

export default { createUser, signinUser, getUser, checkAuth };
