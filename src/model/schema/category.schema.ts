
import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String,
  deleted: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

schema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();

  category.uid = _id

  return category
}

const CategorySchema = model('Category', schema)

export default CategorySchema
