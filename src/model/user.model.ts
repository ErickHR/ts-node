import IModel from "./Imodel"
import { IUser } from "./interfaces/user.model"
import UserSchema from "./schema/user.schema"

export default class User implements IModel<IUser> {

  constructor() {
  }

  async save({ name, lastname, email, password, role }: IUser) {
    let userJson = { name, lastname, email, password, role }
    const user = new UserSchema(userJson)
    return user.save()
  }

  async index() {
    return UserSchema.find().select({ password: 0 })
  }

  async findByEmail(email: string) {
    return UserSchema.findOne({ email })
  }

  async findById( id: string ) {
    return UserSchema.findById(id)
  }
  
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.")
  }
  update(id: string, data: IUser): Promise<any> {
    throw new Error("Method not implemented.")
  }

}
