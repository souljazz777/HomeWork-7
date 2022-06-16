const jwt = require('jsonwebtoken')
const appError = require('./appError')
const handleErrorAsync = require('./handleErrorAsync')
const handleSuccess = require('./handleSuccess')
const User = require('../models/usersModel')

const isAuth = handleErrorAsync(async(req,res,next) => {
    // 確認token是否存在
    let token;
    if(
        // 檢查authorization標頭是否存在並分配authorization包含它的字符串bearer(型態)
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1]
    }

    if(!token){
        return next(appError(400,'你尚未登入',next))
    }
    // 驗證 token 正確性
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err){
                reject(err)
            }else{
                resolve(payload)
            }
        })
    })
    const currentUser = await User.findById(decoded.id)
    req.user = currentUser; // 將自己需要的資料帶到下一步處理
    next()
})

const generateSendJWT = (user, statusCode, res) => {
    // 產生JWT token
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });
    user.password = undefined;
    const userInfo = {
        token,
        name: user.name
    }
    handleSuccess(res,'', userInfo);
}

module.exports = {
    isAuth,
    generateSendJWT
}