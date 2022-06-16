const handleErrorAsync = function handleErrorAsync(func){
    // func 先將async fun 帶入參數儲存
    // middleware 先接住router資料
    return function (req,res,next) {
        // 在執行函式，async 可在用 catch統一捕捉
        func(req,res,next).catch(
            function(error){
                return next(error)
            }
        )
    }
}

module.exports = handleErrorAsync;