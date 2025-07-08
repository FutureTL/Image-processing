import sharp from "sharp";

const covertToGif = async (originalPath) => {

    try {
        
        await sharp(originalPath)
                .gif()
                .toFile(processedPath)


    } catch (error) {
        console.log("Error while converting to png: ", error);
    }

}

export default covertToGif;