//here we need 2 things:
//1. image stored in our local directory that is obtained from the user
//2. desired width and height specified by the user. These 2 are taken as variables.We imagine right now that, we 
//will get this data from the frontend and our control logic.

import sharp from "sharp";
import path from "path";


const resizeImage = async (inputImagePath,imageFilename, widthByUser, heightByUser) => {

    try {

        const outputPath = path.join('public', 'processed', imageFilename);
        const image = sharp(inputImagePath);
        return await image.resize(
                {
                    width: widthByUser,
                    height: heightByUser
                }
            )
            .toFile(outputPath)

    } catch (error) {
        console.log(`error occured in resizing the image: `, error);
    }

}

export default resizeImage;


