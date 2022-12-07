import { UserInfo } from "../user/UserInfo";
import { PlaceInfo } from "../place/PlaceInfo";

export interface ReportInfo {
  writer: UserInfo;
  place: PlaceInfo;
  content: string;
}
