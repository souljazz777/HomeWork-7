const multer = require('multer')
const path = require('path')
const appError = require('../service/appError')
const handleErrorAsync = require('../service/handleErrorAsync')
const upload = multer({  // 檔案上傳的npm
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter(req, file, cb){  // fileFiter是multer裡面提供的預設選項
        const ext = path.extname(file.originalname).toLowerCase()
        if(ext!=='.jpg' && ext!== '.png' && ext !== '.jpeg'){
            // cd是Boolen有點像middleware
            cb(new Error('檔案格式錯誤，僅限上傳jpg、jpeg與png格式'))
        }
        cb(null, true) // true是可以到下個middleware
    }
}).any()

module.exports = upload;