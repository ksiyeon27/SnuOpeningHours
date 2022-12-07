import { UserInfo } from "../user/UserInfo";
import { PlaceInfo } from "../place/PlaceInfo";
import mongoose from "mongoose";

export interface ReportInfo {
  _id: mongoose.Schema.Types.ObjectId;
  writer: UserInfo;
  place: PlaceInfo;
  content: string;
}
