import path from "path";
import sharp from "sharp";


//now the angle by which the image is to be rotated 
//should come from the frontend.
// right now I assume that the angle is sent.
//we have to think about the input of .toFile

const rotateImage =async (inputImagePath, imageFilename, angle) => {

    try {
        
        const outputImage = path.join('public', 'processed', imageFilename);
        const image = sharp(inputImagePath);

        return await image.rotate( //in rotate, the first argument is the angle and second argument is the other options that we have.
            angle,
            {   //setting all of r,g,b to 0 means black color and then setting alpha to 0 means transparent so to make transparent background we first select a color and then make alpha=0                
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        )
                .toFile(outputImage);


    } catch (error) {
        console.log("error while rotating the image: ", error);
    }

}

export default rotateImage ;