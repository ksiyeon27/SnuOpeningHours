import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Place from "../models/Place";
import { PlaceInfo } from "../interfaces/place/PlaceInfo";
import { PlaceListInfo } from "../interfaces/place/PlaceInfo";
import { PlaceResponseDto } from "../interfaces/place/PlaceResponseDto";
import { PlaceListResponseDto } from "../interfaces/place/PlaceListResponseDto";

const getPlace = async (placeId: string): Promise<PlaceResponseDto | null> => {
  try {
    const place = await Place.findById(placeId);
    if (!place) return null;

    return place;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPlacesByCategory = async (categoryId: string): Promise<PlaceListResponseDto | null> => {
  try {
    let placeList;
    switch (categoryId) {
      case "1":
      case "2":
      case "3":
      case "4":
        placeList = await Place.find({ category: Number(categoryId) });
        break;
      default:
        return null;
    }

    let count = 0;
    const places: PlaceListInfo[] = await Promise.all(
      placeList.map((place) => {
        const result = {
          _id: place._id,
          category: place.category,
          name: place.name,
          location: place.location,
          isClosed: place.isClosed,
          dayOff: place.dayOff,
          openTime: place.openTime,
          closeTime: place.closeTime,
        };
        count++;
        return result;
      })
    );

    const data: PlaceListResponseDto = {
      placesCount: count,
      places: places,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getPlacesBySearch = async (keyword: string): Promise<PlaceListResponseDto | null> => {
  const regex = (pattern: string) => new RegExp(`.*${pattern}.*`);

  try {
    const Regex: RegExp = regex(keyword);
    const placeList = await Place.find({
      $or: [{ name: { $regex: Regex } }, { location: { $regex: Regex } }],
    });

    let count = 0;

    const places: PlaceListInfo[] = await Promise.all(
      placeList.map((place: any) => {
        const result = {
          _id: place._id,
          category: place.category,
          name: place.name,
          location: place.location,
          isClosed: place.isClosed,
          dayOff: place.dayOff,
          openTime: place.openTime,
          closeTime: place.closeTime,
        };
        count++;
        return result;
      })
    );

    const data: PlaceListResponseDto = {
      placesCount: count,
      places: places,
    };

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createPlace = async (placeCreateDto: PlaceInfo): Promise<PostBaseResponseDto | null> => {
  try {
    const place = new Place(placeCreateDto);
    await place.save();

    const data = {
      _id: place.id,
    };
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { getPlace, getPlacesByCategory, getPlacesBySearch, createPlace };
