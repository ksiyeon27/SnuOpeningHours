import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserSignInDto } from "../interfaces/user/UserSigninDto";
import User from "../models/User";
import bcrypt from "bcryptjs";

const createUser = async (UserCreateDto: UserCreateDto): Promise<PostBaseResponseDto | null> => {
  try {
    const existUser = await User.findOne({
      email: UserCreateDto.email,
    });
    if (existUser) return null;
    const user = new User(UserCreateDto);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(UserCreateDto.password, salt); //비밀번호 암호화

    await user.save();

    const data = {
      _id: user.id,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signInUser = async (userSignInDto: UserSignInDto): Promise<PostBaseResponseDto | null | number> => {
  try {
    const user = await User.findOne({
      email: userSignInDto.email,
    });
    if (!user) return null;

    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return 401;

    const data = {
      _id: user._id,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
  return null;
};

export default {
  createUser,
  signInUser,
  findUserById,
};
