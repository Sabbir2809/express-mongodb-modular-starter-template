import { Response } from "express";
import { IData } from ".";

const sendResponse = <T>(res: Response, data: IData<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
export default sendResponse;
