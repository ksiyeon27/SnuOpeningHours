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

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_PLACE_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/* 내부 사용 */
const createPlace = async (req: Request, res: Response) => {
  const placeCreateDto: PlaceInfo = req.body;
  try {
    const data = await PlaceService.createPlace(placeCreateDto);
    if (!data) return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, "place 넣기 완료", data)); //response에 data 끼워주고!
  } catch (err) {
    console.log(err); //서버 내부에서 오류 발생.
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default { getPlace, createPlace };
