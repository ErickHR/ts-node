import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.model";

const schema = new Schema<IUser>({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  status: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  image: {
    type: String,
  }
}, { timestamps: true })

schema.methods.toJSON = function () {

  const { __v, _id, ...user } = this.toObject();
  user.uid = _id;

  return user

}

const UserSchema = model('User', schema)



export default UserSchema
