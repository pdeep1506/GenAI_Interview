import multer from 'multer';


export const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits:{
        fieldSize: 3*1024*1024 // 3 Mb
    }

})