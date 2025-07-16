import sharp from "sharp";

//we have to think about the input of .toFile

const convertToGrayscale =async (inputImage) => {

    try {
        
        const image = sharp(inputImage);

        return await image.grayscale()
                .toFile(outputImage);


    } catch (error) {
        console.log("error while converting image to grayscale: ", error);
    }

}

export default convertToGrayscale;