Setting up the evn as of 05/11/2024
Step 1: Clone the repo
Step 2: cd into backend
Step 3: delete package-lock.json
Step 4: npm install

Step 5: cd into frontend
Step 6: npm install

for Running
In terminal 1: 
Step 1: cd in to backend
Step 2: node index.js
(keep this terminal running)

In terminal 2
Step 3: cd in frontend
Step 4: npm start
(keep this terminal running)

# running the poject
1. start by running npm install to install the packages
2. ensure you have redis database running
3. in the logics folder, we have redis-client.js file, ensure your the redis url is well configured
4. run node inde.js and the server will be started
#main users
1. admin users- users with all system rights
2. retail business who will list their products on the website
3. buyers or normal customers who will purchase goods from the website

 # project structure
1. The entry point to the project is the index.js file in the main folder of the project
2. All views are under the views folder
3. All routes are under the routes folder
4. product images are stored in the productImages folder
5. All static files such as css and js files are stored under the assets folder
6. All the poject logics files are under the logics folder

My tasks
Create admin apis for CRUDE operations
a. create, update,list and delete admin users. 
b. password management
