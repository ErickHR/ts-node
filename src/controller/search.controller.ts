import { Request, Response } from "express";
import IControllerCrud from "./IControllerCrud";
import SearchService from "../service/search.service";

export default class SearchController implements IControllerCrud {

  constructor(
    private searchService: SearchService
  ) {
    // this.save = this.save.bind(this);
   }
  getById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  save(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.");
  }

  getAll = async(req: Request, res: Response): Promise<Response> => {

    const coleccion = req.params.coleccion
    const search = req.params.search

    const response = await this.searchService.search( coleccion, search )

    return res.json({
      message: 'Get all product',
      response
    });
  }

}
