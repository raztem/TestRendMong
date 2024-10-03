GIT

⋅⋅⋅In your browser, navigate to GitHub and log in to your account.
⋅⋅⋅Create a new repository
⋅⋅⋅Copy the URL ending in .git.
⋅⋅⋅In the command line, navigate to the parent directory where you want to 
git clone <the HTTPS or SSH URL ending in .git>

⋅⋅⋅OR

⋅⋅⋅mkdir Name
⋅⋅⋅cd Name
⋅⋅⋅touch README.md
⋅⋅⋅git init - create a new subdirectory named .git
⋅⋅⋅git status - check the status of your files
⋅⋅⋅git add . - add that file to be tracked
⋅⋅⋅git commit -m "initial commit"
⋅⋅⋅git remote add origin <the HTTPS or SSH URL ending in .git>
⋅⋅⋅git branch -M main
⋅⋅⋅git push -u origin main

⋅⋅⋅Common Git Commands: 
⋅⋅⋅git status
⋅⋅⋅git add .
⋅⋅⋅git commit -m 'initial commit'
⋅⋅⋅git push origin main
⋅⋅⋅git pull origin main 

⋅⋅⋅npm install express mongodb cors dotenv --save

⋅⋅⋅"type": "module",

 ⋅⋅⋅Сreate an .env file in the root directory of your project
 ⋅⋅⋅MONGO_URI=mongodb+srv://.......
 ⋅⋅⋅PORT=3000
 
 ⋅⋅⋅Replace 'https://your-client-domain.com' with the actual domain of your frontend
 
 ⋅⋅⋅Connect the client side (HTML + JS) to Render.com or Netlify and make sure that your frontend is making requests to the correct API (https://your-server-url.com/api/news).
  
  ⋅⋅⋅node server.js


