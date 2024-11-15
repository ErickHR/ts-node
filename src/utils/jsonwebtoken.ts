
import jwt from 'jsonwebtoken';
import ENVIROMENT from '../config/enviroment';
import { IToken, IUserLogin } from '../model/interfaces/user.model';

export const generateJWT = (uid:string) => {

  var token = jwt.sign(
    {uid},
    ENVIROMENT.JWT.SECRET,
    { expiresIn: '1h' }
  );

  return token
}

export const verifyJWT = ({ token }: IToken) => {

  var tokenVerify = jwt.verify(
    token,
    ENVIROMENT.JWT.SECRET
  );
 
  return tokenVerify
}

export const refreshTokenJWT = (dataToken: IToken) => {

  var token = jwt.sign(
    dataToken,
    ENVIROMENT.JWT.SECRET_REFRESH,
    { expiresIn: '3h' }
  );

  return token
}

