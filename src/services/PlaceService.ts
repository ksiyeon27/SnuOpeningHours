import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import Place from "../models/Place";
import { PlaceInfo } from "../interfaces/place/PlaceInfo";
import { PlaceResponseDto } from "../interfaces/place/PlaceResponseDto";

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

export default { getPlace, createPlace };
