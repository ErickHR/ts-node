import { Request, Response } from "express";
import IControllerCrud from "./IControllerCrud";
import SearchService from "../service/search.service";
import { UploadService } from "../service";

export default class UploadController implements IControllerCrud {

  constructor(
    private uploadService: UploadService
  ) {
    // this.save = this.save.bind(this);
  }
  getById = async (req: Request, res: Response): Promise<any> => {

    const collection = req.params.collection
    const id = req.params.id

    const pathFile = await this.uploadService.getOneFile(id, collection)

    return res.sendFile(pathFile)

  }
  save = async (req: Request, res: Response): Promise<any> => {

    const name = await this.uploadService.upload(req?.files?.file, 'pdf')

    return res.status(200).json({ name })

  }

  saveByCollection = async (req: Request, res: Response): Promise<any> => {

    const collection = req.params.collection
    const id = req.params.id

    const name = await this.uploadService.uploadByCollection(id, collection, req?.files?.file)

    return res.status(200).json({ name })

  }

  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  getAll(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

}
