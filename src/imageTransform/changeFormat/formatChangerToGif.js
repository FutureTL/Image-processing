import sharp from "sharp";
import path from "path";

const covertToGif = async (originalPath) => {

    try {
        
        await sharp(originalPath)
                .gif()
                .toFile('./public/processed')


    } catch (error) {
        console.log("Error while converting to png: ", error);
    }

}

export default covertToGif;