import IModel from "./Imodel";
import IProduct from "./interfaces/product.model";
import ProductSchema from "./schema/product.schema";

export default class Product implements IModel<IProduct> {
  index(): Promise<any> {
    return ProductSchema.find({ deleted: false })
  }
  findById(id: string): Promise<any> {
    return ProductSchema.findById(id)
  }
  save(data: IProduct): Promise<any> {

    const dataCreate = {
      name: data.name,
      price: data.price,
      description: data.description,
      category_id: data.category_id,
      user_id: data.user_id
    }

    const product = new ProductSchema(dataCreate)

    return product.save()

  }
  delete(id: string): Promise<any> {
    return ProductSchema.findByIdAndUpdate(id, { deleted: true }, { new: true })
  }
  update(id: string, data: IProduct): Promise<any> {

    const dataUpdate = {
      name: data.name,
      price: data.price,
      description: data.description,
      category_id: data.category_id,
      user_id: data.user_id,
    }

    return ProductSchema.findByIdAndUpdate(id, dataUpdate, { new: true })
  }

  find(query: any): Promise<any> {
    const regex = new RegExp(query, 'i')
    return ProductSchema.find({
      $or: [
        { name: regex },
        { description: regex }
      ],
      $and: [
        { deleted: false }
      ]
    }).populate('category_id', 'name')
  }
}
