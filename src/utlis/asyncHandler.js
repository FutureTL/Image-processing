//asyncHandler is a higher order function that accepts a function as a 
//parameter, so that we don't have to write try catch every time. Otherwise,
//I will always have to write my controller functions in a try catch block.

const asyncHandler = (func) => {

     return async(req,res,next)=>{

        try {
           await func(req, res, next);
        } catch (error) {
            console.log("error in asynchandler: ", error);
        }

     }
}

export default asyncHandler;