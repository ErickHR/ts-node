
import { v2 as cloudinary } from 'cloudinary';
import { ENVIROMENT } from '../config';

cloudinary.config({
  cloud_name: ENVIROMENT.CLOUDINARY.NAME,
  api_key: ENVIROMENT.CLOUDINARY.API_KEY,
  api_secret: ENVIROMENT.CLOUDINARY.API_SECRET,
  secure: true,
});

const moveFile = async (file: any) => {
  const { secure_url } = await cloudinary.uploader.upload(file)
  return secure_url
}

const destroyFile = async (id: string) => {
  const { result } = await cloudinary.uploader.destroy(id);

  if (result !== 'ok') {
    throw new Error(`Error delete file: ${result}`)
  }
}

export {
  moveFile,
  destroyFile
}