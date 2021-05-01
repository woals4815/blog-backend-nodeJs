import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hasedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  //this는 문서 인스턴스를 가리킨다
  this.hasedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hasedPassword);
  return result;
};

UserSchema.statics.findByUsername = function (username) {
  //this는 모델을 가리킴
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);

export default User;
