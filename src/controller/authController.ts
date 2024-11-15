import { Request, Response } from "express"
import AuthService from "../service/auth.service"
import { compare } from "../utils/bcrypt"
import { generateJWT, refreshTokenJWT } from "../utils/jsonwebtoken"

// import ENVIROMENT from "../config/enviroment";

// import { google } from 'googleapis';
// import axios from "axios";

// const oauth2Client = new google.auth.OAuth2(
//   ENVIROMENT.GOOGLE.CLIENT_ID,
//   ENVIROMENT.GOOGLE.SECRET_ID,
//   "/auth-v2"
// );

// // generate a url that asks permissions for Blogger and Google Calendar scopes
// const scopes = [
//   'https://www.googleapis.com/auth/blogger',
//   'https://www.googleapis.com/auth/calendar'
// ];

// const url = oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   prompt: 'consent',
//   scope: [
//     'email',
//     'profile'
//   ]
//   // If you only need one scope, you can pass it as a string
//   // scope: scopes
// });

export default class AuthController {

  constructor() {

  }

  async login(req: Request, res: Response) {

    const user: { email: string, password: string } = {
      email: req.body.email,
      password: req.body.password
    }

    const authService = new AuthService()
    const userData = await authService.findByEmail(user.email)

    if (!userData) throw new Error('Invalid user')

    if (!compare(user.password, userData.password)) throw new Error('Invalid password')

    const token = generateJWT(userData.id)
    const refreshToken = refreshTokenJWT({ token })

    res.setHeader('Authorization', `Bearer ${token}`)

    return res.json({
      token,
      refreshToken,
    })

  }



  // async loginGoogle(req: Request, res: Response) {

  //   const code: string = req.cookies['g_csrf_token']
  //   console.log('****TOKEN****')
  //   console.log(code)

  //   // const { tokens } = await oauth2Client.getToken(code)
  //   // console.log(tokens)

  //   const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
  //     code,
  //     client_id: ENVIROMENT.GOOGLE.CLIENT_ID,
  //     client_secret: ENVIROMENT.GOOGLE.SECRET_ID,
  //     redirect_uri: 'http://localhost:3000/auth-v2',
  //     grant_type: 'authorization_code'
  //   });

  //   const { access_token } = tokenResponse.data;
  //   // oauth2Client.setCredentials(tokens);

  //   const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`
  //     }
  //   });

  //   // Datos del usuario
  //   const userInfo = userInfoResponse.data;
  //   res.json({
  //     message: 'Autenticación exitosa',
  //     user: userInfo
  //   });
  // }

}
