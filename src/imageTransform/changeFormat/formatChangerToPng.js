import sharp from "sharp";
import path from "path";

const covertToPng = async (originalPath) => {

    try {
        
        await sharp(originalPath)
                .png()
                .toFile('./public/processed')


    } catch (error) {
        console.log("Error while converting to png: ", error);
    }

}

export default covertToPng;