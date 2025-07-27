import sharp from "sharp";
import path from "path";

//we have to fix the .toFile() in this file.
//when sigma is not provided then performs a faster 3x3 box blur.
//but when sigma is defined then performs more accurate slower blur.
const compositeImages = async (bottomImage, topImage, top, left, inputImagePath) => {


    try {

        const image = sharp(bottomImage)
        const outputPath = path.join('public', 'processed',inputImagePath );

        return await image.composite([
            {
                input: topImage,
                top:top,
                left:left
            },
        ])
        .toFile(outputPath)
        
        
    }catch (error) {
        console.log("error occured while compositing the image: ", error);
    }

}

export default compositeImages;