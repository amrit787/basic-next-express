import { ErrorRequestHandler } from 'express';
// import { Prisma } from '@prisma/client'
import httpStatus from 'http-status';
import config from '../config/config';
import ApiError from '../lib/api-error';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    let message: string = '';
    switch (error.code) {
      case 'P2002':
        message = `Record already exists`;
        break;
      case 'P2003':
        message = `Make sure ${err.meta.field_name} is valid.`;
        break;
      case 'P2025':
        message = ` ${error.meta.cause}`;
        break;
      default:
        if (config.env === 'production') {
          console.log(error);
        }
        message = error.message || httpStatus[statusCode];
    }
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  const response = {
    success: false,
    message,
    ...(config.env === 'development' && { stack: err.stack })
  };

  if (config.env === 'development') {
    console.log(err);
  }

  res.status(statusCode).json(response);
};
