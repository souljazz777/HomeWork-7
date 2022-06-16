const resError = {
    resErrorProd(err, res){
        // 如果是自己預期
        if (err.isOperationError){
            // 錯誤狀態碼
            res.status(err.statusCode).json({
                // 錯誤的詳細訊息
                message: err.message
            })
        }else{
            // log紀錄
            console.error('出現重大錯誤', err)
            // 送出罐頭訊息
            res.status(500).json({
                status: 'error',
                message: '系統錯誤，請洽系統管理員'
            })
        }
    },
    // 開發環境錯誤
    resErrorDev(err, res){
        res.status(err.statusCode).json({
            message: err.message,
            error: err,
            stack: err.stack,
        })
    }
}

module.exports = resError;