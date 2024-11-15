import { IUser } from "../model/interfaces/user.model";
import User from "../model/user.model";
import { encrypt } from "../utils/bcrypt";
import IService from "./IService";

export default class UserService implements IService {

  constructor(private user: User) {

  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async create(data: IUser) {
    return this.user.save({ ...data, password: encrypt(data.password) });
  }

  async index() {
    const user = new User();
    return user.index();
  }

  async find(id: string) {
    return this.user.findById(id);
  }

}
