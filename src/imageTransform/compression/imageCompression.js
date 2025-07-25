import sharp from "sharp";
//when I to compress any image I will also know the level of comoressio.
//3 levels will be given to the user-
//1. low compression
//2. medium
//3. high
//so as in input to this imageCompression function I will take an input of level

//whatever level is specified by the user, I will take that as a string as pass as my compressionLevel here.
//based on that I have defined 3 configuartion either of which will be chosen.

//major improvement needed in this code: WE HAVE TO ADD toFile() and specify where it will be stored 
//otherwise sharp is lazy and it will not do anything.

const imageCompression = async (originalPath, compressionLevel) => {

    try {
        
        const image =  sharp(originalPath);
        const metadataOfImage =  await image.metadata();
        
        const {format}= metadataOfImage;

        //now I define 3 configuration levels: which are essentially objects with keys
        
        const lowCompress = {
                jpeg: { quality : 85 },
                webp: { quality : 85 },
                png:  { compressionLevel: 8}

        }

        const mediumCompress = {
                jpeg: { quality : 60 },
                webp: { quality : 60 },
                png:  { compressionLevel: 6}

        }

        const highCompress = {
                jpeg: { quality : 40 },
                webp: { quality : 40 },
                png:  { compressionLevel: 4}

        }

        //for now I will guess that when user will click on either of the three levels
        //i will collect that as a string.
        if(compressionLevel == "low"){
                 await image[format](lowCompress[format])
                 

        }
        else if(compressionLevel== "medium"){
                return await image[format](mediumCompress[format]);
        }
        else{
                return await image[format](highCompress[format]);
        }


    }catch (error) {
        console.log("error while compressing the image: ", error)
    }


}

export default imageCompression;