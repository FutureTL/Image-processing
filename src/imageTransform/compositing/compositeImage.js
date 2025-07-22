import sharp from "sharp";

//we have to fix the .toFile() in this file.
//when sigma is not provided then performs a faster 3x3 box blur.
//but when sigma is defined then performs more accurate slower blur.
const compositeImages = async (bottomImage, topImage, top, left) => {


    try {

        const image = sharp(bottomImage)

        return await image.composite([
            {
                input: topImage,
                top:top,
                left:left
            },
        ])
        .toFile('./public/processed')
        
    }catch (error) {
        console.log("error occured while compositing the image: ", error);
    }

}

export default compositeImages;