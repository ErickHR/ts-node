
export interface IUser {
  name: string
  lastname: string
  email: string,
  password: string
  role: string
  status?: boolean
  image?: string
}

export interface IUserLogin {

  uid: string
  name: string
  lastname: string,
  email: string
}

export interface IToken {
  token: string
}

