var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')
var postRouter = require('./routes/post')
var uploadRouter = require('./routes/upload')
const resError = require('./service/resError');

var app = express();

// 程式出現重大錯誤時
process.on('uncaughtException', err=>{
  // 紀錄錯誤下來 等到服務處理完畢後 停掉該process
  console.error('Uncaughted Exception!')
  console.error(err)
  process.exit(1)
})

dotenv.config({path:'./config.env'})
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB)
  .then(()=>{
    console.log('資料庫連接成功')
  })
  .catch((error)=>{
    console.log('error')
  })

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/upload', uploadRouter)

app.use((err,req,res,next) => {
  // dev 
  err.statusCode = err.statusCode || 500
  if(process.env.NODE_ENV === 'dev'){
    return resError.resErrorProd(err, res)
  }
  // production 
  if(err.name === 'ValidationError'){
    err.message = '資料欄位未填寫正確，請重新輸入'
    err.isOperational = true;
    return resError.resErrorProd(err, res)
  }
  resError.resErrorProd(err, res)
})

// 未捕捉到的catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的rejection', promise, '原因:', err)
})

module.exports = app;
