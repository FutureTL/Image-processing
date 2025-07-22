import sharp from "sharp";

//in this, conversion to jpeg takes place.

//THINGS TO NOTE: Right now I don't have the processedPath nor originalPath.
//I will get it once I write code for multer and UUIDs.

const covertToJpeg = async (originalPath) => {

    try {
        await sharp(originalPath)
                  .jpeg({
                    quality:80,
                    chromaSubsampling: '4:2:0',
                    progressive: true,
                    mozjpeg:true
                  })
                  .toFile('./public/processed')

    }catch (error) {
        console.log("Error while changing to jpeg: ", error);
    }

}

export default covertToJpeg;