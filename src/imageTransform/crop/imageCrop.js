import sharp from "sharp";

//we have to think about the input of .toFile

const cropImage =async (inputImage,left, top, width , height) => {

    try {
        
        const image = sharp(inputImage);

        return await image.extract({left, top, width, height})
                .toFile(outputImage);


    } catch (error) {
        console.log("error while cropping the image: ", error);
    }

}

export default cropImage;