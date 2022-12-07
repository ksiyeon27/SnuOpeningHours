import { PlaceInReportDto } from "../place/PlaceInReportDto";
import { UserResponseDto } from "../user/UserResponseDto";

export interface ReportResponseDto {
  writer: UserResponseDto;
  place: PlaceInReportDto;
  content: string;
}
