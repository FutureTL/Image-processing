//here we need 2 things:
//1. image stored in our local directory that is obtained from the user
//2. desired width and height specified by the user. These 2 are taken as variables.We imagine right now that, we 
//will get this data from the frontend and our control logic.

import sharp from "sharp";


// const resizeImage = async (imageLocation, widthByUser, heightByUser) => {

//     try {
//         await sharp(imageLocation)
//             .resize(
//                 {
//                     width: widthByUser,
//                     height: heightByUser
//                 }
//             )
//             .toFile(`${imageLocation}-resized`)
//     } catch (error) {
//         console.log(`error occured in resizing the image: `, error);
//     }

// }

// export default resizeImage;


async function resizeImage() {
  try {
    await sharp("C:\Users\hp\Desktop\image process project\public\temp\sammy.jpg")
      .resize({
        width: 150,
        height: 97
      })
      .toFile("sammy-resized.jpg");
  } catch (error) {
    console.log(error);
  }
}

resizeImage();