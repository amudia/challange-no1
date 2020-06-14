<h1 align="center">ExpressJS - "User Services" RESTfull API</h1>

"User Services" is a simple note application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.14-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name 'dbmodi.sql', and Import file [dbmodi.sql](dbmodi.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/user)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
APP_PORT=8080
APP_URI=http://localhost:8080/
APP_KEY=y0u12_4pp_k3y

                                                     
DB_SERVER=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=dbmodi
```           
## End Point
**1. GET**
* `/`
* `/user/:id`(By ID tenant) get list user
* `/user/profile/:iduser`(By ID user) get profile
* `/user/profile/:id` (By ID user) get detail user
* `/user/logout`
* `/tenant`
* `/tenant/:id`(By ID tenant) 

**2. POST**
* `/user/login`
* `/user`
* `/user/edit/:id` (By ID user)
* `/user/add`
* `/tenant`

**3. PUT**
* `/tenant/:id` (By ID tenant)

**4. DELETE**
* `/user/:id` (By ID user)
* `/tenant/:id` (By ID tenant)
