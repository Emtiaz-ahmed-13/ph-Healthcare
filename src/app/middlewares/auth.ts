import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status"; // ✅ Correct import
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import ApiError from "../erros/ApiError";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secrect as Secret
      );

      console.log("verifiedUser", verifiedUser);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }

      (req as any).user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
