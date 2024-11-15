
import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
  }
}, { timestamps: true });

schema.methods.toJSON = function () {
  
  const { __v, _id, ...product } = this.toObject();

  product.uid = _id

  return product
};

const ProductSchema = model('Product', schema);

export default ProductSchema
