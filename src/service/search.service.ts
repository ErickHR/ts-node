import mongoose from "mongoose";
import { Category, Product } from "../model";
import IService from "./IService";

export default class SearchService implements IService {

  constructor(
    private product: Product,
    private category: Category,
  ) {
  }
  create(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  index(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  getOne(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  update(id: string, data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async search(collection: string, query: any): Promise<any> {

    let colecctionModel

    switch (collection) {
      case 'products':
        colecctionModel = this.product
        break;
      case 'categories':
        colecctionModel = this.category
        break;
      default:
        throw new Error('Invalid collection');
    }

    if (mongoose.Types.ObjectId.isValid(query)) {
      return colecctionModel.findById(query)
    }

    return colecctionModel.find(query)

  }


}
