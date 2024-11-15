import { Product } from "../model";
import IProduct from "../model/interfaces/product.model";
import IService from "./IService";

export default class ProductService implements IService {

  constructor(
    private product: Product
  ){

  }
  create({name, user_id, price, description, category_id}: any): Promise<any> {

    const data:IProduct	 = {
      name,
      user_id,
      price,
      description,
      category_id,
    }
    
    return this.product.save(data);

  }

  index(): Promise<any> {
    return this.product.index()
  }
  getOne(id: string): Promise<any> {
    return this.product.findById(id)
  }
  update(id: string, data: any): Promise<any> {
    return this.product.update(id, data)
  }
  
  delete(id: string): Promise<any> {
    return this.product.delete(id)
  }

}
