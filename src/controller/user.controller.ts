import { Request, Response } from "express"
import { IUser } from "../model/interfaces/user.model"
import IControllerCrud from "./IControllerCrud"
import IService from "../service/IService"


export default class UserController implements IControllerCrud {
  constructor( private userService: IService ) {
  }

  async getAll(req: Request, res: Response): Promise<Response> {

    // const usersData: IUser = {
    //   name: req.body.name,
    //   lastname: req.body.lastname,
    //   email: req.body.email
    // }

    const response = await this.userService.index()

    return res.json(response)

  }

  async save(req: Request, res: Response): Promise<Response> {


    const usersData: IUser = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    const response = await this.userService.create(usersData)

    return res.json(response)

  }

  getById(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.")
  }
  update(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.")
  }
  delete(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.")
  }

}