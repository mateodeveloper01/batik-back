import { NextFunction, Response, Request } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export interface User {
  username: string;
  password: string;
}

export interface AuthRequest<
  ReqBody = any,
  Params = any,
  ResBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = any
> extends Request<Params, ResBody, ReqBody, ReqQuery, Locals> {
  user?: User;
  cookies: {
    jwt: string;
  };
}

export const validateUser = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // console.log("PROTECTED ROUTE, validating user...");
      const token = req.cookies.jwt;
      const user = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      req.user = user as User;
      next();
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError
      ) {
        return res.status(401).json({ ok: false, message: error.message });
      }
      console.log({ error });
      res.status(500).json({ ok: false, message: "Error del servidor" });
    }
  };
};
