import 'dotenv/config'

// const NODE_ENV = process.env.NODE_EN

interface IJWT {
  SECRET: string
  SECRET_REFRESH: string
}

interface IGOOGLE {
  CLIENT_ID: string
  SECRET_ID: string
}

interface ICloudinary {
  NAME: string
  API_KEY: string
  API_SECRET: string
}

interface IEnviroment {
  PORT: number
  DB_URI: string
  JWT : IJWT
  GOOGLE : IGOOGLE,
  CLOUDINARY: ICloudinary
}

const ENVIROMENT: IEnviroment = {
  PORT: Number(process.env.PORT),
  DB_URI: String(process.env.MONGO_URI),
  JWT: {
    SECRET: String(process.env.JWT_SECRET),
    SECRET_REFRESH: String(process.env.JWT_REFRESH_SECRET),
  },
  GOOGLE: {
    CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
    SECRET_ID: String(process.env.GOOGLE_SECRET_ID),
  },
  CLOUDINARY: {
    NAME: String(process.env.CLOUDINARY_NAME),
    API_KEY: String(process.env.CLOUDINARY_API_KEY),
    API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
  }
}

export default ENVIROMENT
