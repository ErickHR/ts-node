import { NextFunction, Request, Response } from "express";

const exitsParamsFile = (req: Request, res: Response, next: NextFunction) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    throw new Error("No files were uploaded.");
  }

  next()
}

export {
  exitsParamsFile
}
