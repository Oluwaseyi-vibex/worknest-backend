import { NextFunction, Request, Response } from "express";
import * as authService from "./auth.service";
import statusCodes from "./../../constants/statusCodes";
import response from "./../../utils/responseObject";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userCreated = await authService.register(req.body);
    return res.status(statusCodes.CREATED).json(
      response({
        message: "User created",
        status: statusCodes.CREATED,
        success: true,
        data: userCreated,
      })
    );
  } catch (err) {
    if (err.message === "USER_EXIST") {
      return res.status(statusCodes.CONFLICT).json(
        response({
          message: "User already exist",
          status: statusCodes.CONFLICT,
          success: false,
          data: {},
        })
      );
    }

    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.login(req.body);

    return res.status(statusCodes.OK).json(
      response({
        message: "Login successful",
        status: statusCodes.OK,
        success: true,
        data: user,
      })
    );
  } catch (err: any) {
    if (err.message === "AUTH_FAILED") {
      return res.status(statusCodes.UNAUTHORIZED).json(
        response({
          message: "Invalid email/password",
          status: statusCodes.UNAUTHORIZED,
          success: false,
          data: {},
        })
      );
    }
    if (err.message === "INVALID_EMAIL/PASSWORD") {
      return res.status(statusCodes.BAD_REQUEST).json(
        response({
          message: "Invalid email/password",
          status: statusCodes.BAD_REQUEST,
          success: false,
          data: {},
        })
      );
    }
    next(err);
  }
};
