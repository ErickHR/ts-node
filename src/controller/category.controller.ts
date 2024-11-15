import { Request, Response } from "express";
import IControllerCrud from "./IControllerCrud";
import ICategory from "../model/interfaces/category.model";
import IService from "../service/IService";

interface IAuthRequest extends Request {
  user: any
}

export default class CategoryController implements IControllerCrud {

  constructor(
    private categoryService: IService
  ) {
    // this.save = this.save.bind(this);
   }

  getAll = async(req: Request, res: Response): Promise<Response> => {

    const response = await this.categoryService.index()

    return res.json({
      message: 'Get all categories',
      response
    });
  }
  getById = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.categoryService.getOne(req.params.id)
    return res.json({
      message: 'getbyid',
      response
    });
  }
  save = async(req: IAuthRequest, res: Response): Promise<Response> => {

    const data: ICategory = {
      name: req.body.name,
      user_id: req.user.id
    }

    const response = await this.categoryService.create( data )
    return res.json({
      message: 'save',
      response
    });
  }
  update = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await this.categoryService.update(req.params.id, req.body)
    return res.json({
      message: 'update',
      response
    })
  }
  delete = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.categoryService.delete(req.params.id)
    return res.json({
      message: 'update',
      response
    })
  }


}
