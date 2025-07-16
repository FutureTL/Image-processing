import sharp from "sharp";

// we have to think about the input of .toFile
// for blur, we use the gaussian blur, which I have to read about.
//the amount of blur will come from the frontend again.

const blurImage =async (inputImage,blurnessLevel) => {

    try {
        
        const image = sharp(inputImage);

        return await image.blur(blurnessLevel)
                .toFile(outputImage);


    } catch (error) {
        console.log("error while cropping the image: ", error);
    }

}

export default blurImage;