import sharp from "sharp";
import path from "path";

//we have to think about the input of .toFile

const cropImage =async (inputImage,imageFilename, left, top, width , height) => {

    try {
        
        const outputImage = path.join('public', 'processed', imageFilename);

        const image = sharp(inputImage);

        return await image.extract({left, top, width, height})
                .toFile(outputImage);


    } catch (error) {
        console.log("error while cropping the image: ", error);
    }

}

export default cropImage;