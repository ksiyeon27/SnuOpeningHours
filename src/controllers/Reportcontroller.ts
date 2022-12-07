import { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { ReportCreateDto } from "../interfaces/report/ReportCreateDto";
import ReportService from "../services/ReportService";
//
/**
 *  @route GET /report/:reportId
 *  @desc Get Report
 *  @access Public
 */
const getReport = async (req: Request, res: Response) => {
  const { reportId } = req.params;

  try {
    const data = await ReportService.getReport(reportId);

    if (!data) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_REPORT_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 * @route POST /report
 * @desc Create Report
 * @access Public
 */
const createReport = async (req: Request, res: Response) => {
  const userId = req.body.user.id;
  req.body.writer = userId;
  const reportCreateDto: ReportCreateDto = req.body;

  try {
    const data = await ReportService.createReport(reportCreateDto);
    if (!data) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.BAD_REQUEST));
    }

    res.status(statusCode.CREATED).send(util.success(statusCode.CREATED, message.CREATE_REPORT_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route GET /report/user
 *  @desc Get user's report list
 *  @access Public
 */
const getUserReportList = async (req: Request, res: Response) => {
  const userId = req.body.user.id;

  try {
    if (!userId) {
      return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    const data = await ReportService.getUserReportList(userId);
    if (!data) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, message.READ_USER_REPORTS_FAIL));
    }

    return res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_USER_REPORTS_SUCCESS, data));
  } catch (err) {
    console.log(err);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default { getReport, createReport, getUserReportList };
