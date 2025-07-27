import asyncHandler from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js";
import blurImage from "../imageTransform/blur/blurImage.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import imageFilenameExtracted from "../utlis/extractFilename.js";
import imageCompression from "../imageTransform/compression/imageCompression.js";
import convertToGrayscale from "../imageTransform/grayScaleConversion/convertToGrayscale.js";
import changeImageFormat from "../imageTransform/changeFormat/formatChanger.js";
import compositeImages from "../imageTransform/compositing/compositeImage.js";

//firstly I was thinking that I will write 1 controller and from it all my image transforms will be handled. 
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


    const imageFilename = imageFilenameExtracted(originalImagePath);
    //we are extracting the filename of the image so that we can send it separately and it can be 
    //attached at the end of the path name so that the image that is transformed is saved with the same name
    //as the original image.

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

const getCompressedImage = asyncHandler( async(req,res,next) => {

    const { compressionLevel } = req.body;
   
    if(!compressionLevel){
        throw new ApiError(409, "specify the compression level needed!");
    }
    //compressionLevel can have either of the three values- low, medium, high
    
    const originalImagePath = req.file?.path;
    if(!originalImagePath){
        throw new ApiError(409, "Please upload the image to be compressed.");
    }
    console.log(`path if the original image: ${originalImagePath}`);

    const imageFilename = imageFilenameExtracted(originalImagePath);
    console.log(`filename of the image: ${imageFilename}`);

    const outputCompressedImage = imageCompression(originalImagePath, compressionLevel, imageFilename);

    if(!outputCompressedImage){
        throw new ApiError(404, "Image input by the user could not be compressed.");

    }
    console.log(`output of compressed image: ${outputCompressedImage}`);

    return res.status(200)
    .json(
        new ApiResponse(200, outputCompressedImage,`image has been compressed sucessfully to compression level: ${compressionLevel}`)
    )


})

const getGreyScaleImage = asyncHandler( async(req, res, next) => {

    const originalImagePath = req.file?.path;

    if(!originalImagePath){
        throw new ApiError(409, "please give input image.")
    }

    const imageFilename = imageFilenameExtracted(originalImagePath);
    console.log(`name of the image is: ${imageFilename}`);

    const imageToGreyScale =  convertToGrayscale(originalImagePath, imageFilename);
    console.log(`path for greyscale image: ${imageToGreyScale}`);

    res.status(200)
    .json(
        new ApiResponse(201, imageToGreyScale, "image converted to greyScale successfully!")
    )
})

const getImageFormatChanged = asyncHandler( async(req, res, next) => {

    const { convertToType } =   req.body;

    if(!convertToType){
        throw new ApiError(409, "specify the format in which image is to be converted.");
    }

    const inputImagePath = req.file?.path;

    if(!inputImagePath){
        throw new ApiError(409, "please provide the input image");
    }
    console.log(`input image whose format is to be change to ${convertToType} has path: ${inputImagePath}`);

    const imageFilename = imageFilenameExtracted(inputImagePath);
    console.log(`the filename of the image is: ${imageFilename}`);

    const convertImageFormat = changeImageFormat(inputImagePath, convertToType,imageFilename);

    if(!convertImageFormat){
        throw new ApiError(404, "image could not be converted to desired format.")
    }


    return res.status(200)
    .json(
        new ApiResponse(201, convertImageFormat, `format of the image changed to ${convertToType} successfully`)
    )

})//this controller is not completed yet. I have written the code for the controller but 
  //throwing errors at me for now b*.

const getCompositeImages = asyncHandler( async(req, res, next ) => {

    // const { bottomImage, topImage} = req.files?.path; - this I have written wrong because req.files gives an array not object.
    //rather we should have written like this:
    const [ bottomImage, topImage ] = req.files || [];

    const bottomImagePath = bottomImage?.path;
    console.log(`the bottom image path is: ${bottomImagePath}`);

    const topImagePath = topImage?.path;
    console.log(`the top image path is: ${topImagePath}`);

    

    if(!bottomImage || !topImage){
        throw new ApiError(404, "please provide both images to be composited.");
    }

    const { topLevel, leftLevel } = req.body;
    if(!topLevel || !leftLevel){
        throw new ApiError(404, "provide both the top and left level.");
    }
    const topLevelInt = Number(topLevel);
    const leftLevelInt = Number(leftLevel);

    const inputImageFilename = imageFilenameExtracted(topImagePath);
    console.log(`filename of one of the input image: ${inputImageFilename}`)

    const compositionOfImages =  compositeImages( bottomImagePath, topImagePath, topLevelInt, leftLevelInt , inputImageFilename)

    console.log(`composition of images produces the following result: ${compositionOfImages}`)

    if(!compositionOfImages){
        throw new ApiError(404, "image composition could not be done.")
    }
    console.log(`the path of the composite images is: ${compositionOfImages}`);

    
    return res.status(200)
    .json(
        new ApiResponse(200, compositionOfImages, "image composition done successfully!")
    )



})


export {
    getBlurImage,
    getCompressedImage,
    getGreyScaleImage,
    getImageFormatChanged,
    getCompositeImages
}