import sharp from "sharp";
import path from "path";

const changeImageFormat = async(inputImagePath, convertToType, imageFilename) => {

    try{
        const image = sharp(inputImagePath);
        const outputPath = path.join('public', 'processed');

        if(convertToType == "png"){
            await image.png().toFile(`outputPath.${convertToType}`)
        }
        else if(convertToType == "jpeg"){
            await image.jpeg().toFile(`outputPath.${convertToType}`)
        }
        else if(convertToType== "webp"){
            await image.webp().toFile(`outputPath.${convertToType}`)
        }else if(convertToType == "gif"){
            await image.gif().toFile(`outputPath.${convertToType}`)
        }

       
    } catch (error) {
        console.log("error while compressing the image: ", error)
    }
}

export default changeImageFormat;