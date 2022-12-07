import { ReportInfo } from "./ReportInfo";

export interface ReportListResponseDto {
  reportsCount: number;
  reports: ReportInfo[];
}
