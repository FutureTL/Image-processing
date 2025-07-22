import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); //this is being set up as a middleware

// app.use(express.json({
//     limit: "10mb"
// }));

app.use(express.urlencoded({
    extended: true
}))

//we have setup all the middlewares that are needed in our application.
//now we move on to routes.

import allRoutes from "./routes/route.js";

app.use("/api/v1/user", allRoutes);

export default app;