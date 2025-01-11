import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "UnauthorizedError") {
    // Respond with a 401 status code and a JSON error message
    res
      .status(401)
      .json({ error: "Unauthorized access: invalid or missing token" });
  } else {
    // Pass the error to the next middleware if it's not an UnauthorizedError
    next(err);
  }
}

export default errorHandler;
