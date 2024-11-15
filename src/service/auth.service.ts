import User from "../model/user.model";

export default class AuthService {


  constructor() {
  }

  async findByEmail(email: string) {
    const user = new User();
    return user.findByEmail(email);
  }

}
