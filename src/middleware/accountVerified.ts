import jwt from "jsonwebtoken";
import {config} from "../config/index";
// import { User } from "../model/index";

const isAccountVerified = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Token is missing" });
  }

  try {
    const { id } = jwt.verify(token, config.jwt.secret) as any;
    // const user = await User.findById(id).select("isVerified");

    // if (!user) {
    //   return res
    //     .status(httpStatus.NOT_FOUND)
    //     .json({ message: "User not found" });
    // }

    // if (!user.isVerified) {
    //   return res
    //     .status(httpStatus.UNAUTHORIZED)
    //     .json({ message: "Please verify your account" });
    // }

    next();
  } catch (error: any) {
    const status =
      error.name === "JsonWebTokenError"
        ? httpStatus.UNAUTHORIZED
        : httpStatus.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
      message:
        status === httpStatus.UNAUTHORIZED
          ? "Invalid token"
          : "Internal server error"
    });
  }
};

export default isAccountVerified;
