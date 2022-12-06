export interface PlaceInfo {
  name: string;
  category: number;
  description: string;
  location: string;
  isClosed: boolean;
  dayOff: number[];
  openTime: Date[];
  closeTime: Date[];
}
