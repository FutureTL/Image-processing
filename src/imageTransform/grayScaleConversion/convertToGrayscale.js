import sharp from "sharp";
import path from "path";

//we have to think about the input of .toFile

const convertToGrayscale =async (inputImagePath, imageFilename) => {

    try {
        
        const image = sharp(inputImagePath);
        const outputPath = path.join('public', 'processed', imageFilename);

        return await image.grayscale()
                .toFile(outputPath);


    } catch (error) {
        console.log("error while converting image to grayscale: ", error);
    }

}

export default convertToGrayscale;