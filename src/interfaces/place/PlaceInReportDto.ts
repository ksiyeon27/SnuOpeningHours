import mongoose from "mongoose";

export interface PlaceInReportDto {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  category: number;
}
