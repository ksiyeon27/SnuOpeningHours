import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Report from "../models/Report";
import { ReportCreateDto } from "../interfaces/report/ReportCreateDto";
import { ReportResponseDto } from "../interfaces/report/ReportResponseDto";
import { PlaceInReportDto } from "../interfaces/place/PlaceInReportDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";

const getReport = async (reportId: string): Promise<ReportResponseDto | null> => {
  try {
    const report = await Report.findById(reportId).populate("writer").populate("place");
    if (!report) return null;

    let placeResponse: PlaceInReportDto;
    placeResponse = {
      _id: report.place._id,
      name: report.place.name,
      category: report.place.category,
    };

    let writerResponse: UserResponseDto;
    writerResponse = {
      _id: report.writer._id,
      email: report.writer.email,
      username: report.writer.username,
    };

    const data = {
      _id: report._id,
      writer: writerResponse,
      place: placeResponse,
      content: report.content,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createReport = async (reportCreateDto: ReportCreateDto): Promise<PostBaseResponseDto | null> => {
  try {
    const report = new Report(reportCreateDto);
    await report.save();

    const data = {
      _id: report.id,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getReport, createReport };
