import dotenv from "dotenv";
import app from './app.js';

dotenv.config({
    path: './env'
})

const CurrentPort = process.env.PORT || 8000

const server = app.listen(CurrentPort,()=>{
        console.log("application running on port: ", CurrentPort)
    })

server.on("error", (error)=>{
   console.log("problem in connecting to the server: ", error)
})