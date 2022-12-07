import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Report from "../models/Report";
import { ReportCreateDto } from "../interfaces/report/ReportCreateDto";

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

export default { createReport };
