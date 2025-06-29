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