import sharp from "sharp";
//in this file we are extracting the metadata from the image.
//So whereever that data is required we can import this function.

async function getMetadata(imageLocation){

    try {

      const metadata =   await sharp(imageLocation).metadata();
      console.log(metadata);
      return metadata;
        
    } catch (error) {
        console.log("metadata not extracted from image: see error ", error);
    }

}

export default getMetadata;