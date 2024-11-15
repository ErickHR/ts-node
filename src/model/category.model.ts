import IModel from "./Imodel";
import ICategory from "./interfaces/category.model";
import CategorySchema from "./schema/category.schema";

export default class Category implements IModel<ICategory> {

  save({ name, user_id }: ICategory): Promise<any> {

    const data = {
      name,
      user_id
    }
    const category = new CategorySchema(data)

    return category.save();
  }
  index(): Promise<any> {
    return CategorySchema.find();
  }
  findById(id: string): Promise<any> {
    return CategorySchema.find({ _id: id });
  }

  update(id: string, data: any): Promise<any> {
    return CategorySchema.findByIdAndUpdate(id, data, { new: true })
  }

  delete(id: string): Promise<any> {
    return CategorySchema.findByIdAndUpdate(id, { deleted: true })
  }

  find(query: any): Promise<any> {
    const regex = new RegExp(query, 'i')

    return CategorySchema.find({
      $or: [
        { name: regex },
        { description: regex }
      ],
      $and: [
        { deleted: false }
      ]
    })

  }
}

