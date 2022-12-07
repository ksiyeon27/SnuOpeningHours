import mongoose from "mongoose";

export interface ReportCreateDto {
  writerId: mongoose.Types.ObjectId;
  placeId: mongoose.Types.ObjectId;
}
