import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Report from "../models/Report";
import User from "../models/User";
import { ReportCreateDto } from "../interfaces/report/ReportCreateDto";
import { ReportResponseDto } from "../interfaces/report/ReportResponseDto";
import { PlaceInReportDto } from "../interfaces/place/PlaceInReportDto";
import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import { ReportListResponseDto } from "../interfaces/report/ReportListResponseDto";
import { ReportInfo } from "../interfaces/report/ReportInfo";

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

const getUserReportList = async (userId: string): Promise<ReportListResponseDto | null> => {
  try {
    let reportList;
    reportList = await Report.find({ writer: userId });

    let count = 0;
    const reports: ReportInfo[] = await Promise.all(
      reportList.map((report) => {
        // const result = {
        //   _id: report._id,
        //   writer: report.writer,
        //   place: report.place,
        //   content: report.content,
        // };
        count++;
        return report;
        // return result;
      })
    );

    const data: ReportListResponseDto = {
      reportsCount: count,
      reports: reports,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default { getReport, createReport, getUserReportList };
