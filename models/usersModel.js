const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true, // 布林值，是否在屬性中定義一個唯一索引。
      lowercase: true, // 默認小寫
      select: false // select: 布林值 指定 query 的預設 projections
    },
    photo: String,
    sex:{
      type: String,
      enum:["male","female"] // 枚舉驗證器。如果設置的值不在此數組中，則驗證將失敗。
    },
    password:{
      type: String,
      required: [true,'請輸入密碼'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  });
// User
// 如果不需要該版本號，在 schema 中新增{ versionKey: false}即可。
const User = mongoose.model('user', userSchema);

module.exports = User;