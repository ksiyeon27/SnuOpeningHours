import mongoose from "mongoose";

export interface UserInfo {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
  password: string;
}
