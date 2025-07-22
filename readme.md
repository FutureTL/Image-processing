- This is an image processing project, which is being implemented using sharp library in nodeJs.
- One can ask a question like, image processing is usually implemented in python, which is correct, because it is treated as the necessary and pre-requisite for computer vision.
- But the aim of this project is to demonstrate and as well as test, image processing capabilities in nodejs.
- We have started by setup of backend first.
Steps: 
1. Setup node environment. 
    command: npm i node
2. initializing the application and setup of package.json file
    command: npm init
3. creating a readme.md file in the root directory of the project.
4. command: git config --global user.email "your github email"
5.        : git config --global user.name "your name on github handle"(eg my name is FutureTL)

- Now go and create a github repo
- Now in your project, create a new folder named public. In it create another folder named temp. In temp folder create a file name .gitkeep. This ensures the project is pushed to github as empty project without any file is not uploaded on github.

6.          git init
7.          git add .
8.          git commit -m "some commit message you want to give"
9.          git branch -M main
10.         git remote add origin (here write name of your git hub repository)
11.         git push -u origin main

Now the project is pushed on to your github.
-Now create a .gitignore and .env  file. Gitignore is used for keeping the track of all the files we don't want to be publically available in our github repo. Eg, .env file

- Nodemon- restarts the server once the file is saved. otherwise we manually have to restart the server.

dev dependency - is during the development of the project and not taken to production . So we can install nodemon as a dev dependency.  to install it as a dev dependency-
command:      npm i -D nodemon
- now in your package.json write the command in scripts:
        "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
- and along with this I am following the convention of importing the modules rather than using the require statement. For this we have to write 
        "type": "module"

- now again push these changes to github. for that now we need to write only this command:
        git add .   (to add all the new files created)
        git commit -m "setup project files part-1"
        git push

- Now, ideally what will happen is that user will give image as an input => that input will be stored in our local directory => then all the processing will be performed on it.

- But for now, the main focus will be to implement the image processing logic first. For that I will be using downloaded images => once that is successfully performed, I will write the logic for taking image from the user.

- The downloaded images will be kept in ./public/temp 
- Now we start working with sharp lib. to install it run :
command:    npm i sharp

- Our first aim : Extract the metadata of the image. Metadata contains information like- width, height.
- Lets dive input what is the structure of the input image:
        Header(type of image- jpeg, png, webP etc)
          |
        metadata(width, height, size )
          |
        actual encoded compressed image
          |
        optional chunk/info

- As metadat is not contained inside the actual compressed image , but present outside, it can be accessed very easily by the parser and hence sharp is very fast and optimized in extracting metadata of the image.
- so using sharp we can extract metadata without decoding the compressed images.

- All changes and additions I need to make as of now:
- In compression project I have to add .toFile() and specify the destination where the image has to be stored.

- The next step is cropping an image- I will record how I go about it here in entirity.

- Rotate, blur, crop, and adding the grayscale where relatively easier tasks. So I wont be discussing about them. 

- lets move on to adding text to an image. Now sharp doesn't have a native way of adding text to an iamage, so we will create an image of the text using SVG and then using the concept of image composition.

-                  PART TWO
- Now that we are done with the transformations we want to apply on the image, we move on to writing our controllers, routes, middlewares and utils, and more.

- First now I begin with writing multer as a middleware that will help us in accepting file uploads like images, videos, pdf files etc. Here we are dealing with only images at the moment.

- Now install a bunch of dependencies with :
                npm i cors multer express dotenv

- first lets work on image upload using multer.

- multer acts as a middleware. 
- So while working on the backend of a project using express, we mainly have two things- request and response.

- multer adds a body object and a file or files object to the request object. Through the body object we can have access of all the text values. 
- Using the file/files i.e, req.file we can have access to file like images, video, some pdf.

- It is so powerful that it allows to dynamically declare different paths for different file types, using the callback function.

-                      UTILS
- I have declared 3 utilis. 