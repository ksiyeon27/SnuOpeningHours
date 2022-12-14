import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { PlaceInfo } from "../interfaces/place/PlaceInfo";
import { PlaceService } from "../services";

/**
 *  @route GET /place/:placeId
 *  @desc Get Place
 *  @access Public
 */
const getPlace = async (req: Request, res: Response) => {
  const { placeId } = req.params;

  try {
    const data = await PlaceService.getPlace(placeId);
    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    //console.log(data);
    return res.render("place", { data: data });
    //return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_PLACE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /place/category/:categoryId
 *  @desc Get Places by category
 *  @access Public
 */

const getPlacesByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    const data = await PlaceService.getPlacesByCategory(categoryId);
    if (!data) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.READ_CATEGORY_PLACES_FAIL));
    }
    return res.render("category", { data: data });
    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_CATEGORY_PLACES_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /place/search?keyword=
 *  @desc Get place by search
 *  @access Public
 */
const getPlacesBySearch = async (req: Request, res: Response) => {
  const { keyword } = req.query;

  try {
    const data = await PlaceService.getPlacesBySearch(keyword as string);
    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res.render("search", { data: data });
    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.SEARCH_PLACE_SUCCESS, data));
  } catch (err) {
    console.log(err);

    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/* ?????? ?????? */
const createPlace = async (req: Request, res: Response) => {
  const placeCreateDto: PlaceInfo = req.body;
  try {
    const data = await PlaceService.createPlace(placeCreateDto);
    if (!data) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, "place ?????? ??????", data)); //response??? data ????????????!
  } catch (err) {
    console.log(err); //?????? ???????????? ?????? ??????.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default { getPlace, getPlacesByCategory, getPlacesBySearch, createPlace };
