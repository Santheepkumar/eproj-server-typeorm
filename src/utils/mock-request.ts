import { Request } from "express";
import { Params } from "express-serve-static-core";

export function makeMockRequest({
  params,
  query,
  user,
}: {
  params?: Params;
  query?: Params;
  user?: any | undefined;
}): Request {
  const req = {
    params: params || {},
    query: query || {},
    user,
  } as unknown;
  return req as Request;
}
