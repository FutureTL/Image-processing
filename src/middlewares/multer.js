import multer from "multer";

const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './public/original')
    },
    //so we have written our destination in the form of a callback function.

    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
//in our multer code we have defined two values:
//1. destination in the form of callback as there can be many files with different destinations.
//2. filename

const upload = multer({

        storage,

})

export default upload;