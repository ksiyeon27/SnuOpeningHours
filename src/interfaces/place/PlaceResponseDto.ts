import mongoose from "mongoose";
import { PlaceInfo } from "./PlaceInfo";

export interface PlaceResponseDto extends PlaceInfo {
  _id: mongoose.Schema.Types.ObjectId;
}
