import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";

import User from "../models/User";

const createUser = async (UserCreateDto: UserCreateDto): Promise<PostBaseResponseDto | null> => {
  return null;
};

const signInUser = async (userSignInDto: UserSignInDto): Promise<PostBaseResponseDto | null | number> => {
  return null;
};

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
  return null;
};

export default {
  createUser,
  signInUser,
  findUserById,
};
