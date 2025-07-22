import sharp from "sharp";
import path from "path";

// we have to think about the input of .toFile
// for blur, we use the gaussian blur, which I have to read about.
//the amount of blur will come from the frontend again.

const blurImage = async (inputImage,blurnessLevel, imageFilename) => {

    try {
        
        const image = sharp(inputImage);
        const outputPath = path.join('public', 'processed', imageFilename);

        return await image.blur(blurnessLevel)
                .toFile(outputPath);


    } catch (error) {
        console.log("error while blurring the image: ", error);
    }

}

export default blurImage;