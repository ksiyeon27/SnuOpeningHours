import mongoose from "mongoose";

export interface UserResponseDto {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
}
