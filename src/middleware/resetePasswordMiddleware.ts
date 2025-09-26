import jwt from "jsonwebtoken";
import {config} from "../config/index";
// import { User, Token } from "../model/index";

const jwtSecret = config.jwt.secret;

const resetPasswordTokenMiddleware = async (req: any, res: any, next: any) => {
  try {
    const { token } = req.body;

    if (!token || token.length <= 10) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Rest password Token is invalid" });
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    const { id: userId, exp } = decoded;

    const currentTime = Math.floor(Date.now() / 1000);

    if (exp && currentTime > exp) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Reset Password token expired." });
    }

    // const user = await User.findById(userId).select("_id email");
    // if (!user) {
    //   return res
    //     .status(httpStatus.UNAUTHORIZED)
    //     .json({ message: "Invalid User" });
    // }

    // const storedToken = await Token.findOne({
    //   token,
    //   userId,
    //   status: "revoked",
    //   type: "reset"
    // });

    // if (!storedToken) {
    //   return res
    //     .status(httpStatus.UNAUTHORIZED)
    //     .json({ message: "Token Expired or Invalid" });
    // }

    req.decoded = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Reset password Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Token." });
    }

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error." });
  }
};

export default resetPasswordTokenMiddleware;
