import sharp from "sharp";
import path from "path";

const covertToWebP = async (originalPath) => {

    try {
        
        await sharp(originalPath)
                .webp({
                    quality:85,
                    nearLossless:true
                })
                .toFile('./public/processed')


    } catch (error) {
        console.log("Error while converting to webP: ", error);
    }

}

export default covertToWebP;