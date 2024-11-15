import { NextFunction, Request, Response } from "express"
import { verifyJWT } from "../utils/jsonwebtoken"
import UserService from "../service/user.service"
import User from "../model/user.model"

const user = new User()
const userService = new UserService(user)

interface IAuthRequest extends Request {
  user: any
}

export const authMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {

  if (!req.headers.authorization) throw new Error('Invalid token')

  const decodeToken: any = verifyJWT({ token: req.headers.authorization.split(' ')[1] })

  const user = await userService.find(decodeToken.uid)

  if (!user) throw new Error('User not found')

  if (!user.status) throw new Error('User not active')

  req.user = user

  next()
}

export const aloneAdminMiddleware = (role: string[]) => {
  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!role.includes(req.user.role)) throw new Error('Access denied')
    next()
  }
}
