Installation


For Windows:

1. Download and install nvm for windows from :https://github.com/coreybutler/nvm-windows

2. Download and install a shell client, eg powershell https://git-scm.com/downloads

3. Open the shell, and type ```nvm install latest``` which updates nvm to the latest version and installs npm.


For Linux:


1. In case build-essential package isnt installed, enter ```apt-get install build-essential libssl-dev``` on command prompt.

2. Enter ```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash``` on command prompt to install nvm.

   NOTE that v0.31.0 was the latest version of nvm as of making this file. Incase a newer version has been released update the path accordingly.

3. You can try ```nvm install latest``` but if it doesn't work look up the latest [Node.js](https://nodejs.org/en/) version and enter ```nvm install x.x.x``` and ```nvm use x.x.x``` where x.x.x is the desired Node version.


This part should be the same on both OSes:

Go to the root of the repository and type ```npm install```. This should install all the dependecies.

Then write ```npm start``` or ```node index.js```. This should start the server and it should be running on port 8080 (localhost:8080).

To stop the process, press "ctrl + c" on your shell client.
