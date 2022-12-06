import { PlaceListInfo } from "./PlaceInfo";

export interface PlaceListResponseDto {
  placesCount: number;
  places: PlaceListInfo[];
}
