import { Request, Response } from "express";
import IControllerCrud from "./IControllerCrud";
import ICategory from "../model/interfaces/category.model";
import IService from "../service/IService";
import IProduct from "../model/interfaces/product.model";

interface IAuthRequest extends Request {
  user: any
}

export default class ProductController implements IControllerCrud {

  constructor(
    private productService: IService
  ) {
    // this.save = this.save.bind(this);
   }

  getAll = async(req: Request, res: Response): Promise<Response> => {

    const response = await this.productService.index()

    return res.json({
      message: 'Get all product',
      response
    });
  }
  getById = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.productService.getOne(req.params.id)
    return res.json({
      message: 'getbyid',
      response
    });
  }
  save = async(req: IAuthRequest, res: Response): Promise<Response> => {

    const data: IProduct = {
      name: req.body.name,
      user_id: req.user.id,
      price: req.body.price,
      description: req.body.description,
      category_id: req.body.category_id,
    }

    const response = await this.productService.create( data )
    return res.json({
      message: 'save',
      response
    });
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    
    const response = await this.productService.update(req.params.id, req.body)
    return res.json({
      message: 'update',
      response
    })
  }
  
  delete = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.productService.delete(req.params.id)
    return res.json({
      message: 'update',
      response
    })
  }


}
