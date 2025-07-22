import asyncHandler from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js";
import blurImage from "../imageTransform/blur/blurImage.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import path from 'path'

//firstly I was thinking that I will write I controller and from it all my image transforms will be handled. 
//So, i was thinking of using switch cases.
//But this is not possible, as all the transforms comw with additional parameters not just an image. For eg, for blur, blurness level will also be defined which we have to take.

const getBlurImage = asyncHandler( async(req, res, next) => {

    const { blurLevel } =  req.body;
    let blurnessLevel = Number(blurLevel);
    console.log(`The blur level defined by user is: ${blurnessLevel}`)

    if(!blurnessLevel){
        throw new ApiError(409, "please enter blurness level", blurnessLevel);
    }
    
    const originalImagePath = req.file?.path;
    if(!originalImagePath){
        throw new ApiError(404, "Path of the original image before blur:", originalImagePath);
    }
    console.log(`the original path of the image is: ${originalImagePath}` )
    const imageFilename = path.basename(originalImagePath);
    console.log(`filename extracted from image path: ${imageFilename}`);


    const outputBlurImage = blurImage(originalImagePath, blurnessLevel, imageFilename);

    if(!outputBlurImage){
        throw new ApiError(404, "blur image output not obtained: ", outputBlurImage)
    }
    console.log(`image blurred successfully and stored at : ${outputBlurImage}`);

    return res.status(200)
    .json(
        new ApiResponse(201, outputBlurImage, `image blurred to ${blurLevel} successfully`)
    );


})



export {
    getBlurImage,
}