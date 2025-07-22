import multer from "multer";
//here we have also defined the limit to the image size that the user can 
//upload i.e, 10MB.

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './public/original')
    },
    //so we have written our destination in the form of a callback function.

    limits: {
    fileSize: 10 * 1024 * 1024 // 5 MB limit
    },

    // filename: function(req,file,cb){
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
    //     cb(null, file.fieldname + '-' + uniqueSuffix)
    // }

    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
//in our multer code we have defined two values:
//1. destination in the form of callback as there can be many files with different destinations.
//2. filename

const upload = multer({

        storage,

})

export default upload;