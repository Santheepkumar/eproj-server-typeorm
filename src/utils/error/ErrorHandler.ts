// eslint-disable-next-line no-unused-vars
import httpStatus from "http-status";
import APIError from "./APIError";
import NotFoundError from "./NotFoundError";
import InvalidDataError from "./InvalidDataError";
import NotAuthorizedError from "./NotAuthorizedError";

export default (err, _req, _res, next) => {
  if (err) console.warn(err);

  if (err instanceof NotFoundError) {
    const error = new APIError(
      err.message,
      httpStatus.NOT_FOUND,
      !err.internal
    );
    return next(error);
  }
  if (err instanceof InvalidDataError) {
    const error = new APIError(
      err.message,
      httpStatus.BAD_REQUEST,
      !err.internal
    );
    return next(error);
  }
  if (err instanceof NotAuthorizedError) {
    const error = new APIError(
      err.message,
      httpStatus.FORBIDDEN,
      !err.internal
    );
    return next(error);
  }
  if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
};
