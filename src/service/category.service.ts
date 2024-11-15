import { Category } from "../model";
import ICategory from "../model/interfaces/category.model";
import IService from "./IService";

export default class CategoryService implements IService {

  constructor(
    private category: Category
  ){

  }
  create({name, user_id}: any): Promise<any> {

    const data:ICategory = {
      name,
      user_id
    }
    
    return this.category.save(data);

  }

  index(): Promise<any> {
    return this.category.index()
  }
  getOne(id: string): Promise<any> {
    return this.category.findById(id)
  }
  update(id: string, data: any): Promise<any> {
    return this.category.update(id, data)
  }
  
  delete(id: string): Promise<any> {
    return this.category.delete(id)
  }

}
