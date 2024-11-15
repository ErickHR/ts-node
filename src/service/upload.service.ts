
import fs from 'fs';

import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Product, User } from "../model";
import IService from "./IService";
import { v2 as cloudinary } from 'cloudinary';
import { destroyFile, moveFile } from '../utils/cloudinary';

const defaultExtension = ['jpg', 'png', 'jpeg', 'gif', 'pdf', 'docx'];

export default class UploadService implements IService {

  constructor(
    private product: Product,
    private user: User,
  ) { }

  create(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  index(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  getOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getOneFile(id: string, collection: string): Promise<any> {

    let collectionModel: any

    switch (collection) {
      case 'products':
        collectionModel = await this.product.findById(id)
        break;
      case 'user':
        collectionModel = await this.user.findById(id)
        break;
      default:
        throw new Error('Invalid collection');
    }

    if (collectionModel.image) {
      const pathImage = path.join(__dirname, './../../', 'files', collection, collectionModel.image);
      if (fs.existsSync(pathImage)) {
        return pathImage
      }
    }

    const pathImage = path.join(__dirname, './../../', 'files', 'default', 'no-image.jpg');
    return pathImage
  }
  update(id: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  upload = (file: any, files = '', extensionList: any = defaultExtension): any => {

    return new Promise((resolve, reject) => {
      const sampleFile: any = file;
      const extension = sampleFile.name.split('.').pop();

      if (!extensionList.includes(extension)) {
        throw new Error('Invalid file extension.');
      }

      const name = uuidv4() + '.' + extension;

      const uploadPath = path.join(__dirname, './../../', 'files', files, name);

      sampleFile.mv(uploadPath, function (err: any) {
        if (err) {
          throw new Error(err.message);
        }

        return resolve(name)
      });
    })

  }

  uploadByCollection = async (id: string, collection: string, file: any, extensionList: any = defaultExtension): Promise<any> => {

    const sampleFile: any = file;
    const extension = sampleFile.name.split('.').pop();

    if (!extensionList.includes(extension)) {
      throw new Error('Invalid file extension.');
    }

    let collectionModel: any

    switch (collection) {
      case 'products':
        collectionModel = await this.product.findById(id)
        break;
      case 'user':
        collectionModel = await this.user.findById(id)
        break;
      default:
        throw new Error('Invalid collection');
    }

    // const name = uuidv4() + '.' + extension;

    if (collectionModel.image) {
      //   const deletePath = path.join(__dirname, './../../', 'files', collection, collectionModel.image);
      const deletePath = collectionModel.image.split('/').pop().split('.')[0]
      await destroyFile(deletePath)
      //   if (fs.existsSync(deletePath)) fs.unlinkSync(deletePath)
    }

    const { tempFilePath: uploadPath } = file

    // // const nameResponse = await this.moveFile(sampleFile, name, uploadPath)
    const nameResponse = await moveFile(uploadPath)

    collectionModel.image = nameResponse
    await collectionModel.save()

    return nameResponse

  }


  moveFile = (sampleFile: any, name: any, uploadPath: any) => {
    return new Promise((resolve, reject) => {
      sampleFile.mv(uploadPath, function (err: any) {
        if (err) {
          return reject(new Error(err.message))
        }

        return resolve(name)
      });
    })
  }

}
