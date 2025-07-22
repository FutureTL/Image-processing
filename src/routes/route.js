//our aim: we will get all the controllers in this file.
//and combine our 3 things that are used together: route, middleware, controller

import express from "express";
import upload from "../middlewares/multer.js";
import { getBlurImage } from "../controllers/controller.js";

const router = express.Router()

//question: how will we export these routes because we are not taking them in any varibables.

router.route('/blur').post( //route

    upload.single('image'), //middleware- multer
    
    getBlurImage    //controller

)

export default router;
//common qs that can arise in one's mind: we are directly exporting the ectire router, and not 
//individual routes. Why?
//router is an instance that contains all these routes. How? we have to study that in detail?

