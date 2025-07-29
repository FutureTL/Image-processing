import asyncHandler from "../utlis/asyncHandler.js"
import { ApiError } from "../utlis/ApiError.js";
import blurImage from "../imageTransform/blur/blurImage.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import imageFilenameExtracted from "../utlis/extractFilename.js";
import imageCompression from "../imageTransform/compression/imageCompression.js";
import convertToGrayscale from "../imageTransform/grayScaleConversion/convertToGrayscale.js";
import changeImageFormat from "../imageTransform/changeFormat/formatChanger.js";
import compositeImages from "../imageTransform/compositing/compositeImage.js";
import addText from "../imageTransform/addText/addText.js";

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

}) //completed

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


})//completed

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
})//completed

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



})//completed


//now we will write a controller to add text to an image. It is going to have a number of values.
const getTextaddedToImage = asyncHandler( async(req, res, next) => {

    const bottomImagePath = req.file?.path;
    if(!bottomImagePath){
        throw new ApiError(409, "please provide input image.");
    }
    //boxWidth, boxHeight, textInput, textSize, 
    //textFont, textRotationAngle, textColor, textBold, textItalic

    const { boxWidth, boxHeight, textInput, textSize, textFont,
        textRotationAngle, textColor, textBold, textItalic } =  req.body;

    if(!boxWidth || !boxHeight || !textInput || !textSize || !textFont || !textRotationAngle || !textColor || !textBold || !textItalic){
        throw new ApiError(404, "enter all the values.");
    }



    const imageFilename = imageFilenameExtracted(bottomImagePath);
    console.log(`filename of the bottom image extracted: ${imageFilename}`);

    const createTextImage = await addText(imageFilename,boxWidth, boxHeight, textInput, textSize, textFont, textRotationAngle, textColor, textBold, textItalic);
    //the boxheight and width are for the box(invisible) that engulfs the text.

    console.log(`text image to be composited to bottom image is: ${createTextImage}`);

    const addTextToImageComposite = compositeImages(bottomImagePath, createTextImage, 300, 300, imageFilename);
    //the left and top here makes the text move from the top left corner,as we increase the value, dist from top and left increases.
    if(!addTextToImageComposite){
        throw new ApiError(404, "text could not be added to bottom image");
    }
    console.log(`text has been added to image: ${addTextToImageComposite}`);



    return res.status(200)
    .json(
        new ApiResponse(200, addTextToImageComposite, "text added to image successfully!")
    )


})//I am facing an issue- I am able to sucessfully create a text image, the problem is that addText.js returns an object promise,
//but we need the path of the image that we have just created, so that we can pass it with the another image to achieve image composition.
//that is not being possible right now.
//Solution- I had to add await before that function because it is returing a promise so we have to await its result.

//Very Interesting observation: when adding text to a jpeg image, i am getting black background with the text. 
//              but adding text to a png image, comes with background less text, so proper text is being added. 
//              we need to investigate why it is happening with jpeg?
export {
    getBlurImage,
    getCompressedImage,
    getGreyScaleImage,
    getImageFormatChanged,
    getCompositeImages,
    getTextaddedToImage
}