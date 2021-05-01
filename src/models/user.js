import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

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

const User = mongoose.model('User', UserSchema);

export default User;
